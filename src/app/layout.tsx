import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import ClientCartWrapper from "@/context/ClientCartWrapper";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AZARO | Engineered for Comfort. Designed for Leaders.",
  description: "Premium office seating crafted for executives, professionals, modern workspaces, and corporate environments. Discover our range of luxury chairs.",
  keywords: "office chairs, executive chairs, ergonomic seating, luxury office furniture, AZARO, BIFMA certified",
  authors: [{ name: "AZARO Brand" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body>
        <ClientCartWrapper>{children}</ClientCartWrapper>
        <WhatsAppButton />
      </body>
    </html>
  );
}

