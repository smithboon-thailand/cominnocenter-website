#!/usr/bin/env python3
"""ดาวน์โหลดท่อนพากย์จากไฟล์สถานะของ ElevenLabs แล้ววางเป็น audio-v3/<key>-<lang>/pN.mp3
จับคู่ด้วยข้อความ prompt (ตัดแท็ก [..] หัวประโยคออก) กับ narr ใน storyboard.json — ไม่พึ่งลำดับ session
ยกเว้นย่อหน้าที่ข้อความซ้ำกันหลายเรื่อง (ประโยคปิดประจำชุด) ซึ่งข้อความบอกไม่ได้ว่าเป็นของเรื่องไหน
ต้องใช้แผนที่ session → ท่อน ที่จดไว้ตอนสั่งเจน (--sessions <map.json> รูปแบบ {"<key>-<lang>-<n>": "<session_id>"})
บทเรียนชุดที่ 2: ไม่มีแผนที่นี้ ประโยคปิดของ 5 เรื่องถูกยุบเหลือไฟล์เดียวเงียบๆ อีก 4 เรื่องไม่มี p8
ใช้: python3 fetch_segments.py [--sessions tts-sessions.json] <status.json> [<status2.json> ...]
"""
import json, os, re, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
SB = json.load(open(os.path.join(HERE, "storyboard.json"), encoding="utf-8"))

args = sys.argv[1:]
sess_map = {}
if args and args[0] == "--sessions":
    sess_map = {v: k for k, v in json.load(open(args[1])).items()}     # session_id → "key-lang-n"
    args = args[2:]

index = {}                                     # narr → [(key, lang, n), ...]
for c in SB:
    for s in c["scenes"]:
        for lang in ("th", "en"):
            index.setdefault(s["narr"][lang].strip(), []).append((c["key"], lang, s["n"]))


def norm(p):
    p = re.sub(r"^\s*\[[^\]]+\]\s*", "", p or "")
    return p.strip()


done, missing = [], []
for f in args:
    d = json.load(open(f))
    media = {m["generation_id"]: m for m in d.get("media", [])}
    sids = d.get("session_ids", [])
    for i, g in enumerate(d["generations"]):
        m = media.get(g["id"])
        prompt = norm((m or {}).get("prompt") or g.get("prompt"))
        hits = index.get(prompt, [])
        if g["status"] != "completed" or not m:
            missing.append((g["id"], g["status"], prompt[:40]))
            continue
        if len(hits) == 1:
            key, lang, n = hits[0]
        else:
            tag = sess_map.get(sids[i] if i < len(sids) else None)
            if not hits or not tag:
                missing.append((g["id"], "UNMATCHED" if not hits else "AMBIGUOUS (ต้องใช้ --sessions)", prompt[:60]))
                continue
            key, lang, n = tag.rsplit("-", 2); n = int(n)
        out_dir = os.path.join(HERE, "audio-v3", f"{key}-{lang}")
        os.makedirs(out_dir, exist_ok=True)
        out = os.path.join(out_dir, f"p{n}.mp3")
        if not os.path.exists(out):
            subprocess.run(["curl", "-sS", "-L", "--retry", "3", "-o", out, m["master_url"]], check=True)
        done.append((key, lang, n, round(g.get("duration_secs", 0), 1), round(g.get("price", {}).get("price_cents", 0), 2)))

for x in sorted(done):
    print("ok  ", x)
for x in missing:
    print("MISS", x)
print(f"downloaded/present: {len(done)} · missing: {len(missing)} · cost this batch: {sum(x[4] for x in done)/100:.2f} USD")
