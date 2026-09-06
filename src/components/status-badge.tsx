import { statusOf } from "@/lib/constants";

export function StatusBadge({
  status,
  size = "md",
}: {
  status: string;
  size?: "sm" | "md";
}) {
  const s = statusOf(status);
  return (
    <span
      className={`badge ring-1 ${s.badge} ${size === "sm" ? "px-2 py-0.5 text-[11px]" : ""}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}
