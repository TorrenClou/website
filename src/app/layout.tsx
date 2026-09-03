import type { Metadata } from "next";
import localFont from "next/font/local";
import { RootProvider } from "fumadocs-ui/provider/next";
import "./globals.css";

// Vendored rather than fetched with next/font/google, which downloads from
// Google Fonts during `next build`. See src/app/fonts/README.md.
const inter = localFont({
  src: "./fonts/inter-latin-variable.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-inter",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tc.gitnasr.com"),
  title: {
    default: "TorrenClou — Torrent to Cloud, One Command Away",
    template: "%s — TorrenClou",
  },
  description:
    "Self-hosted torrent-to-cloud sync. Download torrents and auto-sync to Google Drive or S3. One Docker container, one command.",
  keywords: [
    "torrent",
    "cloud storage",
    "self-hosted",
    "google drive",
    "s3",
    "docker",
    "open source",
    "torrent to cloud",
  ],
  authors: [{ name: "TorrenClou", url: "https://github.com/TorrenClou" }],
  creator: "TorrenClou",
  openGraph: {
    type: "website",
    siteName: "TorrenClou",
    locale: "en_US",
    url: "https://tc.gitnasr.com",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "TorrenClou — Torrent to Cloud, One Command Away" }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@c0nasr",
    images: ["/api/og"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans bg-surface-500 text-white antialiased`}
      >
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
