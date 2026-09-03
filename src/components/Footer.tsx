import Image from "next/image";
import NewsletterForm from "./NewsletterForm";
import CookieSettingsButton from "./analytics/CookieSettingsButton";
import { EMAIL, EMAIL_HREF, PHONE_DISPLAY, PHONE_HREF } from "@/data/contact";
import { orgChannels } from "@/data/social";

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
    cookies: "การตั้งค่าคุกกี้",
    privacy: "นโยบายความเป็นส่วนตัว",
    privacyHref: "/privacy-policy",
  },
  en: {
    blurb:
      "Center of Excellence in Communication Innovation, Faculty of Communication Arts, Chulalongkorn University",
    contact: "Contact",
    newsletter: "Newsletter",
    newsletterHint: "Subscribe for collaboration opportunities and updates",
    cookies: "Cookie settings",
    privacy: "Privacy Policy",
    privacyHref: "/en/privacy-policy",
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
              alt={
                locale === "th"
                  ? "โลโก้ศูนย์เชี่ยวชาญเฉพาะทางด้านนวัตกรรมการสื่อสาร"
                  : "Communication Innovation Center logo"
              }
              width={200}
              height={60}
              className="h-12 w-auto object-contain brightness-0 invert opacity-90"
            />
            <p className="mt-4 text-sm max-w-xs leading-relaxed">{t.blurb}</p>
          </div>

          <div className="text-sm">
            <div className="text-white font-medium mb-3">{t.contact}</div>
            <p>
              <a href={EMAIL_HREF} className="hover:text-pink-400 transition-colors">
                {EMAIL}
              </a>
            </p>
            <p className="mt-1">
              <a href={PHONE_HREF} className="hover:text-pink-400 transition-colors">
                {PHONE_DISPLAY}
              </a>
            </p>
            {/* อ่านจาก data/social.ts ชุดเดียวกับที่ส่งเข้า sameAs ใน JSON-LD
                เพื่อไม่ให้สองที่หลุดตรงกันอีก (ดูเหตุผลเต็มในไฟล์นั้น) */}
            <div className="mt-4 flex flex-wrap gap-4">
              {orgChannels.map((c) => (
                <a
                  key={c.href}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors"
                >
                  {c.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-white font-medium mb-3">{t.newsletter}</div>
            <p className="text-sm mb-4">{t.newsletterHint}</p>
            <NewsletterForm variant="dark" locale={locale} />
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-neutral-800 flex flex-col gap-2 text-xs text-neutral-500 md:flex-row md:items-center md:justify-between">
          <span>
            © {new Date().getFullYear()} Center of Excellence in Communication Innovation,
            Faculty of Communication Arts, Chulalongkorn University
          </span>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <a
              href={t.privacyHref}
              className="underline-offset-2 transition-colors hover:text-pink-400 hover:underline"
            >
              {t.privacy}
            </a>
            <CookieSettingsButton label={t.cookies} />
          </div>
        </div>
      </div>
    </footer>
  );
}
