import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "@react-three/drei", "@react-three/fiber"],
  },
};

export default nextConfig;
