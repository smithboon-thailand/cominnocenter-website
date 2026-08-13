"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type GalleryImage = {
  src: string;
  alt: string;
};

export default function ProjectGallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => (i === null ? 0 : (i + 1) % images.length));
      if (e.key === "ArrowLeft")
        setActive((i) => (i === null ? 0 : (i - 1 + images.length) % images.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, images.length]);

  if (!images.length) return null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <button
            key={`${img.src}-${i}`}
            type="button"
            onClick={() => setActive(i)}
            className="relative aspect-[4/3] rounded-xl overflow-hidden border border-neutral-200 text-left group focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <span className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            <span className="absolute bottom-3 right-3 text-xs bg-white/90 text-neutral-800 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              ดูภาพใหญ่
            </span>
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="ดูภาพขนาดใหญ่"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 text-white text-sm px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20"
            onClick={() => setActive(null)}
          >
            ปิด (Esc)
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                className="absolute left-3 md:left-6 text-white text-2xl w-10 h-10 rounded-full bg-white/10 hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  setActive((active - 1 + images.length) % images.length);
                }}
                aria-label="ภาพก่อนหน้า"
              >
                ‹
              </button>
              <button
                type="button"
                className="absolute right-3 md:right-6 text-white text-2xl w-10 h-10 rounded-full bg-white/10 hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  setActive((active + 1) % images.length);
                }}
                aria-label="ภาพถัดไป"
              >
                ›
              </button>
            </>
          )}

          <div
            className="relative w-full max-w-6xl aspect-[16/10] md:aspect-[16/9]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[active].src}
              alt={images[active].alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          <p className="absolute bottom-4 left-0 right-0 text-center text-white/80 text-sm">
            {active + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  );
}
