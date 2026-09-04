/**
 * รายการวิดีโอสำหรับส่วน "วิดีโอความรู้" บนหน้าแรก — รวมสองแหล่งเป็นชุดเดียวเรียงใหม่ก่อนเก่า
 *
 *   1. วิดีโอเล่าสาระหลักของบทความ (paperVideos.ts) — **แยกภาษา**: หน้าไทยได้คลิปพากย์ไทย
 *      หน้าอังกฤษได้คลิปพากย์อังกฤษ ชื่อ/คำอธิบายดึงจากบทสรุปในภาษานั้น หน้าปกคือภาพประจำบทความ
 *      และมีลิงก์ไปหน้าบทสรุป · เพิ่มคลิปใหม่ที่ paperVideos.ts ที่เดียว หน้าแรกจะได้เอง
 *   2. คลิปเก่าจากช่อง (videos.ts) — เหมือนเดิมทั้งสองภาษา
 *
 * อยู่ใน lib เพราะต้องใช้ plainText() ตัดมาร์กดาวน์เน้นข้อความออกจากพาดหัวบทสรุป
 * (videos.ts เป็น data file ไม่ควร import คอมโพเนนต์)
 */
import { paperVideos } from "@/data/paperVideos";
import { paperSummaryBySlug } from "@/data/paperSummaries";
import { videosSorted, type Video } from "@/data/videos";
import { plainText } from "@/components/research/PaperSummaryBody";
import { truncate } from "@/lib/text";

export function homeVideos(locale: "th" | "en"): Video[] {
  const fromPapers: Video[] = [];
  for (const v of paperVideos) {
    const track = v[locale];
    const summary = paperSummaryBySlug(v.slug);
    if (!track.youtubeId || !summary) continue;
    const copy = summary[locale];
    const headline = plainText(copy.headline);
    const blurb = truncate(plainText(copy.question), 160, locale);
    fromPapers.push({
      id: track.youtubeId,
      titleTh: headline,
      titleEn: headline,
      summaryTh: blurb,
      summaryEn: blurb,
      date: track.uploadDate,
      featured: true,
      hdThumb: true,
      poster: `/images/research/summaries/${v.slug}`,
      href: locale === "th" ? `/research/${v.slug}` : `/en/research/${v.slug}`,
    });
  }
  return [...fromPapers, ...videosSorted].sort(
    (a, b) => b.date.localeCompare(a.date) || Number(!!b.featured) - Number(!!a.featured),
  );
}
