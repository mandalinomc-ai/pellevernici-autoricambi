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
  /** Ogni deploy Vercel = nuovo prefisso `/_next/static/`, così i vecchi chunk non restano “appiccicati” al browser. */
  generateBuildId: async () =>
    process.env.VERCEL_DEPLOYMENT_ID ?? process.env.VERCEL_GIT_COMMIT_SHA ?? "development",
  allowedDevOrigins,
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=0, must-revalidate",
          },
        ],
      },
    ];
  },
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
