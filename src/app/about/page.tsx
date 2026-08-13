import Link from "next/link";

const objectives = [
  {
    number: "01",
    title: "Teaching & Training",
    description: "พัฒนาองค์ความรู้และจัดอบรมด้านนวัตกรรมการสื่อสารให้กับบุคลากรและองค์กร",
  },
  {
    number: "02",
    title: "Community Advocacy",
    description: "สร้างการรับรู้และขับเคลื่อนประเด็นเพื่อคุณภาพชีวิตและความยั่งยืนผ่านการสื่อสาร",
  },
  {
    number: "03",
    title: "Tools & Innovation",
    description: "วิจัยและพัฒนาเครื่องมือ นวัตกรรม และแนวทางปฏิบัติที่เป็นประโยชน์ต่อสังคม",
  },
];

const leadership = [
  {
    name: "รศ.ดร.สมิทธ์ บุญชุติมา",
    nameEn: "Assoc. Prof. Dr. Smith Boonchutima",
    role: "Head of the Center",
    bio: "ผู้อำนวยการศูนย์ความเป็นเลิศด้านนวัตกรรมการสื่อสาร",
  },
  {
    name: "ผศ.ดร.ธีรดา ชาญวิเศษ",
    nameEn: "Asst. Prof. Dr. Teerada Chongkolrattanaporn",
    role: "Deputy Head",
    bio: "รองผู้อำนวยการ",
  },
  {
    name: "Dr. Pavel Slutskiy",
    nameEn: "Dr. Pavel Slutskiy",
    role: "Deputy Head",
    bio: "รองผู้อำนวยการ",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-neutral-50/90 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold tracking-tight text-blue-700">
            ComInnoCenter
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-700">
            <Link href="/about" className="text-pink-500 font-semibold">
              เกี่ยวกับเรา
            </Link>
            <Link href="/expertise" className="hover:text-pink-500 transition-colors">
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
            เกี่ยวกับศูนย์
          </h1>
          <p className="mt-6 text-lg text-neutral-600 leading-relaxed max-w-2xl">
            ศูนย์ความเป็นเลิศด้านนวัตกรรมการสื่อสารเพื่อการพัฒนาคุณภาพชีวิตและความยั่งยืน
            คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-blue-700 mb-6">
            เรื่องราวของเรา
          </h2>
          <div className="space-y-4 text-neutral-700 leading-relaxed">
            <p>
              ศูนย์ความเป็นเลิศด้านนวัตกรรมการสื่อสาร ก่อตั้งขึ้นภายใต้คณะนิเทศศาสตร์
              จุฬาลงกรณ์มหาวิทยาลัย เพื่อเป็นศูนย์กลางในการสร้างองค์ความรู้
              พัฒนานวัตกรรม และขับเคลื่อนการสื่อสารที่ส่งผลต่อคุณภาพชีวิตและความยั่งยืน
            </p>
            <p>
              เราทำงานร่วมกับภาครัฐ ภาคเอกชน และภาคประชาสังคม
              ผ่านการวิจัย การพัฒนาเครื่องมือ การอบรม และการสร้างเครือข่ายความร่วมมือ
              เพื่อให้นวัตกรรมการสื่อสารเกิดประโยชน์อย่างแท้จริงต่อสังคม
            </p>
          </div>
        </div>
      </section>

      {/* 3 Objectives */}
      <section className="bg-white border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold text-blue-700 mb-10">
            วัตถุประสงค์หลัก
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {objectives.map((item) => (
              <div key={item.number} className="relative">
                <div className="text-5xl font-bold text-pink-500/20 mb-4">
                  {item.number}
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold text-blue-700 mb-10">
          ผู้นำของศูนย์
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leadership.map((person) => (
            <div
              key={person.name}
              className="rounded-2xl border border-neutral-200 bg-white p-6 hover:shadow-md transition-shadow"
            >
              <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-blue-100 to-pink-100 mb-5 flex items-center justify-center">
                <span className="text-sm text-neutral-500">รูปภาพ</span>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">{person.name}</h3>
              <p className="text-sm text-neutral-500 mt-0.5">{person.nameEn}</p>
              <p className="text-sm font-medium text-pink-500 mt-2">{person.role}</p>
              <p className="text-sm text-neutral-600 mt-3">{person.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold">
            สนใจร่วมงานกับเรา?
          </h2>
          <p className="mt-3 text-blue-100 max-w-xl mx-auto">
            เรายินดีรับฟังและร่วมพัฒนาโครงการที่สร้างผลกระทบจริง
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
