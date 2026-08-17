/**
 * ไอคอน paper-craft แบบ flat วาดเป็น SVG ในโค้ด — หนึ่งตัวต่อบริการ
 * ภาษาเดียวกับชุดภาพ Phase 2: วัตถุเดียว สองสีหลักต่อภาพ (จับคู่ตามช่วงกระบวนการ)
 * + facet เงาพับกระดาษ (สีเดียวกันลด opacity) และเส้นรายละเอียดโทน Ink
 * ตกแต่งล้วน (aria-hidden) — สีพาเลตต์โลโก้เป็นภาษางานภาพ ไม่นับรวมเพดานสี SDG ของ UI
 */

type ServiceIconProps = {
  serviceKey: string;
  colorA: string;
  colorB: string;
  className?: string;
};

const INK = "#1A1613";

export default function ServiceIcon({ serviceKey, colorA, colorB, className }: ServiceIconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className}>
      {icon(serviceKey, colorA, colorB)}
    </svg>
  );
}

function icon(key: string, a: string, b: string) {
  switch (key) {
    case "research-evaluation":
      // แท่งกราฟ + แว่นขยาย
      return (
        <>
          <rect x="8" y="26" width="6" height="14" rx="1" fill={b} />
          <rect x="17" y="18" width="6" height="22" rx="1" fill={b} opacity="0.65" />
          <rect x="26" y="22" width="6" height="18" rx="1" fill={b} />
          <circle cx="30" cy="16" r="9" fill="none" stroke={a} strokeWidth="4" />
          <line x1="36.5" y1="22.5" x2="43" y2="29" stroke={a} strokeWidth="4" strokeLinecap="round" />
        </>
      );
    case "communication-design":
      // บับเบิลข้อความ + ดินสอ
      return (
        <>
          <path d="M6 10h26a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H16l-7 6v-6H6a3 3 0 0 1-3-3V13a3 3 0 0 1 3-3Z" fill={a} />
          <path d="M6 10h26a3 3 0 0 1 3 3v3H3v-3a3 3 0 0 1 3-3Z" fill={INK} opacity="0.12" />
          <path d="M28 34 40 22l5 5-12 12-6 1 1-6Z" fill={b} />
          <path d="m40 22 5 5 2.2-2.2a2 2 0 0 0 0-2.8l-2.2-2.2a2 2 0 0 0-2.8 0L40 22Z" fill={INK} opacity="0.35" />
        </>
      );
    case "book-printing":
      // หนังสือกางหน้า
      return (
        <>
          <path d="M24 12c-4-3-10-4-17-4v26c7 0 13 1 17 4V12Z" fill={a} />
          <path d="M24 12c4-3 10-4 17-4v26c-7 0-13 1-17 4V12Z" fill={b} />
          <path d="M24 12c4-3 10-4 17-4v4c-7 0-13 1-17 4v-4Z" fill={INK} opacity="0.12" />
          <line x1="24" y1="13" x2="24" y2="38" stroke={INK} strokeWidth="2" opacity="0.4" />
        </>
      );
    case "video-production":
      // กล้องวิดีโอ
      return (
        <>
          <rect x="4" y="14" width="26" height="20" rx="3" fill={a} />
          <circle cx="12" cy="10" r="5" fill={b} />
          <circle cx="24" cy="10" r="5" fill={b} opacity="0.65" />
          <path d="M30 20l14-6v20l-14-6v-8Z" fill={b} />
          <circle cx="12" cy="24" r="4" fill={INK} opacity="0.25" />
        </>
      );
    case "motion-ar":
      // ลูกบาศก์ AR + วงเล็บมุมจอ
      return (
        <>
          <path d="M24 10 36 17v14l-12 7-12-7V17l12-7Z" fill={a} />
          <path d="M24 10 36 17l-12 7-12-7 12-7Z" fill={b} />
          <path d="M24 24v14l12-7V17l-12 7Z" fill={INK} opacity="0.18" />
          <path d="M4 12V6a2 2 0 0 1 2-2h6M36 4h6a2 2 0 0 1 2 2v6M44 36v6a2 2 0 0 1-2 2h-6M12 44H6a2 2 0 0 1-2-2v-6" fill="none" stroke={INK} strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
        </>
      );
    case "campaign-management":
      // เมกะโฟน + คลื่นเสียง
      return (
        <>
          <path d="M6 20v8a3 3 0 0 0 3 3h4l14 8V9L13 17H9a3 3 0 0 0-3 3Z" fill={a} />
          <path d="M13 17v14h-2.5V17H13Z" fill={INK} opacity="0.18" />
          <path d="M32 17c3 2 3 12 0 14" fill="none" stroke={b} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M37 12c6 5 6 19 0 24" fill="none" stroke={b} strokeWidth="3.5" strokeLinecap="round" opacity="0.65" />
        </>
      );
    case "marketing-event":
      // ธงสามเหลี่ยม + ลูกโป่ง
      return (
        <>
          <line x1="12" y1="6" x2="12" y2="42" stroke={INK} strokeWidth="3" strokeLinecap="round" opacity="0.55" />
          <path d="M15 8h24l-8 7 8 7H15V8Z" fill={a} />
          <path d="M15 8h24l-4 3.5H15V8Z" fill={INK} opacity="0.12" />
          <circle cx="36" cy="34" r="6" fill={b} />
          <path d="M36 40c-1 2 1 3-1 4" fill="none" stroke={INK} strokeWidth="1.8" opacity="0.5" />
        </>
      );
    case "training":
      // หมวกบัณฑิต
      return (
        <>
          <path d="M24 10 44 19l-20 9L4 19l20-9Z" fill={a} />
          <path d="M24 10 44 19l-10 4.5L24 10Z" fill={INK} opacity="0.14" />
          <path d="M12 24v8c0 3 5.5 6 12 6s12-3 12-6v-8l-12 5.5L12 24Z" fill={b} />
          <line x1="41" y1="20.5" x2="41" y2="33" stroke={INK} strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
          <circle cx="41" cy="35" r="2.4" fill={INK} opacity="0.55" />
        </>
      );
    case "seminar":
      // บับเบิลสนทนาสองฝั่ง (เวทีแลกเปลี่ยน)
      return (
        <>
          <path d="M5 8h22a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H14l-6 5v-5H5a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3Z" fill={a} />
          <path d="M43 20H23a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h11l6 5v-5h3a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3Z" fill={b} />
          <path d="M43 20H23a3 3 0 0 0-3 3v2.5h26V23a3 3 0 0 0-3-3Z" fill={INK} opacity="0.12" />
        </>
      );
    default:
      return <circle cx="24" cy="24" r="16" fill={a} />;
  }
}
