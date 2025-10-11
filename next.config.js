/** @type {import('next').NextConfig} */
const nextConfig = {
  // STATIC EXPORT für All-Inkl FTP Upload
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  experimental: {
    serverComponentsExternalPackages: ['bcryptjs']
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // Erforderlich für statischen Export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Performance Optimierung  
  poweredByHeader: false,
  compress: true,
  // API Configuration für Stripe & Auth
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
