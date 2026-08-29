import type { NextConfig } from "next";

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
    // Phase 0: ภาพทั้งหมด self-host ใน public/images/ แล้ว — เหลือเฉพาะรูปหลักสูตรวัฒนธรรมจากเว็บ cuculturecom
    remotePatterns: [
      { protocol: "https", hostname: "cuculturecom-static.vercel.app" },
    ],
  },
  /**
   * Phase 0-D — 301 redirects จาก path ของเว็บ Wix เดิม (มีผลจริงตอน Phase 5 ที่โดเมนย้ายมา)
   * ตรวจจาก sitemap เว็บเดิม: 24 โพสต์ + หน้า /insights, /contact, /about/teerada-ne, /privacy-policy, /blank
   * mapping โพสต์ generate จาก scripts/wix-posts-manifest.json
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
      { source: "/privacy-policy", destination: "/", permanent: true },
      { source: "/blank", destination: "/", permanent: true },
      // — catch-all: โพสต์เก่าอื่นใดที่ไม่รู้จัก → หน้ารวมข่าว —
      { source: "/post/:slug*", destination: "/news", permanent: true },
    ];
  },
};

export default nextConfig;
