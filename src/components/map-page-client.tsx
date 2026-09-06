"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Info, MapPin } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

const KarnatakaMap = dynamic(() => import("@/components/karnataka-map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[600px] w-full animate-pulse items-center justify-center rounded-2xl bg-slate-100 text-sm font-semibold text-slate-400">
      Loading map...
    </div>
  ),
});

export function MapPageClient({
  districts,
}: {
  districts: { name: string; slug: string; count: number }[];
}) {
  const { t } = useLanguage();

  return (
    <div className="container-site py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="section-eyebrow">{t("mapEyebrow")}</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {t("mapTitle")}
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500">{t("mapDesc")}</p>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-semibold text-slate-600 shadow-sm">
          <span className="text-[10px] uppercase tracking-widest text-slate-400">{t("problemCount")}:</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded border border-slate-200 bg-slate-50" /> 0</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-teal-300" /> 1–3</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-teal-500" /> 4–7</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-teal-700" /> 8+</span>
        </div>
      </div>

      <div className="mt-8">
        <KarnatakaMap districts={districts} />
      </div>

      <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-slate-400">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        {t("mapInfo")}
      </p>

      <div className="mt-12 border-t border-slate-100 pt-8">
        <h3 className="mb-5 text-lg font-extrabold text-slate-900">{t("districtQuickLinks")}</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {districts
            .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
            .map((loc) => (
              <Link key={loc.slug} href={`/locations/${loc.slug}`}
                className="card flex items-center justify-between gap-3 px-4 py-3 transition hover:border-brand-300 hover:shadow-md"
              >
                <span className="flex min-w-0 items-center gap-2">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <span className="truncate text-sm font-bold text-slate-800">{loc.name}</span>
                </span>
                <span className={`rounded-full px-2.5 py-1 text-xs font-extrabold ${loc.count > 0 ? "bg-teal-50 text-teal-700" : "bg-slate-100 text-slate-500"}`}>
                  {loc.count}
                </span>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}