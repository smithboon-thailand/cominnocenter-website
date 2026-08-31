/**
 * เนื้อบทสรุปงานวิจัยหนึ่งชิ้น — ใช้ร่วมกันทั้งหน้าไทยและหน้าอังกฤษ
 *
 * แยกออกมาเป็น component เพราะโครงของบทสรุปต้องเหมือนกันทั้งสองภาษาเป๊ะๆ
 * (ถามอะไร → ทำอย่างไร → พบอะไร → แล้วยังไงต่อ → ข้อจำกัด) ถ้าเขียนซ้ำสองที่
 * วันหนึ่งจะมีภาษาหนึ่งได้หัวข้อใหม่แล้วอีกภาษาไม่ได้ ซึ่งเป็นปัญหาเดิมที่
 * โปรเจ็คนี้เจอมาแล้วกับการ์ดโครงการที่ฝั่ง EN โชว์ผลลัพธ์เป็นภาษาไทย
 *
 * **ข้อจำกัดอยู่ท้ายสุดและอยู่ในกรอบของตัวเอง** โดยตั้งใจ — ไม่ซ่อน ไม่ปนกับผล
 * เพื่อให้คนที่อ่านแค่ผลแล้วจะเอาไปอ้างต่อ เห็นเงื่อนไขก่อนปิดหน้า
 */

type PaperCopy = {
  headline: string;
  question: string;
  method: string;
  findings: string[];
  soWhat: string;
  caveat: string;
};

const COPY = {
  th: {
    question: "งานนี้ถามอะไร",
    method: "ทำอย่างไร",
    findings: "พบอะไร",
    soWhat: "แล้วยังไงต่อ",
    caveat: "ข้อจำกัดที่ควรรู้ก่อนนำไปอ้าง",
  },
  en: {
    question: "The question",
    method: "How it was done",
    findings: "What it found",
    soWhat: "Why it matters",
    caveat: "Limits to know before citing this",
  },
} as const;

export default function PaperSummaryBody({
  copy,
  locale,
}: {
  copy: PaperCopy;
  locale: "th" | "en";
}) {
  const t = COPY[locale];

  return (
    <div className="mt-12 flex flex-col gap-10">
      <section>
        <h2 className="text-h3-m md:text-h3 text-ink-900">{t.question}</h2>
        <p className="mt-3 text-[17px] leading-[1.7] text-ink-700">{copy.question}</p>
      </section>

      <section>
        <h2 className="text-h3-m md:text-h3 text-ink-900">{t.method}</h2>
        <p className="mt-3 text-[17px] leading-[1.7] text-ink-700">{copy.method}</p>
      </section>

      <section>
        <h2 className="text-h3-m md:text-h3 text-ink-900">{t.findings}</h2>
        <ul className="mt-3 flex flex-col gap-3">
          {copy.findings.map((f) => (
            <li key={f} className="flex gap-3 text-[17px] leading-[1.7] text-ink-700">
              <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-pink-500" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-h3-m md:text-h3 text-ink-900">{t.soWhat}</h2>
        <p className="mt-3 text-[17px] leading-[1.7] text-ink-700">{copy.soWhat}</p>
      </section>

      <section className="rounded-lg border border-ink-300 bg-ink-0 p-6">
        <h2 className="text-[15px] font-medium leading-[1.6] text-ink-900">{t.caveat}</h2>
        <p className="mt-2 text-[15px] leading-[1.6] text-ink-700">{copy.caveat}</p>
      </section>
    </div>
  );
}
