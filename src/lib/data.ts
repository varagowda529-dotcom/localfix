import { cache } from "react";
import {
  and,
  asc,
  count,
  desc,
  eq,
  gt,
  ilike,
  inArray,
  isNull,
  ne,
  or,
  sql,
} from "drizzle-orm";
import { db } from "@/db";
import {
  categories,
  comments,
  locations,
  notifications,
  officialResponses,
  problems,
  statusEvents,
  supports,
  users,
  verificationRequests,
  type Category,
  type Location,
  type Problem,
  type User,
} from "@/db/schema";

export const getCategories = cache(async (): Promise<Category[]> => {
  return db.select().from(categories).orderBy(asc(categories.name));
});

export const getLocations = cache(async (): Promise<Location[]> => {
  return db.select().from(locations).orderBy(asc(locations.name));
});

/* ----------------------------- location helpers ---------------------------- */

export function childrenMap(all: Location[]): Map<number | null, Location[]> {
  const map = new Map<number | null, Location[]>();
  for (const loc of all) {
    const list = map.get(loc.parentId) ?? [];
    list.push(loc);
    map.set(loc.parentId, list);
  }
  for (const list of map.values()) {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }
  return map;
}

/** Breadcrumb path from state → the location itself. */
export function locationPath(all: Location[], id: number): Location[] {
  const byId = new Map(all.map((l) => [l.id, l]));
  const path: Location[] = [];
  let cur = byId.get(id);
  let guard = 0;
  while (cur && guard < 12) {
    path.unshift(cur);
    cur = cur.parentId ? byId.get(cur.parentId) : undefined;
    guard++;
  }
  return path;
}

/** Ids of the location and every descendant (so searching "Tiptur" finds Kaidala). */
export function locationSubtreeIds(all: Location[], id: number): number[] {
  const kids = childrenMap(all);
  const ids: number[] = [];
  const queue = [id];
  while (queue.length) {
    const cur = queue.shift()!;
    ids.push(cur);
    for (const child of kids.get(cur) ?? []) queue.push(child.id);
  }
  return ids;
}

export type LocationOption = { id: number; label: string; slug: string };

/** All locations as indented options for filter selects. */
export async function locationOptions(): Promise<LocationOption[]> {
  const all = await getLocations();
  const kids = childrenMap(all);
  const options: LocationOption[] = [];
  const walk = (parentId: number | null, depth: number) => {
    for (const loc of kids.get(parentId) ?? []) {
      options.push({
        id: loc.id,
        slug: loc.slug,
        label: `${"　".repeat(depth)}${loc.name}`,
      });
      walk(loc.id, depth + 1);
    }
  };
  walk(null, 0);
  return options;
}

/* ------------------------------ problem queries ---------------------------- */

export type ProblemCard = {
  problem: Problem;
  category: Category;
  path: Location[];
  reporterName: string | null;
};

function decorate(
  rows: { problem: Problem; category: Category; reporterName: string | null }[],
  all: Location[],
): ProblemCard[] {
  const byId = new Map(all.map((l) => [l.id, l]));
  return rows.map((r) => {
    const path: Location[] = [];
    let cur = byId.get(r.problem.locationId);
    let guard = 0;
    while (cur && guard < 12) {
      path.unshift(cur);
      cur = cur.parentId ? byId.get(cur.parentId) : undefined;
      guard++;
    }
    return { problem: r.problem, category: r.category, path, reporterName: r.reporterName };
  });
}

const cardSelect = {
  problem: problems,
  category: categories,
  reporterName: sql<
    string | null
  >`case when ${problems.showIdentity} then ${users.fullName} else null end`,
};

export type ProblemFilters = {
  locationSlug?: string;
  categorySlug?: string;
  status?: string;
  sort?: string;
};

export async function listProblems(filters: ProblemFilters = {}): Promise<ProblemCard[]> {
  const all = await getLocations();
  const conditions = [];

  if (filters.locationSlug) {
    const loc = all.find((l) => l.slug === filters.locationSlug);
    if (!loc) return [];
    conditions.push(inArray(problems.locationId, locationSubtreeIds(all, loc.id)));
  }
  if (filters.categorySlug) {
    conditions.push(eq(categories.slug, filters.categorySlug));
  }
  if (filters.status) {
    conditions.push(eq(problems.status, filters.status));
  }

  const order =
    filters.sort === "supported"
      ? [desc(problems.supporterCount), desc(problems.createdAt)]
      : filters.sort === "oldest"
        ? [asc(problems.createdAt)]
        : [desc(problems.createdAt)];

  const rows = await db
    .select(cardSelect)
    .from(problems)
    .innerJoin(categories, eq(categories.id, problems.categoryId))
    .innerJoin(users, eq(users.id, problems.reporterId))
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(...order);

  return decorate(rows, all);
}

export async function trendingProblems(limit = 3): Promise<ProblemCard[]> {
  const all = await getLocations();
  const rows = await db
    .select(cardSelect)
    .from(problems)
    .innerJoin(categories, eq(categories.id, problems.categoryId))
    .innerJoin(users, eq(users.id, problems.reporterId))
    .orderBy(desc(problems.supporterCount))
    .limit(limit);
  return decorate(rows, all);
}

export async function problemsInLocation(
  locationId: number,
  limit = 4,
): Promise<ProblemCard[]> {
  const all = await getLocations();
  const rows = await db
    .select(cardSelect)
    .from(problems)
    .innerJoin(categories, eq(categories.id, problems.categoryId))
    .innerJoin(users, eq(users.id, problems.reporterId))
    .where(inArray(problems.locationId, locationSubtreeIds(all, locationId)))
    .orderBy(desc(problems.supporterCount))
    .limit(limit);
  return decorate(rows, all);
}

export async function countProblemsInSubtree(all: Location[], locationId: number): Promise<number> {
  const ids = locationSubtreeIds(all, locationId);
  const rows = await db
    .select({ n: count() })
    .from(problems)
    .where(inArray(problems.locationId, ids));
  return rows[0]?.n ?? 0;
}

/* ------------------------------ problem detail ----------------------------- */

export async function getProblemDetail(id: number, viewerId?: number) {
  const all = await getLocations();
  const rows = await db
    .select(cardSelect)
    .from(problems)
    .innerJoin(categories, eq(categories.id, problems.categoryId))
    .innerJoin(users, eq(users.id, problems.reporterId))
    .where(eq(problems.id, id))
    .limit(1);
  if (!rows[0]) return null;
  const card = decorate(rows, all)[0];

  const [events, responses, commentRows, supported] = await Promise.all([
    db
      .select()
      .from(statusEvents)
      .where(eq(statusEvents.problemId, id))
      .orderBy(asc(statusEvents.createdAt), asc(statusEvents.id)),
    db
      .select()
      .from(officialResponses)
      .where(eq(officialResponses.problemId, id))
      .orderBy(desc(officialResponses.createdAt)),
    db
      .select({ comment: comments, user: users })
      .from(comments)
      .innerJoin(users, eq(users.id, comments.userId))
      .where(and(eq(comments.problemId, id), eq(comments.isRemoved, false)))
      .orderBy(desc(comments.createdAt)),
    viewerId
      ? db
          .select({ id: supports.id })
          .from(supports)
          .where(and(eq(supports.problemId, id), eq(supports.userId, viewerId)))
          .limit(1)
      : Promise.resolve([]),
  ]);

  return {
    ...card,
    events,
    responses,
    comments: commentRows,
    hasSupported: supported.length > 0,
  };
}

/* --------------------------------- searching ------------------------------- */

export async function searchLocations(q: string): Promise<{ loc: Location; path: Location[] }[]> {
  const all = await getLocations();
  const matches = all
    .filter((l) => l.name.toLowerCase().includes(q.toLowerCase()))
    .slice(0, 8);
  return matches.map((loc) => ({ loc, path: locationPath(all, loc.id) }));
}

/* ---------------------------------- stats ---------------------------------- */

export async function platformStats() {
  const [totals] = await db
    .select({
      problems: count(),
      supporters: sql<number>`coalesce(sum(${problems.supporterCount}),0)`,
    })
    .from(problems);
  const [resolved] = await db
    .select({ n: count() })
    .from(problems)
    .where(eq(problems.status, "completed"));
  const [locs] = await db.select({ n: count() }).from(locations);
  const [responses] = await db.select({ n: count() }).from(officialResponses);
  const [citizens] = await db.select({ n: count() }).from(users).where(eq(users.role, "citizen"));
  return {
    problems: totals?.problems ?? 0,
    supporters: totals?.supporters ?? 0,
    resolved: resolved?.n ?? 0,
    locations: locs?.n ?? 0,
    officialResponses: responses?.n ?? 0,
    citizens: citizens?.n ?? 0,
  };
}

/* -------------------------------- dashboards ------------------------------- */

async function cardsWhere(condition?: ReturnType<typeof eq>): Promise<ProblemCard[]> {
  const all = await getLocations();
  const rows = await db
    .select(cardSelect)
    .from(problems)
    .innerJoin(categories, eq(categories.id, problems.categoryId))
    .innerJoin(users, eq(users.id, problems.reporterId))
    .where(condition)
    .orderBy(desc(problems.supporterCount), desc(problems.createdAt));
  return decorate(rows, all);
}

export async function myReports(userId: number) {
  return cardsWhere(eq(problems.reporterId, userId));
}

export async function supportedProblems(userId: number): Promise<ProblemCard[]> {
  const all = await getLocations();
  const rows = await db
    .select({ ...cardSelect })
    .from(supports)
    .innerJoin(problems, eq(problems.id, supports.problemId))
    .innerJoin(categories, eq(categories.id, problems.categoryId))
    .innerJoin(users, eq(users.id, problems.reporterId))
    .where(eq(supports.userId, userId))
    .orderBy(desc(supports.createdAt));
  return decorate(rows, all);
}

export async function problemsByStatuses(statusSlugs: string[]) {
  return cardsWhere(inArray(problems.status, statusSlugs));
}

export async function constituencyProblems(constituencyId: number): Promise<ProblemCard[]> {
  const all = await getLocations();
  return cardsWhere(inArray(problems.locationId, locationSubtreeIds(all, constituencyId)));
}

export async function highAttentionProblems(minSupporters = 400) {
  return cardsWhere(gt(problems.supporterCount, minSupporters));
}

export async function userNotifications(userId: number) {
  return db
    .select()
    .from(notifications)
    .where(eq(notifications.userId, userId))
    .orderBy(desc(notifications.createdAt))
    .limit(20);
}

/* ---------------------------------- admin ---------------------------------- */

export async function adminUsers() {
  return db.select().from(users).orderBy(desc(users.createdAt));
}

export async function adminComments() {
  return db
    .select({ comment: comments, user: users, problem: problems })
    .from(comments)
    .innerJoin(users, eq(users.id, comments.userId))
    .innerJoin(problems, eq(problems.id, comments.problemId))
    .orderBy(desc(comments.createdAt))
    .limit(100);
}

export async function adminVerifications() {
  return db
    .select({ request: verificationRequests, user: users })
    .from(verificationRequests)
    .innerJoin(users, eq(users.id, verificationRequests.userId))
    .orderBy(desc(verificationRequests.createdAt));
}

export async function findUserByUsername(username: string): Promise<User | undefined> {
  const rows = await db.select().from(users).where(eq(users.username, username)).limit(1);
  return rows[0];
}

export async function pendingVerificationCount() {
  const rows = await db
    .select({ n: count() })
    .from(verificationRequests)
    .where(eq(verificationRequests.status, "pending"));
  return rows[0]?.n ?? 0;
}

export const getLocationCountRollup = cache(async (): Promise<Map<number, number>> => {
  const all = await getLocations();
  const directRows = await db
    .select({ locationId: problems.locationId, n: count() })
    .from(problems)
    .groupBy(problems.locationId);
  const direct = new Map(directRows.map((r) => [r.locationId, r.n]));

  const kids = childrenMap(all);
  const rollup = new Map<number, number>();
  const sum = (id: number): number => {
    const cached = rollup.get(id);
    if (cached !== undefined) return cached;
    let total = direct.get(id) ?? 0;
    for (const child of kids.get(id) ?? []) total += sum(child.id);
    rollup.set(id, total);
    return total;
  };
  for (const loc of all) sum(loc.id);
  return rollup;
});

/* ----------------------------- admin dashboard helpers --------------------- */

export async function adminDashboardStats() {
  const [totals] = await db.select({ n: count() }).from(users);
  const [open] = await db.select({ n: count() }).from(problems).where(inArray(problems.status, ["reported", "verified", "awaiting_response", "in_progress", "overdue"]));
  const [pendingVerif] = await db.select({ n: count() }).from(verificationRequests).where(eq(verificationRequests.status, "pending"));
  const [overdue] = await db.select({ n: count() }).from(problems).where(eq(problems.status, "overdue"));
  
  return {
    totalUsers: totals?.n ?? 0,
    openProblems: open?.n ?? 0,
    pendingVerifications: pendingVerif?.n ?? 0,
    overdueProblems: overdue?.n ?? 0,
  };
}

export async function adminRecentReports(limit = 4) {
  const all = await getLocations();
  const rows = await db.select(cardSelect).from(problems).innerJoin(categories, eq(categories.id, problems.categoryId)).innerJoin(users, eq(users.id, problems.reporterId)).where(eq(problems.status, "reported")).orderBy(desc(problems.createdAt)).limit(limit);
  return decorate(rows, all);
}

export async function adminRecentVerifications(limit = 4) {
  return db.select({ request: verificationRequests, user: users }).from(verificationRequests).innerJoin(users, eq(users.id, verificationRequests.userId)).where(eq(verificationRequests.status, "pending")).orderBy(desc(verificationRequests.createdAt)).limit(limit);
}
