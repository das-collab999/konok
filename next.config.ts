import type { NextConfig } from "next";

// Static export: the site builds to plain HTML files in /out.
//
// basePath is needed when the site is served from a subfolder — GitHub Pages
// puts it at /konok/. The deploy workflow sets NEXT_PUBLIC_BASE_PATH=/konok;
// locally the variable is empty and the site is served from the root.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
};

export default nextConfig;
