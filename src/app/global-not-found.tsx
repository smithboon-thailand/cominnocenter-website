import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { kanit } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "ไม่พบหน้านี้ | ComInnoCenter",
  description: "หน้าที่คุณต้องการอาจถูกลบ ย้าย หรือ URL ไม่ถูกต้อง",
  robots: { index: false, follow: true },
};

/**
 * หน้า 404 สำหรับ URL ที่ไม่ตรงกับ route ไหนเลย
 *
 * ไฟล์นี้ render เอกสารทั้งใบเอง (มี <html>/<body> ของตัวเอง) เพราะเว็บมี
 * root layout สองตัว (ดู (th)/layout.tsx) URL ที่ไม่แมตช์อะไรเลยจึงไม่มี
 * layout ไหนเป็นเจ้าของ Next มี global-not-found ไว้สำหรับกรณีนี้พอดี
 *
 * ทำไมไม่ใช้ catch-all route ที่เรียก notFound() แทน — ลองแล้วได้สถานะ 404
 * ถูกต้องก็จริง แต่ Next ส่ง <body> เปล่ามา เนื้อหาไปอยู่ใน payload ให้
 * เบราว์เซอร์ประกอบเองทีหลัง คนที่ปิด JS หรือบอทที่ไม่รัน JS จะเห็นหน้าว่าง
 * ส่วนไฟล์นี้ถูก render ที่เซิร์ฟเวอร์จริง เนื้อหาอยู่ใน HTML ตั้งแต่แรก
 *
 * เป็นหน้าสองภาษาเพราะมีได้ไฟล์เดียว แต่ URL ที่หลงมาถึงตรงนี้มาจากได้ทุกภาษา
 * ตัวไทยเป็นหลัก (lang ของเอกสาร) อังกฤษกำกับ lang="en" ไว้ให้โปรแกรมอ่านหน้าจอ
 * เปลี่ยนเสียงถูก ส่วน /en/<หน้าที่ไม่มี> ยังได้หน้า 404 อังกฤษเต็มๆ จาก
 * (en)/en/not-found.tsx ตามเดิม
 */
export default function GlobalNotFound() {
  return (
    <html lang="th" className={kanit.variable}>
      <body className="antialiased bg-neutral-50 text-neutral-900 font-sans">
        <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
          <Image
            src="/images/notfound/404.webp"
            alt="ภาพประกอบ: จุดเล็กๆ หลงทางกำลังตามหากลุ่มก้อนสี"
            width={260}
            height={260}
            className="mb-6 rounded-lg"
            priority
          />
          <p className="text-sm font-medium text-pink-500 mb-3">404</p>
          <h1 className="text-3xl md:text-4xl font-medium text-neutral-900">
            ไม่พบหน้านี้
          </h1>
          <p className="mt-4 max-w-md text-neutral-600">
            หน้าที่คุณต้องการอาจถูกลบ ย้าย หรือ URL ไม่ถูกต้อง
          </p>
          <p lang="en" className="mt-2 max-w-md text-neutral-500">
            This page may have been removed or renamed, or the URL may be
            incorrect.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center rounded-lg bg-pink-700 px-6 py-3 font-medium text-white transition-colors hover:bg-pink-900"
            >
              กลับหน้าแรก
            </Link>
            <Link
              href="/collaborate"
              className="inline-flex items-center rounded-lg border border-blue-700 px-6 py-3 font-medium text-blue-700 transition-colors hover:bg-blue-50"
            >
              ติดต่อเรา
            </Link>
            <Link
              lang="en"
              href="/en"
              className="inline-flex items-center rounded-lg border border-ink-300 px-6 py-3 font-medium text-ink-900 transition-colors hover:bg-ink-100"
            >
              English
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
