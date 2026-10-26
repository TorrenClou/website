"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUpVariant, staggerContainer } from "@/lib/animation-variants";
import { Button } from "@/components/ui/Button";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { SwarmPipelinePreview } from "@/components/landing/SwarmPipelinePreview";
import { ExternalLink, Shield, Server, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

type Platform = "linux" | "compose" | "windows";

const PLATFORM_TABS: { id: Platform; label: string }[] = [
  { id: "linux", label: "Linux / macOS" },
  { id: "compose", label: "Docker Compose" },
  { id: "windows", label: "Windows" },
];

const INSTALL_COMMANDS: Record<Platform, { code: string; filename: string }> = {
  linux: {
    code: "curl -fsSL https://raw.githubusercontent.com/TorrentDrive/backend/main/install.sh | bash",
    filename: "terminal — bash",
  },
  compose: {
    code: "curl -fsSL https://raw.githubusercontent.com/TorrentDrive/backend/main/docker-compose.yml -o docker-compose.yml && docker compose up -d",
    filename: "docker-compose",
  },
  windows: {
    code: "irm https://raw.githubusercontent.com/TorrentDrive/backend/main/install.ps1 | iex",
    filename: "powershell",
  },
};

function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "linux";
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("win")) return "windows";
  return "linux";
}

export function HeroSection() {
  const [platform, setPlatform] = useState<Platform>("linux");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  const cmd = INSTALL_COMMANDS[platform];

  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      {/* Subtle radial atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-primary-500)/10%_0%,_transparent_65%)]" />

      <motion.div
        className="relative mx-auto max-w-5xl px-6 text-center"
        variants={shouldReduceMotion ? undefined : staggerContainer}
        initial={shouldReduceMotion ? false : "hidden"}
        animate="visible"
      >
        <motion.h1
          variants={shouldReduceMotion ? undefined : fadeUpVariant}
          className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          Torrent to{" "}
          <span className="text-primary-400">Google Drive</span>{" "}
          Without Your ISP Knowing
        </motion.h1>

        <motion.p
          variants={shouldReduceMotion ? undefined : fadeUpVariant}
          className="mx-auto mt-6 max-w-3xl text-lg text-surface-50 md:text-xl leading-relaxed"
        >
          Zero local P2P traffic. Your remote TorrentDrive instance handles encrypted BitTorrent swarms and streams finished files straight into your Google Drive or S3 — your home ISP only ever sees standard HTTPS.
        </motion.p>

        {/* Factual Architecture Capabilities Strip */}
        <motion.div
          variants={shouldReduceMotion ? undefined : fadeUpVariant}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono text-surface-100"
        >
          <span className="inline-flex items-center gap-1.5">
            <Shield size={13} className="text-primary-400" />
            MSE/PE RC4 + BEP 27 Isolation
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Server size={13} className="text-primary-400" />
            Single All-in-One Container
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Layers size={13} className="text-primary-400" />
            Dokploy &amp; Coolify Ready
          </span>
        </motion.div>

        <motion.div
          variants={shouldReduceMotion ? undefined : fadeUpVariant}
          className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row"
        >
          <Button href="/docs" size="lg">
            Get Started
          </Button>
          <Button
            href="https://github.com/TorrentDrive"
            external
            variant="outline"
            size="lg"
          >
            View on GitHub
            <ExternalLink size={16} />
          </Button>
        </motion.div>

        <motion.div
          variants={shouldReduceMotion ? undefined : fadeUpVariant}
          className="mx-auto mt-12 max-w-3xl"
        >
          {/* Shared-layout sliding platform tab bar */}
          <div className="mb-3 inline-flex flex-wrap items-center justify-center rounded-lg border border-surface-300/30 bg-surface-tonal-500 p-1">
            {PLATFORM_TABS.map((tab) => {
              const active = platform === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setPlatform(tab.id)}
                  className={cn(
                    "relative cursor-pointer rounded-md px-3.5 py-1.5 text-xs font-medium select-none transition-colors duration-150 active:scale-[0.97]",
                    active
                      ? "text-primary-300"
                      : "text-surface-100 hover:text-white"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="hero-install-tab-pill"
                      transition={{
                        type: "spring",
                        duration: 0.28,
                        bounce: 0,
                      }}
                      className="absolute inset-0 rounded-md border border-primary-500/35 bg-primary-500/15"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <CodeBlock code={cmd.code} filename={cmd.filename} />

          <p className="mt-3.5 font-mono text-xs text-surface-100">
            First boot opens the{" "}
            <span className="text-primary-400">Setup Wizard</span> at{" "}
            <span className="text-surface-50 tabular-nums">localhost:47100</span>
            {" · "}
            Deploy in 1 click on{" "}
            <a
              href="/docs/paas/dokploy"
              className="text-primary-400 underline-offset-4 hover:underline"
            >
              Dokploy
            </a>{" "}
            or{" "}
            <a
              href="/docs/paas/coolify"
              className="text-primary-400 underline-offset-4 hover:underline"
            >
              Coolify
            </a>
          </p>
        </motion.div>

        {/* Interactive BitTorrent Swarm & Cloud Stream Pipeline Preview */}
        <motion.div variants={shouldReduceMotion ? undefined : fadeUpVariant}>
          <SwarmPipelinePreview />
        </motion.div>
      </motion.div>
    </section>
  );
}
