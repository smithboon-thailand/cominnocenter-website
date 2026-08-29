"use client";

import { useId, useState } from "react";

type NewsletterFormProps = {
  variant?: "light" | "dark" | "compact";
  locale?: "th" | "en";
};

const COPY = {
  th: {
    success: "สมัครรับข่าวสารเรียบร้อยแล้ว ขอบคุณครับ",
    label: "อีเมลสำหรับรับจดหมายข่าว",
    placeholder: "อีเมลของคุณ",
    loading: "กำลังสมัคร...",
    submitDark: "สมัคร",
    submitLight: "สมัครรับข่าวสาร",
    error: "เกิดข้อผิดพลาด กรุณาลองใหม่",
  },
  en: {
    success: "Subscribed successfully. Thank you!",
    label: "Email address for the newsletter",
    placeholder: "Your email",
    loading: "Subscribing...",
    submitDark: "Subscribe",
    submitLight: "Subscribe",
    error: "Something went wrong. Please try again.",
  },
} as const;

export default function NewsletterForm({
  variant = "light",
  locale = "th",
}: NewsletterFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const t = COPY[locale];
  const inputId = useId();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/mdenzqkp", {
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
      <p
        role="status"
        className={`text-[15px] leading-[1.6] ${
          variant === "dark" ? "text-pink-300" : "text-pink-700"
        }`}
      >
        {t.success}
      </p>
    );
  }

  const isDark = variant === "dark";

  const inputClass = isDark
    ? "rounded border border-ink-700 bg-ink-900 px-3 py-2 text-[15px] leading-[1.6] text-white placeholder:text-ink-500 focus:border-ink-500 focus:outline-none focus:shadow-[0_0_0_3px_var(--pink-100)]"
    : "flex-1 rounded border border-ink-300 bg-white px-4 py-3 text-[15px] leading-[1.6] text-ink-900 placeholder:text-ink-500 focus:border-ink-500 focus:outline-none focus:shadow-[0_0_0_3px_var(--pink-100)]";

  const buttonClass = isDark
    ? "rounded bg-pink-500 px-4 py-2 text-[15px] font-medium text-white transition-colors duration-150 ease-brand hover:bg-pink-700 focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)] disabled:opacity-40"
    : "whitespace-nowrap rounded bg-pink-500 px-6 py-3 text-[15px] font-medium text-white transition-colors duration-150 ease-brand hover:bg-pink-700 focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)] disabled:opacity-40";

  return (
    <form
      onSubmit={handleSubmit}
      className={isDark ? "flex flex-col gap-2" : "flex flex-col gap-3 sm:flex-row"}
    >
      {/* ป้ายซ่อนไว้ — placeholder หายทันทีที่พิมพ์ ช่องจึงต้องมีชื่อถาวรของตัวเอง */}
      <label htmlFor={inputId} className="sr-only">
        {t.label}
      </label>
      <input
        id={inputId}
        type="email"
        name="email"
        required
        placeholder={t.placeholder}
        className={inputClass}
      />
      <button type="submit" disabled={status === "loading"} className={buttonClass}>
        {status === "loading" ? t.loading : isDark ? t.submitDark : t.submitLight}
      </button>
      {status === "error" && (
        <p role="alert" className="col-span-full text-[13px] leading-[1.6] text-error">
          {t.error}
        </p>
      )}
    </form>
  );
}
