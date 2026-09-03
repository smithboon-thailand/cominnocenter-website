import type { ReactNode } from "react";
import ResponsiveArtwork from "@/components/ui/ResponsiveArtwork";
import { pageBanners, type PageBannerKey } from "@/data/pageBanners";

/**
 * หัวหน้าหลัก — ข้อความกับภาพประกอบอยู่ในจอเดียวกัน
 *
 * ทำไมต้องเปลี่ยนจาก `PageBanner` (3 ก.ย. 2569)
 *
 * เดิมหน้าหลักทั้งเจ็ดเรียงเป็น "ข้อความ แล้วค่อยภาพ" คือ kicker + h1 + คำนำ
 * เต็มความกว้าง แล้ววางแบนเนอร์ 21:9 ไว้ข้างล่าง วัดจริงบนจอ 1440×900 ได้ว่า
 * **แบนเนอร์สูง 526px คิดเป็น 58% ของความสูงจอ** และ**เนื้อหาจริงชิ้นแรก
 * เริ่มที่ 913–1341px คือต่ำกว่าเส้นพับทุกหน้า** — จอแรกที่ผู้อ่านเห็นจึงมีแต่
 * เมนู ข้อความสามบรรทัด และภาพประกอบ ไม่มีโครงการ ไม่มีผลงาน ไม่มีข่าวสักชิ้น
 *
 * ที่ชี้ขาดคือ**ตัวภาพเอง**: ภาพ paper-craft ทั้งชุดถูกเจนมาโดยวางวัตถุไว้ข้างเดียว
 * และ**เว้นพื้นที่ว่างอีกข้างไว้ให้ข้อความ** (ดูชัดที่สุดที่ `media/banner.webp`
 * ซึ่งซ้ายมือเป็นพื้นครีมเปล่าเกือบครึ่งใบ) การวางข้อความไว้*เหนือ*ภาพจึงทิ้งที่ว่าง
 * นั้นไปเปล่าๆ แล้วไปกินความสูงซ้ำอีกชุด — ผิดเจตนาของภาพตั้งแต่แรก
 *
 * ตัวนี้จึงจัดสองคอลัมน์แบบเดียวกับ hero หน้าแรก: ข้อความซ้าย ภาพขวา ครอปโดย
 * ยึดฝั่งที่วัตถุอยู่ (`focus` ใน `pageBanners.ts`) ความสูงรวมลดลงและเนื้อหาจริง
 * ขยับขึ้นมาอยู่ในจอแรก โดยไม่ต้องแตะสี ฟอนต์ หรือตัวภาพเลย
 *
 * บนมือถือกลับไปเรียงบนล่างตามเดิม เพราะจอแคบไม่มีที่ให้สองคอลัมน์
 * — ภาพอยู่*หลัง*ข้อความ เพื่อให้ h1 ยังเป็นสิ่งแรกที่อ่านเจอ
 */
export default function PageHero({
  page,
  locale,
  kicker,
  title,
  lede,
  children,
}: {
  page: PageBannerKey;
  locale: "th" | "en";
  /**
   * ป้ายเหนือหัวเรื่อง — **ไม่บังคับ** เพราะหน้าข่าวทั้งสองภาษาไม่เคยมี
   * และการเติมเองเท่ากับแต่งข้อความที่ผู้อ่านเห็นขึ้นมาใหม่ ซึ่งเป็นเรื่องของผู้ใช้
   */
  kicker?: string;
  title: ReactNode;
  lede: ReactNode;
  /** แถวปุ่มหรือชิปที่อยากให้อยู่ในจอแรกด้วย */
  children?: ReactNode;
}) {
  const banner = pageBanners[page];
  // ตั้งใจไม่ใส่ลายพื้นหลัง — BRAND E1 อนุญาตให้มีโมทีฟเส้นเชื่อมจางๆ ใน hero ได้
  // และเคยลองใช้ `/illustrations/hero-network.svg` แล้ว **ใช้ไม่ได้**: ไฟล์นั้นมี
  // พื้นหลังไล่สีน้ำเงินกรมทึบเต็มผืน (#002D73 → #1a4a8a) วางทับแล้วหัวหน้ากลายเป็น
  // แถบสีเทา และตัวไฟล์ยังใช้สีชมพูเก่า #DE5C8E ที่ BRAND.md สั่งเลิกใช้ไปแล้ว
  // เป็นของตกค้างจากก่อน redesign — ถ้าจะมีโมทีฟต้องทำไฟล์ใหม่ ไม่ใช่หยิบอันนี้มาใช้
  return (
    <section className="relative overflow-hidden border-b border-ink-300">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-8 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,42%)] lg:gap-12">
          <div>
            {/*
              หน้าอังกฤษเดิมใส่ `uppercase` ให้ป้ายนี้ หน้าไทยไม่ใส่ — ตั้งใจคงไว้
              เพราะภาษาไทยไม่มีตัวพิมพ์ใหญ่ให้แปลง การใส่จึงไม่มีผลอะไรนอกจาก
              ทำให้คลาสสองภาษาต่างกันโดยไม่จำเป็น
            */}
            {kicker ? (
              <p
                className={`mb-2 text-[13px] font-medium leading-[1.4] tracking-[0.12em] text-pink-500 ${
                  locale === "en" ? "uppercase" : ""
                }`}
              >
                {kicker}
              </p>
            ) : null}
            <h1 className="text-h1-m md:text-h1 text-ink-900">{title}</h1>
            <p className="mt-4 max-w-prose text-[17px] leading-[1.7] text-ink-700">{lede}</p>
            {children ? <div className="mt-8">{children}</div> : null}
          </div>
          {/*
            order-first บนมือถือจะดันภาพขึ้นไปเหนือ h1 จึงไม่ใช้ — ปล่อยให้ตกมาอยู่
            ใต้ข้อความตามลำดับ DOM ซึ่งเป็นลำดับการอ่านที่ถูกต้องอยู่แล้ว
          */}
          <ResponsiveArtwork
            base={banner.base}
            alt={locale === "th" ? banner.altTh : banner.altEn}
            // ช่องภาพ = 42% ของกรอบ 1232px ≈ 517px บนเดสก์ท็อป · เต็มจอบนมือถือ
            sizes="(min-width: 1024px) 520px, 100vw"
            aspect="aspect-[5/4] lg:aspect-[4/3]"
            height={686}
            objectPosition={banner.focus}
            priority
          />
        </div>
      </div>
    </section>
  );
}
