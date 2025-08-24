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
        hostname: "carroptin.ir",
        pathname: "**/media/**", // allows access to all media files
      },
    ],
  },
};

export default nextConfig;
