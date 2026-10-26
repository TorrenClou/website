import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { RootProvider } from "fumadocs-ui/provider/next";
import { siteConfig, absoluteUrl } from "@/lib/site";
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0d1117" },
    { media: "(prefers-color-scheme: light)", color: "#0d1117" },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  category: "technology",
  keywords: [
    "TorrentDrive",
    "torrent to google drive",
    "download torrent to google drive",
    "isp blind torrent downloader",
    "torrent without isp knowing",
    "self-hosted seedbox",
    "cloud torrent downloader",
    "torrent to s3",
    "torrent to cloudflare r2",
    "torrent to backblaze b2",
    "docker torrent client",
    "open source seedr alternative",
    "real-debrid open source alternative",
    "dokploy torrent template",
    "coolify torrent template",
    "bep 27 private tracker",
    "mse pe rc4 encryption",
    "hangfire torrent queue",
    "monotorrent cloud uploader",
    "cloud seedbox docker",
  ],
  authors: [{ name: "TorrentDrive", url: siteConfig.github }],
  creator: "TorrentDrive",
  publisher: "TorrentDrive",
  alternates: {
    canonical: absoluteUrl("/"),
    languages: {
      "en-US": absoluteUrl("/"),
      "x-default": absoluteUrl("/"),
    },
    types: {
      "text/plain": [
        { url: "/llms.txt", title: "TorrentDrive LLM Documentation Index" },
        { url: "/llms-full.txt", title: "TorrentDrive Complete LLM Documentation" },
        { url: "/pricing.md", title: "TorrentDrive Machine-Readable Pricing Specifications" },
      ],
      "application/rss+xml": [
        { url: "/feed.xml", title: "TorrentDrive Documentation & Updates RSS Feed" },
      ],
    },
  },
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
  },
  manifest: "/manifest.webmanifest",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "google_site_verification_token",
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    me: [siteConfig.github],
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    locale: "en_US",
    url: absoluteUrl("/"),
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    creator: siteConfig.twitter,
    images: ["/api/og"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
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
