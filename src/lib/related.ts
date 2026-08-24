/**
 * หาโครงการที่เกี่ยวข้องกัน เพื่อไม่ให้หน้ารายละเอียดเป็นทางตัน
 *
 * ให้คะแนนความใกล้เคียงจากสองอย่างที่มีข้อมูลจริงรองรับ:
 *   +3  ใช้บริการเดียวกัน (จาก projectSlugs ใน services.ts)
 *   +2  เป้าหมาย SDG หลักตรงกัน
 *   +1  เป้าหมาย SDG รองที่ซ้ำกันแต่ละข้อ
 *
 * ไม่ใช้การสุ่มหรือเรียงตามลำดับในไฟล์ — ถ้าคะแนนเท่ากันเรียงตามชื่อ slug
 * เพื่อให้ผลลัพธ์คงที่ทุกครั้งที่ build (กัน hydration mismatch)
 */
import { projects, type Project } from "@/data/projects";
import { services } from "@/data/services";

/** บริการที่โครงการหนึ่งๆ ถูกจัดอยู่ */
function servicesOf(slug: string): string[] {
  return services.filter((s) => s.projectSlugs.includes(slug)).map((s) => s.key);
}

export function relatedProjects(slug: string, limit = 3): Project[] {
  const current = projects.find((p) => p.slug === slug);
  if (!current) return [];

  const currentServices = new Set(servicesOf(slug));
  const currentPrimary = current.sdg[0];
  const currentGoals = new Set(current.sdg);

  return projects
    .filter((p) => p.slug !== slug)
    .map((p) => {
      let score = 0;
      for (const key of servicesOf(p.slug)) if (currentServices.has(key)) score += 3;
      if (p.sdg[0] === currentPrimary) score += 2;
      for (const goal of p.sdg) if (currentGoals.has(goal) && goal !== currentPrimary) score += 1;
      return { project: p, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.project.slug.localeCompare(b.project.slug))
    .slice(0, limit)
    .map((entry) => entry.project);
}

/** โครงการก่อนหน้า/ถัดไปตามลำดับในหน้า /impact — วนรอบเมื่อถึงหัวหรือท้ายรายการ */
export function projectNeighbours(slug: string): { prev: Project; next: Project } | null {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1 || projects.length < 2) return null;
  return {
    prev: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  };
}
