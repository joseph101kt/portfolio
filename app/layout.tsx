import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import WhatsAppFAB from "@/components/WhatsAppFAB";
import Navbar from "@/components/NavBar";
import ScrollTopFAB from "@/components/ScrollTopFab";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://josephkportfolio.netlify.app"),

  title: "Joseph Kakkassery | Full-Stack Developer",

  description:
    "Portfolio of Joseph Kakkassery — Full-stack developer building production-grade web and cross-platform applications using Next.js, React Native, TypeScript, and Supabase.",

  openGraph: {
    title: "Joseph Kakkassery | Full-Stack Developer",
    description:
      "Production-grade web and cross-platform applications built with Next.js, React Native, TypeScript, and Supabase.",
    url: "https://josephkportfolio.netlify.app",
    siteName: "Joseph Kakkassery Portfolio",
    images: [
      {
        url: "/avatar.png",
        width: 1200,
        height: 630,
        alt: "Joseph Kakkassery Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Joseph Kakkassery | Full-Stack Developer",
    description:
      "Production-grade web and cross-platform applications built with Next.js and React Native.",
    images: ["/avatar.png"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <WhatsAppFAB />
        <ScrollTopFAB />
      </body>
    </html>
  );
}