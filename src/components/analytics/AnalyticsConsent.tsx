"use client";

import { useCallback, useEffect, useState } from "react";
import Script from "next/script";

/**
 * แถบขอความยินยอมคุกกี้ + ตัวโหลด Google Analytics 4
 *
 * ทำไมต้องขอก่อน (30 ส.ค. 2569)
 * GA4 วางคุกกี้ระบุอุปกรณ์ (_ga) ซึ่งเข้าข่ายข้อมูลส่วนบุคคลตาม PDPA และเว็บนี้
 * มีผู้เข้าชมต่างชาติ 30+ สัญชาติจึงอาจเข้าข่าย GDPR ด้วย ทั้งสองฉบับตีความ
 * ตรงกันว่าคุกกี้เชิงสถิติต้อง**ขอก่อนวาง** ไม่ใช่วางแล้วให้ปฏิเสธทีหลัง
 *
 * แนวทางที่เลือก: **ไม่โหลดสคริปต์ของ Google เลยจนกว่าจะกดยอมรับ**
 * ไม่ใช่โหลดแล้วตั้ง consent เป็น denied (Consent Mode v2) ซึ่งยังยิง request
 * ออกไปหา Google อยู่ดี วิธีนี้อธิบายและปกป้องได้ตรงไปตรงมากว่า
 * แลกกับตัวเลขที่ต่ำกว่าความจริงราว 20–40% ตามสัดส่วนคนที่ไม่กดยอมรับ
 * (ถ้าวันหนึ่งอยากได้ modelling ของ Google คืน ค่อยเปลี่ยนไป Consent Mode v2)
 *
 * Vercel Analytics ที่ติดอยู่แล้วใน layout **ไม่อยู่ใต้แถบนี้** เพราะไม่ใช้
 * คุกกี้และไม่เก็บข้อมูลระบุตัวบุคคล — แต่ควรกล่าวถึงในหน้านโยบายความเป็นส่วนตัว
 *
 * ถ้ายังไม่ตั้ง NEXT_PUBLIC_GA_ID คอมโพเนนต์นี้จะไม่ render อะไรเลย
 * ไม่มีแถบมากวนใจทั้งที่ยังไม่ได้เก็บอะไร
 */

const STORAGE_KEY = "cominno-analytics-consent";
/** ให้ปุ่มท้ายเว็บเรียกแถบกลับมาได้โดยไม่ต้องยก state ขึ้นไปที่ layout */
export const OPEN_CONSENT_EVENT = "cominno:open-consent";

type Choice = "granted" | "denied";

const COPY = {
  th: {
    heading: "คุกกี้เพื่อสถิติการใช้งาน",
    body:
      "เว็บนี้ขอเก็บสถิติการเข้าชมด้วย Google Analytics เพื่อนำไปปรับปรุงเนื้อหาให้ตรงกับผู้อ่านมากขึ้น " +
      "ข้อมูลที่เก็บเป็นภาพรวมการใช้งานผ่านคุกกี้ ศูนย์ฯ ไม่ได้ใช้เพื่อระบุตัวบุคคล " +
      "และจะไม่เก็บอะไรเลยหากคุณไม่กดยอมรับ",
    accept: "ยอมรับ",
    decline: "ไม่ยอมรับ",
    note: "เปลี่ยนการตั้งค่านี้ได้ทุกเมื่อจากลิงก์ “การตั้งค่าคุกกี้” ท้ายเว็บ",
    label: "การตั้งค่าคุกกี้",
  },
  en: {
    heading: "Cookies for usage statistics",
    body:
      "This site would like to collect visit statistics with Google Analytics so we can improve what we publish. " +
      "The data is aggregate usage collected through cookies, the centre does not use it to identify individuals, " +
      "and nothing is collected unless you accept.",
    accept: "Accept",
    decline: "Decline",
    note: "You can change this at any time from the “Cookie settings” link in the footer.",
    label: "Cookie settings",
  },
} as const;

/**
 * ลบคุกกี้ของ GA ที่ค้างอยู่เมื่อผู้ใช้ถอนความยินยอม
 * ลบทั้งบนโฮสต์ปัจจุบันและบนโดเมนระดับบน เพราะ GA ตั้งไว้ที่ระดับ .example.com
 */
function clearGaCookies() {
  const parts = window.location.hostname.split(".");
  const registrable = parts.length > 1 ? `.${parts.slice(-2).join(".")}` : window.location.hostname;
  for (const raw of document.cookie.split(";")) {
    const name = raw.split("=")[0]?.trim();
    if (!name || !name.startsWith("_ga")) continue;
    document.cookie = `${name}=; Max-Age=0; path=/`;
    document.cookie = `${name}=; Max-Age=0; path=/; domain=${registrable}`;
  }
}

export default function AnalyticsConsent({
  gaId,
  locale,
}: {
  gaId?: string;
  locale: "th" | "en";
}) {
  /**
   * undefined = ยังไม่ได้อ่านค่าจากเบราว์เซอร์
   *
   * ต้องมีสถานะนี้แยกจาก null เพราะทุกหน้าเป็น static — เซิร์ฟเวอร์ไม่รู้ว่า
   * ผู้ใช้เคยเลือกอะไร ถ้า render แถบไปเลยตั้งแต่รอบแรกจะ hydration mismatch
   * จึงไม่ render อะไรจนกว่า effect จะอ่าน localStorage เสร็จ
   */
  const [choice, setChoice] = useState<Choice | null | undefined>(undefined);
  const t = COPY[locale];

  useEffect(() => {
    let stored: string | null = null;
    // โหมดส่วนตัวบางเบราว์เซอร์ throw ตอนแตะ localStorage — ถือว่ายังไม่เคยเลือก
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      stored = null;
    }
    setChoice(stored === "granted" || stored === "denied" ? stored : null);

    const reopen = () => setChoice(null);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  const decide = useCallback((next: Choice) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // เก็บไม่ได้ก็ยังเคารพการเลือกในรอบนี้ แค่จะถามใหม่ครั้งหน้า
    }
    if (next === "denied") clearGaCookies();
    setChoice(next);
  }, []);

  if (!gaId || choice === undefined) return null;

  return (
    <>
      {choice === "granted" ? (
        <>
          <Script
            id="ga-src"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          {/* GA4 ไม่เก็บ IP เต็มอยู่แล้วโดยค่าเริ่มต้น จึงไม่ต้องส่ง anonymize_ip
              (พารามิเตอร์นั้นเป็นของ Universal Analytics ที่เลิกใช้แล้ว) */}
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
          </Script>
        </>
      ) : null}

      {choice === null ? (
        <div
          role="region"
          aria-label={t.label}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-ink-300 bg-neutral-50 shadow-[0_-2px_16px_rgba(0,0,0,0.08)]"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-[15px] font-medium text-ink-900">{t.heading}</p>
              <p className="mt-1 text-[14px] leading-[1.6] text-ink-700">{t.body}</p>
              <p className="mt-1 text-[13px] text-ink-700">{t.note}</p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <button
                type="button"
                onClick={() => decide("granted")}
                className="inline-flex h-11 items-center justify-center rounded bg-pink-700 px-6 text-[15px] font-medium text-white transition-colors duration-150 hover:bg-pink-900 focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]"
              >
                {t.accept}
              </button>
              <button
                type="button"
                onClick={() => decide("denied")}
                className="inline-flex h-11 items-center justify-center rounded border border-ink-300 px-6 text-[15px] font-medium text-ink-900 transition-colors duration-150 hover:bg-ink-100 focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]"
              >
                {t.decline}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
