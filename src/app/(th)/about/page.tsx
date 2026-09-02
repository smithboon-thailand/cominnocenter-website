import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import PageBanner from "@/components/ui/PageBanner";
import Reveal from "@/components/effects/Reveal";
import { stagger } from "@/components/effects/stagger";
import { researchers } from "@/data/researchers";
import { leadership, objectives, type SocialLink } from "@/data/leadership";
import { highlightsFor, type HighlightPerson } from "@/data/highlights";
import { SDG, SDG_IDS } from "@/data/sdg";
import TeamAndPartners from "@/components/about/TeamAndPartners";
import JsonLd from "@/components/seo/JsonLd";
import { personSchema } from "@/lib/schema";

export const metadata = {
  alternates: {
    canonical: "/about",
    languages: { th: "/about", en: "/en/about", "x-default": "/about" },
  },
  title: "เกี่ยวกับเรา",
  description:
    "ศูนย์เชี่ยวชาญเฉพาะทางด้านนวัตกรรมการสื่อสารเพื่อการพัฒนาคุณภาพชีวิตและความยั่งยืน คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย — พันธกิจ ผู้นำ นักวิจัย และเครือข่ายพันธมิตร",
};

const leaderPersonKey: Record<string, HighlightPerson> = {
  "Assoc. Prof. Dr. Smith Boonchutima": "smith",
  "Asst. Prof. Dr. Teerada (Ne) Chongkolrattanaporn": "teerada",
  "Assoc. Prof. Dr. Pavel Slutskiy": "pavel",
};

const typeLabel: Record<string, string> = {
  research: "งานวิจัย",
  award: "รางวัล",
  media: "สื่อ / ภาพยนตร์",
  event: "กิจกรรม",
  book: "หนังสือ",
  leadership: "บทบาทผู้นำ",
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

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header active="about" />
      {/* โปรไฟล์นักวิจัย + ORCID/Scopus ให้ Google เชื่อมตัวตนได้ */}
      <JsonLd data={leadership.map((l) => personSchema(l, "th"))} />
      <main>

      <section className="mx-auto max-w-7xl px-6 pb-12 pt-20 md:pt-28">
        <p className="mb-2 text-[13px] font-medium leading-[1.4] tracking-[0.12em] text-pink-500">
          เกี่ยวกับเรา
        </p>
        <h1 className="text-h1-m md:text-h1 text-ink-900">
          ศูนย์เชี่ยวชาญเฉพาะทางด้านนวัตกรรมการสื่อสาร
        </h1>
        <p className="mt-4 max-w-prose text-[17px] leading-[1.7] text-ink-700">
          เพื่อการพัฒนาคุณภาพชีวิตและความยั่งยืน คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
        </p>
        <PageBanner page="about" locale="th" />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeader title="เรื่องราวของเรา" />
            <div className="mt-4 max-w-prose space-y-4 text-[17px] leading-[1.7] text-ink-700">
              <p>
                ศูนย์เชี่ยวชาญเฉพาะทางด้านนวัตกรรมการสื่อสาร ก่อตั้งขึ้นภายใต้คณะนิเทศศาสตร์
                จุฬาลงกรณ์มหาวิทยาลัย เพื่อเป็นศูนย์กลางในการสร้างองค์ความรู้ พัฒนานวัตกรรม
                และขับเคลื่อนการสื่อสารที่ส่งผลต่อคุณภาพชีวิตและความยั่งยืน
              </p>
              <p>
                เราทำงานร่วมกับภาครัฐ ภาคเอกชน และภาคประชาสังคม ผ่านการวิจัย การพัฒนาเครื่องมือ
                การอบรม และการสร้างเครือข่ายความร่วมมือ
                เพื่อให้นวัตกรรมการสื่อสารเกิดประโยชน์อย่างแท้จริงต่อสังคมไทยและภูมิภาค
              </p>
            </div>
          </Reveal>
          <Reveal delay={stagger(1)} className="rounded-lg border border-ink-300 bg-white p-8 md:p-10">
            <h3 className="text-h3-m md:text-h3 text-ink-900">วิสัยทัศน์</h3>
            <p className="mt-3 text-[17px] leading-[1.7] text-ink-700">
              เป็นศูนย์ชั้นนำด้านนวัตกรรมการสื่อสาร ที่สร้างผลกระทบเชิงบวกต่อคุณภาพชีวิต
              และความยั่งยืนในระดับประเทศและภูมิภาค
            </p>
            <h3 className="mt-8 text-h3-m md:text-h3 text-ink-900">พันธกิจ</h3>
            <p className="mt-3 text-[17px] leading-[1.7] text-ink-700">
              สร้างองค์ความรู้ พัฒนานวัตกรรม และเชื่อมโยงเครือข่าย
              เพื่อยกระดับศักยภาพการสื่อสารของสังคมไทยอย่างยั่งยืน
              โดยทุกโครงการเชื่อมโยงกับเป้าหมายการพัฒนาที่ยั่งยืน
            </p>
            {/* แถวจุดสี SDG + เลข เฉพาะส่วนพันธกิจ (BRAND.md PART H) */}
            <Link
              href="/sdg"
              aria-label="ดูงานของเราทั้ง 17 เป้าหมายการพัฒนาที่ยั่งยืน"
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
          <SectionHeader title="วัตถุประสงค์หลัก" />
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
            {objectives.map((item, i) => (
              <Reveal key={item.number} delay={stagger(i)}>
                <p className="text-[15px] font-medium leading-[1.6] text-ink-500">{item.number}</p>
                <h3 className="mt-2 text-h3-m md:text-h3 text-ink-900">{item.titleTh}</h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-ink-700">{item.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership — ไม่มีสี SDG (BRAND.md PART H) */}
      <section id="leadership" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24">
        <SectionHeader
          title="ผู้นำของศูนย์"
          description="ทีมผู้นำที่มีประสบการณ์ด้านวิชาการและการปฏิบัติจริง พร้อมผลงานวิจัยและเครือข่ายความร่วมมือระดับนานาชาติ"
        />

        <div className="mt-14 space-y-24">
          {leadership.map((person, index) => (
            <article key={person.slug} id={person.slug} className="scroll-mt-24">
              <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12 md:gap-10">
                <div className={`md:col-span-4 ${index % 2 === 1 ? "md:order-2" : ""}`}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-ink-300 bg-ink-100">
                    <Image
                      src={person.image}
                      alt={person.alt}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </div>

                <div className={`md:col-span-8 ${index % 2 === 1 ? "md:order-1" : ""}`}>
                  <p className="text-[13px] font-medium leading-[1.4] tracking-[0.12em] text-pink-500">
                    {person.roleTh}
                  </p>
                  <h3 className="mt-1 text-h2-m md:text-h2 text-ink-900">{person.name}</h3>
                  <p className="text-[15px] leading-[1.6] text-ink-500">{person.nameEn}</p>
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
                        <p className="mt-0.5 text-[11px] text-ink-500">{m.label}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 text-[11px] leading-[1.6] text-ink-500">{person.metricsNote}</p>
                  <p className="mt-5 max-w-prose text-[17px] leading-[1.7] text-ink-700">
                    {person.focusTh}
                  </p>

                  <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <h4 className="mb-2 text-[15px] font-medium text-ink-900">ประวัติการศึกษา</h4>
                      <ul className="space-y-2 text-[15px] leading-[1.6] text-ink-700">
                        {person.education.map((item) => (
                          <li key={item} className="border-l-2 border-ink-300 pl-3">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2 text-[15px] font-medium text-ink-900">
                        ประสบการณ์การทำงาน
                      </h4>
                      <ul className="space-y-2 text-[15px] leading-[1.6] text-ink-700">
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
                    const items = key ? highlightsFor(key) : [];
                    if (items.length === 0) return null;
                    return (
                      <div className="mt-8">
                        <h4 className="mb-3 text-[15px] font-medium text-ink-900">ข่าวและผลกระทบ</h4>
                        <div className="space-y-3">
                          {items.slice(0, 3).map((h) => (
                            <div key={h.id} className="rounded-lg border border-ink-300 bg-ink-0 p-4">
                              <div className="mb-1.5 flex flex-wrap items-center gap-2">
                                <span className="inline-flex rounded border border-ink-300 px-2 py-0.5 text-[11px] font-medium text-ink-700">
                                  {typeLabel[h.type] || h.type}
                                </span>
                                <span className="text-[11px] text-ink-500">
                                  {h.date.slice(0, 4)}
                                  {h.source ? ` · ${h.source}` : ""}
                                </span>
                              </div>
                              <p className="text-[15px] font-medium leading-snug text-ink-900">
                                {h.titleTh}
                              </p>
                              <p className="mt-1 text-[13px] leading-[1.6] text-ink-700">
                                {h.summaryTh}
                              </p>
                              {h.href && (
                                <a
                                  href={h.href}
                                  {...(h.href.startsWith("/")
                                    ? {}
                                    : { target: "_blank", rel: "noopener noreferrer" })}
                                  className="mt-2 inline-flex items-center text-[13px] font-medium text-pink-500 hover:text-pink-700"
                                >
                                  {h.href.startsWith("/") ? "อ่านรายละเอียด" : "ดูแหล่งต้นทาง"}
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
                    <h4 className="mb-3 text-[15px] font-medium text-ink-900">ผลงานเด่น</h4>
                    <div className="space-y-3">
                      {person.publications.map((pub) => (
                        <div key={pub.title} className="rounded-lg border border-ink-300 bg-white p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div>
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
                                <p className="text-[11px] text-ink-500">การอ้างอิง</p>
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
          ชื่อ ตำแหน่ง และประวัติอ้างอิงจาก ORCID, Google Scholar, Scopus, ResearchGate
          และหน้ารายชื่อคณาจารย์ภาควิชาการประชาสัมพันธ์ คณะนิเทศศาสตร์ จุฬาฯ (ตรวจสอบ ส.ค. 2569)
          ตัวเลขของ รศ.ดร.สมิทธิ์ อ้างอิง Google Scholar และ Scopus Author ID 56167805200
        </p>
      </section>

      <section className="border-y border-ink-300 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <SectionHeader
            title="อาจารย์นักวิจัยประจำศูนย์"
            description="ทีมนักวิจัยจากหลากหลายสาขา ที่ร่วมขับเคลื่อนนวัตกรรมการสื่อสาร ความยั่งยืน และเทคโนโลยีล้ำสมัย"
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
                      alt={person.alt}
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
                  <p className="text-[13px] font-medium text-ink-500">{person.roleTh}</p>
                  <h3 className="mt-1 text-h3-m md:text-h3 leading-snug text-ink-900">
                    {person.name}
                  </h3>
                  <p className="mt-2 text-[13px] leading-[1.6] text-ink-500">{person.faculty}</p>
                  <p className="mt-3 text-[15px] leading-[1.6] text-ink-700">{person.focus}</p>
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

      <TeamAndPartners />

      <section className="bg-ink-900">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <h2 className="text-h2-m md:text-h2 text-white">สนใจร่วมงานกับเรา</h2>
          <p className="mx-auto mt-3 max-w-prose text-[17px] leading-[1.7] text-ink-300">
            เรายินดีรับฟังและร่วมพัฒนาโครงการที่สร้างผลกระทบจริงต่อสังคม
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/collaborate">ติดต่อเรา</Button>
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
}
