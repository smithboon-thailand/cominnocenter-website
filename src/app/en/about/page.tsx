import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/effects/Reveal";
import GlassCard from "@/components/effects/GlassCard";
import AnimatedCounter from "@/components/effects/AnimatedCounter";
import TeamAndPartners from "@/components/about/TeamAndPartners";
import { researchers } from "@/data/researchers";
import { leadership, objectives, type SocialLink } from "@/data/leadership";

const objectiveDescriptionsEn: Record<string, string> = {
  "01":
    "Build knowledge and deliver training in communication innovation for practitioners, organizations, and learners who apply it in the field.",
  "02":
    "Raise awareness and advance key issues for quality of life and sustainability through effective communication.",
  "03":
    "Research and develop tools, practices, and communication innovations that benefit society and organizations.",
};

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

export default function EnglishAboutPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header active="about" locale="en" />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-pink-400/15 blur-3xl animate-float-slow" />
          <div className="absolute top-1/3 -left-20 w-[24rem] h-[24rem] rounded-full bg-blue-700/10 blur-3xl animate-float-medium" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-14 md:pt-28 md:pb-20">
          <Reveal>
            <p className="text-sm font-medium text-pink-500 mb-3">About us</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900">
              Center of Excellence
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-pink-500">
                in Communication Innovation
              </span>
            </h1>
            <p className="mt-6 text-lg text-neutral-600 leading-relaxed max-w-2xl">
              For the development of quality of life and sustainability — Faculty of Communication
              Arts, Chulalongkorn University
            </p>
          </Reveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <Reveal>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-blue-700 mb-6">Our story</h2>
              <div className="space-y-4 text-neutral-700 leading-relaxed">
                <p>
                  The Center of Excellence in Communication Innovation was established under the
                  Faculty of Communication Arts, Chulalongkorn University, as a hub for knowledge
                  creation, innovation, and communication that improves quality of life and
                  sustainability.
                </p>
                <p>
                  We work with government, business, and civil society through research, tools,
                  training, and partnership networks so that communication innovation delivers real
                  benefits for Thailand and the region.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal direction="right" delay={120}>
            <GlassCard className="p-8 md:p-10">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">Vision</h3>
              <p className="text-neutral-700 leading-relaxed">
                To be a leading center in communication innovation that creates positive impact on
                quality of life and sustainability at national and regional levels.
              </p>
              <h3 className="text-lg font-semibold text-blue-700 mt-8 mb-4">Mission</h3>
              <p className="text-neutral-700 leading-relaxed">
                Create knowledge, develop innovation, and connect networks to strengthen Thailand's
                communication capacity sustainably.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="bg-white border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-semibold text-blue-700 mb-10">
              Core objectives
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {objectives.map((item, i) => (
              <Reveal key={item.number} delay={i * 90}>
                <div>
                  <div className="text-5xl font-bold text-pink-500/25 mb-3">{item.number}</div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">{item.title}</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {objectiveDescriptionsEn[item.number] || item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="leadership" className="max-w-7xl mx-auto px-6 py-16 md:py-24 scroll-mt-24">
        <Reveal>
          <div className="mb-14">
            <h2 className="text-2xl md:text-3xl font-semibold text-blue-700 mb-3">Leadership</h2>
            <p className="text-neutral-600 max-w-2xl">
              Academic and practice leaders with research impact and international collaboration
              networks.
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
                    <p className="text-sm font-medium text-pink-500">{person.role}</p>
                    <h3 className="mt-1 text-2xl md:text-3xl font-semibold text-neutral-900">
                      {person.nameEn}
                    </h3>
                    <p className="text-neutral-500">{person.name}</p>
                    {person.email && (
                      <p className="text-sm text-neutral-500 mt-1">
                        <a href={`mailto:${person.email}`} className="hover:text-pink-500">
                          {person.email}
                        </a>
                      </p>
                    )}

                    <AcademicLinks links={person.links} />

                    <div className="mt-6 grid grid-cols-3 gap-3">
                      {person.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="rounded-xl border border-neutral-200 bg-white/80 px-3 py-3 text-center"
                        >
                          <div className="text-xl md:text-2xl font-bold text-blue-700">
                            <AnimatedCounter value={m.value} suffix={m.suffix || ""} />
                          </div>
                          <div className="text-[11px] text-neutral-500 mt-0.5">{m.label}</div>
                        </div>
                      ))}
                    </div>
                    <p className="mt-5 text-neutral-700 leading-relaxed">{person.focus}</p>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-semibold text-blue-700 mb-2">Education</h4>
                        <ul className="space-y-2 text-sm text-neutral-600 leading-relaxed">
                          {person.education.map((item) => (
                            <li key={item} className="pl-3 border-l-2 border-pink-200">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-blue-700 mb-2">Experience</h4>
                        <ul className="space-y-2 text-sm text-neutral-600 leading-relaxed">
                          {person.work.map((item) => (
                            <li key={item} className="pl-3 border-l-2 border-blue-200">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8">
                      <h4 className="text-sm font-semibold text-blue-700 mb-3">Selected works</h4>
                      <div className="space-y-3">
                        {person.publications.map((pub) => (
                          <div
                            key={pub.title}
                            className="rounded-xl border border-neutral-200 bg-neutral-50/80 p-4 hover:border-pink-200 transition-colors"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="text-sm font-medium text-neutral-900 leading-snug">
                                  {pub.title}
                                </p>
                                <p className="text-xs text-neutral-500 mt-1">
                                  {pub.venue} · {pub.year}
                                </p>
                              </div>
                              {typeof pub.citations === "number" && (
                                <div className="shrink-0 text-right">
                                  <div className="text-lg font-bold text-pink-500">{pub.citations}</div>
                                  <div className="text-[10px] text-neutral-400 uppercase tracking-wide">
                                    cites
                                  </div>
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
          Names, roles, and profiles are based on ORCID, Google Scholar, Scopus, ResearchGate, and
          faculty listings of the Department of Public Relations, Faculty of Communication Arts,
          Chulalongkorn University (fact-checked Aug 2026).
        </p>
      </section>

      <section className="bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <Reveal>
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-semibold text-blue-700 mb-3">
                Center researchers
              </h2>
              <p className="text-neutral-600 max-w-2xl">
                Faculty researchers across disciplines who advance communication innovation,
                sustainability, and emerging technology.
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
                    <p className="text-xs font-medium text-pink-500">{person.role}</p>
                    <h3 className="mt-1 text-lg font-semibold text-neutral-900 leading-snug">
                      {person.nameEn}
                    </h3>
                    <p className="text-sm text-neutral-500">{person.name}</p>
                    <p className="mt-3 text-sm text-neutral-700 leading-relaxed">{person.focus}</p>
                    {person.email && (
                      <p className="mt-2 text-xs text-neutral-500">
                        <a href={`mailto:${person.email}`} className="hover:text-pink-500">
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

      <TeamAndPartners locale="en" />

      <section className="relative overflow-hidden bg-blue-700 text-white">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-pink-500 blur-3xl animate-float-slow" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-16 text-center">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-semibold">Interested in working with us?</h2>
            <p className="mt-3 text-blue-100 max-w-xl mx-auto">
              We welcome dialogue and partnerships that create real social impact.
            </p>
            <Link
              href="/en/collaborate"
              className="inline-flex items-center mt-8 px-8 py-3.5 rounded-lg bg-pink-500 text-white font-medium hover:bg-pink-600 transition-colors shadow-lg shadow-pink-500/30"
            >
              Contact us
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer locale="en" />
    </div>
  );
}
