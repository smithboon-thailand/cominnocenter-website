import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import PageHero from "@/components/ui/PageHero";
import MediaExplorer from "@/components/media/MediaExplorer";
import { mediaSorted } from "@/data/media";

export const metadata = {
  alternates: {
    canonical: "/en/media",
    languages: { th: "/media", en: "/en/media", "x-default": "/media" },
  },
  title: "In the media",
  description:
    "News, research, podcasts, and external media featuring the professors and work of the Center of Excellence in Communication Innovation",
};

export default function MediaPageEn() {
  return (
    <div className="min-h-screen">
      <Header active="media" locale="en" />
      <main>

      <PageHero
        page="media"
        locale="en"
        kicker="In the media"
        title="Where our work appears"
        lede={
          <>
            News, research, books, podcasts, and external media featuring our professors and the
            center&rsquo;s work — {mediaSorted.length} items in total. Filter by professor or type.
          </>
        }
      />

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <MediaExplorer locale="en" />
      </section>

      <section className="bg-ink-900">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <h2 className="text-h2-m md:text-h2 text-white">
            Want our professors at your event?
          </h2>
          <p className="mx-auto mt-3 max-w-prose text-[17px] leading-[1.7] text-ink-300">
            Contact us for talks, interviews, or research collaboration
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/en/collaborate">Contact us</Button>
          </div>
        </div>
      </section>

      </main>
      <Footer locale="en" />
    </div>
  );
}
