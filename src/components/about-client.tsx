"use client";

import Link from "next/link";
import {
  Megaphone,
  Eye,
  Landmark,
  Users,
  BadgeCheck,
  ArrowRight,
  ShieldCheck,
  TreePine,
} from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export function AboutClient() {
  const { t } = useLanguage();

  return (
    <div>
      <section className="border-b border-slate-200 bg-slate-900 py-16 text-white">
        <div className="container-site max-w-3xl">
          <p className="flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-accent-500 uppercase">
            <Megaphone className="h-4 w-4" /> {t("aboutEyebrow")}
          </p>
          <h1 className="mt-4 text-3xl leading-tight font-extrabold tracking-tight sm:text-5xl">
            {t("aboutTitle")}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-300">
            {t("aboutIntro")}
          </p>
        </div>
      </section>

      <section className="container-site py-14">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Eye, title: t("principleVisibilityT"), body: t("principleVisibilityB") },
            { icon: Users, title: t("principlePressureT"), body: t("principlePressureB") },
            { icon: Landmark, title: t("principleAccountT"), body: t("principleAccountB") },
          ].map((p) => (
            <div key={p.title} className="card p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-white">
                <p.icon className="h-5.5 w-5.5" />
              </span>
              <h2 className="mt-4 text-lg font-bold text-slate-900">{p.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="roles" className="border-y border-slate-200 bg-white py-14">
        <div className="container-site">
          <p className="section-eyebrow">{t("rolesEyebrow")}</p>
          <h2 className="section-title">{t("rolesTitle")}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              [t("roleCitizenT"), t("roleCitizenB")],
              [t("rolePoliticianT"), t("rolePoliticianB")],
              [t("roleGovtT"), t("roleGovtB")],
              [t("roleMediaT"), t("roleMediaB")],
              [t("rolePublicT"), t("rolePublicB")],
            ].map(([title, body]) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
                <h3 className="flex items-center gap-2 text-sm font-extrabold text-slate-800">
                  <BadgeCheck className="h-4 w-4 text-brand-500" /> {title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{body}</p>
              </div>
            ))}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <h3 className="flex items-center gap-2 text-sm font-extrabold text-amber-800">
                <ShieldCheck className="h-4 w-4" /> {t("verifPendingT")}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-amber-700">
                {t("verifPendingB")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="hierarchy" className="container-site py-14">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="section-eyebrow">{t("hierEyebrow")}</p>
            <h2 className="section-title">{t("hierTitle")}</h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-500">
              {t("hierDesc")}
            </p>
            <Link href="/locations" className="btn-primary mt-6">
              {t("tryLocationSearch")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-4">
            <div className="card flex items-start gap-3 p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-accent-600">
                <TreePine className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-extrabold text-slate-800">{t("ruralChainT")}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  {t("ruralChainB")}
                </p>
              </div>
            </div>
            <div className="card flex items-start gap-3 p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Landmark className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-extrabold text-slate-800">{t("urbanChainT")}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  {t("urbanChainB")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-gradient-to-r from-brand-600 to-accent-600">
        <div className="container-site py-12 text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            {t("aboutCtaTitle")}
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/signup" className="btn bg-white px-6 py-3 font-bold text-brand-600 shadow-lg hover:bg-slate-50">
              {t("createAccount")}
            </Link>
            <Link href="/problems" className="btn border border-white/40 px-6 py-3 font-bold text-white hover:bg-white/10">
              {t("exploreProblemsShort")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}