/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true, // required for Clerk
  },
  
}

module.exports = nextConfig

