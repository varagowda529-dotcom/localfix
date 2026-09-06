import type { Metadata } from "next";
import {
  getLocations,
  searchLocations,
  getLocationCountRollup,
  problemsInLocation,
} from "@/lib/data";
import { LocationsPageClient } from "@/components/locations-page-client";

export const metadata: Metadata = { title: "Districts of Karnataka" };
export const dynamic = "force-dynamic";

export default async function LocationsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q.trim() : "";

  const [all, counts] = await Promise.all([getLocations(), getLocationCountRollup()]);
  const districts = all.filter((l) => l.type === "district").map((d) => ({
    id: d.id,
    name: d.name,
    slug: d.slug,
    count: counts.get(d.id) ?? 0,
  }));

  const matches = q ? await searchLocations(q) : [];
  const best = matches[0];
  const bestProblems = best ? await problemsInLocation(best.loc.id, 4) : [];
  const bestCount = best ? counts.get(best.loc.id) ?? 0 : 0;

  return (
    <LocationsPageClient
      q={q}
      districts={districts}
      best={best ? { name: best.loc.name, slug: best.loc.slug, type: best.loc.type, count: bestCount } : null}
      bestProblems={bestProblems}
    />
  );
}