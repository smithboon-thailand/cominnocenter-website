/**
 * พันธมิตร / องค์กรที่ร่วมงาน (Our Clients จากเว็บเดิม)
 * โลโก้ครบจาก https://www.cominnocenter.com/ — ใช้ไฟล์ต้นฉบับไม่ครอป
 */

/** โลโก้ต้นฉบับ — self-host จาก Wix ไว้ที่ public/images/partners/ คงฟอร์แมตเดิมไม่ครอป (Phase 0) */
const logo = (id: string, ext: string = "webp") => `/images/partners/${id}.${ext}`;

export type Partner = {
  name: string;
  nameEn: string;
  image: string;
  alt: string;
};

export const partners: Partner[] = [
  {
    name: "กรมควบคุมโรค",
    nameEn: "Department of Disease Control",
    image: logo("8e0d14_07d77e4c55974103baf5a37fc3ab436d"),
    alt: "โลโก้กรมควบคุมโรค กระทรวงสาธารณสุข — พันธมิตรจากเว็บเดิม ComInnoCenter",
  },
  {
    name: "สสส.",
    nameEn: "Thai Health Promotion Foundation",
    image: logo("8e0d14_f16700f65c7f45998a6dde15df536199"),
    alt: "โลโก้สำนักงานกองทุนสนับสนุนการสร้างเสริมสุขภาพ (สสส.) — พันธมิตรจากเว็บเดิม ComInnoCenter",
  },
  {
    name: "AUN",
    nameEn: "ASEAN University Network",
    image: logo("8e0d14_60d01a5d5bf8446db71ad2fa60f2ec3b"),
    alt: "โลโก้ ASEAN University Network (AUN) — พันธมิตรจากเว็บเดิม ComInnoCenter",
  },
  {
    name: "ITD",
    nameEn: "International Institute for Trade and Development",
    image: logo("8e0d14_d55c7b55c0dd48ad96a78b7f263cffb9"),
    alt: "โลโก้ ITD International Institute for Trade and Development — พันธมิตรจากเว็บเดิม ComInnoCenter",
  },
  {
    name: "กฟผ.",
    nameEn: "EGAT — Power for Thai Happiness",
    image: logo("8e0d14_b61b05ffe5f64eb799480701c3f7ef0e"),
    alt: "โลโก้การไฟฟ้าฝ่ายผลิตแห่งประเทศไทย (กฟผ.) Power for Thai Happiness — พันธมิตรจากเว็บเดิม ComInnoCenter",
  },
  {
    name: "Monocular",
    nameEn: "Monocular Media",
    image: logo("8e0d14_a7b7aa5e2a84481485784de0a4205fb6"),
    alt: "โลโก้ Monocular Media — พันธมิตรจากเว็บเดิม ComInnoCenter",
  },
  {
    name: "Chula Zero Waste",
    nameEn: "Chula Zero Waste",
    image: logo("8e0d14_13aece51caa141aab69e8f3e1e84be6a"),
    alt: "โลโก้ Chula Zero Waste Together We Can — พันธมิตรจากเว็บเดิม ComInnoCenter",
  },
  {
    name: "กสทช.",
    nameEn: "NBTC",
    image: logo("8e0d14_bae22b448ce84dde8018a07bf96a8b3d"),
    alt: "โลโก้สำนักงาน กสทช. (NBTC) — พันธมิตรจากเว็บเดิม ComInnoCenter",
  },
  {
    name: "NIA",
    nameEn: "National Innovation Agency",
    image: logo("8e0d14_86fff6f9f948466aa185306d26c8c0b0"),
    alt: "โลโก้สำนักงานนวัตกรรมแห่งชาติ (NIA) — พันธมิตรจากเว็บเดิม ComInnoCenter",
  },
  {
    name: "มูลนิธิราชประชานุเคราะห์",
    nameEn: "Rajaprajanugroh Foundation",
    image: logo("8e0d14_dde36c281c0f418ca4fb69d7b4b43d79"),
    alt: "โลโก้มูลนิธิราชประชานุเคราะห์ ในพระบรมราชูปถัมภ์ — พันธมิตรจากเว็บเดิม ComInnoCenter",
  },
  {
    name: "ศูนย์บริจาคอวัยวะ",
    nameEn: "Thai Red Cross Organ Donation Center",
    image: logo("8e0d14_4fcaae20760240f6bdc8429b68f0e4e1"),
    alt: "โลโก้ศูนย์บริจาคอวัยวะ สภากาชาดไทย — พันธมิตรจากเว็บเดิม ComInnoCenter",
  },
  {
    name: "The Sharpener",
    nameEn: "The Sharpener",
    image: logo("8e0d14_8a893e0836d343e1bb1e73f6a367786b"),
    alt: "โลโก้ The Sharpener — พันธมิตรจากเว็บเดิม ComInnoCenter",
  },
];
