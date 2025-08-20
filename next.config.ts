import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Disable ESLint during builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript checking during builds (not recommended for production)
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
