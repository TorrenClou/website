"use client";

import { motion, useReducedMotion } from "framer-motion";
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
    icon: Lock,
    title: "ISP-Blind Stealth Engine",
    description:
      "Your home IP never joins a BitTorrent swarm. Server-side MSE/PE RC4 encryption, strict BEP 27 private-tracker isolation, and VPN interface binding keep transfers invisible.",
  },
  {
    icon: Cloud,
    title: "Direct to Google Drive & S3",
    description:
      "Stream completed downloads straight into Google Drive or S3 over standard HTTPS. Live health probes automatically reroute uploads if a drive fills up.",
  },
  {
    icon: FileDown,
    title: "Selective Batch Downloads",
    description:
      "Drop multiple .torrent files at once, inspect live UDP/HTTP tracker swarm health, and pick only the exact files you want.",
  },
  {
    icon: Database,
    title: "Resumable Cloud Transfers",
    description:
      "Google Drive, AWS S3, Cloudflare R2, Backblaze B2, Wasabi, and MinIO with checkpointed multipart uploads that survive restarts.",
  },
  {
    icon: Activity,
    title: "Real-Time Telemetry",
    description:
      "Track active downloads, upload speeds, and state transitions in real time with pre-provisioned Grafana & Prometheus dashboards.",
  },
  {
    icon: Box,
    title: "One Command or 1-Click PaaS",
    description:
      "PostgreSQL, Redis, API, workers, and UI in one zero-config container. First-class 1-click templates for Dokploy and Coolify.",
  },
];

function FeatureCard({
  feature,
  index,
  shouldReduceMotion,
}: {
  feature: FeatureCardProps;
  index: number;
  shouldReduceMotion: boolean;
}) {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.35,
        delay: shouldReduceMotion ? 0 : index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Card className="group h-full transition-colors duration-150 hover:border-primary-500/40 hover:bg-surface-tonal-400/50">
        <div className="mb-4 inline-flex rounded-lg border border-primary-500/20 bg-primary-500/10 p-2.5 transition-colors duration-150 group-hover:border-primary-500/40 group-hover:bg-primary-500/15">
          <Icon size={20} className="text-primary-400" />
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
  const shouldReduceMotion = Boolean(useReducedMotion());

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Core Features
          </h2>
          <p className="mt-3 text-surface-50">
            Built for ISP-blind, encrypted, hands-off torrent-to-Google Drive and S3 transfers.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
