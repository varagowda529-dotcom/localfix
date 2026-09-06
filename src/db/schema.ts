import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
  uuid,
  real,
  uniqueIndex,
  customType,
  index,
} from "drizzle-orm/pg-core";

// bytea column for storing uploaded problem photos inside the database so the
// demo works without any external storage service (keeps the "SQLite demo"
// philosophy: everything lives in one database).
const bytea = customType<{ data: Buffer; driverData: Buffer }>({
  dataType() {
    return "bytea";
  },
});

/* ---------------------------------- auth ---------------------------------- */

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  fullName: text("full_name").notNull(),
  // citizen | politician | government_employee | media | public_figure
  role: text("role").notNull().default("citizen"),
  // none | pending | approved | rejected
  verificationStatus: text("verification_status").notNull().default("none"),
  isVerified: boolean("is_verified").notNull().default(false),
  isStaff: boolean("is_staff").notNull().default(false),
  isActive: boolean("is_active").notNull().default(true),
  constituencyId: integer("constituency_id"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(), // sha-256 hash of the bearer token
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const verificationRequests = pgTable("verification_requests", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  role: text("role").notNull(),
  note: text("note").notNull().default(""),
  // pending | approved | rejected
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

/* --------------------------------- content -------------------------------- */

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  icon: text("icon").notNull().default("circle-alert"),
  color: text("color").notNull().default("blue"),
});

export const locations = pgTable(
  "locations",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    // state | district | taluk | hobli | gram_panchayat | village | city | town | ward
    type: text("type").notNull(),
    parentId: integer("parent_id"),
    // schematic coordinates (0-100) used by the simple /map page
    mapX: real("map_x"),
    mapY: real("map_y"),
  },
  (t) => [index("locations_parent_idx").on(t.parentId)],
);

export const problems = pgTable(
  "problems",
  {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id),
    locationId: integer("location_id")
      .notNull()
      .references(() => locations.id),
    reporterId: integer("reporter_id")
      .notNull()
      .references(() => users.id),
    showIdentity: boolean("show_identity").notNull().default(false),
    // reported | verified | awaiting_response | in_progress | completed | overdue
    status: text("status").notNull().default("reported"),
    supporterCount: integer("supporter_count").notNull().default(0),
    // static path (/images/...) or dynamic (/api/photos/<uuid>)
    photoPath: text("photo_path"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index("problems_status_idx").on(t.status),
    index("problems_location_idx").on(t.locationId),
    index("problems_category_idx").on(t.categoryId),
  ],
);

export const photos = pgTable("photos", {
  id: uuid("id").defaultRandom().primaryKey(),
  data: bytea("data").notNull(),
  contentType: text("content_type").notNull().default("image/jpeg"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const supports = pgTable(
  "supports",
  {
    id: serial("id").primaryKey(),
    problemId: integer("problem_id")
      .notNull()
      .references(() => problems.id, { onDelete: "cascade" }),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [uniqueIndex("supports_unique").on(t.problemId, t.userId)],
);

export const comments = pgTable(
  "comments",
  {
    id: serial("id").primaryKey(),
    problemId: integer("problem_id")
      .notNull()
      .references(() => problems.id, { onDelete: "cascade" }),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    body: text("body").notNull(),
    isRemoved: boolean("is_removed").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [index("comments_problem_idx").on(t.problemId)],
);

export const statusEvents = pgTable(
  "status_events",
  {
    id: serial("id").primaryKey(),
    problemId: integer("problem_id")
      .notNull()
      .references(() => problems.id, { onDelete: "cascade" }),
    status: text("status").notNull(),
    note: text("note").notNull().default(""),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [index("status_events_problem_idx").on(t.problemId)],
);

export const officialResponses = pgTable("official_responses", {
  id: serial("id").primaryKey(),
  problemId: integer("problem_id")
    .notNull()
    .references(() => problems.id, { onDelete: "cascade" }),
  body: text("body").notNull(),
  officialName: text("official_name").notNull(),
  department: text("department").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const notifications = pgTable(
  "notifications",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    body: text("body").notNull(),
    link: text("link"),
    isRead: boolean("is_read").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [index("notifications_user_idx").on(t.userId)],
);

/* ---------------------------------- types ---------------------------------- */

export type User = typeof users.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Location = typeof locations.$inferSelect;
export type Problem = typeof problems.$inferSelect;
export type Comment = typeof comments.$inferSelect;
export type StatusEvent = typeof statusEvents.$inferSelect;
export type OfficialResponse = typeof officialResponses.$inferSelect;
export type Notification = typeof notifications.$inferSelect;
export type VerificationRequest = typeof verificationRequests.$inferSelect;
