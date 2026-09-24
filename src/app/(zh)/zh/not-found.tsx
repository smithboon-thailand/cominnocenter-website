import Image from "next/image";
import Link from "next/link";
import { kanit } from "@/lib/fonts";
import { notoSansSC } from "@/lib/fontsZh";

/**
 * คู่ภาษาจีนของ (th)/not-found.tsx — สำรองเหมือนกัน ดูเหตุผลเต็มที่นั่น
 *
 * ใส่ตัวแปรฟอนต์ทั้งสองตัวเอง เพราะ Next render not-found นอกเปลือกของ layout
 * (กฎฟอนต์จีนใน globals.css ผูกกับ html[lang="zh-Hans"] ซึ่งไม่มีที่นี่ จึงระบุ
 * font-family ที่ตัวเองผ่าน style)
 */
export default function NotFound() {
  return (
    <main
      lang="zh-Hans"
      className={`${kanit.variable} ${notoSansSC.variable} min-h-screen bg-neutral-50 text-neutral-900 flex flex-col items-center justify-center px-6 text-center`}
      style={{ fontFamily: "var(--font-kanit), var(--font-noto-sc), system-ui, sans-serif" }}
    >
      <Image
        src="/images/notfound/404.webp"
        alt="插画：一个迷路的小圆点在寻找它的色彩群"
        width={250}
        height={372}
        className="mb-6 rounded-lg"
      />
      <p className="text-sm font-medium text-pink-500 mb-3">404</p>
      <h1 className="text-3xl md:text-4xl font-medium text-neutral-900">
        找不到该页面
      </h1>
      <p className="mt-4 text-neutral-600 max-w-md">
        您要访问的页面可能已被删除或更名，或者网址不正确。
      </p>
      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        <Link
          href="/zh"
          className="inline-flex items-center px-6 py-3 rounded-lg bg-pink-700 text-white font-medium hover:bg-pink-900 transition-colors"
        >
          返回首页
        </Link>
        <Link
          href="/zh/collaborate"
          className="inline-flex items-center px-6 py-3 rounded-lg border border-blue-700 text-blue-700 font-medium hover:bg-blue-50 transition-colors"
        >
          联系我们
        </Link>
      </div>
    </main>
  );
}
