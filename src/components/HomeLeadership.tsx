import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/effects/Reveal";
import { leadership } from "@/data/leadership";

/** Compact leadership strip on Home — links to full profiles on /about#leadership */
export default function HomeLeadership() {
  return (
    <section className="relative bg-neutral-50 border-y border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <Reveal>
            <div>
              <p className="text-sm font-medium text-pink-500 mb-2">Leadership</p>
              <h2 className="text-3xl md:text-4xl font-semibold text-blue-700">ผู้นำของศูนย์</h2>
              <p className="mt-3 text-neutral-600 max-w-xl">
                ทีมผู้นำด้านวิชาการและการปฏิบัติจริง กดเพื่อดูประวัติและผลงานฉบับเต็ม
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <Link
              href="/about#leadership"
              className="text-pink-500 font-medium hover:text-pink-600 whitespace-nowrap"
            >
              ดูทีมทั้งหมด →
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10">
          {leadership.map((person, i) => (
            <Reveal key={person.nameEn} delay={i * 90}>
              <Link
                href="/about#leadership"
                className="group block text-center"
              >
                <div className="relative mx-auto w-36 h-36 md:w-40 md:h-40">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-pink-200/60 via-transparent to-blue-200/50 opacity-0 group-hover:opacity-100 blur-md transition-opacity" />
                  <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white shadow-md ring-1 ring-neutral-200 group-hover:ring-pink-300 transition-all duration-300 group-hover:scale-[1.03]">
                    <Image
                      src={person.image}
                      alt={person.alt}
                      fill
                      className="object-cover object-top"
                      sizes="160px"
                    />
                  </div>
                </div>
                <h3 className="mt-5 text-base md:text-lg font-semibold text-neutral-900 group-hover:text-blue-700 transition-colors leading-snug">
                  {person.name}
                </h3>
                <p className="mt-1 text-sm text-pink-600 font-medium leading-snug">
                  {person.roleTh.split("/")[0].trim()}
                </p>
                <p className="mt-0.5 text-xs text-neutral-500">{person.nameEn}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
