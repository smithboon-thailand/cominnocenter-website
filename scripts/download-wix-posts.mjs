/**
 * Phase 0-C — เก็บเนื้อหา 24 โพสต์จาก cominnocenter.com (Wix) + self-host ภาพในโพสต์
 *
 * ใช้งาน (ในเซสชัน remote ต้องมี NODE_USE_ENV_PROXY=1):
 *   NODE_USE_ENV_PROXY=1 node scripts/download-wix-posts.mjs [--retry]
 *
 * ผลลัพธ์:
 *   - public/images/news/<slug>/<id>.webp   ภาพในโพสต์ที่ยังไม่มีใน public/images/ เดิม
 *   - scripts/wix-posts-manifest.json       URL เดิม → slug ใหม่ → ภาพพบ/โหลด/ใช้ซ้ำ → สถานะ
 *   - <scratchpad>/news-content/<slug>.json เนื้อหาที่ extract (title, date, บรรทัดข้อความ) สำหรับเขียน news.ts
 *
 * กติกาภาพ: เหมือน Phase 0-B — แปลง .webp q82, จำกัดด้านละ 16383px
 * dedupe: ถ้า media id มีไฟล์อยู่แล้วใน public/images/projects|team|leadership|partners
 *         ใช้ path เดิม ไม่โหลดซ้ำ (โพสต์โครงการใช้ภาพชุดเดียวกับ gallery)
 */
import { readFile, writeFile, mkdir, stat, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const PUB = path.join(ROOT, "public", "images");
const MANIFEST_PATH = path.join(ROOT, "scripts", "wix-posts-manifest.json");
const CONTENT_DIR = process.env.NEWS_CONTENT_DIR || path.join(ROOT, ".news-content");
const RETRY_ONLY = process.argv.includes("--retry");

/** URL เดิม → slug ใหม่ (17 โพสต์โครงการใช้ slug เดียวกับ projects.ts, 7 โพสต์ข่าวตั้ง slug ใหม่) */
const POSTS = [
  // — โพสต์โครงการ (17) —
  { slug: "chula-zero-waste", url: "https://www.cominnocenter.com/post/chula-zero-waste" },
  { slug: "nbtc-encyclopedia", url: "https://www.cominnocenter.com/post/nbtc-encyclopedia" },
  { slug: "nia-100-faces", url: "https://www.cominnocenter.com/post/nia-100-faces" },
  { slug: "nia-media-innovation", url: "https://www.cominnocenter.com/post/nia-media-innovation" },
  { slug: "nia-satisfaction-survey-2020", url: "https://www.cominnocenter.com/post/nia-satisfaction-survey-2020" },
  { slug: "pid-thong-lang-phra-foundation", url: "https://www.cominnocenter.com/post/pid-thong-lang-phra-foundation" },
  { slug: "seeds-for-cu-sustainability", url: "https://www.cominnocenter.com/post/seeds-for-cu-sustainability" },
  { slug: "department-of-disease-control", url: "https://www.cominnocenter.com/post/department-of-disease-control" },
  { slug: "creative-tourism-development-project-in-nan-province", url: "https://www.cominnocenter.com/post/creative-tourism-development-project-in-nan-province" },
  { slug: "ministry-of-natural-resources-and-environment", url: "https://www.cominnocenter.com/post/ministry-of-natural-resources-and-environment" },
  { slug: "international-labour-organization", url: "https://www.cominnocenter.com/post/international-labour-organization" },
  { slug: "asean-university-network", url: "https://www.cominnocenter.com/post/asean-university-network" },
  { slug: "itd", url: "https://www.cominnocenter.com/post/__itd" },
  { slug: "sri-trang-agro-industry", url: "https://www.cominnocenter.com/post/sri-trang-agro-industry" },
  { slug: "empowering-youth-leaders", url: "https://www.cominnocenter.com/post/empowering-youth-leaders" },
  { slug: "care-d-plus", url: "https://www.cominnocenter.com/post/the-training-program-for-driving-public-and-social-communication-care-d-plus" },
  { slug: "media-communication-transnational-citizens", url: "https://www.cominnocenter.com/post/center-of-excellence-in-communication-innovation-launches-groundbreaking-online-course-for-digital-n" },
  // — โพสต์ข่าว/ไฮไลต์ (7) —
  { slug: "keio-bunkyo-collaboration", url: "https://www.cominnocenter.com/post/chula-communication-arts-strengthens-academic-collaboration-with-keio-university-and-bunkyo-universi" },
  { slug: "treasury-officer-lecture", url: "https://www.cominnocenter.com/post/associate-professor-dr-smith-boonchutima-delivers-special-lecture-at-professional-treasury-officer" },
  { slug: "krungthai-leadership-training", url: "https://www.cominnocenter.com/post/associate-professor-dr-smith-boonchotima-delivers-leadership-training-at-krungthai-bank" },
  { slug: "thai-health-drug-communication", url: "https://www.cominnocenter.com/post/thai-health-promotion-foundation-organises-simple-drug-communication-as-daily-routine-training-by" },
  { slug: "fda-drug-safety-summit", url: "https://www.cominnocenter.com/post/comm-art-chula-ce-drives-national-drug-safety-awareness-at-fda-summit" },
  { slug: "turkiye-students-workshop", url: "https://www.cominnocenter.com/post/dr-teerada-of-chulalongkorn-university-leads-workshop-preparing-thai-students-in-t%C3%BCrkiye-for-the-wo" },
  { slug: "executive-crisis-communication-training", url: "https://www.cominnocenter.com/post/center-of-excellence-head-invited-to-lead-executive-crisis-communication-training" },
];

const WEBP_MAX = 16383;

async function fetchWithRetry(url, asText = false, attempts = 3) {
  let lastErr;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, { redirect: "follow" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return asText ? await res.text() : Buffer.from(await res.arrayBuffer());
    } catch (e) {
      lastErr = e;
      await new Promise((r) => setTimeout(r, 1500 * (i + 1)));
    }
  }
  throw lastErr;
}

/** index: media id → local path ของภาพที่ self-host ไว้แล้ว (Phase 0-B) */
async function buildExistingIndex() {
  const index = new Map();
  for (const cat of ["projects", "team", "leadership", "partners", "researchers", "logo", "news"]) {
    const dir = path.join(PUB, cat);
    if (!existsSync(dir)) continue;
    const walk = async (d, rel) => {
      for (const ent of await readdir(d, { withFileTypes: true })) {
        if (ent.isDirectory()) await walk(path.join(d, ent.name), `${rel}/${ent.name}`);
        else {
          const id = ent.name.replace(/\.(webp|png|jpg|jpeg|gif)$/, "");
          if (!index.has(id)) index.set(id, `/images${rel}/${ent.name}`);
        }
      }
    };
    await walk(dir, `/${cat}`);
  }
  return index;
}

function decodeEntities(t) {
  return t
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function extractPost(html) {
  const og = (p) => (html.match(new RegExp(`<meta property="og:${p}" content="([^"]*)"`)) || [])[1] || "";
  const title = decodeEntities(og("title"));
  const description = decodeEntities(og("description"));
  const ld = html.match(/<script type="application\/ld\+json">(\{.*?"BlogPosting".*?\})<\/script>/s);
  let date = "";
  if (ld) {
    try {
      date = (JSON.parse(ld[1]).datePublished || "").slice(0, 10);
    } catch {}
  }
  const start = html.indexOf('data-hook="post-description"');
  let end = html.indexOf('data-hook="post-footer', start);
  if (end < 0) end = start + 200000;
  const chunk = start >= 0 ? html.slice(start, end) : "";
  // ข้อความ: แตกบรรทัดตาม tag ปิดระดับบล็อก แล้วลอก tag ที่เหลือ
  const text = chunk
    .replace(/<\/(p|h[1-6]|li|div)>|<br[^>]*>/g, "\n")
    .replace(/<[^>]+>/g, "")
    .split("\n")
    .map((l) => decodeEntities(l).replace(/\s+/g, " ").trim())
    .filter(Boolean);
  // ภาพในเนื้อหา (unique ตามลำดับที่พบ)
  const imgs = [...chunk.matchAll(/static\.wixstatic\.com\/media\/([0-9a-f_]+)~mv2\.(jpg|jpeg|png|webp|gif)/g)];
  const seen = new Set();
  const images = [];
  for (const [, id, ext] of imgs) {
    if (!seen.has(id)) {
      seen.add(id);
      images.push({ id, ext });
    }
  }
  // ภาพปก
  const coverMatch = og("image").match(/media\/([0-9a-f_]+)~mv2\.(jpg|jpeg|png|webp|gif)/);
  const cover = coverMatch ? { id: coverMatch[1], ext: coverMatch[2] } : null;
  return { title, description, date, lines: text, images, cover };
}

async function downloadImage(img, slug, existing) {
  if (existing.has(img.id)) {
    return { id: img.id, local: existing.get(img.id), from: "existing", status: "ok" };
  }
  const local = `news/${slug}/${img.id}.webp`;
  const dest = path.join(PUB, local);
  const entry = { id: img.id, local: `/images/${local}`, from: "news" };
  try {
    const buf = await fetchWithRetry(`https://static.wixstatic.com/media/${img.id}~mv2.${img.ext}`);
    entry.originalBytes = buf.length;
    await mkdir(path.dirname(dest), { recursive: true });
    let sh = sharp(buf);
    const meta = await sh.metadata();
    if ((meta.width || 0) > WEBP_MAX || (meta.height || 0) > WEBP_MAX) {
      sh = sh.resize(WEBP_MAX, WEBP_MAX, { fit: "inside", withoutEnlargement: true });
    }
    await sh.webp({ quality: 82 }).toFile(dest);
    entry.bytes = (await stat(dest)).size;
    entry.status = "ok";
    existing.set(img.id, entry.local);
  } catch (e) {
    entry.status = "failed";
    entry.error = String(e?.message || e);
  }
  return entry;
}

async function main() {
  const existing = await buildExistingIndex();
  console.log(`index ภาพเดิม: ${existing.size} ids`);
  await mkdir(CONTENT_DIR, { recursive: true });

  let prev = { posts: [] };
  if (existsSync(MANIFEST_PATH)) prev = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
  const prevBySlug = new Map(prev.posts.map((p) => [p.slug, p]));

  const results = [];
  for (const post of POSTS) {
    const prevPost = prevBySlug.get(post.slug);
    if (RETRY_ONLY && prevPost?.status === "ok" && (prevPost.imagesFailed || 0) === 0) {
      results.push(prevPost);
      continue;
    }
    const entry = { sourceUrl: post.url, slug: post.slug };
    try {
      const html = await fetchWithRetry(post.url, true);
      const data = extractPost(html);
      entry.title = data.title;
      entry.date = data.date;
      // ปกไว้หน้าแรกของรายการภาพเสมอ
      const allImages = data.cover
        ? [data.cover, ...data.images.filter((i) => i.id !== data.cover.id)]
        : data.images;
      entry.imagesFound = allImages.length;
      const imgResults = [];
      for (const img of allImages) imgResults.push(await downloadImage(img, post.slug, existing));
      entry.images = imgResults;
      entry.imagesReused = imgResults.filter((r) => r.from === "existing").length;
      entry.imagesDownloaded = imgResults.filter((r) => r.from === "news" && r.status === "ok").length;
      entry.imagesFailed = imgResults.filter((r) => r.status === "failed").length;
      entry.status = entry.imagesFailed === 0 ? "ok" : "partial";
      await writeFile(
        path.join(CONTENT_DIR, `${post.slug}.json`),
        JSON.stringify(
          { slug: post.slug, sourceUrl: post.url, title: data.title, date: data.date, description: data.description, lines: data.lines, images: imgResults.map((r) => r.local) },
          null,
          2,
        ),
      );
      console.log(`✓ ${post.slug}: ${entry.imagesFound} ภาพ (ใหม่ ${entry.imagesDownloaded} · ซ้ำ ${entry.imagesReused} · พลาด ${entry.imagesFailed})`);
    } catch (e) {
      entry.status = "failed";
      entry.error = String(e?.message || e);
      console.log(`✗ ${post.slug}: ${entry.error}`);
    }
    results.push(entry);
  }

  const ok = results.filter((r) => r.status === "ok").length;
  const manifest = {
    generatedAt: new Date().toISOString(),
    summary: {
      posts: results.length,
      ok,
      partial: results.filter((r) => r.status === "partial").length,
      failed: results.filter((r) => r.status === "failed").length,
      imagesDownloaded: results.reduce((s, r) => s + (r.imagesDownloaded || 0), 0),
      imagesReused: results.reduce((s, r) => s + (r.imagesReused || 0), 0),
      imagesFailed: results.reduce((s, r) => s + (r.imagesFailed || 0), 0),
    },
    posts: results,
  };
  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
  console.log("สรุป:", JSON.stringify(manifest.summary));
  if (ok < results.length) process.exitCode = 1;
}

main();
