import type { Metadata } from "next";
import { IBM_Plex_Sans, Inter } from "next/font/google";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const metadataBase = getSiteUrl();

export const metadata: Metadata = {
  metadataBase,
  alternates: {
    canonical: "/",
  },
  title: "BENAA | The Procurement OS for Modular Construction",
  description:
    "BENAA helps developers, contractors, and modular factories discover, vet, compare, and engage through a structured procurement workflow.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "BENAA | Procurement OS for Modular Construction",
    description:
      "Join the BENAA waitlist to access a structured, lower-friction modular procurement workflow.",
    url: "/",
    siteName: "BENAA",
    type: "website",
    images: ["/Benaalogo_0A1638_upscaled_4x.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "BENAA | Procurement OS for Modular Construction",
    description:
      "Join the BENAA waitlist for structured, data-driven modular procurement.",
    images: ["/Benaalogo_0A1638_upscaled_4x.png"],
  },
};

const rootClasses = `${inter.variable} ${ibmPlexSans.variable} h-full antialiased`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={rootClasses}>
      <body className="min-h-full flex flex-col bg-benaa-bg text-benaa-ink">
        {children}
      </body>
    </html>
  );
}
