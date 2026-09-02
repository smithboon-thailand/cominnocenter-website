import Image from "next/image";
import { pageBanners, type PageBannerKey } from "@/data/pageBanners";

/**
 * ภาพประกอบหัวหน้าหลัก — วางท้ายบล็อกแนะนำของแต่ละหน้า
 *
 * ทำเป็น component เพราะกรอบภาพต้องเหมือนกันทุกหน้าเป๊ะๆ (สัดส่วน 21:9 · มุมมน ·
 * เส้นขอบ ink-300) ถ้าปล่อยให้แต่ละหน้าเขียน markup เอง 13 หน้าจะค่อยๆ เพี้ยน
 * ออกจากกันทีละนิดจนไม่เหลือความเป็นชุดเดียว
 *
 * `priority` เปิดไว้เสมอ — ภาพนี้อยู่เหนือเส้นพับทุกหน้า จึงเป็น LCP element
 * การให้ Next โหลดก่อนช่วยคะแนน LCP โดยตรง ไม่ใช่การเดา
 *
 * ไม่ผ่าน image optimizer ของ Vercel (next.config.ts ตั้ง unoptimized: true
 * หลังเคยชนโควตาจนภาพหายทั้งเว็บ) ไฟล์ต้นทางจึงต้องบีบมาพร้อมใช้ที่ 1600px
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
      <Image
        src={banner.src}
        alt={locale === "th" ? banner.altTh : banner.altEn}
        fill
        className="object-cover"
        sizes="(max-width: 1280px) 100vw, 1216px"
        priority
      />
    </div>
  );
}
