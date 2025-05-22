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
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.github.com',
      },
      {
        protocol: 'https',
        hostname: '**.imgur.com',
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      }
    ],
    unoptimized: true, // This is required for static export
  },
  // Tell Next.js to ignore API routes during static export
  distDir: '.next',
  trailingSlash: true,
  exportPathMap: async function() {
    return {
      '/': { page: '/' },
      '/success': { page: '/success' }
    };
  }
}

module.exports = nextConfig 