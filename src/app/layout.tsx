import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ClientLayout from "@/components/ClientLayout";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShopHub - Modern E-Commerce Platform | Portfolio Demo",
  description: "Full-featured e-commerce platform built with Next.js 15, React 19, TypeScript & Tailwind CSS. Features shopping cart, admin dashboard, dark mode, and role-based authentication.",
  keywords: ["e-commerce", "nextjs", "react", "typescript", "tailwind css", "portfolio", "demo", "online shopping"],
  authors: [{ name: "Eduard William Stairas" }],
  creator: "Eduard William Stairas",
  metadataBase: new URL('https://your-domain.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.vercel.app',
    title: 'ShopHub - Modern E-Commerce Platform',
    description: 'Full-featured e-commerce demo with Next.js 15, React 19 & TypeScript. Showcasing modern web development practices.',
    siteName: 'ShopHub',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ShopHub E-Commerce Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShopHub - Modern E-Commerce Platform',
    description: 'Full-featured e-commerce demo built with Next.js 15, React 19 & TypeScript',
    images: ['/og-image.png'],
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className=
        {`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
