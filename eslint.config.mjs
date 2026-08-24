import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// eslint-config-next ยังเป็น config แบบเดิม (eslintrc) ส่วน ESLint 9 ใช้ flat config
// FlatCompat คือสะพานที่ Next แนะนำเอง ไม่ได้ตั้งค่าพิเศษอะไรเพิ่ม
const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  {
    ignores: [".next/**", "out/**", "node_modules/**", "next-env.d.ts"],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
