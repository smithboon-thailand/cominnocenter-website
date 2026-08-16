# assets-inbox — โซนรับไฟล์ภาพจาก Grok agent

โฟลเดอร์นี้อยู่บน branch `grok/visual-assets` เท่านั้น เป็นจุดพักไฟล์ดิบจาก Grok
ก่อนที่ Claude Code จะคัด แปลง WebP และย้ายเข้า `public/images/` ผ่าน PR ตามปกติ

- ไฟล์ในนี้**ไม่ถูก deploy** (vercel.json บน branch นี้สั่งข้าม build) และไม่มีวันถูก merge เข้า main ตรงๆ
- คำสั่งงานของ Grok อยู่ที่ `GROK-INSTRUCTIONS.md`
- branch นี้จะถูกลบทิ้งเมื่อจบภารกิจ
