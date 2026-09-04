#!/usr/bin/env python3
"""ตรวจคลิปที่ประกอบแล้วในโฟลเดอร์ที่ให้: ความยาว · integrated loudness · เฟรมฉากที่ 2 กับการ์ดปิด → contact sheet
ใช้: python3 verify_out.py out-v6"""
import json, os, re, subprocess, sys
import imageio_ffmpeg
from PIL import Image

FF = imageio_ffmpeg.get_ffmpeg_exe()
HERE = os.path.dirname(os.path.abspath(__file__))
out_dir = os.path.join(HERE, sys.argv[1])
frames_dir = os.path.join(HERE, "frames", sys.argv[1])
os.makedirs(frames_dir, exist_ok=True)

tiles = []
KEYS = [c["key"] for c in json.load(open(os.path.join(HERE, "storyboard.json"), encoding="utf-8"))]   # ทุกเรื่องใน storyboard · ข้ามเรื่องที่ไม่มีไฟล์ในโฟลเดอร์
for key in KEYS:
    for lang in ("th", "en"):
        mp4 = os.path.join(out_dir, f"{key}-{lang}.mp4")
        if not os.path.exists(mp4 + ".timeline.json"):
            continue                          # เรื่องที่ไม่ได้ประกอบในโฟลเดอร์นี้ (คนละชุด)
        tl = json.load(open(mp4 + ".timeline.json"))
        r = subprocess.run([FF, "-i", mp4, "-af", "loudnorm=print_format=json", "-f", "null", "-"], capture_output=True, text=True)
        lufs = re.search(r'"input_i"\s*:\s*"([-\d.]+)"', r.stderr).group(1)
        dur = re.search(r"Duration: (\d+:\d+:\d+\.\d+)", r.stderr).group(1)
        print(f"{key}-{lang}: {dur}  {lufs} LUFS  p2 starts {tl['starts'][1]:.1f}s  closing at {tl['bounds'][-2]:.1f}s")
        for tag, t in (("s2", tl["bounds"][1] + 2.0), ("close", tl["bounds"][-2] + 2.5)):
            png = os.path.join(frames_dir, f"{key}-{lang}-{tag}.png")
            subprocess.run([FF, "-y", "-ss", f"{t:.2f}", "-i", mp4, "-frames:v", "1", png], capture_output=True)
            tiles.append(Image.open(png).resize((640, 360), Image.LANCZOS))

cols = 4
rows = (len(tiles) + cols - 1) // cols          # หนึ่งแถวต่อเรื่อง (ไทย s2 · ไทยปิด · อังกฤษ s2 · อังกฤษปิด)
sheet = Image.new("RGB", (cols * 640 + (cols + 1) * 12, rows * 360 + (rows + 1) * 12), (60, 56, 52))
for k, t in enumerate(tiles):
    sheet.paste(t, (12 + (k % cols) * 652, 12 + (k // cols) * 372))
sheet.save(os.path.join(frames_dir, "sheet-check.png"))
print("sheet:", os.path.join(frames_dir, "sheet-check.png"))
