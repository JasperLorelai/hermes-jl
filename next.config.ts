import {NextConfig} from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: false,
  cacheComponents: true,
  experimental: {
  },
  images: {
    remotePatterns: [
      {hostname: "files.jasperlorelai.eu"}
    ],
  },
  async headers() {
    return [
      {
        source: "/:any*",
        headers: [
          {
            key: "X-Clacks-Overhead",
            value: "GNU Sir Terry Pratchett"
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self'"
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
        ]
      }
    ];
  }
};

export default nextConfig;
