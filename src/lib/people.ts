/**
 * แปลง slug ผู้เขียนใน `publications.ts` เป็นชื่อคนที่ผู้อ่านเห็น
 *
 * ทำไมต้องมีไฟล์นี้ (8 ก.ย. 2569) — คนของศูนย์ฯ กระจายอยู่สามไฟล์
 * (`leadership.ts` · `researchers.ts` · `team.ts`) แต่เดิมมีเพียง `leadership.ts`
 * ที่มี field `slug` และทุกที่ที่ต้องแสดงชื่อผู้เขียนก็เขียนตัวค้นของตัวเองไว้
 * แยกกันสี่ชุด โดยทุกชุด**คืน slug ดิบเป็นค่าสำรองเมื่อหาไม่เจอ**
 *
 * ผลคือวันที่เพิ่มผู้เขียนคนใหม่เข้า `AUTHORS` ของ `scripts/fetch-publications.mjs`
 * หน้าเว็บจะพิมพ์ `phyu-hnin-hlaing` เป็นข้อความให้ผู้อ่านเห็น และ `schema.ts`
 * จะส่ง slug ดิบไปเป็นชื่อผู้เขียนใน JSON-LD ให้ Google ด้วย — TypeScript
 * ตรวจให้ไม่ได้เพราะทั้งคู่เป็น `string` ที่ถูกต้องตามชนิดทุกประการ
 *
 * ค่าสำรองยังคงเป็น slug อยู่ (ดีกว่าโยน error ตอน build) แต่ `check:content`
 * ดักไว้แล้วว่าห้ามมีชื่อผู้เขียนที่หน้าตาเหมือน slug หลุดขึ้นหน้าเว็บ
 */

import { leadership } from "@/data/leadership";
import { researchers } from "@/data/researchers";
import {
  affiliatedResearchers,
  designers,
  phdCandidates,
  postdocs,
  researchAssistants,
} from "@/data/team";

type Person = {
  slug?: string;
  name: string;
  nameEn: string;
  links?: { label: string; href: string }[];
};

/**
 * ทุกกลุ่มคนที่อาจเป็นผู้เขียนผลงาน เรียงตามลำดับที่ใช้ค้น
 * `leadership` มาก่อนเพราะเป็นชุดที่มี slug มาแต่เดิมและมีข้อมูลครบที่สุด
 */
const EVERYONE: Person[] = [
  ...leadership,
  ...researchers,
  ...postdocs,
  ...phdCandidates,
  ...affiliatedResearchers,
  ...researchAssistants,
  ...designers,
];

const bySlug = (slug: string) => EVERYONE.find((p) => p.slug === slug);

/** ชื่อเต็มพร้อมคำนำหน้าตำแหน่งวิชาการ — คืน slug เดิมถ้าไม่รู้จักคนนี้ */
export function personName(slug: string, locale: "th" | "en"): string {
  const person = bySlug(slug);
  if (!person) return slug;
  return locale === "th" ? person.name : person.nameEn;
}

/** ชื่อสั้นสำหรับ chip ตัวกรอง — ตัดคำนำหน้าตำแหน่งวิชาการออก */
export function personShortName(slug: string, locale: "th" | "en"): string {
  const person = bySlug(slug);
  if (!person) return slug;
  return locale === "th"
    ? person.name.replace(/^(รศ|ผศ|ศ)\.(ดร\.)?\s*/, "")
    : person.nameEn.replace(/^(Assoc\.|Asst\.)?\s*Prof\.\s*(Dr\.)?\s*/, "");
}

/**
 * ลิงก์โปรไฟล์ ORCID ของผู้เขียนคนแรกที่มี — ใช้เป็นที่มาของรายการที่ยังไม่มีดัชนีอิสระ
 */
export function personOrcidHref(slugs: string[]): string | null {
  for (const slug of slugs) {
    const orcid = bySlug(slug)?.links?.find((l) => l.label === "ORCID");
    if (orcid) return orcid.href;
  }
  return null;
}

/** slug ทุกตัวที่แปลงเป็นชื่อคนได้ — `check:content` ใช้เทียบ */
export const knownPersonSlugs = EVERYONE.flatMap((p) => (p.slug ? [p.slug] : []));
