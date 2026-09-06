"use client";

import Link from "next/link";
import { UserPlus, BadgeCheck, Clock3, Megaphone } from "lucide-react";
import { signup } from "@/app/actions/auth";
import { ROLES } from "@/lib/constants";
import { useLanguage } from "@/components/language-provider";

export function SignupClient({ error }: { error: string }) {
  const { t } = useLanguage();

  return (
    <div className="container-site flex items-center justify-center py-14">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 lg:grid-cols-[1fr_1.1fr]">
        <div className="order-2 p-8 sm:p-10 lg:order-1">
          <h1 className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-slate-900">
            <UserPlus className="h-6 w-6 text-brand-500" /> {t("signupTitle")}
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            {t("signupSubtitle")}
          </p>

          {error && <div className="form-banner-error mt-5">{error}</div>}

          <form action={signup} className="mt-6 space-y-4">
            <div>
              <label htmlFor="fullName" className="label">{t("fullName")}</label>
              <input id="fullName" name="fullName" required className="input" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="username" className="label">{t("username")}</label>
                <input id="username" name="username" required className="input" />
              </div>
              <div>
                <label htmlFor="email" className="label">{t("email")}</label>
                <input id="email" name="email" type="email" required className="input" />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="label">{t("password")}</label>
              <input id="password" name="password" type="password" required minLength={8} className="input" />
            </div>
            <div>
              <label htmlFor="role" className="label">{t("registeringAs")}</label>
              <select id="role" name="role" className="input" defaultValue="citizen">
                {ROLES.map((r) => (
                  <option key={r.slug} value={r.slug}>{r.label}</option>
                ))}
              </select>
              <p className="hint flex items-center gap-1">
                <Clock3 className="h-3 w-3" />
                {t("signupHint")}
              </p>
            </div>
            <button type="submit" className="btn-primary w-full py-3">{t("createAccountBtn")}</button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-500">
            {t("alreadyRegistered")}{" "}
            <Link href="/login" className="font-bold text-brand-600 hover:underline">{t("logIn")}</Link>
          </p>
        </div>

        <div className="order-1 flex flex-col justify-between gap-8 bg-slate-900 p-10 text-white lg:order-2">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
              <Megaphone className="h-5.5 w-5.5" />
            </span>
            <span className="text-xl font-extrabold tracking-tight">
              {t("brandFirst")}{t("brandSecond")}
            </span>
          </div>
          <ul className="space-y-5">
            {[
              [t("benefit1T"), t("benefit1B")],
              [t("benefit2T"), t("benefit2B")],
              [t("benefit3T"), t("benefit3B")],
            ].map(([title, body]) => (
              <li key={title} className="flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500">
                  <BadgeCheck className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-bold">{title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-slate-400">{body}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="text-xs font-medium text-slate-500">
            {t("signupFootnote")}
          </p>
        </div>
      </div>
    </div>
  );
}