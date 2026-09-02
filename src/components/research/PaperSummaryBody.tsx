/**
 * เนื้อบทสรุปงานวิจัยหนึ่งชิ้น — ใช้ร่วมกันทั้งหน้าไทยและหน้าอังกฤษ
 *
 * แยกออกมาเป็น component เพราะโครงของบทสรุปต้องเหมือนกันทั้งสองภาษาเป๊ะๆ
 * (ถามอะไร → ทำอย่างไร → พบอะไร → แล้วยังไงต่อ → ข้อจำกัด) ถ้าเขียนซ้ำสองที่
 * วันหนึ่งจะมีภาษาหนึ่งได้หัวข้อใหม่แล้วอีกภาษาไม่ได้ ซึ่งเป็นปัญหาเดิมที่
 * โปรเจ็คนี้เจอมาแล้วกับการ์ดโครงการที่ฝั่ง EN โชว์ผลลัพธ์เป็นภาษาไทย
 *
 * งานที่เป็น **ประกาศแผนวิจัย** (`kind="protocol"`) ใช้โครงเดียวกันแต่เปลี่ยนชื่อ
 * หัวข้อเป็น "จะทำอะไร / จะทำอย่างไร" และขึ้นป้ายบอกไว้ก่อนเนื้อหา — ดู `PROTOCOL_COPY`
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
 * หัวข้อชุดของ **ประกาศแผนวิจัย (study protocol)** — งานที่วารสารตรวจและตีพิมพ์
 * *แผน* ก่อนเริ่มเก็บข้อมูล
 *
 * ต้องเปลี่ยนหัวข้อ ไม่ใช่ใช้ชุดเดิม เพราะหัวข้อ "พบอะไร" เติมอย่างซื่อสัตย์ไม่ได้
 * เลยกับงานที่ยังไม่มีผล — ตัวบทความเองเขียนว่า "Since this is a study protocol,
 * precise findings are not yet available" ถ้าคงหัวข้อเดิมไว้ ผู้อ่านที่กวาดสายตา
 * ผ่านหน้ารายการบทสรุปจะเข้าใจว่ามีผลแล้ว ซึ่งเป็นการอ้างเกินกว่าที่งานรองรับ
 * (เคยตัดงานสองชิ้นนี้ทิ้งด้วยเหตุผลนี้ใน PR #31 · ผู้ใช้ทักเมื่อ 2 ก.ย. 2569 ว่า
 * แผนวิจัยก็ควรมีหน้าของตัวเอง เพียงแต่ต้องเรียกให้ตรงกับสิ่งที่มันเป็น)
 */
const PROTOCOL_COPY = {
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
} as const;

export default function PaperSummaryBody({
  copy,
  locale,
  kind,
}: {
  copy: PaperCopy;
  locale: "th" | "en";
  kind?: "protocol";
}) {
  const protocol = kind === "protocol" ? PROTOCOL_COPY[locale] : null;
  const t = { ...COPY[locale], ...(protocol ?? {}) };

  return (
    <div className="mt-12 flex flex-col gap-10">
      {protocol ? (
        /* ป้ายอยู่**เหนือ**เนื้อบทสรุป ไม่ใช่ท้ายหน้าแบบกล่องข้อจำกัด เพราะเป็น
           ข้อมูลที่เปลี่ยนวิธีอ่านทั้งหน้า ต้องเห็นก่อนอ่าน ไม่ใช่รู้ทีหลัง */
        <section className="rounded-lg border-l-4 border-l-pink-500 border-y border-r border-ink-300 bg-ink-0 p-6">
          <p className="text-[13px] font-medium leading-[1.4] tracking-[0.12em] text-pink-500">
            {protocol.noticeLabel}
          </p>
          <p className="mt-2 text-[15px] leading-[1.6] text-ink-700">
            {withEmphasis(protocol.notice)}
          </p>
        </section>
      ) : null}

      <section>
        <h2 className="text-h3-m md:text-h3 text-ink-900">{t.question}</h2>
        <p className="mt-3 text-[17px] leading-[1.7] text-ink-700">{withEmphasis(copy.question)}</p>
      </section>

      <section>
        <h2 className="text-h3-m md:text-h3 text-ink-900">{t.method}</h2>
        <p className="mt-3 text-[17px] leading-[1.7] text-ink-700">{withEmphasis(copy.method)}</p>
      </section>

      <section>
        <h2 className="text-h3-m md:text-h3 text-ink-900">{t.findings}</h2>
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
        <h2 className="text-h3-m md:text-h3 text-ink-900">{t.soWhat}</h2>
        <p className="mt-3 text-[17px] leading-[1.7] text-ink-700">{withEmphasis(copy.soWhat)}</p>
      </section>

      <section className="rounded-lg border border-ink-300 bg-ink-0 p-6">
        <h2 className="text-[15px] font-medium leading-[1.6] text-ink-900">{t.caveat}</h2>
        <p className="mt-2 text-[15px] leading-[1.6] text-ink-700">{withEmphasis(copy.caveat)}</p>
      </section>
    </div>
  );
}
