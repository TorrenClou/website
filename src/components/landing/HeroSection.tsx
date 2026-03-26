"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeUpVariant, staggerContainer } from "@/lib/animation-variants";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { ExternalLink } from "lucide-react";

type Platform = "linux" | "windows";

const INSTALL_COMMANDS: Record<Platform, { code: string; filename: string }> = {
  linux: {
    code: "curl -fsSL https://raw.githubusercontent.com/TorrenClou/deploy/main/install.sh | bash",
    filename: "terminal",
  },
  windows: {
    code: "irm https://raw.githubusercontent.com/TorrenClou/deploy/main/install.ps1 | iex",
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
            Requires Docker
          </Badge>
        </motion.div>

        <motion.h1
          variants={fadeUpVariant}
          className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          You&apos;re One Command Away from Having Your Torrent to Your{" "}
          <span className="bg-gradient-to-r from-primary-400 to-primary-200 bg-clip-text text-transparent">
            Cloud
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUpVariant}
          className="mt-6 text-lg text-surface-50 md:text-xl"
        >
          No Questions Asked. No Traces.
        </motion.p>

        <motion.div
          variants={fadeUpVariant}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button href="/docs" size="lg">
            Get Started
          </Button>
          <Button
            href="https://github.com/TorrenClou"
            external
            variant="outline"
            size="lg"
          >
            View on GitHub
            <ExternalLink size={16} />
          </Button>
        </motion.div>

        <motion.div variants={fadeUpVariant} className="mt-12">
          <div className="mb-3 flex items-center justify-center gap-2">
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
            After install →{" "}
            <span className="text-primary-400">localhost:47100</span>{" "}
            <span className="text-surface-200">(admin@torrencloud.local)</span>
            {" · "}
            <span className="text-primary-400">Grafana :47500</span>{" "}
            <span className="text-surface-200">(admin/admin)</span>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
