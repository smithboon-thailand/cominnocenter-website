import { notFound } from "next/navigation";

/** คู่ภาษาอังกฤษของ (th)/[...notFound] — /en/... ที่ไม่แมตช์ ได้หน้า 404 อังกฤษ */
export default function CatchAllNotFound() {
  notFound();
}
