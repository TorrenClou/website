"use client";

import { motion } from "framer-motion";
import { Upload, Settings, CloudDownload } from "lucide-react";
import type { HowItWorksStep } from "@/types";

const STEPS: HowItWorksStep[] = [
  {
    step: 1,
    title: "Add Your Torrent",
    description: "Upload a .torrent file from the dashboard and the download starts instantly.",
    icon: Upload,
  },
  {
    step: 2,
    title: "Connect Your Cloud",
    description: "Link Google Drive via OAuth or add your S3-compatible credentials.",
    icon: Settings,
  },
  {
    step: 3,
    title: "Files Land in Your Cloud",
    description: "Downloads complete and auto-sync to your storage. Every time.",
    icon: CloudDownload,
  },
];

export function HowItWorks() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-surface-50">Three steps. That&apos;s it.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                className="relative flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Connector line (not on last step) */}
                {index < STEPS.length - 1 && (
                  <div className="absolute top-8 left-[calc(50%+32px)] hidden h-px w-[calc(100%-64px)] border-t border-dashed border-surface-300/40 md:block" />
                )}

                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-primary-500/30 bg-primary-500/10">
                  <Icon size={26} className="text-primary-400" />
                </div>

                <span className="mb-2 text-xs font-bold uppercase tracking-widest text-primary-400">
                  Step {step.step}
                </span>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-surface-50">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
