import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Prerensics™ — From containment to prevention | A VLX methodology",
  description:
    "Prerensics™ is a VLX methodology of validations that mitigates supply chain risk before disruptions occur — not after. Built on Know Your Product (KYP).",
  metadataBase: new URL("https://prerensics.ai"),
  openGraph: {
    title: "Prerensics™ — From containment to prevention",
    description:
      "A VLX methodology of validations. Move supply chain risk management from forensic post-mortems to preventive verification.",
    url: "https://prerensics.ai",
    siteName: "Prerensics",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
