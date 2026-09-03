import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import { newsSorted, newsCover } from "@/data/news";

export const metadata = {
  alternates: {
    canonical: "/news",
    languages: { th: "/news", en: "/en/news", "x-default": "/news" },
  },
  title: "ข่าวและกิจกรรม",
  description:
    "ข่าวประชาสัมพันธ์ กิจกรรม และผลงานของศูนย์เชี่ยวชาญเฉพาะทางด้านนวัตกรรมการสื่อสารฯ คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
};

const THAI_MONTHS = [
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
];

function thaiDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${THAI_MONTHS[m - 1]} ${y + 543}`;
}

export default function NewsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>

      <PageHero
        page="news"
        locale="th"
        kicker="ข่าวและกิจกรรม"
        title="ข่าวและกิจกรรม"
        lede="ข่าวประชาสัมพันธ์ กิจกรรม และเรื่องราวจากการทำงานของศูนย์ฯ"
      />

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsSorted.map((post) => (
            <Link
              key={post.slug}
              href={`/news/${post.slug}`}
              className="group rounded-2xl border border-neutral-200 overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={newsCover(post.slug)}
                  alt={`${post.titleTh} — ภาพจากข่าวของศูนย์`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <p className="text-xs font-medium text-neutral-500 mb-2">{thaiDate(post.date)}</p>
                <h2 className="text-h3-m md:text-h3 text-ink-900 group-hover:text-pink-700 transition-colors">
                  {post.titleTh}
                </h2>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed line-clamp-3">
                  {post.bodyTh[0]}
                </p>
                <p className="mt-4 text-sm font-medium text-pink-500 group-hover:text-pink-600">
                  อ่านต่อ →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
}
