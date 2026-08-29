import type { ProjectTestimonial as Testimonial } from "@/data/projects";

type Props = {
  testimonial: Testimonial;
  /** สี deep ของ SDG หลักของหน้า — ใช้กับเส้นคั่นและเครื่องหมายคำพูดเท่านั้น */
  accent: string;
  locale?: "th" | "en";
};

/**
 * เสียงจากพันธมิตร (Phase 6.2)
 *
 * เป็น optional เสมอ — หน้าไหนไม่มีข้อมูลจะไม่ render ทั้งก้อน ไม่ใช่โชว์ช่องว่าง
 * เพราะ testimonial ปลอมหรือ placeholder ทำลายความน่าเชื่อถือมากกว่าไม่มีเลย
 *
 * ใช้ <figure>/<figcaption> ตามความหมายจริง: คำพูดกับผู้พูดต้องผูกกัน
 * ไม่ใช่ย่อหน้าสองย่อหน้าที่บังเอิญวางติดกัน
 */
export default function ProjectTestimonial({ testimonial, accent, locale = "th" }: Props) {
  const label = locale === "th" ? "เสียงจากพันธมิตร" : "What our partner said";

  return (
    <figure className="rounded-lg border border-ink-300 bg-white p-8">
      <p
        className={`text-[13px] font-medium leading-[1.4] tracking-[0.12em] text-pink-500 ${
          locale === "en" ? "uppercase" : ""
        }`}
      >
        {label}
      </p>
      <blockquote
        className="mt-4 border-l-2 pl-5 text-[17px] leading-[1.7] text-ink-900"
        style={{ borderColor: accent }}
      >
        {testimonial.quote}
      </blockquote>
      <figcaption className="mt-5 pl-5 text-[15px] leading-[1.6]">
        <span className="block font-medium text-ink-900">{testimonial.name}</span>
        <span className="block text-ink-500">
          {testimonial.title} · {testimonial.org}
        </span>
      </figcaption>
    </figure>
  );
}
