import type { Metadata } from "next";
import { IBM_Plex_Sans, Inter } from "next/font/google";
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

const fallbackSiteUrl = "https://www.benaaconstruction.org";

function resolveMetadataBase(rawSiteUrl: string | undefined) {
  const normalized = rawSiteUrl?.trim();

  if (!normalized) {
    return new URL(fallbackSiteUrl);
  }

  try {
    return new URL(normalized);
  } catch {
    try {
      return new URL(`https://${normalized}`);
    } catch {
      return new URL(fallbackSiteUrl);
    }
  }
}

const metadataBase = resolveMetadataBase(process.env.NEXT_PUBLIC_SITE_URL);

export const metadata: Metadata = {
  metadataBase,
  title: "BENAA | The Procurement OS for Modular Construction",
  description:
    "BENAA helps developers, contractors, and modular factories discover, vet, compare, and engage through a structured procurement workflow.",
  openGraph: {
    title: "BENAA | Procurement OS for Modular Construction",
    description:
      "Join the BENAA waitlist to access a structured, lower-friction modular procurement workflow.",
    url: "/",
    siteName: "BENAA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BENAA | Procurement OS for Modular Construction",
    description:
      "Join the BENAA waitlist for structured, data-driven modular procurement.",
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
