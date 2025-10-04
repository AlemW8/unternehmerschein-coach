/** @type {import('next').NextConfig} */
const nextConfig = {
  // STATIC EXPORT - Läuft auf jedem Webserver ohne Node.js!
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Basis-Pfad für Hosting
  basePath: '',
  assetPrefix: '',
  // Static Generation
  generateBuildId: () => 'static-build'
}

module.exports = nextConfig
