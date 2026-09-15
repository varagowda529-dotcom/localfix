"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Megaphone,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  PlusCircle,
  Clock3,
} from "lucide-react";
import { logout } from "@/app/actions/auth";
import type { SessionUser } from "@/lib/auth";
import { roleLabel } from "@/lib/constants";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/components/language-provider";

export function SiteHeader({ user }: { user: SessionUser | null }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  const NAV = [
    { href: "/", label: t("home") },
    { href: "/problems", label: t("exploreProblems") },
    { href: "/locations", label: t("locations") },
    { href: "/map", label: t("map") },
    { href: "/about", label: t("about") },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur">
      <div className="container-site flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-sm">
            <Megaphone className="h-5 w-5" />
          </span>
          <span className="text-lg font-extrabold tracking-tight text-slate-900">
            {t("brandFirst")}<span className="text-brand-500">{t("brandSecond")}</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-3.5 py-2 text-sm font-semibold transition ${
                isActive(item.href)
                  ? "bg-brand-50 text-brand-600"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden items-center gap-2.5 lg:flex">
          <LanguageSwitcher />

          {user ? (
            <>
              <Link
                href="/dashboard"
                className={`btn-ghost ${isActive("/dashboard") ? "bg-slate-100" : ""}`}
              >
                <LayoutDashboard className="h-4 w-4" />
                {t("dashboard")}
              </Link>
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 py-1 pr-3 pl-1">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">
                  {user.fullName.charAt(0).toUpperCase()}
                </span>
                <div className="leading-tight">
                  <p className="max-w-28 truncate text-xs font-bold text-slate-800">
                    {user.fullName}
                  </p>
                  {user.verificationStatus === "pending" ? (
                    <p className="flex items-center gap-1 text-[10px] font-semibold text-amber-600">
                      <Clock3 className="h-3 w-3" /> {t("verificationPending")}
                    </p>
                  ) : (
                    <p className="text-[10px] font-semibold text-slate-500">
                      {roleLabel(user.role)}
                    </p>
                  )}
                </div>
              </div>
              <form action={logout}>
                <button type="submit" className="btn-ghost px-3" title={t("logout")}>
                  <LogOut className="h-4 w-4" />
                </button>
              </form>
            </>
          ) : (
            <Link href="/login" className="btn-ghost">
              {t("login")}
            </Link>
          )}
          <Link href="/report" className="btn-primary">
            <PlusCircle className="h-4 w-4" />
            {t("reportProblem")}
          </Link>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="container-site flex flex-col gap-1 py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold ${
                  isActive(item.href)
                    ? "bg-brand-50 text-brand-600"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-slate-100 pt-3">
              {user ? (
                <>
                  <Link href="/dashboard" onClick={() => setOpen(false)} className="btn-outline justify-start">
                    <LayoutDashboard className="h-4 w-4" /> {t("dashboard")} ({user.fullName})
                  </Link>
                  <form action={logout}>
                    <button type="submit" className="btn-outline w-full justify-start">
                      <LogOut className="h-4 w-4" /> {t("logout")}
                    </button>
                  </form>
                </>
              ) : (
                <Link href="/login" onClick={() => setOpen(false)} className="btn-outline">
                  {t("login")}
                </Link>
              )}
              <Link href="/report" onClick={() => setOpen(false)} className="btn-primary">
                <PlusCircle className="h-4 w-4" /> {t("reportProblem")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
