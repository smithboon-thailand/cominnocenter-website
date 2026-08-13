export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="text-white font-semibold text-lg">ComInnoCenter</div>
            <p className="mt-2 text-sm max-w-xs leading-relaxed">
              ศูนย์ความเป็นเลิศด้านนวัตกรรมการสื่อสาร
              คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
            </p>
          </div>

          <div className="text-sm">
            <div className="text-white font-medium mb-3">ติดต่อเรา</div>
            <p>
              <a href="mailto:comminno@chula.ac.th" className="hover:text-pink-400 transition-colors">
                comminno@chula.ac.th
              </a>
            </p>
            <p className="mt-1">
              <a href="tel:022182262" className="hover:text-pink-400 transition-colors">
                02-218-2262
              </a>
            </p>
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
  );
}
