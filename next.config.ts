import type { NextConfig } from "next";

// Deployed on Vercel (server runtime) — NOT a static export. This enables the
// Keystatic admin, the /api/likes routes (Upstash), and next/image optimization.
const nextConfig: NextConfig = {
  images: {
    // All images are served from /public (Keystatic writes before/after pairs to
    // public/photography and post images to public/images). No remote domains.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
