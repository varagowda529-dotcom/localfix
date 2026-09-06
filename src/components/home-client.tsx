"use client";

import Link from "next/link";
import {
  Search,
  ArrowRight,
  ClipboardList,
  ThumbsUp,
  Building2,
  CheckCircle2,
  Megaphone,
  MapPin,
  TrendingUp,
  Landmark,
} from "lucide-react";
import type { ProblemCard as ProblemCardData } from "@/lib/data";
import { ProblemCard } from "@/components/problem-card";
import { useLanguage } from "@/components/language-provider";

type Stats = {
  problems: number;
  supporters: number;
  resolved: number;
  locations: number;
  officialResponses: number;
  citizens: number;
};

export function HomeClient({
  stats,
  trending,
}: {
  stats: Stats;
  trending: ProblemCardData[];
}) {
  const { t } = useLanguage();

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(600px 300px at 10% 0%, rgba(37,99,235,.10), transparent 60%), radial-gradient(700px 380px at 90% 20%, rgba(13,148,136,.10), transparent 60%)",
          }}
        />
        <div className="container-site relative grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_1fr] lg:py-20">
          <div>
            <span className="badge bg-accent-500/10 text-accent-600 ring-accent-500/20 ring-1">
              <Megaphone className="h-3.5 w-3.5" />
              {t("heroBadge")}
            </span>
            <h1 className="mt-5 text-4xl leading-[1.08] font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.4rem]">
              {t("heroTitle1")}{" "}
              <span className="bg-gradient-to-r from-brand-500 to-accent-500 bg-clip-text text-transparent">
                {t("heroTitle2")}
              </span>{" "}
              {t("heroTitle3")}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
              {t("heroDesc")}
            </p>

            <form action="/locations" method="GET" className="mt-7 flex max-w-xl gap-2">
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-4 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  name="q"
                  placeholder={t("heroSearchPlaceholder")}
                  className="input rounded-full py-3 pl-11 shadow-sm"
                />
              </div>
              <button type="submit" className="btn-outline shrink-0 rounded-full">
                {t("search")}
              </button>
            </form>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link href="/report" className="btn-primary px-7 py-3 text-base">
                {t("reportProblem")} <ArrowRight className="h-4.5 w-4.5" />
              </Link>
              <Link href="/problems" className="btn-outline px-7 py-3 text-base">
                {t("exploreProblemsBtn")}
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-slate-200 shadow-2xl shadow-slate-900/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80"
                alt="Karnataka civic landscape"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 rounded-2xl bg-white/95 px-4 py-3 shadow-lg backdrop-blur">
                <p className="flex items-center gap-1.5 text-xs font-bold tracking-wide text-slate-500 uppercase">
                  <MapPin className="h-3.5 w-3.5 text-brand-500" /> {t("coveredInDemo")}
                </p>
                <p className="mt-0.5 text-sm font-bold text-slate-900">
                  {t("coveredList")}
                </p>
              </div>
            </div>
            <div className="absolute -top-4 -right-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-lg sm:-right-6">
              <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                <TrendingUp className="h-4 w-4 text-accent-600" /> {t("trendingNow")}
              </p>
              <p className="mt-0.5 text-lg font-extrabold text-slate-900">
                {stats.supporters.toLocaleString("en-IN")}{" "}
                <span className="text-xs font-semibold text-slate-500">{t("supporters")}</span>
              </p>
            </div>
            <div className="absolute -bottom-4 right-8 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-lg">
              <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> {t("resolved")}
              </p>
              <p className="mt-0.5 text-lg font-extrabold text-slate-900">
                {stats.resolved}{" "}
                <span className="text-xs font-semibold text-slate-500">{t("problemsFixed")}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-slate-200 bg-slate-900 text-white">
        <div className="container-site grid grid-cols-2 gap-8 py-10 sm:grid-cols-4">
          {[
            { label: t("problemsReported"), value: stats.problems, icon: ClipboardList },
            { label: t("citizenSupporters"), value: stats.supporters, icon: ThumbsUp },
            { label: t("officialResponses"), value: stats.officialResponses, icon: Building2 },
            { label: t("locationsCovered"), value: stats.locations, icon: MapPin },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                <s.icon className="h-6 w-6 text-accent-500" />
              </span>
              <div>
                <p className="text-2xl font-extrabold sm:text-3xl">
                  {s.value.toLocaleString("en-IN")}
                </p>
                <p className="text-xs font-medium tracking-wide text-slate-400 uppercase">
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRENDING */}
      <section className="container-site py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-eyebrow">{t("trendingEyebrow")}</p>
            <h2 className="section-title">{t("trendingTitle")}</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
              {t("trendingDesc")}
            </p>
          </div>
          <Link href="/problems" className="btn-outline">
            {t("viewAllProblems")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trending.map((data, i) => (
            <ProblemCard key={data.problem.id} data={data} rank={i + 1} />
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-y border-slate-200 bg-white py-16">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-eyebrow">{t("howEyebrow")}</p>
            <h2 className="section-title">{t("howTitle")}</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: ClipboardList, step: t("step1"), title: t("step1Title"), body: t("step1Body"), num: "01" },
              { icon: ThumbsUp, step: t("step2"), title: t("step2Title"), body: t("step2Body"), num: "02" },
              { icon: Building2, step: t("step3"), title: t("step3Title"), body: t("step3Body"), num: "03" },
              { icon: CheckCircle2, step: t("step4"), title: t("step4Title"), body: t("step4Body"), num: "04" },
            ].map((s) => (
              <div key={s.title} className="card relative p-6">
                <span className="absolute top-6 right-6 text-4xl font-extrabold text-slate-100">
                  {s.num}
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-sm">
                  <s.icon className="h-6 w-6" />
                </span>
                <p className="mt-4 text-xs font-bold tracking-widest text-accent-600 uppercase">
                  {s.step}
                </p>
                <h3 className="mt-1 text-base font-bold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HIERARCHY */}
      <section className="container-site py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="section-eyebrow">{t("hierarchyEyebrow")}</p>
            <h2 className="section-title">{t("hierarchyTitle")}</h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-500">
              {t("hierarchyDesc")}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/locations" className="btn-primary">
                {t("searchLocation")} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/map" className="btn-outline">
                {t("openMap")}
              </Link>
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
              <Landmark className="h-4 w-4 text-brand-500" /> {t("exampleRuralHierarchy")}
            </div>
            <ol className="mt-4 space-y-0">
              {[
                t("hierKarnataka"),
                t("hierTumakuru"),
                t("hierTiptur"),
                t("hierNonavinakere"),
                t("hierNagaraghatta"),
                t("hierHonnenahalli"),
              ].map((name, i, arr) => (
                <li key={name} className="relative flex gap-3 pb-3 last:pb-0">
                  {i < arr.length - 1 && (
                    <span className="absolute top-6 left-[9px] h-full w-0.5 bg-gradient-to-b from-brand-500/50 to-accent-500/50" />
                  )}
                  <span
                    className="relative z-10 mt-1.5 h-5 w-5 shrink-0 rounded-full border-2 border-white shadow"
                    style={{
                      background: `linear-gradient(135deg, #2563eb ${i * 15}%, #0d9488)`,
                      marginLeft: `${i * 14}px`,
                    }}
                  />
                  <span className="mt-1 text-sm font-bold text-slate-800">{name}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-200 bg-gradient-to-r from-brand-600 to-accent-600">
        <div className="container-site flex flex-col items-center justify-between gap-6 py-12 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              {t("ctaTitle")}
            </h2>
            <p className="mt-1.5 text-sm font-medium text-white/80">
              {t("ctaDesc")}
            </p>
          </div>
          <Link
            href="/report"
            className="btn shrink-0 bg-white px-7 py-3 text-base font-bold text-brand-600 shadow-lg hover:bg-slate-50"
          >
            {t("reportProblem")} <ArrowRight className="h-4.5 w-4.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}