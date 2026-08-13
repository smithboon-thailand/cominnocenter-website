import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";

export default function ImpactPage() {
  return (
    <div className="min-h-screen">
      <Header active="impact" />

      <section className="max-w-7xl mx-auto px-6 pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900">
            ผลงานของเรา
          </h1>
          <p className="mt-6 text-lg text-neutral-600 leading-relaxed max-w-2xl">
            ตัวอย่างโครงการที่เปลี่ยนนวัตกรรมการสื่อสารให้เกิดผลกระทบจริง
            ต่อคุณภาพชีวิตและความยั่งยืน
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/impact/${project.slug}`}
              className="group rounded-2xl border border-neutral-200 overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-full bg-pink-100 text-pink-700 mb-3">
                  {project.sdg} · {project.sdgLabel}
                </span>
                <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-blue-700 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-neutral-500 mt-1">{project.titleEn}</p>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                  {project.outcome}
                </p>
                <p className="mt-4 text-sm font-medium text-pink-500 group-hover:text-pink-600">
                  อ่านรายละเอียด →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold">
            อยากสร้างผลกระทบแบบนี้ไปด้วยกัน?
          </h2>
          <p className="mt-3 text-blue-100 max-w-xl mx-auto">
            บอกเราเกี่ยวกับโครงการหรือความต้องการของคุณได้เลย
          </p>
          <Link
            href="/collaborate"
            className="inline-flex items-center mt-8 px-8 py-3.5 rounded-lg bg-pink-500 text-white font-medium hover:bg-pink-600 transition-colors"
          >
            ร่วมงานกับเรา
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
