"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComparisonRow {
  feature: string;
  category: "Cost" | "Storage" | "Privacy" | "BitTorrent" | "Deployment";
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

type FilterGroup = "all" | "privacy" | "storage" | "ops";

const FILTER_TABS: { id: FilterGroup; label: string }[] = [
  { id: "all", label: "All Capabilities" },
  { id: "privacy", label: "Privacy & BitTorrent" },
  { id: "storage", label: "Cloud Storage" },
  { id: "ops", label: "Cost & Deployment" },
];

function matchesFilter(row: ComparisonRow, filter: FilterGroup): boolean {
  if (filter === "all") return true;
  if (filter === "privacy") {
    return row.category === "Privacy" || row.category === "BitTorrent";
  }
  if (filter === "storage") {
    return row.category === "Storage";
  }
  return row.category === "Cost" || row.category === "Deployment";
}

function RenderValue({
  value,
  isHighlight,
}: {
  value: string | boolean;
  isHighlight?: boolean;
}) {
  if (typeof value === "boolean") {
    return value ? (
      <span
        className="inline-flex items-center justify-center rounded-full bg-success/15 p-1 text-success-medium"
        aria-label="Supported"
      >
        <Check size={15} strokeWidth={2.5} aria-hidden="true" />
      </span>
    ) : (
      <span
        className="inline-flex items-center justify-center rounded-full bg-danger/15 p-1 text-danger-light"
        aria-label="Not supported"
      >
        <X size={15} strokeWidth={2.5} aria-hidden="true" />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "text-xs sm:text-sm font-medium",
        isHighlight ? "text-primary-300 font-semibold" : "text-surface-100"
      )}
    >
      {value}
    </span>
  );
}

export function ComparisonTable() {
  const [filter, setFilter] = useState<FilterGroup>("all");
  const shouldReduceMotion = useReducedMotion();

  const filteredRows = COMPARISON_ROWS.filter((row) =>
    matchesFilter(row, filter)
  );

  return (
    <section className="py-20 border-t border-surface-300/15" id="comparison">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Compare with Alternatives
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-surface-50 text-sm sm:text-base">
            See how TorrentDrive compares to commercial seedbox clouds and manual qBittorrent/Rclone setups.
          </p>

          {/* Interactive Category Filter Tabs */}
          <div
            className="mt-6 inline-flex flex-wrap items-center justify-center gap-1 rounded-lg border border-surface-300/30 bg-surface-tonal-500 p-1"
            role="group"
            aria-label="Filter comparison categories"
          >
            {FILTER_TABS.map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(tab.id)}
                  className={cn(
                    "relative cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium select-none transition-colors duration-150 active:scale-[0.97]",
                    active
                      ? "text-primary-300"
                      : "text-surface-100 hover:text-white"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="comparison-filter-pill"
                      transition={{
                        type: "spring",
                        duration: 0.25,
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
        </div>

        <div className="overflow-x-auto rounded-xl border border-surface-300/30 bg-surface-tonal-500">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-surface-300/30 bg-surface-tonal-400/50">
                <th className="py-4 px-4 sm:px-6 font-semibold text-white">
                  Feature
                </th>
                <th className="py-4 px-4 sm:px-6 font-semibold text-primary-400 bg-primary-500/10">
                  TorrentDrive
                </th>
                <th className="py-4 px-4 sm:px-6 font-semibold text-surface-100">
                  Seedr
                </th>
                <th className="py-4 px-4 sm:px-6 font-semibold text-surface-100">
                  Real-Debrid
                </th>
                <th className="py-4 px-4 sm:px-6 font-semibold text-surface-100">
                  qBittorrent + Rclone
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-300/20">
              <AnimatePresence initial={false} mode="popLayout">
                {filteredRows.map((row) => (
                  <motion.tr
                    key={row.feature}
                    layout={!shouldReduceMotion}
                    initial={shouldReduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.16, ease: [0.165, 0.84, 0.44, 1] }}
                    className="hover:bg-surface-tonal-400/35 transition-colors duration-150"
                  >
                    <td className="py-3.5 px-4 sm:px-6 font-medium text-white">
                      <div className="flex items-center gap-2.5">
                        <span>{row.feature}</span>
                        <span className="hidden sm:inline-block rounded border border-surface-300/30 bg-surface-400/50 px-1.5 py-0.5 font-mono text-[10px] text-surface-100">
                          {row.category}
                        </span>
                      </div>
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
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
