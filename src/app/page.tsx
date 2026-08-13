import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterForm from "@/components/NewsletterForm";
import ParallaxHero from "@/components/effects/ParallaxHero";
import Reveal from "@/components/effects/Reveal";
import AnimatedCounter from "@/components/effects/AnimatedCounter";
import GlassCard from "@/components/effects/GlassCard";
import { projects } from "@/data/projects";
import { homeHighlights } from "@/data/highlights";
import VideoShowcase from "@/components/VideoShowcase";

const highlightTypeLabel: Record<string, string> = {
  research: "งานวิจัย",
  award: "รางวัล",
  media: "สื่อ / ภาพยนตร์",
  event: "กิจกรรม",
  book: "หนังสือ",
  leadership: "บทบาทผู้นำ",
};

const expertiseItems = [
  {
    title: "การอบรมและพัฒนาศักยภาพ",
    description: "ออกแบบและจัดอบรมด้านนวัตกรรมการสื่อสารให้กับองค์กร",
    icon: "01",
  },
  {
    title: "วิจัยและประเมินผล",
    description: "วิจัยเชิงลึกและประเมินผลโครงการสื่อสารอย่างเป็นระบบ",
    icon: "02",
  },
  {
    title: "แคมเปญและการสื่อสาร",
    description: "วางกลยุทธ์และบริหารแคมเปญเพื่อสร้างการเปลี่ยนแปลง",
    icon: "03",
  },
  {
    title: "วิดีโอและสื่อมัลติมีเดีย",
    description: "ผลิตสื่อวิดีโอ AR และสื่อสร้างสรรค์คุณภาพสูง",
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

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header active="home" />

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
              <p className="mt-6 text-xl md:text-2xl text-neutral-600 font-light tracking-[0.18em]">
                FOR A BETTER LIFE
              </p>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-8 text-lg text-neutral-700 max-w-xl leading-relaxed">
                ศูนย์เชี่ยวชาญเฉพาะทางด้านนวัตกรรมการสื่อสารเพื่อการพัฒนาคุณภาพชีวิตและความยั่งยืน
                คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
              </p>
            </Reveal>
            <Reveal delay={320}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/collaborate"
                  className="inline-flex items-center px-8 py-3.5 rounded-lg bg-pink-500 text-white font-medium hover:bg-pink-600 transition-all shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:-translate-y-0.5"
                >
                  ร่วมงานกับเรา
                </Link>
                <Link
                  href="/impact"
                  className="inline-flex items-center px-8 py-3.5 rounded-lg border border-blue-700/30 bg-white/60 backdrop-blur text-blue-700 font-medium hover:bg-white hover:border-blue-700 transition-all"
                >
                  ดูผลงานของเรา
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 relative hidden lg:block">
            <Reveal direction="right" delay={200}>
              <div className="relative aspect-square max-w-md ml-auto">
                <div className="absolute inset-6 rounded-full sdg-ring opacity-30 blur-sm animate-spin-slow" />
                <div className="absolute inset-10 rounded-full border border-blue-700/10" />
                <div className="absolute inset-16 rounded-full border border-pink-400/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-40 h-40 rounded-3xl glass shadow-xl flex flex-col items-center justify-center text-center p-4">
                    <div className="text-xs tracking-widest text-neutral-500 mb-1">CENTER OF</div>
                    <div className="text-lg font-semibold text-blue-700 leading-tight">
                      EXCELLENCE
                    </div>
                    <div className="mt-2 text-[10px] text-pink-500 font-medium">COMM · INNO · SDG</div>
                  </div>
                </div>
                <span className="absolute top-8 left-1/2 w-3 h-3 -ml-1.5 rounded-full bg-pink-500 shadow-lg shadow-pink-500/40 animate-pulse-glow" />
                <span className="absolute bottom-12 right-10 w-2.5 h-2.5 rounded-full bg-blue-700 shadow-lg shadow-blue-700/30" />
                <span className="absolute top-1/3 left-8 w-2 h-2 rounded-full bg-amber-400" />
                <span className="absolute bottom-1/4 left-1/4 w-2 h-2 rounded-full bg-emerald-500" />
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
              { value: 50, suffix: "+", label: "โครงการ" },
              { value: 30, suffix: "+", label: "พันธมิตร" },
              { value: 1000, suffix: "+", label: "ผู้เข้าร่วมอบรม" },
              { value: 10, suffix: "+", label: "ปีแห่งประสบการณ์" },
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
              <p className="text-sm font-medium text-pink-500 mb-3">เกี่ยวกับศูนย์</p>
              <h2 className="text-3xl md:text-4xl font-semibold text-blue-700 leading-tight">
                นวัตกรรมการสื่อสาร
                <br />
                เพื่อคุณภาพชีวิตที่ยั่งยืน
              </h2>
              <p className="mt-6 text-lg text-neutral-700 leading-relaxed">
                เราเป็นศูนย์วิจัยที่มุ่งสร้างองค์ความรู้และพัฒนานวัตกรรมการสื่อสาร
                เพื่อยกระดับคุณภาพชีวิตและความยั่งยืน ผ่านการวิจัย การพัฒนาเครื่องมือ
                การศึกษา และเครือข่ายความร่วมมือระหว่างภาครัฐ ภาคเอกชน และภาคประชาสังคม
              </p>
              <Link
                href="/about"
                className="inline-flex items-center mt-8 text-pink-500 font-medium hover:text-pink-600 group"
              >
                เรียนรู้เพิ่มเติมเกี่ยวกับเรา
                <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </Reveal>
          <Reveal direction="right" delay={120}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-pink-200/40 via-blue-100/30 to-amber-100/40 blur-xl" />
              <div className="relative rounded-3xl border border-neutral-200 bg-white p-8 md:p-10 shadow-sm">
                <div className="grid grid-cols-2 gap-4">
                  {["Teaching", "Advocacy", "Tools", "Networks"].map((t, i) => (
                    <div
                      key={t}
                      className="rounded-2xl border border-neutral-100 bg-neutral-50 p-5 hover:border-pink-200 transition-colors"
                    >
                      <div className="text-xs text-neutral-400 mb-1">0{i + 1}</div>
                      <div className="font-semibold text-blue-700">{t}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative bg-gradient-to-b from-white to-neutral-50 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <Reveal>
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold text-blue-700">
                  ความเชี่ยวชาญของเรา
                </h2>
                <p className="mt-3 text-neutral-600 max-w-xl">
                  เรามีความเชี่ยวชาญหลากหลายด้าน เพื่อตอบโจทย์การสื่อสารที่สร้างผลกระทบจริง
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <Link
                href="/expertise"
                className="text-pink-500 font-medium hover:text-pink-600 whitespace-nowrap"
              >
                ดูทั้งหมด →
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertiseItems.map((item, i) => (
              <Reveal key={item.title} delay={i * 90}>
                <GlassCard className="h-full p-6">
                  <div className="text-3xl font-bold text-pink-500/30 mb-4">{item.icon}</div>
                  <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{item.description}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights — ข่าวและผลกระทบของผู้นำ/ศูนย์ */}
      <section className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <Reveal>
            <div>
              <p className="text-sm font-medium text-pink-500 mb-2">Highlights</p>
              <h2 className="text-3xl md:text-4xl font-semibold text-blue-700">
                ข่าวและผลกระทบ
              </h2>
              <p className="mt-3 text-neutral-600 max-w-xl">
                ผลงาน รางวัล และบทบาทของผู้นำศูนย์ ที่สร้างผลกระทบต่อสังคมและวงการวิชาการ
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <Link
              href="/about"
              className="text-pink-500 font-medium hover:text-pink-600 whitespace-nowrap"
            >
              รู้จักผู้นำของเรา →
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
                  {h.titleTh}
                </h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed line-clamp-3">
                  {h.summaryTh}
                </p>
                {h.href && (
                  <a
                    href={h.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-4 text-sm font-medium text-pink-600 hover:text-pink-700"
                  >
                    อ่านแหล่งต้นทาง
                    <span className="ml-1.5 opacity-50 group-hover:translate-x-0.5 transition-transform">↗</span>
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Research Insights — YouTube */}
      <section className="relative bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <Reveal>
            <div className="mb-12">
              <p className="text-sm font-medium text-pink-500 mb-2">Research Insights</p>
              <h2 className="text-3xl md:text-4xl font-semibold text-blue-700">
                วิดีโองานวิจัย
              </h2>
              <p className="mt-3 text-neutral-600 max-w-xl">
                คลิปนำเสนองานวิจัยจากช่อง YouTube ทางการ Communication Innovation ของศูนย์
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
              <h2 className="text-3xl md:text-4xl font-semibold text-blue-700">ผลงานเด่น</h2>
              <p className="mt-3 text-neutral-600 max-w-xl">
                ตัวอย่างโครงการที่สร้างผลกระทบต่อการพัฒนาคุณภาพชีวิตและความยั่งยืน
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <Link href="/impact" className="text-pink-500 font-medium hover:text-pink-600 whitespace-nowrap">
              ดูผลงานทั้งหมด →
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredImpact.map((item, i) => (
            <Reveal key={item.slug} delay={i * 100}>
              <Link
                href={`/impact/${item.slug}`}
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
                  <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-full bg-pink-100 text-pink-700 mb-3">
                    {item.sdg}
                  </span>
                  <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{item.outcome}</p>
                </div>
              </Link>
            </Reveal>
          ))}
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
                รับข่าวสารและโอกาสความร่วมมือ
              </h2>
              <p className="mt-4 text-neutral-600 mb-8">
                สมัครรับจดหมายข่าวจากศูนย์ เพื่อติดตามผลงาน โอกาสอบรม
                และช่องทาง Collaborate ใหม่ๆ
              </p>
              <div className="max-w-md mx-auto">
                <NewsletterForm variant="light" />
              </div>
              <p className="mt-4 text-xs text-neutral-500">
                เราจะไม่ส่งสแปม และคุณสามารถยกเลิกได้ทุกเมื่อ
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-blue-700 text-white">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-pink-500 blur-3xl animate-float-slow" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-cyan-400 blur-3xl animate-float-medium" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-semibold">
              พร้อมสร้างผลกระทบไปด้วยกันหรือยัง?
            </h2>
            <p className="mt-4 text-blue-100 max-w-xl mx-auto">
              ไม่ว่าจะเป็นงานวิจัย การอบรม แคมเปญ หรือความร่วมมือในรูปแบบอื่นๆ
              เรายินดีร่วมงานกับคุณ
            </p>
            <Link
              href="/collaborate"
              className="inline-flex items-center mt-8 px-8 py-3.5 rounded-lg bg-pink-500 text-white font-medium hover:bg-pink-600 transition-all shadow-lg shadow-pink-500/30 hover:-translate-y-0.5"
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
