import "dotenv/config";
import { eq } from "drizzle-orm";
import { db } from "../src/db";
import { users } from "../src/db/schema";
import { hashPassword } from "../src/lib/password";

async function main() {
  const username = "admin";
  const password = "admin123";
  const passwordHash = hashPassword(password);

  const existing = await db.select().from(users).where(eq(users.username, username)).limit(1);

  if (existing[0]) {
    await db
      .update(users)
      .set({
        passwordHash,
        isStaff: true,
        isActive: true,
        isVerified: true,
        verificationStatus: "approved",
        fullName: "Site Administrator",
        email: "admin@localfix.demo",
        role: "citizen",
      })
      .where(eq(users.id, existing[0].id));
    console.log("Admin user updated ✔");
  } else {
    await db.insert(users).values({
      username,
      email: "admin@localfix.demo",
      passwordHash,
      fullName: "Site Administrator",
      role: "citizen",
      isStaff: true,
      isActive: true,
      isVerified: true,
      verificationStatus: "approved",
    });
    console.log("Admin user created ✔");
  }

  console.log("Login with:");
  console.log("  username: admin");
  console.log("  password: admin123");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
