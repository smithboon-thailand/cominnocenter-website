import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterForm from "@/components/NewsletterForm";

const expertiseItems = [
  {
    title: "การอบรมและพัฒนาศักยภาพ",
    description: "ออกแบบและจัดอบรมด้านนวัตกรรมการสื่อสารให้กับองค์กร",
  },
  {
    title: "วิจัยและประเมินผล",
    description: "วิจัยเชิงลึกและประเมินผลโครงการสื่อสารอย่างเป็นระบบ",
  },
  {
    title: "แคมเปญและการสื่อสาร",
    description: "วางกลยุทธ์และบริหารแคมเปญเพื่อสร้างการเปลี่ยนแปลง",
  },
  {
    title: "วิดีโอและสื่อมัลติมีเดีย",
    description: "ผลิตสื่อวิดีโอ AR และสื่อสร้างสรรค์คุณภาพสูง",
  },
];

const featuredImpact = [
  {
    title: "โครงการสื่อสารเพื่อคุณภาพชีวิต",
    outcome: "สร้างการรับรู้และเปลี่ยนพฤติกรรมในระดับชุมชน",
    tag: "SDG 3",
    image: "https://static.wixstatic.com/media/25218b_3012f8f955424b788d79a19cd91abd99%7Emv2.jpg/v1/fit/w_1200,h_800,al_c/25218b_3012f8f955424b788d79a19cd91abd99%7Emv2.jpg",
    alt: "กิจกรรมนวัตกรรมการสื่อสารเพื่อพัฒนาคุณภาพชีวิต โดยศูนย์ความเป็นเลิศด้านนวัตกรรมการสื่อสาร คณะนิเทศศาสตร์ จุฬาฯ",
  },
  {
    title: "การพัฒนาศักยภาพบุคลากรด้านสื่อ",
    outcome: "อบรมบุคลากรมากกว่า 1,000 คน จากหลากหลายองค์กร",
    tag: "SDG 4",
    image: "https://static.wixstatic.com/media/25218b_4a7a9b23585c4d02bcc3566be8aadec2~mv2.jpg/v1/fit/w_1200,h_800,al_c/25218b_4a7a9b23585c4d02bcc3566be8aadec2~mv2.jpg",
    alt: "การอบรมพัฒนาศักยภาพบุคลากรด้านสื่อและนวัตกรรมการสื่อสาร โดย ComInnoCenter จุฬาลงกรณ์มหาวิทยาลัย",
  },
  {
    title: "ความร่วมมือเพื่อความยั่งยืน",
    outcome: "สร้างเครือข่ายความร่วมมือระหว่างภาครัฐและภาคประชาสังคม",
    tag: "SDG 17",
    image: "https://static.wixstatic.com/media/25218b_be1e0d6f1491498a97ae09afc2d11e44~mv2.jpg/v1/fit/w_1200,h_800,al_c/25218b_be1e0d6f1491498a97ae09afc2d11e44~mv2.jpg",
    alt: "เครือข่ายความร่วมมือด้านนวัตกรรมการสื่อสารเพื่อความยั่งยืน ศูนย์ความเป็นเลิศด้านนวัตกรรมการสื่อสาร",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header active="home" />

      <section className="relative max-w-7xl mx-auto px-6 pt-24 pb-20 md:pt-32 md:pb-28">
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
            ศูนย์ความเป็นเลิศด้านนวัตกรรมการสื่อสารเพื่อการพัฒนาคุณภาพชีวิตและความยั่งยืน
            คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/collaborate"
              className="inline-flex items-center px-8 py-3.5 rounded-lg bg-pink-500 text-white font-medium hover:bg-pink-600 transition-colors shadow-sm"
            >
              ร่วมงานกับเรา
            </Link>
            <Link
              href="/impact"
              className="inline-flex items-center px-8 py-3.5 rounded-lg border border-blue-700 text-blue-700 font-medium hover:bg-blue-50 transition-colors"
            >
              ดูผลงานของเรา
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-blue-700">50+</div>
              <div className="mt-2 text-sm text-neutral-600">โครงการ</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-blue-700">30+</div>
              <div className="mt-2 text-sm text-neutral-600">พันธมิตร</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-blue-700">1,000+</div>
              <div className="mt-2 text-sm text-neutral-600">ผู้เข้าร่วมอบรม</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-blue-700">10+</div>
              <div className="mt-2 text-sm text-neutral-600">ปีแห่งประสบการณ์</div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-semibold text-blue-700">เกี่ยวกับศูนย์</h2>
          <p className="mt-6 text-lg text-neutral-700 leading-relaxed">
            เราเป็นศูนย์วิจัยที่มุ่งสร้างองค์ความรู้และพัฒนานวัตกรรมการสื่อสาร
            เพื่อยกระดับคุณภาพชีวิตและความยั่งยืน ผ่านการวิจัย การพัฒนาเครื่องมือ
            การศึกษา และเครือข่ายความร่วมมือระหว่างภาครัฐ ภาคเอกชน และภาคประชาสังคม
          </p>
          <Link
            href="/about"
            className="inline-flex items-center mt-8 text-pink-500 font-medium hover:text-pink-600"
          >
            เรียนรู้เพิ่มเติมเกี่ยวกับเรา →
          </Link>
        </div>
      </section>

      <section className="bg-white border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-blue-700">
                ความเชี่ยวชาญของเรา
              </h2>
              <p className="mt-3 text-neutral-600 max-w-xl">
                เรามีความเชี่ยวชาญหลากหลายด้าน เพื่อตอบโจทย์การสื่อสารที่สร้างผลกระทบจริง
              </p>
            </div>
            <Link
              href="/expertise"
              className="text-pink-500 font-medium hover:text-pink-600 whitespace-nowrap"
            >
              ดูทั้งหมด →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertiseItems.map((item) => (
              <div
                key={item.title}
                className="group p-6 rounded-2xl border border-neutral-200 bg-neutral-50 hover:border-pink-300 hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-blue-700" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-blue-700 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-blue-700">ผลงานเด่น</h2>
            <p className="mt-3 text-neutral-600 max-w-xl">
              ตัวอย่างโครงการที่สร้างผลกระทบต่อการพัฒนาคุณภาพชีวิตและความยั่งยืน
            </p>
          </div>
          <Link
            href="/impact"
            className="text-pink-500 font-medium hover:text-pink-600 whitespace-nowrap"
          >
            ดูผลงานทั้งหมด →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredImpact.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-neutral-200 overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-full bg-pink-100 text-pink-700 mb-3">
                  {item.tag}
                </span>
                <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-blue-700 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{item.outcome}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-neutral-100 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-blue-700">
              รับข่าวสารและโอกาสความร่วมมือ
            </h2>
            <p className="mt-4 text-neutral-600 mb-8">
              สมัครรับจดหมายข่าวจากศูนย์ เพื่อติดตามผลงาน โอกาสอบรม
              และช่องทาง Collaborate ใหม่ๆ
            </p>
            <div className="max-w-md mx-auto">
              <NewsletterForm variant="light" />
            </div>
            <p className="mt-4 text-xs text-neutral-500">
              เราจะไม่ส่งสแปม และคุณสามารถยกเลิกได้ทุกเมื่อ
            </p>
          </div>
        </div>
      </section>

      <section className="bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold">
            พร้อมสร้างผลกระทบไปด้วยกันหรือยัง?
          </h2>
          <p className="mt-4 text-blue-100 max-w-xl mx-auto">
            ไม่ว่าจะเป็นงานวิจัย การอบรม แคมเปญ หรือความร่วมมือในรูปแบบอื่นๆ
            เรายินดีร่วมงานกับคุณ
          </p>
          <Link
            href="/collaborate"
            className="inline-flex items-center mt-8 px-8 py-3.5 rounded-lg bg-pink-500 text-white font-medium hover:bg-pink-600 transition-colors"
          >
            ติดต่อเรา
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
