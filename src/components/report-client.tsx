"use client";

import Link from "next/link";
import { Camera, MapPin, EyeOff, ClipboardList, CheckCircle2, Lightbulb } from "lucide-react";
import { reportProblem } from "@/app/actions/problems";
import { useLanguage } from "@/components/language-provider";
import type { Category } from "@/db/schema";
import type { LocationOption } from "@/lib/data";

export function ReportClient({
  categories,
  options,
  error,
}: {
  categories: Category[];
  options: LocationOption[];
  error: string;
}) {
  const { t } = useLanguage();

  return (
    <div className="container-site py-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="card p-6 sm:p-8">
          <p className="section-eyebrow">{t("reportEyebrow")}</p>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            {t("reportTitle")}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">{t("reportSubtitle")}</p>

          {error && <div className="form-banner-error mt-5">{error}</div>}

          <form action={reportProblem} className="mt-6 space-y-5">
            <div>
              <label htmlFor="title" className="label">{t("problemTitle")}</label>
              <input id="title" name="title" required maxLength={140} placeholder={t("problemTitlePlaceholder")} className="input" />
              <p className="hint">{t("problemTitleHint")}</p>
            </div>

            <div>
              <label htmlFor="description" className="label">{t("description")}</label>
              <textarea id="description" name="description" required rows={5} maxLength={2000} placeholder={t("descriptionPlaceholder")} className="input resize-y" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="categoryId" className="label">{t("category")}</label>
                <select id="categoryId" name="categoryId" required className="input">
                  <option value="">{t("chooseCategory")}</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="locationId" className="label">{t("location")}</label>
                <select id="locationId" name="locationId" required className="input">
                  <option value="">{t("chooseLocation")}</option>
                  {options.map((o) => (
                    <option key={o.id} value={o.id}>{o.label}</option>
                  ))}
                </select>
                <p className="hint">{t("locationHint")}</p>
              </div>
            </div>

            <div>
              <label htmlFor="photo" className="label">
                {t("photo")} <span className="font-normal text-slate-400">{t("photoOptional")}</span>
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4">
                <Camera className="h-6 w-6 shrink-0 text-slate-400" />
                <input id="photo" name="photo" type="file" accept="image/*" className="w-full text-sm text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-bold file:text-brand-600 hover:file:bg-brand-100" />
              </div>
            </div>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5">
              <input type="checkbox" name="showIdentity" className="mt-0.5 h-4.5 w-4.5 rounded border-slate-300 accent-brand-500" />
              <span>
                <span className="block text-sm font-bold text-slate-800">{t("showIdentity")}</span>
                <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">{t("showIdentityDesc")}</span>
              </span>
            </label>

            <button type="submit" className="btn-primary w-full py-3.5 text-base">{t("submitReport")}</button>
          </form>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-accent-600 p-6 text-white">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Lightbulb className="h-5 w-5" /> {t("goodReportsTitle")}
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/90">
              {[t("tip1"), t("tip2"), t("tip3"), t("tip4")].map((tip) => (
                <li key={tip} className="flex gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-white/80" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-5">
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800">
              <EyeOff className="h-4.5 w-4.5 text-slate-400" /> {t("anonymousDefault")}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">{t("anonymousDesc")}</p>
          </div>

          <div className="card p-5">
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800">
              <ClipboardList className="h-4.5 w-4.5 text-slate-400" /> {t("whatHappensNext")}
            </h3>
            <ol className="mt-3 space-y-2.5 text-xs leading-relaxed text-slate-500">
              <li className="flex gap-2"><span className="font-extrabold text-brand-500">1.</span> {t("happens1")}</li>
              <li className="flex gap-2"><span className="font-extrabold text-brand-500">2.</span> {t("happens2")}</li>
              <li className="flex gap-2"><span className="font-extrabold text-brand-500">3.</span> {t("happens3")}</li>
              <li className="flex gap-2"><span className="font-extrabold text-brand-500">4.</span> {t("happens4")}</li>
            </ol>
            <Link href="/problems" className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:underline">
              <MapPin className="h-3.5 w-3.5" /> {t("seeLiveExamples")}
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}