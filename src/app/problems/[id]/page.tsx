import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  ThumbsUp,
  CheckCircle2,
  Landmark,
  MessageSquare,
  UserRound,
  CalendarDays,
  ShieldCheck,
  AlarmClock,
  BadgeCheck,
  Clock3,
} from "lucide-react";
import { getProblemDetail } from "@/lib/data";
import { getCurrentUser } from "@/lib/auth";
import { STATUSES, formatDate, timeAgo, roleLabel } from "@/lib/constants";
import { CategoryChip } from "@/components/category-icon";
import { StatusBadge } from "@/components/status-badge";
import { ProblemTimeline } from "@/components/problem-timeline";
import { ShareButton } from "@/components/share-button";
import { toggleSupport, addComment } from "@/app/actions/problems";
import {
  adminUpdateProblemStatus,
  adminAddOfficialResponse,
} from "@/app/actions/admin";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const detail = await getProblemDetail(Number(id));
  return { title: detail ? detail.problem.title : "Problem" };
}

export default async function ProblemDetailPage({ params, searchParams }: Props) {
  const { id } = await params;
  const sp = await searchParams;
  const problemId = Number(id);
  if (!Number.isInteger(problemId)) notFound();

  const user = await getCurrentUser();
  const detail = await getProblemDetail(problemId, user?.id);
  if (!detail) notFound();

  const { problem, category, path, reporterName, events, responses, comments, hasSupported } = detail;
  const isOverdue = problem.status === "overdue";

  return (
    <div className="container-site py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm font-medium text-slate-500">
        <Link href="/problems" className="flex items-center gap-1.5 transition hover:text-brand-600">
          <ArrowLeft className="h-4 w-4" /> All problems
        </Link>
        <span className="text-slate-300">/</span>
        <span className="max-w-64 truncate text-slate-700 sm:max-w-md">{problem.title}</span>
      </nav>

      {sp.created === "1" && (
        <div className="form-banner-success mt-5 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          Problem reported successfully. It is now public — share it to gather supporters.
        </div>
      )}
      {typeof sp.error === "string" && sp.error && (
        <div className="form-banner-error mt-5">{sp.error}</div>
      )}
      {isOverdue && (
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">
          <AlarmClock className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" />
          <p className="text-sm text-rose-700">
            <span className="font-bold">This problem is overdue.</span> The
            responsible department has not acted within the expected time
            window. Every new supporter increases public pressure.
          </p>
        </div>
      )}

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* ------------------------------- MAIN ------------------------------- */}
        <div className="min-w-0">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
            {problem.photoPath ? (
              <Image
                src={problem.photoPath}
                alt={problem.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 760px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400">
                <MapPin className="h-12 w-12" />
              </div>
            )}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <CategoryChip slug={category.slug} name={category.name} />
            <StatusBadge status={problem.status} />
          </div>

          <h1 className="mt-3 text-2xl leading-tight font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            {problem.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-slate-500">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-accent-600" />
              {path.map((l) => l.name).join(", ")}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" /> Reported {formatDate(problem.createdAt)}
            </span>
          </div>

          <p className="mt-5 text-[15px] leading-relaxed whitespace-pre-line text-slate-700">
            {problem.description}
          </p>

          {/* Timeline */}
          <section className="card mt-8 p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <Clock3 className="h-5 w-5 text-brand-500" /> Public timeline
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Reported → Verified → Awaiting Official Response → Work Started → Completed
            </p>
            <div className="mt-5">
              <ProblemTimeline events={events} currentStatus={problem.status} />
            </div>
          </section>

          {/* Official responses */}
          <section id="responses" className="card mt-6 p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <Landmark className="h-5 w-5 text-brand-500" /> Official response
            </h2>
            {responses.length === 0 ? (
              <div className="mt-4 rounded-xl bg-slate-50 px-4 py-6 text-center">
                <p className="text-sm font-semibold text-slate-600">
                  No official response yet.
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  When the responsible department replies, it will be published here
                  for everyone to read.
                </p>
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                {responses.map((r) => (
                  <div key={r.id} className="rounded-xl border border-brand-100 bg-brand-50/60 p-4">
                    <p className="text-sm leading-relaxed text-slate-700">{r.body}</p>
                    <div className="mt-3 flex items-center gap-2 border-t border-brand-100 pt-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-white">
                        <Landmark className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{r.officialName}</p>
                        <p className="text-xs font-medium text-slate-500">
                          {r.department} · {formatDate(r.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Comments */}
          <section id="comments" className="card mt-6 p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <MessageSquare className="h-5 w-5 text-brand-500" />
              Comments <span className="text-sm font-semibold text-slate-400">({comments.length})</span>
            </h2>

            {user ? (
              <form action={addComment} className="mt-4">
                <input type="hidden" name="problemId" value={problem.id} />
                <textarea
                  name="body"
                  required
                  rows={3}
                  maxLength={600}
                  placeholder="Add local information, an update, or a question for officials…"
                  className="input resize-y"
                />
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-xs text-slate-400">
                    Commenting as <span className="font-bold text-slate-600">{user.fullName}</span>
                  </p>
                  <button type="submit" className="btn-primary btn-sm px-4 py-2">Post comment</button>
                </div>
              </form>
            ) : (
              <div className="mt-4 rounded-xl bg-slate-50 px-4 py-4 text-center text-sm text-slate-600">
                <Link href={`/login?next=/problems/${problem.id}`} className="font-bold text-brand-600 hover:underline">
                  Log in
                </Link>{" "}
                to join the discussion.
              </div>
            )}

            <div className="mt-5 space-y-4">
              {comments.length === 0 && (
                <p className="text-sm text-slate-400">No comments yet. Be the first to add context.</p>
              )}
              {comments.map(({ comment, user: author }) => (
                <div key={comment.id} className="flex gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                    <UserRound className="h-4.5 w-4.5" />
                  </span>
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-center gap-x-2 text-sm">
                      <span className="font-bold text-slate-800">{author.fullName}</span>
                      <span className="text-xs font-medium text-slate-400">
                        {roleLabel(author.role)} · {timeAgo(comment.createdAt)}
                      </span>
                      {author.isVerified && author.role !== "citizen" && (
                        <span className="badge bg-brand-50 text-brand-600 ring-brand-200 px-1.5 py-0 text-[10px] ring-1">
                          <BadgeCheck className="h-3 w-3" /> Verified
                        </span>
                      )}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{comment.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ------------------------------ SIDEBAR ------------------------------ */}
        <aside className="space-y-5 lg:sticky lg:top-36 lg:self-start">
          {/* Support card */}
          <div id="support" className="card scroll-mt-32 p-5 text-center">
            <p className="text-3xl font-extrabold tracking-tight text-slate-900">
              {problem.supporterCount.toLocaleString("en-IN")}
            </p>
            <p className="mt-0.5 text-xs font-bold tracking-widest text-slate-500 uppercase">
              supporters
            </p>
            <form action={toggleSupport} className="mt-4">
              <input type="hidden" name="problemId" value={problem.id} />
              <button
                type="submit"
                className={`${hasSupported ? "btn-outline border-accent-500 text-accent-600" : "btn-primary"} w-full py-3`}
              >
                <ThumbsUp className={`h-4.5 w-4.5 ${hasSupported ? "fill-accent-100" : ""}`} />
                {hasSupported ? "You supported this" : "Support this problem"}
              </button>
            </form>
            <p className="mt-2.5 text-xs leading-relaxed text-slate-400">
              Supporters are counted publicly. More support = more pressure for
              an official response.
            </p>
            <div className="mt-3 border-t border-slate-100 pt-3">
              <ShareButton title={problem.title} />
            </div>
          </div>

          {/* Details card */}
          <div className="card p-5">
            <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase">
              Report details
            </h3>
            <dl className="mt-3 space-y-3.5 text-sm">
              <div className="flex items-start gap-3">
                <UserRound className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                <div>
                  <dt className="text-xs font-semibold text-slate-400">Reported by</dt>
                  <dd className="font-bold text-slate-800">{reporterName ?? "Anonymous Citizen"}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                <div>
                  <dt className="text-xs font-semibold text-slate-400">Location</dt>
                  <dd className="leading-snug font-bold text-slate-800">
                    {path.map((l) => l.name).join(" → ")}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                <div>
                  <dt className="text-xs font-semibold text-slate-400">Last update</dt>
                  <dd className="font-bold text-slate-800">{formatDate(problem.updatedAt)}</dd>
                </div>
              </div>
            </dl>
          </div>

          {/* Staff management panel */}
          {user?.isStaff && (
            <div className="rounded-2xl border border-accent-500/30 bg-accent-500/5 p-5">
              <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800">
                <ShieldCheck className="h-4.5 w-4.5 text-accent-600" /> Staff actions
              </h3>
              <form action={adminUpdateProblemStatus} className="mt-3 space-y-2">
                <input type="hidden" name="problemId" value={problem.id} />
                <input type="hidden" name="back" value={`/problems/${problem.id}`} />
                <select name="status" defaultValue={problem.status} className="input py-2 text-sm">
                  {STATUSES.map((s) => (
                    <option key={s.slug} value={s.slug}>{s.label}</option>
                  ))}
                </select>
                <input name="note" placeholder="Public note (optional)" className="input py-2 text-sm" />
                <button type="submit" className="btn-primary btn-sm w-full py-2">Update status</button>
              </form>
              <form action={adminAddOfficialResponse} className="mt-4 space-y-2 border-t border-accent-500/20 pt-4">
                <input type="hidden" name="problemId" value={problem.id} />
                <input name="officialName" required placeholder="Official name" className="input py-2 text-sm" />
                <input name="department" required placeholder="Department" className="input py-2 text-sm" />
                <textarea name="body" required rows={3} placeholder="Official response text…" className="input py-2 text-sm" />
                <button type="submit" className="btn-outline btn-sm w-full border-accent-500 py-2 text-accent-600">
                  Publish official response
                </button>
              </form>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
