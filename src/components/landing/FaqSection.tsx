"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/types";

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Is my data private?",
    answer:
      "Yes. TorrenClou is 100% self-hosted. Your torrent files, downloads, and cloud credentials are stored exclusively inside your Docker container. No data is ever sent to any external service.",
  },
  {
    question: "Which cloud providers are supported?",
    answer:
      "Google Drive via OAuth 2.0 and any S3-compatible storage — including AWS S3, Backblaze B2, MinIO, Wasabi, Cloudflare R2, and DigitalOcean Spaces.",
  },
  {
    question: "What hardware do I need?",
    answer:
      "Minimum 2 GB RAM, 3 GB disk space for the Docker image, and any modern 64-bit processor. Runs on anything that supports Docker — Linux, macOS, or Windows with WSL2.",
  },
  {
    question: "How do I update to a new version?",
    answer:
      "Pull the latest image and re-run: docker pull ghcr.io/torrenclou/torrentclou:latest, then stop and recreate the container. Your data persists in Docker volumes.",
  },
  {
    question: "Can multiple users share one instance?",
    answer:
      "Currently designed for single-admin use. Multi-user support with per-user storage configurations and job isolation is planned for a future release.",
  },
  {
    question: "What happens if a download fails?",
    answer:
      "Failed jobs can be retried from the dashboard. The job queue is powered by Hangfire and Redis — it survives container restarts and tracks retry history.",
  },
  {
    question: "Can I access TorrenClou remotely?",
    answer:
      "Yes. Expose ports 47100 and 47200, set NEXTAUTH_URL to your public URL, and access from any browser. For production, use a reverse proxy like nginx or Caddy with TLS.",
  },
  {
    question: "Is there a hosted version?",
    answer:
      "No. TorrenClou is self-hosted by design. There is no cloud service, no accounts, no subscriptions. You own everything.",
  },
];

function FaqAccordionItem({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-surface-300/20">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left cursor-pointer"
      >
        <span className="text-sm font-medium text-white sm:text-base">
          {item.question}
        </span>
        <ChevronDown
          size={18}
          className={cn(
            "shrink-0 text-surface-100 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-surface-50">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-2xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">FAQ</h2>
          <p className="mt-4 text-surface-50">Common questions, answered.</p>
        </div>

        <div>
          {FAQ_ITEMS.map((item) => (
            <FaqAccordionItem key={item.question} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
