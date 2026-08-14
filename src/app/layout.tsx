import type { Metadata } from "next";
import { Inter, Sarabun } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sarabun = Sarabun({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  variable: "--font-sarabun",
  display: "swap",
});

/** Favicon จากเว็บเดิม cominnocenter.com (Wix static) */
const FAVICON_BASE =
  "https://static.wixstatic.com/media/25218b_e3df174702a4453cb2b832cd453013d6%7Emv2.jpg";

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
  icons: {
    icon: [
      {
        url: `${FAVICON_BASE}/v1/fill/w_32%2Ch_32%2Clg_1%2Cusm_0.66_1.00_0.01/25218b_e3df174702a4453cb2b832cd453013d6%7Emv2.jpg`,
        sizes: "32x32",
        type: "image/jpeg",
      },
      {
        url: `${FAVICON_BASE}/v1/fill/w_192%2Ch_192%2Clg_1%2Cusm_0.66_1.00_0.01/25218b_e3df174702a4453cb2b832cd453013d6%7Emv2.jpg`,
        sizes: "192x192",
        type: "image/jpeg",
      },
    ],
    shortcut: `${FAVICON_BASE}/v1/fill/w_32%2Ch_32%2Clg_1%2Cusm_0.66_1.00_0.01/25218b_e3df174702a4453cb2b832cd453013d6%7Emv2.jpg`,
    apple: [
      {
        url: `${FAVICON_BASE}/v1/fill/w_180%2Ch_180%2Clg_1%2Cusm_0.66_1.00_0.01/25218b_e3df174702a4453cb2b832cd453013d6%7Emv2.jpg`,
        sizes: "180x180",
        type: "image/jpeg",
      },
    ],
  },
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
    <html lang="th" className={`${inter.variable} ${sarabun.variable}`}>
      <body className="antialiased bg-neutral-50 text-neutral-900 font-sans">
        {children}
      </body>
    </html>
  );
}
