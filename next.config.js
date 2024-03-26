/** @type {import('next').NextConfig} */
const withPWA = require("@ducanh2912/next-pwa").default({
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  dest: "public",
})
const nextConfig = {
  images: {
    unoptimized: true,
  },
}

module.exports = withPWA(nextConfig)
