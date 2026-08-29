import Image from "next/image";
import Link from "next/link";
import { kanit } from "@/lib/fonts";

/**
 * หน้า 404 ต้องเลี้ยงตัวเองได้ ไม่พึ่ง <html> ของ root layout
 *
 * Next render not-found ในเปลือก <html id="__next_error__"> ของตัวเอง
 * ไม่ใช่เปลือกของ layout เรา คลาสฟอนต์ที่ปกติอยู่บน <html> จึงหายไป
 * (เห็นได้จาก /impact/<slug ที่ไม่มีอยู่> บนเว็บจริงตั้งแต่ก่อนแก้)
 * จึงใส่ตัวแปรฟอนต์กับพื้นหลังไว้ที่ตัวเอง หน้านี้จะได้หน้าตาถูกเสมอ
 */
export default function NotFound() {
  return (
    <main
      lang="th"
      className={`${kanit.variable} font-sans min-h-screen bg-neutral-50 text-neutral-900 flex flex-col items-center justify-center px-6 text-center`}
    >
      <Image
        src="/images/notfound/404.webp"
        alt="ภาพประกอบ: จุดเล็กๆ หลงทางกำลังตามหากลุ่มก้อนสี"
        width={260}
        height={260}
        className="mb-6 rounded-lg"
      />
      <p className="text-sm font-medium text-pink-500 mb-3">404</p>
      <h1 className="text-3xl md:text-4xl font-medium text-neutral-900">
        ไม่พบหน้านี้
      </h1>
      <p className="mt-4 text-neutral-600 max-w-md">
        หน้าที่คุณต้องการอาจถูกลบ ย้าย หรือ URL ไม่ถูกต้อง
      </p>
      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 rounded-lg bg-pink-700 text-white font-medium hover:bg-pink-900 transition-colors"
        >
          กลับหน้าแรก
        </Link>
        <Link
          href="/collaborate"
          className="inline-flex items-center px-6 py-3 rounded-lg border border-blue-700 text-blue-700 font-medium hover:bg-blue-50 transition-colors"
        >
          ติดต่อเรา
        </Link>
      </div>
    </main>
  );
}
