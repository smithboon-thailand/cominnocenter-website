"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type CtaBackdropProps = {
  /** ภาพนิ่งที่เป็นพื้นหลังจริง — ต้องมีเสมอ วิดีโอเป็นแค่ชั้นเสริม */
  src: string;
  /** คลิปวนของภาพเดียวกัน (ไม่มีเสียง) — ไม่ใส่ก็ได้ จะเหลือแค่ภาพนิ่ง */
  video?: { webm: string; mp4: string };
};

/** ตรงกับ breakpoint md ของ Tailwind */
const DESKTOP = "(min-width: 768px)";

/** เริ่มโหลดคลิปเมื่อแถบ CTA เข้าใกล้จอในระยะนี้ */
const PRELOAD_MARGIN = "300px";

/**
 * พื้นหลังของแถบ CTA ที่ขยับได้
 *
 * โครงสร้างเดียวกับ `HeroArtwork` — ภาพนิ่งเป็นตัวจริง วิดีโอ fade ทับทีหลัง
 * แต่**ไม่มีพารัลแลกซ์และไม่มี drift** เพราะบนแถบนี้มีหัวเรื่อง คำอธิบาย และปุ่ม
 * วางทับอยู่ ถ้าพื้นหลังเลื่อนตาม scroll ข้อความจะดูลอยไม่นิ่ง
 *
 * ต่างจาก `HeroArtwork` อีกสองข้อ ซึ่งมาจากที่แถบนี้อยู่**ท้ายหน้า**
 *
 *   1. **รอให้เลื่อนมาใกล้ก่อนถึงจะโหลดคลิป** (IntersectionObserver + rootMargin)
 *      hero อยู่บนสุดจึงโหลดได้เลย แต่ CTA อยู่ล่างสุดของหน้าแรก คนจำนวนมาก
 *      ไม่เลื่อนลงมาถึง การโหลดไฟล์ตั้งแต่เปิดหน้าจึงเป็นการจ่ายค่าเน็ตให้ของ
 *      ที่ผู้อ่านอาจไม่เห็นเลย — และยังไปแย่งแบนด์วิดท์กับ LCP ข้างบนด้วย
 *   2. **หยุดเล่นเมื่อเลื่อนพ้นไป** ตัวถอดรหัสวิดีโอกินไฟแม้ผู้ใช้มองไม่เห็น
 *      (แต่ยังคง <video> ไว้ใน DOM ดูเหตุผลที่สลัก `reached` ด้านล่าง)
 *
 * เงื่อนไขที่จะโหลดวิดีโอ (ต้องครบทั้งสามข้อ)
 *   1. จอกว้าง ≥ 768px — มือถือไม่ต้องจ่ายค่าเน็ตให้ของตกแต่ง เช็คด้วย
 *      matchMedia ไม่ใช่ CSS เพราะ display:none ไม่การันตีว่าจะไม่ดาวน์โหลด
 *   2. ผู้ใช้ไม่ได้ตั้ง prefers-reduced-motion — ตั้งเมื่อไหร่หยุดและซ่อนทันที
 *      แม้จะเปลี่ยนกลางคัน
 *   3. แถบนี้เคยเลื่อนเข้ามาใกล้จอแล้วอย่างน้อยหนึ่งครั้ง
 *
 * ตัวคลิปคือภาพ `cta-bg.webp` ใบเดิมที่ถูกทำให้ขยับ (เจนโดยใช้ภาพนั้นเป็นเฟรม
 * ตั้งต้น) องค์ประกอบ สี และมุมกล้องจึงตรงกับภาพนิ่งเป๊ะ การ fade ทับจึงไม่มี
 * รอยต่อให้เห็น — **ถ้าวันหนึ่งเปลี่ยนภาพนิ่ง ต้องเจนคลิปใหม่จากภาพใหม่ด้วย**
 */
export default function CtaBackdrop({ src, video }: CtaBackdropProps) {
  const anchor = useRef<HTMLDivElement>(null);
  const videoEl = useRef<HTMLVideoElement>(null);
  // แยกสามสถานะ: เคยเข้าใกล้จอแล้วหรือยัง · ควรโหลดไหม · พร้อมโชว์หรือยัง
  // (ตัวสุดท้ายคุมแค่ opacity)
  //
  // `reached` เป็น**สลักทางเดียว** — พอเป็น true แล้วไม่กลับเป็น false อีก
  // ถ้าให้มันกลับได้ตามการมองเห็น React จะถอด <video> ออกจาก DOM ทุกครั้งที่
  // เลื่อนพ้น แล้วสร้างใหม่ตอนเลื่อนกลับมา — คลิปจะเริ่มนับหนึ่งใหม่ทุกรอบ
  // และโค้ดสั่งหยุดเล่นด้านล่างจะไม่มีทางได้ทำงานเลย (ตรวจด้วยเบราว์เซอร์จริง
  // แล้วเจอว่าเป็นแบบนั้นจริง)
  const [reached, setReached] = useState(false);
  const [wantVideo, setWantVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const el = anchor.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia(DESKTOP);

    // เคารพการตั้งค่าที่เปลี่ยนระหว่างใช้งาน ไม่ใช่แค่ตอน mount
    const sync = () => {
      if (reduced.matches) {
        videoEl.current?.pause();
        setWantVideo(false);
        setVideoReady(false);
        return;
      }
      setWantVideo(desktop.matches);
    };

    sync();
    reduced.addEventListener("change", sync);
    desktop.addEventListener("change", sync);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setReached(true);
        // เล่นต่อ/หยุดตามการมองเห็น — ตัวถอดรหัสกินไฟแม้ผู้ใช้มองไม่เห็น
        if (entry.isIntersecting) void videoEl.current?.play().catch(() => {});
        else videoEl.current?.pause();
      },
      { rootMargin: PRELOAD_MARGIN },
    );
    io.observe(el);

    return () => {
      reduced.removeEventListener("change", sync);
      desktop.removeEventListener("change", sync);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={anchor} aria-hidden className="pointer-events-none absolute inset-0">
      <Image src={src} alt="" aria-hidden fill className="object-cover" sizes="100vw" />
      {wantVideo && reached && video ? (
        <video
          ref={videoEl}
          // ภาพนิ่งอยู่ข้างใต้แล้ว จึงไม่ต้องมี poster ให้โหลดซ้ำ
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlay={() => setVideoReady(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={video.webm} type="video/webm" />
          <source src={video.mp4} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}
