import type { NextConfig } from "next";

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
};

export default nextConfig;
