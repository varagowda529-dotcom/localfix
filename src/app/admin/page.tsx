import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ClipboardList,
  Users,
  MapPin,
  MessageSquare,
  Landmark,
  BadgeCheck,
  Tags,
  ArrowRight,
} from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import {
  platformStats,
  pendingVerificationCount,
  listProblems,
} from "@/lib/data";
import { AdminNav } from "@/components/admin-nav";
import { StatusBadge } from "@/components/status-badge";

export const metadata: Metadata = { title: "Site Admin" };
export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const user = await getCurrentUser();
  if (!user?.isStaff) redirect("/login?next=/admin");

  const [stats, pendingCount, recent] = await Promise.all([
    platformStats(),
    pendingVerificationCount(),
    listProblems({ sort: "newest" }),
  ]);

  return (
    <div className="container-site py-8">
      <AdminNav active="" />

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Problems", value: stats.problems, icon: ClipboardList, href: "/admin/problems" },
          { label: "Registered citizens", value: stats.citizens, icon: Users, href: "/admin/users" },
          { label: "Official responses", value: stats.officialResponses, icon: Landmark, href: "/admin/problems" },
          { label: "Pending verifications", value: pendingCount, icon: BadgeCheck, href: "/admin/verifications" },
        ].map((s) => (
          <Link key={s.label} href={s.href} className="card group p-5 transition hover:border-accent-300 hover:shadow-md">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-accent-500">
              <s.icon className="h-5 w-5" />
            </span>
            <p className="mt-3 text-3xl font-extrabold text-slate-900">{s.value.toLocaleString("en-IN")}</p>
            <p className="mt-0.5 flex items-center gap-1 text-xs font-bold text-slate-500 uppercase group-hover:text-accent-600">
              {s.label} <ArrowRight className="h-3 w-3" />
            </p>
          </Link>
        ))}
      </div>

      {/* Recent problems */}
      <section className="card mt-8 overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="text-base font-extrabold text-slate-900">Latest reports</h2>
          <Link href="/admin/problems" className="text-xs font-bold text-brand-600 hover:underline">
            Manage all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50">
              <tr>
                <th className="table-th">Problem</th>
                <th className="table-th">Location</th>
                <th className="table-th">Status</th>
                <th className="table-th text-right">Supporters</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recent.slice(0, 5).map(({ problem, path }) => (
                <tr key={problem.id} className="hover:bg-slate-50/70">
                  <td className="table-td max-w-80">
                    <Link href={`/problems/${problem.id}`} className="block truncate font-bold text-slate-800 hover:text-brand-600">
                      {problem.title}
                    </Link>
                  </td>
                  <td className="table-td text-slate-500">{path[path.length - 1]?.name}</td>
                  <td className="table-td"><StatusBadge status={problem.status} size="sm" /></td>
                  <td className="table-td text-right font-bold">{problem.supporterCount.toLocaleString("en-IN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Quick links */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { href: "/admin/users", icon: Users, label: "Users", body: "Verify, activate or deactivate accounts" },
          { href: "/admin/categories", icon: Tags, label: "Categories", body: "Problem categories" },
          { href: "/admin/locations", icon: MapPin, label: "Locations", body: "Location hierarchy" },
          { href: "/admin/comments", icon: MessageSquare, label: "Comments", body: "Moderate discussion" },
        ].map((q) => (
          <Link key={q.href} href={q.href} className="card group flex items-start gap-3 p-5 transition hover:border-accent-300 hover:shadow-md">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <q.icon className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-extrabold text-slate-800 group-hover:text-brand-600">{q.label}</span>
              <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">{q.body}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
