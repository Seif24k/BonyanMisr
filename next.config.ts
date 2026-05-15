import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed static export for API routes support
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
