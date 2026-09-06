import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getCategories, locationOptions } from "@/lib/data";
import { ReportClient } from "@/components/report-client";

export const metadata: Metadata = { title: "Report a Problem" };
export const dynamic = "force-dynamic";

export default async function ReportPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/report");

  const sp = await searchParams;
  const [categories, options] = await Promise.all([getCategories(), locationOptions()]);
  const error = typeof sp.error === "string" ? sp.error : "";

  return <ReportClient categories={categories} options={options} error={error} />;
}