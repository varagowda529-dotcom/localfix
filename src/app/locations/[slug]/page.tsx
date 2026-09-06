import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  ChevronRight,
  LandPlot,
  Building2,
  ArrowRight,
} from "lucide-react";
import {
  getLocations,
  getLocationCountRollup,
  childrenMap,
  locationPath,
  problemsInLocation,
} from "@/lib/data";
import { locationTypeLabel } from "@/lib/constants";
import { ProblemCard } from "@/components/problem-card";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const all = await getLocations();
  const loc = all.find((l) => l.slug === slug);
  return { title: loc ? `${loc.name} — CivicVoice` : "Location" };
}

function typeBadge(type: string) {
  const urban = ["city", "town", "ward"].includes(type);
  return (
    <span
      className={`badge ring-1 ${
        urban
          ? "bg-violet-50 text-violet-700 ring-violet-200"
          : "bg-teal-50 text-teal-700 ring-teal-200"
      }`}
    >
      {urban ? <Building2 className="h-3 w-3" /> : <LandPlot className="h-3 w-3" />}
      {locationTypeLabel(type)}
    </span>
  );
}

export default async function LocationDetailPage({ params }: Props) {
  const { slug } = await params;
  const [all, counts] = await Promise.all([getLocations(), getLocationCountRollup()]);

  const loc = all.find((l) => l.slug === slug);
  if (!loc) notFound();

  const kids = childrenMap(all);
  const children = kids.get(loc.id) ?? [];
  const path = locationPath(all, loc.id);
  const totalCount = counts.get(loc.id) ?? 0;

  // Fetch problems in this area
  const areaProblems = await problemsInLocation(loc.id, 6);

  // Determine what level we are showing
  const childTypeLabel =
    children.length > 0
      ? locationTypeLabel(children[0].type) + "s"
      : "";

  return (
    <div>
      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="container-site py-8">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-1.5 text-sm font-medium text-slate-500">
            <Link href="/locations" className="flex items-center gap-1 transition hover:text-brand-600">
              <ArrowLeft className="h-4 w-4" /> All Districts
            </Link>
            {path.map((p, i) => (
              <span key={p.id} className="flex items-center gap-1.5">
                <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
                {i === path.length - 1 ? (
                  <span className="font-bold text-slate-800">{p.name}</span>
                ) : (
                  <Link href={`/locations/${p.slug}`} className="transition hover:text-brand-600">
                    {p.name}
                  </Link>
                )}
              </span>
            ))}
          </nav>

          <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                {typeBadge(loc.type)}
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
                  {totalCount} problem{totalCount === 1 ? "" : "s"} in this area
                </span>
              </div>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                {loc.name}
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                {path.map((p) => p.name).join(" → ")}
              </p>
            </div>
            {totalCount > 0 && (
              <Link
                href={`/problems?location=${loc.slug}`}
                className="btn-primary"
              >
                View all problems <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </section>

      <div className="container-site py-10">
        {/* Children grid */}
        {children.length > 0 ? (
          <section>
            <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-900">
              <MapPin className="h-5 w-5 text-brand-500" />
              {children.length} {childTypeLabel} in {loc.name}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Click any {children[0]?.type ?? "area"} to drill deeper into the hierarchy.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {children
                .slice()
                .sort((a, b) => (counts.get(b.id) ?? 0) - (counts.get(a.id) ?? 0))
                .map((child) => {
                  const count = counts.get(child.id) ?? 0;
                  const hasKids = (kids.get(child.id) ?? []).length > 0;
                  return (
                    <Link
                      key={child.id}
                      href={`/locations/${child.slug}`}
                      className="card group flex items-center gap-3 px-4 py-3.5 transition hover:border-brand-300 hover:shadow-md"
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white ${
                          ["city", "town", "ward"].includes(child.type)
                            ? "bg-gradient-to-br from-brand-500 to-brand-700"
                            : "bg-gradient-to-br from-accent-500 to-accent-600"
                        }`}
                      >
                        <MapPin className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-bold text-slate-800 group-hover:text-brand-600">
                          {child.name}
                        </span>
                        <span className="block text-xs font-medium text-slate-400">
                          {locationTypeLabel(child.type)}
                          {hasKids && ` · ${(kids.get(child.id) ?? []).length} sub-areas`}
                        </span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-extrabold text-slate-600 group-hover:bg-brand-100 group-hover:text-brand-700">
                          {count}
                        </span>
                        <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-brand-500" />
                      </span>
                    </Link>
                  );
                })}
            </div>
          </section>
        ) : (
          <section className="card px-6 py-12 text-center">
            <MapPin className="mx-auto h-10 w-10 text-slate-300" />
            <p className="mt-3 text-lg font-bold text-slate-700">
              No sub-areas under {loc.name}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              This is the deepest level in the hierarchy. View reported problems below.
            </p>
          </section>
        )}

        {/* Problems in this area */}
        {areaProblems.length > 0 && (
          <section className="mt-12">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-900">
                  <LandPlot className="h-5 w-5 text-accent-600" />
                  Problems in {loc.name}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Showing top {areaProblems.length} most-supported problems in this area.
                </p>
              </div>
              <Link href={`/problems?location=${loc.slug}`} className="btn-outline btn-sm">
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {areaProblems.map((data) => (
                <ProblemCard key={data.problem.id} data={data} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}