import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Kanit } from "next/font/google";
import "./globals.css";

/** ฟอนต์เดียวทั้งเว็บตาม BRAND.md PART C (v1.2) — น้ำหนัก 400/500 เท่านั้น ห้าม 300 และ 600/700 */
const kanit = Kanit({
  weight: ["400", "500"],
  subsets: ["thai", "latin"],
  variable: "--font-kanit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cominnocenter.com"),
  title: {
    default: "ศูนย์เชี่ยวชาญเฉพาะทางด้านนวัตกรรมการสื่อสาร | ComInnoCenter",
    template: "%s | ComInnoCenter",
  },
  description:
    "Center of Excellence in Communication Innovation for the Development of Quality of Life and Sustainability, Faculty of Communication Arts, Chulalongkorn University",
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
  // Favicon: Next.js ใช้ src/app/icon.png + apple-icon.png อัตโนมัติ (ชั่วคราวจากโลโก้ — รอโลโก้จริง Phase 2)
  openGraph: {
    type: "website",
    locale: "th_TH",
    siteName: "ComInnoCenter",
    title: "ศูนย์เชี่ยวชาญเฉพาะทางด้านนวัตกรรมการสื่อสาร | ComInnoCenter",
    description:
      "นวัตกรรมการสื่อสารเพื่อการพัฒนาคุณภาพชีวิตและความยั่งยืน คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
  },
  twitter: {
    card: "summary_large_image",
    title: "ComInnoCenter | Communication Innovation",
    description:
      "Center of Excellence in Communication Innovation, Faculty of Communication Arts, Chulalongkorn University",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={kanit.variable}>
      <body className="antialiased bg-neutral-50 text-neutral-900 font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
