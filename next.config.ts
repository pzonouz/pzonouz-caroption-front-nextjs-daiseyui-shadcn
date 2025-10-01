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
        hostname: "carroption.ir",
        pathname: "**/media/**", // allows access to all media files
      },
      {
        protocol: "https",
        hostname: "carroption.ir",
        pathname: "**/media/**", // allows access to all media files
      },
    ],
  },
};

export default nextConfig;
