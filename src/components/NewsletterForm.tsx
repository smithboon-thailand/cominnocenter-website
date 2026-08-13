"use client";

import { useState } from "react";

type NewsletterFormProps = {
  variant?: "light" | "dark" | "compact";
};

export default function NewsletterForm({ variant = "light" }: NewsletterFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      // เปลี่ยน YOUR_NEWSLETTER_FORM_ID เป็น Formspree ID จริง
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
      <p className={variant === "dark" ? "text-sm text-pink-300" : "text-sm text-pink-600"}>
        สมัครรับข่าวสารเรียบร้อยแล้ว ขอบคุณครับ
      </p>
    );
  }

  const inputClass =
    variant === "dark"
      ? "px-3 py-2 rounded-md bg-neutral-800 border border-neutral-700 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
      : "flex-1 px-4 py-3 rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent";

  const buttonClass =
    variant === "dark"
      ? "px-4 py-2 rounded-md bg-pink-500 text-white text-sm font-medium hover:bg-pink-600 transition-colors disabled:opacity-60"
      : "px-6 py-3 rounded-lg bg-pink-500 text-white font-medium hover:bg-pink-600 transition-colors whitespace-nowrap disabled:opacity-60";

  return (
    <form
      onSubmit={handleSubmit}
      className={variant === "dark" ? "flex flex-col gap-2" : "flex flex-col sm:flex-row gap-3"}
    >
      <input
        type="email"
        name="email"
        required
        placeholder="อีเมลของคุณ"
        className={inputClass}
      />
      <button type="submit" disabled={status === "loading"} className={buttonClass}>
        {status === "loading" ? "กำลังสมัคร..." : variant === "dark" ? "สมัคร" : "สมัครรับข่าวสาร"}
      </button>
      {status === "error" && (
        <p className="text-xs text-red-500 col-span-full">เกิดข้อผิดพลาด กรุณาลองใหม่</p>
      )}
    </form>
  );
}
