import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";
import { getLocalizedProjectCopy } from "@/data/projectCopyEn";

export default function EnglishImpactPage() {
  return (
    <div className="min-h-screen">
      <Header active="impact" locale="en" />

      <section className="max-w-7xl mx-auto px-6 pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900">
            Our impact
          </h1>
          <p className="mt-6 text-lg text-neutral-600 leading-relaxed max-w-2xl">
            Selected projects that turn communication innovation into real outcomes for quality of
            life and sustainability.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const copy = getLocalizedProjectCopy(project);
            return (
              <Link
                key={project.slug}
                href={`/en/impact/${project.slug}`}
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
                    {project.titleEn}
                  </h3>
                  {project.title !== project.titleEn && (
                    <p className="text-sm text-neutral-500 mt-1">{project.title}</p>
                  )}
                  <p className="mt-3 text-sm text-neutral-600 leading-relaxed line-clamp-3">
                    {copy.outcome}
                  </p>
                  <p className="mt-4 text-sm font-medium text-pink-500 group-hover:text-pink-600">
                    Read case study →
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Want to create impact like this together?
          </h2>
          <p className="mt-3 text-blue-100 max-w-xl mx-auto">
            Tell us about your project or needs — we would love to hear from you.
          </p>
          <Link
            href="/en/collaborate"
            className="inline-flex items-center mt-8 px-8 py-3.5 rounded-lg bg-pink-500 text-white font-medium hover:bg-pink-600 transition-colors"
          >
            Collaborate with us
          </Link>
        </div>
      </section>

      <Footer locale="en" />
    </div>
  );
}
