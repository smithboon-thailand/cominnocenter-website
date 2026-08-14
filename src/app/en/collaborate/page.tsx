import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import NewsletterForm from "@/components/NewsletterForm";

const collaborationWays = [
  {
    title: "Partnership",
    description: "Co-develop projects and create long-term impact together.",
  },
  {
    title: "Training & Capacity Building",
    description: "Design and deliver communication innovation training for your organization.",
  },
  {
    title: "Research & Evaluation",
    description: "Research and evaluate communication projects systematically and rigorously.",
  },
];

export default function EnglishCollaboratePage() {
  return (
    <div className="min-h-screen">
      <Header active="collaborate" locale="en" />

      <section className="max-w-7xl mx-auto px-6 pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900">
            Create impact
            <br />
            <span className="text-blue-700">together</span>
          </h1>
          <p className="mt-6 text-lg text-neutral-600 leading-relaxed max-w-2xl">
            Whether research, training, campaigns, or other forms of collaboration — we welcome
            partnerships with government, business, and civil society to build communication
            innovation for quality of life and sustainability.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collaborationWays.map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-2xl border border-neutral-200 bg-white hover:border-pink-300 hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <div className="w-3 h-3 rounded-full bg-blue-700" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">{item.title}</h3>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <h2 className="text-2xl md:text-3xl font-semibold text-blue-700 mb-2">
                Send us a message
              </h2>
              <p className="text-neutral-600 mb-8">
                Share a brief outline of your project or needs. Our team will follow up.
              </p>
              <ContactForm locale="en" />
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-8 sticky top-28">
                <h3 className="text-lg font-semibold text-blue-700 mb-6">Contact details</h3>
                <div className="space-y-6 text-sm">
                  <div>
                    <div className="text-neutral-500 mb-1">Email</div>
                    <a
                      href="mailto:comminno@chula.ac.th"
                      className="text-neutral-900 font-medium hover:text-pink-500"
                    >
                      comminno@chula.ac.th
                    </a>
                  </div>

                  <div>
                    <div className="text-neutral-500 mb-1">Phone</div>
                    <a
                      href="tel:022182262"
                      className="text-neutral-900 font-medium hover:text-pink-500"
                    >
                      02-218-2262
                    </a>
                  </div>

                  <div>
                    <div className="text-neutral-500 mb-1">Address</div>
                    <p className="text-neutral-900 leading-relaxed">
                      Faculty of Communication Arts
                      <br />
                      Chulalongkorn University
                      <br />
                      Bangkok, Thailand
                    </p>
                  </div>

                  <div>
                    <div className="text-neutral-500 mb-2">Social</div>
                    <div className="flex gap-4">
                      <a
                        href="https://www.instagram.com/comm.inno21/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-900 font-medium hover:text-pink-500"
                      >
                        Instagram
                      </a>
                      <a
                        href="https://www.facebook.com/comm.inno21"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-900 font-medium hover:text-pink-500"
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

      <section className="bg-neutral-100">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl font-semibold text-blue-700">
              Not ready to reach out yet?
            </h2>
            <p className="mt-2 text-neutral-600 text-sm mb-6">
              Subscribe to our newsletter for future collaboration opportunities.
            </p>
            <div className="max-w-md mx-auto">
              <NewsletterForm variant="light" locale="en" />
            </div>
          </div>
        </div>
      </section>

      <Footer locale="en" />
    </div>
  );
}
