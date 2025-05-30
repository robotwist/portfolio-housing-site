import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import LoadingScreen from "@/components/ui/LoadingScreen";
import SkipLink from "@/components/ui/SkipLink";
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
  title: 'Portfolio Housing Site',
  description: 'A showcase of housing and real estate projects',
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Portfolio Housing Site",
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
        
        {/* Preload critical assets */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* PWA related tags */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        
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
