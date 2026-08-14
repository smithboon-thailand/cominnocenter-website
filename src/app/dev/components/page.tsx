import SdgBadge from "@/components/ui/SdgBadge";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import Stat from "@/components/ui/Stat";
import ProjectCard from "@/components/ui/ProjectCard";
import { SDG_IDS, SDG_WHITE_TEXT_OK } from "@/data/sdg";

export const metadata = {
  title: "Dev — Components",
  robots: { index: false, follow: false },
};

/** ข้อความไทยที่วรรณยุกต์/สระซ้อนเยอะ ไว้เช็คความชัดของ Kanit น้ำหนักเบา */
const THAI_SAMPLE = "นวัตกรรมการสื่อสารเพื่อคุณภาพชีวิตที่ดีขึ้น ทั้งผู้คน ป่าเขา น้ำใส และวิถีชีวิตที่ยั่งยืน";

/** แถบเทียบ type scale ตาม BRAND.md PART C */
function TypeScaleStrip({ dark = false }: { dark?: boolean }) {
  const heading = dark ? "text-ink-0" : "text-ink-900";
  const body = dark ? "text-ink-100" : "text-ink-700";
  const muted = dark ? "text-ink-300" : "text-ink-500";
  return (
    <div className={`space-y-6 rounded-lg p-8 ${dark ? "bg-ink-900" : "border border-ink-300 bg-white"}`}>
      <p className={`text-[13px] font-medium tracking-[0.12em] ${muted}`}>
        {dark ? "บนพื้น ink-900" : "บนพื้นขาว"}
      </p>
      <p className={`text-[34px] font-light leading-[1.2] md:text-[56px] md:leading-[1.15] ${heading}`}>
        display 56/300 — {THAI_SAMPLE}
      </p>
      <p className={`text-[28px] font-light leading-[1.25] md:text-[40px] md:leading-[1.2] ${heading}`}>
        h1 40/300 — {THAI_SAMPLE}
      </p>
      <p className={`text-2xl font-medium leading-[1.3] md:text-[28px] ${heading}`}>
        h2 28/500 — {THAI_SAMPLE}
      </p>
      <p className={`text-lg font-medium leading-[1.4] md:text-xl ${heading}`}>
        h3 20/500 — {THAI_SAMPLE}
      </p>
      <p className={`max-w-prose text-[17px] leading-[1.7] ${body}`}>
        body 17/400 — {THAI_SAMPLE} ข้อความยาวคุมความกว้างไม่เกิน 65ch
        เพื่อให้อ่านสบายตามข้อกำหนดของฟอนต์ Kanit ที่ค่อนข้างแน่น
      </p>
      <p className={`text-[15px] leading-[1.6] ${muted}`}>small 15/400 — {THAI_SAMPLE}</p>
      <p className={`text-[13px] font-medium leading-[1.4] tracking-[0.12em] text-pink-500`}>
        EYEBROW 13/500 · ป้ายกำกับภาษาไทยใช้ tracking แต่ไม่แปลงตัวพิมพ์
      </p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-6">
      <h2 className="border-b border-ink-300 pb-2 text-2xl font-medium text-ink-900">{title}</h2>
      {children}
    </section>
  );
}

export default function DevComponentsPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-16 px-6 py-16">
      <header className="space-y-2">
        <h1 className="text-[40px] font-light leading-[1.2] text-ink-900">Design System — Phase 1</h1>
        <p className="max-w-prose text-[17px] leading-[1.7] text-ink-700">
          หน้าตรวจ component ตาม BRAND.md (ลบทิ้งใน Phase 4) — ทุกส่วนใช้ token จาก globals.css
          และฟอนต์ Kanit 300/400/500
        </p>
      </header>

      <Section title="Typography — เช็ควรรณยุกต์ไทยบน Kanit น้ำหนักเบา">
        <div className="space-y-6">
          <TypeScaleStrip />
          <TypeScaleStrip dark />
        </div>
      </Section>

      <Section title="Button — 3 variants (สูง 44px · focus ring pink-100 — กด Tab ดู)">
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary">ร่วมงานกับเรา</Button>
          <Button variant="secondary">ดูผลงานทั้งหมด</Button>
          <Button variant="ghost">อ่านเพิ่มเติม</Button>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary" disabled>
            ปุ่มถูกปิดใช้งาน
          </Button>
          <Button variant="secondary" disabled>
            ปุ่มถูกปิดใช้งาน
          </Button>
          <Button variant="ghost" disabled>
            ปุ่มถูกปิดใช้งาน
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary" href="/impact">
            ลิงก์หน้าตาปุ่ม (View our work)
          </Button>
        </div>
      </Section>

      <Section title="SDG Badge — ครบ 17 เป้าหมาย (variant เต็ม)">
        <div className="flex flex-wrap gap-2">
          {SDG_IDS.map((id) => (
            <SdgBadge key={id} id={id} />
          ))}
        </div>
        <h3 className="pt-2 text-xl font-medium text-ink-900">variant ย่อ [● n]</h3>
        <div className="flex flex-wrap gap-2">
          {SDG_IDS.map((id) => (
            <SdgBadge key={id} id={id} variant="compact" />
          ))}
        </div>
        <h3 className="pt-2 text-xl font-medium text-ink-900">locale=&quot;en&quot;</h3>
        <div className="flex flex-wrap gap-2">
          <SdgBadge id={3} locale="en" />
          <SdgBadge id={12} locale="en" />
          <SdgBadge id={17} locale="en" />
        </div>
        <p className="max-w-prose text-[15px] leading-[1.6] text-ink-500">
          หมายเหตุ B3: ตัวอักษรขาวบนพื้น pure ใช้ได้เฉพาะ SDG {SDG_WHITE_TEXT_OK.join(", ")} ·
          ทุก badge มีเลขกำกับและ aria-label เต็มเสมอ
        </p>
      </Section>

      <Section title="Section Header — G4">
        <div className="space-y-10">
          <SectionHeader
            eyebrow="ผลงานของเรา"
            title="นวัตกรรมการสื่อสารที่ใช้ได้จริง"
            description="ตัวอย่างโครงการที่แปลงงานวิจัยด้านการสื่อสารให้เป็นเครื่องมือที่เปลี่ยนคุณภาพชีวิตของผู้คน โดยทุกโครงการเชื่อมโยงกับเป้าหมายการพัฒนาที่ยั่งยืน"
          />
          <SectionHeader
            locale="en"
            eyebrow="Our impact"
            title="Communication innovation that works"
            description="Selected projects that turn communication research into practical tools, each aligned with the Sustainable Development Goals."
          />
        </div>
      </Section>

      <Section title="Stat — G5 (ตัวเลขไม่แต่งสี)">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <Stat value="18" unit="โครงการ" label="ผลงานที่ส่งมอบแล้ว" />
          <Stat value="10,000" unit="คน" label="บุคลากรที่ผ่านการอบรม Care D+" />
          <Stat value="17" unit="เป้าหมาย" label="SDG ที่งานของเราเชื่อมโยง" />
          <Stat value="263" label="Citations (Google Scholar)" />
        </div>
      </Section>

      <Section title="Project Card — G3 (hover: ยกขึ้น + border สี SDG)">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ProjectCard
            href="/impact/chula-zero-waste"
            title="Chula Zero Waste"
            description="ต้นแบบแคมเปญลดขยะในมหาวิทยาลัยที่นำโดยนิสิต เน้นความสนุก เรียบง่าย และปฏิบัติได้จริง"
            image="/images/projects/chula-zero-waste/25218b_f9cc2a2218e0428bb5d13c02be940a08.webp"
            alt="กิจกรรมรณรงค์ลดขยะของ Chula Zero Waste"
            sdgIds={[12, 11, 13]}
          />
          <ProjectCard
            href="/impact/care-d-plus"
            title="Care D Plus"
            description="อบรมบุคลากรสาธารณสุขทั่วประเทศกว่า 10,000 คน ด้านการสื่อสารด้วยความเข้าใจและเห็นอกเห็นใจ"
            image="/images/projects/care-d-plus/25218b_15f26985a12f4630aea67894555bde05.webp"
            alt="การอบรมทักษะการสื่อสารของบุคลากรสาธารณสุขในโครงการ Care D Plus"
            sdgIds={[3]}
          />
          <ProjectCard
            href="/impact/nia-100-faces"
            title="NIA 100 FACES"
            description="รวบรวมนวัตกร 100 คนผู้สร้างแรงบันดาลใจ นำเสนอผ่านเว็บไซต์ หนังสือ และภาพ AR"
            image="/images/projects/nia-100-faces/25218b_4caad4d894fc4108b321da6753a27a44.webp"
            alt="ภาพชุดนวัตกร 100 คนจากโครงการ NIA 100 FACES"
            sdgIds={[9, 17]}
            locale="en"
          />
        </div>
      </Section>
    </main>
  );
}
