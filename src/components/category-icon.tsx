import {
  Route,
  Waves,
  Lamp,
  Trash2,
  Droplets,
  ShieldAlert,
  CircleAlert,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  roads: Route,
  drainage: Waves,
  streetlights: Lamp,
  garbage: Trash2,
  "water-supply": Droplets,
  "public-safety": ShieldAlert,
};

const COLORS: Record<string, string> = {
  roads: "bg-orange-50 text-orange-600 ring-orange-200",
  drainage: "bg-cyan-50 text-cyan-700 ring-cyan-200",
  streetlights: "bg-yellow-50 text-yellow-600 ring-yellow-200",
  garbage: "bg-lime-50 text-lime-700 ring-lime-200",
  "water-supply": "bg-blue-50 text-blue-600 ring-blue-200",
  "public-safety": "bg-rose-50 text-rose-600 ring-rose-200",
};

export function categoryIcon(slug: string): LucideIcon {
  return ICONS[slug] ?? CircleAlert;
}

export function categoryColor(slug: string): string {
  return COLORS[slug] ?? "bg-slate-100 text-slate-600 ring-slate-200";
}

export function CategoryChip({
  slug,
  name,
  size = "md",
}: {
  slug: string;
  name: string;
  size?: "sm" | "md";
}) {
  const Icon = categoryIcon(slug);
  return (
    <span
      className={`badge ring-1 ${categoryColor(slug)} ${size === "sm" ? "px-2 py-0.5 text-[11px]" : ""}`}
    >
      <Icon className={size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"} />
      {name}
    </span>
  );
}
