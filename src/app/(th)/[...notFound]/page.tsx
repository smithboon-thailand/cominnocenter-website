import { notFound } from "next/navigation";

/**
 * ตัวรับ URL ที่ไม่ตรงกับหน้าใดเลย แล้วส่งต่อให้ (th)/not-found.tsx
 *
 * เว็บมี root layout สองตัว (ดู (th)/layout.tsx) ทำให้ not-found.tsx
 * ผูกอยู่กับ route group ของตัวเอง URL ที่ไม่แมตช์อะไรเลยจึงตกไปที่หน้า 404
 * มาตรฐานของ Next แทนที่จะเป็นหน้า 404 ของเว็บ — catch-all นี้ดึงกลับเข้ามา
 *
 * route ที่มีอยู่จริงชนะ catch-all เสมอ ไฟล์นี้จึงไม่บังหน้าไหน
 * ส่วน /en/... ที่ไม่แมตช์ มี catch-all ของตัวเองที่เจาะจงกว่ารับไปก่อน
 */
export default function CatchAllNotFound() {
  notFound();
}
