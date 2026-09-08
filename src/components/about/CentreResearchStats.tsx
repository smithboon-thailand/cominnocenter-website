import Link from "next/link";
import Reveal from "@/components/effects/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import Stat from "@/components/ui/Stat";
import { stagger } from "@/components/effects/stagger";
import { centreSummary } from "@/data/researchMetrics";
import { publicationStats } from "@/data/publications";

/**
 * ตัวเลขระดับศูนย์ฯ จากฐานข้อมูล Scopus — บนหน้า /about ทั้งสองภาษา
 *
 * ─── ทำไมเลือกแสดงแบบนี้ (8 ก.ย. 2569) ─────────────────────────────────────
 *
 * **1. สัดส่วนคุณภาพวารสารเขียนเป็นประโยคพร้อมตัวหาร ไม่ใช่ตัวเลขใหญ่**
 * เลข 24 ที่ลอยอยู่เดี่ยวๆ ไม่มีความหมาย และการทำให้มันดูใหญ่โตคือการตัดตัวหารทิ้ง
 * ซึ่งเป็นสิ่งที่ README ของชุดข้อมูลห้ามไว้ตรงๆ — ผลงานทั้งหมดในฐาน Scopus มี 48 ชิ้น
 * แต่ตรวจ CiteScore ได้เพียง 32 ชิ้น เขียนได้ว่า "24 จาก 32 ผลงานที่ตรวจสอบได้"
 * **เขียนไม่ได้ว่า** "ผลงาน 75% ของศูนย์ฯ อยู่ใน Q1"
 * ตัวเลขใหญ่จึงสงวนไว้ให้ค่าที่สมบูรณ์ในตัวเอง ไม่ต้องพึ่งตัวหาร
 *
 * **2. ไม่แสดง 48 เป็นตัวเลขใหญ่ เพราะหน้า /research แสดง 87 อยู่แล้ว**
 * สองเลขนี้นับคนละขอบเขต — 87 คือผลงานทุกชิ้นที่เว็บยืนยันได้ ส่วน 48 คือเฉพาะ
 * ที่อยู่ในฐาน Scopus ผู้อ่านที่เปิดสองหน้าเทียบกันจะสะดุดทันทีถ้าไม่มีใครอธิบาย
 * จึงเขียนกำกับความต่างไว้ในหมายเหตุ และให้ตัวเลขใหญ่เป็นค่าที่ไม่ชนกัน
 *
 * **3. ไม่ใช้ FWCI** ตัดสินใจร่วมกับผู้ใช้แล้ว (ดู `researchMetrics.ts`)
 *
 * ทุกค่าอ่านจาก `centreSummary` ไม่พิมพ์ซ้ำในไฟล์นี้ — แก้ที่เดียวเมื่อถึงรอบอัปเดต
 */
export default function CentreResearchStats({ locale = "th" }: { locale?: "th" | "en" }) {
  const s = centreSummary;
  const asOf = new Date(s.asOf);
  const th = locale === "th";

  const asOfLabel = th
    ? asOf.toLocaleDateString("th-TH", { day: "numeric", month: "long", year: "numeric" })
    : asOf.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <section className="border-y border-ink-300 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeader
          locale={locale}
          icon="findings"
          eyebrow={th ? "งานวิจัยในฐานข้อมูลสากล" : "Research in international databases"}
          title={th ? "ผลงานของศูนย์ฯ ในฐาน Scopus" : "Our record in Scopus"}
          description={
            th
              ? "ภาพรวมคุณภาพของวารสารที่ศูนย์ฯ ตีพิมพ์ นับจากผลงานที่ปรากฏในฐานข้อมูล Scopus"
              : "How the journals we publish in rank in their fields, counted from the work indexed in Scopus."
          }
        />

        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-3 md:gap-10">
          <Reveal delay={stagger(0)}>
            <Stat
              value={s.totalCitations}
              unit={th ? "ครั้ง" : "citations"}
              label={th ? "การอ้างอิงรวมในฐาน Scopus" : "Total citations in Scopus"}
            />
          </Reveal>
          <Reveal delay={stagger(1)}>
            <Stat
              value={s.journalsWithCiteScore}
              unit={th ? "เล่ม" : "journals"}
              label={th ? "วารสารที่ตรวจ CiteScore ได้" : "Journals with a CiteScore"}
              delay={120}
            />
          </Reveal>
          <Reveal delay={stagger(2)}>
            <Stat
              value={`${s.firstYear}–${s.latestYear}`}
              label={th ? "ช่วงปีที่ตีพิมพ์" : "Publishing span"}
              animate={false}
            />
          </Reveal>
        </div>

        {/* สัดส่วนคุณภาพ — ตัวหารอยู่ในประโยคเสมอ ห้ามแยกตัวเลขออกมาลอยๆ */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
          <Reveal delay={stagger(3)}>
            <p className="text-[17px] leading-[1.7] text-ink-700">
              <span className="font-medium text-ink-900">
                {th
                  ? `${s.inTopQuartileJournals} จาก ${s.publicationsWithCiteScore} ผลงานที่ตรวจสอบได้`
                  : `${s.inTopQuartileJournals} of ${s.publicationsWithCiteScore} works we could check`}
              </span>{" "}
              {th
                ? "อยู่ในวารสารกลุ่มบนสุด 25% ของสาขาตัวเอง"
                : "appear in journals ranked in the top quarter of their field."}
            </p>
          </Reveal>
          <Reveal delay={stagger(4)}>
            <p className="text-[17px] leading-[1.7] text-ink-700">
              <span className="font-medium text-ink-900">
                {th
                  ? `${s.inOpenAccessJournals} จาก ${s.publicationsWithCiteScore} ผลงานที่ตรวจสอบได้`
                  : `${s.inOpenAccessJournals} of ${s.publicationsWithCiteScore} works we could check`}
              </span>{" "}
              {th
                ? "อยู่ในวารสารที่เปิดให้ผู้อ่านเข้าถึงได้เสรี ไม่ต้องเสียค่าสมาชิก"
                : "appear in open-access journals that any reader can open without a subscription."}
            </p>
          </Reveal>
        </div>

        {/* หมายเหตุขอบเขต — จำเป็น ไม่ใช่ส่วนเสริม เพราะตัวเลขสองหน้านับคนละขอบเขต */}
        <Reveal delay={stagger(5)}>
          <p className="mt-10 max-w-3xl text-[13px] leading-[1.7] text-ink-500">
            {th ? (
              <>
                ฐาน Scopus นับผลงานของศูนย์ฯ ได้ {s.scopusDocuments} ชิ้น ในจำนวนนี้ตรวจค่า
                CiteScore ได้ {s.publicationsWithCiteScore} ชิ้น ส่วนที่เหลืออยู่ในหนังสือและ
                วารสารภูมิภาคที่ยังไม่มีค่า CiteScore จึงไม่ได้นับรวมในสองประโยคข้างบน ·{" "}
                <Link
                  href="/research"
                  className="text-ink-700 underline underline-offset-2 transition-colors duration-150 ease-brand hover:text-pink-700 focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]"
                >
                  หน้าผลงานวิชาการ
                </Link>{" "}
                แสดงผลงานทั้งหมด {publicationStats.total} ชิ้น ซึ่งกว้างกว่าเพราะรวมงานที่ยืนยันได้
                จากทะเบียนอื่นนอกเหนือจาก Scopus · ตัวเลขชุดนี้นับจากนักวิจัยสายนิเทศศาสตร์ 6 ท่าน
                ของศูนย์ฯ ไม่รวมผลงานของ ศ.ดร.วธนน์ วิริยสิทธาวัฒน์ และ ศ.ดร.ลัญฉกร วุฒิสิทธิกุลกิจ
                ซึ่งอยู่คนละสาขา · ข้อมูลจาก Scopus CiteScore 2025 ตรวจเมื่อ {asOfLabel}
              </>
            ) : (
              <>
                Scopus indexes {s.scopusDocuments} of the centre&rsquo;s works, and{" "}
                {s.publicationsWithCiteScore} of those sit in journals with a CiteScore. The rest are
                books and regional journals that carry no CiteScore, so they are outside the two
                statements above ·{" "}
                <Link
                  href="/en/research"
                  className="text-ink-700 underline underline-offset-2 transition-colors duration-150 ease-brand hover:text-pink-700 focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]"
                >
                  Our publications page
                </Link>{" "}
                lists {publicationStats.total} works in total, a wider set because it also includes
                work verified through registries other than Scopus · These figures count the six
                communication researchers of the centre. They exclude Prof. Dr. Wattana
                Viriyasitavat and Prof. Dr. Lunchakorn Wuttisittikulkij, whose work belongs to
                different fields · Source: Scopus CiteScore 2025, checked {asOfLabel}
              </>
            )}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
