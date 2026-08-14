import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Phase 0: ภาพทั้งหมด self-host ใน public/images/ แล้ว — เหลือเฉพาะรูปหลักสูตรวัฒนธรรมจากเว็บ cuculturecom
    remotePatterns: [
      { protocol: "https", hostname: "cuculturecom-static.vercel.app" },
    ],
  },
};

export default nextConfig;
