import { cookies } from "next/headers";
import type { Lang } from "@/lib/i18n";
import { tFor } from "@/lib/i18n";

export async function getLang(): Promise<Lang> {
  const c = await cookies();
  const v = c.get("cv_lang")?.value;
  return v === "kn" ? "kn" : "en";
}

export async function getT() {
  const lang = await getLang();
  return { lang, t: tFor(lang) };
}