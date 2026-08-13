/**
 * พันธมิตร / องค์กรที่ร่วมงาน (Our Clients จากเว็บเดิม)
 * โลโก้จาก https://www.cominnocenter.com/
 */

const logo = (id: string, ext: string = "webp") =>
  `https://static.wixstatic.com/media/${id}~mv2.${ext}/v1/fill/w_400,h_200,al_c,q_85,enc_auto/${id}~mv2.${ext}`;

export type Partner = {
  name: string;
  nameEn: string;
  image: string;
  alt: string;
};

export const partners: Partner[] = [
  {
    name: "กรมควบคุมโรค",
    nameEn: "Department of Disease Control (DDC)",
    image: logo("8e0d14_07d77e4c55974103baf5a37fc3ab436d"),
    alt: "โลโก้กรมควบคุมโรค — พันธมิตรจากเว็บเดิม ComInnoCenter",
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
    alt: "โลโก้ ITD — พันธมิตรจากเว็บเดิม ComInnoCenter",
  },
  {
    name: "Power for Thai",
    nameEn: "Power for Thai",
    image: logo("8e0d14_b61b05ffe5f64eb799480701c3f7ef0e"),
    alt: "โลโก้ Power for Thai — พันธมิตรจากเว็บเดิม ComInnoCenter",
  },
  {
    name: "Monocular",
    nameEn: "Monocular",
    image: logo("8e0d14_a7b7aa5e2a84481485784de0a4205fb6"),
    alt: "โลโก้ Monocular — พันธมิตรจากเว็บเดิม ComInnoCenter",
  },
];
