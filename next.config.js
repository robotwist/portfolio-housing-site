/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static export
  images: {
    domains: [
      'placehold.co',
      'raw.githubusercontent.com',
      'avatars.githubusercontent.com',
      'github.com',
      'i.imgur.com',
      'images.unsplash.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true, // This is required for static export
  },
  // Tell Next.js to use trailingSlash for compatibility
  trailingSlash: true,
  distDir: '.next',
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion', 'react-icons'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  swcMinify: true,
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  productionBrowserSourceMaps: false,
}

module.exports = nextConfig 