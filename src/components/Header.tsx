"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type HeaderProps = {
  active?: "home" | "about" | "expertise" | "impact" | "collaborate";
};

const LOGO_SRC =
  "https://static.wixstatic.com/media/8e0d14_0564f38949dd4891a2359cb0daa61bb4~mv2.png/v1/fill/w_400,h_120,al_c,q_90,enc_auto/logo-communication-innovation.png";

export default function Header({ active }: HeaderProps) {
  const [open, setOpen] = useState(false);

  const linkClass = (page: string) =>
    active === page
      ? "text-pink-500 font-semibold"
      : "text-neutral-700 hover:text-pink-500 transition-colors";

  const mobileLinkClass = (page: string) =>
    active === page
      ? "text-pink-500 font-semibold text-lg"
      : "text-neutral-800 text-lg hover:text-pink-500 transition-colors";

  return (
    <header className="sticky top-0 z-50 bg-neutral-50/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center shrink-0"
          onClick={() => setOpen(false)}
          aria-label="ComInnoCenter หน้าแรก"
        >
          <Image
            src={LOGO_SRC}
            alt="โลโก้ Communication Innovation Center — จากเว็บเดิม ComInnoCenter"
            width={180}
            height={54}
            className="h-10 w-auto md:h-12 object-contain"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/about" className={linkClass("about")}>
            เกี่ยวกับเรา
          </Link>
          <Link href="/expertise" className={linkClass("expertise")}>
            ความเชี่ยวชาญ
          </Link>
          <Link href="/impact" className={linkClass("impact")}>
            ผลงาน
          </Link>
          <Link href="/collaborate" className={linkClass("collaborate")}>
            ร่วมงานกับเรา
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/en"
            className="text-sm font-medium text-neutral-600 hover:text-blue-700 hidden sm:block"
          >
            EN
          </Link>

          <Link
            href="/collaborate"
            className="hidden sm:inline-flex items-center px-5 py-2.5 rounded-lg bg-pink-500 text-white text-sm font-medium hover:bg-pink-600 transition-colors"
          >
            ร่วมงานกับเรา
          </Link>

          <button
            type="button"
            className="md:hidden p-2 -mr-2 text-neutral-700"
            onClick={() => setOpen(!open)}
            aria-label={open ? "ปิดเมนู" : "เปิดเมนู"}
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
            <Link href="/about" className={mobileLinkClass("about")} onClick={() => setOpen(false)}>
              เกี่ยวกับเรา
            </Link>
            <Link href="/expertise" className={mobileLinkClass("expertise")} onClick={() => setOpen(false)}>
              ความเชี่ยวชาญ
            </Link>
            <Link href="/impact" className={mobileLinkClass("impact")} onClick={() => setOpen(false)}>
              ผลงาน
            </Link>
            <Link href="/collaborate" className={mobileLinkClass("collaborate")} onClick={() => setOpen(false)}>
              ร่วมงานกับเรา
            </Link>
            <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
              <Link href="/en" className="text-sm font-medium text-neutral-600" onClick={() => setOpen(false)}>
                EN
              </Link>
              <Link
                href="/collaborate"
                onClick={() => setOpen(false)}
                className="inline-flex items-center px-5 py-2.5 rounded-lg bg-pink-500 text-white text-sm font-medium"
              >
                ร่วมงานกับเรา
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
