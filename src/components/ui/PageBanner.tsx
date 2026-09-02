import ResponsiveArtwork from "@/components/ui/ResponsiveArtwork";
import { pageBanners, type PageBannerKey } from "@/data/pageBanners";

/**
 * ภาพประกอบหัวหน้าหลัก — วางท้ายบล็อกแนะนำของแต่ละหน้า
 *
 * ทำเป็น component เพราะกรอบภาพต้องเหมือนกันทุกหน้าเป๊ะๆ (สัดส่วน 21:9 · มุมมน ·
 * เส้นขอบ ink-300) ถ้าปล่อยให้แต่ละหน้าเขียน markup เอง 14 จุดจะค่อยๆ เพี้ยน
 * ออกจากกันทีละนิดจนไม่เหลือความเป็นชุดเดียว
 *
 * ตรรกะ srcset อยู่ใน `ResponsiveArtwork` ซึ่งใช้ร่วมกับภาพประกอบบทสรุปงานวิจัย
 * ตัวนี้เหลือหน้าที่แค่ "หน้านี้ใช้ภาพใบไหน สัดส่วนเท่าไหร่ ช่องภาพกว้างแค่ไหน"
 *
 * `priority` เปิดไว้เสมอ — วัดด้วย PerformanceObserver แล้วว่าภาพนี้เป็น
 * LCP element ของทั้ง 12 หน้า ไม่ใช่การเดา
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
    <ResponsiveArtwork
      base={banner.base}
      alt={locale === "th" ? banner.altTh : banner.altEn}
      // กรอบเนื้อหาคือ max-w-7xl (1280) ลบ px-6 สองข้าง = 1232px
      sizes="(min-width: 1280px) 1232px, 100vw"
      aspect="aspect-[21/9]"
      height={686}
      className={className}
      priority
    />
  );
}
