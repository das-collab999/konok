import type { NextConfig } from "next";

// Static export: the site builds to plain HTML files in /out.
// Easy to host anywhere (Vercel, Netlify, GitHub Pages) for the MVP.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
