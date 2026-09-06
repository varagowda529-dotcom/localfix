import type { Metadata } from "next";
import { getLocations, getLocationCountRollup } from "@/lib/data";
import { MapPageClient } from "@/components/map-page-client";

export const metadata: Metadata = { title: "Karnataka Problem Map" };
export const dynamic = "force-dynamic";

export default async function MapPage() {
  const [all, counts] = await Promise.all([getLocations(), getLocationCountRollup()]);

  const districts = all
    .filter((l) => l.type === "district")
    .map((d) => ({ name: d.name, slug: d.slug, count: counts.get(d.id) ?? 0 }));

  return <MapPageClient districts={districts} />;
}