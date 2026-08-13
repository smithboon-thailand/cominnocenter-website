import Link from "next/link";

const services = [
  {
    title: "Book & Printing",
    titleTh: "หนังสือและการพิมพ์",
    description: "ออกแบบและผลิตสื่อสิ่งพิมพ์ หนังสือ และเอกสารคุณภาพสูง",
  },
  {
    title: "Motion Effect & AR",
    titleTh: "โมชันและ Augmented Reality",
    description: "สร้างประสบการณ์สื่อแบบโต้ตอบด้วย Motion และเทคโนโลยี AR",
  },
  {
    title: "Video Production",
    titleTh: "การผลิตวิดีโอ",
    description: "ผลิตวิดีโอคุณภาพสูงสำหรับงานสื่อสาร แคมเปญ และองค์กร",
  },
  {
    title: "Training",
    titleTh: "การอบรม",
    description: "ออกแบบและจัดอบรมด้านนวัตกรรมการสื่อสารให้กับบุคลากรและองค์กร",
  },
  {
    title: "Research & Evaluation",
    titleTh: "วิจัยและประเมินผล",
    description: "วิจัยเชิงลึกและประเมินผลโครงการสื่อสารอย่างเป็นระบบ",
  },
  {
    title: "Communication Design",
    titleTh: "การออกแบบการสื่อสาร",
    description: "ออกแบบกลยุทธ์และสื่อสารให้สอดคล้องกับเป้าหมายขององค์กร",
  },
  {
    title: "Campaign Management",
    titleTh: "การบริหารแคมเปญ",
    description: "วางแผนและบริหารแคมเปญเพื่อสร้างการเปลี่ยนแปลงเชิงพฤติกรรม",
  },
  {
    title: "Seminar",
    titleTh: "สัมมนา",
    description: "จัดสัมมนาและเวทีแลกเปลี่ยนความรู้ด้านนวัตกรรมการสื่อสาร",
  },
  {
    title: "Marketing Event",
    titleTh: "กิจกรรมทางการตลาด",
    description: "ออกแบบและดำเนินกิจกรรมที่เชื่อมโยงแบรนด์กับผู้คนอย่างมีประสิทธิภาพ",
  },
];

export default function ExpertisePage() {
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
            <Link href="/expertise" className="text-pink-500 font-semibold">
              ความเชี่ยวชาญ
            </Link>
            <Link href="/impact" className="hover:text-pink-500 transition-colors">
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
            ความเชี่ยวชาญ
            <br />
            <span className="text-blue-700">ของเรา</span>
          </h1>
          <p className="mt-6 text-lg text-neutral-600 leading-relaxed max-w-2xl">
            เรามีความเชี่ยวชาญหลากหลายด้าน เพื่อเปลี่ยนนวัตกรรมการสื่อสาร
            ให้เกิดผลกระทบจริงต่อคุณภาพชีวิตและความยั่งยืน
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="group p-6 rounded-2xl border border-neutral-200 bg-white hover:border-pink-300 hover:shadow-md transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-5">
                <div className="w-3 h-3 rounded-full bg-blue-700" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-blue-700 transition-colors">
                {service.titleTh}
              </h3>
              <p className="text-sm text-neutral-500 mt-1">{service.title}</p>
              <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold">
            สนใจบริการด้านใดเป็นพิเศษ?
          </h2>
          <p className="mt-3 text-blue-100 max-w-xl mx-auto">
            บอกเราได้เลย เราพร้อมออกแบบแนวทางที่เหมาะสมกับองค์กรของคุณ
          </p>
          <Link
            href="/collaborate"
            className="inline-flex items-center mt-8 px-8 py-3.5 rounded-lg bg-pink-500 text-white font-medium hover:bg-pink-600 transition-colors"
          >
            ติดต่อเรา
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
