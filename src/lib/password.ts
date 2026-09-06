import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

// Password hashing with Node's built-in scrypt — no external dependencies,
// same idea as Django's PBKDF2 password hasher. Safe to use from scripts too
// (this module does not import next/headers).

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `scrypt$${salt}$${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [scheme, salt, hash] = stored.split("$");
  if (scheme !== "scrypt" || !salt || !hash) return false;
  const candidate = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  return candidate.length === expected.length && timingSafeEqual(candidate, expected);
}
