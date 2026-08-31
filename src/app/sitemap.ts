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
};

/** หน้าคงที่ — ทุกหน้ามีคู่อังกฤษที่ /en เสมอ ตามกติกา i18n ใน CLAUDE.md */
const staticEntries: Entry[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/expertise", changeFrequency: "monthly", priority: 0.8 },
  { path: "/impact", changeFrequency: "weekly", priority: 0.9 },
  { path: "/collaborate", changeFrequency: "monthly", priority: 0.9 },
  { path: "/news", changeFrequency: "weekly", priority: 0.8 },
  { path: "/research", changeFrequency: "monthly", priority: 0.8 },
  { path: "/sdg", changeFrequency: "monthly", priority: 0.8 },
  { path: "/media", changeFrequency: "weekly", priority: 0.8 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
];

/**
 * แปลง entry หนึ่งรายการเป็นสอง URL — ไทยกับอังกฤษ
 *
 * ทั้งคู่ประกาศ alternates ชุดเดียวกัน (th / en / x-default → ไทย)
 * ให้ตรงกับแท็ก hreflang ที่แต่ละหน้าใส่ไว้ใน <head> อยู่แล้ว
 * ถ้าสองที่ไม่ตรงกัน Google จะถือว่า cluster ภาษาไม่สมบูรณ์แล้วเมินทั้งชุด
 */
function bothLocales(e: Entry): MetadataRoute.Sitemap {
  const th = `${baseUrl}${e.path}`;
  const en = `${baseUrl}/en${e.path}`;
  const languages = { th, en, "x-default": th };
  const common = {
    lastModified: e.lastModified ?? new Date(),
    changeFrequency: e.changeFrequency,
    priority: e.priority,
    alternates: { languages },
  };
  return [
    { url: th, ...common },
    { url: en, ...common },
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
    ...paperSummaries.map(
      (s): Entry => ({
        path: `/research/${s.slug}`,
        changeFrequency: "yearly",
        priority: 0.7,
      }),
    ),
  ];

  return entries.flatMap(bothLocales);
}
