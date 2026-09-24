"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SiteSearch from "@/components/search/SiteSearch";
import { HTML_LANG, localePath, type Locale } from "@/lib/locale";

type PageKey =
  | "home"
  | "about"
  | "expertise"
  | "impact"
  | "research"
  | "sdg"
  | "media"
  | "collaborate";

type HeaderProps = {
  active?: PageKey;
  /** Default: Thai (th). Pass "en" on English routes, "zh" on Chinese routes. */
  locale?: Locale;
  /**
   * ปลายทางของปุ่มสลับภาษา เมื่อหน้านั้นไม่ได้อยู่ในเมนูหลัก
   *
   * ปกติ Header คำนวณจาก `active` ซึ่งเป็นคีย์ของหน้าในเมนู แต่หน้าอย่าง
   * นโยบายความเป็นส่วนตัวไม่มีคีย์ (และไม่ควรมี เพราะไม่ควรอยู่ในเมนูหลัก)
   * ถ้าไม่ส่งค่านี้ ปุ่มจะพากลับไปหน้าแรกของอีกภาษาแทนที่จะเป็นหน้าเดียวกัน
   *
   * ระบุเฉพาะภาษาที่มีหน้านั้นจริง — ภาษาที่ไม่ระบุจะถอยไปใช้ค่าที่คำนวณจาก
   * `active` (เช่น หน้าบทสรุปงานวิจัยยังไม่มีฉบับจีน ปุ่มจีนจึงพาไปหน้ารายการ
   * งานวิจัยของภาษาจีนแทน ไม่ใช่หน้าที่ไม่มีอยู่)
   */
  switchHrefs?: Partial<Record<Locale, string>>;
};

const LOGO_SRC = "/images/logo/logo-communication-innovation.png";

const NAV = {
  th: {
    home: "หน้าแรก",
    about: "เกี่ยวกับเรา",
    expertise: "ความเชี่ยวชาญ",
    impact: "ผลงาน",
    research: "งานวิจัย",
    sdg: "SDG",
    media: "สื่อถึงเรา",
    collaborate: "ร่วมงานกับเรา",
    cta: "ร่วมงานกับเรา",
    homeAria: "ComInnoCenter หน้าแรก",
    logoAlt: "โลโก้ศูนย์เชี่ยวชาญเฉพาะทางด้านนวัตกรรมการสื่อสาร",
    openMenu: "เปิดเมนู",
    closeMenu: "ปิดเมนู",
    switchAria: "เปลี่ยนภาษา",
  },
  en: {
    home: "Home",
    about: "About",
    expertise: "Expertise",
    impact: "Impact",
    research: "Research",
    sdg: "SDG",
    media: "Media",
    collaborate: "Collaborate",
    cta: "Collaborate",
    homeAria: "ComInnoCenter home",
    logoAlt: "Communication Innovation Center logo",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    switchAria: "Change language",
  },
  zh: {
    home: "首页",
    about: "关于我们",
    expertise: "专业服务",
    impact: "项目成果",
    research: "研究成果",
    sdg: "SDG",
    media: "媒体报道",
    collaborate: "合作洽谈",
    cta: "合作洽谈",
    homeAria: "ComInnoCenter 首页",
    logoAlt: "传播创新卓越中心标志",
    openMenu: "打开菜单",
    closeMenu: "关闭菜单",
    switchAria: "切换语言",
  },
} as const;

/** ป้ายบนปุ่มสลับภาษา — เขียนด้วยอักษรของภาษาปลายทาง ให้คนที่อ่านภาษาปัจจุบันไม่ออกก็ยังหาเจอ */
const SWITCH_LABEL: Record<Locale, string> = { th: "TH", en: "EN", zh: "中文" };

const LOCALES: Locale[] = ["th", "en", "zh"];

/**
 * รายการเมนูของแต่ละภาษา — ภาษาจีนไม่มี "สื่อถึงเรา" เพราะยังไม่มีหน้า /zh/media
 * (ข่าวและสื่อเป็นเนื้อหาที่ผูกกับเวลาและภาษาไทย ตกลงกับผู้ใช้ 24 ก.ย. 2569
 * ว่าไม่แปล) เมนูจึงต้องไม่ลิงก์ไปหน้าที่ไม่มี · `check:routes` ดักลิงก์เสียไว้อีกชั้น
 */
const NAV_ITEMS: Record<Locale, readonly PageKey[]> = {
  th: ["home", "about", "expertise", "impact", "research", "sdg", "media", "collaborate"],
  en: ["home", "about", "expertise", "impact", "research", "sdg", "media", "collaborate"],
  zh: ["home", "about", "expertise", "impact", "research", "sdg", "collaborate"],
};

function pathFor(locale: Locale, page: PageKey): string {
  return localePath(locale, page === "home" ? "/" : `/${page}`);
}

/**
 * URL ของหน้าเดียวกันในภาษาเป้าหมาย — หน้าที่ภาษานั้นไม่มี (เช่น สื่อถึงเรา
 * ในภาษาจีน) พาไปหน้าแรกของภาษานั้นแทน ไม่ปล่อยให้เป็นลิงก์ 404
 */
function switchLocaleHref(target: Locale, active?: PageKey): string {
  const page = active || "home";
  if (!NAV_ITEMS[target].includes(page)) return pathFor(target, "home");
  return pathFor(target, page);
}

export default function Header({ active, locale = "th", switchHrefs }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const t = NAV[locale];
  const items = NAV_ITEMS[locale];
  const others = LOCALES.filter((l) => l !== locale).map((l) => ({
    locale: l,
    label: SWITCH_LABEL[l],
    href: switchHrefs?.[l] ?? switchLocaleHref(l, active),
    hrefLang: HTML_LANG[l],
  }));

  const linkClass = (page: string) =>
    active === page
      ? "text-pink-500 font-medium"
      : "text-neutral-700 hover:text-pink-500 transition-colors";

  const mobileLinkClass = (page: string) =>
    active === page
      ? "text-pink-500 font-medium text-lg"
      : "text-neutral-800 text-lg hover:text-pink-500 transition-colors";

  return (
    <header className="sticky top-0 z-50 bg-neutral-50/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link
          href={pathFor(locale, "home")}
          className="flex items-center shrink-0"
          onClick={() => setOpen(false)}
          aria-label={t.homeAria}
        >
          <Image
            src={LOGO_SRC}
            alt={t.logoAlt}
            width={180}
            height={54}
            className="h-10 w-auto lg:h-12 object-contain"
            priority
          />
        </Link>

        {/* ที่ md เมนูมี 8 รายการและชื่ออังกฤษยาวกว่าไทย — บีบทั้ง gap และโลโก้
            ให้พอดี 768px (เมนูอังกฤษเคยล้น 6px ตั้งแต่เพิ่มรายการ "Research") */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-8 text-sm font-medium">
          {items.map((page) => (
            <Link key={page} href={pathFor(locale, page)} className={linkClass(page)}>
              {t[page]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <SiteSearch locale={locale} />

          {/* สามภาษาแล้ว ปุ่มสลับจึงแสดงอีกสองภาษาที่เหลือเสมอ ไม่ใช่ "อีกภาษาหนึ่ง" */}
          <nav aria-label={t.switchAria} className="hidden sm:flex items-center gap-3">
            {others.map((o) => (
              <Link
                key={o.locale}
                href={o.href}
                className="text-sm font-medium text-neutral-600 hover:text-blue-700"
                hrefLang={o.hrefLang}
                lang={o.hrefLang}
              >
                {o.label}
              </Link>
            ))}
          </nav>

          {/* ช่วง md เมนูเต็มมีลิงก์ Collaborate อยู่แล้ว — ปุ่ม CTA กลับมาที่ lg เมื่อพื้นที่พอ
              ช่วง sm-md ใช้ CTA ในเมนู hamburger */}
          <Link
            href={pathFor(locale, "collaborate")}
            className="hidden lg:inline-flex items-center px-5 py-2.5 rounded-lg bg-pink-700 text-white text-sm font-medium hover:bg-pink-900 transition-colors"
          >
            {t.cta}
          </Link>

          <button
            type="button"
            className="md:hidden p-2 -mr-2 text-neutral-700"
            onClick={() => setOpen(!open)}
            aria-label={open ? t.closeMenu : t.openMenu}
          >
            {open ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-neutral-200 bg-neutral-50">
          <nav className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-5">
            {items.map((page) => (
              <Link
                key={page}
                href={pathFor(locale, page)}
                className={mobileLinkClass(page)}
                onClick={() => setOpen(false)}
              >
                {t[page]}
              </Link>
            ))}
            <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
              <div className="flex items-center gap-4" aria-label={t.switchAria}>
                {others.map((o) => (
                  <Link
                    key={o.locale}
                    href={o.href}
                    className="text-sm font-medium text-neutral-600"
                    hrefLang={o.hrefLang}
                    lang={o.hrefLang}
                    onClick={() => setOpen(false)}
                  >
                    {o.label}
                  </Link>
                ))}
              </div>
              <Link
                href={pathFor(locale, "collaborate")}
                onClick={() => setOpen(false)}
                className="inline-flex items-center px-5 py-2.5 rounded-lg bg-pink-700 text-white text-sm font-medium"
              >
                {t.cta}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
