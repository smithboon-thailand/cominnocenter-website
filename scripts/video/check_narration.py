#!/usr/bin/env python3
"""ตรวจบทพากย์ก่อนอัดเสียง: ภาษาต้องเป็นภาษาพูด ไม่ใช่สำนวนแปลหรือศัพท์สถิติ (ผู้ใช้ทัก 4 ก.ย. 2569 ชุดที่ 3)
ฟ้องคำ/สำนวนที่เคยหลุดจริง + เลขอารบิก + ๆ ฯ ในเสียง · ใช้: python3 check_narration.py [--batch N]
คำในตารางนี้ไม่ใช่คำผิด แต่เป็นคำที่ฟังเป็นภาษาเขียน/ภาษาแปลเมื่อเปล่งเป็นเสียง — แก้ที่ต้นฉบับแล้วรันซ้ำจนว่าง"""
import json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
TH = {  # คำที่ฟ้อง → ทางเลือกที่ใช้แล้วในชุดที่ 3
    "มีนัยสำคัญ": "มีผล / ไม่มีผล / ต่างกันชัด",
    "ไม่มีนัยสำคัญ": "ไม่มีผล",
    "ทำนาย": "บอกได้ว่า",
    "ตัวทำนาย": "สิ่งที่ทำให้คน…",
    "ตัวแปร": "เรื่อง / ข้อมูล / สิ่งที่วัด",
    "สิ่งเร้า": "ให้ดู…",
    "ผู้ตอบ": "คนตอบ",
    "ระบุตนเอง": "บอกว่าตัวเอง",
    "โมเดลสมการโครงสร้าง": "แบบจำลองทางสถิติ",
    "สายสัมพันธ์": "สิ่งที่ผูกคนไว้",
    "สากลนิยม": "เรื่องดูแลสัตว์และธรรมชาติ (บอกเนื้อหาแทนชื่อมาตรวัด)",
    "ควบคู่กับ": "แล้ว… / พร้อมกับ",
    "ขณะที่": "ส่วน…",
    "เป็นผลของ": "ขึ้นกับ",
    "ถูกอ่านว่า": "คนจะอ่านว่า",
    "ถูกท้าทาย": "ไม่มีใครตั้งคำถาม",
    "ผลักดันพฤติกรรม": "ทำให้คนใช้ต่อ",
    "ส่งผลผ่าน": "ต้องผ่าน…ก่อน",
    "ทำงานมากกว่า": "มีผลมากกว่า",
    "เลือกสาร": "เลือกวิธีพูด",
    "สำหรับพวกเขา": "กลุ่มนี้",
    "อย่างมีนัยสำคัญ": "ชัด",
    "เชิงคุณภาพ": "การอ่านและตีความ",
    "ในฐานะ": "เป็น",
    "ทำหน้าที่เป็น": "เป็น",
    "รายงานเอง": "บอกเอง",
}
EN = {
    "purchase intention": "whether they would buy / the intention to buy",
    "predictor": "what drove… / the strongest sign that…",
    "self-reported": "what people said",
    "stimuli": "shown two influencers",
    "structural equation": "a statistical model",
    "significantly": "clearly",
    "respondents": "the people surveyed",
    "universalism": "caring about animals and nature",
    "interpretive": "a reading of events",
    "qualitative": "a reading of events, not a count",
    "transactional": "a deal",
    "identified as": "described themselves as",
    "construct": "measure",
    "in order to": "to",
    "utilise": "use",
    "variable": "measure / something",
}

batch = int(sys.argv[sys.argv.index("--batch") + 1]) if "--batch" in sys.argv else None
SB = json.load(open(os.path.join(HERE, "storyboard.json"), encoding="utf-8"))
hits = 0
for c in SB:
    if batch and c.get("batch", 1) != batch:
        continue
    for s in c["scenes"]:
        th, en = s["narr"]["th"], s["narr"]["en"]
        for w, alt in TH.items():
            if w in th:
                print(f"{c['key']} s{s['n']} TH  «{w}»  → {alt}"); hits += 1
        for w, alt in EN.items():
            if re.search(r"\b" + re.escape(w), en, re.I):
                print(f"{c['key']} s{s['n']} EN  «{w}»  → {alt}"); hits += 1
        if re.search(r"[ๆฯ]", th):
            print(f"{c['key']} s{s['n']} TH  มี ๆ/ฯ ในเสียง"); hits += 1
        for lang, txt in (("TH", th), ("EN", en)):
            if re.search(r"\d", txt):
                print(f"{c['key']} s{s['n']} {lang}  มีเลขอารบิกในเสียง (ต้องเป็นคำอ่าน)"); hits += 1
print(f"narration flags: {hits}" + (f" (batch {batch})" if batch else ""))
sys.exit(1 if hits else 0)
