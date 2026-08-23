/**
 * ฝัง structured data ลงหน้า — รับ object ที่สร้างจาก src/lib/schema.ts
 * ใช้ในคอมโพเนนต์ฝั่งเซิร์ฟเวอร์เท่านั้น (ข้อมูลคงที่ ไม่มี input จากผู้ใช้)
 */
type JsonLdProps = {
  data: object | object[];
};

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // ข้อมูลมาจากไฟล์ในโปรเจ็คเอง ไม่ใช่ input ภายนอก — escape `<` กัน tag injection ไว้อีกชั้น
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
