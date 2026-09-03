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
  title: "TorrenClou — You're One Command Away from Having Your Torrent to Your Cloud",
  description:
    "No Questions Asked. No Traces. Self-hosted torrent-to-cloud sync with Google Drive and S3.",
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: siteConfig.name,
    description: "Self-hosted torrent-to-cloud sync in one Docker container.",
    url: absoluteUrl("/"),
    images: [
      { url: "/api/og?type=landing", width: 1200, height: 630, alt: siteConfig.name },
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
      operatingSystem: "Docker (Linux, macOS, Windows)",
      applicationCategory: "UtilitiesApplication",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: siteConfig.description,
      url: absoluteUrl("/"),
      downloadUrl: `${siteConfig.github}/deploy`,
      softwareHelp: { "@type": "CreativeWork", url: absoluteUrl(siteConfig.docsPath) },
      license: `${siteConfig.github}/deploy/blob/main/LICENSE`,
      isAccessibleForFree: true,
      author: { "@id": `${absoluteUrl("/")}#organization` },
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
