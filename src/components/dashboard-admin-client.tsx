"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  ClipboardList,
  AlertCircle,
  Clock3,
  BadgeCheck,
  PartyPopper,
  MessageSquare,
  Tags,
  MapPin,
} from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import type { ProblemCard as ProblemCardData } from "@/lib/data";
import { ProblemCard } from "@/components/problem-card";
import { formatDate } from "@/lib/constants";

type AdminStats = {
  totalUsers: number;
  openProblems: number;
  pendingVerifications: number;
  overdueProblems: number;
};

export function DashboardAdminClient({
  user,
  stats,
  recentReports,
  pendingVerifications,
  overdueProblems,
  welcome,
}: {
  user: { firstName: string };
  stats: AdminStats;
  recentReports: ProblemCardData[];
  pendingVerifications: any[];
  overdueProblems: ProblemCardData[];
  welcome: boolean;
}) {
  const { t } = useLanguage();

  return (
    <div className="container-site py-10">
      {welcome && (
        <div className="form-banner-success mb-6 flex items-center gap-2.5">
          <PartyPopper className="h-5 w-5 shrink-0" />
          {t("welcomeUser")}, {user.firstName}! {t("accountReady")}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="section-eyebrow flex items-center gap-2">
            <LayoutDashboard className="h-4 w-4" /> {t("adminDashboardTitle")}
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
            {t("hello")}, {user.firstName}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="badge bg-slate-900 text-white ring-1 ring-slate-900">
              {t("adminRoleBadge")}
            </span>
            <span className="badge bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
              <ShieldCheck className="h-3.5 w-3.5" /> {t("staffBadge")}
            </span>
          </div>
          <p className="mt-3 text-sm text-slate-500">{t("adminDashboardDesc")}</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: t("pendingVerifications"), val: stats.pendingVerifications, icon: BadgeCheck, color: "text-amber-500", bg: "bg-amber-50" },
          { label: t("overdueProblems"), val: stats.overdueProblems, icon: AlertCircle, color: "text-rose-500", bg: "bg-rose-50" },
          { label: t("openProblems"), val: stats.openProblems, icon: ClipboardList, color: "text-brand-500", bg: "bg-brand-50" },
          { label: t("totalUsers"), val: stats.totalUsers, icon: Users, color: "text-slate-500", bg: "bg-slate-100" },
        ].map((s) => (
          <div key={s.label} className="card p-5">
            <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.bg} ${s.color}`}>
              <s.icon className="h-5 w-5" />
            </span>
            <p className="mt-4 text-2xl font-extrabold">{s.val}</p>
            <p className="mt-0.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        {/* Main Feed */}
        <div className="space-y-8">
          {/* Overdue */}
          <section className="card p-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-900">
                <AlertCircle className="h-5 w-5 text-rose-500" /> {t("overdueProblems")}
              </h2>
              <Link href="/admin/problems" className="text-sm font-bold text-brand-600 hover:underline">{t("reviewAll")}</Link>
            </div>
            {overdueProblems.length === 0 ? (
              <p className="mt-4 text-sm text-slate-400">{t("noOverdueProblems")}</p>
            ) : (
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {overdueProblems.map((p) => (
                  <ProblemCard key={p.problem.id} data={p} />
                ))}
              </div>
            )}
          </section>

          {/* New Reports */}
          <section className="card p-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-900">
                <ClipboardList className="h-5 w-5 text-brand-500" /> {t("newReports")}
              </h2>
              <Link href="/admin/problems" className="text-sm font-bold text-brand-600 hover:underline">{t("reviewAll")}</Link>
            </div>
            {recentReports.length === 0 ? (
              <p className="mt-4 text-sm text-slate-400">{t("noNewReports")}</p>
            ) : (
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {recentReports.map((p) => (
                  <ProblemCard key={p.problem.id} data={p} />
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Quick Actions */}
          <div className="rounded-2xl border border-brand-200 bg-brand-50 p-5">
            <h3 className="flex items-center gap-2 text-sm font-extrabold text-brand-800">
              <LayoutDashboard className="h-4 w-4" /> {t("quickActions")}
            </h3>
            <div className="mt-4 space-y-2">
              {[
                { label: t("manageProblems"), href: "/admin/problems", icon: ClipboardList },
                { label: t("manageVerifications"), href: "/admin/verifications", icon: BadgeCheck },
                { label: t("manageUsers"), href: "/admin/users", icon: Users },
                { label: t("manageComments"), href: "/admin/comments", icon: MessageSquare },
                { label: t("manageCategories"), href: "/admin/categories", icon: Tags },
                { label: t("manageLocations"), href: "/admin/locations", icon: MapPin },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-brand-500 hover:text-white">
                  <link.icon className="h-4 w-4" /> {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Pending Verifications */}
          <div className="card p-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                <Clock3 className="h-4 w-4 text-amber-500" /> {t("pendingVerifications")}
              </h3>
            </div>
            {pendingVerifications.length === 0 ? (
              <p className="mt-3 text-xs text-slate-400">{t("noPendingVerifications")}</p>
            ) : (
              <ul className="mt-3 space-y-3">
                {pendingVerifications.map((v) => (
                  <li key={v.request.id} className="flex items-start gap-2 border-l-2 border-amber-200 pl-3">
                    <div>
                      <p className="text-sm font-bold text-slate-800">{v.user.fullName}</p>
                      <p className="text-xs text-slate-500">Req: {v.request.role}</p>
                      <p className="mt-1 text-[10px] text-slate-400">{formatDate(v.request.createdAt)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <Link href="/admin/verifications" className="mt-4 block w-full rounded-xl bg-slate-100 px-3 py-2 text-center text-xs font-bold text-slate-600 hover:bg-slate-200">
              {t("reviewAll")} →
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
