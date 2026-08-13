import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import NewsletterForm from "@/components/NewsletterForm";

const collaborationWays = [
  {
    title: "Partnership",
    titleTh: "ความร่วมมือเชิงโครงการ",
    description: "ร่วมพัฒนาโครงการและสร้างผลกระทบระยะยาวร่วมกัน",
  },
  {
    title: "Training & Capacity Building",
    titleTh: "การอบรมและพัฒนาศักยภาพ",
    description: "ออกแบบและจัดอบรมด้านนวัตกรรมการสื่อสารให้กับองค์กรของคุณ",
  },
  {
    title: "Research & Evaluation",
    titleTh: "วิจัยและประเมินผล",
    description: "วิจัยและประเมินผลโครงการสื่อสารอย่างเป็นระบบและน่าเชื่อถือ",
  },
];

export default function CollaboratePage() {
  return (
    <div className="min-h-screen">
      <Header active="collaborate" />

      <section className="max-w-7xl mx-auto px-6 pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900">
            ร่วมสร้างผลกระทบ
            <br />
            <span className="text-blue-700">ไปด้วยกัน</span>
          </h1>
          <p className="mt-6 text-lg text-neutral-600 leading-relaxed max-w-2xl">
            ไม่ว่าจะเป็นงานวิจัย การอบรม แคมเปญ หรือความร่วมมือในรูปแบบอื่นๆ
            เรายินดีร่วมงานกับภาครัฐ ภาคเอกชน และภาคประชาสังคม
            เพื่อสร้างนวัตกรรมการสื่อสารที่ส่งผลต่อคุณภาพชีวิตและความยั่งยืน
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
              <h3 className="text-lg font-semibold text-neutral-900">{item.titleTh}</h3>
              <p className="text-sm text-neutral-500 mt-0.5">{item.title}</p>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <h2 className="text-2xl md:text-3xl font-semibold text-blue-700 mb-2">
                ส่งข้อความถึงเรา
              </h2>
              <p className="text-neutral-600 mb-8">
                กรอกแบบฟอร์มด้านล่าง แล้วเราจะติดต่อกลับโดยเร็วที่สุด
              </p>
              <ContactForm />
            </div>

            <div className="lg:col-span-2">
              <div className="bg-neutral-50 rounded-2xl p-8 border border-neutral-200 h-full">
                <h3 className="text-xl font-semibold text-blue-700 mb-6">
                  ช่องทางติดต่อโดยตรง
                </h3>

                <div className="space-y-6 text-sm">
                  <div>
                    <div className="text-neutral-500 mb-1">อีเมล</div>
                    <a
                      href="mailto:comminno@chula.ac.th"
                      className="text-neutral-900 font-medium hover:text-pink-500"
                    >
                      comminno@chula.ac.th
                    </a>
                  </div>

                  <div>
                    <div className="text-neutral-500 mb-1">โทรศัพท์</div>
                    <a
                      href="tel:022182262"
                      className="text-neutral-900 font-medium hover:text-pink-500"
                    >
                      02-218-2262
                    </a>
                  </div>

                  <div>
                    <div className="text-neutral-500 mb-1">ที่อยู่</div>
                    <p className="text-neutral-900 leading-relaxed">
                      คณะนิเทศศาสตร์
                      <br />
                      จุฬาลงกรณ์มหาวิทยาลัย
                      <br />
                      กรุงเทพมหานคร
                    </p>
                  </div>

                  <div>
                    <div className="text-neutral-500 mb-2">โซเชียลมีเดีย</div>
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
              ยังไม่พร้อมติดต่อตอนนี้?
            </h2>
            <p className="mt-2 text-neutral-600 text-sm mb-6">
              สมัครรับจดหมายข่าวเพื่อติดตามโอกาส Collaborate ในอนาคต
            </p>
            <div className="max-w-md mx-auto">
              <NewsletterForm variant="light" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
