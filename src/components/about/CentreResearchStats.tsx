import Link from "next/link";
import Reveal from "@/components/effects/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import Stat from "@/components/ui/Stat";
import { stagger } from "@/components/effects/stagger";
import { centreSummary } from "@/data/researchMetrics";
import { publicationStats } from "@/data/publications";
import { localePath, type Locale } from "@/lib/locale";

/**
 * ตัวเลขระดับศูนย์ฯ จากฐานข้อมูล Scopus — บนหน้า /about ทุกภาษา
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
 *
 * ข้อความสามภาษาเก็บเป็นชุดต่อภาษา (24 ก.ย. 2569) แทน ternary ไทย/อังกฤษ
 * เพราะภาษาที่สามทำให้ ternary อ่านไม่ออกและตกหล่นง่าย — ชื่อผู้วิจัยสองท่านที่ถูก
 * ยกเว้นใช้ชื่ออังกฤษในหน้าจีน (ชื่อเฉพาะ ตาม BRAND.md PART C)
 */
const COPY = {
  th: {
    eyebrow: "งานวิจัยในฐานข้อมูลสากล",
    title: "ผลงานของศูนย์ฯ ในฐาน Scopus",
    description:
      "ภาพรวมคุณภาพของวารสารที่ศูนย์ฯ ตีพิมพ์ นับจากผลงานที่ปรากฏในฐานข้อมูล Scopus",
    citationsUnit: "ครั้ง",
    citationsLabel: "การอ้างอิงรวมในฐาน Scopus",
    journalsUnit: "เล่ม",
    journalsLabel: "วารสารที่ตรวจ CiteScore ได้",
    spanLabel: "ช่วงปีที่ตีพิมพ์",
    checked: (n: number, of: number) => `${n} จาก ${of} ผลงานที่ตรวจสอบได้`,
    topQuartile: "อยู่ในวารสารกลุ่มบนสุด 25% ของสาขาตัวเอง",
    openAccess: "อยู่ในวารสารที่เปิดให้ผู้อ่านเข้าถึงได้เสรี ไม่ต้องเสียค่าสมาชิก",
    noteBefore: (docs: number, withScore: number) =>
      `ฐาน Scopus นับผลงานของศูนย์ฯ ได้ ${docs} ชิ้น ในจำนวนนี้ตรวจค่า CiteScore ได้ ${withScore} ชิ้น ส่วนที่เหลืออยู่ในหนังสือและวารสารภูมิภาคที่ยังไม่มีค่า CiteScore จึงไม่ได้นับรวมในสองประโยคข้างบน · `,
    researchLink: "หน้าผลงานวิชาการ",
    noteAfter: (total: number, asOf: string) =>
      ` แสดงผลงานทั้งหมด ${total} ชิ้น ซึ่งกว้างกว่าเพราะรวมงานที่ยืนยันได้จากทะเบียนอื่นนอกเหนือจาก Scopus · ตัวเลขชุดนี้นับจากนักวิจัยสายนิเทศศาสตร์ 6 ท่านของศูนย์ฯ ไม่รวมผลงานของ ศ.ดร.วธนน์ วิริยสิทธาวัฒน์ และ ศ.ดร.ลัญฉกร วุฒิสิทธิกุลกิจ ซึ่งอยู่คนละสาขา · ข้อมูลจาก Scopus CiteScore 2025 ตรวจเมื่อ ${asOf}`,
    dateLocale: "th-TH",
  },
  en: {
    eyebrow: "Research in international databases",
    title: "Our record in Scopus",
    description:
      "How the journals we publish in rank in their fields, counted from the work indexed in Scopus.",
    citationsUnit: "citations",
    citationsLabel: "Total citations in Scopus",
    journalsUnit: "journals",
    journalsLabel: "Journals with a CiteScore",
    spanLabel: "Publishing span",
    checked: (n: number, of: number) => `${n} of ${of} works we could check`,
    topQuartile: "appear in journals ranked in the top quarter of their field.",
    openAccess: "appear in open-access journals that any reader can open without a subscription.",
    noteBefore: (docs: number, withScore: number) =>
      `Scopus indexes ${docs} of the centre’s works, and ${withScore} of those sit in journals with a CiteScore. The rest are books and regional journals that carry no CiteScore, so they are outside the two statements above · `,
    researchLink: "Our publications page",
    noteAfter: (total: number, asOf: string) =>
      ` lists ${total} works in total, a wider set because it also includes work verified through registries other than Scopus · These figures count the six communication researchers of the centre. They exclude Prof. Dr. Wattana Viriyasitavat and Prof. Dr. Lunchakorn Wuttisittikulkij, whose work belongs to different fields · Source: Scopus CiteScore 2025, checked ${asOf}`,
    dateLocale: "en-GB",
  },
  zh: {
    eyebrow: "国际数据库中的研究",
    title: "中心在 Scopus 中的成果",
    description: "以 Scopus 数据库收录的成果为基础，概览中心发表期刊在各自领域中的水平",
    citationsUnit: "次",
    citationsLabel: "Scopus 中的总被引次数",
    journalsUnit: "种",
    journalsLabel: "可查到 CiteScore 的期刊",
    spanLabel: "发表年份跨度",
    checked: (n: number, of: number) => `在可核查的 ${of} 项成果中，有 ${n} 项`,
    topQuartile: "发表于所在领域排名前 25% 的期刊。",
    openAccess: "发表于任何读者无需订阅即可打开的开放获取期刊。",
    noteBefore: (docs: number, withScore: number) =>
      `Scopus 收录了中心的 ${docs} 项成果，其中 ${withScore} 项发表于有 CiteScore 的期刊；其余为尚无 CiteScore 的书籍与区域性期刊，因此不计入上述两句的统计 · `,
    researchLink: "研究成果页",
    noteAfter: (total: number, asOf: string) =>
      ` 列出全部 ${total} 项成果，范围更广，因为它还包含通过 Scopus 以外的登记机构核实的成果 · 以上数字统计中心六位传播学研究人员，不包括属于其他学科的 Wattana Viriyasitavat 教授与 Lunchakorn Wuttisittikulkij 教授 · 数据来源：Scopus CiteScore 2025，核查日期 ${asOf}`,
    dateLocale: "zh-CN",
  },
} as const;

export default function CentreResearchStats({ locale = "th" }: { locale?: Locale }) {
  const s = centreSummary;
  const t = COPY[locale];
  const asOfLabel = new Date(s.asOf).toLocaleDateString(t.dateLocale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="border-y border-ink-300 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeader
          locale={locale}
          icon="findings"
          eyebrow={t.eyebrow}
          title={t.title}
          description={t.description}
        />

        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-3 md:gap-10">
          <Reveal delay={stagger(0)}>
            <Stat value={s.totalCitations} unit={t.citationsUnit} label={t.citationsLabel} />
          </Reveal>
          <Reveal delay={stagger(1)}>
            <Stat
              value={s.journalsWithCiteScore}
              unit={t.journalsUnit}
              label={t.journalsLabel}
              delay={120}
            />
          </Reveal>
          <Reveal delay={stagger(2)}>
            <Stat value={`${s.firstYear}–${s.latestYear}`} label={t.spanLabel} animate={false} />
          </Reveal>
        </div>

        {/* สัดส่วนคุณภาพ — ตัวหารอยู่ในประโยคเสมอ ห้ามแยกตัวเลขออกมาลอยๆ */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
          <Reveal delay={stagger(3)}>
            <p className="text-[17px] leading-[1.7] text-ink-700">
              <span className="font-medium text-ink-900">
                {t.checked(s.inTopQuartileJournals, s.publicationsWithCiteScore)}
              </span>{" "}
              {t.topQuartile}
            </p>
          </Reveal>
          <Reveal delay={stagger(4)}>
            <p className="text-[17px] leading-[1.7] text-ink-700">
              <span className="font-medium text-ink-900">
                {t.checked(s.inOpenAccessJournals, s.publicationsWithCiteScore)}
              </span>{" "}
              {t.openAccess}
            </p>
          </Reveal>
        </div>

        {/* หมายเหตุขอบเขต — จำเป็น ไม่ใช่ส่วนเสริม เพราะตัวเลขสองหน้านับคนละขอบเขต */}
        <Reveal delay={stagger(5)}>
          <p className="mt-10 max-w-3xl text-[13px] leading-[1.7] text-ink-500">
            {t.noteBefore(s.scopusDocuments, s.publicationsWithCiteScore)}
            <Link
              href={localePath(locale, "/research")}
              className="text-ink-700 underline underline-offset-2 transition-colors duration-150 ease-brand hover:text-pink-700 focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]"
            >
              {t.researchLink}
            </Link>
            {t.noteAfter(publicationStats.total, asOfLabel)}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
