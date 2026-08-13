import Image from "next/image";
import NewsletterForm from "./NewsletterForm";

const LOGO_SRC =
  "https://static.wixstatic.com/media/8e0d14_0564f38949dd4891a2359cb0daa61bb4~mv2.png/v1/fill/w_400,h_120,al_c,q_90,enc_auto/logo-communication-innovation.png";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <Image
              src={LOGO_SRC}
              alt="โลโก้ Communication Innovation Center — จากเว็บเดิม ComInnoCenter"
              width={200}
              height={60}
              className="h-12 w-auto object-contain brightness-0 invert opacity-90"
            />
            <p className="mt-4 text-sm max-w-xs leading-relaxed">
              ศูนย์เชี่ยวชาญเฉพาะทางด้านนวัตกรรมการสื่อสาร
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
            <NewsletterForm variant="dark" />
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
