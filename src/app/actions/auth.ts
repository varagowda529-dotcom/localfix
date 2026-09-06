"use server";

import { redirect } from "next/navigation";
import { eq, or } from "drizzle-orm";
import { db } from "@/db";
import { users, verificationRequests } from "@/db/schema";
import { createSession, destroySession, getCurrentUser } from "@/lib/auth";
import { findUserByUsername } from "@/lib/data";
import { hashPassword, verifyPassword } from "@/lib/password";
import { ROLES } from "@/lib/constants";

function safeNext(next: string | null | undefined, fallback: string): string {
  if (next && next.startsWith("/") && !next.startsWith("//")) return next;
  return fallback;
}

export async function login(formData: FormData) {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "");

  if (!username || !password) {
    redirect(`/login?error=${encodeURIComponent("Enter your username and password.")}`);
  }

  const user = await findUserByUsername(username);
  if (!user || !verifyPassword(password, user.passwordHash)) {
    redirect(`/login?error=${encodeURIComponent("Invalid username or password.")}`);
  }
  if (!user.isActive) {
    redirect(`/login?error=${encodeURIComponent("This account has been deactivated.")}`);
  }

  await createSession(user.id);
  redirect(safeNext(next, "/dashboard"));
}

export async function signup(formData: FormData) {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const username = String(formData.get("username") ?? "").trim().toLowerCase();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const role = String(formData.get("role") ?? "citizen");

  const err = (msg: string) => redirect(`/signup?error=${encodeURIComponent(msg)}`);

  if (!fullName || fullName.length < 2) err("Please enter your full name.");
  if (!/^[a-z0-9_]{3,24}$/.test(username)) {
    err("Username must be 3–24 characters (letters, numbers, underscore).");
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) err("Please enter a valid email address.");
  if (password.length < 8) err("Password must be at least 8 characters.");
  if (!ROLES.some((r) => r.slug === role)) err("Please choose a valid role.");

  const clash = await db
    .select({ id: users.id })
    .from(users)
    .where(or(eq(users.username, username), eq(users.email, email)))
    .limit(1);
  if (clash.length) err("That username or email is already registered.");

  const roleDef = ROLES.find((r) => r.slug === role)!;
  const [user] = await db
    .insert(users)
    .values({
      fullName,
      username,
      email,
      passwordHash: hashPassword(password),
      role,
      verificationStatus: roleDef.needsVerification ? "pending" : "approved",
      isVerified: !roleDef.needsVerification,
    })
    .returning();

  if (roleDef.needsVerification) {
    await db.insert(verificationRequests).values({
      userId: user.id,
      role,
      note: `Self-registered as ${roleDef.label}. Awaiting document review.`,
    });
  }

  await createSession(user.id);
  redirect("/dashboard?welcome=1");
}

export async function logout() {
  await destroySession();
  redirect("/");
}

export async function markAllNotificationsRead() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const { notifications } = await import("@/db/schema");
  await db
    .update(notifications)
    .set({ isRead: true })
    .where(eq(notifications.userId, user.id));
  redirect("/dashboard");
}
