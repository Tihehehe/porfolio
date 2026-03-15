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
      <body className={fraunces.variable}>{children}</body>
    </html>
  );
}
