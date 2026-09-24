import Image from "next/image";
import HeroArtwork from "@/components/effects/HeroArtwork";
import CtaBackdrop from "@/components/effects/CtaBackdrop";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DisplayHeading from "@/components/ui/DisplayHeading";
import SectionHeader from "@/components/ui/SectionHeader";
import Stat from "@/components/ui/Stat";
import Button from "@/components/ui/Button";
import ProjectCard from "@/components/ui/ProjectCard";
import SectionIcon from "@/components/ui/SectionIcon";
import { projects } from "@/data/projects";
import { leadership } from "@/data/leadership";
import { partners } from "@/data/partners";
import { SDG, SDG_IDS } from "@/data/sdg";
import { projectOutcome, projectTitle } from "@/lib/projectCopy";

export const metadata = {
  alternates: {
    canonical: "/zh",
    languages: { th: "/", en: "/en", "zh-Hans": "/zh", "x-default": "/" },
  },
};

const coveredGoals = SDG_IDS.filter((id) => projects.some((p) => p.sdg.includes(id))).length;

/** ผลงานเด่น 3 ชิ้น — ชุดเดียวกับหน้าไทยและอังกฤษ (สี SDG รวมไม่เกิน 6 สีต่อ viewport) */
const FEATURED_SLUGS = ["chula-zero-waste", "care-d-plus", "nia-100-faces"] as const;
const featured = FEATURED_SLUGS.map((slug) => projects.find((p) => p.slug === slug)!);

const expertiseItems = [
  {
    image: "/images/expertise/e1.webp",
    number: "01",
    title: "培训与能力建设",
    description: "为机构量身设计并开展传播创新培训",
  },
  {
    image: "/images/expertise/e2.webp",
    number: "02",
    title: "研究与评估",
    description: "对传播项目开展深入研究与系统评估",
  },
  {
    image: "/images/expertise/e3.webp",
    number: "03",
    title: "宣传活动与传播",
    description: "策划并管理能带来切实改变的传播策略与宣传活动",
  },
  {
    image: "/images/expertise/e4.webp",
    number: "04",
    title: "视频与多媒体",
    description: "制作高品质视频、增强现实与创意媒体内容",
  },
];

/**
 * หน้าแรกภาษาจีน — คู่กับ (th)/page.tsx และ (en)/en/page.tsx
 *
 * **ไม่มีส่วนวิดีโอและส่วนข่าว** โดยตั้งใจ (24 ก.ย. 2569): วิดีโอเล่าสาระหลักของ
 * บทความมีเสียงพากย์ไทย/อังกฤษเท่านั้นและลิงก์ไปหน้าบทสรุปที่ยังไม่มีฉบับจีน ส่วนข่าว
 * เป็นเนื้อหาไทย/อังกฤษที่ตกลงกับผู้ใช้แล้วว่าไม่แปล — การใส่ส่วนเหล่านั้นไว้จะได้
 * ลิงก์ไปหน้าที่ไม่มี หรือหน้าจีนที่มีข้อความภาษาอื่นปน (กติกา i18n ข้อ 7)
 */
export default function ChineseHomePage() {
  return (
    <div className="min-h-screen">
      <Header active="home" locale="zh" />
      <main>

      <section className="relative overflow-hidden">
        <HeroArtwork
          src="/images/home/hero-bg.webp"
          video={{ webm: "/videos/hero-loop.webm", mp4: "/videos/hero-loop.mp4" }}
          className="absolute inset-0 hidden md:block"
        />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
        <p className="mb-4 text-[13px] font-medium leading-[1.4] tracking-[0.12em] text-pink-500">
          朱拉隆功大学传播艺术学院
        </p>
        <DisplayHeading primary="传播创新" secondary="助力可持续的生活质量" />
        <p className="mt-6 max-w-prose text-[17px] leading-[1.7] text-ink-700">
          一个把传播学研究转化为切实改变人们生活的实用工具的卓越中心。每个项目都可衡量，并与联合国可持续发展目标相衔接。
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/zh/collaborate">与我们合作</Button>
          <Button variant="secondary" href="/zh/impact">
            查看项目成果
          </Button>
        </div>
        </div>
      </section>

      {/* SDG marquee — 17 จุดสี เลื่อนช้า หยุดเมื่อชี้ */}
      <div className="border-y border-ink-300 bg-white">
        <div className="overflow-hidden" aria-label="联合国 17 项可持续发展目标">
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
                    {id} {SDG[id].zh}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-6 pb-3 text-right">
          <Link href="/zh/sdg" className="text-[13px] font-medium text-pink-500 hover:text-pink-700">
            查看我们在 17 项目标上的工作 →
          </Link>
        </div>
      </div>

      {/* ตัวเลขจริงจากข้อมูล ไม่ใช่คำโฆษณา (Rigorous — PART A1) */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
          <Stat value={projects.length} unit="个项目" label="已完成的项目" />
          <Stat value={partners.length} unit="家机构" label="合作伙伴" delay={120} />
          <Stat value="10,000+" label="接受过培训的专业人员" delay={240} />
          <Stat value={`${coveredGoals}/17`} unit="项目标" label="已覆盖的可持续发展目标" delay={360} />
        </div>
      </section>

      <section className="border-y border-ink-300 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader
              locale="zh"
              eyebrow="精选成果"
              title="把研究转化为切实成效"
              description="精选项目：我们的传播工作带来了可衡量的改变"
            />
            <Button variant="secondary" href="/zh/impact">
              查看全部项目
            </Button>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ProjectCard
                key={p.slug}
                href={`/zh/impact/${p.slug}`}
                title={projectTitle(p, "zh")}
                description={projectOutcome(p, "zh")}
                image={p.image}
                alt={`${projectTitle(p, "zh")}——来自中心档案的项目照片`}
                sdgIds={p.sdg}
                locale="zh"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ความเชี่ยวชาญ — Ink ล้วน ไม่ใช้สี SDG */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            locale="zh"
            eyebrow="专业服务"
            title="我们最擅长的四件事"
            description="从研究到交付，我们覆盖传播的完整流程"
          />
          <Button variant="ghost" href="/zh/expertise">
            查看我们的服务
          </Button>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {expertiseItems.map((item) => (
            <div key={item.number} className="overflow-hidden rounded-lg border border-ink-300 bg-white">
              <div className="relative aspect-[4/3] sm:aspect-[16/10]">
                <Image
                  src={item.image}
                  alt={`${item.title}的插画`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-6">
              <p className="text-[15px] font-medium leading-[1.6] text-ink-500">{item.number}</p>
              <h3 className="mt-3 text-h3-m md:text-h3 text-ink-900">{item.title}</h3>
              <p className="mt-2 text-[15px] leading-[1.6] text-ink-700">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ผู้บริหารศูนย์ — การ์ดลิงก์ไปประวัติเต็มบนหน้าเกี่ยวกับเรา (ไม่ใช้สี SDG, PART H) */}
      <section className="border-y border-ink-300 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader
              locale="zh"
              icon="people"
              eyebrow="我们的团队"
              title="中心领导团队"
              description="兼具学术积累与实践经验的带头人——点击查看完整简介"
            />
            <Button variant="ghost" href="/zh/about#leadership">
              认识完整团队
            </Button>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {leadership.map((person) => (
              <Link
                key={person.slug}
                href={`/zh/about#${person.slug}`}
                className="group overflow-hidden rounded-lg border border-ink-300 bg-white transition-all duration-150 ease-brand hover:-translate-y-0.5 hover:border-ink-500 hover:shadow-sm focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-ink-100">
                  <Image
                    src={person.image}
                    alt={`${person.nameEn}——${person.roleZh}，朱拉隆功大学传播艺术学院`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <p className="text-[13px] font-medium leading-[1.4] tracking-[0.12em] text-pink-500">
                    {person.roleZh}
                  </p>
                  <h3 className="mt-1 text-h3-m md:text-h3 text-ink-900">{person.nameEn}</h3>
                  <p className="mt-3 line-clamp-2 text-[15px] leading-[1.6] text-ink-700">
                    {person.focusZh}
                  </p>
                  <p className="mt-4 text-[13px] font-medium text-pink-500 group-hover:text-pink-700">
                    查看简介 →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-ink-900">
        <CtaBackdrop
          src="/images/home/cta-bg.webp"
          video={{ webm: "/videos/cta-loop.webm", mp4: "/videos/cta-loop.mp4" }}
        />
        <div className="relative mx-auto max-w-7xl px-6 py-24 text-center">
          <SectionIcon role="invite" onDark className="mx-auto mb-4 h-9 w-9" />
          <h2 className="text-h2-m md:text-h2 text-white">
            有需要切实成效的传播难题吗？
          </h2>
          <p className="mx-auto mt-3 max-w-prose text-[17px] leading-[1.7] text-ink-300">
            告诉我们贵机构的情况，一起设计可衡量的传播方案。
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/zh/collaborate">与我们合作</Button>
          </div>
        </div>
      </section>

      </main>
      <Footer locale="zh" />
    </div>
  );
}
