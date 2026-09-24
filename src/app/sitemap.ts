import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { newsPosts } from "@/data/news";
import { paperSummaries } from "@/data/paperSummaries";

const baseUrl = "https://www.cominnocenter.com";

type Entry = {
  /** path ฝั่งไทย ขึ้นต้นด้วย "/" — หน้าแรกใช้ "" */
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
  lastModified?: Date;
  /**
   * มีหน้าภาษาจีนที่ /zh ด้วยหรือไม่ — ภาษาจีนมีเฉพาะหน้าหลักและหน้าโครงการ
   * (24 ก.ย. 2569) ข่าว สื่อ และบทสรุปงานวิจัยยังไม่มี ถ้าประกาศ URL จีนให้หน้า
   * ที่ไม่มีจริง sitemap จะชี้ไป 404 และ `check:routes` จะฟ้อง
   */
  zh?: boolean;
};

/** หน้าคงที่ — ทุกหน้ามีคู่อังกฤษที่ /en เสมอ ตามกติกา i18n ใน CLAUDE.md · จีนเฉพาะที่ระบุ */
const staticEntries: Entry[] = [
  { path: "", changeFrequency: "weekly", priority: 1, zh: true },
  { path: "/about", changeFrequency: "monthly", priority: 0.8, zh: true },
  { path: "/expertise", changeFrequency: "monthly", priority: 0.8, zh: true },
  { path: "/impact", changeFrequency: "weekly", priority: 0.9, zh: true },
  { path: "/collaborate", changeFrequency: "monthly", priority: 0.9, zh: true },
  { path: "/news", changeFrequency: "weekly", priority: 0.8 },
  { path: "/research", changeFrequency: "monthly", priority: 0.8, zh: true },
  { path: "/sdg", changeFrequency: "monthly", priority: 0.8, zh: true },
  { path: "/media", changeFrequency: "weekly", priority: 0.8 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3, zh: true },
];

/**
 * แปลง entry หนึ่งรายการเป็น URL ของทุกภาษาที่หน้านั้นมี — ไทย อังกฤษ และจีนถ้ามี
 *
 * ทุก URL ในกลุ่มประกาศ alternates ชุดเดียวกัน (th / en / zh-Hans / x-default → ไทย)
 * ให้ตรงกับแท็ก hreflang ที่แต่ละหน้าใส่ไว้ใน <head> อยู่แล้ว
 * ถ้าสองที่ไม่ตรงกัน Google จะถือว่า cluster ภาษาไม่สมบูรณ์แล้วเมินทั้งชุด
 * — หน้าที่ไม่มีฉบับจีนต้องไม่ประกาศ zh-Hans ทั้งใน <head> และที่นี่
 */
function allLocales(e: Entry): MetadataRoute.Sitemap {
  const th = `${baseUrl}${e.path}`;
  const en = `${baseUrl}/en${e.path}`;
  const zh = `${baseUrl}/zh${e.path}`;
  const languages = e.zh ? { th, en, "zh-Hans": zh, "x-default": th } : { th, en, "x-default": th };
  const common = {
    lastModified: e.lastModified ?? new Date(),
    changeFrequency: e.changeFrequency,
    priority: e.priority,
    alternates: { languages },
  };
  return [
    { url: th, ...common },
    { url: en, ...common },
    ...(e.zh ? [{ url: zh, ...common }] : []),
  ];
}

/**
 * sitemap ทั้งเว็บ — สร้างจาก data file ตรงๆ ไม่มีรายการที่พิมพ์มือ
 *
 * เดิมไฟล์นี้ลิสต์เฉพาะ path ฝั่งไทย หน้าอังกฤษทั้ง 51 หน้าจึงหายไปจาก
 * sitemap ทั้งหมดตั้งแต่เปิดเว็บ ทั้งที่ทุกหน้ามีอยู่จริงและมี hreflang ครบ
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: Entry[] = [
    ...staticEntries,
    ...projects.map(
      (p): Entry => ({
        path: `/impact/${p.slug}`,
        changeFrequency: "monthly",
        priority: 0.7,
        zh: true,
      }),
    ),
    ...newsPosts.map(
      (p): Entry => ({
        path: `/news/${p.slug}`,
        changeFrequency: "yearly",
        priority: 0.6,
        lastModified: new Date(p.date),
      }),
    ),
    // หน้าบทสรุปงานวิจัย — ให้ priority สูงกว่าข่าวเพราะเป็นเนื้อหาต้นฉบับที่เราเขียนเอง
    // และเป็นสิ่งที่คนค้นหางานวิชาการของศูนย์ฯ ควรเจอ
    // ฉบับจีนมีเฉพาะบทสรุปที่แปลแล้ว (field zh) — ประกาศ zh-Hans ให้เฉพาะรายการนั้น
    ...paperSummaries.map(
      (s): Entry => ({
        path: `/research/${s.slug}`,
        changeFrequency: "yearly",
        priority: 0.7,
        zh: Boolean(s.zh),
      }),
    ),
  ];

  return entries.flatMap(allLocales);
}
