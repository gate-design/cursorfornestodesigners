import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/cursorfornestodesigners',
  trailingSlash: true,
};

export default nextConfig;
