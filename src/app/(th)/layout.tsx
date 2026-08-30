import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import AnalyticsConsent from "@/components/analytics/AnalyticsConsent";
import JsonLd from "@/components/seo/JsonLd";
import { kanit } from "@/lib/fonts";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cominnocenter.com"),
  title: {
    default: "ศูนย์เชี่ยวชาญเฉพาะทางด้านนวัตกรรมการสื่อสาร | ComInnoCenter",
    template: "%s | ComInnoCenter",
  },
  // คำอธิบายฝั่งไทยต้องเป็นไทย — นี่คือข้อความที่ขึ้นใต้ชื่อเว็บในผลค้นหา
  // (เดิม layout มีตัวเดียว หน้าไทยจึงได้คำอธิบายภาษาอังกฤษไปด้วย)
  description:
    "ศูนย์เชี่ยวชาญเฉพาะทางที่แปลงองค์ความรู้ด้านการสื่อสารให้เป็นเครื่องมือที่เปลี่ยนคุณภาพชีวิตของผู้คนได้จริง ทุกโครงการวัดผลได้และเชื่อมโยงกับเป้าหมายการพัฒนาที่ยั่งยืน คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
  keywords: [
    "นวัตกรรมการสื่อสาร",
    "Communication Innovation",
    "จุฬาลงกรณ์มหาวิทยาลัย",
    "คณะนิเทศศาสตร์",
    "ComInnoCenter",
    "คุณภาพชีวิต",
    "ความยั่งยืน",
    "Sustainability",
  ],
  authors: [{ name: "ComInnoCenter, Chulalongkorn University" }],
  // Favicon: Next.js ใช้ src/app/icon.png + apple-icon.png อัตโนมัติ
  openGraph: {
    type: "website",
    locale: "th_TH",
    siteName: "ComInnoCenter",
    title: "ศูนย์เชี่ยวชาญเฉพาะทางด้านนวัตกรรมการสื่อสาร | ComInnoCenter",
    description:
      "นวัตกรรมการสื่อสารเพื่อการพัฒนาคุณภาพชีวิตและความยั่งยืน คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
    images: ["/images/og/og-default.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "ComInnoCenter | Communication Innovation",
    description:
      "Center of Excellence in Communication Innovation, Faculty of Communication Arts, Chulalongkorn University",
    images: ["/images/og/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * root layout ฝั่งไทย — คู่กับ src/app/(en)/layout.tsx
 *
 * เว็บมี root layout สองตัวเพราะ <html lang> ต้องบอกภาษาของหน้านั้นจริงๆ
 * (WCAG 3.1.1) และ layout เดียวเปลี่ยนค่าตาม path ไม่ได้ — layout เป็น
 * server component ที่อ่าน pathname ไม่ได้ ถ้าจะอ่านต้องพึ่ง headers()
 * ซึ่งจะดึงทั้งเว็บออกจาก static ไปเป็น dynamic ทั้งหมด
 *
 * route group ในวงเล็บไม่มีผลกับ URL — /about ยังเป็น /about เหมือนเดิม
 */
export default function ThaiRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={kanit.variable}>
      <body className="antialiased bg-neutral-50 text-neutral-900 font-sans">
        {/* ตัวตนขององค์กร — ชุดเดียวกันทั้ง TH/EN */}
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        {children}
        {/* Vercel Analytics — ไม่ใช้คุกกี้ ไม่เก็บข้อมูลระบุตัวบุคคล จึงอยู่นอกแถบความยินยอม */}
        <Analytics />
        {/* GA4 โหลดเฉพาะเมื่อผู้ใช้กดยอมรับ และเฉพาะเมื่อตั้ง NEXT_PUBLIC_GA_ID แล้ว
            ต้องใส่ทั้งสอง root layout — เว็บนี้มีสองตัว ใส่ที่เดียวจะได้แค่ภาษาเดียว */}
        <AnalyticsConsent gaId={process.env.NEXT_PUBLIC_GA_ID} locale="th" />
      </body>
    </html>
  );
}
