"use client";

import { motion } from "framer-motion";
import {
  FileDown,
  Cloud,
  Database,
  Activity,
  Lock,
  Box,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { FeatureCardProps } from "@/types";

const FEATURES: FeatureCardProps[] = [
  {
    icon: FileDown,
    title: ".torrent File Downloads",
    description:
      "Upload a .torrent file and downloads start immediately in the background.",
  },
  {
    icon: Cloud,
    title: "Sync to Google Drive",
    description:
      "OAuth 2.0 integration. Completed downloads land in your Drive folder automatically.",
  },
  {
    icon: Database,
    title: "S3-Compatible Storage",
    description:
      "AWS S3, Backblaze B2, MinIO, and any S3-compatible endpoint. Resumable uploads for large files.",
  },
  {
    icon: Activity,
    title: "Real-time Progress",
    description:
      "Watch downloads progress live. Job queue survives container restarts.",
  },
  {
    icon: Lock,
    title: "Self-Hosted & Private",
    description:
      "Your data never leaves your server. No telemetry, no phone-home, no accounts.",
  },
  {
    icon: Box,
    title: "One Docker Container",
    description:
      "PostgreSQL, Redis, API, workers, and frontend — all in one image.",
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: FeatureCardProps;
  index: number;
}) {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.4,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Card className="h-full transition-colors duration-200 hover:border-primary-500/30 hover:bg-surface-tonal-400/50">
        <div className="mb-4 inline-flex rounded-lg bg-primary-500/10 p-2.5">
          <Icon size={22} className="text-primary-400" />
        </div>
        <h3 className="mb-2 text-base font-semibold text-white">
          {feature.title}
        </h3>
        <p className="text-sm leading-relaxed text-surface-50">
          {feature.description}
        </p>
      </Card>
    </motion.div>
  );
}

export function FeatureCards() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Core Features
          </h2>
          <p className="mt-4 text-surface-50">
            Everything you need to download torrents and sync them to the cloud.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
