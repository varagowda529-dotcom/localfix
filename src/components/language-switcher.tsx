"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Globe, ChevronDown } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import type { Lang } from "@/lib/i18n";

const OPTIONS: { value: Lang; label: string; native: string }[] = [
  { value: "en", label: "English", native: "English" },
  { value: "kn", label: "Kannada", native: "ಕನ್ನಡ" },
];

export function LanguageSwitcher() {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const current = OPTIONS.find((o) => o.value === lang) ?? OPTIONS[0];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="btn-ghost inline-flex items-center gap-1.5"
        aria-haspopup="listbox"
        aria-expanded={open}
        title={t("language")}
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{current.native}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={t("language")}
          className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg"
        >
          <p className="px-3 py-1.5 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            {t("language")}
          </p>
          {OPTIONS.map((opt) => {
            const active = opt.value === lang;
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  setLang(opt.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-3 py-2.5 text-left text-sm transition ${
                  active
                    ? "bg-brand-50 font-bold text-brand-700"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span>
                  <span className="block font-semibold">{opt.native}</span>
                  <span className="block text-[11px] font-medium text-slate-400">
                    {opt.label}
                  </span>
                </span>
                {active && <Check className="h-4 w-4 text-brand-600" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}