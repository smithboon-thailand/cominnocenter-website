/**
 * ภาพประกอบที่โหลดไฟล์ตามขนาดจอ — ใช้ร่วมกันทุกที่ที่วางภาพ paper-craft ใบใหญ่
 *
 * **ทำไมต้องมี component นี้** — `next.config.ts` ตั้ง `unoptimized: true` ไว้
 * ตั้งแต่เคยชนโควตา image optimizer ของ Vercel จนภาพหายทั้งเว็บ ในโหมดนั้น
 * `next/image` output เป็นแท็กภาพธรรมดาที่มี `src` เดี่ยวๆ **และไม่สร้าง srcset ให้**
 * ผลคือมือถือโหลดไฟล์ 1600px มาแสดงในช่องกว้าง 340px (วัดแล้วเสียเปล่า ~4.7 เท่า)
 * ตรรกะ srcset จึงต้องเขียนเอง และต้องอยู่ที่เดียว ไม่ใช่ก๊อปปี้ไปทุกจุดที่ใช้ภาพ
 *
 * **กติกาการตั้งชื่อไฟล์** — ให้ `base` เป็น path ที่ยังไม่มีนามสกุล แล้ว component
 * จะประกอบเป็นสามไฟล์เอง ทุกชุดภาพจึงตั้งชื่อเหมือนกันหมดโดยไม่ต้องจำ:
 *   `<base>.webp`      1600px  แท็บเล็ตขึ้นไปและเดสก์ท็อป
 *   `<base>-1200.webp` 1200px  มือถือ DPR3 (ถ้าไม่มีขั้นนี้จะหล่นไปใช้ 1600)
 *   `<base>-800.webp`   800px  มือถือ DPR2
 * **ถ้าไฟล์ใดขาด ภาพจะพังเฉพาะบางเครื่อง ซึ่งตรวจยาก** — ต้องครบสามไฟล์เสมอ
 */
export default function ResponsiveArtwork({
  base,
  alt,
  sizes,
  aspect,
  height,
  className = "",
  priority = false,
  objectPosition,
}: {
  /** path ไม่มีนามสกุล เช่น "/images/about/banner" */
  base: string;
  alt: string;
  /** บอกเบราว์เซอร์ว่าช่องภาพกว้างเท่าไหร่จริง — ต้องตรงกับ layout ไม่ใช่เดา */
  sizes: string;
  /** คลาส aspect ของ Tailwind เช่น "aspect-[21/9]" — เขียนเป็นตัวหนังสือตรงๆ ที่จุดเรียกใช้ ไม่งั้น Tailwind มองไม่เห็นตอน build */
  aspect: string;
  /** ความสูงของไฟล์ต้นฉบับที่กว้าง 1600 — ใส่คู่กับ aspect ให้ตรงกัน กัน layout shift */
  height: number;
  className?: string;
  /** เปิดเมื่อภาพอยู่เหนือเส้นพับและเป็น LCP element ของหน้า */
  priority?: boolean;
  /**
   * จุดยึดตอนครอป เช่น `"72% 50%"` — ใส่เมื่อกรอบที่แสดงแคบกว่าสัดส่วนไฟล์ต้นฉบับ
   *
   * ภาพ paper-craft ของเราเป็น 21:9 และ**จงใจวางวัตถุไว้ข้างเดียว เว้นพื้นที่ว่าง
   * อีกข้างไว้ให้ข้อความ** ถ้าครอปจากกึ่งกลางตามค่าเริ่มต้นของ `object-cover`
   * จะได้ที่ว่างครึ่งหนึ่งและวัตถุขาดครึ่ง — ต้องยึดไปทางฝั่งที่วัตถุอยู่
   */
  objectPosition?: string;
}) {
  return (
    <div
      className={`relative ${aspect} overflow-hidden rounded-lg border border-ink-300 ${className}`}
    >
      {/* กฎ no-img-element เตือนว่าแท็กนี้อาจทำให้ LCP ช้าลง ซึ่งกลับด้านกับกรณีนี้:
          เว็บปิด optimizer ไว้ next/image จึงไม่สร้าง srcset การเขียนเองเร็วกว่า
          วัดแล้วมือถือลดลง 51–79% แล้วแต่ความหนาแน่นพิกเซลของเครื่อง */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${base}.webp`}
        srcSet={`${base}-800.webp 800w, ${base}-1200.webp 1200w, ${base}.webp 1600w`}
        sizes={sizes}
        alt={alt}
        width={1600}
        height={height}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        style={objectPosition ? { objectPosition } : undefined}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
