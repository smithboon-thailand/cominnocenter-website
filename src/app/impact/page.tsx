import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    title: "โครงการสื่อสารเพื่อคุณภาพชีวิต",
    titleEn: "Communication for Quality of Life",
    outcome: "สร้างการรับรู้และเปลี่ยนพฤติกรรมในระดับชุมชน",
    sdg: "SDG 3",
    sdgLabel: "Good Health",
    image: "https://static.wixstatic.com/media/25218b_3012f8f955424b788d79a19cd91abd99%7Emv2.jpg/v1/fit/w_1200,h_800,al_c/25218b_3012f8f955424b788d79a19cd91abd99%7Emv2.jpg",
    alt: "ภาพจากกิจกรรมของศูนย์ความเป็นเลิศด้านนวัตกรรมการสื่อสาร (ที่มา: cominnocenter.com)",
  },
  {
    title: "การพัฒนาศักยภาพบุคลากรด้านสื่อ",
    titleEn: "Media Capacity Building",
    outcome: "อบรมบุคลากรมากกว่า 1,000 คน จากหลากหลายองค์กร",
    sdg: "SDG 4",
    sdgLabel: "Quality Education",
    image: "https://static.wixstatic.com/media/25218b_4a7a9b23585c4d02bcc3566be8aadec2~mv2.jpg/v1/fit/w_1200,h_800,al_c/25218b_4a7a9b23585c4d02bcc3566be8aadec2~mv2.jpg",
    alt: "ภาพทีมงานและกิจกรรมอบรมของศูนย์ (ที่มา: cominnocenter.com)",
  },
  {
    title: "ความร่วมมือเพื่อความยั่งยืน",
    titleEn: "Partnerships for Sustainability",
    outcome: "สร้างเครือข่ายความร่วมมือระหว่างภาครัฐและภาคประชาสังคม",
    sdg: "SDG 17",
    sdgLabel: "Partnerships",
    image: "https://static.wixstatic.com/media/25218b_be1e0d6f1491498a97ae09afc2d11e44~mv2.jpg/v1/fit/w_1200,h_800,al_c/25218b_be1e0d6f1491498a97ae09afc2d11e44~mv2.jpg",
    alt: "ภาพจากโครงการความร่วมมือของศูนย์ (ที่มา: cominnocenter.com)",
  },
  {
    title: "แคมเปญรณรงค์เพื่อสังคม",
    titleEn: "Social Campaign",
    outcome: "ออกแบบแคมเปญที่สร้างการมีส่วนร่วมและเปลี่ยนทัศนคติ",
    sdg: "SDG 11",
    sdgLabel: "Sustainable Cities",
    image: "https://static.wixstatic.com/media/25218b_ce31058ea3674498810d31bf12729eac~mv2.jpg/v1/fit/w_1200,h_800,al_c/25218b_ce31058ea3674498810d31bf12729eac~mv2.jpg",
    alt: "ภาพจากโครงการแคมเปญของศูนย์ (ที่มา: cominnocenter.com)",
  },
  {
    title: "วิจัยและประเมินผลโครงการสื่อสาร",
    titleEn: "Communication Research & Evaluation",
    outcome: "พัฒนากรอบการประเมินผลที่นำไปใช้ได้จริง",
    sdg: "SDG 12",
    sdgLabel: "Responsible Consumption",
    image: "https://static.wixstatic.com/media/25218b_78275b5fdfd343f2a4f5d7472302005b~mv2.jpg/v1/fit/w_1200,h_800,al_c/25218b_78275b5fdfd343f2a4f5d7472302005b~mv2.jpg",
    alt: "ภาพจากงานวิจัยและกิจกรรมของศูนย์ (ที่มา: cominnocenter.com)",
  },
  {
    title: "สื่อสร้างสรรค์เพื่อการเรียนรู้",
    titleEn: "Creative Media for Learning",
    outcome: "ผลิตสื่อที่ช่วยเสริมการเรียนรู้และสร้างแรงบันดาลใจ",
    sdg: "SDG 4",
    sdgLabel: "Quality Education",
    image: "https://static.wixstatic.com/media/25218b_bfb45e4c56094da99ba6feba3b842fca~mv2.jpg/v1/fill/w_800,h_600,al_c,q_85/dsc00677jpg.jpg",
    alt: "ภาพจากกิจกรรมสื่อสร้างสรรค์ของศูนย์ (ที่มา: cominnocenter.com)",
  },
];

export default function ImpactPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-neutral-50/90 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold tracking-tight text-blue-700">
            ComInnoCenter
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-700">
            <Link href="/about" className="hover:text-pink-500 transition-colors">
              เกี่ยวกับเรา
            </Link>
            <Link href="/expertise" className="hover:text-pink-500 transition-colors">
              ความเชี่ยวชาญ
            </Link>
            <Link href="/impact" className="text-pink-500 font-semibold">
              ผลงาน
            </Link>
            <Link href="/collaborate" className="hover:text-pink-500 transition-colors">
              ร่วมงานกับเรา
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-neutral-600 hover:text-blue-700">
              EN
            </button>
            <Link
              href="/collaborate"
              className="hidden sm:inline-flex items-center px-5 py-2.5 rounded-lg bg-pink-500 text-white text-sm font-medium hover:bg-pink-600 transition-colors"
            >
              ร่วมงานกับเรา
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900">
            ผลงานของเรา
          </h1>
          <p className="mt-6 text-lg text-neutral-600 leading-relaxed max-w-2xl">
            ตัวอย่างโครงการที่เปลี่ยนนวัตกรรมการสื่อสารให้เกิดผลกระทบจริง
            ต่อคุณภาพชีวิตและความยั่งยืน
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group rounded-2xl border border-neutral-200 overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-full bg-pink-100 text-pink-700 mb-3">
                  {project.sdg} · {project.sdgLabel}
                </span>
                <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-blue-700 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-neutral-500 mt-1">{project.titleEn}</p>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                  {project.outcome}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold">
            อยากสร้างผลกระทบแบบนี้ไปด้วยกัน?
          </h2>
          <p className="mt-3 text-blue-100 max-w-xl mx-auto">
            บอกเราเกี่ยวกับโครงการหรือความต้องการของคุณได้เลย
          </p>
          <Link
            href="/collaborate"
            className="inline-flex items-center mt-8 px-8 py-3.5 rounded-lg bg-pink-500 text-white font-medium hover:bg-pink-600 transition-colors"
          >
            ร่วมงานกับเรา
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-300">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div>
              <div className="text-white font-semibold">ComInnoCenter</div>
              <p className="mt-1 text-sm">คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย</p>
            </div>
            <div className="text-sm">
              <a href="mailto:comminno@chula.ac.th" className="hover:text-pink-400">
                comminno@chula.ac.th
              </a>
              <span className="mx-2">·</span>
              <a href="tel:022182262" className="hover:text-pink-400">
                02-218-2262
              </a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-neutral-800 text-xs text-neutral-500">
            © {new Date().getFullYear()} Center of Excellence in Communication Innovation,
            Faculty of Communication Arts, Chulalongkorn University
          </div>
        </div>
      </footer>
    </div>
  );
}
