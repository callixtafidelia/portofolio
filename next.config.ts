import type { NextConfig } from "next";

// Deployed on Vercel (server runtime) — NOT a static export. This enables the
// Keystatic admin, the /api/likes routes (Upstash), and next/image optimization.
const nextConfig: NextConfig = {
  images: {
    // All images are served from /public (Keystatic writes before/after pairs to
    // public/photography and post images to public/images). No remote domains.
    formats: ["image/avif", "image/webp"],
  },
  // Keystatic's reader lists these directories via a runtime-computed fs.readdir(),
  // which Next's file tracer can't follow statically — without this, Vercel excludes
  // the content files from the deployed function and these routes render empty.
  outputFileTracingIncludes: {
    "/projects": ["./content/projects/**", "./public/content/projects-html/**"],
    "/blog": ["./content/posts/**"],
    "/blog/[slug]": ["./content/posts/**"],
    "/photography": ["./content/photos/**", "./public/photography/**"],
  },
};

export default nextConfig;
