import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "static.wixstatic.com" },
      { protocol: "https", hostname: "ee.eng.chula.ac.th" },
      { protocol: "https", hostname: "www.eng.chula.ac.th" },
      { protocol: "https", hostname: "www.chula.ac.th" },
      { protocol: "https", hostname: "web-cdn.chula.ac.th" },
      { protocol: "https", hostname: "scholar.googleusercontent.com" },
      { protocol: "https", hostname: "yt3.googleusercontent.com" },
      { protocol: "https", hostname: "images.weserv.nl" },
      { protocol: "https", hostname: "cuculturecom-static.vercel.app" },
      { protocol: "https", hostname: "www.cuculturecom.com" },
      { protocol: "https", hostname: "cuculturecom.com" },
    ],
  },
};

export default nextConfig;
