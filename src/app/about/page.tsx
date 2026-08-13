import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/effects/Reveal";
import GlassCard from "@/components/effects/GlassCard";
import AnimatedCounter from "@/components/effects/AnimatedCounter";
import { researchers } from "@/data/researchers";
import { leadership, objectives, type SocialLink } from "@/data/leadership";
import TeamAndPartners from "@/components/about/TeamAndPartners";

function AcademicLinks({ links }: { links: SocialLink[] }) {
  return (
    <div className="flex flex-wrap gap-2 mt-5">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium border border-neutral-200 bg-white/80 text-neutral-700 hover:border-pink-300 hover:text-pink-600 hover:bg-pink-50 transition-colors"
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
    <div className="min-h-screen overflow-x-hidden">
      <Header active="about" />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-pink-400/15 blur-3xl animate-float-slow" />
          <div className="absolute top-1/3 -left-20 w-[24rem] h-[24rem] rounded-full bg-blue-700/10 blur-3xl animate-float-medium" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-14 md:pt-28 md:pb-20">
          <Reveal>
            <p className="text-sm font-medium text-pink-500 mb-3">เกี่ยวกับเรา</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900">
              ศูนย์เชี่ยวชาญเฉพาะทาง
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-pink-500">
                ด้านนวัตกรรมการสื่อสาร
              </span>
            </h1>
            <p className="mt-6 text-lg text-neutral-600 leading-relaxed max-w-2xl">
              เพื่อการพัฒนาคุณภาพชีวิตและความยั่งยืน
              คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
            </p>
          </Reveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <Reveal>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-blue-700 mb-6">เรื่องราวของเรา</h2>
              <div className="space-y-4 text-neutral-700 leading-relaxed">
                <p>
                  ศูนย์เชี่ยวชาญเฉพาะทางด้านนวัตกรรมการสื่อสาร ก่อตั้งขึ้นภายใต้คณะนิเทศศาสตร์
                  จุฬาลงกรณ์มหาวิทยาลัย เพื่อเป็นศูนย์กลางในการสร้างองค์ความรู้
                  พัฒนานวัตกรรม และขับเคลื่อนการสื่อสารที่ส่งผลต่อคุณภาพชีวิตและความยั่งยืน
                </p>
                <p>
                  เราทำงานร่วมกับภาครัฐ ภาคเอกชน และภาคประชาสังคม
                  ผ่านการวิจัย การพัฒนาเครื่องมือ การอบรม และการสร้างเครือข่ายความร่วมมือ
                  เพื่อให้นวัตกรรมการสื่อสารเกิดประโยชน์อย่างแท้จริงต่อสังคมไทยและภูมิภาค
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal direction="right" delay={120}>
            <GlassCard className="p-8 md:p-10">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">วิสัยทัศน์</h3>
              <p className="text-neutral-700 leading-relaxed">
                เป็นศูนย์ชั้นนำด้านนวัตกรรมการสื่อสาร ที่สร้างผลกระทบเชิงบวกต่อคุณภาพชีวิต
                และความยั่งยืนในระดับประเทศและภูมิภาค
              </p>
              <h3 className="text-lg font-semibold text-blue-700 mt-8 mb-4">พันธกิจ</h3>
              <p className="text-neutral-700 leading-relaxed">
                สร้างองค์ความรู้ พัฒนานวัตกรรม และเชื่อมโยงเครือข่าย
                เพื่อยกระดับศักยภาพการสื่อสารของสังคมไทยอย่างยั่งยืน
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="bg-white border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-semibold text-blue-700 mb-10">วัตถุประสงค์หลัก</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {objectives.map((item, i) => (
              <Reveal key={item.number} delay={i * 90}>
                <div>
                  <div className="text-5xl font-bold text-pink-500/25 mb-3">{item.number}</div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-1">{item.titleTh}</h3>
                  <p className="text-sm text-neutral-500 mb-3">{item.title}</p>
                  <p className="text-neutral-600 leading-relaxed">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <Reveal>
          <div className="mb-14">
            <h2 className="text-2xl md:text-3xl font-semibold text-blue-700 mb-3">ผู้นำของศูนย์</h2>
            <p className="text-neutral-600 max-w-2xl">
              ทีมผู้นำที่มีประสบการณ์ด้านวิชาการและการปฏิบัติจริง
              พร้อมผลงานวิจัยและเครือข่ายความร่วมมือระดับนานาชาติ
            </p>
          </div>
        </Reveal>

        <div className="space-y-24">
          {leadership.map((person, index) => (
            <article key={person.nameEn} className="relative">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start">
                <div className={`md:col-span-4 ${index % 2 === 1 ? "md:order-2" : ""}`}>
                  <Reveal direction={index % 2 === 1 ? "right" : "left"}>
                    <div className="relative">
                      <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-pink-200/30 via-transparent to-blue-200/30 blur-xl" />
                      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100 shadow-sm">
                        <Image
                          src={person.image}
                          alt={person.alt}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    </div>
                  </Reveal>
                </div>

                <div className={`md:col-span-8 ${index % 2 === 1 ? "md:order-1" : ""}`}>
                  <Reveal delay={80}>
                    <p className="text-sm font-medium text-pink-500">{person.roleTh}</p>
                    <h3 className="mt-1 text-2xl md:text-3xl font-semibold text-neutral-900">{person.name}</h3>
                    <p className="text-neutral-500">{person.nameEn}</p>
                    <p className="text-xs text-neutral-400 mt-1">{person.role}</p>
                    {person.email && (
                      <p className="text-sm text-neutral-500 mt-1">
                        <a href={`mailto:${person.email}`} className="hover:text-pink-500">{person.email}</a>
                      </p>
                    )}

                    <AcademicLinks links={person.links} />

                    <div className="mt-6 grid grid-cols-3 gap-3">
                      {person.metrics.map((m) => (
                        <div key={m.label} className="rounded-xl border border-neutral-200 bg-white/80 px-3 py-3 text-center">
                          <div className="text-xl md:text-2xl font-bold text-blue-700">
                            <AnimatedCounter value={m.value} suffix={m.suffix || ""} />
                          </div>
                          <div className="text-[11px] text-neutral-500 mt-0.5">{m.label}</div>
                        </div>
                      ))}
                    </div>
                    <p className="mt-2 text-[11px] text-neutral-400">{person.metricsNote}</p>
                    <p className="mt-5 text-neutral-700 leading-relaxed">{person.focus}</p>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-semibold text-blue-700 mb-2">ประวัติการศึกษา</h4>
                        <ul className="space-y-2 text-sm text-neutral-600 leading-relaxed">
                          {person.education.map((item) => (
                            <li key={item} className="pl-3 border-l-2 border-pink-200">{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-blue-700 mb-2">ประสบการณ์การทำงาน</h4>
                        <ul className="space-y-2 text-sm text-neutral-600 leading-relaxed">
                          {person.work.map((item) => (
                            <li key={item} className="pl-3 border-l-2 border-blue-200">{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8">
                      <h4 className="text-sm font-semibold text-blue-700 mb-3">ผลงานเด่น</h4>
                      <div className="space-y-3">
                        {person.publications.map((pub) => (
                          <div key={pub.title} className="rounded-xl border border-neutral-200 bg-neutral-50/80 p-4 hover:border-pink-200 transition-colors">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="text-sm font-medium text-neutral-900 leading-snug">{pub.title}</p>
                                <p className="text-xs text-neutral-500 mt-1">{pub.venue} · {pub.year}</p>
                              </div>
                              {typeof pub.citations === "number" && (
                                <div className="shrink-0 text-right">
                                  <div className="text-lg font-bold text-pink-500">{pub.citations}</div>
                                  <div className="text-[10px] text-neutral-400 uppercase tracking-wide">cites</div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-12 text-xs text-neutral-400 max-w-3xl">
          ชื่อ ตำแหน่ง และประวัติอ้างอิงจาก ORCID, Google Scholar, Scopus, ResearchGate
          และหน้ารายชื่อคณาจารย์ภาควิชาการประชาสัมพันธ์ คณะนิเทศศาสตร์ จุฬาฯ (fact-check ส.ค. 2026)
          ตัวเลขของรศ.ดร.สมิทธิ์ อ้างอิง Google Scholar และ Scopus Author ID 56167805200
        </p>
      </section>

      <section className="bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <Reveal>
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-semibold text-blue-700 mb-3">อาจารย์นักวิจัยประจำศูนย์</h2>
              <p className="text-neutral-600 max-w-2xl">
                ทีมนักวิจัยจากหลากหลายสาขา ที่ร่วมขับเคลื่อนนวัตกรรมการสื่อสาร ความยั่งยืน และเทคโนโลยีล้ำสมัย
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {researchers.map((person, i) => (
              <Reveal key={person.nameEn} delay={i * 90}>
                <div className="h-full rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative aspect-[4/5] bg-gradient-to-br from-blue-50 to-pink-50">
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
                        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-700 to-pink-500 text-white text-4xl font-semibold flex items-center justify-center shadow-lg">
                          {(person.nameEn.split(" ").filter(Boolean).slice(-1)[0] || "R").charAt(0)}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-medium text-pink-500">{person.roleTh}</p>
                    <h3 className="mt-1 text-lg font-semibold text-neutral-900 leading-snug">{person.name}</h3>
                    <p className="text-sm text-neutral-500">{person.nameEn}</p>
                    <p className="mt-3 text-xs text-neutral-500 leading-relaxed">{person.faculty}</p>
                    <p className="mt-3 text-sm text-neutral-700 leading-relaxed">{person.focus}</p>
                    {person.email && (
                      <p className="mt-2 text-xs text-neutral-500">
                        <a href={`mailto:${person.email}`} className="hover:text-pink-500">{person.email}</a>
                      </p>
                    )}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {person.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium border border-neutral-200 text-neutral-600 hover:border-pink-300 hover:text-pink-600 hover:bg-pink-50 transition-colors"
                        >
                          {link.label}
                          <span className="ml-1 opacity-50">↗</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TeamAndPartners />

      <section className="relative overflow-hidden bg-blue-700 text-white">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-pink-500 blur-3xl animate-float-slow" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-16 text-center">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-semibold">สนใจร่วมงานกับเรา?</h2>
            <p className="mt-3 text-blue-100 max-w-xl mx-auto">
              เรายินดีรับฟังและร่วมพัฒนาโครงการที่สร้างผลกระทบจริงต่อสังคม
            </p>
            <Link
              href="/collaborate"
              className="inline-flex items-center mt-8 px-8 py-3.5 rounded-lg bg-pink-500 text-white font-medium hover:bg-pink-600 transition-colors shadow-lg shadow-pink-500/30"
            >
              ติดต่อเรา
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
