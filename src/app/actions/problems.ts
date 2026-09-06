"use server";

import { redirect } from "next/navigation";
import { and, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import {
  comments,
  notifications,
  photos,
  problems,
  statusEvents,
  supports,
} from "@/db/schema";
import { getCurrentUser } from "@/lib/auth";

export async function reportProblem(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/report");

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const categoryId = Number(formData.get("categoryId"));
  const locationId = Number(formData.get("locationId"));
  const showIdentity = formData.get("showIdentity") === "on";

  const err = (msg: string) => redirect(`/report?error=${encodeURIComponent(msg)}`);

  if (!title || title.length < 8) err("Please give the problem a clear title (min 8 characters).");
  if (!description || description.length < 20) {
    err("Please describe the problem in at least 20 characters.");
  }
  if (!Number.isInteger(categoryId) || !Number.isInteger(locationId)) {
    err("Please choose a category and a location.");
  }

  // Optional photo upload — stored inside the database, served via /api/photos/[id]
  let photoPath: string | null = null;
  const file = formData.get("photo");
  if (file instanceof File && file.size > 0) {
    if (!file.type.startsWith("image/")) err("The photo must be an image file.");
    if (file.size > 3 * 1024 * 1024) err("The photo must be smaller than 3 MB.");
    const buffer = Buffer.from(await file.arrayBuffer());
    const [photo] = await db
      .insert(photos)
      .values({ data: buffer, contentType: file.type })
      .returning({ id: photos.id });
    photoPath = `/api/photos/${photo.id}`;
  }

  const [problem] = await db
    .insert(problems)
    .values({
      title,
      description,
      categoryId,
      locationId,
      reporterId: user.id,
      showIdentity,
      status: "reported",
      photoPath,
    })
    .returning({ id: problems.id });

  await db.insert(statusEvents).values({
    problemId: problem.id,
    status: "reported",
    note: "Report submitted by a citizen.",
  });
  await db.insert(notifications).values({
    userId: user.id,
    body: `Your report “${title}” is now public. We'll notify you as it moves forward.`,
    link: `/problems/${problem.id}`,
  });

  redirect(`/problems/${problem.id}?created=1`);
}

export async function toggleSupport(formData: FormData) {
  const user = await getCurrentUser();
  const problemId = Number(formData.get("problemId"));
  if (!user) redirect(`/login?next=/problems/${problemId}`);
  if (!Number.isInteger(problemId)) redirect("/problems");

  const existing = await db
    .select({ id: supports.id })
    .from(supports)
    .where(and(eq(supports.problemId, problemId), eq(supports.userId, user.id)))
    .limit(1);

  if (existing.length) {
    await db.delete(supports).where(eq(supports.id, existing[0].id));
    await db
      .update(problems)
      .set({ supporterCount: sql`greatest(${problems.supporterCount} - 1, 0)` })
      .where(eq(problems.id, problemId));
  } else {
    await db.insert(supports).values({ problemId, userId: user.id });
    await db
      .update(problems)
      .set({ supporterCount: sql`${problems.supporterCount} + 1` })
      .where(eq(problems.id, problemId));
    const [problem] = await db
      .select({ title: problems.title, reporterId: problems.reporterId })
      .from(problems)
      .where(eq(problems.id, problemId));
    if (problem && problem.reporterId !== user.id) {
      await db.insert(notifications).values({
        userId: problem.reporterId,
        body: `${user.fullName} supported your report “${problem.title}”.`,
        link: `/problems/${problemId}`,
      });
    }
  }
  redirect(`/problems/${problemId}#support`);
}

export async function addComment(formData: FormData) {
  const user = await getCurrentUser();
  const problemId = Number(formData.get("problemId"));
  if (!user) redirect(`/login?next=/problems/${problemId}`);
  const body = String(formData.get("body") ?? "").trim();
  if (!body || !Number.isInteger(problemId)) redirect(`/problems/${problemId}#comments`);

  await db.insert(comments).values({ problemId, userId: user.id, body });
  const [problem] = await db
    .select({ title: problems.title, reporterId: problems.reporterId })
    .from(problems)
    .where(eq(problems.id, problemId));
  if (problem && problem.reporterId !== user.id) {
    await db.insert(notifications).values({
      userId: problem.reporterId,
      body: `${user.fullName} commented on “${problem.title}”.`,
      link: `/problems/${problemId}#comments`,
    });
  }
  redirect(`/problems/${problemId}#comments`);
}
