import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ink — โครงสร้าง (BRAND.md B1)
        ink: {
          0: "var(--ink-0)",
          100: "var(--ink-100)",
          300: "var(--ink-300)",
          500: "var(--ink-500)",
          700: "var(--ink-700)",
          900: "var(--ink-900)",
        },
        // Chula Pink — การกระทำ (BRAND.md B2: 100/300/500/700/900)
        // stop 50/200/400/600/800 เป็น compat alias สำหรับหน้าเดิม — Phase 3 restyle แล้วจะเหลือเฉพาะ stop จริง
        pink: {
          50: "#FBDCEB",
          100: "#FBDCEB",
          200: "#FBDCEB",
          300: "#F07EB6",
          400: "#F07EB6",
          500: "#E0218A",
          600: "#8C1256",
          700: "#8C1256",
          800: "#4A0B2E",
          900: "#4A0B2E",
        },
        // Semantic (BRAND.md B4)
        success: "var(--success)",
        error: "var(--error)",
        warning: "var(--warning)",
        // Faculty Blue เดิม — หน้าเดิมยังใช้ จะทบทวนตอน Phase 3 (BRAND ไม่มีน้ำเงินในระบบใหม่)
        blue: {
          50: "#F0F4FA",
          100: "#E8EEF7",
          200: "#C5D4EB",
          300: "#9BB3D9",
          400: "#6B8FC4",
          500: "#1A4A9E",
          600: "#0F3A8A",
          700: "#002D73",
          800: "#00245C",
          900: "#001A45",
        },
        // Neutral เดิม — หน้าเดิมยังใช้ (Phase 3 จะย้ายไป ink)
        neutral: {
          50: "#F8F5F2",
          100: "#F1EEE9",
          200: "#E5E0D9",
          300: "#D1C9BE",
          700: "#3A3A3A",
          800: "#2A2A2A",
          900: "#121212",
        },
      },
      fontFamily: {
        sans: ["var(--font-kanit)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose: "65ch",
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(0.2, 0, 0, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
