"use client";

import { useEffect, useRef, useState } from "react";
import type { CitationMeta, PublicationEntry } from "@/data/publications";
import {
  CITATION_STYLES,
  citationFilename,
  formatCitation,
  type CitationStyle,
} from "@/lib/citation";

/**
 * เครื่องมือคัดลอกรายการอ้างอิง — เลือกรูปแบบแล้วกดคัดลอก หรือดาวน์โหลดเป็นไฟล์
 *
 * แยก APA/MLA ออกจาก BibTeX/RIS โดยตั้งใจ เพราะคนละวิธีใช้กัน:
 * - APA กับ MLA คนเอาไป**วางในบรรณานุกรมท้ายเล่ม** → ปุ่มหลักคือคัดลอก
 * - BibTeX กับ RIS เป็น**ไฟล์สำหรับโปรแกรมจัดการอ้างอิง** (Zotero, Mendeley,
 *   EndNote) → มีปุ่มดาวน์โหลดด้วย เพราะโปรแกรมพวกนี้รับเป็นไฟล์สะดวกกว่าวาง
 *
 * ข้อความอ้างอิงเองไม่แปลเป็นไทย แม้อยู่บนหน้าไทย — รายการอ้างอิงต้องคงภาษาของ
 * ต้นฉบับตามหลักบรรณานุกรม มีแต่ป้ายกำกับรอบๆ ที่เปลี่ยนภาษาตามหน้า
 */

type Props = {
  publication: PublicationEntry;
  citation: CitationMeta;
  locale?: "th" | "en";
};

const COPY = {
  th: {
    heading: "อ้างอิงงานชิ้นนี้",
    intro: "เลือกรูปแบบแล้วกดคัดลอกไปวางได้เลย",
    copy: "คัดลอก",
    copied: "คัดลอกแล้ว",
    download: "ดาวน์โหลดไฟล์",
    failed: "คัดลอกไม่สำเร็จ — กดเลือกข้อความแล้วคัดลอกเองได้",
    pick: "รูปแบบการอ้างอิง",
    note: "สร้างอัตโนมัติจากข้อมูลทะเบียน DOI · โปรดตรวจความถูกต้องกับคู่มือของสถาบันก่อนส่งงาน",
    live: (label: string) => `คัดลอกรูปแบบ ${label} แล้ว`,
  },
  en: {
    heading: "Cite this work",
    intro: "Pick a style and copy it straight into your bibliography",
    copy: "Copy",
    copied: "Copied",
    download: "Download file",
    failed: "Copy failed — select the text and copy it manually",
    pick: "Citation style",
    note: "Generated from DOI registry metadata · check it against your institution's style guide before submitting",
    live: (label: string) => `${label} citation copied`,
  },
} as const;

export default function CitationTool({ publication, citation, locale = "th" }: Props) {
  const t = COPY[locale];
  const [style, setStyle] = useState<CitationStyle>("apa");
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const text = formatCitation(style, publication, citation);
  const current = CITATION_STYLES.find((s) => s.id === style)!;

  // เคลียร์ตัวตั้งเวลาเมื่อ component ถูกถอด กัน setState หลัง unmount
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const flash = (ok: boolean) => {
    setCopied(ok);
    setFailed(!ok);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setCopied(false);
      setFailed(false);
    }, 2500);
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      flash(true);
    } catch {
      // clipboard API ใช้ไม่ได้บน http หรือเบราว์เซอร์เก่า — บอกให้คัดลอกเอง
      flash(false);
    }
  };

  const onDownload = () => {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = citationFilename(style, publication, citation);
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const chip = (active: boolean) =>
    `inline-flex items-center rounded-full border px-3.5 py-1.5 text-[13px] font-medium leading-[1.4]
     transition-colors duration-150 ease-brand
     focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)] ${
       active
         ? "border-ink-900 bg-ink-900 text-white"
         : "border-ink-300 bg-white text-ink-700 hover:border-ink-500 hover:text-ink-900"
     }`;

  return (
    <section className="mt-12 rounded-lg border border-ink-300 bg-ink-0 p-6">
      <h2 className="text-h3-m md:text-h3 text-ink-900">{t.heading}</h2>
      <p className="mt-2 text-[15px] leading-[1.6] text-ink-700">{t.intro}</p>

      <div className="mt-5 flex flex-wrap items-center gap-2" role="group" aria-label={t.pick}>
        {CITATION_STYLES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setStyle(s.id)}
            className={chip(style === s.id)}
            aria-pressed={style === s.id}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* ใช้ pre เพราะ BibTeX กับ RIS ต้องคงการขึ้นบรรทัดและการเยื้อง */}
      <pre
        className="mt-4 max-h-72 overflow-auto whitespace-pre-wrap break-words rounded-md border
          border-ink-300 bg-white p-4 text-[14px] leading-[1.7] text-ink-900"
      >
        {text}
      </pre>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex items-center rounded-full bg-pink-500 px-5 py-2 text-[15px]
            font-medium leading-[1.4] text-white transition-colors duration-150 ease-brand
            hover:bg-pink-700 focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]"
        >
          {copied ? t.copied : t.copy}
        </button>

        {current.kind === "file" ? (
          <button
            type="button"
            onClick={onDownload}
            className="inline-flex items-center rounded-full border border-ink-300 bg-white px-5 py-2
              text-[15px] font-medium leading-[1.4] text-ink-900 transition-colors duration-150
              ease-brand hover:border-ink-500
              focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]"
          >
            {t.download} ({citationFilename(style, publication, citation).split(".").pop()})
          </button>
        ) : null}

        {failed ? <span className="text-[13px] leading-[1.4] text-ink-700">{t.failed}</span> : null}
      </div>

      {/* บอกผลการกดให้เครื่องอ่านหน้าจอรู้ด้วย ไม่ใช่แค่เปลี่ยนข้อความบนปุ่ม */}
      <p aria-live="polite" className="sr-only">
        {copied ? t.live(current.label) : ""}
      </p>

      <p className="mt-4 text-[13px] leading-[1.6] text-ink-500">{t.note}</p>
    </section>
  );
}
