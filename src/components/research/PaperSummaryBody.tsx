/**
 * เนื้อบทสรุปงานวิจัยหนึ่งชิ้น — ใช้ร่วมกันทั้งหน้าไทยและหน้าอังกฤษ
 *
 * แยกออกมาเป็น component เพราะโครงของบทสรุปต้องเหมือนกันทั้งสองภาษาเป๊ะๆ
 * (ถามอะไร → ทำอย่างไร → พบอะไร → แล้วยังไงต่อ → ข้อจำกัด) ถ้าเขียนซ้ำสองที่
 * วันหนึ่งจะมีภาษาหนึ่งได้หัวข้อใหม่แล้วอีกภาษาไม่ได้ ซึ่งเป็นปัญหาเดิมที่
 * โปรเจ็คนี้เจอมาแล้วกับการ์ดโครงการที่ฝั่ง EN โชว์ผลลัพธ์เป็นภาษาไทย
 *
 * งานที่ไม่ใช่งานเชิงประจักษ์ใช้โครงเดียวกันแต่**เปลี่ยนชื่อหัวข้อ**และขึ้นป้ายบอก
 * ไว้ก่อนเนื้อหา — ดู `KIND_COPY` · มีสองแบบ: **ประกาศแผนวิจัย** (`protocol`) ที่ยัง
 * ไม่มีผล และ **บทความเชิงแนวคิด** (`argument`) ที่ไม่มีข้อมูลให้วัดตั้งแต่ต้น
 *
 * **ข้อจำกัดอยู่ท้ายสุดและอยู่ในกรอบของตัวเอง** โดยตั้งใจ — ไม่ซ่อน ไม่ปนกับผล
 * เพื่อให้คนที่อ่านแค่ผลแล้วจะเอาไปอ้างต่อ เห็นเงื่อนไขก่อนปิดหน้า
 */

import SectionIcon from "@/components/ui/SectionIcon";

type PaperCopy = {
  headline: string;
  question: string;
  method: string;
  findings: string[];
  soWhat: string;
  caveat: string;
};

/**
 * แปลง **...** ในข้อความบทสรุปให้เป็นการเน้นจริงบนหน้าเว็บ
 *
 * `paperSummaries.ts` เขียนเน้นข้อความด้วยเครื่องหมายแบบ markdown เพราะอ่านง่าย
 * ตอนแก้ไฟล์ โดยเฉพาะการเน้น "ผลที่ไม่พบนัยสำคัญ" ซึ่งกติกาในหัวไฟล์นั้นบังคับให้
 * เขียนไว้เสมอ แต่เดิม component นี้ render เป็นข้อความธรรมดา ดอกจันจึงหลุดขึ้น
 * หน้าเว็บตรงๆ (พบบนโปรดักชัน 22 หน้า 61 คู่ เมื่อ 1 ก.ย. 2569 — ผู้ใช้เป็นคนพบ)
 *
 * **ไม่ใช้ dangerouslySetInnerHTML** — แยกสตริงแล้วประกอบเป็น React node เอง
 * ข้อความจาก data จึงไม่มีทางกลายเป็น HTML ที่ทำงานได้
 *
 * ใช้น้ำหนัก 500 ตาม BRAND.md ที่อนุญาต Kanit เฉพาะ 400/500 — ค่าเริ่มต้นของ
 * <strong> ในเบราว์เซอร์คือ 700 ซึ่งผิดสเปกฟอนต์ของเว็บนี้ จึงต้องกำหนดทับเสมอ
 */
function withEmphasis(text: string) {
  const parts = text.split("**");
  // ดอกจันไม่ครบคู่แปลว่าเจตนาเน้นผิดพลาด แสดงข้อความดิบไว้ดีกว่าเน้นผิดตำแหน่ง
  if (parts.length % 2 === 0) return text;
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-medium text-ink-900">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

/**
 * ตัดเครื่องหมายเน้นออกให้เหลือข้อความล้วน — ใช้กับที่ที่รับ React node ไม่ได้
 * เช่น <title> และ og:description ซึ่งเป็นสตริงอย่างเดียว
 */
export const plainText = (text: string) => text.replace(/\*\*/g, "");

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

/**
 * หัวข้อชุดของงานที่**ไม่มีผลเชิงประจักษ์ให้รายงาน** — เปลี่ยนชื่อหัวข้อ ไม่ใช่ใช้ชุดเดิม
 *
 * เหตุผลเดียวกันทั้งสองแบบ: หัวข้อ **"พบอะไร" เติมอย่างซื่อสัตย์ไม่ได้เลย** กับงาน
 * ที่ไม่มีสิ่งที่ "พบ" — ถ้าคงหัวข้อเดิมไว้ ผู้อ่านที่กวาดสายตาผ่านหน้ารายการจะเข้าใจ
 * ว่ามีผลการศึกษาแล้ว ซึ่งเป็นการอ้างเกินกว่าที่งานรองรับ
 *
 * `protocol` — ประกาศแผนวิจัย ที่วารสารตรวจและตีพิมพ์*แผน*ก่อนเริ่มเก็บข้อมูล
 * ตัวบทความเองเขียนว่า "Since this is a study protocol, precise findings are not
 * yet available" (เคยตัดงานสองชิ้นนี้ทิ้งด้วยเหตุผลนี้ใน PR #31 · ผู้ใช้ทักเมื่อ
 * 2 ก.ย. 2569 ว่าแผนวิจัยก็ควรมีหน้าของตัวเอง เพียงแต่ต้องเรียกให้ตรงกับสิ่งที่มันเป็น)
 *
 * `argument` — บทความเชิงแนวคิด ที่**ไม่ได้เก็บข้อมูลตั้งแต่ต้น** เป็นการให้เหตุผล
 * ทางทฤษฎีล้วนๆ · เพิ่มเมื่อ 3 ก.ย. 2569 ด้วยตรรกะเดียวกับ `protocol` · ป้ายของแบบนี้
 * **บอกด้วยว่าข้อเสนอเป็นของผู้เขียน ไม่ใช่จุดยืนของศูนย์ฯ** เพราะงานกลุ่มนี้เสนอ
 * จุดยืนเชิงบรรทัดฐานที่ถกเถียงได้ ผู้อ่านต้องแยกออกว่ากำลังอ่านคำของใคร
 */
const KIND_COPY = {
  protocol: {
    th: {
      method: "จะทำอย่างไร",
      findings: "จะทำอะไร",
      soWhat: "ทำไมแผนนี้จึงสำคัญ",
      caveat: "ข้อควรรู้ก่อนนำไปอ้าง",
      noticeLabel: "ประกาศแผนวิจัย",
      notice:
        "งานชิ้นนี้เป็นการตีพิมพ์ **แผนการวิจัยก่อนเริ่มเก็บข้อมูล** วารสารตรวจวิธีการตั้งแต่ต้น เพื่อให้ผู้อ่านเทียบได้ภายหลังว่าสิ่งที่รายงานตรงกับที่ประกาศไว้หรือไม่ — **หน้านี้จึงยังไม่มีผลการศึกษา** มีเพียงคำถาม วิธีการ และสิ่งที่ทีมวิจัยตั้งใจจะทำ",
    },
    en: {
      method: "How it will be done",
      findings: "What the study will do",
      soWhat: "Why this plan matters",
      caveat: "What to know before citing this",
      noticeLabel: "Study protocol",
      notice:
        "This is a **research plan published before any data was collected**. The journal reviews the method up front so that what gets reported later can be checked against what was announced — so **there are no results on this page**, only the question, the method, and what the team intends to do.",
    },
  },
  argument: {
    th: {
      method: "ให้เหตุผลอย่างไร",
      findings: "เสนออะไร",
      soWhat: "ทำไมข้อเสนอนี้จึงสำคัญ",
      caveat: "ข้อควรรู้ก่อนนำไปอ้าง",
      noticeLabel: "บทความเชิงแนวคิด",
      notice:
        "งานชิ้นนี้เป็น **ข้อเสนอเชิงทฤษฎี ไม่ได้เก็บข้อมูลเชิงประจักษ์** สิ่งที่อ่านต่อไปนี้จึงเป็นการให้เหตุผลของผู้เขียน ไม่ใช่ผลการวัด — น้ำหนักของมันอยู่ที่ความสมเหตุสมผลของข้อโต้แย้ง ไม่ใช่ที่ขนาดตัวอย่างหรือค่าสถิติ · **ข้อเสนอเป็นของผู้เขียน ไม่ใช่จุดยืนของศูนย์ฯ**",
    },
    en: {
      method: "How the case is made",
      findings: "What it argues",
      soWhat: "Why the argument matters",
      caveat: "What to know before citing this",
      noticeLabel: "Conceptual article",
      notice:
        "This is a **theoretical argument, not an empirical study**. What follows is the author's reasoning rather than a measurement — its weight rests on whether the argument holds, not on a sample size or a statistic. **The position is the author's, not the centre's.**",
    },
  },
} as const;

export default function PaperSummaryBody({
  copy,
  locale,
  kind,
}: {
  copy: PaperCopy;
  locale: "th" | "en";
  kind?: "protocol" | "argument";
}) {
  const notice = kind ? KIND_COPY[kind][locale] : null;
  const t = { ...COPY[locale], ...(notice ?? {}) };

  return (
    <div className="mt-12 flex flex-col gap-10">
      {notice ? (
        /* ป้ายอยู่**เหนือ**เนื้อบทสรุป ไม่ใช่ท้ายหน้าแบบกล่องข้อจำกัด เพราะเป็น
           ข้อมูลที่เปลี่ยนวิธีอ่านทั้งหน้า ต้องเห็นก่อนอ่าน ไม่ใช่รู้ทีหลัง */
        <section className="rounded-lg border-l-4 border-l-pink-500 border-y border-r border-ink-300 bg-ink-0 p-6">
          <p className="text-[13px] font-medium leading-[1.4] tracking-[0.12em] text-pink-500">
            {notice.noticeLabel}
          </p>
          <p className="mt-2 text-[15px] leading-[1.6] text-ink-700">
            {withEmphasis(notice.notice)}
          </p>
        </section>
      ) : null}

      <section>
        <div className="flex items-start gap-3">
          <SectionIcon role="question" className="mt-0.5 h-7 w-7 shrink-0" />
          <h2 className="text-h3-m md:text-h3 text-ink-900">{t.question}</h2>
        </div>
        <p className="mt-3 text-[17px] leading-[1.7] text-ink-700">{withEmphasis(copy.question)}</p>
      </section>

      <section>
        <div className="flex items-start gap-3">
          <SectionIcon role="method" className="mt-0.5 h-7 w-7 shrink-0" />
          <h2 className="text-h3-m md:text-h3 text-ink-900">{t.method}</h2>
        </div>
        <p className="mt-3 text-[17px] leading-[1.7] text-ink-700">{withEmphasis(copy.method)}</p>
      </section>

      <section>
        <div className="flex items-start gap-3">
          <SectionIcon role="findings" className="mt-0.5 h-7 w-7 shrink-0" />
          <h2 className="text-h3-m md:text-h3 text-ink-900">{t.findings}</h2>
        </div>
        <ul className="mt-3 flex flex-col gap-3">
          {copy.findings.map((f) => (
            <li key={plainText(f)} className="flex gap-3 text-[17px] leading-[1.7] text-ink-700">
              <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-pink-500" />
              <span>{withEmphasis(f)}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="flex items-start gap-3">
          <SectionIcon role="soWhat" className="mt-0.5 h-7 w-7 shrink-0" />
          <h2 className="text-h3-m md:text-h3 text-ink-900">{t.soWhat}</h2>
        </div>
        <p className="mt-3 text-[17px] leading-[1.7] text-ink-700">{withEmphasis(copy.soWhat)}</p>
      </section>

      <section className="rounded-lg border border-ink-300 bg-ink-0 p-6">
        <div className="flex items-start gap-2.5">
          <SectionIcon role="caveat" className="h-5 w-5 shrink-0" />
          <h2 className="text-[15px] font-medium leading-[1.6] text-ink-900">{t.caveat}</h2>
        </div>
        <p className="mt-2 text-[15px] leading-[1.6] text-ink-700">{withEmphasis(copy.caveat)}</p>
      </section>
    </div>
  );
}
