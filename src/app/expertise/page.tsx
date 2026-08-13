import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const services = [
  {
    title: "Book & Printing",
    titleTh: "หนังสือและการพิมพ์",
    description: "ออกแบบและผลิตสื่อสิ่งพิมพ์ หนังสือ และเอกสารคุณภาพสูง สำหรับงานวิชาการและองค์กร",
  },
  {
    title: "Motion Effect & AR",
    titleTh: "โมชันและ Augmented Reality",
    description: "สร้างประสบการณ์สื่อแบบโต้ตอบด้วย Motion Graphics และเทคโนโลยี AR",
  },
  {
    title: "Video Production",
    titleTh: "การผลิตวิดีโอ",
    description: "ผลิตวิดีโอคุณภาพสูงสำหรับงานสื่อสาร แคมเปญ การเรียนรู้ และองค์กร",
  },
  {
    title: "Training",
    titleTh: "การอบรม",
    description: "ออกแบบและจัดอบรมด้านนวัตกรรมการสื่อสาร ให้กับบุคลากรและองค์กรอย่างตรงจุด",
  },
  {
    title: "Research & Evaluation",
    titleTh: "วิจัยและประเมินผล",
    description: "วิจัยเชิงลึกและประเมินผลโครงการสื่อสารอย่างเป็นระบบ เพื่อนำไปสู่การพัฒนาต่อเนื่อง",
  },
  {
    title: "Communication Design",
    titleTh: "การออกแบบการสื่อสาร",
    description: "ออกแบบกลยุทธ์และสื่อสารให้สอดคล้องกับเป้าหมายขององค์กรและผู้มีส่วนได้ส่วนเสีย",
  },
  {
    title: "Campaign Management",
    titleTh: "การบริหารแคมเปญ",
    description: "วางแผนและบริหารแคมเปญเพื่อสร้างการเปลี่ยนแปลงเชิงพฤติกรรมและทัศนคติ",
  },
  {
    title: "Seminar",
    titleTh: "สัมมนา",
    description: "จัดสัมมนาและเวทีแลกเปลี่ยนความรู้ด้านนวัตกรรมการสื่อสารอย่างมีคุณภาพ",
  },
  {
    title: "Marketing Event",
    titleTh: "กิจกรรมทางการตลาด",
    description: "ออกแบบและดำเนินกิจกรรมที่เชื่อมโยงแบรนด์กับผู้คนอย่างมีประสิทธิภาพและมีความหมาย",
  },
];

export default function ExpertisePage() {
  return (
    <div className="min-h-screen">
      <Header active="expertise" />

      <section className="max-w-7xl mx-auto px-6 pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900">
            ความเชี่ยวชาญ
            <br />
            <span className="text-blue-700">ของเรา</span>
          </h1>
          <p className="mt-6 text-lg text-neutral-600 leading-relaxed max-w-2xl">
            เรามีความเชี่ยวชาญหลากหลายด้าน เพื่อเปลี่ยนนวัตกรรมการสื่อสาร
            ให้เกิดผลกระทบจริงต่อคุณภาพชีวิตและความยั่งยืน
          </p>
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
                {service.titleTh}
              </h3>
              <p className="text-sm text-neutral-500 mt-1">{service.title}</p>
              <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold">
            สนใจบริการด้านใดเป็นพิเศษ?
          </h2>
          <p className="mt-3 text-blue-100 max-w-xl mx-auto">
            บอกเราได้เลย เราพร้อมออกแบบแนวทางที่เหมาะสมกับองค์กรของคุณ
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
