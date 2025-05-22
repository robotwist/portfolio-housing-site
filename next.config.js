/** @type {import('next').NextConfig} */
const nextConfig = {
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
    unoptimized: true, // This helps with Netlify deployments
  },
  // Ensure static assets in the public directory are properly served
  async rewrites() {
    return [
      {
        source: '/images/:path*',
        destination: '/public/images/:path*',
      },
      {
        source: '/videos/:path*',
        destination: '/public/videos/:path*',
      },
    ]
  },
}

module.exports = nextConfig 