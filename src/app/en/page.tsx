import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import SdgBadge from "@/components/ui/SdgBadge";
import Footer from "@/components/Footer";
import NewsletterForm from "@/components/NewsletterForm";
import ParallaxHero from "@/components/effects/ParallaxHero";
import Reveal from "@/components/effects/Reveal";
import AnimatedCounter from "@/components/effects/AnimatedCounter";
import GlassCard from "@/components/effects/GlassCard";
import VideoShowcase from "@/components/VideoShowcase";
import HomeLeadership from "@/components/HomeLeadership";
import { projects } from "@/data/projects";
import { getLocalizedProjectCopy } from "@/data/projectCopyEn";
import { homeHighlights } from "@/data/highlights";
import { illustration } from "@/data/illustrations";

const heroIllust = illustration("hero-network")!;
const sdgIllust = illustration("sdg-ring")!;
const parallaxIllust = illustration("parallax-overlay")!;

const highlightTypeLabel: Record<string, string> = {
  research: "Research",
  award: "Award",
  media: "Media",
  event: "Event",
  book: "Book",
  leadership: "Leadership",
};

const expertiseItems = [
  {
    title: "Training & Capacity Building",
    description: "Design and deliver communication innovation training for organizations",
    icon: "01",
  },
  {
    title: "Research & Evaluation",
    description: "In-depth research and systematic evaluation of communication projects",
    icon: "02",
  },
  {
    title: "Campaigns & Communication",
    description: "Strategy and campaign management for meaningful change",
    icon: "03",
  },
  {
    title: "Video & Multimedia",
    description: "High-quality video, AR, and creative media production",
    icon: "04",
  },
];

const featuredImpact = projects.slice(0, 3);

const sdgLabels = [
  "No Poverty",
  "Zero Hunger",
  "Good Health",
  "Quality Education",
  "Gender Equality",
  "Clean Water",
  "Clean Energy",
  "Decent Work",
  "Innovation",
  "Reduced Inequalities",
  "Sustainable Cities",
  "Responsible Consumption",
  "Climate Action",
  "Life Below Water",
  "Life on Land",
  "Peace & Justice",
  "Partnerships",
];

export default function EnglishHomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header active="home" locale="en" />

      <ParallaxHero>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-pink-200 bg-white/70 backdrop-blur text-xs font-medium text-pink-600 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
                Faculty of Communication Arts · Chulalongkorn University
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 leading-[1.05]">
                COMMUNICATION
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-pink-500">
                  INNOVATION
                </span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 text-xl md:text-2xl text-neutral-600 font-normal tracking-[0.18em]">
                FOR A BETTER LIFE
              </p>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-8 text-lg text-neutral-700 max-w-xl leading-relaxed">
                Center of Excellence in Communication Innovation for the Development of Quality of
                Life and Sustainability, Faculty of Communication Arts, Chulalongkorn University
              </p>
            </Reveal>
            <Reveal delay={320}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/en/collaborate"
                  className="inline-flex items-center px-8 py-3.5 rounded-lg bg-pink-500 text-white font-medium hover:bg-pink-600 transition-all shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:-translate-y-0.5"
                >
                  Collaborate with us
                </Link>
                <Link
                  href="/en/impact"
                  className="inline-flex items-center px-8 py-3.5 rounded-lg border border-blue-700/30 bg-white/60 backdrop-blur text-blue-700 font-medium hover:bg-white hover:border-blue-700 transition-all"
                >
                  View our impact
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 relative hidden lg:block">
            <Reveal direction="right" delay={200}>
              <div className="relative aspect-[4/3] max-w-md ml-auto rounded-3xl overflow-hidden border border-neutral-200/80 shadow-xl shadow-blue-900/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={heroIllust.src}
                  alt={heroIllust.altEn}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="rounded-2xl glass px-4 py-3 shadow-lg">
                    <div className="text-[10px] tracking-widest text-neutral-500">
                      CENTER OF EXCELLENCE
                    </div>
                    <div className="text-sm font-semibold text-blue-700">
                      Communication · Innovation · SDG
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </ParallaxHero>

      <div className="border-y border-neutral-200 bg-white/80 backdrop-blur overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee py-3 text-xs tracking-wide text-neutral-500">
          {[...sdgLabels, ...sdgLabels].map((label, i) => (
            <span key={`${label}-${i}`} className="mx-6 inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
              {label}
            </span>
          ))}
        </div>
      </div>

      <section className="relative bg-white grain">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 50, suffix: "+", label: "Projects" },
              { value: 30, suffix: "+", label: "Partners" },
              { value: 1000, suffix: "+", label: "Trainees" },
              { value: 10, suffix: "+", label: "Years" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 80}>
                <div className="relative">
                  <div className="text-4xl md:text-5xl font-bold text-blue-700">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-2 text-sm text-neutral-600">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <div>
              <p className="text-sm font-medium text-pink-500 mb-3">About the center</p>
              <h2 className="text-3xl md:text-4xl font-semibold text-blue-700 leading-tight">
                Communication innovation
                <br />
                for sustainable quality of life
              </h2>
              <p className="mt-6 text-lg text-neutral-700 leading-relaxed">
                We are a research center dedicated to knowledge and communication innovation that
                elevates quality of life and sustainability — through research, tools, education,
                and partnerships across government, business, and civil society.
              </p>
              <Link
                href="/en/about"
                className="inline-flex items-center mt-8 text-pink-500 font-medium hover:text-pink-600 group"
              >
                Learn more about us
                <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </Reveal>
          <Reveal direction="right" delay={120}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-pink-200/40 via-blue-100/30 to-amber-100/40 blur-xl" />
              <div className="relative rounded-3xl border border-neutral-200 bg-white overflow-hidden shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={sdgIllust.src}
                  alt={sdgIllust.altEn}
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="grid grid-cols-2 gap-3 p-5">
                  {["Teaching", "Advocacy", "Tools", "Networks"].map((t, i) => (
                    <div
                      key={t}
                      className="rounded-xl border border-neutral-100 bg-neutral-50 px-4 py-3 hover:border-pink-200 transition-colors"
                    >
                      <div className="text-[10px] text-neutral-400 mb-0.5">0{i + 1}</div>
                      <div className="text-sm font-semibold text-blue-700">{t}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <HomeLeadership locale="en" />

      <section className="relative bg-gradient-to-b from-white to-neutral-50 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <Reveal>
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold text-blue-700">Our expertise</h2>
                <p className="mt-3 text-neutral-600 max-w-xl">
                  Capabilities designed to turn communication into measurable impact
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <Link
                href="/en/expertise"
                className="text-pink-500 font-medium hover:text-pink-600 whitespace-nowrap"
              >
                View all →
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertiseItems.map((item, i) => (
              <Reveal key={item.title} delay={i * 90}>
                <GlassCard className="h-full p-6">
                  <div className="text-3xl font-bold text-pink-500/30 mb-4">{item.icon}</div>
                  <h3 className="text-lg font-semibold text-neutral-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{item.description}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <Reveal>
            <div>
              <p className="text-sm font-medium text-pink-500 mb-2">Highlights</p>
              <h2 className="text-3xl md:text-4xl font-semibold text-blue-700">News & impact</h2>
              <p className="mt-3 text-neutral-600 max-w-xl">
                Selected media, awards, and leadership roles that shape the field
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <Link
              href="/en/about"
              className="text-pink-500 font-medium hover:text-pink-600 whitespace-nowrap"
            >
              Meet our leaders →
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {homeHighlights.map((h, i) => (
            <Reveal key={h.id} delay={i * 80}>
              <article className="group h-full rounded-2xl border border-neutral-200 bg-white p-6 md:p-7 hover:border-pink-200 hover:shadow-lg transition-all duration-300">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-pink-500/10 text-pink-600">
                    {highlightTypeLabel[h.type] || h.type}
                  </span>
                  <span className="text-[11px] text-neutral-400">
                    {h.date.slice(0, 4)}
                    {h.source ? ` · ${h.source}` : ""}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 leading-snug group-hover:text-blue-700 transition-colors">
                  {h.titleEn}
                </h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed line-clamp-3">
                  {h.summaryEn}
                </p>
                {h.href && (
                  <a
                    href={h.href.startsWith("/") ? `/en${h.href}` : h.href}
                    {...(h.href.startsWith("/")
                      ? {}
                      : { target: "_blank", rel: "noopener noreferrer" })}
                    className="inline-flex items-center mt-4 text-sm font-medium text-pink-600 hover:text-pink-700"
                  >
                    {h.href.startsWith("/") ? "Read more" : "Read source"}
                    <span className="ml-1.5 opacity-50">{h.href.startsWith("/") ? "→" : "↗"}</span>
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <Reveal>
            <div className="mb-12">
              <p className="text-sm font-medium text-pink-500 mb-2">Research Insights</p>
              <h2 className="text-3xl md:text-4xl font-semibold text-blue-700">Research videos</h2>
              <p className="mt-3 text-neutral-600 max-w-xl">
                Featured clips from the center’s official Communication Innovation YouTube channel
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <VideoShowcase />
          </Reveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <Reveal>
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-blue-700">Featured impact</h2>
              <p className="mt-3 text-neutral-600 max-w-xl">
                Selected projects that advance quality of life and sustainability
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <Link
              href="/en/impact"
              className="text-pink-500 font-medium hover:text-pink-600 whitespace-nowrap"
            >
              View all projects →
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredImpact.map((item, i) => {
            const copy = getLocalizedProjectCopy(item);
            return (
              <Reveal key={item.slug} delay={i * 100}>
                <Link
                  href={`/en/impact/${item.slug}`}
                  className="group block rounded-2xl border border-neutral-200 overflow-hidden bg-white hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                  </div>
                  <div className="p-6">
                    <div className="mb-3">
                      <SdgBadge id={item.sdg[0]} locale="en" />
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-blue-700 transition-colors">
                      {item.titleEn}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{copy.outcome}</p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-neutral-200">
        <div className="absolute inset-0 bg-neutral-100" />
        <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-pink-300/20 blur-3xl" />
        <div className="absolute -bottom-24 left-0 w-96 h-96 rounded-full bg-blue-400/15 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-20">
          <Reveal>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-semibold text-blue-700">
                Stay updated on collaboration opportunities
              </h2>
              <p className="mt-4 text-neutral-600 mb-8">
                Subscribe to the center newsletter for project news, training, and partnership
                calls.
              </p>
              <div className="max-w-md mx-auto">
                <NewsletterForm variant="light" locale="en" />
              </div>
              <p className="mt-4 text-xs text-neutral-500">
                We do not spam. You can unsubscribe anytime.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-blue-700 text-white">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={parallaxIllust.src}
            alt={parallaxIllust.altEn}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-blue-700/55" />
        </div>
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-pink-500 blur-3xl animate-float-slow" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-cyan-400 blur-3xl animate-float-medium" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-semibold">
              Ready to create impact together?
            </h2>
            <p className="mt-4 text-blue-100 max-w-xl mx-auto">
              Research, training, campaigns, or other partnerships — we welcome collaboration.
            </p>
            <Link
              href="/en/collaborate"
              className="inline-flex items-center mt-8 px-8 py-3.5 rounded-lg bg-pink-500 text-white font-medium hover:bg-pink-600 transition-all shadow-lg shadow-pink-500/30 hover:-translate-y-0.5"
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
