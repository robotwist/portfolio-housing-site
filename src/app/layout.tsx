import type { Metadata } from "next";
import "@/styles/globals.css";
import LoadingScreen from "@/components/ui/LoadingScreen";

export const metadata: Metadata = {
  title: "My Portfolio | Projects & Demos",
  description: "Interactive portfolio showcasing my development projects with live demos",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: "#0d1117",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Rob Wistrand Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#0d1117" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body>
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}
