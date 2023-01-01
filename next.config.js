/**
 * @type import("next").NextConfig
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true
  },
  async headers() {
    return [
      {
        source: "/:any*",
        headers: [
          {
            key: "X-Clacks-Overhead",
            value: "GNU Sir Terry Pratchett"
          }
        ]
      }
    ];
  }
};

/**
 * Not recommended to run init scripts like this, but I couldn't find a better way.
 * @version (Next.js) 13.1.1
 */
module.exports = (phase) => {
  if (!phase.includes("build")) require("./handles/setupViber")();
  return nextConfig;
};
