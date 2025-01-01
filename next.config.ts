import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https", // Typically, images are served over HTTPS
        hostname: "**", // Allow any hostname
        port: "", // Any port
        pathname: "**", // Any path
      },
      {
        protocol: "http", // If you also need to support HTTP (less secure)
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
