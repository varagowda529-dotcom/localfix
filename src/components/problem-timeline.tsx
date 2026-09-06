import { CheckCircle2, Circle, CircleDot, AlarmClock } from "lucide-react";
import type { StatusEvent } from "@/db/schema";
import { LIFECYCLE_STEPS, statusOf, formatDate } from "@/lib/constants";

/**
 * Public lifecycle timeline: Reported → Verified → Awaiting Official Response →
 * Work Started → Completed. "Overdue" is rendered as a red flag, not a stage.
 */
export function ProblemTimeline({
  events,
  currentStatus,
}: {
  events: StatusEvent[];
  currentStatus: string;
}) {
  const latestByStep = new Map<string, StatusEvent>();
  for (const e of events) {
    if ((LIFECYCLE_STEPS as readonly string[]).includes(e.status)) {
      latestByStep.set(e.status, e);
    }
  }
  const overdueEvent = [...events].reverse().find((e) => e.status === "overdue");
  const currentStep = statusOf(currentStatus).step;
  const isOverdue = currentStatus === "overdue";

  return (
    <div>
      <ol className="relative space-y-0">
        {LIFECYCLE_STEPS.map((slug, i) => {
          const s = statusOf(slug);
          const event = latestByStep.get(slug);
          const reached = s.step <= currentStep;
          const isCurrent = s.step === currentStep;
          const isLast = i === LIFECYCLE_STEPS.length - 1;
          return (
            <li key={slug} className="relative flex gap-4 pb-6 last:pb-0">
              {!isLast && (
                <span
                  className={`absolute top-8 left-[15px] h-full w-0.5 ${
                    s.step < currentStep ? "bg-accent-500/60" : "bg-slate-200"
                  }`}
                />
              )}
              <span className="relative z-10 mt-0.5 flex h-8 w-8 items-center justify-center">
                {isCurrent ? (
                  isOverdue ? (
                    <AlarmClock className="h-8 w-8 rounded-full bg-white text-rose-500" />
                  ) : (
                    <CircleDot className="h-8 w-8 rounded-full bg-white text-brand-500" />
                  )
                ) : reached ? (
                  <CheckCircle2 className="h-8 w-8 rounded-full bg-white text-accent-600" />
                ) : (
                  <Circle className="h-8 w-8 rounded-full bg-white text-slate-300" />
                )}
              </span>
              <div className="pt-1">
                <p
                  className={`text-sm font-bold ${
                    isCurrent
                      ? isOverdue
                        ? "text-rose-600"
                        : "text-brand-600"
                      : reached
                        ? "text-slate-900"
                        : "text-slate-400"
                  }`}
                >
                  {s.label}
                  {isCurrent && isOverdue && " — flag overdue"}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                  {event?.note || s.description}
                </p>
                {event && (
                  <p className="mt-1 text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
                    {formatDate(event.createdAt)}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
      {isOverdue && overdueEvent && (
        <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          <span className="font-bold">Overdue:</span> {overdueEvent.note}
        </div>
      )}
    </div>
  );
}
