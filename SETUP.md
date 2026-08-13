# Setup Guide — ComInnoCenter Website

## 1. Contact Form + Newsletter (Formspree) ✅

**สถานะ: ใช้งานได้แล้ว**

- Contact Form → หน้า Collaborate
- Newsletter Form → Footer / หน้า Collaborate
- แจ้งเตือนอีเมล: **smith.boon@gmail.com** (ทั้ง Contact และ Newsletter)

ถ้าต้องเปลี่ยน Form ID หรืออีเมลรับข้อความ:
1. เข้า [formspree.io](https://formspree.io) → เปิดฟอร์มที่ต้องการ
2. คัดลอก Form ID จาก endpoint `https://formspree.io/f/xxxx`
3. แก้ในโค้ด:
   - Contact: `src/components/ContactForm.tsx`
   - Newsletter: `src/components/NewsletterForm.tsx`
4. ใน Formspree → Settings → เปลี่ยน notification email ตามต้องการ

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

- [x] ใส่ Formspree Form ID (Contact + Newsletter)
- [ ] ใส่รูป Leadership จริงในหน้า About
- [ ] ตรวจสอบตัวเลขสถิติบนหน้า Home (50+, 30+ ฯลฯ) ให้ตรงกับข้อมูลจริง
- [ ] เติมภาพ gallery ที่เหลือของแต่ละ Case Study (ถ้าต้องการครบทุกใบ)
- [ ] ปรับข้อความไทย Challenge/Approach ให้เป็นภาษาราชการมากขึ้น
- [ ] ระบบสลับภาษา TH/EN แบบเต็ม

---

## 4. รันบนเครื่องตัวเอง

```bash
npm install
npm run dev
```

เปิด http://localhost:3000
