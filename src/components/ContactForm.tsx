"use client";

import { useState } from "react";

type ContactFormProps = {
  locale?: "th" | "en";
};

const COPY = {
  th: {
    successTitle: "ส่งข้อความเรียบร้อยแล้ว",
    successBody: "ขอบคุณที่ติดต่อเรา เราจะตอบกลับโดยเร็วที่สุด",
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
    error: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง หรืออีเมลมาที่ comminno@chula.ac.th",
    submitting: "กำลังส่ง...",
    submit: "ส่งข้อความ",
  },
  en: {
    successTitle: "Message sent",
    successBody: "Thank you for contacting us. We will get back to you soon.",
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
    error: "Something went wrong. Please try again or email comminno@chula.ac.th",
    submitting: "Sending...",
    submit: "Send message",
  },
} as const;

export default function ContactForm({ locale = "th" }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const t = COPY[locale];

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
    return (
      <div className="rounded-2xl border border-pink-200 bg-pink-50 p-8 text-center">
        <h3 className="text-xl font-medium text-blue-700">{t.successTitle}</h3>
        <p className="mt-2 text-neutral-600">{t.successBody}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-pink-500 font-medium hover:text-pink-600"
        >
          {t.successAgain}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
            {t.name} <span className="text-pink-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            className="w-full px-4 py-3 rounded-lg border border-neutral-300 bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
            {t.organization}
          </label>
          <input
            type="text"
            name="organization"
            className="w-full px-4 py-3 rounded-lg border border-neutral-300 bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
            {t.email} <span className="text-pink-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-lg border border-neutral-300 bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">{t.phone}</label>
          <input
            type="tel"
            name="phone"
            className="w-full px-4 py-3 rounded-lg border border-neutral-300 bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">
          {t.interest} <span className="text-pink-500">*</span>
        </label>
        <select
          name="type"
          required
          className="w-full px-4 py-3 rounded-lg border border-neutral-300 bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        >
          <option value="">{t.interestPlaceholder}</option>
          <option value="partnership">{t.partnership}</option>
          <option value="training">{t.training}</option>
          <option value="research">{t.research}</option>
          <option value="other">{t.other}</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">
          {t.message} <span className="text-pink-500">*</span>
        </label>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full px-4 py-3 rounded-lg border border-neutral-300 bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-y"
          placeholder={t.messagePlaceholder}
        />
      </div>

      {status === "error" && <p className="text-sm text-red-600">{t.error}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-pink-500 text-white font-medium hover:bg-pink-600 transition-colors disabled:opacity-60"
      >
        {status === "loading" ? t.submitting : t.submit}
      </button>
    </form>
  );
}
