# Setup Guide — ComInnoCenter Website

## 1. เปิดใช้ Contact Form + Newsletter (Formspree)

1. สมัครที่ [https://formspree.io](https://formspree.io) (ฟรี)
2. สร้างฟอร์ม 2 อัน:
   - **Contact Form** → สำหรับหน้า Collaborate
   - **Newsletter** → สำหรับสมัครรับข่าวสาร
3. คัดลอก Form ID (รูปแบบประมาณ `xyzabcde`)
4. แก้ไฟล์:

**Contact Form**
```
src/components/ContactForm.tsx
```
แทนที่ `YOUR_FORM_ID` ด้วย ID จริง

**Newsletter**
```
src/components/NewsletterForm.tsx
```
แทนที่ `YOUR_NEWSLETTER_FORM_ID` ด้วย ID จริง

5. ใน Formspree ตั้งค่าให้ส่งอีเมลไปที่ `comminno@chula.ac.th`

---

## 2. Deploy ขึ้น Vercel

1. เข้า [https://vercel.com](https://vercel.com)
2. Import repository: `smithboon-thailand/cominnocenter-website`
3. Framework: Next.js (ตรวจจับอัตโนมัติ)
4. กด Deploy
5. ได้ URL ชั่วคราว เช่น `cominnocenter-website.vercel.app`

### ชี้โดเมน cominnocenter.com
1. ใน Vercel ไปที่ Project → Settings → Domains
2. เพิ่ม `cominnocenter.com` และ `www.cominnocenter.com`
3. ตั้งค่า DNS ตามที่ Vercel แนะนำ (A record / CNAME)

---

## 3. สิ่งที่ควรอัปเดตภายหลัง

- [ ] ใส่รูป Leadership จริงในหน้า About
- [ ] ใส่ Formspree Form ID
- [ ] ตรวจสอบตัวเลขสถิติบนหน้า Home (50+, 30+ ฯลฯ) ให้ตรงกับข้อมูลจริง
- [ ] เพิ่ม Case Study รายละเอียดเมื่อมีเนื้อหาพร้อม
- [ ] ระบบสลับภาษา TH/EN แบบเต็ม

---

## 4. รันบนเครื่องตัวเอง

```bash
npm install
npm run dev
```

เปิด http://localhost:3000
