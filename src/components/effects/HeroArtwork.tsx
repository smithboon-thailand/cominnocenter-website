"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type HeroArtworkProps = {
  src: string;
  /** คลิปวนของภาพเดียวกัน (ไม่มีเสียง) — ใส่หรือไม่ใส่ก็ได้ ถ้าไม่ใส่จะเหลือแค่ภาพนิ่ง + CSS */
  video?: { webm: string; mp4: string };
  /** ตกแต่งล้วน — ข้อความจริงอยู่ในเนื้อหา hero */
  className?: string;
};

/** ระยะพารัลแลกซ์สูงสุด (px) — กันไม่ให้ภาพไหลลงไปไกลเกินกรอบ hero */
const MAX_SHIFT = 80;

/** ตรงกับ breakpoint md ของ Tailwind — จุดที่ hero เริ่มโชว์ภาพประกอบ */
const DESKTOP = "(min-width: 768px)";

/**
 * ภาพประกอบ hero ที่ "หายใจ" ได้
 *
 * โครงสร้างสามชั้น (ห้ามยุบรวมกัน เพราะ transform จะทับกัน):
 *   ชั้นนอก = พารัลแลกซ์ตาม scroll (JS ผ่าน rAF)
 *   ชั้นกลาง = ลอยช้าๆ วนไม่รู้จบ (CSS keyframes hero-drift ใน globals.css)
 *   ชั้นใน  = ภาพนิ่ง และวิดีโอที่ค่อยๆ ปรากฏทับเมื่อโหลดเสร็จ
 *
 * ทำไมภาพนิ่งยังอยู่ ทั้งที่มีวิดีโอแล้ว (30 ส.ค. 2569)
 * ภาพนิ่งคือ LCP ของหน้าแรก โหลดเร็วและมีอยู่แล้วในแคช CDN — ถ้าเปลี่ยนไปให้
 * วิดีโอเป็นตัวหลัก คะแนน performance จะตกเพราะเบราว์เซอร์ต้องรอไฟล์เมกะไบต์
 * ก่อนจะวาดอะไรได้ วิดีโอจึงเป็นชั้นเสริมที่ fade ทับทีหลัง ผู้ใช้เห็นภาพทันที
 * เหมือนเดิม แล้วภาพค่อยขยับเมื่อคลิปพร้อม ถ้าคลิปโหลดไม่สำเร็จก็ไม่มีอะไรเสีย
 *
 * เงื่อนไขที่จะโหลดวิดีโอ (ต้องครบทั้งสองข้อ)
 *   1. จอกว้าง ≥ 768px — มือถือไม่ต้องจ่ายค่าเน็ตให้ของตกแต่ง และ hero ก็ซ่อน
 *      ภาพประกอบอยู่แล้วที่ความกว้างนั้น เช็คด้วย matchMedia ไม่ใช่ CSS เพราะ
 *      display:none ไม่การันตีว่าเบราว์เซอร์จะไม่ดาวน์โหลดไฟล์
 *   2. ผู้ใช้ไม่ได้ตั้ง prefers-reduced-motion — ตั้งเมื่อไหร่หยุดและซ่อนทันที
 *      แม้จะเปลี่ยนกลางคัน (เหตุผลเดียวกับพารัลแลกซ์ด้านล่าง)
 *
 * ตัวคลิปคือภาพ hero-bg.webp ใบเดิมที่ถูกทำให้ขยับ (เจนโดยใช้ภาพนั้นเป็นเฟรม
 * ตั้งต้น) องค์ประกอบ สี และมุมกล้องจึงตรงกับภาพนิ่งเป๊ะ การ fade ทับจึงไม่มี
 * รอยต่อให้เห็น — ถ้าวันหนึ่งเปลี่ยนภาพนิ่ง ต้องเจนคลิปใหม่จากภาพใหม่ด้วย
 *
 * หมายเหตุ: keyframes เริ่มที่ scale 1.05 เพราะการหมุนเอียงทำให้มุมภาพหลุดกรอบ
 * ถ้าไม่ขยายเผื่อไว้ก่อน — และเพราะ object-right ตรึงขอบขวา ว่าวจึงไม่ถูกครอบตัด
 */
export default function HeroArtwork({ src, video, className = "" }: HeroArtworkProps) {
  const parallax = useRef<HTMLDivElement>(null);
  const videoEl = useRef<HTMLVideoElement>(null);
  // แยกสองสถานะ: "ควรโหลดไหม" กับ "พร้อมโชว์หรือยัง" — ตัวหลังคุมแค่ opacity
  const [wantVideo, setWantVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const el = parallax.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia(DESKTOP);
    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // ขยับช้ากว่าการเลื่อนหน้าจอราว 1/8 — พอให้รู้สึกมีระยะ ไม่ถึงกับวูบวาบ
        const shift = Math.min(window.scrollY * 0.12, MAX_SHIFT);
        el.style.transform = `translate3d(0, ${shift}px, 0)`;
      });
    };

    const stop = () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      el.style.transform = "";
    };

    const start = () => {
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    };

    // เคารพการตั้งค่าที่เปลี่ยนระหว่างใช้งาน ไม่ใช่แค่ตอน mount
    const sync = () => {
      if (reduced.matches) {
        stop();
        videoEl.current?.pause();
        setWantVideo(false);
        setVideoReady(false);
        return;
      }
      start();
      setWantVideo(desktop.matches);
    };

    sync();
    reduced.addEventListener("change", sync);
    desktop.addEventListener("change", sync);

    return () => {
      reduced.removeEventListener("change", sync);
      desktop.removeEventListener("change", sync);
      stop();
    };
  }, []);

  return (
    <div ref={parallax} aria-hidden className={`pointer-events-none ${className}`}>
      <div className="relative h-full w-full animate-hero-drift will-change-transform">
        <Image
          src={src}
          alt=""
          aria-hidden
          fill
          className="object-cover object-right"
          sizes="100vw"
          priority
        />
        {wantVideo && video ? (
          <video
            ref={videoEl}
            // ภาพนิ่งอยู่ข้างใต้แล้ว จึงไม่ต้องมี poster ให้โหลดซ้ำ
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onCanPlay={() => setVideoReady(true)}
            className={`absolute inset-0 h-full w-full object-cover object-right transition-opacity duration-1000 ${
              videoReady ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src={video.webm} type="video/webm" />
            <source src={video.mp4} type="video/mp4" />
          </video>
        ) : null}
      </div>
    </div>
  );
}
