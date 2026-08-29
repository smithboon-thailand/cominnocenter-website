"use client";

import { useEffect, useRef, useState } from "react";

type StatProps = {
  /** ตัวเลข — แสดงตามที่ส่งมา (ใส่ comma/+ มาเองได้ เช่น "10,000+", "13/17") */
  value: string | number;
  /** หน่วย เช่น "โครงการ", "คน", "%" — ผูกกับตัวเลขเสมอ ไม่หลุดบรรทัด */
  unit?: string;
  /** คำอธิบายใต้ตัวเลข */
  label?: string;
  /** หน่วง ms ก่อนเริ่มนับ — ใช้ stagger ไล่ทีละช่องแบบโดมิโน */
  delay?: number;
  /** ปิดการนับไต่ขึ้นสำหรับค่าที่นับแล้วไม่มีความหมาย เช่น ปี พ.ศ./ค.ศ. */
  animate?: boolean;
  /**
   * ขนาดตัวเลข
   *   default — สเกลเดิมตาม spec ผู้ใช้ สำหรับช่องกริดแคบ (หน้าแรก, /sdg, หน้าโครงการ)
   *   compact — สำหรับการ์ดกว้างอย่าง persona ที่ 19cqw คำนวณได้ถึง 52px แล้วล้นการ์ด
   */
  size?: "default" | "compact";
};

/** แยกตัวเลขนำหน้าออกจากส่วนท้าย: "10,000+" → 10000+"+", "13/17" → 13+"/17" */
function parseValue(value: string | number) {
  const m = String(value).match(/^([\d,]+)(.*)$/);
  if (!m) return null;
  return { target: Number(m[1].replace(/,/g, "")), suffix: m[2], comma: m[1].includes(",") };
}

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
const DURATION = 1600;

/**
 * Stat แบบนับไต่ขึ้น (spec ผู้ใช้ 17 ส.ค. 2569)
 * - ตัวเลข fluid: clamp(1.75rem, 7vw, 3.25rem) + tabular-nums (ทุกหลักกว้างเท่ากัน
 *   เลขไม่กระตุกซ้าย-ขวาตอนนับ) + nowrap (หน่วยไม่หลุดบรรทัด)
 * - นับ 0 → ค่าจริงครั้งเดียวเมื่อเห็น 40% (IntersectionObserver แล้ว unobserve)
 *   ด้วย requestAnimationFrame + timestamp, easeOutExpo 1600ms, จบที่ค่าจริงเป๊ะ
 * - SSR แสดงค่าจริงในตัว HTML — คนที่ JS ไม่ทำงานไม่เห็นศูนย์ (reset เป็น 0 ใน effect)
 * - a11y: ตัวเลขที่นับอยู่เป็น aria-hidden + sr-only ค่าจริงถาวร · ไม่ใช้ aria-live ·
 *   prefers-reduced-motion แสดงค่าจริงทันที
 */
export default function Stat({
  value,
  unit,
  label,
  delay = 0,
  animate = true,
  size = "default",
}: StatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(String(value));

  useEffect(() => {
    const parsed = animate ? parseValue(value) : null;
    const el = ref.current;
    if (!parsed || !el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const fmt = (n: number) => (parsed.comma ? n.toLocaleString("en-US") : String(n)) + parsed.suffix;
    let raf = 0;
    let timer: ReturnType<typeof setTimeout>;

    // JS พร้อมแล้ว — เริ่มจาก 0 รอเข้าจอ (HTML ที่ SSR ออกไปเป็นค่าจริงแล้ว)
    setDisplay(fmt(0));

    const step = (start: number) => (now: number) => {
      const t = (now - start) / DURATION;
      if (t >= 1) {
        setDisplay(fmt(parsed.target)); // frame สุดท้ายต้องเป็นค่าจริงเป๊ะ ไม่ใช่ค่าปัดจาก easing
        return;
      }
      setDisplay(fmt(Math.round(easeOutExpo(t) * parsed.target)));
      raf = requestAnimationFrame(step(start));
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(el);
        observer.disconnect();
        timer = setTimeout(() => {
          raf = requestAnimationFrame((now) => step(now)(now));
        }, delay);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [value, delay, animate]);

  return (
    // container-type ทำให้ cqw อิงความกว้างช่องจริงของ grid — 7vw ล้นเมื่อ 4 คอลัมน์บน tablet
    <div ref={ref} className="min-w-0 [container-type:inline-size]">
      <p
        aria-hidden
        className={`whitespace-nowrap font-medium leading-[1.1] text-ink-900 [font-variant-numeric:tabular-nums] ${
          size === "compact"
            ? "text-[clamp(1.5rem,12cqw,2rem)]"
            : "text-[clamp(1.75rem,19cqw,3.25rem)]"
        }`}
      >
        {display}
        {unit && <span className="ml-2 text-[0.55em] font-normal text-ink-500">{unit}</span>}
      </p>
      <p className="sr-only">{`${value}${unit ? ` ${unit}` : ""}`}</p>
      {label && (
        <p className="mt-1 text-[15px] leading-[1.6] text-ink-500 [text-wrap:balance]">{label}</p>
      )}
    </div>
  );
}
