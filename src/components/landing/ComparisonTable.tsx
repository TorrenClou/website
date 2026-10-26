"use client";

import { motion } from "framer-motion";
import { Check, X, Shield, Zap, HardDrive, DollarSign, Lock, Layers } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

interface ComparisonRow {
  feature: string;
  category: string;
  torrentdrive: string | boolean;
  seedr: string | boolean;
  realDebrid: string | boolean;
  manualSetup: string | boolean;
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    feature: "Pricing & License",
    category: "Cost",
    torrentdrive: "100% Free & Open Source (MIT)",
    seedr: "$9.99 – $19.99 / mo",
    realDebrid: "Paid subscription",
    manualSetup: "Free (Complex scripts)",
  },
  {
    feature: "Direct Google Drive Streaming",
    category: "Storage",
    torrentdrive: true,
    seedr: false,
    realDebrid: false,
    manualSetup: "Requires rclone config",
  },
  {
    feature: "S3 & Cloudflare R2 Cloud Support",
    category: "Storage",
    torrentdrive: true,
    seedr: false,
    realDebrid: false,
    manualSetup: true,
  },
  {
    feature: "ISP-Blind Stealth Engine (MSE/PE RC4)",
    category: "Privacy",
    torrentdrive: true,
    seedr: true,
    realDebrid: true,
    manualSetup: "Depends on client settings",
  },
  {
    feature: "BEP 27 Private Tracker Safe Isolation",
    category: "BitTorrent",
    torrentdrive: true,
    seedr: false,
    realDebrid: false,
    manualSetup: "Manual ratio management",
  },
  {
    feature: "Selective File Batch Picking",
    category: "BitTorrent",
    torrentdrive: true,
    seedr: "Limited on free tier",
    realDebrid: false,
    manualSetup: true,
  },
  {
    feature: "Self-Hosted & Zero Third-Party Relay",
    category: "Privacy",
    torrentdrive: true,
    seedr: false,
    realDebrid: false,
    manualSetup: true,
  },
  {
    feature: "1-Click Dokploy & Coolify Blueprints",
    category: "Deployment",
    torrentdrive: true,
    seedr: false,
    realDebrid: false,
    manualSetup: false,
  },
  {
    feature: "Automatic Storage Failover & Drive Purge",
    category: "Storage",
    torrentdrive: true,
    seedr: false,
    realDebrid: false,
    manualSetup: "Custom cron scripts",
  },
];

function RenderValue({ value, isHighlight }: { value: string | boolean; isHighlight?: boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <span className="inline-flex items-center justify-center rounded-full bg-emerald-500/10 p-1 text-emerald-400">
        <Check size={16} strokeWidth={2.5} />
      </span>
    ) : (
      <span className="inline-flex items-center justify-center rounded-full bg-red-500/10 p-1 text-red-400">
        <X size={16} strokeWidth={2.5} />
      </span>
    );
  }

  return (
    <span
      className={`text-xs sm:text-sm font-medium ${
        isHighlight ? "text-primary-300 font-semibold" : "text-surface-100"
      }`}
    >
      {value}
    </span>
  );
}

export function ComparisonTable() {
  return (
    <section className="py-20 border-t border-surface-300/10" id="comparison">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-3">
            Why TorrentDrive
          </Badge>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Compare with Alternatives
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-surface-50 text-sm sm:text-base">
            See how TorrentDrive compares to commercial seedbox clouds and manual qBittorrent/Rclone setups.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-x-auto rounded-xl border border-surface-300/30 bg-surface-tonal-500 shadow-xl"
        >
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-surface-300/30 bg-surface-tonal-400/50">
                <th className="py-4 px-4 sm:px-6 font-semibold text-white">Feature</th>
                <th className="py-4 px-4 sm:px-6 font-semibold text-primary-400 bg-primary-500/10">
                  TorrentDrive
                </th>
                <th className="py-4 px-4 sm:px-6 font-semibold text-surface-100">Seedr</th>
                <th className="py-4 px-4 sm:px-6 font-semibold text-surface-100">Real-Debrid</th>
                <th className="py-4 px-4 sm:px-6 font-semibold text-surface-100">qBittorrent + Rclone</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-300/20">
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.feature} className="hover:bg-surface-tonal-400/30 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-medium text-white">
                    {row.feature}
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 bg-primary-500/5">
                    <RenderValue value={row.torrentdrive} isHighlight />
                  </td>
                  <td className="py-3.5 px-4 sm:px-6">
                    <RenderValue value={row.seedr} />
                  </td>
                  <td className="py-3.5 px-4 sm:px-6">
                    <RenderValue value={row.realDebrid} />
                  </td>
                  <td className="py-3.5 px-4 sm:px-6">
                    <RenderValue value={row.manualSetup} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
