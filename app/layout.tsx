import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  title: " Thao Le Portfolio",
  description: "Portfolio — Coming Soon",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Start downloading the Spline scene immediately, in parallel with JS */}
        <link rel="preconnect" href="https://prod.spline.design" />
        <link rel="dns-prefetch" href="https://prod.spline.design" />
        <link
          rel="preload"
          href="https://prod.spline.design/1aIQvL19duA2ZeNn/scene.splinecode?v=15"
          as="fetch"
          crossOrigin="anonymous"
        />
      </head>
      <body className={fraunces.variable}>{children}</body>
    </html>
  );
}
