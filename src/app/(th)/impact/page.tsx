import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ui/ProjectCard";
import SdgBadge from "@/components/ui/SdgBadge";
import SdgFilterChips from "@/components/ui/SdgFilterChips";
import Button from "@/components/ui/Button";
import ImpactExplorer, { type ImpactCardData } from "@/components/impact/ImpactExplorer";
import { projects, type Project } from "@/data/projects";
import { SDG_IDS, type SdgId } from "@/data/sdg";

export const metadata = {
  alternates: {
    canonical: "/impact",
    languages: { th: "/impact", en: "/en/impact", "x-default": "/impact" },
  },
  title: "ผลงานของเรา",
  description:
    "โครงการที่แปลงนวัตกรรมการสื่อสารให้เกิดผลจริงต่อคุณภาพชีวิตและความยั่งยืน จัดกลุ่มตามเป้าหมายการพัฒนาที่ยั่งยืน (SDG)",
};

export default function ImpactPage() {
  // ข้อมูลการ์ดสำหรับ filter ฝั่ง client (?sdg=N) — หน้าคง static, metadata อยู่ใน <head>
  const cards: ImpactCardData[] = projects.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.outcome,
    image: p.image,
    alt: p.alt,
    sdg: p.sdg,
  }));

  // ไม่มี filter: เรียงกลุ่มตาม SDG หลัก เลขน้อย → มาก (BRAND.md PART H)
  const groups: { id: SdgId; items: Project[] }[] = [];
  for (const id of SDG_IDS) {
    const items = projects.filter((p) => p.sdg[0] === id);
    if (items.length > 0) groups.push({ id, items });
  }

  const grouped = (
    <section className="mx-auto max-w-7xl space-y-16 px-6 pb-24">
      {groups.map((group) => (
        <div key={group.id}>
          <div className="mb-6 flex flex-wrap items-center gap-3 border-b border-ink-300 pb-4">
            <SdgBadge id={group.id} />
            <p className="text-[15px] leading-[1.6] text-ink-500">
              {group.items.length} โครงการ
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {group.items.map((p) => (
              <ProjectCard
                key={p.slug}
                href={`/impact/${p.slug}`}
                title={p.title}
                description={p.outcome}
                image={p.image}
                alt={p.alt}
                sdgIds={p.sdg}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );

  return (
    <div className="min-h-screen">
      <Header active="impact" />
      <main>

      <section className="mx-auto max-w-7xl px-6 pt-20 md:pt-28">
        <p className="mb-2 text-[13px] font-medium leading-[1.4] tracking-[0.12em] text-pink-500">
          ผลงาน
        </p>
        <h1 className="text-h1-m md:text-h1 text-ink-900">
          นวัตกรรมการสื่อสารที่เกิดผลจริง
        </h1>
        <p className="mt-4 max-w-prose text-[17px] leading-[1.7] text-ink-700">
          ทุกโครงการของเราเชื่อมโยงกับเป้าหมายการพัฒนาที่ยั่งยืน
          เลือกเป้าหมายเพื่อดูผลงานในเรื่องนั้น
        </p>
      </section>

      <Suspense
        fallback={
          <>
            <section className="mx-auto max-w-7xl px-6 pt-8 pb-8">
              <SdgFilterChips basePath="/impact" />
            </section>
            {grouped}
          </>
        }
      >
        <ImpactExplorer basePath="/impact" projects={cards}>
          {grouped}
        </ImpactExplorer>
      </Suspense>

      <section className="bg-ink-900">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <h2 className="text-h2-m md:text-h2 text-white">
            อยากสร้างผลลัพธ์แบบนี้กับเป้าหมายของคุณ
          </h2>
          <p className="mx-auto mt-3 max-w-prose text-[17px] leading-[1.7] text-ink-300">
            เล่าโจทย์ขององค์กรให้เราฟัง แล้วออกแบบการสื่อสารที่วัดผลได้ไปด้วยกัน
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/collaborate">ร่วมงานกับเรา</Button>
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
}
