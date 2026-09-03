import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/effects/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { leadership } from "@/data/leadership";

type HomeLeadershipProps = {
  locale?: "th" | "en";
};

/** Compact leadership strip on Home — links to full profiles */
export default function HomeLeadership({ locale = "th" }: HomeLeadershipProps) {
  const isEn = locale === "en";
  const aboutHref = isEn ? "/en/about#leadership" : "/about#leadership";

  return (
    <section className="relative bg-neutral-50 border-y border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <Reveal>
            {/*
              **หมายเหตุ: ตอนนี้ไม่มีหน้าไหนเรียกใช้ component นี้** หน้าแรกทั้งสองภาษา
              เขียนบล็อกผู้นำของตัวเองไว้ในไฟล์หน้า ที่แก้ข้างล่างจึงเป็นการทำให้ไฟล์นี้
              ถูกต้องเผื่อวันที่มีคนหยิบไปใช้ ไม่ใช่การแก้บั๊กที่ผู้อ่านเห็นอยู่

              เดิมเขียน markup เอง ซึ่งหลุดออกจากระบบไปสี่เรื่องพร้อมกัน (3 ก.ย. 2569)
                1. ป้ายเหนือหัวเรื่องเป็นคำว่า "Leadership" **ตายตัวทั้งสองภาษา**
                   ถ้าถูกใช้จริงหน้าไทยจะขึ้นภาษาอังกฤษ ผิดกติกา i18n ข้อ 7 — และซ้ำกับ h2
                   ที่อยู่ใต้มันอยู่แล้ว จึงตัดทิ้งแทนการแต่งคำไทยขึ้นใหม่
                2. `font-semibold` = น้ำหนัก 600 ซึ่ง BRAND.md v1.2 **ห้าม**
                   (Kanit 400/500 เท่านั้น)
                3. `text-3xl md:text-4xl` ไม่ใช่ type scale ของแบรนด์
                4. `text-blue-700` / `text-neutral-600` ไม่ใช่ token ของแบรนด์
              ย้ายมาใช้ SectionHeader แก้ครบทั้งสี่เรื่องในครั้งเดียว
            */}
            <SectionHeader
              locale={locale}
              icon="people"
              title={isEn ? "Center leadership" : "ผู้นำของศูนย์"}
              description={
                isEn
                  ? "Academic and practice leaders — tap to view full profiles and selected works."
                  : "ทีมผู้นำด้านวิชาการและการปฏิบัติจริง กดเพื่อดูประวัติและผลงานฉบับเต็ม"
              }
            />
          </Reveal>
          <Reveal delay={100}>
            <Link
              href={aboutHref}
              className="text-pink-500 font-medium hover:text-pink-600 whitespace-nowrap"
            >
              {isEn ? "View full team →" : "ดูทีมทั้งหมด →"}
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10">
          {leadership.map((person, i) => (
            <Reveal key={person.nameEn} delay={i * 90}>
              <Link href={aboutHref} className="group block text-center">
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
                  {isEn ? person.nameEn : person.name}
                </h3>
                <p className="mt-1 text-sm text-pink-600 font-medium leading-snug">
                  {isEn ? person.role : person.roleTh.split("/")[0].trim()}
                </p>
                {!isEn && (
                  <p className="mt-0.5 text-xs text-neutral-500">{person.nameEn}</p>
                )}
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
