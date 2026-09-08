import { journalMetricFor } from "@/data/researchMetrics";

/**
 * แถบ CiteScore ของวารสารที่ตีพิมพ์ผลงานชิ้นนั้น
 *
 * ─── ข้อบังคับสองข้อที่โค้ดนี้ยึดไว้ ────────────────────────────────────────
 * 1. **percentile ต้องมาพร้อมชื่อสาขาเสมอ** วารสารเล่มเดียวถูกจัดอันดับหลายสาขา
 *    และค่าต่างกันมาก (American Behavioral Scientist อยู่ 97th ในสาขา
 *    Cultural Studies แต่ 75th ในสาขา Social Psychology) การแสดงตัวเลขลอยๆ
 *    เท่ากับหยิบค่าที่ดีที่สุดมาโชว์โดยไม่บอกที่มา — `check:content` ตรวจข้อนี้
 * 2. **แสดงทุกเล่มตามจริง** รวมเล่มที่อยู่ต่ำกว่าค่ากลางสาขา (ผู้ใช้เลือกเมื่อ
 *    8 ก.ย. 2569) รายการบนหน้าเรียงตามปี ไม่ได้เรียงตามคะแนน วารสารคะแนนต่ำ
 *    จึงไม่ถูกดันไปกองท้ายตารางให้เห็นเป็นแถบ
 *
 * ไม่ใช้ widget ของ Scopus เพราะโค้ดที่เขาให้ฝังค่าไว้ตายตัวเหมือนกัน
 * แต่บังคับให้เพิ่มโดเมนภายนอกเข้า CSP — ดูเหตุผลเต็มใน researchMetrics.ts
 */
export default function CiteScoreNote({
  venue,
  locale,
}: {
  venue: string;
  locale: "th" | "en";
}) {
  const m = journalMetricFor(venue);
  if (!m) return null;

  const percentile =
    locale === "th"
      ? `เปอร์เซ็นไทล์ที่ ${m.percentile} ในสาขา ${m.subject}`
      : `${m.percentile}${ordinalSuffix(m.percentile)} percentile in ${m.subject}`;

  return (
    <p className="mt-1 text-[13px] leading-[1.5] text-ink-500">
      <a
        href={`https://www.scopus.com/sourceid/${m.sourceId}`}
        target="_blank"
        rel="noopener noreferrer"
        title={locale === "th" ? "หน้าข้อมูลวารสารบน Scopus" : "Journal page on Scopus"}
        className="font-medium text-ink-700 transition-colors duration-150 ease-brand
          hover:text-pink-700 focus-visible:outline-none
          focus-visible:shadow-[0_0_0_3px_var(--pink-100)]"
      >
        CiteScore {m.citeScore.toFixed(1)}
      </a>
      {" · "}
      {percentile}
      {m.openAccess ? ` · ${locale === "th" ? "วารสารเปิดให้เข้าถึงเสรี" : "Open access"}` : ""}
    </p>
  );
}

/** 21st · 22nd · 23rd · 97th — ใช้เฉพาะหน้าอังกฤษ */
function ordinalSuffix(n: number) {
  const lastTwo = n % 100;
  if (lastTwo >= 11 && lastTwo <= 13) return "th";
  switch (n % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
