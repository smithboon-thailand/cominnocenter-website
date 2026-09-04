#!/usr/bin/env python3
"""ดาวน์โหลดภาพชุดที่ 2 จากไฟล์สถานะ (json ที่บันทึกจาก creative_get_flow_run_status) → images-v2/<key>-NN.png
จับคู่ session_id → ฉาก ด้วย images2-sessions.json · ใช้: python3 fetch_images2.py status1.json [status2.json ...]"""
import json, os, subprocess, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sess = {v: k for k, v in json.load(open(os.path.join(HERE, "images2-sessions.json"))).items()}
os.makedirs(os.path.join(HERE, "images-v2"), exist_ok=True)
done, missing, cost = [], [], 0.0
for f in sys.argv[1:]:
    d = json.load(open(f))
    media = {m["generation_id"]: m for m in d.get("media", [])}
    # generations ไม่มี session_id ตรงๆ — ใช้ลำดับ session_ids ↔ generations (หนึ่ง generation ต่อ session)
    sids = d.get("session_ids", [])
    gens = d.get("generations", [])
    for sid, g in zip(sids, gens):
        key = sess.get(sid)
        m = media.get(g["id"])
        if g.get("status") != "completed" or not m or not key:
            missing.append((sid, key, g.get("status")))
            continue
        out = os.path.join(HERE, "images-v2", f"{key}.png")
        if not os.path.exists(out):
            subprocess.run(["curl", "-sS", "-L", "--retry", "3", "-o", out, m.get("master_url") or m["url"]], check=True)
        cost += (g.get("price") or {}).get("price_cents", 0)
        done.append(key)
print("downloaded:", sorted(done))
print("missing:", missing)
print(f"cost: ${cost/100:.2f}")
