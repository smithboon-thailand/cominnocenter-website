"use client";

import { useMemo, useState } from "react";
import { publications, type PublicationType } from "@/data/publications";
import { leadership } from "@/data/leadership";

type ResearchExplorerProps = {
  locale?: "th" | "en";
};

const TYPE_LABEL: Record<PublicationType, { th: string; en: string }> = {
  book: { th: "หนังสือ", en: "Book" },
  "journal-article": { th: "บทความวารสาร", en: "Journal article" },
  "book-chapter": { th: "บทในหนังสือ", en: "Book chapter" },
  "conference-paper": { th: "บทความประชุมวิชาการ", en: "Conference paper" },
};

const TYPE_ORDER: PublicationType[] = ["book", "journal-article", "book-chapter", "conference-paper"];

const COPY = {
  th: {
    filterAuthor: "กรองตามผู้เขียน",
    filterType: "กรองตามประเภท",
    all: "ทั้งหมด",
    showing: (n: number) => `${n} รายการ`,
    empty: "ไม่พบผลงานตามเงื่อนไขที่เลือก",
    citations: (n: number) => `อ้างอิง ${n} ครั้ง`,
    chapters: (n: number) => `${n} บท`,
    doi: "เปิดผลงาน (DOI)",
    reset: "ล้างตัวกรอง",
  },
  en: {
    filterAuthor: "Filter by author",
    filterType: "Filter by type",
    all: "All",
    showing: (n: number) => `${n} ${n === 1 ? "item" : "items"}`,
    empty: "No publications match the selected filters",
    citations: (n: number) => `${n} ${n === 1 ? "citation" : "citations"}`,
    chapters: (n: number) => `${n} ${n === 1 ? "chapter" : "chapters"}`,
    doi: "Open publication (DOI)",
    reset: "Clear filters",
  },
} as const;

/**
 * รายการผลงานวิชาการทั้งหมดของศูนย์ฯ — กรองตามผู้เขียน/ประเภท จัดกลุ่มตามปี
 * ข้อมูลจาก src/data/publications.ts (ORCID + Crossref ผ่าน scripts/fetch-publications.mjs)
 * หน้านี้ไม่ใช้สี SDG — ใช้ Ink + ชมพูสำหรับ action ตาม BRAND PART H
 */
export default function ResearchExplorer({ locale = "th" }: ResearchExplorerProps) {
  const t = COPY[locale];
  const [author, setAuthor] = useState<string | null>(null);
  const [type, setType] = useState<PublicationType | null>(null);

  const authorName = (slug: string) => {
    const person = leadership.find((l) => l.slug === slug);
    if (!person) return slug;
    return locale === "th" ? person.name : person.nameEn;
  };
  /** ชื่อสั้นสำหรับ chip — ตัดคำนำหน้าตำแหน่งวิชาการออก */
  const shortName = (slug: string) => {
    const person = leadership.find((l) => l.slug === slug);
    if (!person) return slug;
    return locale === "th"
      ? person.name.replace(/^(รศ|ผศ|ศ)\.(ดร\.)?\s*/, "")
      : person.nameEn.replace(/^(Assoc\.|Asst\.)?\s*Prof\.\s*(Dr\.)?\s*/, "");
  };

  const filtered = useMemo(
    () =>
      publications.filter(
        (p) => (!author || p.authors.includes(author)) && (!type || p.type === type)
      ),
    [author, type]
  );

  const byYear = useMemo(() => {
    const groups = new Map<number, typeof publications>();
    for (const p of filtered) {
      const list = groups.get(p.year) || [];
      list.push(p);
      groups.set(p.year, list);
    }
    return [...groups.entries()].sort((a, b) => b[0] - a[0]);
  }, [filtered]);

  const chip = (active: boolean) =>
    `inline-flex items-center rounded-full border px-3.5 py-1.5 text-[13px] font-medium leading-[1.4]
     transition-colors duration-150 ease-brand
     focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)] ${
       active
         ? "border-ink-900 bg-ink-900 text-white"
         : "border-ink-300 bg-white text-ink-700 hover:border-ink-500 hover:text-ink-900"
     }`;

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[13px] leading-[1.4] text-ink-500">{t.filterAuthor}</span>
          <button type="button" onClick={() => setAuthor(null)} className={chip(author === null)}>
            {t.all}
          </button>
          {leadership.map((person) => (
            <button
              key={person.slug}
              type="button"
              onClick={() => setAuthor(author === person.slug ? null : person.slug)}
              className={chip(author === person.slug)}
              aria-pressed={author === person.slug}
            >
              {shortName(person.slug)}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[13px] leading-[1.4] text-ink-500">{t.filterType}</span>
          <button type="button" onClick={() => setType(null)} className={chip(type === null)}>
            {t.all}
          </button>
          {TYPE_ORDER.map((key) => {
            const count = publications.filter((p) => p.type === key).length;
            if (count === 0) return null;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setType(type === key ? null : key)}
                className={chip(type === key)}
                aria-pressed={type === key}
              >
                {TYPE_LABEL[key][locale]}
                <span className="ml-1.5 text-ink-500">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <p aria-live="polite" className="mt-6 text-[13px] leading-[1.4] text-ink-500">
        {t.showing(filtered.length)}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-10 text-[17px] leading-[1.7] text-ink-700">{t.empty}</p>
      ) : (
        <div className="mt-6 flex flex-col gap-10">
          {byYear.map(([year, items]) => (
            <section key={year}>
              <h2 className="text-h3-m md:text-h3 text-ink-900">{year}</h2>
              <ul className="mt-3 flex flex-col divide-y divide-ink-100 border-t border-ink-100">
                {items.map((p) => (
                  <li key={`${p.doi || p.title}-${p.year}`} className="py-4">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="inline-flex items-center rounded-full bg-ink-100 px-2.5 py-0.5 text-[13px] font-medium leading-[1.4] text-ink-700">
                        {TYPE_LABEL[p.type][locale]}
                      </span>
                      {p.chapters ? (
                        <span className="text-[13px] leading-[1.4] text-ink-500">
                          {t.chapters(p.chapters)}
                        </span>
                      ) : null}
                      {p.citations ? (
                        <span className="text-[13px] leading-[1.4] text-ink-500">
                          {t.citations(p.citations)}
                        </span>
                      ) : null}
                    </div>

                    <h3 className="mt-1.5 text-[17px] font-medium leading-[1.6] text-ink-900">
                      {p.doi ? (
                        <a
                          href={`https://doi.org/${p.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={t.doi}
                          className="transition-colors duration-150 ease-brand hover:text-pink-700
                            focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]"
                        >
                          {p.title}
                        </a>
                      ) : (
                        p.title
                      )}
                    </h3>

                    <p className="mt-1 text-[15px] leading-[1.6] text-ink-500">
                      {p.venue}
                      {p.venue && " · "}
                      {p.authors.map(authorName).join(", ")}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
