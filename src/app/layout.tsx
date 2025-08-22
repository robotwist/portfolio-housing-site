import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import LoadingScreen from "@/components/ui/LoadingScreen";
import SkipLink from "@/components/ui/SkipLink";
import StructuredData from "@/components/seo/StructuredData";
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0d1117",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://robwistrand.com'),
  title: 'Rob Wistrand - Software Developer Portfolio | Full-Stack, AI/ML, React, TypeScript',
  description: 'Software developer specializing in full-stack development, AI/ML integration, and product-level design. View projects including Unforgiving Minute running platform, AI-powered tools, Chrome extensions, and interactive applications.',
  keywords: [
    'software developer',
    'full-stack developer',
    'React developer',
    'TypeScript developer',
    'AI/ML developer',
    'frontend developer',
    'backend developer',
    'JavaScript developer',
    'Next.js developer',
    'Python developer',
    'machine learning',
    'artificial intelligence',
    'web development',
    'Chrome extensions',
    'portfolio',
    'Rob Wistrand'
  ],
  authors: [{ name: 'Rob Wistrand' }],
  creator: 'Rob Wistrand',
  publisher: 'Rob Wistrand',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://robwistrand.com',
    title: 'Rob Wistrand - Software Developer Portfolio',
    description: 'Full-stack software developer specializing in AI/ML, React, TypeScript, and product-level design. View projects including running platforms, AI tools, and Chrome extensions.',
    siteName: 'Rob Wistrand Portfolio',
    images: [
      {
        url: '/images/UnforgivingMinute.png',
        width: 1200,
        height: 630,
        alt: 'Rob Wistrand Software Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rob Wistrand - Software Developer Portfolio',
    description: 'Full-stack developer specializing in AI/ML, React, TypeScript, and product-level design.',
    images: ['/images/UnforgivingMinute.png'],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Rob Wistrand Portfolio",
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    'Content-Security-Policy': "default-src 'self' https:; style-src 'self' 'unsafe-inline' https:; font-src 'self' https: data:; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; connect-src 'self' https:;"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#0d1117" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* SEO Meta Tags */}
        <meta name="author" content="Rob Wistrand" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://robwistrand.com" />
        
        {/* Preload critical assets */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* PWA related tags */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        
        {/* Structured Data */}
        <StructuredData />
        
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js', {
                    scope: '/'
                  }).then(
                    function(registration) {
                      console.log('ServiceWorker registration successful with scope: ', registration.scope);
                    },
                    function(err) {
                      console.error('ServiceWorker registration failed: ', err);
                    }
                  );
                });
              }
            `,
          }}
        />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <SkipLink />
        <LoadingScreen />
        <div role="main" id="main-content" tabIndex={-1}>
          {children}
        </div>
      </body>
    </html>
  );
}
