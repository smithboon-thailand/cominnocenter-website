import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { illustration } from "@/data/illustrations";

const expertiseBanner = illustration("expertise-icons")!;

const services = [
  {
    title: "Book & Printing",
    description:
      "Design and produce high-quality print media, books, and documents for academic and organizational use.",
  },
  {
    title: "Motion Effect & AR",
    description:
      "Create interactive media experiences with motion graphics and augmented reality technology.",
  },
  {
    title: "Video Production",
    description:
      "Produce high-quality video for communication, campaigns, learning, and organizational storytelling.",
  },
  {
    title: "Training",
    description:
      "Design and deliver communication innovation training tailored to staff and organizations.",
  },
  {
    title: "Research & Evaluation",
    description:
      "Conduct in-depth research and systematic evaluation of communication projects for continuous improvement.",
  },
  {
    title: "Communication Design",
    description:
      "Design strategies and messages aligned with organizational goals and stakeholder needs.",
  },
  {
    title: "Campaign Management",
    description:
      "Plan and manage campaigns that drive meaningful changes in behavior and attitudes.",
  },
  {
    title: "Seminar",
    description:
      "Host seminars and knowledge-exchange forums on communication innovation.",
  },
  {
    title: "Marketing Event",
    description:
      "Design and run events that connect brands with people effectively and meaningfully.",
  },
];

export default function EnglishExpertisePage() {
  return (
    <div className="min-h-screen">
      <Header active="expertise" locale="en" />

      <section className="max-w-7xl mx-auto px-6 pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900">
              Our
              <br />
              <span className="text-blue-700">expertise</span>
            </h1>
            <p className="mt-6 text-lg text-neutral-600 leading-relaxed max-w-2xl">
              Multidisciplinary capabilities to turn communication innovation into real impact on
              quality of life and sustainability.
            </p>
          </div>
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-neutral-200 bg-white shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={expertiseBanner.src}
                alt={expertiseBanner.altEn || expertiseBanner.altTh}
                className="w-full aspect-[3/2] object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="group p-6 rounded-2xl border border-neutral-200 bg-white hover:border-pink-300 hover:shadow-md transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-5">
                <div className="w-3 h-3 rounded-full bg-blue-700" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-blue-700 transition-colors">
                {service.title}
              </h3>
              <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold">Looking for a specific service?</h2>
          <p className="mt-3 text-blue-100 max-w-xl mx-auto">
            Tell us what you need — we will design an approach that fits your organization.
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
