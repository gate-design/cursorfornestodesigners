import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

/** Directory containing this config (repo root). Fixes Turbopack inferring `./app` as the root in some setups. */
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

// No basePath in dev → http://localhost:3000/ works. Production build keeps basePath for GitHub Pages.
const basePath =
  process.env.NODE_ENV === "development" ? "" : "/cursorfornestodesigners";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath,
  trailingSlash: true,
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
