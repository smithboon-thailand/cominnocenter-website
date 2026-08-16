import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DisplayHeading from "@/components/ui/DisplayHeading";
import SectionHeader from "@/components/ui/SectionHeader";
import Stat from "@/components/ui/Stat";
import Button from "@/components/ui/Button";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";
import { leadership } from "@/data/leadership";
import { partners } from "@/data/partners";
import { newsSorted, newsCover } from "@/data/news";
import { SDG, SDG_IDS } from "@/data/sdg";

export const metadata = {
  alternates: {
    canonical: "/",
    languages: { th: "/", en: "/en", "x-default": "/" },
  },
};

const coveredGoals = SDG_IDS.filter((id) => projects.some((p) => p.sdg.includes(id))).length;

/** ผลงานเด่น 3 ชิ้น — เลือกให้สี SDG รวมทุก badge ไม่เกิน 6 สีต่อ viewport (PART H) */
const FEATURED_SLUGS = ["chula-zero-waste", "care-d-plus", "nia-100-faces"] as const;
const featured = FEATURED_SLUGS.map((slug) => projects.find((p) => p.slug === slug)!);

const latestNews = newsSorted.slice(0, 3);

const expertiseItems = [
  {
    number: "01",
    title: "การอบรมและพัฒนาศักยภาพ",
    description: "ออกแบบและจัดอบรมด้านนวัตกรรมการสื่อสารให้กับองค์กร",
  },
  {
    number: "02",
    title: "วิจัยและประเมินผล",
    description: "วิจัยเชิงลึกและประเมินผลโครงการสื่อสารอย่างเป็นระบบ",
  },
  {
    number: "03",
    title: "แคมเปญและการสื่อสาร",
    description: "วางกลยุทธ์และบริหารแคมเปญเพื่อสร้างการเปลี่ยนแปลง",
  },
  {
    number: "04",
    title: "วิดีโอและสื่อมัลติมีเดีย",
    description: "ผลิตสื่อวิดีโอ AR และสื่อสร้างสรรค์คุณภาพสูง",
  },
];

const THAI_MONTHS = [
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
];

function thaiDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${THAI_MONTHS[m - 1]} ${y + 543}`;
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header active="home" />
      <main>

      {/* Hero — two-tone display ตาม BRAND v1.2 · ระยะหายใจ ≥ sp-12 */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <p className="mb-4 text-[13px] font-medium leading-[1.4] tracking-[0.12em] text-pink-500">
          คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
        </p>
        <DisplayHeading
          primary="นวัตกรรมการสื่อสาร"
          secondary="เพื่อคุณภาพชีวิตที่ยั่งยืน"
        />
        <p className="mt-6 max-w-prose text-[17px] leading-[1.7] text-ink-700">
          ศูนย์เชี่ยวชาญเฉพาะทางที่แปลงองค์ความรู้ด้านการสื่อสาร
          ให้เป็นเครื่องมือที่เปลี่ยนคุณภาพชีวิตของผู้คนได้จริง
          ทุกโครงการวัดผลได้ และเชื่อมโยงกับเป้าหมายการพัฒนาที่ยั่งยืน
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/collaborate">ร่วมงานกับเรา</Button>
          <Button variant="secondary" href="/impact">
            ดูผลงานของเรา
          </Button>
        </div>
      </section>

      {/* SDG marquee — 17 จุดสี เลื่อนช้า ≥40s หยุดเมื่อ hover (PART D3/H) */}
      <div className="border-y border-ink-300 bg-white">
        <div className="overflow-hidden" aria-label="เป้าหมายการพัฒนาที่ยั่งยืนทั้ง 17 ข้อ">
          <div className="flex w-max animate-marquee whitespace-nowrap py-3 [animation-duration:48s] hover:[animation-play-state:paused]">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex" aria-hidden={copy === 1}>
                {SDG_IDS.map((id) => (
                  <span
                    key={`${copy}-${id}`}
                    className="mx-5 inline-flex items-center gap-2 text-[13px] font-medium text-ink-500"
                  >
                    <span
                      aria-hidden
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: SDG[id].pure }}
                    />
                    {id} {SDG[id].th}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-6 pb-3 text-right">
          <Link
            href="/sdg"
            className="text-[13px] font-medium text-pink-500 hover:text-pink-700"
          >
            ดูงานของเราทั้ง 17 เป้าหมาย →
          </Link>
        </div>
      </div>

      {/* ตัวเลขจริงจากข้อมูล ไม่ใช่ตัวเลขการตลาด (Rigorous — PART A1) */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <Stat value={projects.length} unit="โครงการ" label="ผลงานที่ส่งมอบแล้ว" />
          <Stat value={partners.length} unit="องค์กร" label="พันธมิตรที่ร่วมงาน" />
          <Stat value="10,000+" unit="คน" label="บุคลากรที่ผ่านการอบรม" />
          <Stat value={`${coveredGoals}/17`} unit="เป้าหมาย" label="SDG ที่ครอบคลุม" />
        </div>
      </section>

      {/* ผลงานเด่น */}
      <section className="border-y border-ink-300 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader
              eyebrow="ผลงานเด่น"
              title="งานวิจัยที่เปลี่ยนเป็นผลลัพธ์จริง"
              description="ตัวอย่างโครงการที่การสื่อสารของเราสร้างการเปลี่ยนแปลงที่วัดได้"
            />
            <Button variant="secondary" href="/impact">
              ดูผลงานทั้งหมด
            </Button>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
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
      </section>

      {/* ความเชี่ยวชาญ — Ink ล้วน ไม่มีสี SDG */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            eyebrow="ความเชี่ยวชาญ"
            title="สี่ด้านที่เราทำได้ดีที่สุด"
            description="จากงานวิจัยถึงการลงมือทำ เราดูแลการสื่อสารครบทั้งกระบวนการ"
          />
          <Button variant="ghost" href="/expertise">
            ดูรายละเอียดบริการ
          </Button>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {expertiseItems.map((item) => (
            <div key={item.number} className="rounded-lg border border-ink-300 bg-white p-6">
              <p className="text-[15px] font-medium leading-[1.6] text-ink-500">{item.number}</p>
              <h3 className="mt-3 text-h3-m md:text-h3 text-ink-900">{item.title}</h3>
              <p className="mt-2 text-[15px] leading-[1.6] text-ink-700">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ผู้นำของศูนย์ — คลิกไปประวัติเต็มบนหน้า About (ไม่มีสี SDG ตาม PART H) */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            eyebrow="ทีมของเรา"
            title="ผู้นำของศูนย์"
            description="ผู้บริหารที่มีทั้งผลงานวิชาการและประสบการณ์ลงมือทำจริง คลิกเพื่อดูประวัติฉบับเต็ม"
          />
          <Button variant="ghost" href="/about#leadership">
            ดูทีมทั้งหมด
          </Button>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {leadership.map((person) => (
            <Link
              key={person.slug}
              href={`/about#${person.slug}`}
              className="group overflow-hidden rounded-lg border border-ink-300 bg-white transition-all duration-150 ease-brand hover:-translate-y-0.5 hover:border-ink-500 hover:shadow-sm focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-ink-100">
                <Image
                  src={person.image}
                  alt={person.alt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-5">
                <p className="text-[13px] font-medium leading-[1.4] tracking-[0.12em] text-pink-500">
                  {person.roleTh.split(" / ")[0]}
                </p>
                <h3 className="mt-1 text-h3-m md:text-h3 text-ink-900">{person.name}</h3>
                <p className="text-[13px] leading-[1.6] text-ink-500">{person.nameEn}</p>
                <p className="mt-3 line-clamp-2 text-[15px] leading-[1.6] text-ink-700">
                  {person.focusTh}
                </p>
                <p className="mt-4 text-[13px] font-medium text-pink-500 group-hover:text-pink-700">
                  ดูประวัติ →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ข่าวล่าสุด — เชื่อมกับคลังข่าวจาก Phase 0-C */}
      <section className="border-y border-ink-300 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader
              eyebrow="ข่าวและกิจกรรม"
              title="ความเคลื่อนไหวล่าสุดของศูนย์"
            />
            <Button variant="ghost" href="/news">
              อ่านข่าวทั้งหมด
            </Button>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {latestNews.map((post) => (
              <Link
                key={post.slug}
                href={`/news/${post.slug}`}
                className="group overflow-hidden rounded-lg border border-ink-300 bg-white
                  transition-transform duration-150 ease-brand hover:-translate-y-0.5
                  focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]
                  motion-reduce:hover:translate-y-0"
              >
                <span className="relative block aspect-[16/10] overflow-hidden">
                  <Image
                    src={newsCover(post.slug)}
                    alt={`${post.titleTh} — ภาพจากข่าวของศูนย์`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </span>
                <span className="block p-6">
                  <span className="block text-[13px] leading-[1.4] text-ink-500">
                    {thaiDate(post.date)}
                  </span>
                  <span className="mt-2 block text-h3-m md:text-h3 text-ink-900 line-clamp-2">
                    {post.titleTh}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink-900">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <h2 className="text-h2-m md:text-h2 text-white">
            มีโจทย์การสื่อสารที่อยากเห็นผลจริงไหม
          </h2>
          <p className="mx-auto mt-3 max-w-prose text-[17px] leading-[1.7] text-ink-300">
            เล่าเป้าหมายขององค์กรให้เราฟัง แล้วออกแบบการสื่อสารที่วัดผลได้ไปด้วยกัน
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
