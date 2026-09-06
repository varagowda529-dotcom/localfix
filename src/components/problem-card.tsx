import Link from "next/link";
import Image from "next/image";
import { MapPin, ThumbsUp, ArrowRight, UserRound } from "lucide-react";
import type { ProblemCard as ProblemCardData } from "@/lib/data";
import { CategoryChip } from "@/components/category-icon";
import { StatusBadge } from "@/components/status-badge";
import { formatDate } from "@/lib/constants";

export function ProblemCard({ data, rank }: { data: ProblemCardData; rank?: number }) {
  const { problem, category, path, reporterName } = data;
  const place = path.length > 1 ? path[path.length - 1] : path[0];
  const region = path.length > 1 ? path[path.length - 2] : undefined;

  return (
    <article className="card group flex flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/problems/${problem.id}`} className="relative block aspect-[16/10] overflow-hidden bg-slate-100">
        {problem.photoPath ? (
          <Image
            src={problem.photoPath}
            alt={problem.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400">
            <MapPin className="h-10 w-10" />
          </div>
        )}
        <div className="absolute top-3 left-3">
          <CategoryChip slug={category.slug} name={category.name} size="sm" />
        </div>
        {rank !== undefined && (
          <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/80 text-sm font-extrabold text-white">
            #{rank}
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base leading-snug font-bold text-slate-900">
            <Link href={`/problems/${problem.id}`} className="transition hover:text-brand-600">
              {problem.title}
            </Link>
          </h3>
          <StatusBadge status={problem.status} size="sm" />
        </div>

        <p className="flex items-center gap-1.5 text-sm font-medium text-slate-500">
          <MapPin className="h-4 w-4 shrink-0 text-accent-600" />
          {place?.name}
          {region ? `, ${region.name}` : ""}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-3">
          <div className="flex flex-col gap-0.5">
            <span className="flex items-center gap-1.5 text-sm font-bold text-slate-800">
              <ThumbsUp className="h-4 w-4 text-brand-500" />
              {problem.supporterCount.toLocaleString("en-IN")} supporters
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <UserRound className="h-3 w-3" />
              {reporterName ?? "Anonymous Citizen"} · {formatDate(problem.createdAt)}
            </span>
          </div>
          <Link
            href={`/problems/${problem.id}`}
            className="btn-outline btn-sm"
            aria-label={`View ${problem.title}`}
          >
            View <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
