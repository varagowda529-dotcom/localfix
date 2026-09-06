import type { Metadata } from "next";
import { SignupClient } from "@/components/signup-client";

export const metadata: Metadata = { title: "Sign Up" };
export const dynamic = "force-dynamic";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const error = typeof sp.error === "string" ? sp.error : "";
  return <SignupClient error={error} />;
}