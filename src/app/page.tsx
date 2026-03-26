import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeatureCards } from "@/components/landing/FeatureCards";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { PricingSection } from "@/components/landing/PricingSection";
import { FaqSection } from "@/components/landing/FaqSection";

export const metadata: Metadata = {
  title: "TorrenCloud — You're One Command Away from Having Your Torrent to Your Cloud",
  description:
    "No Questions Asked. No Traces. Self-hosted torrent-to-cloud sync with Google Drive and S3.",
  alternates: {
    canonical: "https://tc.gitnasr.com",
  },
  openGraph: {
    title: "TorrenCloud",
    description:
      "Self-hosted torrent-to-cloud sync in one Docker container.",
    url: "https://tc.gitnasr.com",
    images: [{ url: "/api/og?type=landing", width: 1200, height: 630, alt: "TorrenCloud" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "TorrenCloud",
  operatingSystem: "Docker (Linux, macOS, Windows)",
  applicationCategory: "UtilitiesApplication",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Self-hosted torrent-to-cloud sync. Download torrents and auto-sync to Google Drive or S3. One Docker container, one command.",
  url: "https://tc.gitnasr.com",
  downloadUrl: "https://github.com/TorrenClou/deploy",
  softwareVersion: "latest",
  license: "https://github.com/TorrenClou/deploy/blob/main/LICENSE",
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
