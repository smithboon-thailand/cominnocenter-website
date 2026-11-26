"use client";

import { useState } from "react";
import type { ProjectVideo } from "@/data/projects";
import { youtubeEmbedUrl, youtubeThumb, youtubeWatchUrl } from "@/data/videos";
import type { Locale } from "@/lib/locale";
import { trackEvent } from "@/lib/track";

const COPY = {
  th: {
    play: (t: string) => `เล่นวิดีโอ: ${t}`,
    frame: (t: string) => `วิดีโอ: ${t}`,
    watch: "เปิดบน YouTube",
    newTab: " (เปิดในแท็บใหม่)",
    ai: "วิดีโอนี้สร้างด้วย AI",
  },
  en: {
    play: (t: string) => `Play video: ${t}`,
    frame: (t: string) => `Video: ${t}`,
    watch: "Watch on YouTube",
    newTab: " (opens in a new tab)",
    ai: "This video was made with AI",
  },
  zh: {
    play: (t: string) => `播放视频：${t}`,
    frame: (t: string) => `视频：${t}`,
    watch: "在 YouTube 上观看",
    newTab: "（在新标签页打开）",
    ai: "本视频由 AI 生成",
  },
} as const;

/**
 * คลิปของโครงการบนหน้ารายละเอียด — facade แบบเดียวกับ PaperVideo ไม่โหลด iframe ของ YouTube
 * จนกว่าจะกดเล่น · หน้าปกใช้ maxresdefault ของ YouTube เพราะโครงการไม่มีภาพประจำคลิปในเว็บ
 * · คลิปแนวตั้งครอปกลางภาพปก (YouTube เติมแถบข้างให้คลิป 9:16 จนเป็น 16:9) ส่วนกลางจึงตรงกับเฟรมจริงพอดี
 */
function VideoCard({ video, locale }: { video: ProjectVideo; locale: Locale }) {
  const t = COPY[locale];
  const title = video.title[locale];
  const [playing, setPlaying] = useState(false);
  const portrait = video.orientation === "portrait";

  return (
    <figure>
      <div
        className={`relative overflow-hidden rounded-lg border border-ink-300 bg-ink-900 ${
          portrait ? "mx-auto aspect-[9/16] max-w-sm" : "aspect-[16/9]"
        }`}
      >
        {playing ? (
          <iframe
            src={`${youtubeEmbedUrl(video.youtubeId)}?autoplay=1&rel=0`}
            title={t.frame(title)}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button
            type="button"
            onClick={() => {
              setPlaying(true);
              trackEvent("video_play", { youtubeId: video.youtubeId, locale });
            }}
            aria-label={t.play(title)}
            className="group absolute inset-0 h-full w-full"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={youtubeThumb(video.youtubeId, "maxresdefault")}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-700 text-white shadow-lg transition-transform group-hover:scale-105">
                <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" fill="currentColor" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </button>
        )}
      </div>
      <figcaption className={`mt-3 text-sm text-ink-700 ${portrait ? "mx-auto max-w-sm" : ""}`}>
        <span className="block text-ink-900">{title}</span>
        <span className="mt-1 block">
          {video.aiGenerated && <>{t.ai} · </>}
          <a
            href={youtubeWatchUrl(video.youtubeId)}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-pink-700"
          >
            {t.watch}
            <span className="sr-only">{t.newTab}</span>
          </a>
        </span>
      </figcaption>
    </figure>
  );
}

export default function ProjectVideos({ videos, locale }: { videos: ProjectVideo[]; locale: Locale }) {
  const landscape = videos.filter((v) => v.orientation === "landscape");
  const portrait = videos.filter((v) => v.orientation === "portrait");
  return (
    <div className="space-y-10">
      {landscape.map((v) => (
        <VideoCard key={v.youtubeId} video={v} locale={locale} />
      ))}
      {portrait.length > 0 && (
        <div className="grid gap-10 sm:grid-cols-2">
          {portrait.map((v) => (
            <VideoCard key={v.youtubeId} video={v} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
