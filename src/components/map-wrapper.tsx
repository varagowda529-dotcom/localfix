"use client";

import dynamic from "next/dynamic";

const KarnatakaMap = dynamic(() => import("@/components/karnataka-map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[600px] w-full animate-pulse items-center justify-center rounded-2xl bg-slate-100 text-sm font-semibold text-slate-400">
      Loading interactive map...
    </div>
  ),
});

export function MapWrapper({
  districts,
}: {
  districts: { name: string; slug: string; count: number }[];
}) {
  return <KarnatakaMap districts={districts} />;
}