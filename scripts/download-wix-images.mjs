/**
 * Phase 0-B — ดาวน์โหลดภาพทั้งหมดจาก Wix (และ host ภายนอกอื่น) มา self-host ใน public/images/
 *
 * ใช้งาน:
 *   node scripts/download-wix-images.mjs            # โหลดทุกไฟล์ (ข้ามไฟล์ที่มีอยู่แล้วและสถานะ ok)
 *   node scripts/download-wix-images.mjs --retry    # โหลดซ้ำเฉพาะรายการที่ status ไม่ใช่ "ok" ใน manifest
 *   node scripts/download-wix-images.mjs --force    # โหลดใหม่ทั้งหมดทับของเดิม
 *
 * ผลลัพธ์: scripts/wix-image-manifest.json — mapping id/url → local path → ขนาดไฟล์ → สถานะ
 *
 * กติกาแปลงไฟล์:
 *   - ภาพถ่าย (projects / team / leadership / researchers) → แปลงเป็น .webp (sharp, q82)
 *   - โลโก้ (partners / โลโก้ศูนย์) → คงฟอร์แมตต้นฉบับ ไม่แปลง (กันขอบเบลอ PNG โปร่งใส)
 */
import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const PUB = path.join(ROOT, "public", "images");
const MANIFEST_PATH = path.join(ROOT, "scripts", "wix-image-manifest.json");
const FORCE = process.argv.includes("--force");
const RETRY_ONLY = process.argv.includes("--retry");

const wixOriginal = (id, ext) => `https://static.wixstatic.com/media/${id}~mv2.${ext}`;

/** รวบรวมรายการภาพทั้งหมดจาก data files (parse ด้วย regex — ไฟล์เป็น .ts import ตรงไม่ได้) */
async function collectTasks() {
  const tasks = [];

  // 1) projects gallery — projectMedia.ts: slug → [{id, ext}] → projects/<slug>/<id>.webp
  const pm = await readFile(path.join(ROOT, "src/data/projectMedia.ts"), "utf8");
  const slugBlocks = [...pm.matchAll(/"([a-z0-9-]+)":\s*\[([^\]]*)\]/g)];
  for (const [, slug, body] of slugBlocks) {
    for (const [, id, ext] of body.matchAll(/\{ id: "([^"]+)", ext: "([^"]+)" \}/g)) {
      tasks.push({
        category: "projects",
        id,
        source: wixOriginal(id, ext),
        local: `projects/${slug}/${id}.webp`,
        convert: "webp",
      });
    }
  }

  // 2) partners — logo(id[, ext]) default webp → partners/<id>.<ext> (คงฟอร์แมตต้นฉบับ)
  const pt = await readFile(path.join(ROOT, "src/data/partners.ts"), "utf8");
  for (const [, id, , ext] of pt.matchAll(/logo\("([^"]+)"(,\s*"([^"]+)")?\)/g)) {
    const e = ext || "webp";
    tasks.push({
      category: "partners",
      id,
      source: wixOriginal(id, e),
      local: `partners/${id}.${e}`,
      convert: null,
    });
  }

  // 3) team — media(id[, ext]) default jpg → team/<id>.webp
  const tm = await readFile(path.join(ROOT, "src/data/team.ts"), "utf8");
  for (const [, id, , ext] of tm.matchAll(/media\("([^"]+)"(,\s*"([^"]+)")?\)/g)) {
    tasks.push({
      category: "team",
      id,
      source: wixOriginal(id, ext || "jpg"),
      local: `team/${id}.webp`,
      convert: "webp",
    });
  }
  // 3a) รูป ดร.พยู (URL ตรงจาก wixstatic)
  tasks.push({
    category: "team",
    id: "34cff6_29040465434b4a43bab2432065a820ab",
    source: wixOriginal("34cff6_29040465434b4a43bab2432065a820ab", "jpg"),
    local: "team/34cff6_29040465434b4a43bab2432065a820ab.webp",
    convert: "webp",
  });
  // 3b) รูป ดร.Robbie (Google Scholar ผ่าน weserv proxy)
  tasks.push({
    category: "team",
    id: "robbie-buelo",
    source:
      "https://images.weserv.nl/?url=https%3A%2F%2Fscholar.googleusercontent.com%2Fcitations%3Fview_op%3Dmedium_photo%26user%3Dgfq4xogAAAAJ%26citpid%3D2&w=600&h=750&fit=cover&output=jpg",
    local: "team/robbie-buelo.webp",
    convert: "webp",
  });

  // 4) leadership — media(id) → leadership/<id>.webp
  const ld = await readFile(path.join(ROOT, "src/data/leadership.ts"), "utf8");
  for (const [, id, , ext] of ld.matchAll(/media\("([^"]+)"(,\s*"([^"]+)")?\)/g)) {
    tasks.push({
      category: "leadership",
      id,
      source: wixOriginal(id, ext || "jpg"),
      local: `leadership/${id}.webp`,
      convert: "webp",
    });
  }

  // 5) โลโก้ศูนย์ (Header/Footer) — คง PNG ต้นฉบับ
  tasks.push({
    category: "logo",
    id: "8e0d14_0564f38949dd4891a2359cb0daa61bb4",
    source: wixOriginal("8e0d14_0564f38949dd4891a2359cb0daa61bb4", "png"),
    local: "logo/logo-communication-innovation.png",
    convert: null,
  });

  // 6) รูปนักวิจัยจาก host ภายนอกอื่น → researchers/<ชื่อ>.webp
  tasks.push(
    {
      category: "researchers",
      id: "watsayut-kongchan",
      source:
        "https://yt3.googleusercontent.com/ytc/AIdro_m1qfmIOSFu6yvHXJxdWd5q4sDUFEnIMZiKoQTzGRorMkw=s800-c-k-c0x00ffffff-no-rj",
      local: "researchers/watsayut-kongchan.webp",
      convert: "webp",
    },
    {
      category: "researchers",
      id: "wattana-viriyasitavat",
      source:
        "https://www.chula.ac.th/wp-content/uploads/2022/01/C695B217-A394-4444-A123-08A87085054C-1.jpg",
      local: "researchers/wattana-viriyasitavat.webp",
      convert: "webp",
    },
    {
      category: "researchers",
      id: "lunchakorn-wuttisittikulkij",
      source: "https://ee.eng.chula.ac.th/wp-content/uploads/2025/09/LWK2.jpg",
      local: "researchers/lunchakorn-wuttisittikulkij.webp",
      convert: "webp",
    },
  );

  // กันซ้ำ (id เดียวกันอาจถูกอ้างหลายที่)
  const seen = new Set();
  return tasks.filter((t) => (seen.has(t.local) ? false : (seen.add(t.local), true)));
}

async function fetchWithRetry(url, attempts = 3) {
  let lastErr;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, { redirect: "follow" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return Buffer.from(await res.arrayBuffer());
    } catch (e) {
      lastErr = e;
      await new Promise((r) => setTimeout(r, 1500 * (i + 1)));
    }
  }
  throw lastErr;
}

async function processTask(t, prevByLocal) {
  const dest = path.join(PUB, t.local);
  const prev = prevByLocal.get(t.local);
  if (!FORCE) {
    if (RETRY_ONLY && prev?.status === "ok" && existsSync(dest)) return prev;
    if (!RETRY_ONLY && prev?.status === "ok" && existsSync(dest)) return prev;
  }
  const entry = { ...t };
  try {
    const buf = await fetchWithRetry(t.source);
    entry.originalBytes = buf.length;
    await mkdir(path.dirname(dest), { recursive: true });
    if (t.convert === "webp") {
      await sharp(buf).webp({ quality: 82 }).toFile(dest);
    } else {
      await writeFile(dest, buf);
    }
    entry.bytes = (await stat(dest)).size;
    entry.status = "ok";
  } catch (e) {
    entry.status = "failed";
    entry.error = String(e?.message || e);
  }
  return entry;
}

async function main() {
  const tasks = await collectTasks();
  let prevByLocal = new Map();
  if (existsSync(MANIFEST_PATH)) {
    const prev = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
    prevByLocal = new Map(prev.images.map((e) => [e.local, e]));
  }

  console.log(`ทั้งหมด ${tasks.length} ไฟล์`);
  const results = [];
  const CONCURRENCY = 8;
  let i = 0;
  async function worker() {
    while (i < tasks.length) {
      const t = tasks[i++];
      const r = await processTask(t, prevByLocal);
      results.push(r);
      if (results.length % 25 === 0) console.log(`  ${results.length}/${tasks.length}`);
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  results.sort((a, b) => a.local.localeCompare(b.local));
  const ok = results.filter((r) => r.status === "ok");
  const failed = results.filter((r) => r.status !== "ok");
  const manifest = {
    generatedAt: new Date().toISOString(),
    summary: {
      total: results.length,
      ok: ok.length,
      failed: failed.length,
      totalBytes: ok.reduce((s, r) => s + (r.bytes || 0), 0),
    },
    images: results,
  };
  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`สำเร็จ ${ok.length} · พลาด ${failed.length} · รวม ${(manifest.summary.totalBytes / 1024 / 1024).toFixed(1)} MB`);
  if (failed.length) {
    console.log("รายการที่พลาด:");
    for (const f of failed) console.log(`  - ${f.local} ← ${f.source} (${f.error})`);
    process.exitCode = 1;
  }
}

main();
