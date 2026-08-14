"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type GalleryImage = {
  src: string;
  alt: string;
};

const COPY = {
  th: {
    view: "ดูภาพใหญ่",
    close: "ปิด (Esc)",
    dialog: "ดูภาพขนาดใหญ่",
    prev: "ภาพก่อนหน้า",
    next: "ภาพถัดไป",
  },
  en: {
    view: "View full size",
    close: "Close (Esc)",
    dialog: "Image viewer",
    prev: "Previous image",
    next: "Next image",
  },
} as const;

export default function ProjectGallery({
  images,
  locale = "th",
}: {
  images: GalleryImage[];
  locale?: "th" | "en";
}) {
  const [active, setActive] = useState<number | null>(null);
  const t = COPY[locale];

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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img, i) => (
          <button
            key={`${img.src}-${i}`}
            type="button"
            onClick={() => setActive(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-ink-300 text-left
              focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-300 ease-brand group-hover:scale-105 motion-reduce:group-hover:scale-100"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <span className="absolute inset-0 bg-black/0 transition-colors duration-150 group-hover:bg-black/20" />
            <span className="absolute bottom-3 right-3 rounded bg-white/90 px-2 py-1 text-[13px] font-medium text-ink-900 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
              {t.view}
            </span>
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={t.dialog}
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded bg-white/10 px-3 py-2 text-[15px] text-white hover:bg-white/20
              focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]"
            onClick={() => setActive(null)}
          >
            {t.close}
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                className="absolute left-3 h-10 w-10 rounded-full bg-white/10 text-2xl text-white hover:bg-white/20 md:left-6
                  focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]"
                onClick={(e) => {
                  e.stopPropagation();
                  setActive((active - 1 + images.length) % images.length);
                }}
                aria-label={t.prev}
              >
                ‹
              </button>
              <button
                type="button"
                className="absolute right-3 h-10 w-10 rounded-full bg-white/10 text-2xl text-white hover:bg-white/20 md:right-6
                  focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]"
                onClick={(e) => {
                  e.stopPropagation();
                  setActive((active + 1) % images.length);
                }}
                aria-label={t.next}
              >
                ›
              </button>
            </>
          )}

          <div
            className="relative aspect-[16/10] w-full max-w-6xl md:aspect-[16/9]"
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

          <p className="absolute bottom-4 left-0 right-0 text-center text-[15px] text-white/80">
            {active + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  );
}
