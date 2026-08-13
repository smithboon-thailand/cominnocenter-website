import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
      },
      {
        protocol: "https",
        hostname: "ee.eng.chula.ac.th",
      },
      {
        protocol: "https",
        hostname: "www.eng.chula.ac.th",
      },
      {
        protocol: "https",
        hostname: "scholar.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
