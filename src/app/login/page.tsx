import type { Metadata } from "next";
import { LoginClient } from "@/components/login-client";

export const metadata: Metadata = { title: "Login" };
export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const next = typeof sp.next === "string" ? sp.next : "";
  const error = typeof sp.error === "string" ? sp.error : "";
  return <LoginClient next={next} error={error} />;
}