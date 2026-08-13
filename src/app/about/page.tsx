import Image from "next/image";
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

const media = (id: string, ext: string = "jpg") =>
  `https://static.wixstatic.com/media/${id}~mv2.${ext}/v1/fill/w_800,h_1000,al_c,q_85,enc_auto/${id}~mv2.${ext}`;

const leadership = [
  {
    name: "รศ.ดร.สมิทธ์ บุญชุติมา",
    nameEn: "Assoc. Prof. Dr. Smith Boonchutima",
    role: "Head of the Center",
    roleTh: "หัวหน้าศูนย์ / Head of Research Operations Unit",
    // จากหน้า Smith.B ของเว็บเดิม (ไม่ใช่รูป อ.วรรษยุต)
    image: media("8e0d14_ecc50ab1da21439b9bc9043a1e5c9b6b"),
    alt: "รศ.ดร.สมิทธ์ บุญชุติมา หัวหน้าศูนย์ความเป็นเลิศด้านนวัตกรรมการสื่อสาร — ภาพจากหน้า Smith.B เว็บเดิม ComInnoCenter",
    education: [
      "Ph.D. in Sports Science (Health Promotion), Chulalongkorn University, 2018",
      "M.A. Transnational Communications & Global Media, Goldsmiths, University of London",
      "M.A. in Mass Communication (Advertising), Chulalongkorn University, 2000",
      "B.Com.Arts (Advertising), First-Class Honors, Chulalongkorn University, 2000",
    ],
    work: [
      "Associate Professor, Department of Public Relations, Faculty of Communication Arts, Chulalongkorn University",
      "President, Asian Congress for Media and Communication (ACMC)",
      "Former international television commercial producer, Hub Ho Hin Bangkok",
    ],
    focus:
      "สนใจงานวิจัยด้านการสื่อสารข้ามชาติ สื่อใหม่ การสื่อสารสุขภาพ และการสื่อสารเพื่อการเรียนรู้ เคยได้รับรางวัลจากจุฬาลงกรณ์มหาวิทยาลัยด้านการสอนในสาขาสังคมศาสตร์",
  },
  {
    name: "รศ.ดร.ธีรดา จงกลรัตนาภรณ์",
    nameEn: "Assoc. Prof. Dr. Teerada (Ne) Chongkolrattanaporn",
    role: "Deputy Head",
    roleTh: "รองหัวหน้าศูนย์ / Deputy Head of Research Operations Unit",
    // จากหน้าโปรไฟล์ Teerada.Ne ของเว็บเดิม
    image: media("25218b_89b42fbbe4814a6482683b96cc6f59e7"),
    alt: "รศ.ดร.ธีรดา จงกลรัตนาภรณ์ รองหัวหน้าศูนย์ — ภาพจากหน้า Teerada.Ne เว็บเดิม ComInnoCenter",
    education: [
      "Ph.D. in International Communication, Macquarie University",
      "Ph.D. in Communication Studies, Chulalongkorn University",
      "M.A. in Speech and Communication Studies, San Francisco State University",
      "B.A. in English Language, Chulalongkorn University",
    ],
    work: [
      "Associate Professor, Department of Public Relations, Faculty of Communication Arts, Chulalongkorn University",
      "Head of the Department of Public Relations, Faculty of Communication Arts, Chulalongkorn University",
    ],
    focus:
      "เชี่ยวชาญด้าน Crisis Communication, Environmental Communications, Persuasion and Negotiation, International Image and Reputation และ Framing Theory / Public Relations Campaigns",
  },
  {
    name: "รศ.ดร. Pavel Slutskiy",
    nameEn: "Assoc. Prof. Dr. Pavel Slutskiy",
    role: "Deputy Head",
    roleTh: "รองหัวหน้าศูนย์ / Deputy Head of Research Operations Unit",
    image: media("8e0d14_bb83dfe119da43c19b9ba2cc2480023f"),
    alt: "Assoc. Prof. Dr. Pavel Slutskiy รองหัวหน้าศูนย์ — ภาพจากเว็บเดิม ComInnoCenter",
    education: [
      "Ph.D., Saint-Petersburg State University (2008) — Journalism (Political Science)",
      "M.A./B.A. (cum laude) Public Relations — double degree, Saint-Petersburg State Electrotechnical University & Towson University, USA (1996–2001)",
    ],
    work: [
      "Associate Professor, Faculty of Communication Arts, Chulalongkorn University (2014–present)",
      "Faculty, Faculty of Journalism, PR and Advertising, Saint-Petersburg State University (2007–2014)",
      "Faculty, PR Department, Saint-Petersburg State Electrotechnical University (LETI) (2001–2009)",
    ],
    focus:
      "เชี่ยวชาญงานวิจัยด้านการสื่อสาร การเมือง และสื่อระหว่างประเทศ รวมถึงความร่วมมือทางวิชาการระดับนานาชาติ",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header active="about" />

      <section className="max-w-7xl mx-auto px-6 pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-pink-500 mb-3">เกี่ยวกับเรา</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900">
            ศูนย์ความเป็นเลิศ
            <br />
            <span className="text-blue-700">ด้านนวัตกรรมการสื่อสาร</span>
          </h1>
          <p className="mt-6 text-lg text-neutral-600 leading-relaxed max-w-2xl">
            เพื่อการพัฒนาคุณภาพชีวิตและความยั่งยืน
            คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-blue-700 mb-6">
              เรื่องราวของเรา
            </h2>
            <div className="space-y-4 text-neutral-700 leading-relaxed">
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
          <div className="rounded-2xl bg-gradient-to-br from-blue-50 via-neutral-50 to-pink-50 border border-neutral-200 p-8 md:p-10">
            <h3 className="text-lg font-semibold text-blue-700 mb-4">วิสัยทัศน์</h3>
            <p className="text-neutral-700 leading-relaxed">
              เป็นศูนย์ชั้นนำด้านนวัตกรรมการสื่อสาร ที่สร้างผลกระทบเชิงบวกต่อคุณภาพชีวิต
              และความยั่งยืนในระดับประเทศและภูมิภาค
            </p>
            <h3 className="text-lg font-semibold text-blue-700 mt-8 mb-4">พันธกิจ</h3>
            <p className="text-neutral-700 leading-relaxed">
              สร้างองค์ความรู้ พัฒนานวัตกรรม และเชื่อมโยงเครือข่าย
              เพื่อยกระดับศักยภาพการสื่อสารของสังคมไทยอย่างยั่งยืน
            </p>
          </div>
        </div>
      </section>

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

      <section className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-blue-700 mb-3">
            ผู้นำของศูนย์
          </h2>
          <p className="text-neutral-600 max-w-2xl">
            ทีมผู้นำที่มีประสบการณ์ด้านวิชาการและการปฏิบัติจริง
            เพื่อขับเคลื่อนภารกิจของศูนย์ให้เกิดผลอย่างเป็นรูปธรรม
          </p>
        </div>

        <div className="space-y-16">
          {leadership.map((person, index) => (
            <article
              key={person.nameEn}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start"
            >
              <div className={`md:col-span-4 ${index % 2 === 1 ? "md:order-2" : ""}`}>
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100">
                  <Image
                    src={person.image}
                    alt={person.alt}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>

              <div className={`md:col-span-8 ${index % 2 === 1 ? "md:order-1" : ""}`}>
                <p className="text-sm font-medium text-pink-500">{person.roleTh}</p>
                <h3 className="mt-1 text-2xl md:text-3xl font-semibold text-neutral-900">
                  {person.name}
                </h3>
                <p className="text-neutral-500">{person.nameEn}</p>
                <p className="text-xs text-neutral-400 mt-1">{person.role}</p>

                <p className="mt-5 text-neutral-700 leading-relaxed">{person.focus}</p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold text-blue-700 mb-2">ประวัติการศึกษา</h4>
                    <ul className="space-y-2 text-sm text-neutral-600 leading-relaxed">
                      {person.education.map((item) => (
                        <li key={item} className="pl-3 border-l-2 border-pink-200">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-blue-700 mb-2">ประสบการณ์การทำงาน</h4>
                    <ul className="space-y-2 text-sm text-neutral-600 leading-relaxed">
                      {person.work.map((item) => (
                        <li key={item} className="pl-3 border-l-2 border-blue-200">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 text-xs text-neutral-400">
          ภาพและข้อมูลประวัติอ้างอิงจากหน้า About / โปรไฟล์บุคคลของเว็บไซต์เดิม ComInnoCenter
        </p>
      </section>

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
