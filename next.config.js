/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  /**
   * This is here so GitHub pages can handle the deployment and if this repository is deployed somewhere else, changed the basePath.
   *
   * @see https://nextjs.org/docs/app/api-reference/next-config-js/basePath
   */
  basePath: "/huhu-sovellus",
}

module.exports = nextConfig
