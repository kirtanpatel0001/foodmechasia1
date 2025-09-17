import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // allowed quality values used by components (Next.js 16 will require this)
    qualities: [60, 65, 85],
    // preserve default image formats and allow common modern formats
    formats: ['image/avif', 'image/webp'],
  },
  output: 'export',
};

export default nextConfig;
