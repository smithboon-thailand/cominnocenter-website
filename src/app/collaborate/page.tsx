import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import NewsletterForm from "@/components/NewsletterForm";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata = {
  alternates: {
    canonical: "/collaborate",
    languages: { th: "/collaborate", en: "/en/collaborate", "x-default": "/collaborate" },
  },
  title: "ร่วมงานกับเรา",
  description:
    "ชวนศูนย์ฯ ร่วมพัฒนาโครงการ วิจัย อบรม หรือแคมเปญการสื่อสารที่วัดผลได้ — เรายินดีร่วมงานกับภาครัฐ ภาคเอกชน และภาคประชาสังคม",
};

/** หน้านี้ไม่มีสี SDG — โฟกัสที่การกระทำ (ชมพู) ตาม BRAND.md PART H */
const collaborationWays = [
  {
    titleTh: "ความร่วมมือเชิงโครงการ",
    description: "ร่วมพัฒนาโครงการและสร้างผลกระทบระยะยาวร่วมกัน",
  },
  {
    titleTh: "การอบรมและพัฒนาศักยภาพ",
    description: "ออกแบบและจัดอบรมด้านนวัตกรรมการสื่อสารให้กับองค์กรของคุณ",
  },
  {
    titleTh: "วิจัยและประเมินผล",
    description: "วิจัยและประเมินผลโครงการสื่อสารอย่างเป็นระบบและน่าเชื่อถือ",
  },
];

export default function CollaboratePage() {
  return (
    <div className="min-h-screen">
      <Header active="collaborate" />
      <main>

      <section className="mx-auto max-w-7xl px-6 pb-12 pt-20 md:pt-28">
        <p className="mb-2 text-[13px] font-medium leading-[1.4] tracking-[0.12em] text-pink-500">
          ร่วมงานกับเรา
        </p>
        <h1 className="text-h1-m md:text-h1 text-ink-900">ร่วมสร้างผลกระทบไปด้วยกัน</h1>
        <p className="mt-4 max-w-prose text-[17px] leading-[1.7] text-ink-700">
          ไม่ว่าจะเป็นงานวิจัย การอบรม แคมเปญ หรือความร่วมมือรูปแบบอื่น
          เรายินดีร่วมงานกับภาครัฐ ภาคเอกชน และภาคประชาสังคม
          เพื่อสร้างนวัตกรรมการสื่อสารที่ส่งผลต่อคุณภาพชีวิตและความยั่งยืน
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {collaborationWays.map((item) => (
            <div key={item.titleTh} className="rounded-lg border border-ink-300 bg-white p-6">
              <h2 className="text-h3-m md:text-h3 text-ink-900">{item.titleTh}</h2>
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
                title="ส่งข้อความถึงเรา"
                description="กรอกแบบฟอร์มด้านล่าง แล้วเราจะติดต่อกลับโดยเร็วที่สุด"
              />
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="h-full rounded-lg border border-ink-300 bg-ink-0 p-8">
                <h3 className="text-h3-m md:text-h3 text-ink-900">ช่องทางติดต่อโดยตรง</h3>
                <div className="mt-6 space-y-6 text-[15px] leading-[1.6]">
                  <div>
                    <p className="mb-1 text-ink-500">อีเมล</p>
                    <a
                      href="mailto:comminno@chula.ac.th"
                      className="font-medium text-ink-900 hover:text-pink-500"
                    >
                      comminno@chula.ac.th
                    </a>
                  </div>
                  <div>
                    <p className="mb-1 text-ink-500">โทรศัพท์</p>
                    <a
                      href="tel:022182262"
                      className="font-medium text-ink-900 hover:text-pink-500"
                    >
                      02-218-2262
                    </a>
                  </div>
                  <div>
                    <p className="mb-1 text-ink-500">ที่อยู่</p>
                    <p className="text-ink-900">
                      คณะนิเทศศาสตร์
                      <br />
                      จุฬาลงกรณ์มหาวิทยาลัย
                      <br />
                      กรุงเทพมหานคร
                    </p>
                  </div>
                  <div>
                    <p className="mb-2 text-ink-500">โซเชียลมีเดีย</p>
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
            <h2 className="text-h2-m md:text-h2 text-ink-900">ยังไม่พร้อมติดต่อตอนนี้</h2>
            <p className="mt-2 text-[15px] leading-[1.6] text-ink-700">
              สมัครรับจดหมายข่าว เพื่อติดตามโอกาสความร่วมมือในอนาคต
            </p>
            <div className="mx-auto mt-6 max-w-md">
              <NewsletterForm variant="light" />
            </div>
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
}
