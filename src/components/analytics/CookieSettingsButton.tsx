"use client";

import { useEffect, useState } from "react";
import { analyticsEnabled } from "@/lib/analytics";
import { OPEN_CONSENT_EVENT } from "./AnalyticsConsent";

/**
 * ลิงก์ท้ายเว็บสำหรับเรียกแถบความยินยอมกลับมา
 *
 * แยกเป็นคอมโพเนนต์เล็กๆ เพื่อให้ Footer ยังเป็น server component เหมือนเดิม
 * ("use client" ที่ Footer จะลาก NewsletterForm และทุกอย่างใต้มันไปเป็น client ด้วย)
 *
 * ซ่อนตัวเองเมื่อไม่มี GA ให้ตั้งค่า (ไม่ได้ตั้ง NEXT_PUBLIC_GA_ID หรืออยู่บน
 * preview ของ Vercel) — ใช้เงื่อนไขเดียวกับ AnalyticsConsent จาก lib/analytics
 * เพื่อไม่ให้เกิดกรณีมีลิงก์แต่กดแล้วไม่มีแถบขึ้น
 */
export default function CookieSettingsButton({ label }: { label: string }) {
  const [enabled, setEnabled] = useState(false);

  // อ่านหลัง mount เพื่อให้ตรงกับ AnalyticsConsent ที่ก็ตัดสินใจฝั่งเบราว์เซอร์
  useEffect(() => {
    setEnabled(analyticsEnabled);
  }, []);

  if (!enabled) return null;

  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
      className="text-left underline-offset-2 hover:text-pink-400 hover:underline transition-colors"
    >
      {label}
    </button>
  );
}
