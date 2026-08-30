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
    default:
      "Center of Excellence in Communication Innovation | ComInnoCenter",
    template: "%s | ComInnoCenter",
  },
  description:
    "Center of Excellence in Communication Innovation for the Development of Quality of Life and Sustainability, Faculty of Communication Arts, Chulalongkorn University",
  keywords: [
    "Communication Innovation",
    "Chulalongkorn University",
    "Faculty of Communication Arts",
    "ComInnoCenter",
    "Quality of Life",
    "Sustainability",
    "SDG",
  ],
  authors: [{ name: "ComInnoCenter, Chulalongkorn University" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ComInnoCenter",
    title: "Center of Excellence in Communication Innovation | ComInnoCenter",
    description:
      "Communication innovation for quality of life and sustainability, Faculty of Communication Arts, Chulalongkorn University",
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
 * root layout ฝั่งอังกฤษ — คู่กับ src/app/(th)/layout.tsx
 * ต่างกันแค่ lang, og:locale และข้อความ metadata ที่เป็นค่าตั้งต้น
 * (แต่ละหน้ายังกำหนด title/description/alternates ของตัวเองทับอีกที)
 */
export default function EnglishRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={kanit.variable}>
      <body className="antialiased bg-neutral-50 text-neutral-900 font-sans">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        {children}
        {/* คู่กับ (th)/layout.tsx — ดูคำอธิบายที่นั่น */}
        <Analytics />
        <AnalyticsConsent gaId={process.env.NEXT_PUBLIC_GA_ID} locale="en" />
      </body>
    </html>
  );
}
