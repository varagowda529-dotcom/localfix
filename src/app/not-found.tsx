import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-site flex flex-col items-center justify-center py-24 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-brand-50 text-brand-500">
        <Compass className="h-8 w-8" />
      </span>
      <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900">
        This page doesn’t exist
      </h1>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500">
        The link may be broken, or the page may have been moved. Let’s get you
        back to something useful.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/" className="btn-primary">Go home</Link>
        <Link href="/problems" className="btn-outline">Explore problems</Link>
      </div>
    </div>
  );
}
