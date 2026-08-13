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
        // Chulalongkorn University Pink
        pink: {
          50: "#FDF2F6",
          100: "#F8E1EA",
          200: "#F2C4D6",
          300: "#E89BB8",
          400: "#E07A9E",
          500: "#DE5C8E", // Main CU Pink
          600: "#C94A7A",
          700: "#B83A6B",
          800: "#9A2F59",
          900: "#7A2648",
        },
        // Faculty of Communication Arts Blue
        blue: {
          50: "#F0F4FA",
          100: "#E8EEF7",
          200: "#C5D4EB",
          300: "#9BB3D9",
          400: "#6B8FC4",
          500: "#1A4A9E",
          600: "#0F3A8A",
          700: "#002D73", // Main Faculty Blue
          800: "#00245C",
          900: "#001A45",
        },
        // Neutral
        neutral: {
          50: "#F8F5F2", // Warm off-white
          100: "#F1EEE9",
          200: "#E5E0D9",
          300: "#D1C9BE",
          700: "#3A3A3A",
          800: "#2A2A2A",
          900: "#121212",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Sarabun", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
