#!/usr/bin/env python3
"""ประกอบวิดีโอฉบับ 3 — เสียงพากย์ทีละย่อหน้า + ช่องหายใจ + จิงเกิลเปิด/ปิด + เพลงพื้นหลังกดเบาเมื่อพูด + SFX กระดาษตอนเปลี่ยนฉาก + มาสเตอร์เสียง

ใช้: python3 build_v3.py <clipkey> <th|en> out.mp4 [--jingle assets/jingle-A.mp3] [--bed assets/bed-A.mp3|none]
ต้องมี audio-v3/<key>-<lang>/p1.mp3 … p8.mp3 (พากย์ทีละย่อหน้า ตามลำดับฉากใน storyboard.json)

ไทม์ไลน์
  0.0            จิงเกิลเปิด (8 วิ) + การ์ดชื่อเรื่อง + SFX วางกล่อง
  HOOK_AT        ย่อหน้า 1 เริ่ม (จิงเกิลยังคลออยู่ใต้เสียง แล้วจางหมดที่ 8 วิ)
  …              ย่อหน้าถัดไปเริ่มหลังย่อหน้าก่อนจบ + GAP (ก่อนประโยคปิดเว้น GAP_CLOSING)
  ฉาก i          ขึ้นก่อนย่อหน้า i เริ่ม LEAD วินาที · SFX กระดาษเบาๆ ตรงรอยต่อ
  ปิดท้าย        จิงเกิลปิดเริ่มเมื่อประโยคปิดจบ + 0.4 วิ · การ์ดปิดค้างจนจิงเกิลจบ + TAIL

มาสเตอร์: highpass 80 Hz · ลดย่านอู้ 250 Hz · เพิ่มความชัด 4 kHz · compressor เบา · loudnorm -16 LUFS / TP -1.5 (มาตรฐานวิดีโอออนไลน์)
"""
import json, os, re, subprocess, sys, tempfile
from PIL import Image
import build_v2 as V
import credits

FF = V.FF
HERE = V.HERE
FPS, XFADE = V.FPS, V.XFADE

HOOK_AT = 2.6          # เสียงพากย์ย่อหน้าแรกเริ่มหลังจิงเกิลเปิดขึ้นมาแล้วเท่านี้
GAP = 0.8              # ช่องหายใจระหว่างย่อหน้า
GAP_CLOSING = 1.4      # ก่อนประโยคปิดประจำชุด
LEAD = 0.5             # ภาพฉากใหม่ขึ้นก่อนเสียงย่อหน้านั้น
OUTRO_DELAY = 0.4      # จิงเกิลปิดเริ่มหลังประโยคปิดจบ
TAIL = 0.8             # ค้างการ์ดปิดหลังจิงเกิลจบ
JINGLE_DB = -12        # ระดับจิงเกิลเทียบเสียงพูด (intro ใต้เสียงพูด · outro เดี่ยวใช้ -8)
OUTRO_DB = -8
BED_DB = -27           # เพลงพื้นหลัง "เบามาก"
SFX_DB = -20


def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        raise SystemExit(r.stderr[-3000:])
    return r


def trim_silence(src, dst):
    """ตัดความเงียบหัว-ท้ายของท่อนพากย์ (เกณฑ์ -45 dB) แล้วเก็บเป็น wav 44.1k mono"""
    af = ("silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,"
          "areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,areverse")
    run([FF, "-y", "-i", src, "-af", af, "-ar", "44100", "-ac", "1", dst])
    return V.audio_duration(dst)


def main(key, lang, out_path, jingle, bed):
    clip = next(c for c in V.SB if c["key"] == key)
    scenes = clip["scenes"]
    n = len(scenes)
    seg_dir = os.path.join(HERE, "audio-v3", f"{key}-{lang}")
    tmp = tempfile.mkdtemp(prefix=f"v3_{key}_{lang}_")

    # 1) ท่อนพากย์: ตัดความเงียบ วัดความยาว วางบนไทม์ไลน์
    segs, starts = [], []
    t = HOOK_AT
    for i in range(n):
        wav = os.path.join(tmp, f"p{i+1}.wav")
        dur = trim_silence(os.path.join(seg_dir, f"p{i+1}.mp3"), wav)
        if i > 0:
            t += GAP_CLOSING if scenes[i]["role"] == "closing" else GAP
        starts.append(t)
        segs.append((wav, dur))
        t += dur
    voice_end = t
    outro_at = voice_end + OUTRO_DELAY
    jingle_len = V.audio_duration(jingle)
    total = outro_at + jingle_len + TAIL

    # 2) ฉาก: ฉาก i แสดงตั้งแต่ starts[i]-LEAD จนถึง starts[i+1]-LEAD (ฉากแรกจาก 0 · ฉากปิดถึง total)
    bounds = [0.0] + [max(0.0, starts[i] - LEAD) for i in range(1, n)] + [total]
    durs = [bounds[i + 1] - bounds[i] for i in range(n)]
    # xfade กินเวลาซ้อนกัน XFADE ต่อรอยต่อ → ต่อความยาวแต่ละคลิป (ยกเว้นคลิปสุดท้าย) เท่า XFADE
    clip_durs = [d + (XFADE if i < n - 1 else 0) for i, d in enumerate(durs)]

    clips = []
    for i, s in enumerate(scenes):
        if s["image"] == "existing":
            img = os.path.join(V.REPO, "public/images/research/summaries", clip["slug"] + ".webp")
            im = V.render_scene(clip, s, lang, img)
        elif s["image"] == "new":
            img = os.path.join(HERE, "images-v2", s["image_file"].replace(".webp", ".png"))
            im = V.render_scene(clip, s, lang, img)
        else:
            im = V.render_closing(lang, credits.credit_for(clip["slug"]))   # ชื่อผู้เขียนทุกคนบนการ์ดปิด (ผู้ใช้อนุมัติ 4 ก.ย.)
        png = os.path.join(tmp, f"s{i}.png")
        im.save(png)
        c = os.path.join(tmp, f"s{i}.mp4")
        V.make_clip(png, clip_durs[i], c)
        clips.append(c)

    # 3) วิดีโอ: xfade ต่อกันตามขอบเขตฉาก
    vin = []
    for c in clips:
        vin += ["-i", c]
    fc, prev = [], "[0:v]"
    for i in range(1, n):
        outl = f"[v{i}]" if i < n - 1 else "[vout]"
        fc.append(f"{prev}[{i}:v]xfade=transition=fade:duration={XFADE}:offset={bounds[i]:.3f}{outl}")
        prev = outl
    video_only = os.path.join(tmp, "video.mp4")
    run([FF, "-y"] + vin + ["-filter_complex", ";".join(fc), "-map", "[vout]", "-c:v", "libx264", "-preset", "medium", "-crf", "19", "-pix_fmt", "yuv420p", video_only])

    # 4) เสียง: voice bus → mastering · jingle เปิด/ปิด · bed (ducked) · sfx ตรงรอยต่อ
    ain, parts, idx = [], [], 0

    def add_input(path):
        nonlocal idx
        ain.extend(["-i", path])
        idx += 1
        return idx - 1

    voice_labels = []
    for k, (wav, dur) in enumerate(segs):
        i = add_input(wav)
        ms = int(starts[k] * 1000)
        parts.append(f"[{i}:a]aformat=sample_rates=44100:channel_layouts=stereo,adelay={ms}|{ms}[vo{k}]")
        voice_labels.append(f"[vo{k}]")
    parts.append("".join(voice_labels) + f"amix=inputs={len(voice_labels)}:normalize=0:duration=longest,"
                 "highpass=f=80,equalizer=f=250:width_type=h:width=200:g=-2.5,equalizer=f=4000:width_type=h:width=2500:g=1.5,"
                 "acompressor=threshold=-18dB:ratio=2.5:attack=15:release=120:makeup=3dB[voice]")

    ji = add_input(jingle)
    parts.append(f"[{ji}:a]aformat=sample_rates=44100:channel_layouts=stereo,volume={JINGLE_DB}dB,afade=t=out:st={max(0.0, jingle_len-2.5):.2f}:d=2.5[jin]")
    jo = add_input(jingle)
    oms = int(outro_at * 1000)
    parts.append(f"[{jo}:a]aformat=sample_rates=44100:channel_layouts=stereo,volume={OUTRO_DB}dB,adelay={oms}|{oms}[jout]")

    mix_inputs = ["[voice]", "[jin]", "[jout]"]
    if bed and bed != "none":
        bi = add_input(bed)
        bed_start = 1.5
        bed_end = voice_end + 0.3
        bms = int(bed_start * 1000)
        parts.append(f"[{bi}:a]aformat=sample_rates=44100:channel_layouts=stereo,aloop=loop=-1:size=2e9,atrim=0:{bed_end-bed_start:.2f},"
                     f"afade=t=in:st=0:d=3,afade=t=out:st={max(0.0, bed_end-bed_start-3):.2f}:d=3,volume={BED_DB}dB,adelay={bms}|{bms}[bedraw]")
        parts.append("[voice]asplit=2[voice_a][voice_sc]")
        parts.append("[bedraw][voice_sc]sidechaincompress=threshold=0.015:ratio=5:attack=40:release=500:makeup=1[bed]")
        mix_inputs = ["[voice_a]", "[jin]", "[jout]", "[bed]"]

    # SFX: วางกล่องตอนการ์ดชื่อเรื่อง (0.2 วิ) และการ์ดปิด · กระดาษเลื่อนตรงรอยต่อฉากอื่น
    sfx_set = os.path.join(HERE, "assets", "sfx-3-setdown.mp3")
    sfx_slide = os.path.join(HERE, "assets", "sfx-2-slide.mp3")
    sfx_times = [(sfx_set, 0.2)] + [(sfx_slide, bounds[i] + XFADE / 2) for i in range(1, n - 1)] + [(sfx_set, bounds[n - 1] + XFADE / 2)]
    for k, (path, at) in enumerate(sfx_times):
        si = add_input(path)
        ms = int(at * 1000)
        parts.append(f"[{si}:a]aformat=sample_rates=44100:channel_layouts=stereo,volume={SFX_DB}dB,adelay={ms}|{ms}[sfx{k}]")
        mix_inputs.append(f"[sfx{k}]")

    parts.append("".join(mix_inputs) + f"amix=inputs={len(mix_inputs)}:normalize=0:duration=longest,"
                 f"atrim=0:{total:.3f},loudnorm=I=-16:TP=-1.5:LRA=11[aout]")
    audio_only = os.path.join(tmp, "audio.wav")
    run([FF, "-y"] + ain + ["-filter_complex", ";".join(parts), "-map", "[aout]", "-ar", "48000", audio_only])

    # 5) รวมภาพ+เสียง
    run([FF, "-y", "-i", video_only, "-i", audio_only, "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k",
         "-movflags", "+faststart", "-shortest", out_path])
    json.dump({"starts": starts, "bounds": bounds, "voice_end": voice_end, "outro_at": outro_at, "total": total,
               "segments": [d for _, d in segs]}, open(out_path + ".timeline.json", "w"), indent=1)
    print(out_path, f"{total:.1f}s", "scenes", [round(d, 1) for d in durs])


if __name__ == "__main__":
    args = sys.argv[1:]
    jingle = os.path.join(HERE, "assets", "jingle-A.mp3")
    bed = os.path.join(HERE, "assets", "bed-A.mp3")
    if "--jingle" in args:
        jingle = args[args.index("--jingle") + 1]; del args[args.index("--jingle"):args.index("--jingle") + 2]
    if "--bed" in args:
        bed = args[args.index("--bed") + 1]; del args[args.index("--bed"):args.index("--bed") + 2]
    main(args[0], args[1], args[2], jingle, bed)
