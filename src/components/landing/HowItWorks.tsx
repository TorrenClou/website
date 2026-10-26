"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Settings, Upload, CloudDownload, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import type { HowItWorksStep } from "@/types";

interface InteractiveStep extends HowItWorksStep {
  artifactLabel: string;
  artifactDetail: string;
}

const STEPS: InteractiveStep[] = [
  {
    step: 1,
    title: "Claim & Connect Storage",
    description:
      "Start the container, create your admin account in the setup wizard, and connect Google Drive or S3.",
    icon: Settings,
    artifactLabel: "POST /api/setup/claim -> 200 OK",
    artifactDetail: "OAuth 2.0 Drive token + S3 endpoint encrypted with AES-256-GCM",
  },
  {
    step: 2,
    title: "Analyze & Pick Files",
    description:
      "Drop one or more .torrent files, inspect live seeders and health scores, and select the exact files you want.",
    icon: Upload,
    artifactLabel: "BEP 15 UDP + BEP 48 HTTP Scrape",
    artifactDetail: "418 seeders verified · 3 of 14 files selected · Private flag respected",
  },
  {
    step: 3,
    title: "Automatic Cloud Delivery",
    description:
      "TorrentDrive downloads in the background, streams files to your cloud with automatic failover, and reclaims local disk space.",
    icon: CloudDownload,
    artifactLabel: "MSE/RC4 Swarm -> Multipart Cloud Stream",
    artifactDetail: "SHA-1 verified pieces streamed over TLS 1.3 · Local staging purged",
  },
];

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-3 text-surface-50">
            Three steps from .torrent to cloud storage.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isActive = activeStep === step.step;

            return (
              <motion.div
                key={step.step}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.35,
                  delay: shouldReduceMotion ? 0 : index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <button
                  type="button"
                  aria-pressed={isActive}
                  onMouseEnter={() => setActiveStep(step.step)}
                  onFocus={() => setActiveStep(step.step)}
                  onClick={() => setActiveStep(step.step)}
                  className={cn(
                    "relative flex h-full w-full flex-col rounded-xl border p-6 text-left cursor-pointer transition-colors duration-150",
                    isActive
                      ? "border-primary-500/45 bg-surface-tonal-400/50"
                      : "border-surface-300/30 bg-surface-tonal-500 hover:border-surface-200/40"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="how-it-works-active-outline"
                      transition={{
                        type: "spring",
                        duration: 0.3,
                        bounce: 0,
                      }}
                      className="pointer-events-none absolute inset-0 rounded-xl border border-primary-400/50"
                    />
                  )}

                  <div className="mb-5 flex items-center justify-between">
                    <div
                      className={cn(
                        "flex h-11 w-11 items-center justify-center rounded-lg border transition-colors duration-150",
                        isActive
                          ? "border-primary-500/40 bg-primary-500/15 text-primary-400"
                          : "border-surface-300/35 bg-surface-400/40 text-surface-100"
                      )}
                    >
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <span
                      className={cn(
                        "rounded-md border px-2.5 py-0.5 font-mono text-xs font-semibold tabular-nums transition-colors duration-150",
                        isActive
                          ? "border-primary-500/35 bg-primary-500/15 text-primary-300"
                          : "border-surface-300/30 bg-surface-400/40 text-surface-100"
                      )}
                    >
                      0{step.step}
                    </span>
                  </div>

                  <h3 className="mb-2 text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-surface-50">
                    {step.description}
                  </p>

                  <div className="mt-auto pt-5">
                    <div className="rounded-lg border border-surface-300/25 bg-surface-500/80 p-3 font-mono text-xs">
                      <div className="flex items-center gap-1.5 text-primary-400">
                        <Terminal size={12} aria-hidden="true" />
                        <span className="truncate">{step.artifactLabel}</span>
                      </div>
                      <div className="mt-1 text-surface-100 leading-snug">
                        {step.artifactDetail}
                      </div>
                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
