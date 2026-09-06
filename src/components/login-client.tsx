"use client";

import Link from "next/link";
import { Megaphone, LogIn, KeyRound, Info } from "lucide-react";
import { login } from "@/app/actions/auth";
import { useLanguage } from "@/components/language-provider";

export function LoginClient({ next, error }: { next: string; error: string }) {
  const { t } = useLanguage();

  return (
    <div className="container-site flex items-center justify-center py-14">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 lg:grid-cols-[1.1fr_1fr]">
        <div className="relative hidden flex-col justify-between bg-gradient-to-br from-brand-600 via-brand-500 to-accent-600 p-10 text-white lg:flex">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
              <Megaphone className="h-5.5 w-5.5" />
            </span>
            <span className="text-xl font-extrabold tracking-tight">
              {t("brandFirst")}{t("brandSecond")}
            </span>
          </div>
          <div>
            <p className="text-2xl leading-snug font-extrabold">
              {t("loginTagline")}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/80">
              {t("loginPanelDesc")}
            </p>
          </div>
          <p className="text-xs font-medium text-white/60">
            {t("coveredList")} — Karnataka
          </p>
        </div>

        <div className="p-8 sm:p-10">
          <h1 className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-slate-900">
            <LogIn className="h-6 w-6 text-brand-500" /> {t("loginWelcome")}
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            {t("loginSubtitle")}
          </p>

          {error && <div className="form-banner-error mt-5">{error}</div>}

          <form action={login} className="mt-6 space-y-4">
            <input type="hidden" name="next" value={next} />
            <div>
              <label htmlFor="username" className="label">{t("username")}</label>
              <input id="username" name="username" required autoComplete="username" className="input" />
            </div>
            <div>
              <label htmlFor="password" className="label">{t("password")}</label>
              <input id="password" name="password" type="password" required autoComplete="current-password" placeholder="••••••••" className="input" />
            </div>
            <button type="submit" className="btn-primary w-full py-3">
              <KeyRound className="h-4 w-4" /> {t("logIn")}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-500">
            {t("newToApp")}{" "}
            <Link href="/signup" className="font-bold text-brand-600 hover:underline">
              {t("createAcc")}
            </Link>
          </p>

          <div className="mt-6 rounded-xl bg-slate-50 p-4">
            <p className="flex items-center gap-1.5 text-xs font-bold tracking-wide text-slate-500 uppercase">
              <Info className="h-3.5 w-3.5" /> {t("demoAccounts")}
            </p>
            <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-600">
              <span>Citizen — <b>ashok</b></span>
              <span>Govt. — <b>suresh</b></span>
              <span>Politician — <b>meena</b></span>
              <span>Media — <b>ravi</b></span>
              <span>Admin — <b>admin / admin123</b></span>
              <span className="col-span-2 mt-1 text-slate-400">Password: <b>password123</b></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}