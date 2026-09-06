import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  ThumbsUp,
  Bell,
  Clock3,
  BadgeCheck,
  CheckCircle2,
  AlarmClock,
  Hammer,
  TrendingUp,
  Flame,
  MapPin,
  Landmark,
  PartyPopper,
  ArrowRight,
  MailCheck,
} from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import {
  myReports,
  supportedProblems,
  problemsByStatuses,
  constituencyProblems,
  highAttentionProblems,
  trendingProblems,
  userNotifications,
  getLocations,
} from "@/lib/data";
import type { ProblemCard } from "@/lib/data";
import { roleLabel, formatDate, timeAgo, locationTypeLabel } from "@/lib/constants";
import type { Notification } from "@/db/schema";
import { StatusBadge } from "@/components/status-badge";
import { markAllNotificationsRead } from "@/app/actions/auth";

export const metadata: Metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

/* ------------------------------ small pieces ------------------------------ */

function ProblemRow({ data }: { data: ProblemCard }) {
  const { problem, path, category } = data;
  const place = path[path.length - 1];
  return (
    <Link
      href={`/problems/${problem.id}`}
      className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 transition hover:border-brand-300 hover:shadow-sm"
    >
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-bold text-slate-800">{problem.title}</span>
        <span className="mt-0.5 flex items-center gap-2 text-xs font-medium text-slate-400">
          <MapPin className="h-3 w-3" /> {place?.name}
          <span className="text-slate-300">·</span> {category.name}
          <span className="text-slate-300">·</span> {formatDate(problem.createdAt)}
        </span>
      </span>
      <span className="hidden items-center gap-1 text-xs font-bold text-slate-500 sm:flex">
        <ThumbsUp className="h-3.5 w-3.5 text-brand-500" />
        {problem.supporterCount.toLocaleString("en-IN")}
      </span>
      <StatusBadge status={problem.status} size="sm" />
    </Link>
  );
}

function Section({
  icon: Icon,
  title,
  items,
  emptyText,
  tint = "text-brand-500",
}: {
  icon: typeof ClipboardList;
  title: string;
  items: ProblemCard[];
  emptyText: string;
  tint?: string;
}) {
  return (
    <section className="card p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-base font-extrabold text-slate-900">
          <Icon className={`h-5 w-5 ${tint}`} /> {title}
        </h2>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-extrabold text-slate-600">
          {items.length}
        </span>
      </div>
      {items.length === 0 ? (
        <p className="mt-4 rounded-xl bg-slate-50 px-4 py-6 text-center text-sm text-slate-400">
          {emptyText}
        </p>
      ) : (
        <div className="mt-4 space-y-2.5">
          {items.slice(0, 6).map((d) => (
            <ProblemRow key={d.problem.id} data={d} />
          ))}
        </div>
      )}
    </section>
  );
}

function NotificationPanel({ items }: { items: Notification[] }) {
  return (
    <section className="card p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-base font-extrabold text-slate-900">
          <Bell className="h-5 w-5 text-brand-500" /> Notifications
        </h2>
        {items.some((n) => !n.isRead) && (
          <form action={markAllNotificationsRead}>
            <button type="submit" className="btn-ghost btn-sm flex items-center gap-1">
              <MailCheck className="h-3.5 w-3.5" /> Mark all read
            </button>
          </form>
        )}
      </div>
      {items.length === 0 ? (
        <p className="mt-4 rounded-xl bg-slate-50 px-4 py-6 text-center text-sm text-slate-400">
          Nothing yet — notifications about your reports will appear here.
        </p>
      ) : (
        <ul className="mt-4 space-y-2.5">
          {items.map((n) => (
            <li key={n.id}>
              <Link
                href={n.link ?? "/dashboard"}
                className={`flex items-start gap-3 rounded-xl border px-4 py-3 transition ${
                  n.isRead
                    ? "border-slate-100 bg-white hover:border-slate-200"
                    : "border-brand-200 bg-brand-50/60 hover:border-brand-300"
                }`}
              >
                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.isRead ? "bg-slate-200" : "bg-brand-500"}`} />
                <span>
                  <span className="block text-sm leading-snug font-semibold text-slate-700">{n.body}</span>
                  <span className="mt-0.5 block text-xs font-medium text-slate-400">{timeAgo(n.createdAt)}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

/* --------------------------------- page ----------------------------------- */

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/dashboard");
  const sp = await searchParams;

  let body: ReactNode = null;

  if (user.role === "government_employee") {
    const [pending, inProgress, completed, overdue] = await Promise.all([
      problemsByStatuses(["awaiting_response", "reported"]),
      problemsByStatuses(["in_progress"]),
      problemsByStatuses(["completed"]),
      problemsByStatuses(["overdue"]),
    ]);
    body = (
      <div className="grid gap-5 lg:grid-cols-2">
        <Section icon={Clock3} title="Pending Problems" items={pending} emptyText="No problems waiting for an official response." />
        <Section icon={Hammer} title="In Progress" items={inProgress} emptyText="No work currently in progress." tint="text-violet-500" />
        <Section icon={CheckCircle2} title="Completed" items={completed} emptyText="Nothing completed yet." tint="text-emerald-600" />
        <Section icon={AlarmClock} title="Overdue" items={overdue} emptyText="No overdue problems. Great!" tint="text-rose-500" />
      </div>
    );
  } else if (user.role === "politician") {
    const all = await getLocations();
    const constituency = user.constituencyId
      ? all.find((l) => l.id === user.constituencyId)
      : undefined;
    const [constituencyItems, resolved, pending] = await Promise.all([
      user.constituencyId ? constituencyProblems(user.constituencyId) : trendingProblems(10),
      problemsByStatuses(["completed"]),
      problemsByStatuses(["reported", "awaiting_response", "overdue"]),
    ]);
    body = (
      <div className="space-y-5">
        {constituency && (
          <p className="flex items-center gap-2 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-700">
            <Landmark className="h-4.5 w-4.5" />
            Your constituency: {constituency.name} ({locationTypeLabel(constituency.type)}) — includes all areas inside it.
          </p>
        )}
        <div className="grid gap-5 lg:grid-cols-2">
          <Section icon={MapPin} title="Constituency Problems" items={constituencyItems} emptyText="No problems reported in your constituency." />
          <Section icon={Clock3} title="Pending Problems" items={pending} emptyText="Nothing pending right now." tint="text-amber-500" />
          <Section icon={CheckCircle2} title="Resolved Problems" items={resolved} emptyText="No resolved problems yet." tint="text-emerald-600" />
        </div>
      </div>
    );
  } else if (user.role === "media" || user.role === "public_figure") {
    const [trending, highAttention, overdue] = await Promise.all([
      trendingProblems(6),
      highAttentionProblems(400),
      problemsByStatuses(["overdue"]),
    ]);
    body = (
      <div className="grid gap-5 lg:grid-cols-2">
        <Section icon={TrendingUp} title="Trending Problems" items={trending} emptyText="Nothing trending yet." />
        <Section icon={Flame} title="High Attention Problems (400+ supporters)" items={highAttention} emptyText="No high-attention problems right now." tint="text-orange-500" />
        <Section icon={AlarmClock} title="Overdue Problems" items={overdue} emptyText="No overdue problems to investigate." tint="text-rose-500" />
      </div>
    );
  } else {
    const [reports, supported, notifications] = await Promise.all([
      myReports(user.id),
      supportedProblems(user.id),
      userNotifications(user.id),
    ]);
    body = (
      <div className="grid gap-5 lg:grid-cols-2">
        <Section icon={ClipboardList} title="My Reports" items={reports} emptyText="You haven't reported any problems yet." />
        <Section icon={ThumbsUp} title="Supported Problems" items={supported} emptyText="Problems you support will appear here." tint="text-accent-600" />
        <div className="lg:col-span-2">
          <NotificationPanel items={notifications} />
        </div>
      </div>
    );
  }

  return (
    <div className="container-site py-10">
      {/* Welcome banner */}
      {sp.welcome === "1" && (
        <div className="form-banner-success mb-6 flex items-center gap-2.5">
          <PartyPopper className="h-5 w-5 shrink-0" />
          Welcome to CivicVoice, {user.fullName.split(" ")[0]}! Your account is ready — this is your dashboard.
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="section-eyebrow flex items-center gap-2">
            <LayoutDashboard className="h-4 w-4" /> Dashboard
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
            Hello, {user.fullName.split(" ")[0]}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="badge bg-slate-900 text-white ring-slate-900 ring-1">
              {roleLabel(user.role)}
            </span>
            {user.verificationStatus === "pending" ? (
              <span className="badge bg-amber-50 text-amber-700 ring-amber-200 ring-1">
                <Clock3 className="h-3.5 w-3.5" /> Verification Pending
              </span>
            ) : user.isVerified && user.role !== "citizen" ? (
              <span className="badge bg-emerald-50 text-emerald-700 ring-emerald-200 ring-1">
                <BadgeCheck className="h-3.5 w-3.5" /> Verified
              </span>
            ) : null}
          </div>
        </div>
        <Link href="/report" className="btn-primary">
          Report a Problem <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {user.verificationStatus === "pending" && (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
          <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <p className="text-sm leading-relaxed text-amber-800">
            <span className="font-bold">Your account verification is pending.</span>{" "}
            A moderator will review your {roleLabel(user.role).toLowerCase()} account.
            You can use the platform normally in the meantime.
          </p>
        </div>
      )}

      <div className="mt-8">{body}</div>
    </div>
  );
}
