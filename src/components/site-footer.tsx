"use client";

import Link from "next/link";
import { Megaphone, MapPin, FlaskConical } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export function SiteFooter() {
  const { t } = useLanguage();

  const COLUMNS = [
    {
      title: t("footerPlatform"),
      links: [
        { href: "/problems", label: t("exploreProblems") },
        { href: "/locations", label: t("locations") },
        { href: "/map", label: t("map") },
        { href: "/report", label: t("reportProblem") },
      ],
    },
    {
      title: t("footerAccount"),
      links: [
        { href: "/login", label: t("login") },
        { href: "/signup", label: t("signup") },
        { href: "/dashboard", label: t("dashboard") },
      ],
    },
    {
      title: t("footerAbout"),
      links: [
        { href: "/about", label: t("footerHowItWorks") },
        { href: "/about#roles", label: t("footerRolesVerify") },
        { href: "/about#hierarchy", label: t("footerHierarchy") },
      ],
    },
  ];

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-site grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-white">
              <Megaphone className="h-5 w-5" />
            </span>
            <span className="text-lg font-extrabold tracking-tight text-slate-900">
              {t("brandFirst")}<span className="text-brand-500">{t("brandSecond")}</span>
            </span>
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-500">
            {t("footerTagline")}
          </p>
          <p className="mt-4 flex items-center gap-1.5 text-xs font-medium text-slate-400">
            <MapPin className="h-3.5 w-3.5" /> {t("footerDemoGeo")}
          </p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase">
              {col.title}
            </h3>
            <ul className="mt-3 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-slate-600 transition hover:text-brand-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-100">
        <div className="container-site flex flex-col items-center justify-between gap-2 py-5 text-xs text-slate-400 sm:flex-row">
          <p>© {new Date().getFullYear()} LocalFix — {t("footerCopyright")}</p>
          <p className="flex items-center gap-1.5">
            <FlaskConical className="h-3.5 w-3.5" /> {t("footerDemoData")}
          </p>
        </div>
      </div>
    </footer>
  );
}
