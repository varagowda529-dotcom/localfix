import Link from "next/link";
import {
  ShieldCheck,
  ClipboardList,
  Users,
  Tags,
  MapPin,
  MessageSquare,
  BadgeCheck,
  LayoutGrid,
} from "lucide-react";

export const ADMIN_SECTIONS = [
  { slug: "", label: "Overview", icon: LayoutGrid },
  { slug: "problems", label: "Problems", icon: ClipboardList },
  { slug: "users", label: "Users", icon: Users },
  { slug: "categories", label: "Categories", icon: Tags },
  { slug: "locations", label: "Locations", icon: MapPin },
  { slug: "comments", label: "Comments", icon: MessageSquare },
  { slug: "verifications", label: "Verifications", icon: BadgeCheck },
] as const;

export function AdminNav({ active }: { active: string }) {
  return (
    <div className="rounded-2xl bg-slate-900 p-4">
      <p className="flex items-center gap-2 px-2 text-xs font-extrabold tracking-widest text-slate-400 uppercase">
        <ShieldCheck className="h-4 w-4 text-accent-500" /> Site administration
      </p>
      <nav className="mt-3 flex flex-wrap gap-1.5">
        {ADMIN_SECTIONS.map((s) => {
          const href = s.slug ? `/admin/${s.slug}` : "/admin";
          const isActive = active === s.slug;
          return (
            <Link
              key={s.slug || "overview"}
              href={href}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold transition ${
                isActive
                  ? "bg-white text-slate-900"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <s.icon className="h-3.5 w-3.5" />
              {s.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
