"use client";

import { useState } from "react";
import {
  featuredVideos,
  YOUTUBE_CHANNEL_URL,
  youtubeEmbedUrl,
  youtubeThumb,
  youtubeWatchUrl,
  type Video,
} from "@/data/videos";

function VideoCard({ video, active, onSelect }: { video: Video; active: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group text-left w-full rounded-2xl border overflow-hidden transition-all duration-300 ${
        active
          ? "border-pink-300 shadow-lg ring-1 ring-pink-200"
          : "border-neutral-200 bg-white hover:border-pink-200 hover:shadow-md"
      }`}
    >
      <div className="relative aspect-video bg-neutral-100 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={youtubeThumb(video.id)}
          alt={`${video.titleTh} — วิดีโอจากช่อง Communication Innovation บน YouTube`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="w-14 h-14 rounded-full bg-white/90 text-pink-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <svg viewBox="0 0 24 24" className="w-6 h-6 ml-0.5" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>
        <span className="absolute bottom-2 left-3 text-[10px] font-medium uppercase tracking-wide text-white/90">
          YouTube
        </span>
      </div>
      <div className="p-4">
        <p className="text-[11px] text-neutral-400 mb-1">{video.date.slice(0, 4)}</p>
        <h3 className="text-sm font-semibold text-neutral-900 leading-snug group-hover:text-blue-700 transition-colors line-clamp-2">
          {video.titleTh}
        </h3>
        <p className="mt-1.5 text-xs text-neutral-600 leading-relaxed line-clamp-2">{video.summaryTh}</p>
      </div>
    </button>
  );
}

export default function VideoShowcase() {
  const [activeId, setActiveId] = useState(featuredVideos[0]?.id ?? "");
  const active = featuredVideos.find((v) => v.id === activeId) ?? featuredVideos[0];

  if (!active) return null;

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7">
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-900 shadow-sm">
            <iframe
              key={active.id}
              src={youtubeEmbedUrl(active.id)}
              title={active.titleTh}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-neutral-900">{active.titleTh}</h3>
            <p className="mt-1 text-sm text-neutral-600 leading-relaxed">{active.summaryTh}</p>
            <a
              href={youtubeWatchUrl(active.id)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-3 text-sm font-medium text-pink-600 hover:text-pink-700"
            >
              เปิดบน YouTube
              <span className="ml-1 opacity-60">↗</span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          {featuredVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              active={video.id === active.id}
              onSelect={() => setActiveId(video.id)}
            />
          ))}
        </div>
      </div>

      <div className="mt-10 text-center">
        <a
          href={YOUTUBE_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 rounded-lg border border-blue-700/20 text-blue-700 font-medium hover:bg-blue-50 transition-colors"
        >
          ดูช่อง Communication Innovation ทั้งหมด
          <span className="ml-2">→</span>
        </a>
      </div>
    </div>
  );
}
