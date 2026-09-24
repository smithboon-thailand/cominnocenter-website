import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import CentreResearchStats from "@/components/about/CentreResearchStats";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/effects/Reveal";
import { stagger } from "@/components/effects/stagger";
import { researchers } from "@/data/researchers";
import { leadership, objectives, type SocialLink } from "@/data/leadership";
import { highlightsFor, type HighlightPerson } from "@/data/highlights";
import { SDG, SDG_IDS } from "@/data/sdg";
import TeamAndPartners from "@/components/about/TeamAndPartners";
import JsonLd from "@/components/seo/JsonLd";
import SectionIcon from "@/components/ui/SectionIcon";
import { personSchema } from "@/lib/schema";

export const metadata = {
  alternates: {
    canonical: "/zh/about",
    languages: { th: "/about", en: "/en/about", "zh-Hans": "/zh/about", "x-default": "/about" },
  },
  title: "关于我们",
  description:
    "朱拉隆功大学传播艺术学院传播创新促进生活质量与可持续发展卓越中心——使命、领导团队、研究人员与合作伙伴",
};

const leaderPersonKey: Record<string, HighlightPerson> = {
  "Assoc. Prof. Dr. Smith Boonchutima": "smith",
  "Asst. Prof. Dr. Teerada (Ne) Chongkolrattanaporn": "teerada",
  "Assoc. Prof. Dr. Pavel Slutskiy": "pavel",
};

const typeLabel: Record<string, string> = {
  research: "研究",
  award: "奖项",
  media: "媒体与影视",
  event: "活动",
  book: "著作",
  leadership: "领导职务",
};

/**
 * ป้ายตัวชี้วัดบนการ์ดผู้บริหาร — ค่าใน `leadership.ts` เป็นอังกฤษสั้นๆ ทั้งสามภาษา
 * หน้าจีนแปลผ่านตารางนี้ ป้ายที่ไม่รู้จักแสดงตามเดิม (ชื่อฐานข้อมูลเป็นชื่อเฉพาะ)
 */
const metricLabel: Record<string, string> = {
  "Citations (GS)": "被引（Google Scholar）",
  "h-index (GS)": "h 指数（Google Scholar）",
  "Docs (Scopus)": "文献数（Scopus）",
  Publications: "出版物",
  "Thesis advised": "指导论文",
  "Years in academia": "学术年资",
  "Citations (RG)": "被引（ResearchGate）",
  "Publications (RG)": "出版物（ResearchGate）",
  "Top paper cites": "最高单篇被引",
};

function AcademicLinks({ links }: { links: SocialLink[] }) {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded border border-ink-300 bg-white px-3 py-1.5
            text-[13px] font-medium text-ink-700 transition-colors duration-150
            hover:border-pink-300 hover:text-pink-700"
        >
          {link.label}
          <span className="ml-1.5 opacity-50">↗</span>
        </a>
      ))}
    </div>
  );
}

/**
 * หน้าเกี่ยวกับเราภาษาจีน — คู่กับ (en)/en/about/page.tsx
 *
 * ประวัติการศึกษาและประสบการณ์ทำงานคงเป็นอังกฤษ (ชื่อปริญญาและสถาบันเป็นชื่อเฉพาะ
 * แบบเดียวกับที่หน้าไทยก็แสดงเป็นอังกฤษ) · ชื่อบุคคลใช้ชื่ออังกฤษและไม่แสดงชื่อไทยซ้ำ
 * · ข่าวและผลงานเด่นแสดงเฉพาะรายการที่มีคำแปลจีน ไม่ถอยไปแสดงอังกฤษ
 */
export default function ChineseAboutPage() {
  return (
    <div className="min-h-screen">
      <Header active="about" locale="zh" />
      <JsonLd data={leadership.map((l) => personSchema(l, "zh"))} />
      <main>

      <PageHero
        page="about"
        locale="zh"
        kicker="关于我们"
        title="传播创新卓越中心"
        lede="传播创新促进生活质量与可持续发展卓越中心——朱拉隆功大学传播艺术学院"
      />

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeader icon="story" locale="zh" title="我们的故事" />
            <div className="mt-4 max-w-prose space-y-4 text-[17px] leading-[1.7] text-ink-700">
              <p>
                传播创新卓越中心设立于朱拉隆功大学传播艺术学院，是一个建设知识、发展创新、推动以传播提升生活质量与可持续发展的枢纽。
              </p>
              <p>
                我们通过研究、工具开发、培训与合作网络，与政府、企业和公民社会携手，让传播创新切实惠及泰国社会与本地区。
              </p>
            </div>
          </Reveal>
          <Reveal delay={stagger(1)} className="rounded-lg border border-ink-300 bg-white p-8 md:p-10">
            <h3 className="text-h3-m md:text-h3 text-ink-900">愿景</h3>
            <p className="mt-3 text-[17px] leading-[1.7] text-ink-700">
              成为传播创新领域的领先中心，在国家与区域层面为生活质量和可持续发展创造积极影响。
            </p>
            <h3 className="mt-8 text-h3-m md:text-h3 text-ink-900">使命</h3>
            <p className="mt-3 text-[17px] leading-[1.7] text-ink-700">
              建设知识、发展创新、连接网络，可持续地提升泰国社会的传播能力——每个项目都与联合国可持续发展目标相衔接。
            </p>
            {/* แถวจุด SDG มีเฉพาะส่วนพันธกิจ (BRAND PART H) */}
            <Link
              href="/zh/sdg"
              aria-label="查看我们在全部 17 项可持续发展目标上的工作"
              className="mt-6 flex flex-wrap gap-x-3 gap-y-2"
            >
              {SDG_IDS.map((id) => (
                <span
                  key={id}
                  className="inline-flex items-center gap-1 text-[13px] font-medium text-ink-500"
                >
                  <span
                    aria-hidden
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: SDG[id].pure }}
                  />
                  {id}
                </span>
              ))}
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-ink-300 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <SectionHeader icon="mission" locale="zh" title="我们的目标" />
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
            {objectives.map((item, i) => (
              <Reveal key={item.number} delay={stagger(i)}>
                <p className="text-[15px] font-medium leading-[1.6] text-ink-500">{item.number}</p>
                <h3 className="mt-2 text-h3-m md:text-h3 text-ink-900">{item.titleZh}</h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-ink-700">{item.descriptionZh}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CentreResearchStats locale="zh" />

      {/* ผู้บริหาร — ไม่ใช้สี SDG (BRAND PART H) */}
      <section id="leadership" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24">
        <SectionHeader
          locale="zh"
          icon="people"
          title="领导团队"
          description="拥有国际研究与合作网络的资深学者与实践者"
        />

        <div className="mt-14 space-y-24">
          {leadership.map((person, index) => (
            <article key={person.slug} id={person.slug} className="scroll-mt-24">
              <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12 md:gap-10">
                <div className={`md:col-span-4 ${index % 2 === 1 ? "md:order-2" : ""}`}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-ink-300 bg-ink-100">
                    <Image
                      src={person.image}
                      alt={`${person.nameEn}——${person.roleZh}，朱拉隆功大学传播艺术学院`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </div>

                <div className={`md:col-span-8 ${index % 2 === 1 ? "md:order-1" : ""}`}>
                  <p className="text-[13px] font-medium leading-[1.4] tracking-[0.12em] text-pink-500">
                    {person.roleZh}
                  </p>
                  <h3 className="mt-1 text-h2-m md:text-h2 text-ink-900">{person.nameEn}</h3>
                  {person.email && (
                    <p className="mt-1 text-[15px] leading-[1.6]">
                      <a
                        href={`mailto:${person.email}`}
                        className="text-ink-700 hover:text-pink-500"
                      >
                        {person.email}
                      </a>
                    </p>
                  )}

                  <AcademicLinks links={person.links} />

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {person.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-lg border border-ink-300 bg-white px-3 py-3 text-center"
                      >
                        <p className="text-xl font-medium text-ink-900 md:text-2xl">
                          {m.value.toLocaleString()}
                          {m.suffix || ""}
                        </p>
                        <p className="mt-0.5 text-[11px] text-ink-500">
                          {metricLabel[m.label] ?? m.label}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 text-[11px] leading-[1.6] text-ink-500">{person.metricsNoteZh}</p>
                  <p className="mt-5 max-w-prose text-[17px] leading-[1.7] text-ink-700">
                    {person.focusZh}
                  </p>

                  <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <h4 className="mb-2 text-[15px] font-medium text-ink-900">教育背景</h4>
                      <ul className="space-y-2 text-[15px] leading-[1.6] text-ink-700" lang="en">
                        {person.education.map((item) => (
                          <li key={item} className="border-l-2 border-ink-300 pl-3">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2 text-[15px] font-medium text-ink-900">工作经历</h4>
                      <ul className="space-y-2 text-[15px] leading-[1.6] text-ink-700" lang="en">
                        {person.work.map((item) => (
                          <li key={item} className="border-l-2 border-ink-300 pl-3">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {(() => {
                    const key = leaderPersonKey[person.nameEn];
                    // เฉพาะรายการที่มีคำแปลจีน — ไม่ถอยไปแสดงอังกฤษกลางหน้าจีน
                    const items = key
                      ? highlightsFor(key).filter((h) => h.titleZh && h.summaryZh)
                      : [];
                    if (items.length === 0) return null;
                    return (
                      <div className="mt-8">
                        <h4 className="mb-3 text-[15px] font-medium text-ink-900">
                          动态与影响
                        </h4>
                        <div className="space-y-3">
                          {items.slice(0, 3).map((h) => (
                            <div key={h.id} className="rounded-lg border border-ink-300 bg-ink-0 p-4">
                              <div className="mb-1.5 flex flex-wrap items-center gap-2">
                                <span className="inline-flex rounded border border-ink-300 px-2 py-0.5 text-[11px] font-medium text-ink-700">
                                  {typeLabel[h.type] || h.type}
                                </span>
                                <span className="text-[11px] text-ink-500">{h.date.slice(0, 4)}</span>
                              </div>
                              <p className="text-[15px] font-medium leading-snug text-ink-900">
                                {h.titleZh}
                              </p>
                              <p className="mt-1 text-[13px] leading-[1.6] text-ink-700">
                                {h.summaryZh}
                              </p>
                              {h.href && (
                                <a
                                  href={h.href.startsWith("/") ? `/zh${h.href}` : h.href}
                                  {...(h.href.startsWith("/")
                                    ? {}
                                    : { target: "_blank", rel: "noopener noreferrer" })}
                                  className="mt-2 inline-flex items-center text-[13px] font-medium text-pink-500 hover:text-pink-700"
                                >
                                  {h.href.startsWith("/") ? "阅读更多" : "查看来源"}
                                  <span className="ml-1 opacity-60">
                                    {h.href.startsWith("/") ? "→" : "↗"}
                                  </span>
                                </a>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}

                  <div className="mt-8">
                    <h4 className="mb-3 text-[15px] font-medium text-ink-900">
                      代表性出版物
                    </h4>
                    <div className="space-y-3">
                      {person.publications.map((pub) => (
                        <div key={pub.title} className="rounded-lg border border-ink-300 bg-white p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div lang="en">
                              <p className="text-[15px] font-medium leading-snug text-ink-900">
                                {pub.title}
                              </p>
                              <p className="mt-1 text-[13px] text-ink-500">
                                {pub.venue} · {pub.year}
                              </p>
                            </div>
                            {typeof pub.citations === "number" && (
                              <div className="shrink-0 text-right">
                                <p className="text-lg font-medium text-ink-900">{pub.citations}</p>
                                <p className="text-[11px] text-ink-500">次被引</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-12 max-w-3xl text-[13px] leading-[1.6] text-ink-500">
          姓名、职务与简介参考 ORCID、Google Scholar、Scopus、ResearchGate 以及公共关系系师资页面（2026 年 8 月核实）。Smith
          Boonchutima 博士的指标参考 Google Scholar 与 Scopus 作者 ID 56167805200（2026 年 9 月 8 日复核）。
        </p>
      </section>

      <section className="border-y border-ink-300 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <SectionHeader
            locale="zh"
            icon="people"
            title="中心研究员"
            description="来自多个学科的研究人员，共同推动传播创新、可持续发展与新兴技术"
          />

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {researchers.map((person) => (
              <div
                key={person.nameEn}
                className="h-full overflow-hidden rounded-lg border border-ink-300 bg-white"
              >
                <div className="relative aspect-[4/5] bg-ink-100">
                  {person.image ? (
                    <Image
                      src={person.image}
                      alt={`${person.nameEn}——${person.roleZh}，朱拉隆功大学`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-medium text-ink-500">
                        {(person.nameEn.split(" ").filter(Boolean).slice(-1)[0] || "R").charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <p className="text-[13px] font-medium text-ink-500">{person.roleZh}</p>
                  <h3 className="mt-1 text-h3-m md:text-h3 leading-snug text-ink-900">
                    {person.nameEn}
                  </h3>
                  <p className="mt-2 text-[13px] leading-[1.6] text-ink-500">{person.facultyZh}</p>
                  <p className="mt-3 text-[15px] leading-[1.6] text-ink-700">{person.focusZh}</p>
                  {person.email && (
                    <p className="mt-2 text-[13px]">
                      <a href={`mailto:${person.email}`} className="text-ink-700 hover:text-pink-500">
                        {person.email}
                      </a>
                    </p>
                  )}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {person.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded border border-ink-300 px-2.5 py-1
                          text-[11px] font-medium text-ink-700 transition-colors duration-150
                          hover:border-pink-300 hover:text-pink-700"
                      >
                        {link.label}
                        <span className="ml-1 opacity-50">↗</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TeamAndPartners locale="zh" />

      <section className="bg-ink-900">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <SectionIcon role="invite" onDark className="mx-auto mb-4 h-9 w-9" />
          <h2 className="text-h2-m md:text-h2 text-white">有兴趣与我们合作吗？</h2>
          <p className="mx-auto mt-3 max-w-prose text-[17px] leading-[1.7] text-ink-300">
            我们期待听到您的想法，一起打造具有真实社会影响的项目。
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/zh/collaborate">联系我们</Button>
          </div>
        </div>
      </section>

      </main>
      <Footer locale="zh" />
    </div>
  );
}
