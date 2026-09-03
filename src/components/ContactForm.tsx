"use client";

import { useEffect, useId, useState } from "react";
import Button from "@/components/ui/Button";
import { processSteps } from "@/data/process";
import { EMAIL } from "@/data/contact";

type ContactFormProps = {
  locale?: "th" | "en";
};

const COPY = {
  th: {
    successTitle: "ส่งข้อความเรียบร้อยแล้ว",
    successBody: "ขอบคุณที่ติดต่อเรา ขั้นตอนต่อไปคือ",
    successAgain: "ส่งข้อความอีกครั้ง",
    name: "ชื่อ-นามสกุล",
    organization: "องค์กร / หน่วยงาน",
    email: "อีเมล",
    phone: "เบอร์โทรศัพท์",
    interest: "ประเภทความสนใจ",
    interestPlaceholder: "เลือกประเภท",
    partnership: "Partnership / โครงการร่วม",
    training: "Training & Capacity Building",
    research: "Research & Evaluation",
    other: "อื่นๆ",
    message: "ข้อความ",
    messagePlaceholder: "บอกเราเกี่ยวกับโครงการหรือความต้องการของคุณ...",
    error: `เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง หรืออีเมลมาที่ ${EMAIL}`,
    submitting: "กำลังส่ง...",
    submit: "ส่งข้อความ",
    required: "จำเป็นต้องกรอก",
  },
  en: {
    successTitle: "Message sent",
    successBody: "Thank you for contacting us. Here is what happens next:",
    successAgain: "Send another message",
    name: "Full name",
    organization: "Organization",
    email: "Email",
    phone: "Phone",
    interest: "Area of interest",
    interestPlaceholder: "Select a type",
    partnership: "Partnership / joint project",
    training: "Training & Capacity Building",
    research: "Research & Evaluation",
    other: "Other",
    message: "Message",
    messagePlaceholder: "Tell us about your project or needs...",
    error: `Something went wrong. Please try again or email ${EMAIL}`,
    submitting: "Sending...",
    submit: "Send message",
    required: "required",
  },
} as const;

const field =
  "w-full rounded border border-ink-300 bg-white px-4 py-3 text-[15px] leading-[1.6] text-ink-900 " +
  "transition-colors duration-150 ease-brand placeholder:text-ink-500 " +
  "focus:border-ink-500 focus:outline-none focus:shadow-[0_0_0_3px_var(--pink-100)]";

const labelClass = "mb-1.5 block text-[13px] font-medium leading-[1.4] text-ink-700";

export default function ContactForm({ locale = "th" }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const t = COPY[locale];
  // useId ให้ label ผูกกับ input ได้จริงแม้มีฟอร์มหลายชุดในหน้าเดียว
  const id = useId();
  const f = (name: string) => `${id}-${name}`;

  /**
   * ที่มาของผู้ติดต่อ — CTA ตามหน้าต่างๆ ส่ง ?ref=... มา (Phase 6.3)
   * อ่านหลัง mount เท่านั้น: หน้านี้เป็น static ทั้งหน้า ถ้าอ่านตอน render
   * ค่าจะถูก freeze ไปกับ HTML ที่ build ไว้ ไม่ใช่ของผู้ใช้คนนั้น
   */
  const [ref, setRef] = useState("");
  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("ref") ?? "";
    // กันค่าขยะ/ยาวเกินจากลิงก์ที่ถูกแก้มือ — ส่งเข้า Formspree เท่าที่เป็นรูปแบบของเราเอง
    if (/^[a-z0-9-]{1,64}$/.test(value)) setRef(value);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/mgawygve", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    // ทวนขั้นตอนที่ 1 ให้เห็นทันที — คนเพิ่งกดส่งอยากรู้ว่าจะได้ยินจากเราเมื่อไร (Phase 6.1)
    const first = processSteps[locale][0];
    return (
      <div className="rounded-lg border border-ink-300 bg-ink-0 p-8">
        <h3 className="text-h3-m md:text-h3 text-ink-900">{t.successTitle}</h3>
        <p className="mt-2 text-[15px] leading-[1.6] text-ink-700">{t.successBody}</p>
        <div className="mt-4 rounded border-l-2 border-pink-500 bg-white px-4 py-3">
          <p className="text-[15px] font-medium leading-[1.6] text-ink-900">{first.title}</p>
          <p className="mt-1 text-[15px] leading-[1.6] text-ink-700">{first.description}</p>
        </div>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-[13px] font-medium text-pink-500 transition-colors duration-150 ease-brand hover:text-pink-700 focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]"
        >
          {t.successAgain}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input type="hidden" name="ref" value={ref} readOnly />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={f("name")} className={labelClass}>
            {t.name}{" "}
            <span className="text-pink-500" title={t.required}>
              *
            </span>
          </label>
          <input id={f("name")} type="text" name="name" required className={field} />
        </div>
        <div>
          <label htmlFor={f("organization")} className={labelClass}>
            {t.organization}
          </label>
          <input id={f("organization")} type="text" name="organization" className={field} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={f("email")} className={labelClass}>
            {t.email}{" "}
            <span className="text-pink-500" title={t.required}>
              *
            </span>
          </label>
          <input id={f("email")} type="email" name="email" required className={field} />
        </div>
        <div>
          <label htmlFor={f("phone")} className={labelClass}>
            {t.phone}
          </label>
          <input id={f("phone")} type="tel" name="phone" className={field} />
        </div>
      </div>

      <div>
        <label htmlFor={f("type")} className={labelClass}>
          {t.interest}{" "}
          <span className="text-pink-500" title={t.required}>
            *
          </span>
        </label>
        <select id={f("type")} name="type" required className={field}>
          <option value="">{t.interestPlaceholder}</option>
          <option value="partnership">{t.partnership}</option>
          <option value="training">{t.training}</option>
          <option value="research">{t.research}</option>
          <option value="other">{t.other}</option>
        </select>
      </div>

      <div>
        <label htmlFor={f("message")} className={labelClass}>
          {t.message}{" "}
          <span className="text-pink-500" title={t.required}>
            *
          </span>
        </label>
        <textarea
          id={f("message")}
          name="message"
          required
          rows={5}
          className={`${field} resize-y`}
          placeholder={t.messagePlaceholder}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-[15px] leading-[1.6] text-error">
          {t.error}
        </p>
      )}

      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? t.submitting : t.submit}
      </Button>
    </form>
  );
}
