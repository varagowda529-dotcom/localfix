import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  Save,
  Trash2,
  Check,
  X,
  BadgeCheck,
  Clock3,
  Ban,
  CircleCheck,
} from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import {
  listProblems,
  adminUsers,
  getCategories,
  getLocations,
  locationPath,
  adminComments,
  adminVerifications,
} from "@/lib/data";
import { STATUSES, LOCATION_TYPES, roleLabel, formatDate, locationTypeLabel } from "@/lib/constants";
import { AdminNav, ADMIN_SECTIONS } from "@/components/admin-nav";
import { StatusBadge } from "@/components/status-badge";
import {
  adminUpdateProblemStatus,
  adminResolveVerification,
  adminSetUserActive,
  adminAddCategory,
  adminAddLocation,
  adminRemoveComment,
} from "@/app/actions/admin";

export const metadata: Metadata = { title: "Site Admin" };
export const dynamic = "force-dynamic";

function Head({ title, count }: { title: string; count: number }) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">{title}</h1>
      <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-extrabold text-white">
        {count} record{count === 1 ? "" : "s"}
      </span>
    </div>
  );
}

function Wrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="card mt-5 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100">{children}</table>
      </div>
    </div>
  );
}

export default async function AdminSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const user = await getCurrentUser();
  if (!user?.isStaff) redirect("/login?next=/admin");

  const { section } = await params;
  const valid = (ADMIN_SECTIONS as readonly { slug: string }[]).some((s) => s.slug === section);
  if (!valid || section === "") notFound();

  /* ------------------------------- PROBLEMS ------------------------------- */
  if (section === "problems") {
    const rows = await listProblems({});
    return (
      <div className="container-site py-8">
        <AdminNav active="problems" />
        <div className="mt-8"><Head title="Problems" count={rows.length} /></div>
        <Wrap>
          <thead className="bg-slate-50">
            <tr>
              <th className="table-th">Problem</th>
              <th className="table-th">Category / Location</th>
              <th className="table-th text-right">Supporters</th>
              <th className="table-th">Change status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map(({ problem, category, path }) => (
              <tr key={problem.id} className="align-top hover:bg-slate-50/70">
                <td className="table-td max-w-72">
                  <Link href={`/problems/${problem.id}`} className="block truncate font-bold text-slate-800 hover:text-brand-600">
                    {problem.title}
                  </Link>
                  <span className="text-xs text-slate-400">#{problem.id} · {formatDate(problem.createdAt)}</span>
                </td>
                <td className="table-td">
                  <span className="block font-semibold">{category.name}</span>
                  <span className="text-xs text-slate-400">{path.map((l) => l.name).join(" → ")}</span>
                </td>
                <td className="table-td text-right font-bold">{problem.supporterCount.toLocaleString("en-IN")}</td>
                <td className="table-td">
                  <form action={adminUpdateProblemStatus} className="flex items-center gap-2">
                    <input type="hidden" name="problemId" value={problem.id} />
                    <input type="hidden" name="back" value="/admin/problems" />
                    <select name="status" defaultValue={problem.status} className="input w-44 px-2.5 py-1.5 text-xs">
                      {STATUSES.map((s) => (
                        <option key={s.slug} value={s.slug}>{s.label}</option>
                      ))}
                    </select>
                    <button type="submit" className="btn-primary btn-sm px-3 py-1.5" title="Save status">
                      <Save className="h-3.5 w-3.5" />
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </Wrap>
      </div>
    );
  }

  /* -------------------------------- USERS -------------------------------- */
  if (section === "users") {
    const rows = await adminUsers();
    return (
      <div className="container-site py-8">
        <AdminNav active="users" />
        <div className="mt-8"><Head title="Users" count={rows.length} /></div>
        <Wrap>
          <thead className="bg-slate-50">
            <tr>
              <th className="table-th">User</th>
              <th className="table-th">Role</th>
              <th className="table-th">Verification</th>
              <th className="table-th">Joined</th>
              <th className="table-th text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50/70">
                <td className="table-td">
                  <span className="block font-bold text-slate-800">
                    {u.fullName} {u.isStaff && <span className="ml-1 rounded bg-slate-900 px-1.5 py-0.5 text-[10px] font-bold text-white">STAFF</span>}
                  </span>
                  <span className="text-xs text-slate-400">@{u.username} · {u.email}</span>
                </td>
                <td className="table-td font-semibold">{roleLabel(u.role)}</td>
                <td className="table-td">
                  {u.verificationStatus === "pending" ? (
                    <span className="badge bg-amber-50 text-amber-700 ring-amber-200 ring-1"><Clock3 className="h-3 w-3" /> Pending</span>
                  ) : u.isVerified ? (
                    <span className="badge bg-emerald-50 text-emerald-700 ring-emerald-200 ring-1"><BadgeCheck className="h-3 w-3" /> Verified</span>
                  ) : u.verificationStatus === "rejected" ? (
                    <span className="badge bg-rose-50 text-rose-700 ring-rose-200 ring-1">Rejected</span>
                  ) : (
                    <span className="text-xs text-slate-400">—</span>
                  )}
                </td>
                <td className="table-td text-slate-500">{formatDate(u.createdAt)}</td>
                <td className="table-td text-right">
                  {!u.isStaff && (
                    <form action={adminSetUserActive} className="inline">
                      <input type="hidden" name="userId" value={u.id} />
                      <input type="hidden" name="active" value={u.isActive ? "0" : "1"} />
                      <button
                        type="submit"
                        className={`btn-sm ${u.isActive ? "btn-danger" : "btn-outline"}`}
                      >
                        {u.isActive ? <><Ban className="h-3.5 w-3.5" /> Deactivate</> : <><CircleCheck className="h-3.5 w-3.5" /> Activate</>}
                      </button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Wrap>
      </div>
    );
  }

  /* ------------------------------ CATEGORIES ------------------------------ */
  if (section === "categories") {
    const rows = await getCategories();
    return (
      <div className="container-site py-8">
        <AdminNav active="categories" />
        <div className="mt-8"><Head title="Categories" count={rows.length} /></div>
        <form action={adminAddCategory} className="card mt-5 flex flex-wrap items-end gap-3 p-5">
          <div className="min-w-56 flex-1">
            <label htmlFor="name" className="label text-xs">New category name</label>
            <input id="name" name="name" required placeholder="e.g. Public Parks" className="input" />
          </div>
          <button type="submit" className="btn-primary">Add category</button>
        </form>
        <Wrap>
          <thead className="bg-slate-50">
            <tr><th className="table-th">Name</th><th className="table-th">Slug</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50/70">
                <td className="table-td font-bold text-slate-800">{c.name}</td>
                <td className="table-td font-mono text-xs text-slate-500">{c.slug}</td>
              </tr>
            ))}
          </tbody>
        </Wrap>
      </div>
    );
  }

  /* ------------------------------- LOCATIONS ------------------------------ */
  if (section === "locations") {
    const all = await getLocations();
    return (
      <div className="container-site py-8">
        <AdminNav active="locations" />
        <div className="mt-8"><Head title="Locations" count={all.length} /></div>
        <form action={adminAddLocation} className="card mt-5 flex flex-wrap items-end gap-3 p-5">
          <div className="min-w-44 flex-1">
            <label htmlFor="name" className="label text-xs">Name</label>
            <input id="name" name="name" required placeholder="e.g. Amruthur" className="input" />
          </div>
          <div className="min-w-40">
            <label htmlFor="type" className="label text-xs">Type</label>
            <select id="type" name="type" className="input">
              {LOCATION_TYPES.map((t) => (
                <option key={t.slug} value={t.slug}>{t.label}</option>
              ))}
            </select>
          </div>
          <div className="min-w-48 flex-1">
            <label htmlFor="parentId" className="label text-xs">Parent</label>
            <select id="parentId" name="parentId" className="input" defaultValue="">
              <option value="">— top level (state) —</option>
              {all.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name} ({locationTypeLabel(l.type)})
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn-primary">Add location</button>
        </form>
        <Wrap>
          <thead className="bg-slate-50">
            <tr><th className="table-th">Location</th><th className="table-th">Type</th><th className="table-th">Full path</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {all.map((l) => (
              <tr key={l.id} className="hover:bg-slate-50/70">
                <td className="table-td font-bold text-slate-800">{l.name}</td>
                <td className="table-td font-semibold">{locationTypeLabel(l.type)}</td>
                <td className="table-td text-xs text-slate-500">
                  {locationPath(all, l.id).map((p) => p.name).join(" → ")}
                </td>
              </tr>
            ))}
          </tbody>
        </Wrap>
      </div>
    );
  }

  /* ------------------------------- COMMENTS ------------------------------- */
  if (section === "comments") {
    const rows = await adminComments();
    return (
      <div className="container-site py-8">
        <AdminNav active="comments" />
        <div className="mt-8"><Head title="Comments" count={rows.length} /></div>
        <Wrap>
          <thead className="bg-slate-50">
            <tr>
              <th className="table-th">Comment</th>
              <th className="table-th">Author</th>
              <th className="table-th">Problem</th>
              <th className="table-th">Status</th>
              <th className="table-th text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map(({ comment, user: author, problem }) => (
              <tr key={comment.id} className={comment.isRemoved ? "opacity-50" : "hover:bg-slate-50/70"}>
                <td className="table-td max-w-80">
                  <span className="line-clamp-2 text-sm">{comment.body}</span>
                  <span className="text-xs text-slate-400">{formatDate(comment.createdAt)}</span>
                </td>
                <td className="table-td font-semibold">{author.fullName}</td>
                <td className="table-td max-w-56">
                  <Link href={`/problems/${problem.id}#comments`} className="block truncate text-xs font-bold text-brand-600 hover:underline">
                    {problem.title}
                  </Link>
                </td>
                <td className="table-td">
                  {comment.isRemoved
                    ? <span className="badge bg-slate-100 text-slate-500 ring-slate-200 ring-1">Removed</span>
                    : <span className="badge bg-emerald-50 text-emerald-700 ring-emerald-200 ring-1">Live</span>}
                </td>
                <td className="table-td text-right">
                  {!comment.isRemoved && (
                    <form action={adminRemoveComment} className="inline">
                      <input type="hidden" name="commentId" value={comment.id} />
                      <button type="submit" className="btn-danger btn-sm">
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Wrap>
      </div>
    );
  }

  /* ---------------------------- VERIFICATIONS ----------------------------- */
  const rows = await adminVerifications();
  return (
    <div className="container-site py-8">
      <AdminNav active="verifications" />
      <div className="mt-8"><Head title="Verification requests" count={rows.length} /></div>
      <Wrap>
        <thead className="bg-slate-50">
          <tr>
            <th className="table-th">User</th>
            <th className="table-th">Requested role</th>
            <th className="table-th">Note</th>
            <th className="table-th">Status</th>
            <th className="table-th text-right">Decision</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map(({ request, user: applicant }) => (
            <tr key={request.id} className="hover:bg-slate-50/70">
              <td className="table-td">
                <span className="block font-bold text-slate-800">{applicant.fullName}</span>
                <span className="text-xs text-slate-400">@{applicant.username} · {formatDate(request.createdAt)}</span>
              </td>
              <td className="table-td font-semibold">{roleLabel(request.role)}</td>
              <td className="table-td max-w-72"><span className="line-clamp-2 text-xs text-slate-500">{request.note}</span></td>
              <td className="table-td">
                {request.status === "pending" ? (
                  <span className="badge bg-amber-50 text-amber-700 ring-amber-200 ring-1"><Clock3 className="h-3 w-3" /> Pending</span>
                ) : request.status === "approved" ? (
                  <span className="badge bg-emerald-50 text-emerald-700 ring-emerald-200 ring-1"><BadgeCheck className="h-3 w-3" /> Approved</span>
                ) : (
                  <span className="badge bg-rose-50 text-rose-700 ring-rose-200 ring-1">Rejected</span>
                )}
              </td>
              <td className="table-td text-right">
                {request.status === "pending" && (
                  <span className="inline-flex gap-2">
                    <form action={adminResolveVerification}>
                      <input type="hidden" name="requestId" value={request.id} />
                      <input type="hidden" name="decision" value="approved" />
                      <button type="submit" className="btn-primary btn-sm"><Check className="h-3.5 w-3.5" /> Approve</button>
                    </form>
                    <form action={adminResolveVerification}>
                      <input type="hidden" name="requestId" value={request.id} />
                      <input type="hidden" name="decision" value="rejected" />
                      <button type="submit" className="btn-danger btn-sm"><X className="h-3.5 w-3.5" /> Reject</button>
                    </form>
                  </span>
                )}
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr><td colSpan={5} className="table-td py-10 text-center text-slate-400">No verification requests yet.</td></tr>
          )}
        </tbody>
      </Wrap>
    </div>
  );
}
