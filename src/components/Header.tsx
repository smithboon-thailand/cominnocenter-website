"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SiteSearch from "@/components/search/SiteSearch";

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
  /** Default: Thai (th). Pass "en" on English routes. */
  locale?: "th" | "en";
  /**
   * ปลายทางของปุ่มสลับภาษา เมื่อหน้านั้นไม่ได้อยู่ในเมนูหลัก
   *
   * ปกติ Header คำนวณจาก `active` ซึ่งเป็นคีย์ของหน้าในเมนู แต่หน้าอย่าง
   * นโยบายความเป็นส่วนตัวไม่มีคีย์ (และไม่ควรมี เพราะไม่ควรอยู่ในเมนูหลัก)
   * ถ้าไม่ส่งค่านี้ ปุ่มจะพากลับไปหน้าแรกของอีกภาษาแทนที่จะเป็นหน้าเดียวกัน
   */
  switchHref?: string;
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
    openMenu: "เปิดเมนู",
    closeMenu: "ปิดเมนู",
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
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
} as const;

function pathFor(locale: "th" | "en", page: PageKey): string {
  const base = locale === "en" ? "/en" : "";
  if (page === "home") return base || "/";
  return `${base}/${page}`;
}

/** Map current page to the equivalent URL in the other language */
function switchLocaleHref(locale: "th" | "en", active?: PageKey): string {
  const page = active || "home";
  if (locale === "th") {
    // switch to EN
    return page === "home" ? "/en" : `/en/${page}`;
  }
  // switch to TH
  return page === "home" ? "/" : `/${page}`;
}

export default function Header({ active, locale = "th", switchHref }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const t = NAV[locale];
  const otherLabel = locale === "th" ? "EN" : "TH";
  const otherHref = switchHref ?? switchLocaleHref(locale, active);

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
            alt={locale === "th" ? "โลโก้ศูนย์เชี่ยวชาญเฉพาะทางด้านนวัตกรรมการสื่อสาร" : "Communication Innovation Center logo"}
            width={180}
            height={54}
            className="h-10 w-auto lg:h-12 object-contain"
            priority
          />
        </Link>

        {/* ที่ md เมนูมี 8 รายการและชื่ออังกฤษยาวกว่าไทย — บีบทั้ง gap และโลโก้
            ให้พอดี 768px (เมนูอังกฤษเคยล้น 6px ตั้งแต่เพิ่มรายการ "Research") */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-8 text-sm font-medium">
          <Link href={pathFor(locale, "home")} className={linkClass("home")}>
            {t.home}
          </Link>
          <Link href={pathFor(locale, "about")} className={linkClass("about")}>
            {t.about}
          </Link>
          <Link href={pathFor(locale, "expertise")} className={linkClass("expertise")}>
            {t.expertise}
          </Link>
          <Link href={pathFor(locale, "impact")} className={linkClass("impact")}>
            {t.impact}
          </Link>
          <Link href={pathFor(locale, "research")} className={linkClass("research")}>
            {t.research}
          </Link>
          <Link href={pathFor(locale, "sdg")} className={linkClass("sdg")}>
            {t.sdg}
          </Link>
          <Link href={pathFor(locale, "media")} className={linkClass("media")}>
            {t.media}
          </Link>
          <Link href={pathFor(locale, "collaborate")} className={linkClass("collaborate")}>
            {t.collaborate}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <SiteSearch locale={locale} />

          <Link
            href={otherHref}
            className="text-sm font-medium text-neutral-600 hover:text-blue-700 hidden sm:block"
            hrefLang={locale === "th" ? "en" : "th"}
          >
            {otherLabel}
          </Link>

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
            <Link
              href={pathFor(locale, "home")}
              className={mobileLinkClass("home")}
              onClick={() => setOpen(false)}
            >
              {t.home}
            </Link>
            <Link
              href={pathFor(locale, "about")}
              className={mobileLinkClass("about")}
              onClick={() => setOpen(false)}
            >
              {t.about}
            </Link>
            <Link
              href={pathFor(locale, "expertise")}
              className={mobileLinkClass("expertise")}
              onClick={() => setOpen(false)}
            >
              {t.expertise}
            </Link>
            <Link
              href={pathFor(locale, "impact")}
              className={mobileLinkClass("impact")}
              onClick={() => setOpen(false)}
            >
              {t.impact}
            </Link>
            <Link
              href={pathFor(locale, "research")}
              className={mobileLinkClass("research")}
              onClick={() => setOpen(false)}
            >
              {t.research}
            </Link>
            <Link
              href={pathFor(locale, "sdg")}
              className={mobileLinkClass("sdg")}
              onClick={() => setOpen(false)}
            >
              {t.sdg}
            </Link>
            <Link
              href={pathFor(locale, "media")}
              className={mobileLinkClass("media")}
              onClick={() => setOpen(false)}
            >
              {t.media}
            </Link>
            <Link
              href={pathFor(locale, "collaborate")}
              className={mobileLinkClass("collaborate")}
              onClick={() => setOpen(false)}
            >
              {t.collaborate}
            </Link>
            <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
              <Link
                href={otherHref}
                className="text-sm font-medium text-neutral-600"
                onClick={() => setOpen(false)}
              >
                {otherLabel}
              </Link>
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
