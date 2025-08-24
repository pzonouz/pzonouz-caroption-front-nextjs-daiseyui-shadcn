import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["carroption.ir"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "**/media/**", // allows access to all media files
      },
    ],
  },
};

export default nextConfig;
