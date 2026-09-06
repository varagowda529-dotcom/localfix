import { platformStats, trendingProblems } from "@/lib/data";
import { HomeClient } from "@/components/home-client";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [stats, trending] = await Promise.all([platformStats(), trendingProblems(3)]);
  return <HomeClient stats={stats} trending={trending} />;
}