/* ------------------------------- status model ------------------------------ */

export type StatusDef = {
  slug: string;
  label: string;
  /** position in the public lifecycle, 1-5 (0 = off-track like overdue) */
  step: number;
  badge: string; // badge classes
  dot: string; // small dot classes
  description: string;
};

export const STATUSES: StatusDef[] = [
  {
    slug: "reported",
    label: "Reported",
    step: 1,
    badge: "bg-amber-50 text-amber-800 ring-amber-200",
    dot: "bg-amber-500",
    description: "Submitted by a citizen and visible to the public.",
  },
  {
    slug: "verified",
    label: "Verified",
    step: 2,
    badge: "bg-sky-50 text-sky-800 ring-sky-200",
    dot: "bg-sky-500",
    description: "Reviewed and confirmed as a genuine civic issue.",
  },
  {
    slug: "awaiting_response",
    label: "Awaiting Official Response",
    step: 3,
    badge: "bg-blue-50 text-blue-800 ring-blue-200",
    dot: "bg-blue-600",
    description: "Forwarded to the responsible department, awaiting reply.",
  },
  {
    slug: "in_progress",
    label: "Work Started",
    step: 4,
    badge: "bg-violet-50 text-violet-800 ring-violet-200",
    dot: "bg-violet-500",
    description: "The responsible department has started work on the ground.",
  },
  {
    slug: "completed",
    label: "Completed",
    step: 5,
    badge: "bg-emerald-50 text-emerald-800 ring-emerald-200",
    dot: "bg-emerald-500",
    description: "The issue has been resolved and verified as fixed.",
  },
  {
    slug: "overdue",
    label: "Overdue",
    step: 3,
    badge: "bg-rose-50 text-rose-800 ring-rose-200",
    dot: "bg-rose-500",
    description:
      "No response or action within the expected time window. Needs attention.",
  },
];

export const LIFECYCLE_STEPS = [
  "reported",
  "verified",
  "awaiting_response",
  "in_progress",
  "completed",
] as const;

export function statusOf(slug: string): StatusDef {
  return STATUSES.find((s) => s.slug === slug) ?? STATUSES[0];
}

/* ---------------------------------- roles ---------------------------------- */

export const ROLES = [
  { slug: "citizen", label: "Citizen", needsVerification: false },
  { slug: "politician", label: "Politician", needsVerification: true },
  {
    slug: "government_employee",
    label: "Government Employee",
    needsVerification: true,
  },
  { slug: "media", label: "Media", needsVerification: true },
  { slug: "public_figure", label: "Public Figure", needsVerification: true },
] as const;

export function roleLabel(slug: string): string {
  return ROLES.find((r) => r.slug === slug)?.label ?? "Citizen";
}

/* ------------------------------- locations --------------------------------- */

export const LOCATION_TYPES = [
  { slug: "state", label: "State" },
  { slug: "district", label: "District" },
  { slug: "taluk", label: "Taluk" },
  { slug: "hobli", label: "Hobli" },
  { slug: "gram_panchayat", label: "Gram Panchayat" },
  { slug: "village", label: "Village" },
  { slug: "city", label: "City" },
  { slug: "town", label: "Town" },
  { slug: "ward", label: "Ward" },
] as const;

export function locationTypeLabel(slug: string): string {
  return LOCATION_TYPES.find((t) => t.slug === slug)?.label ?? slug;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function formatDate(d: Date | string): string {
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function timeAgo(d: Date | string): string {
  const date = typeof d === "string" ? new Date(d) : d;
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 3600) return `${Math.max(1, Math.floor(seconds / 60))}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  const days = Math.floor(seconds / 86400);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}
