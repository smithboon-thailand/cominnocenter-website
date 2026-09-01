/**
 * ดัชนีค้นหาทั้งเว็บ — สร้างจากไฟล์ข้อมูลตอน build ไม่มี backend ไม่มี library
 *
 * รวมทุกอย่างที่ผู้ใช้น่าจะค้น: โครงการ · ข่าว · สื่อถึงเรา · บริการ · ผลงานวิชาการ ·
 * เป้าหมาย SDG · และหน้าหลัก
 *
 * ค่า keywords เก็บคำที่ควรค้นเจอแต่ไม่ได้แสดงบนการ์ดผลลัพธ์ (เช่นชื่ออีกภาษา ชื่อวารสาร)
 */
import { projects } from "@/data/projects";
import { getLocalizedProjectCopy } from "@/data/projectCopyEn";
import { newsPosts } from "@/data/news";
import { mediaSorted } from "@/data/media";
import { services } from "@/data/services";
import { publications } from "@/data/publications";
import { summaryForPublication } from "@/data/paperSummaries";
import { SDG, SDG_IDS } from "@/data/sdg";

export type SearchKind = "project" | "news" | "media" | "service" | "publication" | "sdg" | "page";

export type SearchDoc = {
  kind: SearchKind;
  title: string;
  /** บรรทัดรองใต้ชื่อในผลลัพธ์ */
  meta: string;
  href: string;
  /** ลิงก์ออกนอกเว็บ (สื่อถึงเรา/ผลงานวิชาการบางรายการ) */
  external?: boolean;
  keywords: string;
};

const PAGES = {
  th: [
    { title: "หน้าแรก", meta: "ภาพรวมของศูนย์ฯ", href: "/" },
    { title: "เกี่ยวกับเรา", meta: "พันธกิจ ผู้บริหาร นักวิจัย พันธมิตร", href: "/about" },
    { title: "ความเชี่ยวชาญ", meta: "บริการทั้ง 9 ด้าน", href: "/expertise" },
    { title: "ผลงาน", meta: "โครงการทั้งหมด", href: "/impact" },
    { title: "งานวิจัย", meta: "ผลงานตีพิมพ์", href: "/research" },
    { title: "SDG", meta: "เป้าหมายการพัฒนาที่ยั่งยืน", href: "/sdg" },
    { title: "สื่อถึงเรา", meta: "ศูนย์ฯ บนสื่อภายนอก", href: "/media" },
    { title: "ข่าวและกิจกรรม", meta: "ข่าวของศูนย์ฯ", href: "/news" },
    { title: "ร่วมงานกับเรา", meta: "ติดต่อและความร่วมมือ", href: "/collaborate" },
  ],
  en: [
    { title: "Home", meta: "Center overview", href: "/en" },
    { title: "About", meta: "Mission, leadership, researchers, partners", href: "/en/about" },
    { title: "Expertise", meta: "Nine services", href: "/en/expertise" },
    { title: "Impact", meta: "All projects", href: "/en/impact" },
    { title: "Research", meta: "Publications", href: "/en/research" },
    { title: "SDG", meta: "Sustainable Development Goals", href: "/en/sdg" },
    { title: "Media", meta: "The center in the press", href: "/en/media" },
    { title: "News & events", meta: "Center news", href: "/en/news" },
    { title: "Collaborate", meta: "Contact and partnership", href: "/en/collaborate" },
  ],
} as const;

const LABEL = {
  th: {
    project: "โครงการ",
    news: "ข่าว",
    media: "สื่อถึงเรา",
    service: "บริการ",
    publication: "ผลงานวิชาการ",
    sdg: "เป้าหมาย SDG",
    page: "หน้า",
  },
  en: {
    project: "Project",
    news: "News",
    media: "Media",
    service: "Service",
    publication: "Publication",
    sdg: "SDG goal",
    page: "Page",
  },
} as const;

export const KIND_LABEL = LABEL;

export function buildSearchIndex(locale: "th" | "en"): SearchDoc[] {
  const th = locale === "th";
  const base = th ? "" : "/en";
  const docs: SearchDoc[] = [];

  for (const page of PAGES[locale]) {
    docs.push({ kind: "page", title: page.title, meta: page.meta, href: page.href, keywords: "" });
  }

  for (const p of projects) {
    docs.push({
      kind: "project",
      title: th ? p.title : p.titleEn,
      meta: th ? p.outcome : getLocalizedProjectCopy(p).outcome,
      href: `${base}/impact/${p.slug}`,
      keywords: `${p.title} ${p.titleEn} ${p.sdg.map((id) => `sdg${id} ${SDG[id].th} ${SDG[id].en}`).join(" ")}`,
    });
  }

  for (const post of newsPosts) {
    docs.push({
      kind: "news",
      title: th ? post.titleTh : post.titleEn,
      meta: post.date,
      href: `${base}/news/${post.slug}`,
      keywords: `${post.titleTh} ${post.titleEn}`,
    });
  }

  for (const item of mediaSorted) {
    docs.push({
      kind: "media",
      title: th ? item.nameTh : item.nameEn,
      meta: th ? item.source : item.sourceEn || item.source,
      href: item.url,
      external: true,
      keywords: `${item.nameTh} ${item.nameEn} ${item.professors.join(" ")} ${item.source} ${item.sourceEn || ""} ${item.type}`,
    });
  }

  for (const s of services) {
    docs.push({
      kind: "service",
      title: th ? s.titleTh : s.title,
      meta: th ? s.descTh : s.descEn,
      href: `${base}/expertise`,
      keywords: `${s.titleTh} ${s.title}`,
    });
  }

  for (const pub of publications) {
    /**
     * งานที่มีหน้าบทสรุปของเราเอง ให้ผลค้นหาพาไปหน้านั้นแทนที่จะเด้งออกไป DOI
     * — ผู้ใช้ที่ค้นในเว็บเรามักอยากรู้ว่า "งานนี้พูดว่าอะไร" ไม่ใช่อยากได้ไฟล์วารสาร
     * และหน้าบทสรุปก็มีลิงก์ DOI ให้อยู่แล้วสำหรับคนที่ต้องการต้นฉบับ
     */
    const summary = summaryForPublication(pub);
    const headline = summary ? summary[locale].headline : "";
    docs.push({
      kind: "publication",
      title: pub.title,
      meta: `${pub.venue}${pub.venue ? " · " : ""}${pub.year}`,
      href: summary
        ? `${base}/research/${summary.slug}`
        : pub.doi
          ? `https://doi.org/${pub.doi}`
          : pub.indexUrl || `${base}/research`,
      external: !summary && Boolean(pub.doi || pub.indexUrl),
      // ใส่พาดหัวภาษาง่ายเป็นคำค้นด้วย ผู้ใช้ที่ค้นด้วยคำชาวบ้านจึงเจองานวิชาการได้
      keywords: `${pub.venue} ${pub.year} ${headline}`.trim(),
    });
  }

  for (const id of SDG_IDS) {
    docs.push({
      kind: "sdg",
      title: `${id} ${SDG[id][locale]}`,
      meta: th ? "ดูผลงานในเป้าหมายนี้" : "See work under this goal",
      href: `${base}/impact?sdg=${id}`,
      keywords: `sdg${id} ${SDG[id].th} ${SDG[id].en}`,
    });
  }

  return docs;
}
