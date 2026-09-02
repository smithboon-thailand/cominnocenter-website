import { pageBanners, type PageBannerKey } from "@/data/pageBanners";

/**
 * ภาพประกอบหัวหน้าหลัก — วางท้ายบล็อกแนะนำของแต่ละหน้า
 *
 * ทำเป็น component เพราะกรอบภาพต้องเหมือนกันทุกหน้าเป๊ะๆ (สัดส่วน 21:9 · มุมมน ·
 * เส้นขอบ ink-300) ถ้าปล่อยให้แต่ละหน้าเขียน markup เอง 14 จุดจะค่อยๆ เพี้ยน
 * ออกจากกันทีละนิดจนไม่เหลือความเป็นชุดเดียว
 *
 * **ทำไมใช้ <img> ไม่ใช่ next/image** — `next.config.ts` ตั้ง `unoptimized: true`
 * ไว้ตั้งแต่เคยชนโควตา image optimizer ของ Vercel จนภาพหายทั้งเว็บ ในโหมดนั้น
 * next/image ก็ output เป็น <img> ธรรมดาที่มีแต่ `src` เดี่ยวๆ อยู่แล้ว **และไม่
 * สร้าง srcset ให้** ผลคือมือถือที่มีช่องภาพกว้าง 340px ต้องโหลดไฟล์ 1600px เต็ม
 * (วัดได้ 27–98 KB) ทั้งที่ภาพนี้เป็น LCP element ของหน้า เขียน <img> เองจึงได้
 * srcset กลับคืนมาโดยไม่เสียอะไรเลย — มือถือประหยัดลง ~70–79%
 *
 * `fetchPriority="high"` แทน `priority` ของ next/image — ภาพนี้อยู่เหนือเส้นพับ
 * ทุกหน้า จึงเป็น LCP element จริง (ยืนยันด้วย PerformanceObserver แล้ว)
 * การบอกเบราว์เซอร์ให้ชิงโหลดก่อนช่วย LCP โดยตรง ไม่ใช่การเดา
 *
 * `width`/`height` ใส่ไว้กัน layout shift ถึงแม้กรอบนอกจะกำหนดสัดส่วนไว้แล้ว
 */
export default function PageBanner({
  page,
  locale,
  className = "mt-10",
}: {
  page: PageBannerKey;
  locale: "th" | "en";
  className?: string;
}) {
  const banner = pageBanners[page];
  return (
    <div
      className={`relative aspect-[21/9] overflow-hidden rounded-lg border border-ink-300 ${className}`}
    >
      {/* กฎนี้เตือนว่า <img> อาจทำให้ LCP ช้าลง ซึ่งเหตุผลกลับด้านกับกรณีนี้:
          เว็บตั้ง unoptimized: true ไว้ next/image จึงไม่สร้าง srcset ให้เลย
          การใช้ <img> พร้อม srcset จึงเร็วกว่า วัดแล้วมือถือลดลง ~70–79% */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={banner.src}
        srcSet={`${banner.srcSmall} 800w, ${banner.srcMedium} 1200w, ${banner.src} 1600w`}
        // กรอบเนื้อหาคือ max-w-7xl (1280) ลบ px-6 สองข้าง = 1232px
        sizes="(min-width: 1280px) 1232px, 100vw"
        alt={locale === "th" ? banner.altTh : banner.altEn}
        width={1600}
        height={686}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
