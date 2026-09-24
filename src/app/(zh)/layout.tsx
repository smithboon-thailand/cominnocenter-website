import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import AnalyticsConsent from "@/components/analytics/AnalyticsConsent";
import JsonLd from "@/components/seo/JsonLd";
import { siteVerification } from "@/lib/siteVerification";
import { kanit } from "@/lib/fonts";
import { notoSansSC } from "@/lib/fontsZh";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cominnocenter.com"),
  title: {
    default: "传播创新卓越中心 | ComInnoCenter",
    template: "%s | ComInnoCenter",
  },
  // คำอธิบายฝั่งจีนต้องเป็นจีน — ข้อความนี้ขึ้นใต้ชื่อเว็บในผลค้นหา
  description:
    "朱拉隆功大学传播艺术学院传播创新卓越中心：把传播学研究转化为切实改善人们生活质量的工具，每个项目都可衡量，并与联合国可持续发展目标相衔接。",
  keywords: [
    "传播创新",
    "Communication Innovation",
    "朱拉隆功大学",
    "传播艺术学院",
    "ComInnoCenter",
    "生活质量",
    "可持续发展",
    "泰国",
  ],
  authors: [{ name: "ComInnoCenter, Chulalongkorn University" }],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "ComInnoCenter",
    title: "传播创新卓越中心 | ComInnoCenter",
    description: "朱拉隆功大学传播艺术学院 · 以传播创新提升生活质量与可持续发展",
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
  verification: siteVerification(),
};

/**
 * root layout ฝั่งจีน — ตัวที่สามคู่กับ (th)/layout.tsx และ (en)/layout.tsx
 *
 * `lang="zh-Hans"` บอกว่าเป็นจีนตัวย่อ (ไม่ใช่ `zh` เฉยๆ) เพราะโปรแกรมอ่านหน้าจอ
 * และเสิร์ชเอนจินต้องแยกตัวย่อออกจากตัวเต็ม · ใส่ตัวแปรฟอนต์ทั้งสองตัวไว้ที่ <html>
 * แล้วให้ globals.css เลือกใช้ Noto Sans SC เฉพาะเมื่อ lang เป็นค่านี้
 */
export default function ChineseRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hans" className={`${kanit.variable} ${notoSansSC.variable}`}>
      <body className="antialiased bg-neutral-50 text-neutral-900 font-sans">
        {/* ตัวตนขององค์กร — ชุดเดียวกันทั้งสามภาษา */}
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        {children}
        <Analytics />
        <AnalyticsConsent locale="zh" />
      </body>
    </html>
  );
}
