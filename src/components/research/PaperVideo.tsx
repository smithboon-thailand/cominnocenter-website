"use client";

import { useState } from "react";
import { youtubeEmbedUrl, youtubeWatchUrl } from "@/data/videos";
import { formatClock } from "@/data/paperVideos";

type Locale = "th" | "en";

const COPY = {
  th: {
    kicker: "วิดีโอสรุป",
    narration: "พากย์ไทย",
    playAria: (title: string) => `เล่นวิดีโอสรุป: ${title}`,
    frameTitle: (title: string) => `วิดีโอสรุป: ${title}`,
    watch: "เปิดบน YouTube",
    newTab: " (เปิดในแท็บใหม่)",
    length: (clock: string) => `ความยาว ${clock} นาที`,
  },
  en: {
    kicker: "Video summary",
    narration: "English narration",
    playAria: (title: string) => `Play the video summary: ${title}`,
    frameTitle: (title: string) => `Video summary: ${title}`,
    watch: "Watch on YouTube",
    newTab: " (opens in a new tab)",
    length: (clock: string) => `${clock} min`,
  },
} as const;

/**
 * วิดีโอเล่าสาระหลักของบทความ — วางแทนภาพประกอบหัวบทสรุปเมื่อบทความนั้นมีคลิป
 *
 * เป็น facade แบบเดียวกับ VideoShowcase: ยังไม่โหลด iframe ของ YouTube จนกว่าจะกดเล่น
 * เพราะ embed ลาก JS ของบุคคลที่สามเข้ามาหลายร้อย KB ตั้งแต่เปิดหน้า
 *
 * หน้าปกคือ**ภาพประจำบทความในเว็บเรา** (สามขนาดเหมือน ResponsiveArtwork) ไม่ใช่ thumbnail
 * จาก i.ytimg.com — ภาพนี้เป็น LCP element ของหน้าอยู่แล้ว การสลับไปดึงจากโดเมนอื่น
 * จะช้าลงและพังเมื่อคลิปถูกตั้งเป็นส่วนตัว · เฟรมแรกของคลิปก็คือภาพใบเดียวกันนี้
 * ผู้อ่านจึงไม่เห็นภาพกระโดดตอนกดเล่น
 */
export default function PaperVideo({
  youtubeId,
  locale,
  posterBase,
  posterAlt,
  title,
  seconds,
}: {
  youtubeId: string;
  locale: Locale;
  /** path ไม่มีนามสกุล เช่น "/images/research/summaries/<slug>" — ต้องมีสามขนาดครบเหมือน ResponsiveArtwork */
  posterBase: string;
  posterAlt: string;
  /** พาดหัวของบทสรุป ใช้ตั้งชื่อปุ่มเล่นและ iframe ให้เครื่องอ่านหน้าจอ */
  title: string;
  seconds: number;
}) {
  const t = COPY[locale];
  const [playing, setPlaying] = useState(false);
  const clock = formatClock(seconds);

  return (
    <figure className="mt-8">
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-ink-300 bg-ink-900">
        {playing ? (
          <iframe
            src={`${youtubeEmbedUrl(youtubeId)}?autoplay=1&rel=0`}
            title={t.frameTitle(title)}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={t.playAria(title)}
            className="group absolute inset-0 block focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]"
          >
            {/* srcset เขียนเองด้วยเหตุผลเดียวกับ ResponsiveArtwork — unoptimized: true ทำให้ next/image ไม่สร้างให้ */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${posterBase}.webp`}
              srcSet={`${posterBase}-800.webp 800w, ${posterBase}-1200.webp 1200w, ${posterBase}.webp 1600w`}
              sizes="(min-width: 768px) 720px, 100vw"
              alt={posterAlt}
              width={1600}
              height={900}
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-brand group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-ink-900/40 via-transparent to-transparent"
            />
            {/* ป้ายความยาวมุมล่างขวา — ผู้อ่านรู้ก่อนกดว่าใช้เวลาไม่ถึงสองนาที */}
            <span
              aria-hidden
              className="absolute bottom-3 right-3 rounded-[4px] bg-ink-900/80 px-2 py-0.5 text-[13px] font-medium leading-[1.4] text-white"
            >
              {clock}
            </span>
            <span aria-hidden className="absolute inset-0 flex items-center justify-center">
              {/* ปุ่มเล่นเป็นสัญลักษณ์ ไม่ใช่ข้อความ — เกณฑ์ contrast คือ 3:1 (WCAG 1.4.11) ตัวขาวบน pink-500 ได้ 4.42 */}
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-500 text-white shadow-sm transition-transform duration-150 ease-brand group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-[13px] leading-[1.5] text-ink-500">
        <span>
          <span className="font-medium tracking-[0.12em] text-pink-500">{t.kicker}</span>
          <span aria-hidden> · </span>
          {t.length(clock)}
          <span aria-hidden> · </span>
          {t.narration}
        </span>
        <a
          href={youtubeWatchUrl(youtubeId)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium text-pink-500 transition-colors duration-150 ease-brand hover:text-pink-700 focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]"
        >
          {t.watch}
          <span className="sr-only">{t.newTab}</span>
          <span aria-hidden>↗</span>
        </a>
      </figcaption>
    </figure>
  );
}
