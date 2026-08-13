import Link from "next/link";

const collaborationWays = [
  {
    title: "Partnership",
    description: "ร่วมพัฒนาโครงการและสร้างผลกระทบระยะยาวร่วมกัน",
  },
  {
    title: "Training & Capacity Building",
    description: "ออกแบบและจัดอบรมด้านนวัตกรรมการสื่อสารให้กับองค์กรของคุณ",
  },
  {
    title: "Research & Evaluation",
    description: "วิจัยและประเมินผลโครงการสื่อสารอย่างเป็นระบบและน่าเชื่อถือ",
  },
];

export default function CollaboratePage() {
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
            <Link href="/impact" className="hover:text-pink-500 transition-colors">
              ผลงาน
            </Link>
            <Link href="/collaborate" className="text-pink-500 font-semibold">
              ร่วมงานกับเรา
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-neutral-600 hover:text-blue-700">
              EN
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900">
            ร่วมสร้างผลกระทบ
            <br />
            <span className="text-blue-700">ไปด้วยกัน</span>
          </h1>
          <p className="mt-6 text-lg text-neutral-600 leading-relaxed max-w-2xl">
            ไม่ว่าจะเป็นงานวิจัย การอบรม แคมเปญ หรือความร่วมมือในรูปแบบอื่นๆ
            เรายินดีร่วมงานกับภาครัฐ ภาคเอกชน และภาคประชาสังคม
            เพื่อสร้างนวัตกรรมการสื่อสารที่ส่งผลต่อคุณภาพชีวิตและความยั่งยืน
          </p>
        </div>
      </section>

      {/* Ways to Collaborate */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collaborationWays.map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-2xl border border-neutral-200 bg-white hover:border-pink-300 hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <div className="w-3 h-3 rounded-full bg-blue-700" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">{item.title}</h3>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form + Direct Contact */}
      <section className="bg-white border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl md:text-3xl font-semibold text-blue-700 mb-2">
                ส่งข้อความถึงเรา
              </h2>
              <p className="text-neutral-600 mb-8">
                กรอกแบบฟอร์มด้านล่าง แล้วเราจะติดต่อกลับโดยเร็วที่สุด
              </p>

              <form className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                      ชื่อ-นามสกุล <span className="text-pink-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                      องค์กร / หน่วยงาน
                    </label>
                    <input
                      type="text"
                      name="organization"
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                      อีเมล <span className="text-pink-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                      เบอร์โทรศัพท์
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    ประเภทความสนใจ <span className="text-pink-500">*</span>
                  </label>
                  <select
                    name="type"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-neutral-300 bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    <option value="">เลือกประเภท</option>
                    <option value="partnership">Partnership / โครงการร่วม</option>
                    <option value="training">Training & Capacity Building</option>
                    <option value="research">Research & Evaluation</option>
                    <option value="other">อื่นๆ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    ข้อความ <span className="text-pink-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-neutral-300 bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-y"
                    placeholder="บอกเราเกี่ยวกับโครงการหรือความต้องการของคุณ..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-pink-500 text-white font-medium hover:bg-pink-600 transition-colors"
                >
                  ส่งข้อความ
                </button>
              </form>
            </div>

            {/* Direct Contact */}
            <div className="lg:col-span-2">
              <div className="bg-neutral-50 rounded-2xl p-8 border border-neutral-200 h-full">
                <h3 className="text-xl font-semibold text-blue-700 mb-6">
                  ช่องทางติดต่อโดยตรง
                </h3>

                <div className="space-y-6 text-sm">
                  <div>
                    <div className="text-neutral-500 mb-1">อีเมล</div>
                    <a
                      href="mailto:comminno@chula.ac.th"
                      className="text-neutral-900 font-medium hover:text-pink-500"
                    >
                      comminno@chula.ac.th
                    </a>
                  </div>

                  <div>
                    <div className="text-neutral-500 mb-1">โทรศัพท์</div>
                    <a
                      href="tel:022182262"
                      className="text-neutral-900 font-medium hover:text-pink-500"
                    >
                      02-218-2262
                    </a>
                  </div>

                  <div>
                    <div className="text-neutral-500 mb-1">ที่อยู่</div>
                    <p className="text-neutral-900 leading-relaxed">
                      คณะนิเทศศาสตร์
                      <br />
                      จุฬาลงกรณ์มหาวิทยาลัย
                      <br />
                      กรุงเทพมหานคร
                    </p>
                  </div>

                  <div>
                    <div className="text-neutral-500 mb-2">โซเชียลมีเดีย</div>
                    <div className="flex gap-4">
                      <a
                        href="https://www.instagram.com/comm.inno21/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-900 font-medium hover:text-pink-500"
                      >
                        Instagram
                      </a>
                      <a
                        href="https://www.facebook.com/comm.inno21"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-900 font-medium hover:text-pink-500"
                      >
                        Facebook
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-neutral-100">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl font-semibold text-blue-700">
              ยังไม่พร้อมติดต่อตอนนี้?
            </h2>
            <p className="mt-2 text-neutral-600 text-sm">
              สมัครรับจดหมายข่าวเพื่อติดตามโอกาส Collaborate ในอนาคต
            </p>
            <form className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                name="email"
                required
                placeholder="อีเมลของคุณ"
                className="flex-1 px-4 py-3 rounded-lg border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-pink-500 text-white font-medium hover:bg-pink-600 transition-colors"
              >
                สมัครรับข่าวสาร
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-300">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div>
              <div className="text-white font-semibold">ComInnoCenter</div>
              <p className="mt-1 text-sm">
                คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
              </p>
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
