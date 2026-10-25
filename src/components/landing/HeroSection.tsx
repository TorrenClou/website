"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeUpVariant, staggerContainer } from "@/lib/animation-variants";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { ExternalLink } from "lucide-react";

type Platform = "linux" | "compose" | "windows";

const INSTALL_COMMANDS: Record<Platform, { code: string; filename: string }> = {
  linux: {
    code: "curl -fsSL https://raw.githubusercontent.com/TorrentDrive/deploy/main/install.sh | bash",
    filename: "terminal",
  },
  compose: {
    code: "curl -fsSL https://raw.githubusercontent.com/TorrentDrive/deploy/main/docker-compose.yml -o docker-compose.yml && docker compose up -d",
    filename: "docker-compose",
  },
  windows: {
    code: "irm https://raw.githubusercontent.com/TorrentDrive/deploy/main/install.ps1 | iex",
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

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  const cmd = INSTALL_COMMANDS[platform];

  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-primary-500)/8%_0%,_transparent_70%)]" />

      <motion.div
        className="relative mx-auto max-w-4xl px-6 text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeUpVariant}>
          <Badge variant="outline" className="mb-6">
            ISP-Blind Architecture · One Container · Dokploy &amp; Coolify Ready
          </Badge>
        </motion.div>

        <motion.h1
          variants={fadeUpVariant}
          className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          Torrent to{" "}
          <span className="bg-gradient-to-r from-primary-400 to-primary-200 bg-clip-text text-transparent">
            Google Drive
          </span>{" "}
          Without Your ISP Knowing
        </motion.h1>

        <motion.p
          variants={fadeUpVariant}
          className="mt-6 text-lg text-surface-50 md:text-xl"
        >
          Zero local P2P traffic. Your remote TorrentDrive instance handles encrypted BitTorrent swarms and streams finished files straight into your Google Drive or S3 — your home ISP only ever sees standard HTTPS.
        </motion.p>

        <motion.div
          variants={fadeUpVariant}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
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

        <motion.div variants={fadeUpVariant} className="mt-12">
          <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setPlatform("linux")}
              className={`cursor-pointer rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                platform === "linux"
                  ? "bg-primary-500/20 text-primary-400"
                  : "text-surface-100 hover:text-white"
              }`}
            >
              Linux / macOS
            </button>
            <button
              onClick={() => setPlatform("compose")}
              className={`cursor-pointer rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                platform === "compose"
                  ? "bg-primary-500/20 text-primary-400"
                  : "text-surface-100 hover:text-white"
              }`}
            >
              Docker Compose
            </button>
            <button
              onClick={() => setPlatform("windows")}
              className={`cursor-pointer rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                platform === "windows"
                  ? "bg-primary-500/20 text-primary-400"
                  : "text-surface-100 hover:text-white"
              }`}
            >
              Windows
            </button>
          </div>
          <CodeBlock code={cmd.code} filename={cmd.filename} />
          <p className="mt-4 font-mono text-xs text-surface-100">
            First boot opens the{" "}
            <span className="text-primary-400">Setup Wizard</span> at{" "}
            <span className="text-surface-200">localhost:47100</span>
            {" · "}
            Deploy in 1 click on{" "}
            <a href="/docs/paas/dokploy" className="text-primary-400 hover:underline">
              Dokploy
            </a>{" "}
            or{" "}
            <a href="/docs/paas/coolify" className="text-primary-400 hover:underline">
              Coolify
            </a>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}