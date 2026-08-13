"use client";

import { useEffect, useRef, type ReactNode } from "react";
import InnovationNetwork from "./InnovationNetwork";

type ParallaxHeroProps = {
  children: ReactNode;
};

export default function ParallaxHero({ children }: ParallaxHeroProps) {
  const layerSlow = useRef<HTMLDivElement>(null);
  const layerFast = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (layerSlow.current) {
          layerSlow.current.style.transform = `translate3d(0, ${y * 0.18}px, 0)`;
        }
        if (layerFast.current) {
          layerFast.current.style.transform = `translate3d(0, ${y * 0.32}px, 0)`;
        }
        if (content.current) {
          content.current.style.transform = `translate3d(0, ${y * 0.08}px, 0)`;
          content.current.style.opacity = String(Math.max(0, 1 - y / 520));
        }
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section className="relative overflow-hidden min-h-[88vh] flex items-center">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 bg-neutral-50" />
      <div
        ref={layerSlow}
        className="absolute inset-0 will-change-transform pointer-events-none"
      >
        <div className="absolute -top-24 -left-24 w-[28rem] h-[28rem] rounded-full bg-pink-400/20 blur-3xl animate-float-slow" />
        <div className="absolute top-1/3 -right-20 w-[32rem] h-[32rem] rounded-full bg-blue-700/15 blur-3xl animate-float-medium" />
        <div className="absolute bottom-0 left-1/3 w-[22rem] h-[22rem] rounded-full bg-amber-300/20 blur-3xl animate-float-fast" />
        <div className="absolute top-1/4 left-1/2 w-64 h-64 rounded-full bg-emerald-400/10 blur-3xl animate-float-slow" />
      </div>

      {/* Innovation network graphic */}
      <div ref={layerFast} className="absolute inset-0 will-change-transform opacity-70">
        <InnovationNetwork density={48} />
      </div>

      {/* Soft vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-50/90 pointer-events-none" />

      {/* Content */}
      <div ref={content} className="relative z-10 w-full will-change-transform">
        <div className="max-w-7xl mx-auto px-6 pt-28 pb-24 md:pt-36 md:pb-32">{children}</div>
      </div>

      {/* Bottom fade line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-400/40 to-transparent" />
    </section>
  );
}
