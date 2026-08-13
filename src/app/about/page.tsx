import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const objectives = [
  {
    number: "01",
    title: "Teaching & Training",
    titleTh: "การเรียนการสอนและการอบรม",
    description:
      "พัฒนาองค์ความรู้และจัดอบรมด้านนวัตกรรมการสื่อสาร ให้กับบุคลากร องค์กร และผู้ที่สนใจนำไปใช้จริง",
  },
  {
    number: "02",
    title: "Community Advocacy",
    titleTh: "การขับเคลื่อนสังคม",
    description:
      "สร้างการรับรู้และขับเคลื่อนประเด็นสำคัญ เพื่อคุณภาพชีวิตและความยั่งยืน ผ่านการสื่อสารที่มีประสิทธิภาพ",
  },
  {
    number: "03",
    title: "Tools & Innovation",
    titleTh: "เครื่องมือและนวัตกรรม",
    description:
      "วิจัยและพัฒนาเครื่องมือ แนวทางปฏิบัติ และนวัตกรรมการสื่อสาร ที่เป็นประโยชน์ต่อสังคมและองค์กร",
  },
];

const leadership = [
  {
    name: "รศ.ดร.สมิทธ์ บุญชุติมา",
    nameEn: "Assoc. Prof. Dr. Smith Boonchutima",
    role: "Head of the Center",
    roleTh: "ผู้อำนวยการศูนย์",
  },
  {
    name: "ผศ.ดร.ธีรดา ชาญวิเศษ",
    nameEn: "Asst. Prof. Dr. Teerada Chongkolrattanaporn",
    role: "Deputy Head",
    roleTh: "รองผู้อำนวยการ",
  },
  {
    name: "Dr. Pavel Slutskiy",
    nameEn: "Dr. Pavel Slutskiy",
    role: "Deputy Head",
    roleTh: "รองผู้อำนวยการ",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header active="about" />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900">
            เกี่ยวกับศูนย์
          </h1>
          <p className="mt-6 text-lg text-neutral-600 leading-relaxed max-w-2xl">
            ศูนย์ความเป็นเลิศด้านนวัตกรรมการสื่อสารเพื่อการพัฒนาคุณภาพชีวิตและความยั่งยืน
            คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-blue-700 mb-6">
            เรื่องราวของเรา
          </h2>
          <div className="space-y-4 text-neutral-700 leading-relaxed text-lg">
            <p>
              ศูนย์ความเป็นเลิศด้านนวัตกรรมการสื่อสาร ก่อตั้งขึ้นภายใต้คณะนิเทศศาสตร์
              จุฬาลงกรณ์มหาวิทยาลัย เพื่อเป็นศูนย์กลางในการสร้างองค์ความรู้
              พัฒนานวัตกรรม และขับเคลื่อนการสื่อสารที่ส่งผลต่อคุณภาพชีวิตและความยั่งยืน
            </p>
            <p>
              เราทำงานร่วมกับภาครัฐ ภาคเอกชน และภาคประชาสังคม
              ผ่านการวิจัย การพัฒนาเครื่องมือ การอบรม และการสร้างเครือข่ายความร่วมมือ
              เพื่อให้นวัตกรรมการสื่อสารเกิดประโยชน์อย่างแท้จริงต่อสังคมไทยและภูมิภาค
            </p>
          </div>
        </div>
      </section>

      {/* 3 Objectives */}
      <section className="bg-white border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold text-blue-700 mb-10">
            วัตถุประสงค์หลัก
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {objectives.map((item) => (
              <div key={item.number}>
                <div className="text-5xl font-bold text-pink-500/25 mb-3">{item.number}</div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-1">{item.titleTh}</h3>
                <p className="text-sm text-neutral-500 mb-3">{item.title}</p>
                <p className="text-neutral-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold text-blue-700 mb-3">
          ผู้นำของศูนย์
        </h2>
        <p className="text-neutral-600 mb-10 max-w-2xl">
          ทีมผู้นำที่มีประสบการณ์ด้านวิชาการและการปฏิบัติจริง
          เพื่อขับเคลื่อนภารกิจของศูนย์ให้เกิดผลอย่างเป็นรูปธรรม
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leadership.map((person) => (
            <div
              key={person.name}
              className="rounded-2xl border border-neutral-200 bg-white p-6 hover:shadow-md transition-shadow"
            >
              <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-blue-50 to-pink-50 mb-5 flex items-center justify-center">
                <span className="text-sm text-neutral-400">รูปภาพผู้นำ</span>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">{person.name}</h3>
              <p className="text-sm text-neutral-500 mt-0.5">{person.nameEn}</p>
              <p className="text-sm font-medium text-pink-500 mt-2">{person.roleTh}</p>
              <p className="text-xs text-neutral-500 mt-0.5">{person.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold">สนใจร่วมงานกับเรา?</h2>
          <p className="mt-3 text-blue-100 max-w-xl mx-auto">
            เรายินดีรับฟังและร่วมพัฒนาโครงการที่สร้างผลกระทบจริงต่อสังคม
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
