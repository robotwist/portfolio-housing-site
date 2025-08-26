/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',  // Commented out for API routes support
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
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Tell Next.js to use trailingSlash for compatibility
  trailingSlash: true,
  distDir: '.next',
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion', 'react-icons'],
    scrollRestoration: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  swcMinify: true,
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  productionBrowserSourceMaps: false,
  optimizeFonts: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(pdf)$/i,
      type: 'asset/resource',
    });
    return config;
  },
}

module.exports = nextConfig 