import type { NextConfig } from "next";

/**
 * Content-Security-Policy — เหตุผลของแต่ละบรรทัดอยู่ที่ `headers()` ท้ายไฟล์
 *
 * เขียนเป็นอาร์เรย์แล้วค่อยต่อกัน เพื่อให้เพิ่มโดเมนใหม่เห็นเป็น diff บรรทัดเดียว
 * ไม่ใช่สตริงยาวบรรทัดเดียวที่อ่าน diff ไม่ออก
 */
const CSP = [
  "default-src 'self'",
  // 'unsafe-inline' จำเป็นเพราะ Next ฝังสคริปต์ bootstrap ไว้ในทุกหน้า (ดูหมายเหตุ)
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://va.vercel-scripts.com",
  // Tailwind + Next ใส่ style inline ทั้งคู่
  "style-src 'self' 'unsafe-inline'",
  // i.ytimg = thumbnail ของ facade · cuculturecom = รูปหลักสูตรวัฒนธรรม · GA ยิง pixel
  "img-src 'self' data: blob: https://i.ytimg.com https://cuculturecom-static.vercel.app https://www.google-analytics.com https://www.googletagmanager.com",
  // ฟอนต์ Kanit self-host มาแล้วตอน build ผ่าน next/font/google
  "font-src 'self' data:",
  // ฟอร์มติดต่อ/รับข่าวสารยิงด้วย fetch · GA และ Vercel Analytics ส่ง beacon
  "connect-src 'self' https://formspree.io https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://va.vercel-scripts.com https://vitals.vercel-insights.com",
  // iframe ของ YouTube โหลดเมื่อกดเล่นเท่านั้น — ใส่ทั้งสองโฮสต์เพราะ nocookie
  // เปลี่ยนเส้นทางไป www.youtube.com ได้ในบางกรณี
  "frame-src https://www.youtube-nocookie.com https://www.youtube.com",
  // เว็บนี้ไม่ใช้ Flash/Java/ปลั๊กอินใดๆ
  "object-src 'none'",
  // กัน <base> ที่ถูกแทรกเข้ามาเปลี่ยนปลายทางของลิงก์สัมพัทธ์ทั้งหน้า
  "base-uri 'self'",
  // คู่กับ X-Frame-Options — ตัวนี้เป็นมาตรฐานปัจจุบัน ตัวนั้นไว้สำหรับเบราว์เซอร์เก่า
  "frame-ancestors 'self'",
  // ฟอร์มไม่ได้ submit ออกนอกจริง (ใช้ fetch) แต่ล็อกไว้กันการถูกดัดแปลง
  "form-action 'self' https://formspree.io",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  // เปิดใช้ src/app/global-not-found.tsx — หน้า 404 ที่ render ที่เซิร์ฟเวอร์
  // สำหรับ URL ที่ไม่ตรงกับ route ไหนเลย (จำเป็นเพราะ root layout มีสองตัว
  // ดูเหตุผลเต็มในไฟล์นั้น) ยังเป็น experimental ใน Next 15.5
  // ถ้าวันหนึ่งแฟล็กนี้หายไป Next จะกลับไปใช้หน้า 404 มาตรฐานของตัวเอง
  // ไม่พัง แค่เสียหน้า 404 ที่ออกแบบไว้ — เช็คหลังอัปเกรด Next ทุกครั้ง
  experimental: {
    globalNotFound: true,
  },
  images: {
    /**
     * ไม่ใช้ตัวปรับขนาดภาพของ Vercel (30 ส.ค. 2569 — แก้ภาพหายทั้งเว็บ)
     *
     * อาการ: `/_next/image?...` ตอบ 402 OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED
     * ภาพที่ยังไม่เคยถูกแปลงและ cache ไว้จึงไม่ขึ้นเลย ทั้งภาพใหม่และภาพเก่า
     * บางใบ ส่วนภาพที่ cache ไว้ก่อนโควตาหมดยังขึ้นปกติ จึงดูเหมือนเสียเป็นบางจุด
     *
     * สาเหตุราก: ภาพที่ย้ายมาจาก Wix เป็นไฟล์ต้นฉบับจากกล้อง 198 ไฟล์กว้างเกิน
     * 1600px (ใหญ่สุด 7952x5304 · รวม 135MB) ทุกขนาดที่เบราว์เซอร์ขอคือหนึ่ง
     * transform ที่กินโควตา ภาพใหญ่ขนาดนั้นจึงเผาโควตาเร็วมาก
     *
     * แก้ที่ต้นทางแทน: ย่อทุกไฟล์ให้กว้างไม่เกิน 1600px (รวมเหลือ 39MB
     * ไฟล์ใหญ่สุด 462KB) ซึ่งใหญ่พอสำหรับทุกจุดที่เว็บนี้แสดงภาพอยู่แล้ว
     * แล้วเสิร์ฟไฟล์ตรงๆ จาก CDN — ไม่ต้องแปลง ไม่มีโควตาให้หมดอีก
     *
     * แลกกับการไม่มี srcset หลายขนาด แต่ไฟล์ระดับนี้ถือว่าคุ้มกว่าการที่
     * ภาพหายทั้งเว็บเมื่อโควตาหมด ถ้าวันหนึ่งอัปเกรดแพลน Vercel แล้วอยากได้
     * srcset กลับมา ลบ `unoptimized` บรรทัดเดียวก็พอ
     */
    unoptimized: true,
    // Phase 0: ภาพทั้งหมด self-host ใน public/images/ แล้ว — เหลือเฉพาะรูปหลักสูตรวัฒนธรรมจากเว็บ cuculturecom
    remotePatterns: [
      { protocol: "https", hostname: "cuculturecom-static.vercel.app" },
    ],
  },
  /**
   * Phase 0-D — 301 redirects จาก path ของเว็บ Wix เดิม (มีผลจริงตอน Phase 5 ที่โดเมนย้ายมา)
   * ตรวจจาก sitemap เว็บเดิม: 24 โพสต์ + หน้า /insights, /contact, /about/teerada-ne, /privacy-policy, /blank
   * mapping โพสต์ generate จาก scripts/wix-posts-manifest.json
   * หมายเหตุ: /privacy-policy เคยอยู่ในลิสต์นี้ (ส่งไปหน้าแรกเพราะยังไม่มีหน้าจริง)
   * ลบออกแล้วเมื่อ 31 ส.ค. 2569 เพราะมีหน้านโยบายจริงที่ path เดิมแล้ว
   * redirect ทำงานก่อน routing ถ้าปล่อยกฎไว้ หน้าใหม่จะไม่มีวันถูกเรียกถึง
   */
  async redirects() {
    return [
      // — โพสต์เดิมทั้ง 24 → /news/<slug> —
      { source: "/post/chula-zero-waste", destination: "/news/chula-zero-waste", permanent: true },
      { source: "/post/nbtc-encyclopedia", destination: "/news/nbtc-encyclopedia", permanent: true },
      { source: "/post/nia-100-faces", destination: "/news/nia-100-faces", permanent: true },
      { source: "/post/nia-media-innovation", destination: "/news/nia-media-innovation", permanent: true },
      { source: "/post/nia-satisfaction-survey-2020", destination: "/news/nia-satisfaction-survey-2020", permanent: true },
      { source: "/post/pid-thong-lang-phra-foundation", destination: "/news/pid-thong-lang-phra-foundation", permanent: true },
      { source: "/post/seeds-for-cu-sustainability", destination: "/news/seeds-for-cu-sustainability", permanent: true },
      { source: "/post/department-of-disease-control", destination: "/news/department-of-disease-control", permanent: true },
      { source: "/post/creative-tourism-development-project-in-nan-province", destination: "/news/creative-tourism-development-project-in-nan-province", permanent: true },
      { source: "/post/ministry-of-natural-resources-and-environment", destination: "/news/ministry-of-natural-resources-and-environment", permanent: true },
      { source: "/post/international-labour-organization", destination: "/news/international-labour-organization", permanent: true },
      { source: "/post/asean-university-network", destination: "/news/asean-university-network", permanent: true },
      { source: "/post/__itd", destination: "/news/itd", permanent: true },
      { source: "/post/sri-trang-agro-industry", destination: "/news/sri-trang-agro-industry", permanent: true },
      { source: "/post/empowering-youth-leaders", destination: "/news/empowering-youth-leaders", permanent: true },
      { source: "/post/the-training-program-for-driving-public-and-social-communication-care-d-plus", destination: "/news/care-d-plus", permanent: true },
      { source: "/post/center-of-excellence-in-communication-innovation-launches-groundbreaking-online-course-for-digital-n", destination: "/news/media-communication-transnational-citizens", permanent: true },
      { source: "/post/chula-communication-arts-strengthens-academic-collaboration-with-keio-university-and-bunkyo-universi", destination: "/news/keio-bunkyo-collaboration", permanent: true },
      { source: "/post/associate-professor-dr-smith-boonchutima-delivers-special-lecture-at-professional-treasury-officer", destination: "/news/treasury-officer-lecture", permanent: true },
      { source: "/post/associate-professor-dr-smith-boonchotima-delivers-leadership-training-at-krungthai-bank", destination: "/news/krungthai-leadership-training", permanent: true },
      { source: "/post/thai-health-promotion-foundation-organises-simple-drug-communication-as-daily-routine-training-by", destination: "/news/thai-health-drug-communication", permanent: true },
      { source: "/post/comm-art-chula-ce-drives-national-drug-safety-awareness-at-fda-summit", destination: "/news/fda-drug-safety-summit", permanent: true },
      // path มี ü — ต้องใช้รูป percent-encoded ให้ตรงกับ URL ที่เบราว์เซอร์ส่งจริง
      { source: "/post/dr-teerada-of-chulalongkorn-university-leads-workshop-preparing-thai-students-in-t%C3%BCrkiye-for-the-wo", destination: "/news/turkiye-students-workshop", permanent: true },
      { source: "/post/center-of-excellence-head-invited-to-lead-executive-crisis-communication-training", destination: "/news/executive-crisis-communication-training", permanent: true },
      // — หน้า/เส้นทางมาตรฐานของ Wix —
      { source: "/insights", destination: "/news", permanent: true },
      { source: "/insights/categories/:category*", destination: "/news", permanent: true },
      { source: "/blog", destination: "/news", permanent: true },
      { source: "/blog-feed.xml", destination: "/news", permanent: true },
      { source: "/about/teerada-ne", destination: "/about", permanent: true },
      { source: "/contact", destination: "/collaborate", permanent: true },
      { source: "/blank", destination: "/", permanent: true },
      // — catch-all: โพสต์เก่าอื่นใดที่ไม่รู้จัก → หน้ารวมข่าว —
      { source: "/post/:slug*", destination: "/news", permanent: true },
    ];
  },
  /**
   * Security headers (3 ก.ย. 2569)
   *
   * ก่อนหน้านี้เว็บนี้ส่ง security header ออกไปตัวเดียวคือ HSTS ที่ Vercel ใส่ให้เอง
   * พบตอนเอาข้อ 8.3 ของรายงานตรวจเว็บอีกตัวมาลองยิงใส่โดเมนจริง — และพบว่า
   * **เว็บ staging ที่กำลังจะเลิกใช้กลับตั้งไว้ครบกว่าเว็บจริง** ซึ่งกลับหัวกลับหาง
   *
   * สี่ตัวนี้ปลอดภัยกับเว็บเนื้อหาสาธารณะแบบนี้ ไม่มีผลข้างเคียงกับสิ่งที่เว็บใช้อยู่
   * (YouTube embed, Formspree, GA4, Vercel Analytics, โฮสต์ภาพหลักสูตรวัฒนธรรม)
   *
   * **จงใจไม่ทำสองอย่าง**
   *
   * 1. **ไม่แตะ HSTS** — ของเดิม `max-age=63072000` (2 ปี) แข็งแรงพออยู่แล้ว
   *    เว็บ staging ใส่ `includeSubDomains; preload` ไว้ ซึ่ง**ห้ามลอกมาโดยไม่คิด**
   *    `includeSubDomains` จะบังคับ HTTPS กับโดเมนย่อย*ทุกตัว*ของ cominnocenter.com
   *    รวมถึงตัวที่จะสร้างในอนาคต ถ้าวันหนึ่งมีโดเมนย่อยที่ยังไม่มีใบรับรอง มันจะ
   *    เข้าไม่ได้ทันที · ส่วน `preload` แทบถอนคืนไม่ได้ ใช้เวลาเป็นเดือนกว่าจะหลุด
   *    จากรายการของเบราว์เซอร์ — เป็นการตัดสินใจที่ต้องตั้งใจ ไม่ใช่ผลพลอยได้
   *
   * 2. **ไม่แตะ HSTS ต่อไปเช่นเดิม** — ดูข้อ 1
   *
   * ─── Content-Security-Policy (เพิ่ม 3 ก.ย. 2569) ───────────────────────────
   *
   * CSP ได้ประโยชน์สูงสุดในบรรดา header ทั้งหมด แต่ก็ทำเว็บพังเงียบได้ง่ายที่สุด
   * เพราะเบราว์เซอร์บล็อกทรัพยากรที่ไม่อยู่ในรายการโดยไม่มีอะไรฟ้องผู้อ่าน
   * รายการข้างล่างจึงมาจาก**การวัดของจริง** ไม่ใช่การไล่อ่านซอร์ส:
   * ยก `next start` ขึ้นมาแล้วเปิดทุกหน้าที่มี embed/ฟอร์มด้วยเบราว์เซอร์จริง
   * เก็บทั้งคำขอที่ออกไปและ CSP violation ที่เกิดขึ้น (ดูสคริปต์ในคอมมิตนี้)
   *
   * **โดเมนที่ต้องมี และมาจากไหน**
   *   YouTube        `frame-src` youtube-nocookie (iframe ตอนกดเล่น) ·
   *                  `img-src` i.ytimg.com (thumbnail ของ facade ก่อนกดเล่น)
   *   Formspree      `connect-src` — ContactForm/NewsletterForm ยิงด้วย fetch
   *                  ไม่ใช่ form submit จริง `form-action` จึงไม่พอ ต้องมีทั้งคู่
   *   GA4            `script-src` googletagmanager · `connect-src` +`img-src`
   *                  google-analytics — **โหลดเฉพาะเมื่อผู้ใช้กดยอมรับ** จึงไม่โผล่
   *                  ในการทดสอบอัตโนมัติ ต้องใส่จากการอ่าน AnalyticsConsent.tsx
   *                  (ลืมข้อนี้ = แถบคุกกี้ทำงาน แต่ GA ไม่เก็บอะไรเลยแบบเงียบๆ)
   *   Vercel         `script-src` + `connect-src` — Analytics ใน root layout
   *   หลักสูตรวัฒนธรรม `img-src` — dependency ภายนอกตัวสุดท้ายจาก Phase 0
   *
   * **ทำไมต้องมี `'unsafe-inline'` ใน script-src** — Next ฝังสคริปต์ inline สำหรับ
   * bootstrap/hydration ทุกหน้า วิธีที่ถูกต้องกว่าคือ nonce แต่ nonce ต้องสร้างใหม่
   * ทุก request ซึ่งบังคับให้ทุกหน้ากลายเป็น dynamic — เว็บนี้เป็น static ทั้ง 183 หน้า
   * การแลกทั้งเว็บไปเป็น dynamic เพื่อ CSP ที่แข็งขึ้นหนึ่งขั้นไม่คุ้ม
   * **จึงยอมรับข้อจำกัดนี้อย่างรู้ตัว ไม่ใช่มองข้าม**
   *
   * ส่วนที่ได้จริงคือ `object-src 'none'` · `base-uri 'self'` · `frame-ancestors`
   * · และการล็อกปลายทางของ connect/img/frame ซึ่งเป็นด่านที่กันการดูดข้อมูลออก
   * ไปโดเมนแปลกปลอมได้แม้สคริปต์จะถูกแทรกเข้ามาได้แล้ว
   *
   * **ถ้าเพิ่มบริการภายนอกใหม่ ต้องมาเพิ่มที่นี่ด้วย** ไม่งั้นมันจะเงียบไป
   */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // กันเบราว์เซอร์เดาชนิดไฟล์เอง — กันไฟล์ที่อัปโหลดมากลายเป็นสคริปต์
          { key: "X-Content-Type-Options", value: "nosniff" },
          // ส่ง referrer ข้ามโดเมนแค่ origin ไม่ส่ง path ที่ผู้อ่านกำลังเปิดอยู่
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // กัน clickjacking — เว็บนี้ไม่มีหน้าไหนที่ตั้งใจให้ฝังใน iframe ของคนอื่น
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // ปิดสิทธิ์อุปกรณ์ที่เว็บนี้ไม่ใช้เลย · ไม่ใส่ interest-cohort เพราะ FLoC
          // ถูกยกเลิกไปแล้ว การลอกมาเป็นการสะสมค่าที่ไม่มีความหมาย
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Security-Policy", value: CSP },
        ],
      },
    ];
  },
};

export default nextConfig;
