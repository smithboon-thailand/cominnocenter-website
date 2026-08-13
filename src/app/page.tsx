import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-neutral-50/90 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-semibold tracking-tight text-blue-700">
              ComInnoCenter
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-700">
            <Link href="/about" className="hover:text-pink-500 transition-colors">
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
      <section className="relative max-w-7xl mx-auto px-6 pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 leading-[1.1]">
            COMMUNICATION
            <br />
            <span className="text-blue-700">INNOVATION</span>
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-neutral-600 font-light tracking-wide">
            FOR A BETTER LIFE
          </p>
          <p className="mt-8 text-lg text-neutral-700 max-w-xl leading-relaxed">
            ศูนย์ความเป็นเลิศด้านนวัตกรรมการสื่อสารเพื่อการพัฒนาคุณภาพชีวิตและความยั่งยืน
            คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/collaborate"
              className="inline-flex items-center px-8 py-3.5 rounded-lg bg-pink-500 text-white font-medium hover:bg-pink-600 transition-colors shadow-sm"
            >
              ร่วมงานกับเรา
            </Link>
            <Link
              href="/impact"
              className="inline-flex items-center px-8 py-3.5 rounded-lg border border-blue-700 text-blue-700 font-medium hover:bg-blue-50 transition-colors"
            >
              ดูผลงานของเรา
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Highlights */}
      <section className="bg-white border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-blue-700">50+</div>
              <div className="mt-2 text-sm text-neutral-600">โครงการ</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-blue-700">30+</div>
              <div className="mt-2 text-sm text-neutral-600">พันธมิตร</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-blue-700">1,000+</div>
              <div className="mt-2 text-sm text-neutral-600">ผู้เข้าร่วมอบรม</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-blue-700">10+</div>
              <div className="mt-2 text-sm text-neutral-600">ปีแห่งประสบการณ์</div>
            </div>
          </div>
        </div>
      </section>

      {/* The Center Brief */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-semibold text-blue-700">
            เกี่ยวกับศูนย์
          </h2>
          <p className="mt-6 text-lg text-neutral-700 leading-relaxed">
            เราเป็นศูนย์วิจัยที่มุ่งสร้างองค์ความรู้และพัฒนานวัตกรรมการสื่อสาร
            เพื่อยกระดับคุณภาพชีวิตและความยั่งยืน ผ่านการวิจัย การพัฒนาเครื่องมือ
            การศึกษา และเครือข่ายความร่วมมือระหว่างภาครัฐ ภาคเอกชน และภาคประชาสังคม
          </p>
          <Link
            href="/about"
            className="inline-flex items-center mt-8 text-pink-500 font-medium hover:text-pink-600"
          >
            เรียนรู้เพิ่มเติมเกี่ยวกับเรา →
          </Link>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-neutral-100 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-blue-700">
              รับข่าวสารและโอกาสความร่วมมือ
            </h2>
            <p className="mt-4 text-neutral-600">
              สมัครรับจดหมายข่าวจากศูนย์ เพื่อติดตามผลงาน โอกาสอบรม
              และช่องทาง Collaborate ใหม่ๆ
            </p>

            <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                name="email"
                required
                placeholder="อีเมลของคุณ"
                className="flex-1 px-4 py-3 rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-pink-500 text-white font-medium hover:bg-pink-600 transition-colors whitespace-nowrap"
              >
                สมัครรับข่าวสาร
              </button>
            </form>

            <p className="mt-4 text-xs text-neutral-500">
              เราจะไม่ส่งสแปม และคุณสามารถยกเลิกได้ทุกเมื่อ
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold">
            พร้อมสร้างผลกระทบไปด้วยกันหรือยัง?
          </h2>
          <p className="mt-4 text-blue-100 max-w-xl mx-auto">
            ไม่ว่าจะเป็นงานวิจัย การอบรม แคมเปญ หรือความร่วมมือในรูปแบบอื่นๆ
            เรายินดีร่วมงานกับคุณ
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
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Brand */}
            <div>
              <div className="text-white font-semibold text-lg">ComInnoCenter</div>
              <p className="mt-2 text-sm max-w-xs">
                ศูนย์ความเป็นเลิศด้านนวัตกรรมการสื่อสาร
                คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
              </p>
            </div>

            {/* Contact */}
            <div className="text-sm">
              <div className="text-white font-medium mb-3">ติดต่อเรา</div>
              <p>อีเมล: comminno@chula.ac.th</p>
              <p className="mt-1">โทร: 02-218-2262</p>
              <div className="mt-4 flex gap-4">
                <a
                  href="https://www.instagram.com/comm.inno21/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/comm.inno21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors"
                >
                  Facebook
                </a>
              </div>
            </div>

            {/* Newsletter in Footer */}
            <div>
              <div className="text-white font-medium mb-3">รับข่าวสาร</div>
              <p className="text-sm mb-4">
                สมัครรับจดหมายข่าวเพื่อติดตามโอกาส Collaborate
              </p>
              <form className="flex flex-col gap-2">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="อีเมลของคุณ"
                  className="px-3 py-2 rounded-md bg-neutral-800 border border-neutral-700 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-pink-500 text-white text-sm font-medium hover:bg-pink-600 transition-colors"
                >
                  สมัคร
                </button>
              </form>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-neutral-800 text-xs text-neutral-500">
            © {new Date().getFullYear()} Center of Excellence in Communication Innovation,
            Faculty of Communication Arts, Chulalongkorn University
          </div>
        </div>
      </footer>
    </div>
  );
}
