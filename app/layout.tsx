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
  title: "Joseph Kakkassery",
  description: "Portfolio and professional projects of Joseph Kakkassery",
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
        <Navbar/>
        {children}
        <WhatsAppFAB />
        <ScrollTopFAB />
      </body>
    </html>
  );
}
