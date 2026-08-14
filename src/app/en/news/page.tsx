import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { newsSorted, newsCover } from "@/data/news";

export const metadata = {
  alternates: {
    canonical: "/en/news",
    languages: { th: "/news", en: "/en/news", "x-default": "/news" },
  },
  title: "News & Events",
  description:
    "News, events, and stories from the Center of Excellence in Communication Innovation, Faculty of Communication Arts, Chulalongkorn University",
};

function enDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${months[m - 1]} ${d}, ${y}`;
}

export default function NewsPageEn() {
  return (
    <div className="min-h-screen">
      <Header locale="en" />

      <section className="max-w-7xl mx-auto px-6 pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900">
            News &amp; Events
          </h1>
          <p className="mt-6 text-lg text-neutral-600 leading-relaxed max-w-2xl">
            News, events, and stories from the center&apos;s work
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsSorted.map((post) => (
            <Link
              key={post.slug}
              href={`/en/news/${post.slug}`}
              className="group rounded-2xl border border-neutral-200 overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={newsCover(post.slug)}
                  alt={`${post.titleEn} — photo from the center's news archive`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <p className="text-xs font-medium text-neutral-500 mb-2">{enDate(post.date)}</p>
                <h2 className="text-h3-m md:text-h3 text-ink-900 group-hover:text-pink-700 transition-colors">
                  {post.titleEn}
                </h2>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed line-clamp-3">
                  {post.bodyEn[0]}
                </p>
                <p className="mt-4 text-sm font-medium text-pink-500 group-hover:text-pink-600">
                  Read more →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer locale="en" />
    </div>
  );
}
