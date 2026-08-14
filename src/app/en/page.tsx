import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";

const expertiseItems = [
  {
    title: "Training & Capacity Building",
    description: "Design and deliver communication innovation training for organizations",
  },
  {
    title: "Research & Evaluation",
    description: "In-depth research and systematic evaluation of communication projects",
  },
  {
    title: "Campaigns & Communication",
    description: "Strategy and campaign management for meaningful change",
  },
  {
    title: "Video & Multimedia",
    description: "High-quality video, AR, and creative media production",
  },
];

const featured = projects.slice(0, 3);

export default function EnglishHomePage() {
  return (
    <div className="min-h-screen">
      <Header active="home" locale="en" />

      <section className="max-w-7xl mx-auto px-6 pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 leading-[1.1]">
            COMMUNICATION
            <br />
            <span className="text-blue-700">INNOVATION</span>
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-neutral-600 font-light tracking-wide">
            FOR A BETTER LIFE
          </p>
          <p className="mt-8 text-lg text-neutral-700 max-w-xl leading-relaxed">
            Center of Excellence in Communication Innovation for the Development of Quality of Life
            and Sustainability, Faculty of Communication Arts, Chulalongkorn University
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/en/collaborate"
              className="inline-flex items-center px-8 py-3.5 rounded-lg bg-pink-500 text-white font-medium hover:bg-pink-600 transition-colors"
            >
              Collaborate with us
            </Link>
            <Link
              href="/en/impact"
              className="inline-flex items-center px-8 py-3.5 rounded-lg border border-blue-700 text-blue-700 font-medium hover:bg-blue-50 transition-colors"
            >
              View our impact
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-blue-700">50+</div>
              <div className="mt-2 text-sm text-neutral-600">Projects</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-blue-700">30+</div>
              <div className="mt-2 text-sm text-neutral-600">Partners</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-blue-700">1,000+</div>
              <div className="mt-2 text-sm text-neutral-600">Trainees</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-blue-700">10+</div>
              <div className="mt-2 text-sm text-neutral-600">Years</div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-blue-700">Our Expertise</h2>
            <p className="mt-3 text-neutral-600 max-w-xl">
              Multidisciplinary capabilities to turn communication innovation into real impact
            </p>
          </div>
          <Link href="/en/expertise" className="text-pink-500 font-medium hover:text-pink-600">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {expertiseItems.map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-2xl border border-neutral-200 bg-neutral-50 hover:border-pink-300 hover:shadow-md transition-all"
            >
              <h3 className="text-lg font-semibold text-neutral-900">{item.title}</h3>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-blue-700">Featured Impact</h2>
            <p className="mt-3 text-neutral-600 max-w-xl">
              Selected projects that advance quality of life and sustainability
            </p>
          </div>
          <Link href="/en/impact" className="text-pink-500 font-medium hover:text-pink-600">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((item) => (
            <Link
              key={item.slug}
              href={`/en/impact/${item.slug}`}
              className="group rounded-2xl border border-neutral-200 overflow-hidden bg-white hover:shadow-lg transition-shadow"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="33vw"
                />
              </div>
              <div className="p-6">
                <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-full bg-pink-100 text-pink-700 mb-3">
                  {item.sdg}
                </span>
                <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-blue-700">
                  {item.titleEn}
                </h3>
                <p className="mt-2 text-sm text-neutral-600">{item.outcome}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold">Ready to create impact together?</h2>
          <p className="mt-4 text-blue-100 max-w-xl mx-auto">
            Whether research, training, campaigns, or partnerships — we welcome collaboration.
          </p>
          <Link
            href="/en/collaborate"
            className="inline-flex items-center mt-8 px-8 py-3.5 rounded-lg bg-pink-500 text-white font-medium hover:bg-pink-600 transition-colors"
          >
            Contact us
          </Link>
        </div>
      </section>

      <Footer locale="en" />
    </div>
  );
}
