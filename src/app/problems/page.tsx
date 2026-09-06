import type { Metadata } from "next";
import { getCategories, listProblems, locationOptions, getLocations } from "@/lib/data";
import { ProblemsListClient } from "@/components/problems-list-client";

export const metadata: Metadata = { title: "Explore Problems" };
export const dynamic = "force-dynamic";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function ProblemsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const locationSlug = typeof params.location === "string" ? params.location : "";
  const categorySlug = typeof params.category === "string" ? params.category : "";
  const status = typeof params.status === "string" ? params.status : "";
  const sort = typeof params.sort === "string" ? params.sort : "newest";

  const [problemsData, categories, options, allLocations] = await Promise.all([
    listProblems({
      locationSlug: locationSlug || undefined,
      categorySlug: categorySlug || undefined,
      status: status || undefined,
      sort,
    }),
    getCategories(),
    locationOptions(),
    getLocations(),
  ]);

  const activeLocationName = allLocations.find((l) => l.slug === locationSlug)?.name ?? "";

  return (
    <ProblemsListClient
      problemsData={problemsData}
      categories={categories}
      options={options}
      activeLocationName={activeLocationName}
      filters={{ locationSlug, categorySlug, status, sort }}
    />
  );
}