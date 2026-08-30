"use client";

import { useEffect, useState } from "react";
import { OPEN_CONSENT_EVENT } from "./AnalyticsConsent";

/**
 * ลิงก์ท้ายเว็บสำหรับเรียกแถบความยินยอมกลับมา
 *
 * แยกเป็นคอมโพเนนต์เล็กๆ เพื่อให้ Footer ยังเป็น server component เหมือนเดิม
 * ("use client" ที่ Footer จะลาก NewsletterForm และทุกอย่างใต้มันไปเป็น client ด้วย)
 *
 * ซ่อนตัวเองเมื่อยังไม่ตั้ง NEXT_PUBLIC_GA_ID — ไม่มีอะไรให้ตั้งค่าก็ไม่ควรมีลิงก์
 */
export default function CookieSettingsButton({ label }: { label: string }) {
  const [enabled, setEnabled] = useState(false);

  // อ่านหลัง mount เพื่อให้ตรงกับ AnalyticsConsent ที่ก็ตัดสินใจฝั่งเบราว์เซอร์
  useEffect(() => {
    setEnabled(Boolean(process.env.NEXT_PUBLIC_GA_ID));
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
