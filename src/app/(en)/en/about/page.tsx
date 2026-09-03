import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
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
    canonical: "/en/about",
    languages: { th: "/about", en: "/en/about", "x-default": "/about" },
  },
  title: "About",
  description:
    "Center of Excellence in Communication Innovation for the Development of Quality of Life and Sustainability, Faculty of Communication Arts, Chulalongkorn University — mission, leadership, researchers, and partners",
};

const leaderPersonKey: Record<string, HighlightPerson> = {
  "Assoc. Prof. Dr. Smith Boonchutima": "smith",
  "Asst. Prof. Dr. Teerada (Ne) Chongkolrattanaporn": "teerada",
  "Assoc. Prof. Dr. Pavel Slutskiy": "pavel",
};

const typeLabel: Record<string, string> = {
  research: "Research",
  award: "Award",
  media: "Media & film",
  event: "Event",
  book: "Book",
  leadership: "Leadership",
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

export default function EnglishAboutPage() {
  return (
    <div className="min-h-screen">
      <Header active="about" locale="en" />
      <JsonLd data={leadership.map((l) => personSchema(l, "en"))} />
      <main>

      <PageHero
        page="about"
        locale="en"
        kicker="About us"
        title="Center of Excellence in Communication Innovation"
        lede="For the development of quality of life and sustainability — Faculty of Communication Arts, Chulalongkorn University"
      />

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeader locale="en" title="Our story" />
            <div className="mt-4 max-w-prose space-y-4 text-[17px] leading-[1.7] text-ink-700">
              <p>
                The Center of Excellence in Communication Innovation was founded under the
                Faculty of Communication Arts, Chulalongkorn University, as a hub for building
                knowledge, developing innovation, and driving communication that improves
                quality of life and sustainability.
              </p>
              <p>
                We work with government, business, and civil society through research, tool
                development, training, and partnership networks — so that communication
                innovation genuinely benefits Thai society and the region.
              </p>
            </div>
          </Reveal>
          <Reveal delay={stagger(1)} className="rounded-lg border border-ink-300 bg-white p-8 md:p-10">
            <h3 className="text-h3-m md:text-h3 text-ink-900">Vision</h3>
            <p className="mt-3 text-[17px] leading-[1.7] text-ink-700">
              To be a leading center in communication innovation, creating positive impact on
              quality of life and sustainability nationally and regionally.
            </p>
            <h3 className="mt-8 text-h3-m md:text-h3 text-ink-900">Mission</h3>
            <p className="mt-3 text-[17px] leading-[1.7] text-ink-700">
              Build knowledge, develop innovation, and connect networks to raise the
              communication capacity of Thai society sustainably — with every project aligned
              with the Sustainable Development Goals.
            </p>
            {/* SDG dot row appears in the mission section only (BRAND PART H) */}
            <Link
              href="/en/sdg"
              aria-label="See our work across all 17 Sustainable Development Goals"
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
          <SectionHeader locale="en" title="Our objectives" />
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
            {objectives.map((item, i) => (
              <Reveal key={item.number} delay={stagger(i)}>
                <p className="text-[15px] font-medium leading-[1.6] text-ink-500">{item.number}</p>
                <h3 className="mt-2 text-h3-m md:text-h3 text-ink-900">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-ink-700">{item.descriptionEn}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership — no SDG colors (BRAND PART H) */}
      <section id="leadership" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24">
        <SectionHeader
          locale="en"
          title="Leadership"
          description="Experienced academics and practitioners with international research and partnership networks"
        />

        <div className="mt-14 space-y-24">
          {leadership.map((person, index) => (
            <article key={person.slug} id={person.slug} className="scroll-mt-24">
              <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12 md:gap-10">
                <div className={`md:col-span-4 ${index % 2 === 1 ? "md:order-2" : ""}`}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-ink-300 bg-ink-100">
                    <Image
                      src={person.image}
                      alt={`${person.nameEn} — ${person.role}, Faculty of Communication Arts, Chulalongkorn University`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </div>

                <div className={`md:col-span-8 ${index % 2 === 1 ? "md:order-1" : ""}`}>
                  <p className="text-[13px] font-medium uppercase leading-[1.4] tracking-[0.12em] text-pink-500">
                    {person.role}
                  </p>
                  <h3 className="mt-1 text-h2-m md:text-h2 text-ink-900">{person.nameEn}</h3>
                  <p className="text-[15px] leading-[1.6] text-ink-500">{person.name}</p>
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
                  <p className="mt-5 max-w-prose text-[17px] leading-[1.7] text-ink-700">
                    {person.focus}
                  </p>

                  <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <h4 className="mb-2 text-[15px] font-medium text-ink-900">Education</h4>
                      <ul className="space-y-2 text-[15px] leading-[1.6] text-ink-700">
                        {person.education.map((item) => (
                          <li key={item} className="border-l-2 border-ink-300 pl-3">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2 text-[15px] font-medium text-ink-900">Experience</h4>
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
                        <h4 className="mb-3 text-[15px] font-medium text-ink-900">
                          News & impact
                        </h4>
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
                                {h.titleEn}
                              </p>
                              <p className="mt-1 text-[13px] leading-[1.6] text-ink-700">
                                {h.summaryEn}
                              </p>
                              {h.href && (
                                <a
                                  href={h.href.startsWith("/") ? `/en${h.href}` : h.href}
                                  {...(h.href.startsWith("/")
                                    ? {}
                                    : { target: "_blank", rel: "noopener noreferrer" })}
                                  className="mt-2 inline-flex items-center text-[13px] font-medium text-pink-500 hover:text-pink-700"
                                >
                                  {h.href.startsWith("/") ? "Read more" : "View source"}
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
                      Selected publications
                    </h4>
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
                                <p className="text-[11px] text-ink-500">citations</p>
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
          Names, titles, and profiles reference ORCID, Google Scholar, Scopus, ResearchGate, and
          the Department of Public Relations faculty pages (fact-checked August 2026). Metrics
          for Dr. Smith Boonchutima reference Google Scholar and Scopus Author ID 56167805200.
        </p>
      </section>

      <section className="border-y border-ink-300 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <SectionHeader
            locale="en"
            title="Center researchers"
            description="Researchers from many disciplines driving communication innovation, sustainability, and emerging technology"
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
                      alt={`${person.nameEn} — ${person.role}, Chulalongkorn University`}
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
                  <p className="text-[13px] font-medium text-ink-500">{person.role}</p>
                  <h3 className="mt-1 text-h3-m md:text-h3 leading-snug text-ink-900">
                    {person.nameEn}
                  </h3>
                  <p className="mt-2 text-[13px] leading-[1.6] text-ink-500">{person.facultyEn}</p>
                  <p className="mt-3 text-[15px] leading-[1.6] text-ink-700">
                    {person.focusEn ?? person.focus}
                  </p>
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

      <TeamAndPartners locale="en" />

      <section className="bg-ink-900">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <SectionIcon role="invite" onDark className="mx-auto mb-4 h-9 w-9" />
          <h2 className="text-h2-m md:text-h2 text-white">Interested in working with us?</h2>
          <p className="mx-auto mt-3 max-w-prose text-[17px] leading-[1.7] text-ink-300">
            We would love to hear from you and build projects with real social impact together.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/en/collaborate">Contact us</Button>
          </div>
        </div>
      </section>

      </main>
      <Footer locale="en" />
    </div>
  );
}
