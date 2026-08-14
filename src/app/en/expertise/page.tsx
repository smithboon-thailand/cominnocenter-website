import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import { services } from "@/data/services";
import { SDG, sdgAria } from "@/data/sdg";

export const metadata = {
  alternates: {
    canonical: "/en/expertise",
    languages: { th: "/expertise", en: "/en/expertise", "x-default": "/expertise" },
  },
  title: "Expertise",
  description:
    "Nine services from research and training to print, video, and campaigns — each connected to the Sustainable Development Goals",
};

export default function EnglishExpertisePage() {
  return (
    <div className="min-h-screen">
      <Header active="expertise" locale="en" />

      <section className="mx-auto max-w-7xl px-6 pb-12 pt-20 md:pt-28">
        <p className="mb-2 text-[13px] font-medium uppercase leading-[1.4] tracking-[0.12em] text-pink-500">
          Expertise
        </p>
        <h1 className="text-h1-m md:text-h1 text-ink-900">
          Nine services covering the whole communication process
        </h1>
        <p className="mt-4 max-w-prose text-[17px] leading-[1.7] text-ink-700">
          From research to delivery, we turn communication innovation into real quality-of-life
          outcomes. The colored dots under each service show the SDGs where it has already
          delivered work.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service.key} className="rounded-lg border border-ink-300 bg-white p-6">
              <h2 className="text-h3-m md:text-h3 text-ink-900">{service.title}</h2>
              <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                {service.sdg.map((id) => (
                  <span
                    key={id}
                    aria-label={sdgAria(id, "en")}
                    className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-500"
                  >
                    <span
                      aria-hidden
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: SDG[id].pure }}
                    />
                    {id}
                  </span>
                ))}
              </p>
              <p className="mt-3 text-[15px] leading-[1.6] text-ink-700">{service.descEn}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink-900">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <h2 className="text-h2-m md:text-h2 text-white">
            Interested in a particular service?
          </h2>
          <p className="mx-auto mt-3 max-w-prose text-[17px] leading-[1.7] text-ink-300">
            Tell us what you need and we will design an approach that fits your organization.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/en/collaborate">Contact us</Button>
          </div>
        </div>
      </section>

      <Footer locale="en" />
    </div>
  );
}
