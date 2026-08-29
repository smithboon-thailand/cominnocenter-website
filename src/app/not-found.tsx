import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center px-6 text-center">
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
