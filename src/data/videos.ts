/**
 * วิดีโอจากช่อง YouTube ทางการของศูนย์
 * Channel: Communication Innovation
 * https://www.youtube.com/channel/UCHSgYLtnzQSsy3CZh8beDow
 * อัปเดต: 2026-08-14
 */

export type Video = {
  id: string; // YouTube video id
  titleTh: string;
  titleEn: string;
  summaryTh: string;
  summaryEn: string;
  date: string; // YYYY-MM-DD
  featured?: boolean;
  /**
   * YouTube สร้าง maxresdefault.jpg (1280×720) ให้เฉพาะคลิปที่อัปโหลดต้นฉบับความละเอียดพอ
   * คลิปที่ไม่มีจะได้ 404 — เก็บผลตรวจไว้ที่นี่เพื่อไม่ให้ภาพแตกวูบตอนสลับคลิป
   * (ตรวจกับ i.ytimg.com เมื่อ 24 ส.ค. 2569 — 4 ใน 6 คลิปมี)
   */
  hdThumb: boolean;
};

export const YOUTUBE_CHANNEL_URL =
  "https://www.youtube.com/channel/UCHSgYLtnzQSsy3CZh8beDow";

export const videos: Video[] = [
  {
    id: "fIE22sktxeQ",
    titleTh: "Cognitive Load และการสื่อสารเชิงกลยุทธ์",
    titleEn: "Cognitive Load in Strategic Planning & Evaluation for Integrated Communications",
    summaryTh:
      "งานวิจัยเรื่อง Cognitive Load Theory ในการศึกษาออนไลน์ และการประยุกต์ใช้ในการวางแผนและประเมินการสื่อสารแบบบูรณาการ",
    summaryEn:
      "Research on Cognitive Load Theory in online education and its application to strategic planning and evaluation for integrated communications.",
    date: "2024-09-16",
    featured: true,
    hdThumb: true,
  },
  {
    id: "sOwxVUlEVwo",
    titleTh: "VTubers/Streamers กับความตั้งใจซื้อของ Otaku และ Non-Otaku",
    titleEn: "VTubers/Streamers: Impact on Otaku vs Non-Otaku Purchases",
    summaryTh:
      "ศึกษาผลกระทบของ VTuber และสตรีมเมอร์ต่อความตั้งใจซื้อ เปรียบเทียบกลุ่ม Otaku และ Non-Otaku — ตีพิมพ์ใน Basic and Applied Social Psychology",
    summaryEn:
      "Comparative study on how VTubers and streamers influence purchase intention among otaku and non-otaku audiences.",
    date: "2024-07-08",
    featured: true,
    hdThumb: true,
  },
  {
    id: "JpbLglDgsKE",
    titleTh: "ภาพไทยในสื่อจีนหลังการทำให้กัญชาถูกกฎหมาย",
    titleEn: "Chinese media narrative of Thailand as a tourist destination after cannabis legalisation",
    summaryTh:
      "วิเคราะห์ภาพลักษณ์ประเทศไทยในฐานะจุดหมายท่องเที่ยวบนสื่อจีน หลังการทำให้กัญชาถูกกฎหมาย",
    summaryEn:
      "Analysis of how Chinese media portray Thailand as a tourist destination following cannabis legalisation.",
    date: "2024-07-08",
    featured: true,
    hdThumb: true,
  },
  {
    id: "0w39QS8Gu1o",
    titleTh: "ความน่าเชื่อถือของ Influencer เกมออนไลน์กับความตั้งใจซื้อ",
    titleEn: "Online video game influencer credibility and purchase intention",
    summaryTh:
      "ศึกษาอิทธิพลของนักสร้างคอนเทนต์เกมออนไลน์ ความน่าเชื่อถือ และผลต่อความตั้งใจซื้อ",
    summaryEn:
      "Study on online video game influencers’ credibility and its effect on audience purchase intention.",
    date: "2024-07-08",
    featured: false,
    hdThumb: false,
  },
  {
    id: "Z6OcYhqu_DU",
    titleTh: "นิเทศ Biz connect",
    titleEn: "Communication Arts Biz Connect",
    summaryTh: "กิจกรรมเชื่อมโยงนิเทศศาสตร์กับภาคธุรกิจ",
    summaryEn: "Event connecting communication arts with the business sector.",
    date: "2024-07-08",
    featured: false,
    hdThumb: false,
  },
  {
    id: "wrPOAdQdgTU",
    titleTh: "การยอมรับ Cryptocurrency ในกลุ่มผู้ใช้ Reddit",
    titleEn: "Crypto Adoption among Reddit users",
    summaryTh:
      "งานวิจัยการยอมรับสกุลเงินดิจิทัลในกลุ่มผู้ใช้ Reddit ผ่านมุมมองมูลค่าที่รับรู้และความเสี่ยง",
    summaryEn:
      "Key findings on cryptocurrency adoption among Reddit users, focusing on perceived value and risk.",
    date: "2021-08-27",
    featured: false,
    hdThumb: true,
  },
];

/** เรียงใหม่ก่อนเก่า — คลิปที่ตั้งเป็น featured ขึ้นก่อนเมื่อวันที่เท่ากัน */
export const videosSorted = [...videos].sort(
  (a, b) => b.date.localeCompare(a.date) || Number(!!b.featured) - Number(!!a.featured)
);

/**
 * mqdefault (320×180) เป็นสัดส่วน 16:9 จริงและมีให้ทุกคลิปเสมอ ใช้กับรายการย่อ
 * ส่วน maxresdefault (1280×720) ใช้กับจอใหญ่ได้เฉพาะคลิปที่ field hdThumb เป็น true
 * (hqdefault เป็น 4:3 มีแถบดำบน-ล่าง จึงไม่ใช้แล้ว)
 */
export function youtubeThumb(
  id: string,
  quality: "mqdefault" | "hqdefault" | "maxresdefault" = "mqdefault"
) {
  return `https://i.ytimg.com/vi/${id}/${quality}.jpg`;
}

/** ภาพที่คมที่สุดที่คลิปนั้นมีจริง */
export function bestThumb(video: Video) {
  return youtubeThumb(video.id, video.hdThumb ? "maxresdefault" : "mqdefault");
}

export function youtubeWatchUrl(id: string) {
  return `https://www.youtube.com/watch?v=${id}`;
}

export function youtubeEmbedUrl(id: string) {
  return `https://www.youtube-nocookie.com/embed/${id}`;
}
