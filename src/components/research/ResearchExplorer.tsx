"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { publications, type PublicationType } from "@/data/publications";
import { summaryForPublication } from "@/data/paperSummaries";
import CitationTool from "./CitationTool";
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
    doi: "เปิดผลงานต้นทาง (DOI)",
    index: "เปิดระเบียนในดัชนีวิชาการ",
    selfNote: "ข้อมูลจากโปรไฟล์ ORCID ของผู้เขียน",
    summary: "อ่านบทสรุปภาษาง่าย",
    cite: "อ้างอิงงานนี้",
    citeHide: "ปิดการอ้างอิง",
    provenance:
      "รายการที่มีลิงก์ผ่านการตรวจสอบกับทะเบียน DOI หรือดัชนีวิชาการอิสระแล้วว่าเป็นผลงานของผู้เขียนจริง ส่วนรายการที่ไม่มีลิงก์เป็นข้อมูลที่ผู้เขียนแจ้งไว้ในโปรไฟล์ ORCID ของตนเอง ส่วนใหญ่ตีพิมพ์ในวารสารไทยและเวทีประชุมที่ยังไม่จด DOI",
  },
  en: {
    filterAuthor: "Filter by author",
    filterType: "Filter by type",
    all: "All",
    showing: (n: number) => `${n} ${n === 1 ? "item" : "items"}`,
    empty: "No publications match the selected filters",
    citations: (n: number) => `${n} ${n === 1 ? "citation" : "citations"}`,
    chapters: (n: number) => `${n} ${n === 1 ? "chapter" : "chapters"}`,
    doi: "Open the publication (DOI)",
    index: "Open the record in an academic index",
    selfNote: "From the author's ORCID profile",
    summary: "Read the plain-language summary",
    cite: "Cite this",
    citeHide: "Hide citation",
    provenance:
      "Linked entries have been checked against the DOI registry or an independent academic index to confirm the authorship. Entries without a link come from the author's own ORCID profile — mostly Thai journals and conference venues that do not register DOIs.",
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
  /** เปิดแผงอ้างอิงได้ทีละรายการ — mount เฉพาะอันที่กด ไม่ใช่ทั้ง 46 รายการ */
  const [citeFor, setCiteFor] = useState<string | null>(null);

  const authorName = (slug: string) => {
    const person = leadership.find((l) => l.slug === slug);
    if (!person) return slug;
    return locale === "th" ? person.name : person.nameEn;
  };
  /** ลิงก์โปรไฟล์ ORCID ของผู้เขียน — ใช้เป็นที่มาของรายการที่ยังไม่มีดัชนีอิสระ */
  const orcidHref = (slugs: string[]) => {
    for (const slug of slugs) {
      const person = leadership.find((l) => l.slug === slug);
      const orcid = person?.links.find((l) => l.label === "ORCID");
      if (orcid) return orcid.href;
    }
    return null;
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

      {/* บอกที่มาของหลักฐานตรงๆ — ผู้อ่านงานวิชาการต้องรู้ว่าอะไรตรวจสอบได้แค่ไหน */}
      <p className="mt-6 max-w-prose text-[13px] leading-[1.6] text-ink-500">{t.provenance}</p>

      <p aria-live="polite" className="mt-4 text-[13px] leading-[1.4] text-ink-500">
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

                    {(() => {
                      const href = p.doi ? `https://doi.org/${p.doi}` : p.indexUrl;
                      return (
                        <h3 className="mt-1.5 text-[17px] font-medium leading-[1.6] text-ink-900">
                          {href ? (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              title={p.doi ? t.doi : t.index}
                              className="transition-colors duration-150 ease-brand hover:text-pink-700
                                focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]"
                            >
                              {p.title}
                            </a>
                          ) : (
                            p.title
                          )}
                        </h3>
                      );
                    })()}

                    <p className="mt-1 text-[15px] leading-[1.6] text-ink-500">
                      {p.venue}
                      {p.venue && " · "}
                      {p.authors.map(authorName).join(", ")}
                      {/* ที่มาของหลักฐาน — ผู้อ่านต้องแยกออกว่ารายการไหนตรวจสอบออนไลน์ได้
                          รายการที่ยังไม่มีดัชนีอิสระ ให้ลิงก์ไประเบียน ORCID ต้นทางแทน */}
                      {p.verified === "self" &&
                        (() => {
                          const href = orcidHref(p.authors);
                          return (
                            <>
                              {" · "}
                              {href ? (
                                <a
                                  href={href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-ink-500 underline decoration-ink-300 underline-offset-2
                                    transition-colors duration-150 ease-brand hover:text-pink-700
                                    focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]"
                                >
                                  {t.selfNote}
                                </a>
                              ) : (
                                <span className="text-ink-300">{t.selfNote}</span>
                              )}
                            </>
                          );
                        })()}
                    </p>

                    {/* งานที่มีหน้าบทสรุปภาษาง่ายของเราเอง — ลิงก์เข้าเว็บ ไม่ใช่ออกไป DOI
                        ให้ผู้อ่านที่ไม่เปิดไฟล์วารสารยังได้เนื้อหาของงานชิ้นนั้น */}
                    {(() => {
                      const summary = summaryForPublication(p);
                      const key = p.doi || p.indexUrl || `${p.title}-${p.year}`;
                      const base = locale === "th" ? "/research" : "/en/research";
                      const open = citeFor === key;
                      return (
                        <>
                          <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2">
                            {summary ? (
                              <Link
                                href={`${base}/${summary.slug}`}
                                className="inline-flex items-center gap-1.5 text-[15px] font-medium leading-[1.6]
                                  text-pink-500 transition-colors duration-150 ease-brand hover:text-pink-700
                                  focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]"
                              >
                                {t.summary}
                                <span aria-hidden="true">→</span>
                              </Link>
                            ) : null}
                            {/* มีเฉพาะรายการที่ทะเบียนให้ข้อมูลบรรณานุกรมครบ ไม่เดาให้ */}
                            {p.citation ? (
                              <button
                                type="button"
                                onClick={() => setCiteFor(open ? null : key)}
                                aria-expanded={open}
                                className="inline-flex items-center gap-1.5 text-[15px] font-medium leading-[1.6]
                                  text-pink-500 transition-colors duration-150 ease-brand hover:text-pink-700
                                  focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]"
                              >
                                {open ? t.citeHide : t.cite}
                                <span aria-hidden="true">{open ? "\u2212" : "+"}</span>
                              </button>
                            ) : null}
                          </div>
                          {open && p.citation ? (
                            <CitationTool publication={p} citation={p.citation} locale={locale} compact />
                          ) : null}
                        </>
                      );
                    })()}
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
