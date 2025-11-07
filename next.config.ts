import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "**/media/**", // allows access to all media files
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/**", // allows access to all media files
      },
      {
        protocol: "http",
        hostname: "192.168.1.105",
        pathname: "**/media/**", // allows access to all media files
      },
      {
        protocol: "http",
        hostname: "192.168.1.105",
        pathname: "/**", // allows access to all media files
      },
      {
        protocol: "http",
        hostname: "caroptionshop.ir",
        pathname: "**/media/**", // allows access to all media files
      },
      {
        protocol: "https",
        hostname: "caroptionshop.ir",
        pathname: "**/media/**", // allows access to all media files
      },
    ],
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
