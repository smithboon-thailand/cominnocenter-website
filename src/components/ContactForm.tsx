"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      // ใช้ Formspree — เปลี่ยน YOUR_FORM_ID เป็น ID จริงหลังจากสมัครที่ formspree.io
      // หรือเปลี่ยน action เป็น endpoint ของตัวเอง
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
        <h3 className="text-xl font-semibold text-blue-700">ส่งข้อความเรียบร้อยแล้ว</h3>
        <p className="mt-2 text-neutral-600">
          ขอบคุณที่ติดต่อเรา เราจะตอบกลับโดยเร็วที่สุด
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-pink-500 font-medium hover:text-pink-600"
        >
          ส่งข้อความอีกครั้ง
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
            ชื่อ-นามสกุล <span className="text-pink-500">*</span>
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
            องค์กร / หน่วยงาน
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
            อีเมล <span className="text-pink-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-lg border border-neutral-300 bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
            เบอร์โทรศัพท์
          </label>
          <input
            type="tel"
            name="phone"
            className="w-full px-4 py-3 rounded-lg border border-neutral-300 bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">
          ประเภทความสนใจ <span className="text-pink-500">*</span>
        </label>
        <select
          name="type"
          required
          className="w-full px-4 py-3 rounded-lg border border-neutral-300 bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        >
          <option value="">เลือกประเภท</option>
          <option value="partnership">Partnership / โครงการร่วม</option>
          <option value="training">Training & Capacity Building</option>
          <option value="research">Research & Evaluation</option>
          <option value="other">อื่นๆ</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">
          ข้อความ <span className="text-pink-500">*</span>
        </label>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full px-4 py-3 rounded-lg border border-neutral-300 bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-y"
          placeholder="บอกเราเกี่ยวกับโครงการหรือความต้องการของคุณ..."
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">
          เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง หรืออีเมลมาที่ comminno@chula.ac.th
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-pink-500 text-white font-medium hover:bg-pink-600 transition-colors disabled:opacity-60"
      >
        {status === "loading" ? "กำลังส่ง..." : "ส่งข้อความ"}
      </button>
    </form>
  );
}
