import Image from "next/image";
import HeroArtwork from "@/components/effects/HeroArtwork";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DisplayHeading from "@/components/ui/DisplayHeading";
import SectionHeader from "@/components/ui/SectionHeader";
import Stat from "@/components/ui/Stat";
import Button from "@/components/ui/Button";
import ProjectCard from "@/components/ui/ProjectCard";
import VideoShowcase from "@/components/VideoShowcase";
import ContextCTA from "@/components/ui/ContextCTA";
import SectionIcon from "@/components/ui/SectionIcon";
import { YOUTUBE_CHANNEL_URL } from "@/data/videos";
import { projects } from "@/data/projects";
import { leadership } from "@/data/leadership";
import { getLocalizedProjectCopy } from "@/data/projectCopyEn";
import { partners } from "@/data/partners";
import { newsSorted, newsCover } from "@/data/news";
import { SDG, SDG_IDS } from "@/data/sdg";

export const metadata = {
  alternates: {
    canonical: "/en",
    languages: { th: "/", en: "/en", "x-default": "/" },
  },
};

const coveredGoals = SDG_IDS.filter((id) => projects.some((p) => p.sdg.includes(id))).length;

/** Featured trio — combined badges stay within the 6-color viewport cap (PART H) */
const FEATURED_SLUGS = ["chula-zero-waste", "care-d-plus", "nia-100-faces"] as const;
const featured = FEATURED_SLUGS.map((slug) => projects.find((p) => p.slug === slug)!);

const latestNews = newsSorted.slice(0, 3);

const expertiseItems = [
  {
    image: "/images/expertise/e1.webp",
    number: "01",
    title: "Training & capacity building",
    description: "Design and deliver communication innovation training for organizations",
  },
  {
    image: "/images/expertise/e2.webp",
    number: "02",
    title: "Research & evaluation",
    description: "In-depth research and systematic evaluation of communication projects",
  },
  {
    image: "/images/expertise/e3.webp",
    number: "03",
    title: "Campaigns & communication",
    description: "Strategy and campaign management for meaningful change",
  },
  {
    image: "/images/expertise/e4.webp",
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
      <main>

      {/* Hero — two-tone display per BRAND v1.2 · subtle paper background from set D */}
      <section className="relative overflow-hidden">
        {/* ภาพ hero ลอยช้าๆ + พารัลแลกซ์ + คลิปวนทับบนจอใหญ่ (ปิดเมื่อ prefers-reduced-motion) */}
        <HeroArtwork
          src="/images/home/hero-bg.webp"
          video={{ webm: "/videos/hero-loop.webm", mp4: "/videos/hero-loop.mp4" }}
          className="absolute inset-0 hidden md:block"
        />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
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
        {/* 2×2 on mobile · single row of 4 on tablet/desktop · staggered count-up */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
          <Stat value={projects.length} unit="projects" label="Delivered work" />
          <Stat value={partners.length} unit="organizations" label="Partners" delay={120} />
          <Stat value="10,000+" label="Professionals trained" delay={240} />
          <Stat value={`${coveredGoals}/17`} unit="goals" label="SDGs covered" delay={360} />
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
                description={getLocalizedProjectCopy(p).outcome}
                image={p.image}
                alt={`${p.titleEn} — project photo from the center's archive`}
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
            <div key={item.number} className="overflow-hidden rounded-lg border border-ink-300 bg-white">
              <div className="relative aspect-[4/3] sm:aspect-[16/10]">
                <Image
                  src={item.image}
                  alt={`Illustration for ${item.title}`}
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

      {/* Videos from the center's channel — the YouTube iframe loads only on play */}
      <section className="border-y border-ink-300 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader
              locale="en"
              eyebrow="Research on video"
              title="Our research, in a few minutes"
              description="Short talks on the center's studies and events, from our official YouTube channel"
            />
            <Button variant="ghost" href={YOUTUBE_CHANNEL_URL} external>
              Visit the channel ↗
            </Button>
          </div>
          <div className="mt-10">
            <VideoShowcase locale="en" />
          </div>
          {/* People who finish a research talk often want it for their own team */}
          <div className="mt-12">
            <ContextCTA
              heading="Want this knowledge inside your team?"
              sub="We design communication-innovation training around your organisation's own brief."
              href="/en/expertise#stage-empower"
              cta="See our training"
            />
          </div>
        </div>
      </section>

      {/* Center leadership — cards link to full bios on the About page (no SDG colors, PART H) */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            locale="en"
            icon="people"
            eyebrow="Our team"
            title="Center leadership"
            description="Leaders with both academic track records and hands-on experience — click for full profiles"
          />
          <Button variant="ghost" href="/en/about#leadership">
            Meet the full team
          </Button>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {leadership.map((person) => (
            <Link
              key={person.slug}
              href={`/en/about#${person.slug}`}
              className="group overflow-hidden rounded-lg border border-ink-300 bg-white transition-all duration-150 ease-brand hover:-translate-y-0.5 hover:border-ink-500 hover:shadow-sm focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-ink-100">
                <Image
                  src={person.image}
                  alt={`${person.nameEn} — ${person.role}, Faculty of Communication Arts, Chulalongkorn University`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-5">
                <p className="text-[13px] font-medium uppercase leading-[1.4] tracking-[0.12em] text-pink-500">
                  {person.role}
                </p>
                <h3 className="mt-1 text-h3-m md:text-h3 text-ink-900">{person.nameEn}</h3>
                <p className="mt-3 line-clamp-2 text-[15px] leading-[1.6] text-ink-700">
                  {person.focus}
                </p>
                <p className="mt-4 text-[13px] font-medium text-pink-500 group-hover:text-pink-700">
                  View profile →
                </p>
              </div>
            </Link>
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
      <section className="relative overflow-hidden bg-ink-900">
        <Image
          src="/images/home/cta-bg.webp"
          alt=""
          aria-hidden
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="relative mx-auto max-w-7xl px-6 py-24 text-center">
          <SectionIcon role="invite" onDark className="mx-auto mb-4 h-9 w-9" />
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

      </main>
      <Footer locale="en" />
    </div>
  );
}
