const setupViber = require("./handles/setupViber");
const saveMCVersions = require("./handles/saveMCVersions");

/**
 * @type import("next").NextConfig
 */
const nextConfig = {
  reactStrictMode: false,
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
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "same-origin",
          },
          {
            key: "Referrer-Policy",
            value: "same-origin",
          },
          {
            key: "Permissions-Policy",
            value: "",
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
module.exports = async phase => {
  if (!phase.includes("build")) {
    setupViber();
    await saveMCVersions();
  }
  return nextConfig;
};
