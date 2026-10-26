import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeatureCards } from "@/components/landing/FeatureCards";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { PricingSection } from "@/components/landing/PricingSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { FAQ_ITEMS } from "@/lib/faq";
import { siteConfig, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: absoluteUrl("/"),
    images: [
      {
        url: "/api/og?type=landing",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.tagline}`,
      },
    ],
  },
};

// One @graph rather than several loose blocks, so the entities can reference
// each other by @id. The FAQ entries are generated from the same array the page
// renders, which is why FAQ_ITEMS lives in lib rather than inside the component:
// structured data that advertises answers the page does not show is exactly
// what search engines penalise.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${absoluteUrl("/")}#organization`,
      name: siteConfig.name,
      url: absoluteUrl("/"),
      logo: absoluteUrl("/logo.svg"),
      sameAs: [siteConfig.github],
    },
    {
      "@type": "WebSite",
      "@id": `${absoluteUrl("/")}#website`,
      name: siteConfig.name,
      url: absoluteUrl("/"),
      description: siteConfig.description,
      inLanguage: "en",
      publisher: { "@id": `${absoluteUrl("/")}#organization` },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${absoluteUrl("/")}#software`,
      name: siteConfig.name,
      operatingSystem: "Docker (Linux, macOS, Windows, ARM64, AMD64)",
      applicationCategory: "UtilitiesApplication",
      applicationSubCategory: "Cloud Torrent Downloader & Seedbox",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: siteConfig.description,
      featureList: [
        "ISP-blind remote BitTorrent downloading with MSE/PE RC4 stream encryption",
        "Direct OAuth 2.0 streaming upload to Google Drive",
        "Checkpointed resumable multipart upload to AWS S3, Cloudflare R2, Backblaze B2, Wasabi, and MinIO",
        "Batch .torrent upload with live BEP 15 UDP and BEP 48 HTTP/HTTPS tracker health scraping",
        "Strict BEP 27 private tracker isolation (disables DHT, PEX, and LPD on private torrents)",
        "Automatic storage health probing and failover across multiple cloud drives",
        "Zero-config single Docker container with 1-click Dokploy and Coolify templates",
      ],
      url: absoluteUrl("/"),
      downloadUrl: `${siteConfig.github}/backend`,
      codeRepository: siteConfig.github,
      softwareHelp: { "@type": "CreativeWork", url: absoluteUrl(siteConfig.docsPath) },
      license: `${siteConfig.github}/backend/blob/main/LICENSE`,
      isAccessibleForFree: true,
      author: { "@id": `${absoluteUrl("/")}#organization` },
    },
    {
      "@type": "HowTo",
      "@id": `${absoluteUrl("/")}#howto`,
      name: "How to Download Torrents Directly to Google Drive Without Your ISP Knowing",
      description:
        "Deploy TorrentDrive in one command on a VPS, Dokploy, or Coolify and stream torrents straight to Google Drive over HTTPS.",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Deploy & Claim Your Instance",
          text: "Run the one-command installer or deploy the Docker Compose template on Dokploy/Coolify, open port 47100, and complete the 3-step Setup Wizard to connect Google Drive or S3.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Analyze Swarm Health & Pick Files",
          text: "Drop one or more .torrent files in the web UI, inspect live UDP/HTTP tracker seeders and health scores, and select only the exact files you want.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Automatic Encrypted Cloud Delivery",
          text: "TorrentDrive downloads the selected pieces on your server using MSE/PE RC4 encryption, uploads the finished files to Google Drive or S3 with automatic failover, and purges local disk space.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${absoluteUrl("/")}#faq`,
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="min-h-screen">
        <HeroSection />
        <FeatureCards />
        <HowItWorks />
        <PricingSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
