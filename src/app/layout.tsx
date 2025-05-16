import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "My Portfolio | Projects & Demos",
  description: "Interactive portfolio showcasing my development projects with live demos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
