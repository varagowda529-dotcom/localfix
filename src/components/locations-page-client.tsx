"use client";

import Link from "next/link";
import { Search, MapPin, ArrowRight, LandPlot, Building2 } from "lucide-react";
import { locationTypeLabel } from "@/lib/constants";
import { ProblemCard } from "@/components/problem-card";
import { useLanguage } from "@/components/language-provider";
import type { ProblemCard as ProblemCardData } from "@/lib/data";

const POPULAR = ["Bengaluru", "Mysuru", "Tumakuru", "Kodagu", "Ballari", "Chikkamagaluru"];

const DISTRICT_PHOTOS: Record<string, string> = {
  bagalkote: "https://kstdc.co/wp-content/uploads/2021/02/Badami-Caves.jpg",
  ballari: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/0b/95/bd/hampi.jpg?w=1200&h=700&s=1",
  belagavi: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8SRq39lWKKhnTb3OHLYNXt-4wmNyi86Z4IZhVzud7d7cCTpidji_3N6k&s=10",
  "bengaluru-rural": "https://i.ytimg.com/vi/bqejUpo8zvc/maxresdefault.jpg",
  "bengaluru-urban": "https://s7ap1.scene7.com/is/image/incredibleindia/vidhana-soudha-bangalore-karnataka-hero?qlt=82&ts=1742199603184",
  bidar: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/f4/89/e8/garden.jpg?w=1200&h=700&s=1",
  chamarajanagar: "https://thumbs.dreamstime.com/b/himavad-gopalaswamy-betta-hill-situated-chamarajanagar-district-state-karnataka-india-found-midst-326239226.jpg",
  chikkaballapur: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvwyNveVHhWflC9lCLT9lYvRsWKJDFXn_MAigPytXaxKnW_sVDIPC-J41G&s=10",
  chikkamagaluru: "https://res.cloudinary.com/dyiffrkzh/image/upload/c_fill,f_auto,fl_progressive.strip_profile,g_center,h_400,q_auto,w_700/v1723813541/banbanjara/dsbeqpmioly0dufidkvb.webp",
  chitradurga: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/e1/6c/e4/vani-vilas-sagar-dam.jpg?w=500&h=400&s=1",
  "dakshina-kannada": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/df/77/74/caption.jpg?w=500&h=400&s=1",
  davanagere: "https://karnatakatourism.org/_next/image/?url=https%3A%2F%2Fweb-cms.karnatakatourism.org%2Fwp-content%2Fuploads%2F2026%2F02%2FPUSHKARNI-1-scaled.jpg&w=3840&q=75",
  dharwad: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKPBq0MnqN1lxJB24hbTyAu456baaD9bVOgrNeiK9CleXk-5e-TIQAycZh&s=10",
  gadag: "https://www.trodly.com/pictures/attraction/5195.jpg",
  hassan: "https://kstdc.co/wp-content/uploads/2021/03/shutterstock_326363990.jpg",
  haveri: "https://www.karnataka.com/wp-content/uploads/2009/07/sathodi-falls-haveri.jpg",
  kalaburagi: "https://www.holidify.com/images/bgImages/GULBARGA.jpg",
  kodagu: "https://cdn.cholantours.com/cms_page/cms_page1770730589_698b345dc2cbc.webp",
  kolar: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/df/2a/c1/lrm-export-20160902-230306.jpg?w=500&h=500&s=1",
  koppal: "https://www.trodly.com/pictures/attraction/4071.jpg",
  mandya: "https://wanderon-images.gumlet.io/blogs/new/2024/08/places-to-visit-in-madya.jpg",
  mysuru: "https://www.holidify.com/images/bgImages/MYSORE.jpg",
  raichur: "https://s3.india.com/wp-content/uploads/2024/07/Visit-In-Raichur.jpg?impolicy=Medium_Widthonly&w=350&h=263",
  ramanagara: "https://res.cloudinary.com/dyiffrkzh/image/upload/c_fill,f_auto,fl_progressive.strip_profile,g_center,h_400,q_auto,w_700/v1692702068/bbj/gte5uudgqspoituo79da.jpg",
  shivamogga: "https://s3.india.com/wp-content/uploads/2024/04/Feature-Image_-Shimoga.jpg",
  tumakuru: "https://i0.wp.com/currylines.com/wp-content/uploads/2025/03/485132941_2850965188398125_1766627803751475549_n.jpg?resize=640%2C854&ssl=1",
  udupi: "https://blogs.revv.co.in/blogs/wp-content/uploads/2021/06/Malpe-Beach-1024x738.jpg",
  "uttara-kannada": "https://uttarakannada.org/wp-content/uploads/2025/10/Om-Beach-portrait-1024x614.jpg",
  vijayapura: "https://www.holidify.com/images/compressed/attractions/attr_1684.jpg",
  vijayanagara: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlmPXjfWA71Ii78Z6zhyCiav-hCIe0Cgr3bW9sqFOiVQkHBnLUqVDPFrs&s=10",
  yadgir: "https://media-cdn.tripadvisor.com/media/photo-c/1280x250/08/5a/3e/c0/yadgir.jpg",
};

const FALLBACK = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&h=400&q=80";

export function LocationsPageClient({
  q,
  districts,
  best,
  bestProblems,
}: {
  q: string;
  districts: { id: number; name: string; slug: string; count: number }[];
  best: { name: string; slug: string; type: string; count: number } | null;
  bestProblems: ProblemCardData[];
}) {
  const { t } = useLanguage();

  return (
    <div>
      <section className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50">
        <div className="container-site py-14 text-center">
          <p className="section-eyebrow">{t("exploreKarnataka")}</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {t("allDistrictsTitle")}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-500">
            {t("allDistrictsDesc")}
          </p>
          <form action="/locations" method="GET" className="mx-auto mt-8 flex max-w-2xl gap-2">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input type="search" name="q" defaultValue={q} autoFocus placeholder={t("locSearchPlaceholder")} className="input rounded-full py-4 pl-13 text-base shadow-sm" />
            </div>
            <button type="submit" className="btn-primary shrink-0 rounded-full px-7 py-4">{t("search")}</button>
          </form>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-semibold text-slate-400">{t("popular")}:</span>
            {POPULAR.map((name) => (
              <Link key={name} href={`/locations?q=${encodeURIComponent(name)}`}
                className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-600 transition hover:border-brand-500 hover:text-brand-600">
                {name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {q && (
        <section className="container-site py-10">
          {!best ? (
            <div className="card mx-auto max-w-xl px-6 py-12 text-center">
              <MapPin className="mx-auto h-10 w-10 text-slate-300" />
              <p className="mt-3 text-lg font-bold text-slate-700">{t("noLocationMatches")} &ldquo;{q}&rdquo;</p>
              <p className="mt-1 text-sm text-slate-500">{t("noLocationDesc")}</p>
            </div>
          ) : (
            <div className="card p-6 sm:p-7">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`badge ring-1 ${["city","town","ward"].includes(best.type) ? "bg-violet-50 text-violet-700 ring-violet-200" : "bg-teal-50 text-teal-700 ring-teal-200"}`}>
                  {["city","town","ward"].includes(best.type) ? <Building2 className="h-3 w-3" /> : <LandPlot className="h-3 w-3" />}
                  {locationTypeLabel(best.type)}
                </span>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
                  {best.count} {best.count === 1 ? t("problem") : t("problems")}
                </span>
              </div>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900">{best.name}</h2>
              <Link href={`/locations/${best.slug}`} className="btn-primary mt-4 inline-flex">
                {t("explore")} {best.name} <ArrowRight className="h-4 w-4" />
              </Link>
              {bestProblems.length > 0 && (
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  {bestProblems.map((data) => (
                    <ProblemCard key={data.problem.id} data={data} />
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      )}

      <section className={`container-site ${q ? "pb-14" : "py-10 sm:py-14"}`}>
        <div className="mb-8">
          <p className="section-eyebrow">{t("allDistricts")}</p>
          <h2 className="section-title">{t("districtsGridTitle")}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">{t("districtsGridDesc")}</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {districts.slice().sort((a, b) => a.name.localeCompare(b.name)).map((dist) => {
            const photo = DISTRICT_PHOTOS[dist.slug] ?? FALLBACK;
            return (
              <Link key={dist.id} href={`/locations/${dist.slug}`}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md transition hover:-translate-y-1 hover:shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo} alt={dist.name} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-extrabold text-white drop-shadow">{dist.name}</h3>
                  <p className="mt-0.5 flex items-center gap-1.5 text-xs font-semibold text-white/80">
                    <MapPin className="h-3 w-3" />
                    {dist.count} {t("problemsReportedShort")}
                  </p>
                </div>
                {dist.count > 0 && (
                  <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-xs font-extrabold text-white shadow">
                    {dist.count}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}