# academia — ชุดไฟล์สำหรับอัปเดตโปรไฟล์ Academia.edu

สร้างด้วย `npm run academia:kit` (= `npm run profile:kit -- --platform academia` · ค่าเริ่มต้น `--author smith-boonchutima`) — **อย่าแก้ไฟล์ที่สร้างด้วยมือ**
แก้ข้อมูลต้นทาง (`src/data/leadership.ts` · `publications.ts` · `paperSummaries.ts`) แล้วรันใหม่

| ไฟล์ | ใช้ทำอะไร |
|---|---|
| `00-profile.md` | ข้อมูลโปรไฟล์ทุกช่อง + ตัวระบุ (ORCID · Scopus · Scholar) |
| `01-checklist.md` | ผลงานทุกชิ้นพร้อมระดับลิขสิทธิ์และสิ่งที่ต้องทำ — **ไฟล์หลักที่เอเจนต์อ่าน** |
| `02-abstracts.md` | บทคัดย่อของรายการที่ไม่มี DOI + พาดหัวและลิงก์บทสรุป |
| `05-citations.bib` / `.ris` | รายการอ้างอิงทุกชิ้น ใช้กับ ORCID · Google Scholar · โปรแกรมจัดการอ้างอิง |
| `06-log.md` | แม่แบบบันทึกความคืบหน้า (สำเนาที่เขียนจริงอยู่ใน Drive) |
| `../profile-kit/unpaywall-snapshot.json` | คำตอบ Unpaywall ต่อ DOI ที่ใช้จัดระดับ (ใช้ร่วมกันทุกแพลตฟอร์ม) — รีเฟรชด้วย `--refresh-unpaywall` |
| `../profile-kit/abstracts-snapshot.json` | บทคัดย่อจาก meta tag ของวารสารสำหรับรายการที่ไม่มี DOI — `--refresh-abstracts` |
| `../profile-kit/decisions.json` | คำตัดสินหลังเปิดหน้าวารสารด้วยเบราว์เซอร์สำหรับรายการระดับ 1? — **เขียนมือ** ต้องมีวันที่และหลักฐานทุกแถว รอบรันถัดไปใช้แทนคำตอบ Unpaywall |

**โฟลเดอร์นี้มีแต่ไฟล์ข้อความ** PDF ที่อัปโหลดได้อ้างไปที่ `../papers/` ซึ่งมีเฉพาะไฟล์ CC ตามกติกาใน
`../README.md` ไฟล์ accepted manuscript ของงานที่สงวนลิขสิทธิ์อยู่ใน Drive เท่านั้น ห้ามลงคลังนี้

**สำเนาทำงานอยู่ใน Google Drive** โฟลเดอร์ `06 Academia.edu` ใต้ `ComInno — คลังบทความเต็ม`
Claude in Chrome / computer use อ่านจากที่นั่นและเขียน log ที่นั่น ส่วนในคลังนี้คือแหล่งที่สร้างซ้ำได้ ·
ไฟล์ PDF ที่อัปโหลดได้อยู่ชุดเดียวใน `05 ResearchGate/03-public-pdf/` ใช้ร่วมกันทุกแพลตฟอร์ม

ในเซสชัน remote ตัวเลือก `--refresh-*` ต้องรันด้วย `NODE_USE_ENV_PROXY=1` (เหมือน fetch-publications.mjs)
