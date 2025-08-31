/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Must be an object, not a boolean
    serverActions: {
      bodySizeLimit: "2mb", // optional, you can remove or adjust
    },
  },
};

module.exports = nextConfig;
