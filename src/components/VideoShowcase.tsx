"use client";

import { useRef, useState } from "react";
import {
  videosSorted,
  bestThumb,
  youtubeThumb,
  youtubeEmbedUrl,
  youtubeWatchUrl,
  type Video,
} from "@/data/videos";

type Locale = "th" | "en";

const COPY = {
  th: {
    playAria: (title: string) => `เล่นวิดีโอ ${title}`,
    selectAria: (title: string) => `เลือกวิดีโอ ${title}`,
    nowPlaying: "กำลังดู",
    watchOnYouTube: "เปิดบน YouTube",
    listLabel: "วิดีโอทั้งหมดจากช่องของศูนย์",
    frameTitle: (title: string) => `วิดีโอ: ${title}`,
    thumbAlt: (title: string) => `ภาพหน้าปกวิดีโอ ${title}`,
  },
  en: {
    playAria: (title: string) => `Play video: ${title}`,
    selectAria: (title: string) => `Select video: ${title}`,
    nowPlaying: "Now playing",
    watchOnYouTube: "Watch on YouTube",
    listLabel: "All videos from the centre’s channel",
    frameTitle: (title: string) => `Video: ${title}`,
    thumbAlt: (title: string) => `Cover image for the video ${title}`,
  },
} as const;

const title = (v: Video, locale: Locale) => (locale === "th" ? v.titleTh : v.titleEn);
const summary = (v: Video, locale: Locale) => (locale === "th" ? v.summaryTh : v.summaryEn);

/** ปีที่เผยแพร่ — ไทยใช้ พ.ศ. อังกฤษใช้ ค.ศ. */
const year = (iso: string, locale: Locale) => {
  const y = Number(iso.slice(0, 4));
  return locale === "th" ? String(y + 543) : String(y);
};

/**
 * วิดีโอจากช่อง YouTube ของศูนย์ฯ — จอใหญ่หนึ่งจอ + รายการเลือกด้านข้าง
 *
 * ยังไม่โหลด iframe ของ YouTube จนกว่าจะกดเล่น (facade)
 * เพราะ embed ลาก JS ของบุคคลที่สามเข้ามาหลายร้อย KB ตั้งแต่เปิดหน้า
 * ทั้งที่ผู้อ่านส่วนใหญ่แค่เลื่อนผ่าน — สลับคลิปดูก่อนได้โดยไม่ต้องโหลดอะไรเลย
 */
export default function VideoShowcase({ locale = "th" }: { locale?: Locale }) {
  const t = COPY[locale];
  const [activeId, setActiveId] = useState(videosSorted[0]?.id ?? "");
  const [playing, setPlaying] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  const active = videosSorted.find((v) => v.id === activeId) ?? videosSorted[0];
  if (!active) return null;

  const select = (id: string) => {
    setActiveId(id);
    setPlaying(false);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      {/* จอหลัก */}
      <div className="lg:col-span-7">
        <div
          ref={stageRef}
          className="relative aspect-video overflow-hidden rounded-lg border border-ink-300 bg-ink-900"
        >
          {playing ? (
            <iframe
              key={active.id}
              src={`${youtubeEmbedUrl(active.id)}?autoplay=1&rel=0`}
              title={t.frameTitle(title(active, locale))}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={t.playAria(title(active, locale))}
              className="group absolute inset-0 block focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={active.id}
                src={bestThumb(active)}
                alt=""
                aria-hidden
                className="h-full w-full object-cover transition-transform duration-300 ease-brand group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              {/* ภาพหน้าปกของ YouTube หลายคลิปเป็นสไลด์ที่มีตัวหนังสือแน่น
                  ม่านบางๆ ช่วยให้ปุ่มเล่นเด่นขึ้น และจางลงเมื่อชี้เมาส์ */}
              <span
                aria-hidden
                className="absolute inset-0 bg-ink-900/25 transition-opacity duration-300 ease-brand group-hover:opacity-0 motion-reduce:transition-none"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink-900/45 via-transparent to-transparent"
              />
              <span
                aria-hidden
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-500 text-white shadow-sm transition-transform duration-150 ease-brand group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                  <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </span>
            </button>
          )}
        </div>

        <h3 className="mt-6 text-h3-m md:text-h3 text-ink-900">{title(active, locale)}</h3>
        <p className="mt-2 max-w-prose text-[15px] leading-[1.6] text-ink-700">
          {summary(active, locale)}
        </p>
        <a
          href={youtubeWatchUrl(active.id)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-pink-500 transition-colors duration-150 ease-brand hover:text-pink-700 focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]"
        >
          {t.watchOnYouTube}
          <span aria-hidden>↗</span>
        </a>
      </div>

      {/* รายการเลือก */}
      <ul
        className="space-y-1 lg:col-span-5 lg:max-h-[520px] lg:overflow-y-auto lg:pr-1"
        aria-label={t.listLabel}
      >
        {videosSorted.map((video) => {
          const isActive = video.id === active.id;
          return (
            <li key={video.id}>
              <button
                type="button"
                onClick={() => select(video.id)}
                aria-current={isActive ? "true" : undefined}
                aria-label={t.selectAria(title(video, locale))}
                className={`group grid w-full grid-cols-[104px_1fr] items-start gap-4 rounded-lg border p-2 text-left transition-colors duration-150 ease-brand focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)] ${
                  isActive
                    ? "border-ink-300 bg-ink-0"
                    : "border-transparent hover:bg-ink-0"
                }`}
              >
                <span className="relative block aspect-video overflow-hidden rounded-[4px] bg-ink-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={youtubeThumb(video.id)}
                    alt={t.thumbAlt(title(video, locale))}
                    loading="lazy"
                    className={`h-full w-full object-cover transition-opacity duration-150 ease-brand ${
                      isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100"
                    }`}
                  />
                </span>
                <span className="min-w-0 py-0.5">
                  <span className="flex items-baseline gap-2">
                    {isActive ? (
                      <span className="text-[13px] font-medium leading-[1.4] tracking-[0.12em] text-pink-500">
                        {t.nowPlaying}
                      </span>
                    ) : (
                      <span className="text-[13px] leading-[1.4] text-ink-500">
                        {year(video.date, locale)}
                      </span>
                    )}
                  </span>
                  <span
                    className={`mt-1 block text-[15px] leading-[1.5] line-clamp-2 ${
                      isActive ? "text-ink-900" : "text-ink-700"
                    }`}
                  >
                    {title(video, locale)}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
