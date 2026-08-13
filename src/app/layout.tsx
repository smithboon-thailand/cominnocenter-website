import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ศูนย์ความเป็นเลิศด้านนวัตกรรมการสื่อสาร | ComInnoCenter",
  description:
    "Center of Excellence in Communication Innovation for the Development of Quality of Life and Sustainability, Faculty of Communication Arts, Chulalongkorn University",
  keywords: [
    "นวัตกรรมการสื่อสาร",
    "Communication Innovation",
    "จุฬาลงกรณ์มหาวิทยาลัย",
    "คณะนิเทศศาสตร์",
    "ComInnoCenter",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className="antialiased bg-neutral-50 text-neutral-900">
        {children}
      </body>
    </html>
  );
}
