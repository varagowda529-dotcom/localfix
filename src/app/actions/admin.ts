"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import {
  categories,
  comments,
  locations,
  notifications,
  officialResponses,
  problems,
  statusEvents,
  users,
  verificationRequests,
} from "@/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { STATUSES, LOCATION_TYPES, slugify } from "@/lib/constants";

async function requireStaff() {
  const user = await getCurrentUser();
  if (!user?.isStaff) redirect("/login?next=/admin");
  return user;
}

export async function adminUpdateProblemStatus(formData: FormData) {
  const staff = await requireStaff();
  const problemId = Number(formData.get("problemId"));
  const status = String(formData.get("status") ?? "");
  const note = String(formData.get("note") ?? "").trim();
  if (!Number.isInteger(problemId) || !STATUSES.some((s) => s.slug === status)) {
    redirect("/admin/problems");
  }

  await db
    .update(problems)
    .set({ status, updatedAt: new Date() })
    .where(eq(problems.id, problemId));
  await db.insert(statusEvents).values({
    problemId,
    status,
    note: note || `Status updated to “${STATUSES.find((s) => s.slug === status)?.label}” by ${staff.fullName}.`,
  });

  const [problem] = await db
    .select({ title: problems.title, reporterId: problems.reporterId })
    .from(problems)
    .where(eq(problems.id, problemId));
  if (problem) {
    await db.insert(notifications).values({
      userId: problem.reporterId,
      body: `Status update on “${problem.title}”: ${STATUSES.find((s) => s.slug === status)?.label}.`,
      link: `/problems/${problemId}`,
    });
  }

  const back = String(formData.get("back") ?? "");
  redirect(back.startsWith("/") ? back : "/admin/problems");
}

export async function adminAddOfficialResponse(formData: FormData) {
  await requireStaff();
  const problemId = Number(formData.get("problemId"));
  const body = String(formData.get("body") ?? "").trim();
  const officialName = String(formData.get("officialName") ?? "").trim();
  const department = String(formData.get("department") ?? "").trim();
  if (!Number.isInteger(problemId) || !body || !officialName || !department) {
    redirect(`/problems/${problemId}?error=${encodeURIComponent("Fill all response fields.")}`);
  }
  await db.insert(officialResponses).values({ problemId, body, officialName, department });
  const [problem] = await db
    .select({ title: problems.title, reporterId: problems.reporterId })
    .from(problems)
    .where(eq(problems.id, problemId));
  if (problem) {
    await db.insert(notifications).values({
      userId: problem.reporterId,
      body: `An official responded to “${problem.title}” (${department}).`,
      link: `/problems/${problemId}`,
    });
  }
  redirect(`/problems/${problemId}#responses`);
}

export async function adminResolveVerification(formData: FormData) {
  await requireStaff();
  const requestId = Number(formData.get("requestId"));
  const decision = String(formData.get("decision") ?? "");
  if (!Number.isInteger(requestId) || !["approved", "rejected"].includes(decision)) {
    redirect("/admin/verifications");
  }
  const [request] = await db
    .select()
    .from(verificationRequests)
    .where(eq(verificationRequests.id, requestId));
  if (!request) redirect("/admin/verifications");

  await db
    .update(verificationRequests)
    .set({ status: decision })
    .where(eq(verificationRequests.id, requestId));
  await db
    .update(users)
    .set({
      verificationStatus: decision,
      isVerified: decision === "approved",
    })
    .where(eq(users.id, request.userId));
  await db.insert(notifications).values({
    userId: request.userId,
    body:
      decision === "approved"
        ? "Your account has been verified. Your badge is now active."
        : "Your verification request was rejected. Contact support for details.",
    link: "/dashboard",
  });
  redirect("/admin/verifications");
}

export async function adminSetUserActive(formData: FormData) {
  await requireStaff();
  const userId = Number(formData.get("userId"));
  const active = formData.get("active") === "1";
  if (Number.isInteger(userId)) {
    await db.update(users).set({ isActive: active }).where(eq(users.id, userId));
  }
  redirect("/admin/users");
}

export async function adminAddCategory(formData: FormData) {
  await requireStaff();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) redirect("/admin/categories");
  await db
    .insert(categories)
    .values({ name, slug: slugify(name), icon: "circle-alert", color: "blue" })
    .onConflictDoNothing();
  redirect("/admin/categories");
}

export async function adminAddLocation(formData: FormData) {
  await requireStaff();
  const name = String(formData.get("name") ?? "").trim();
  const type = String(formData.get("type") ?? "");
  const parentRaw = String(formData.get("parentId") ?? "");
  const parentId = parentRaw ? Number(parentRaw) : null;
  if (!name || !LOCATION_TYPES.some((t) => t.slug === type)) redirect("/admin/locations");
  await db
    .insert(locations)
    .values({
      name,
      type,
      parentId: parentId && Number.isInteger(parentId) ? parentId : null,
      slug: slugify(name),
    })
    .onConflictDoNothing();
  redirect("/admin/locations");
}

export async function adminRemoveComment(formData: FormData) {
  await requireStaff();
  const commentId = Number(formData.get("commentId"));
  if (Number.isInteger(commentId)) {
    await db.update(comments).set({ isRemoved: true }).where(eq(comments.id, commentId));
  }
  redirect("/admin/comments");
}
