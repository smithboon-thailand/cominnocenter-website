import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import NewsletterForm from "@/components/NewsletterForm";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata = {
  alternates: {
    canonical: "/en/collaborate",
    languages: { th: "/collaborate", en: "/en/collaborate", "x-default": "/collaborate" },
  },
  title: "Collaborate",
  description:
    "Partner with the center on research, training, or measurable communication campaigns — we welcome government, business, and civil society",
};

/** No SDG colors on this page — action (pink) leads, per BRAND.md PART H */
const collaborationWays = [
  {
    title: "Project partnership",
    description: "Develop projects together and create long-term impact",
  },
  {
    title: "Training & capacity building",
    description: "Design and deliver communication innovation training for your organization",
  },
  {
    title: "Research & evaluation",
    description: "Systematic, credible research and evaluation of communication projects",
  },
];

export default function EnglishCollaboratePage() {
  return (
    <div className="min-h-screen">
      <Header active="collaborate" locale="en" />
      <main>

      <section className="mx-auto max-w-7xl px-6 pb-12 pt-20 md:pt-28">
        <p className="mb-2 text-[13px] font-medium uppercase leading-[1.4] tracking-[0.12em] text-pink-500">
          Collaborate
        </p>
        <h1 className="text-h1-m md:text-h1 text-ink-900">Create impact together</h1>
        <p className="mt-4 max-w-prose text-[17px] leading-[1.7] text-ink-700">
          Whether research, training, campaigns, or other forms of collaboration — we welcome
          partnerships with government, business, and civil society to build communication
          innovation for quality of life and sustainability.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {collaborationWays.map((item) => (
            <div key={item.title} className="rounded-lg border border-ink-300 bg-white p-6">
              <h2 className="text-h3-m md:text-h3 text-ink-900">{item.title}</h2>
              <p className="mt-2 text-[15px] leading-[1.6] text-ink-700">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-ink-300 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <SectionHeader
                locale="en"
                title="Send us a message"
                description="Share a brief outline of your project or needs. Our team will follow up."
              />
              <div className="mt-8">
                <ContactForm locale="en" />
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="h-full rounded-lg border border-ink-300 bg-ink-0 p-8">
                <h3 className="text-h3-m md:text-h3 text-ink-900">Contact details</h3>
                <div className="mt-6 space-y-6 text-[15px] leading-[1.6]">
                  <div>
                    <p className="mb-1 text-ink-500">Email</p>
                    <a
                      href="mailto:comminno@chula.ac.th"
                      className="font-medium text-ink-900 hover:text-pink-500"
                    >
                      comminno@chula.ac.th
                    </a>
                  </div>
                  <div>
                    <p className="mb-1 text-ink-500">Phone</p>
                    <a
                      href="tel:022182262"
                      className="font-medium text-ink-900 hover:text-pink-500"
                    >
                      02-218-2262
                    </a>
                  </div>
                  <div>
                    <p className="mb-1 text-ink-500">Address</p>
                    <p className="text-ink-900">
                      Faculty of Communication Arts
                      <br />
                      Chulalongkorn University
                      <br />
                      Bangkok, Thailand
                    </p>
                  </div>
                  <div>
                    <p className="mb-2 text-ink-500">Social media</p>
                    <div className="flex gap-4">
                      <a
                        href="https://www.instagram.com/comm.inno21/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-ink-900 hover:text-pink-500"
                      >
                        Instagram
                      </a>
                      <a
                        href="https://www.facebook.com/comm.inno21"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-ink-900 hover:text-pink-500"
                      >
                        Facebook
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink-100">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-h2-m md:text-h2 text-ink-900">Not ready to reach out yet?</h2>
            <p className="mt-2 text-[15px] leading-[1.6] text-ink-700">
              Subscribe to our newsletter for future collaboration opportunities.
            </p>
            <div className="mx-auto mt-6 max-w-md">
              <NewsletterForm variant="light" locale="en" />
            </div>
          </div>
        </div>
      </section>

      </main>
      <Footer locale="en" />
    </div>
  );
}
