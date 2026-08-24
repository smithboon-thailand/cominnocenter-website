"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

type HeroArtworkProps = {
  src: string;
  /** ตกแต่งล้วน — ข้อความจริงอยู่ในเนื้อหา hero */
  className?: string;
};

/** ระยะพารัลแลกซ์สูงสุด (px) — กันไม่ให้ภาพไหลลงไปไกลเกินกรอบ hero */
const MAX_SHIFT = 80;

/**
 * ภาพประกอบ hero ที่ "หายใจ" ได้ — แทนวิดีโอพื้นหลัง
 *
 * เหตุผลที่ไม่ใช้ไฟล์วิดีโอ: พื้นหลัง hero แบบวิดีโอกินแบนด์วิดท์หลายเมกะไบต์
 * ติดข้อจำกัด autoplay บนมือถือ และปิดตาม prefers-reduced-motion ยาก
 * งาน paper-craft ของเราต้องการแค่การเคลื่อนไหวช้ามาก ซึ่ง CSS ทำได้ดีกว่าและเบากว่า
 *
 * สองชั้นแยกหน้าที่กัน (ห้ามยุบเป็นชั้นเดียว เพราะ transform จะทับกัน):
 *   ชั้นนอก = พารัลแลกซ์ตาม scroll (JS ผ่าน rAF)
 *   ชั้นใน  = ลอยช้าๆ วนไม่รู้จบ (CSS keyframes hero-drift ใน globals.css)
 * ทั้งสองหยุดเมื่อผู้ใช้ตั้ง prefers-reduced-motion
 *
 * หมายเหตุ: keyframes เริ่มที่ scale 1.05 เพราะการหมุนเอียงทำให้มุมภาพหลุดกรอบ
 * ถ้าไม่ขยายเผื่อไว้ก่อน — และเพราะ object-right ตรึงขอบขวา ว่าวจึงไม่ถูกครอบตัด
 */
export default function HeroArtwork({ src, className = "" }: HeroArtworkProps) {
  const parallax = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = parallax.current;
    if (!el) return;

    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
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
    const sync = () => (query.matches ? stop() : start());
    sync();
    query.addEventListener("change", sync);

    return () => {
      query.removeEventListener("change", sync);
      stop();
    };
  }, []);

  return (
    <div ref={parallax} aria-hidden className={`pointer-events-none ${className}`}>
      <div className="h-full w-full animate-hero-drift will-change-transform">
        <Image
          src={src}
          alt=""
          aria-hidden
          fill
          className="object-cover object-right"
          sizes="100vw"
          priority
        />
      </div>
    </div>
  );
}
