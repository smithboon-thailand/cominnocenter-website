/**
 * ชื่อและผลลัพธ์ของโครงการตามภาษาของหน้า — ที่เดียวที่รู้ว่าแต่ละภาษาเก็บไว้ที่ไหน
 *
 * ไทยอยู่ใน `projects.ts` (title · outcome) · อังกฤษอยู่ใน `projectCopyEn.ts`
 * (outcome · ชื่อยังอยู่ใน `titleEn` ของ projects.ts) · จีนอยู่ใน `projectCopyZh.ts`
 * ทั้งชื่อและเนื้อหา — component ที่แสดงการ์ดโครงการ (หน้าแรก · รายการ · โครงการ
 * ที่เกี่ยวข้อง · ตาราง SDG · ดัชนีค้นหา) เรียกสองฟังก์ชันนี้แทนการเขียน ternary
 * สามทางซ้ำกันทุกที่ ซึ่งเป็นวิธีที่ทำให้การ์ดอังกฤษเคยโชว์ผลลัพธ์ภาษาไทยมาแล้ว
 */
import type { Project } from "@/data/projects";
import { getLocalizedProjectCopy } from "@/data/projectCopyEn";
import { getProjectCopyZh } from "@/data/projectCopyZh";
import type { Locale } from "./locale";

export function projectTitle(project: Project, locale: Locale): string {
  if (locale === "th") return project.title;
  if (locale === "en") return project.titleEn;
  return getProjectCopyZh(project).title;
}

export function projectOutcome(project: Project, locale: Locale): string {
  if (locale === "th") return project.outcome;
  if (locale === "en") return getLocalizedProjectCopy(project).outcome;
  return getProjectCopyZh(project).outcome;
}
