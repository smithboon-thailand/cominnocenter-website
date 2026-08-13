import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/effects/Reveal";
import GlassCard from "@/components/effects/GlassCard";
import AnimatedCounter from "@/components/effects/AnimatedCounter";

const objectives = [
  {
    number: "01",
    title: "Teaching & Training",
    titleTh: "การเรียนการสอนและการอบรม",
    description:
      "พัฒนาองค์ความรู้และจัดอบรมด้านนวัตกรรมการสื่อสาร ให้กับบุคลากร องค์กร และผู้ที่สนใจนำไปใช้จริง",
  },
  {
    number: "02",
    title: "Community Advocacy",
    titleTh: "การขับเคลื่อนสังคม",
    description:
      "สร้างการรับรู้และขับเคลื่อนประเด็นสำคัญ เพื่อคุณภาพชีวิตและความยั่งยืน ผ่านการสื่อสารที่มีประสิทธิภาพ",
  },
  {
    number: "03",
    title: "Tools & Innovation",
    titleTh: "เครื่องมือและนวัตกรรม",
    description:
      "วิจัยและพัฒนาเครื่องมือ แนวทางปฏิบัติ และนวัตกรรมการสื่อสาร ที่เป็นประโยชน์ต่อสังคมและองค์กร",
  },
];

const media = (id: string, ext: string = "jpg") =>
  `https://static.wixstatic.com/media/${id}~mv2.${ext}/v1/fill/w_800,h_1000,al_c,q_85,enc_auto/${id}~mv2.${ext}`;

type SocialLink = {
  label: string;
  href: string;
};

type Publication = {
  title: string;
  venue: string;
  year: number;
  citations?: number;
};

type Leader = {
  name: string;
  nameEn: string;
  role: string;
  roleTh: string;
  image: string;
  alt: string;
  education: string[];
  work: string[];
  focus: string;
  email?: string;
  metrics: { label: string; value: number; suffix?: string }[];
  links: SocialLink[];
  publications: Publication[];
  metricsNote: string;
};

/**
 * ข้อมูลอ้างอิง:
 * - Faculty directory: https://www.commarts.chula.ac.th/th/department-pr/
 * - Google Scholar Smith: https://scholar.google.com/citations?user=LKEmLP0AAAAJ&hl=en
 * - Kudos Smith: https://www.growkudos.com/profile/smith_boonchutima
 * - Google Scholar Pavel: 1v6dmxQAAAAJ
 * - ISCM: https://www.iscm.commarts.chula.ac.th/faculty-staff/
 */
const leadership: Leader[] = [
  {
    name: "รศ.ดร.สมิทธิ์ บุญชุติมา",
    nameEn: "Assoc. Prof. Dr. Smith Boonchutima",
    role: "Head of Research Operations Unit",
    roleTh: "หัวหน้าศูนย์ / Head of Research Operations Unit",
    image: media("8e0d14_ecc50ab1da21439b9bc9043a1e5c9b6b"),
    alt: "รศ.ดร.สมิทธิ์ บุญชุติมา หัวหน้าศูนย์ — ภาพจากหน้า Smith.B เว็บเดิม ComInnoCenter",
    education: [
      "Doctor of Philosophy in Sports Science, Chulalongkorn University, 2018",
      "Transnational Communications & The Global Media, University of London, 2548",
      "Master of Arts in Mass Communication (Advertising), Chulalongkorn University, 2000",
      "Bachelor of Communication Arts (Advertising) (First-Class Honors), Chulalongkorn University, 2000",
    ],
    work: [
      "Associate Professor, Department of Public Relations, Faculty of Communication Arts, Chulalongkorn University (2007–Present)",
      "Head, Center of Excellence in Communication Innovation for Development of Quality of Life and Sustainability (2024–Present)",
      "President, Asian Congress for Media and Communication (2024–Present)",
    ],
    focus:
      "Health Communication, Risk Communication, Digital Media, Transnational Communication, Social Media Research, Public Relations",
    email: "smith.b@chula.ac.th",
    metrics: [
      { label: "Citations", value: 263 },
      { label: "h-index", value: 9 },
      { label: "i10-index", value: 9 },
    ],
    metricsNote:
      "อ้างอิง Google Scholar (user=LKEmLP0AAAAJ) — Citations 263 · h-index 9 · i10-index 9 (Since 2020: 192 / 9 / 7)",
    links: [
      { label: "Google Scholar", href: "https://scholar.google.com/citations?user=LKEmLP0AAAAJ&hl=en" },
      { label: "ORCID", href: "https://orcid.org/0000-0001-7412-4506" },
      { label: "ResearchGate", href: "https://www.researchgate.net/profile/Smith-Boonchutima" },
      { label: "Kudos", href: "https://www.growkudos.com/profile/smith_boonchutima" },
      {
        label: "Faculty Profile",
        href: "https://www.commarts.chula.ac.th/th/department-pr/",
      },
    ],
    publications: [
      {
        title:
          "Longitudinal study of Thai people media exposure, knowledge, and behavior on dengue fever prevention and control",
        venue: "Journal of Infection and Public Health",
        year: 2017,
        citations: 52,
      },
      {
        title:
          "Utilization of dating apps by men who have sex with men for persuading other men toward substance use",
        venue: "Psychology Research and Behavior Management",
        year: 2017,
        citations: 40,
      },
      {
        title:
          "The impact of VTubers and streamers on the purchase intention of otaku and non-otaku respondents",
        venue: "Basic and Applied Social Psychology",
        year: 2023,
        citations: 19,
      },
      {
        title:
          "Evaluation of public health communication performance by Stufflebeam's CIPP model: A case study of Thailand's department of disease control",
        venue: "Journal of Business and Behavioral Sciences",
        year: 2013,
        citations: 15,
      },
    ],
  },
  {
    name: "ผศ.ดร.ธีรดา จงกลรัตนาภรณ์",
    nameEn: "Asst. Prof. Dr. Teerada (Ne) Chongkolrattanaporn",
    role: "Deputy Head of Research Operations Unit",
    roleTh: "รองหัวหน้าศูนย์ / Deputy Head of Research Operations Unit",
    image: media("25218b_89b42fbbe4814a6482683b96cc6f59e7"),
    alt: "ผศ.ดร.ธีรดา จงกลรัตนาภรณ์ รองหัวหน้าศูนย์ — ภาพจากหน้า Teerada.Ne เว็บเดิม ComInnoCenter",
    education: [
      "Ph.D. International Communication, Macquarie University, Australia, 2013",
      "Ph.D. Communication Arts, Chulalongkorn University, Thailand, 2012",
      "M.A. Speech and Communication Studies, San Francisco State University, USA, 2005",
      "B.A. English, Chulalongkorn University, Thailand, 2002",
    ],
    work: [
      "Head of the Department of Public Relations, Faculty of Communication Arts, Chulalongkorn University (2022–Present)",
      "Assistant Professor, Department of Public Relations, Faculty of Communication Arts, Chulalongkorn University (2009–Present)",
      "Deputy Dean of Research and International Affairs, 2017",
    ],
    focus:
      "Crisis Communication, Environmental Communications, Persuasion and Negotiation, International Image and Reputation, Framing Theory and Public Relations Campaigns",
    metrics: [
      { label: "Publications", value: 15, suffix: "+" },
      { label: "Thesis advised", value: 25, suffix: "+" },
      { label: "Years in academia", value: 20, suffix: "+" },
    ],
    metricsNote: "อ้างอิงหน้าโปรไฟล์ Teerada.Ne บนเว็บเดิม ComInnoCenter",
    links: [
      {
        label: "LinkedIn",
        href: "https://th.linkedin.com/in/teerada-chongkolrattanaporn-058588b2",
      },
      { label: "ORCID", href: "https://orcid.org/0000-0003-2785-8595" },
      {
        label: "Faculty Profile",
        href: "https://www.commarts.chula.ac.th/th/department-pr/",
      },
    ],
    publications: [
      {
        title:
          "Cognitive Load Theory in Online Education: Leveraging Interactive Media, Testing, Interaction and to Enhance Engagement and Active Learning",
        venue: "IEEE TENCON (with S. Boonchutima & W. Kongchan)",
        year: 2023,
        citations: 7,
      },
      {
        title: "Research on university students and techno-stress during COVID-19 pandemic",
        venue: "Learning Innovation Center / INTI Symposium",
        year: 2021,
      },
      {
        title: "Crisis, environmental & international image communication (selected works)",
        venue: "Faculty of Communication Arts, Chulalongkorn University",
        year: 2022,
      },
    ],
  },
  {
    name: "รศ.ดร. Pavel Slutskiy",
    nameEn: "Assoc. Prof. Dr. Pavel Slutskiy",
    role: "Deputy Head of Research Operations Unit",
    roleTh: "รองหัวหน้าศูนย์ / Deputy Head of Research Operations Unit",
    image: media("8e0d14_bb83dfe119da43c19b9ba2cc2480023f"),
    alt: "Assoc. Prof. Dr. Pavel Slutskiy รองหัวหน้าศูนย์ — ภาพจากเว็บเดิม ComInnoCenter",
    education: [
      "Ph.D., Saint-Petersburg State University (2008) — Journalism (Political Science)",
      "M.A./B.A. (cum laude) Public Relations — double degree, Saint-Petersburg State Electrotechnical University and Towson University, USA (1996–2001)",
    ],
    work: [
      "Associate Professor, Faculty of Communication Arts, Chulalongkorn University (October 2014–Present)",
      "Faculty, Faculty of Journalism, PR and Advertising, Saint-Petersburg State University (September 2007–September 2014)",
      "Faculty, PR Department, Saint-Petersburg State Electrotechnical University / LETI (September 2001–September 2009)",
    ],
    focus:
      "Political and legal philosophy of communication, communication theory, cross-cultural communication, strategic communication and public relations",
    email: "pavel.a@chula.ac.th",
    metrics: [
      { label: "Citations (RG)", value: 150 },
      { label: "Publications (RG)", value: 78 },
      { label: "Top paper cites", value: 47 },
    ],
    metricsNote: "อ้างอิง ResearchGate และ Google Scholar (user=1v6dmxQAAAAJ)",
    links: [
      { label: "Google Scholar", href: "https://scholar.google.com/citations?user=1v6dmxQAAAAJ&hl=en" },
      { label: "ResearchGate", href: "https://www.researchgate.net/profile/Pavel-Slutskiy" },
      {
        label: "Faculty Profile",
        href: "https://www.iscm.commarts.chula.ac.th/faculty-staff/",
      },
    ],
    publications: [
      {
        title: "Companies’ accountability in sustainability: A comparative analysis of SDGs in five countries",
        venue: "Sustainable Development Goals in the Asian Context",
        year: 2016,
        citations: 47,
      },
      {
        title: "The phenomenon of Trump’s popularity in Russia: Media analysis perspective",
        venue: "American Behavioral Scientist",
        year: 2017,
        citations: 31,
      },
      {
        title: "Communication and Libertarianism",
        venue: "Springer (Book)",
        year: 2021,
        citations: 14,
      },
      {
        title: "Credibility of the official COVID communication in Thailand",
        venue: "American Behavioral Scientist (with S. Boonchutima)",
        year: 2022,
        citations: 6,
      },
    ],
  },
];

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
              ศูนย์ความเป็นเลิศ
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
                  ศูนย์ความเป็นเลิศด้านนวัตกรรมการสื่อสาร ก่อตั้งขึ้นภายใต้คณะนิเทศศาสตร์
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
                    <h3 className="mt-1 text-2xl md:text-3xl font-semibold text-neutral-900">
                      {person.name}
                    </h3>
                    <p className="text-neutral-500">{person.nameEn}</p>
                    <p className="text-xs text-neutral-400 mt-1">{person.role}</p>
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
                    <p className="mt-2 text-[11px] text-neutral-400">{person.metricsNote}</p>

                    <p className="mt-5 text-neutral-700 leading-relaxed">{person.focus}</p>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-semibold text-blue-700 mb-2">ประวัติการศึกษา</h4>
                        <ul className="space-y-2 text-sm text-neutral-600 leading-relaxed">
                          {person.education.map((item) => (
                            <li key={item} className="pl-3 border-l-2 border-pink-200">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-blue-700 mb-2">ประสบการณ์การทำงาน</h4>
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
                      <h4 className="text-sm font-semibold text-blue-700 mb-3">ผลงานเด่น</h4>
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
          ชื่อ ตำแหน่ง และประวัติอ้างอิงจากเว็บไซต์เดิม ComInnoCenter และเว็บทางการคณะนิเทศศาสตร์ จุฬาฯ
          (https://www.commarts.chula.ac.th/th/department-pr/) — เว็บคณะแสดงรายชื่อคณาจารย์ในหน้ารายชื่อภาควิชา
          ไม่มีหน้าโปรไฟล์รายบุคคลแยก ตัวเลข citation ของรศ.ดร.สมิทธิ์ อ้างอิง Google Scholar โดยตรง
        </p>
      </section>

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
