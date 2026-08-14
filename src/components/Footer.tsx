import Image from "next/image";
import NewsletterForm from "./NewsletterForm";

const LOGO_SRC = "/images/logo/logo-communication-innovation.png";

type FooterProps = {
  locale?: "th" | "en";
};

const COPY = {
  th: {
    blurb:
      "ศูนย์เชี่ยวชาญเฉพาะทางด้านนวัตกรรมการสื่อสาร คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
    contact: "ติดต่อเรา",
    newsletter: "รับข่าวสาร",
    newsletterHint: "สมัครรับจดหมายข่าวเพื่อติดตามโอกาส Collaborate",
  },
  en: {
    blurb:
      "Center of Excellence in Communication Innovation, Faculty of Communication Arts, Chulalongkorn University",
    contact: "Contact",
    newsletter: "Newsletter",
    newsletterHint: "Subscribe for collaboration opportunities and updates",
  },
} as const;

export default function Footer({ locale = "th" }: FooterProps) {
  const t = COPY[locale];

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <Image
              src={LOGO_SRC}
              alt="Communication Innovation Center logo — from original ComInnoCenter site"
              width={200}
              height={60}
              className="h-12 w-auto object-contain brightness-0 invert opacity-90"
            />
            <p className="mt-4 text-sm max-w-xs leading-relaxed">{t.blurb}</p>
          </div>

          <div className="text-sm">
            <div className="text-white font-medium mb-3">{t.contact}</div>
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
            <div className="text-white font-medium mb-3">{t.newsletter}</div>
            <p className="text-sm mb-4">{t.newsletterHint}</p>
            <NewsletterForm variant="dark" locale={locale} />
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
