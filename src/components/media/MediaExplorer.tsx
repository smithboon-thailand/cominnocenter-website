"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MEDIA_PROFESSOR_LABEL,
  MEDIA_TYPE_LABEL,
  mediaProfessors,
  mediaSorted,
  mediaTypes,
  type MediaMention,
  type MediaProfessorKey,
  type MediaType,
} from "@/data/media";

type MediaExplorerProps = {
  locale?: "th" | "en";
};

const THAI_MONTHS = [
  "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
  "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค.",
];
const EN_MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** วันที่ตามความละเอียดจริงของข้อมูล — หลายรายการใน Notion มีแค่ปี */
function formatDate(m: MediaMention, locale: "th" | "en"): string {
  const [y, mo, d] = m.date.split("-").map(Number);
  const year = locale === "th" ? y + 543 : y;
  if (m.datePrecision === "year") return String(year);
  const month = locale === "th" ? THAI_MONTHS[mo - 1] : EN_MONTHS[mo - 1];
  if (m.datePrecision === "month") return `${month} ${year}`;
  return `${d} ${month} ${year}`;
}

const chipBase =
  "inline-flex h-8 items-center rounded border px-3 text-[13px] font-medium leading-none " +
  "transition-colors duration-150 ease-brand cursor-pointer " +
  "focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]";

export default function MediaExplorer({ locale = "th" }: MediaExplorerProps) {
  const [prof, setProf] = useState<MediaProfessorKey | null>(null);
  const [type, setType] = useState<MediaType | null>(null);

  const items = mediaSorted.filter(
    (m) => (!prof || m.professors.includes(prof)) && (!type || m.type === type)
  );

  const t = locale === "th"
    ? {
        all: "ทั้งหมด",
        byProf: "กรองตามอาจารย์",
        byType: "กรองตามประเภท",
        found: (n: number) => `${n} รายการ`,
        featured: "ไฮไลต์",
        read: "ดูต้นฉบับ",
        readInternal: "อ่านข่าวบนเว็บนี้",
        empty: "ไม่พบรายการตามเงื่อนไขที่เลือก",
      }
    : {
        all: "All",
        byProf: "Filter by professor",
        byType: "Filter by type",
        found: (n: number) => `${n} ${n === 1 ? "item" : "items"}`,
        featured: "Featured",
        read: "View original",
        readInternal: "Read on this site",
        empty: "No items match the selected filters",
      };

  const chipClass = (selected: boolean) =>
    `${chipBase} ${
      selected
        ? "border-ink-900 bg-ink-900 text-white"
        : "border-ink-300 bg-white text-ink-700 hover:bg-ink-100"
    }`;

  return (
    <>
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[13px] font-medium text-ink-500">{t.byProf}</span>
          <button type="button" className={chipClass(prof === null)} onClick={() => setProf(null)}>
            {t.all}
          </button>
          {mediaProfessors.map((key) => (
            <button
              key={key}
              type="button"
              className={chipClass(prof === key)}
              onClick={() => setProf(prof === key ? null : key)}
            >
              {MEDIA_PROFESSOR_LABEL[key][locale]}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[13px] font-medium text-ink-500">{t.byType}</span>
          <button type="button" className={chipClass(type === null)} onClick={() => setType(null)}>
            {t.all}
          </button>
          {mediaTypes.map((key) => (
            <button
              key={key}
              type="button"
              className={chipClass(type === key)}
              onClick={() => setType(type === key ? null : key)}
            >
              {MEDIA_TYPE_LABEL[key][locale]}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-4 text-[15px] leading-[1.6] text-ink-500">{t.found(items.length)}</p>

      {items.length === 0 ? (
        <div className="mt-6 rounded-lg border border-ink-300 bg-white p-8">
          <p className="text-[17px] leading-[1.7] text-ink-700">{t.empty}</p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((m) => {
            const name = locale === "th" ? m.nameTh : m.nameEn;
            const summary = locale === "th" ? m.summaryTh : m.summaryEn;
            const featured = m.priority === "High";
            const card = (
              <article
                className={`flex h-full flex-col overflow-hidden rounded-lg bg-white transition-all duration-150 ease-brand hover:-translate-y-0.5 hover:shadow-sm ${
                  featured ? "border-[1.5px] border-ink-900" : "border border-ink-300"
                }`}
              >
                {m.image && (
                  <div className="relative aspect-[16/10] bg-ink-100">
                    <Image
                      src={m.image}
                      alt={locale === "th" ? `ภาพประกอบข่าว: ${m.nameTh}` : `Illustration for: ${m.nameEn}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    {featured && (
                      <span className="inline-flex rounded bg-ink-900 px-2 py-0.5 text-[11px] font-medium text-white">
                        {t.featured}
                      </span>
                    )}
                    <span className="inline-flex rounded border border-ink-300 px-2 py-0.5 text-[11px] font-medium text-ink-700">
                      {MEDIA_TYPE_LABEL[m.type][locale]}
                    </span>
                    <span className="text-[12px] text-ink-500">{formatDate(m, locale)}</span>
                  </div>
                  <h2 className="text-[17px] font-medium leading-snug text-ink-900">{name}</h2>
                  <p className="mt-2 line-clamp-3 flex-1 text-[14px] leading-[1.6] text-ink-700">
                    {summary}
                  </p>
                  <p className="mt-3 text-[12.5px] leading-[1.5] text-ink-500">
                    {locale === "en" && m.sourceEn ? m.sourceEn : m.source}
                    {" · "}
                    {m.professors
                      .filter((p) => p !== "center" || m.professors.length === 1)
                      .map((p) => MEDIA_PROFESSOR_LABEL[p][locale])
                      .join(" · ")}
                  </p>
                  <p className="mt-3 text-[13px] font-medium text-pink-500 group-hover:text-pink-700">
                    {m.external ? `${t.read} ↗` : `${t.readInternal} →`}
                  </p>
                </div>
              </article>
            );
            return m.external ? (
              <a
                key={m.code}
                href={m.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]"
              >
                {card}
              </a>
            ) : (
              <Link
                key={m.code}
                href={locale === "en" && m.url.startsWith("/news") ? `/en${m.url}` : m.url}
                className="group focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]"
              >
                {card}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
