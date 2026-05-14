import type { NextConfig } from "next";

const parseDevOrigins = (value: string | undefined) =>
  value?.split(/[\s,]+/).map((entry) => entry.trim()).filter(Boolean) ?? [];

const allowedDevOrigins = [
  ...new Set([
    ...parseDevOrigins(process.env.NEXT_DEV_ALLOWED_ORIGINS),
    "192.168.0.59",
  ]),
];

const nextConfig: NextConfig = {
  allowedDevOrigins,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
