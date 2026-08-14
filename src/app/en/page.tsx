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
import { partners } from "@/data/partners";
import { newsSorted, newsCover } from "@/data/news";
import { SDG, SDG_IDS } from "@/data/sdg";

const coveredGoals = SDG_IDS.filter((id) => projects.some((p) => p.sdg.includes(id))).length;

/** Featured trio — combined badges stay within the 6-color viewport cap (PART H) */
const FEATURED_SLUGS = ["chula-zero-waste", "care-d-plus", "nia-100-faces"] as const;
const featured = FEATURED_SLUGS.map((slug) => projects.find((p) => p.slug === slug)!);

const latestNews = newsSorted.slice(0, 3);

const expertiseItems = [
  {
    number: "01",
    title: "Training & capacity building",
    description: "Design and deliver communication innovation training for organizations",
  },
  {
    number: "02",
    title: "Research & evaluation",
    description: "In-depth research and systematic evaluation of communication projects",
  },
  {
    number: "03",
    title: "Campaigns & communication",
    description: "Strategy and campaign management for meaningful change",
  },
  {
    number: "04",
    title: "Video & multimedia",
    description: "High-quality video, AR, and creative media production",
  },
];

function enDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${months[m - 1]} ${d}, ${y}`;
}

export default function EnglishHomePage() {
  return (
    <div className="min-h-screen">
      <Header active="home" locale="en" />

      {/* Hero — two-tone display per BRAND v1.2 */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <p className="mb-4 text-[13px] font-medium uppercase leading-[1.4] tracking-[0.12em] text-pink-500">
          Faculty of Communication Arts, Chulalongkorn University
        </p>
        <DisplayHeading
          primary="Communication innovation"
          secondary="for sustainable quality of life"
        />
        <p className="mt-6 max-w-prose text-[17px] leading-[1.7] text-ink-700">
          A center of excellence that turns communication research into practical tools that
          change people&apos;s lives. Every project is measurable and aligned with the
          Sustainable Development Goals.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/en/collaborate">Collaborate with us</Button>
          <Button variant="secondary" href="/en/impact">
            View our work
          </Button>
        </div>
      </section>

      {/* SDG marquee — 17 color dots, slow scroll, pauses on hover */}
      <div className="border-y border-ink-300 bg-white">
        <div className="overflow-hidden" aria-label="All 17 Sustainable Development Goals">
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
                    {id} {SDG[id].en}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-6 pb-3 text-right">
          <Link
            href="/en/sdg"
            className="text-[13px] font-medium text-pink-500 hover:text-pink-700"
          >
            See our work across all 17 goals →
          </Link>
        </div>
      </div>

      {/* Real numbers from data, not marketing claims (Rigorous — PART A1) */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <Stat value={projects.length} unit="projects" label="Delivered work" />
          <Stat value={partners.length} unit="organizations" label="Partners" />
          <Stat value="10,000+" unit="people" label="Professionals trained" />
          <Stat value={`${coveredGoals}/17`} unit="goals" label="SDGs covered" />
        </div>
      </section>

      {/* Featured impact */}
      <section className="border-y border-ink-300 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader
              locale="en"
              eyebrow="Featured impact"
              title="Research turned into real outcomes"
              description="Selected projects where our communication created measurable change"
            />
            <Button variant="secondary" href="/en/impact">
              View all projects
            </Button>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ProjectCard
                key={p.slug}
                href={`/en/impact/${p.slug}`}
                title={p.titleEn}
                description={p.outcome}
                image={p.image}
                alt={p.alt}
                sdgIds={p.sdg}
                locale="en"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Expertise — pure Ink, no SDG colors */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            locale="en"
            eyebrow="Expertise"
            title="Four things we do best"
            description="From research to delivery, we cover the whole communication process"
          />
          <Button variant="ghost" href="/en/expertise">
            See our services
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

      {/* Latest news — from the Phase 0-C archive */}
      <section className="border-y border-ink-300 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader locale="en" eyebrow="News & events" title="Latest from the center" />
            <Button variant="ghost" href="/en/news">
              Read all news
            </Button>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {latestNews.map((post) => (
              <Link
                key={post.slug}
                href={`/en/news/${post.slug}`}
                className="group overflow-hidden rounded-lg border border-ink-300 bg-white
                  transition-transform duration-150 ease-brand hover:-translate-y-0.5
                  focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]
                  motion-reduce:hover:translate-y-0"
              >
                <span className="relative block aspect-[16/10] overflow-hidden">
                  <Image
                    src={newsCover(post.slug)}
                    alt={`${post.titleEn} — photo from the center's news archive`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </span>
                <span className="block p-6">
                  <span className="block text-[13px] leading-[1.4] text-ink-500">
                    {enDate(post.date)}
                  </span>
                  <span className="mt-2 block text-h3-m md:text-h3 text-ink-900 line-clamp-2">
                    {post.titleEn}
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
            Have a communication challenge that needs real results?
          </h2>
          <p className="mx-auto mt-3 max-w-prose text-[17px] leading-[1.7] text-ink-300">
            Tell us about your organization and design measurable communication together.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/en/collaborate">Collaborate with us</Button>
          </div>
        </div>
      </section>

      <Footer locale="en" />
    </div>
  );
}
