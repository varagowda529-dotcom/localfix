"use client";

import Link from "next/link";
import { ClipboardList, Filter, RotateCcw, SearchX } from "lucide-react";
import { STATUSES } from "@/lib/constants";
import { ProblemCard } from "@/components/problem-card";
import { useLanguage } from "@/components/language-provider";
import type { ProblemCard as ProblemCardData, LocationOption } from "@/lib/data";
import type { Category } from "@/db/schema";

type Filters = {
  locationSlug: string;
  categorySlug: string;
  status: string;
  sort: string;
};

export function ProblemsListClient({
  problemsData,
  categories,
  options,
  activeLocationName,
  filters,
}: {
  problemsData: ProblemCardData[];
  categories: Category[];
  options: LocationOption[];
  activeLocationName: string;
  filters: Filters;
}) {
  const { t } = useLanguage();
  const hasFilters = Boolean(filters.locationSlug || filters.categorySlug || filters.status);

  return (
    <div>
      <section className="border-b border-slate-200 bg-white">
        <div className="container-site py-10">
          <p className="section-eyebrow">{t("publicRecord")}</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {t("problemsListTitle")}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
            {t("problemsListDesc")}
            {activeLocationName && (
              <> — <span className="font-bold text-slate-700">{activeLocationName}</span></>
            )}
          </p>
        </div>
      </section>

      <section className="sticky top-16 z-30 border-b border-slate-200 bg-slate-50/95 backdrop-blur">
        <div className="container-site py-4">
          <form method="GET" action="/problems" className="flex flex-wrap items-end gap-3">
            <div className="min-w-44 flex-1">
              <label htmlFor="location" className="label text-xs">{t("location")}</label>
              <select id="location" name="location" defaultValue={filters.locationSlug} className="input py-2">
                <option value="">{t("filterAllLocations")}</option>
                {options.map((o) => (
                  <option key={o.id} value={o.slug}>{o.label}</option>
                ))}
              </select>
            </div>
            <div className="min-w-40 flex-1">
              <label htmlFor="category" className="label text-xs">{t("category")}</label>
              <select id="category" name="category" defaultValue={filters.categorySlug} className="input py-2">
                <option value="">{t("filterAllCategories")}</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="min-w-44 flex-1">
              <label htmlFor="status" className="label text-xs">{t("status")}</label>
              <select id="status" name="status" defaultValue={filters.status} className="input py-2">
                <option value="">{t("filterAllStatuses")}</option>
                {STATUSES.map((s) => (
                  <option key={s.slug} value={s.slug}>{s.label}</option>
                ))}
              </select>
            </div>
            <div className="min-w-36">
              <label htmlFor="sort" className="label text-xs">{t("sortBy")}</label>
              <select id="sort" name="sort" defaultValue={filters.sort} className="input py-2">
                <option value="newest">{t("sortNewest")}</option>
                <option value="supported">{t("sortMostSupported")}</option>
                <option value="oldest">{t("sortOldest")}</option>
              </select>
            </div>
            <button type="submit" className="btn-primary btn-sm px-5 py-2.5">
              <Filter className="h-3.5 w-3.5" /> {t("applyFilters")}
            </button>
            {hasFilters && (
              <Link href="/problems" className="btn-ghost btn-sm py-2.5">
                <RotateCcw className="h-3.5 w-3.5" /> {t("reset")}
              </Link>
            )}
          </form>
        </div>
      </section>

      <section className="container-site py-10">
        <p className="mb-5 flex items-center gap-2 text-sm font-semibold text-slate-500">
          <ClipboardList className="h-4 w-4 text-brand-500" />
          {problemsData.length} {t("problemsFound")}
        </p>
        {problemsData.length === 0 ? (
          <div className="card flex flex-col items-center gap-3 px-6 py-16 text-center">
            <SearchX className="h-10 w-10 text-slate-300" />
            <p className="text-lg font-bold text-slate-700">{t("noProblemsMatch")}</p>
            <p className="max-w-md text-sm text-slate-500">{t("noProblemsDesc")}</p>
            <div className="mt-2 flex gap-3">
              <Link href="/problems" className="btn-outline btn-sm">{t("clearFilters")}</Link>
              <Link href="/report" className="btn-primary btn-sm">{t("reportProblem")}</Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {problemsData.map((data) => (
              <ProblemCard key={data.problem.id} data={data} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}