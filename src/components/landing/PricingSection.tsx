"use client";

import { motion } from "framer-motion";
import { scaleIn } from "@/lib/animation-variants";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Check, ExternalLink } from "lucide-react";
import type { PricingCardData } from "@/types";

const PRICING: PricingCardData = {
  badge: "Free & Open Source",
  title: "Always Free",
  description: "Self-host on your own server. No subscriptions, no limits.",
  features: [
    { text: "Unlimited torrents" },
    { text: "Unlimited cloud storage (use your own)" },
    { text: "Google Drive & S3 integration" },
    { text: "Full source code access" },
    { text: "Community support via GitHub" },
  ],
  githubUrl: "https://github.com/TorrenClou",
};

export function PricingSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Pricing
          </h2>
          <p className="mt-4 text-surface-50">
            No tricks. No tiers. Just free.
          </p>
        </div>

        <motion.div
          className="mx-auto max-w-md"
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <Card className="relative overflow-hidden border-primary-500/30 p-8">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-0.5 gradient-primary" />

            <Badge variant="primary" className="mb-4">
              {PRICING.badge}
            </Badge>

            <h3 className="text-2xl font-bold text-white">{PRICING.title}</h3>
            <p className="mt-2 text-sm text-surface-50">
              {PRICING.description}
            </p>

            <ul className="mt-6 space-y-3">
              {PRICING.features.map((feature) => (
                <li
                  key={feature.text}
                  className="flex items-start gap-2.5 text-sm text-surface-50"
                >
                  <Check
                    size={16}
                    className="mt-0.5 shrink-0 text-primary-400"
                  />
                  {feature.text}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button
                href={PRICING.githubUrl}
                external
                size="lg"
                className="w-full"
              >
                View on GitHub
                <ExternalLink size={16} />
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
