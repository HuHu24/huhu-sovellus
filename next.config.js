/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * This is here so GitHub pages can handle the deployment and if this repository is deployed somewhere else, changed the basePath.
   *
   * @see https://nextjs.org/docs/app/api-reference/next-config-js/basePath
   */
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
