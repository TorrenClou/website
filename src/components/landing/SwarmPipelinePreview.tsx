"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Cloud,
  HardDrive,
  Lock,
  Pause,
  Play,
  RefreshCw,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TorrentPreset {
  id: string;
  name: string;
  sizeLabel: string;
  pieceSize: string;
  seeders: number;
  peers: number;
  trackerType: string;
  baseSpeedMbps: number;
  uploadSpeedMbps: number;
  hashPrefix: string;
}

const PRESETS: TorrentPreset[] = [
  {
    id: "ubuntu",
    name: "ubuntu-24.04.2-live-server-amd64.iso",
    sizeLabel: "2.64 GB",
    pieceSize: "4.0 MB",
    seeders: 418,
    peers: 34,
    trackerType: "BEP 15 UDP · Public",
    baseSpeedMbps: 118.4,
    uploadSpeedMbps: 94.2,
    hashPrefix: "8a3f91c2",
  },
  {
    id: "blender",
    name: "blender-4.4.0-linux-x64.tar.xz",
    sizeLabel: "384 MB",
    pieceSize: "1.0 MB",
    seeders: 192,
    peers: 19,
    trackerType: "BEP 48 HTTPS · Verified",
    baseSpeedMbps: 86.7,
    uploadSpeedMbps: 82.1,
    hashPrefix: "4d19e0b7",
  },
  {
    id: "arch",
    name: "archlinux-2026.10.01-x86_64.iso",
    sizeLabel: "1.12 GB",
    pieceSize: "2.0 MB",
    seeders: 612,
    peers: 41,
    trackerType: "BEP 27 Private · Isolated",
    baseSpeedMbps: 142.8,
    uploadSpeedMbps: 112.5,
    hashPrefix: "c7025fa4",
  },
];

const TOTAL_PIECES = 36;

type PieceState = "streamed" | "verified" | "encrypting" | "queued";

function getPieceState(index: number, cursor: number): PieceState {
  if (index < cursor - 5) return "streamed";
  if (index < cursor - 2) return "verified";
  if (index < cursor) return "encrypting";
  return "queued";
}

const PEER_ENDPOINTS = [
  "185.220.101.42:51413",
  "91.198.174.192:6881",
  "195.154.179.88:49160",
  "138.201.81.199:51413",
  "45.83.220.14:6969",
  "146.59.208.11:51413",
];

export function SwarmPipelinePreview() {
  const shouldReduceMotion = useReducedMotion();
  const [selectedPresetId, setSelectedPresetId] = useState<string>("ubuntu");
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [failoverSimulated, setFailoverSimulated] = useState<boolean>(false);
  const [cursor, setCursor] = useState<number>(22);
  const [inspectedPiece, setInspectedPiece] = useState<number>(18);
  const [tick, setTick] = useState<number>(0);

  const preset = useMemo(
    () => PRESETS.find((p) => p.id === selectedPresetId) ?? PRESETS[0],
    [selectedPresetId]
  );

  useEffect(() => {
    if (shouldReduceMotion || !isPlaying) return;
    const interval = window.setInterval(() => {
      setCursor((prev) => (prev >= TOTAL_PIECES + 5 ? 8 : prev + 1));
      setTick((prev) => prev + 1);
    }, 520);
    return () => window.clearInterval(interval);
  }, [isPlaying, shouldReduceMotion]);

  const streamedCount = useMemo(() => {
    let count = 0;
    for (let i = 0; i < TOTAL_PIECES; i++) {
      if (getPieceState(i, cursor) === "streamed") count++;
    }
    return count;
  }, [cursor]);

  const verifiedCount = useMemo(() => {
    let count = 0;
    for (let i = 0; i < TOTAL_PIECES; i++) {
      const state = getPieceState(i, cursor);
      if (state === "streamed" || state === "verified") count++;
    }
    return count;
  }, [cursor]);

  const progressPercent = Math.min(
    100,
    Math.round((streamedCount / TOTAL_PIECES) * 100)
  );

  // Subtle deterministic jitter on live transfer speeds
  const speedDelta = ((tick % 5) - 2) * 1.3;
  const activeDownMbps =
    streamedCount === TOTAL_PIECES
      ? 0
      : Math.max(12, +(preset.baseSpeedMbps + speedDelta).toFixed(1));
  const activeUpMbps =
    streamedCount === TOTAL_PIECES
      ? 0
      : Math.max(10, +(preset.uploadSpeedMbps - speedDelta * 0.7).toFixed(1));

  const inspectedState = getPieceState(inspectedPiece, cursor);
  const inspectedPeer = PEER_ENDPOINTS[inspectedPiece % PEER_ENDPOINTS.length];
  const inspectedHash = `${preset.hashPrefix}${(inspectedPiece * 2654435761 >>> 0)
    .toString(16)
    .padStart(8, "0")
    .slice(0, 8)}`;

  const handleSelectPreset = (id: string) => {
    setSelectedPresetId(id);
    setCursor(16);
  };

  return (
    <div className="mt-14 text-left">
      <div className="rounded-xl border border-surface-300/35 bg-surface-tonal-500 overflow-hidden">
        {/* Top Window Bar: Preset Selector + Simulation Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-300/25 bg-surface-500/80 px-4 py-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {PRESETS.map((item) => {
              const active = item.id === preset.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectPreset(item.id)}
                  className={cn(
                    "relative rounded-md px-2.5 py-1 text-xs font-mono cursor-pointer select-none transition-colors duration-150 active:scale-[0.97]",
                    active
                      ? "text-primary-300"
                      : "text-surface-100 hover:text-white"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="swarm-preset-pill"
                      transition={{
                        type: "spring",
                        duration: 0.28,
                        bounce: 0,
                      }}
                      className="absolute inset-0 rounded-md border border-primary-500/40 bg-primary-500/15"
                    />
                  )}
                  <span className="relative z-10">{item.name.split("-")[0]}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFailoverSimulated((prev) => !prev)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium cursor-pointer select-none",
                "transition-[background-color,border-color,color,transform] duration-150 ease-[cubic-bezier(0.165,0.84,0.44,1)] active:scale-[0.97]",
                failoverSimulated
                  ? "border-amber-500/45 bg-amber-500/15 text-amber-300"
                  : "border-surface-300/35 bg-surface-400/50 text-surface-100 hover:border-surface-200/50 hover:text-white"
              )}
            >
              <RefreshCw
                size={12}
                className={cn(
                  "transition-transform duration-300",
                  failoverSimulated && "rotate-180"
                )}
              />
              <span>
                {failoverSimulated
                  ? "Failover Active: R2 Backup"
                  : "Simulate Drive Full"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setIsPlaying((prev) => !prev)}
              className="inline-flex items-center gap-1 rounded-md border border-surface-300/35 bg-surface-400/50 px-2.5 py-1 text-xs text-surface-100 hover:border-surface-200/50 hover:text-white active:scale-[0.97] cursor-pointer select-none"
              aria-label={isPlaying ? "Pause telemetry simulation" : "Resume telemetry simulation"}
            >
              {isPlaying ? <Pause size={12} /> : <Play size={12} />}
              <span>{isPlaying ? "Live" : "Paused"}</span>
            </button>

            <button
              type="button"
              onClick={() => setCursor(8)}
              className="inline-flex items-center justify-center rounded-md border border-surface-300/35 bg-surface-400/50 p-1.5 text-surface-100 hover:border-surface-200/50 hover:text-white active:scale-[0.97] cursor-pointer"
              aria-label="Restart piece stream"
              title="Restart piece stream"
            >
              <RotateCcw size={12} />
            </button>
          </div>
        </div>

        {/* Main Telemetry Grid */}
        <div className="p-4 sm:p-5">
          {/* Job Header Row */}
          <div className="flex flex-col justify-between gap-3 border-b border-surface-300/20 pb-4 sm:flex-row sm:items-center">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="truncate font-mono text-sm font-semibold text-white">
                  {preset.name}
                </span>
                <span className="shrink-0 rounded border border-surface-300/35 bg-surface-400/60 px-2 py-0.5 font-mono text-xs text-surface-50 tabular-nums">
                  {preset.sizeLabel}
                </span>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-surface-100">
                <span className="inline-flex items-center gap-1 text-primary-400">
                  <Lock size={12} />
                  MSE/PE RC4 Stream
                </span>
                <span>·</span>
                <span>{preset.trackerType}</span>
                <span>·</span>
                <span className="tabular-nums">
                  {preset.seeders} seeders / {preset.peers} peers
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-right font-mono text-xs tabular-nums">
              <div>
                <div className="text-surface-100">Swarm Ingest</div>
                <div className="font-semibold text-primary-400">
                  {activeDownMbps.toFixed(1)} MB/s
                </div>
              </div>
              <div>
                <div className="text-surface-100">Cloud Stream</div>
                <div className="font-semibold text-emerald-400">
                  {activeUpMbps.toFixed(1)} MB/s
                </div>
              </div>
              <div>
                <div className="text-surface-100">Home ISP P2P</div>
                <div className="font-semibold text-white">0.0 B/s</div>
              </div>
            </div>
          </div>

          {/* 3-Stage Pipeline Strip */}
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {/* Stage 1: Encrypted Swarm */}
            <div className="rounded-lg border border-surface-300/25 bg-surface-500/50 p-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-white inline-flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-primary-400" />
                  1. Remote Swarm Socket
                </span>
                <span className="font-mono text-primary-400 tabular-nums">
                  RC4-Drop768
                </span>
              </div>
              <p className="mt-1.5 text-xs text-surface-100 leading-relaxed">
                Remote worker negotiates obfuscated peer handshakes. Your local ISP never joins the DHT or tracker announce.
              </p>
            </div>

            {/* Stage 2: Piece Verification & Ring Buffer */}
            <div className="rounded-lg border border-surface-300/25 bg-surface-500/50 p-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-white inline-flex items-center gap-1.5">
                  <HardDrive size={14} className="text-primary-400" />
                  2. SHA-1 Piece Buffer
                </span>
                <span className="font-mono text-surface-50 tabular-nums">
                  {verifiedCount}/{TOTAL_PIECES} verified
                </span>
              </div>
              <p className="mt-1.5 text-xs text-surface-100 leading-relaxed">
                {preset.pieceSize} pieces are hash-verified on the server and purged immediately after multipart cloud commit.
              </p>
            </div>

            {/* Stage 3: Cloud Storage Router with Live Failover */}
            <div
              className={cn(
                "rounded-lg border p-3 transition-colors duration-200",
                failoverSimulated
                  ? "border-amber-500/35 bg-amber-500/10"
                  : "border-surface-300/25 bg-surface-500/50"
              )}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-white inline-flex items-center gap-1.5">
                  <Cloud
                    size={14}
                    className={
                      failoverSimulated ? "text-amber-400" : "text-emerald-400"
                    }
                  />
                  3. Cloud Sink Router
                </span>
                <AnimatePresence mode="wait" initial={false}>
                  {failoverSimulated ? (
                    <motion.span
                      key="r2"
                      initial={
                        shouldReduceMotion
                          ? { opacity: 1 }
                          : { opacity: 0, y: -4 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      exit={
                        shouldReduceMotion
                          ? { opacity: 0 }
                          : { opacity: 0, y: 4 }
                      }
                      transition={{ duration: 0.15 }}
                      className="font-mono text-amber-300"
                    >
                      Cloudflare R2 (Failover)
                    </motion.span>
                  ) : (
                    <motion.span
                      key="gdrive"
                      initial={
                        shouldReduceMotion
                          ? { opacity: 1 }
                          : { opacity: 0, y: -4 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      exit={
                        shouldReduceMotion
                          ? { opacity: 0 }
                          : { opacity: 0, y: 4 }
                      }
                      transition={{ duration: 0.15 }}
                      className="font-mono text-emerald-400"
                    >
                      Google Drive OAuth2
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <p className="mt-1.5 text-xs text-surface-100 leading-relaxed">
                {failoverSimulated
                  ? "Primary Google Drive reported 99.4% quota full — health probe rerouted remaining chunks to R2 S3 without restart."
                  : "Checkpointed resumable upload streams directly to Google Drive over standard TLS 1.3."}
              </p>
            </div>
          </div>

          {/* Interactive 36-Block Piece Map */}
          <div className="mt-4 rounded-lg border border-surface-300/25 bg-surface-500/70 p-3.5">
            <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-medium text-white">
                  Interactive Piece Map
                </span>
                <span className="text-surface-100">
                  (Click or hover any piece to inspect telemetry)
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-surface-100">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-xs bg-emerald-500/85" />
                  Streamed &amp; Purged
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-xs bg-primary-400" />
                  SHA-1 Verified
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-xs border border-primary-400 bg-primary-500/25" />
                  RC4 Ingest
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-xs bg-surface-300/40" />
                  Queued
                </span>
              </div>
            </div>

            {/* Piece Grid */}
            <div className="grid grid-cols-12 gap-1.5 sm:grid-cols-18">
              {Array.from({ length: TOTAL_PIECES }).map((_, index) => {
                const state = getPieceState(index, cursor);
                const isInspected = index === inspectedPiece;

                return (
                  <button
                    key={index}
                    type="button"
                    onMouseEnter={() => setInspectedPiece(index)}
                    onClick={() => setInspectedPiece(index)}
                    className={cn(
                      "h-6 rounded-sm border transition-[background-color,border-color,transform] duration-150 ease-[cubic-bezier(0.165,0.84,0.44,1)] cursor-pointer",
                      state === "streamed" &&
                        "border-emerald-500/50 bg-emerald-500/75 hover:bg-emerald-400",
                      state === "verified" &&
                        "border-primary-400/60 bg-primary-500/80 hover:bg-primary-400",
                      state === "encrypting" &&
                        "border-primary-400 bg-primary-500/25 hover:bg-primary-500/40",
                      state === "queued" &&
                        "border-surface-300/30 bg-surface-400/50 hover:border-surface-200/50",
                      isInspected &&
                        "ring-2 ring-white ring-offset-1 ring-offset-surface-500 scale-[1.06]"
                    )}
                    aria-label={`Inspect piece ${index + 1}, status ${state}`}
                  />
                );
              })}
            </div>

            {/* Piece Inspector Readout Bar */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-surface-300/20 pt-2.5 font-mono text-xs tabular-nums">
              <div className="flex flex-wrap items-center gap-2 text-surface-50">
                <span className="rounded bg-surface-400 px-1.5 py-0.5 text-white">
                  Piece #{String(inspectedPiece + 1).padStart(2, "0")}
                </span>
                <span className="text-surface-100">SHA-1:</span>
                <span className="text-primary-300">{inspectedHash}</span>
                <span className="hidden sm:inline text-surface-200">·</span>
                <span className="hidden sm:inline text-surface-100">
                  Peer {inspectedPeer}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium",
                    inspectedState === "streamed" &&
                      "bg-emerald-500/15 text-emerald-300",
                    inspectedState === "verified" &&
                      "bg-primary-500/20 text-primary-300",
                    inspectedState === "encrypting" &&
                      "bg-primary-500/15 text-primary-400",
                    inspectedState === "queued" &&
                      "bg-surface-400 text-surface-100"
                  )}
                >
                  {inspectedState === "streamed" && (
                    <>
                      <CheckCircle2 size={12} />
                      Streamed to{" "}
                      {failoverSimulated ? "Cloudflare R2" : "Google Drive"} · Local Purged
                    </>
                  )}
                  {inspectedState === "verified" && (
                    <>
                      <ArrowRight size={12} />
                      SHA-1 Match · Uploading Multipart Chunk
                    </>
                  )}
                  {inspectedState === "encrypting" && (
                    <>
                      <Lock size={12} />
                      Decrypting MSE/RC4 Peer Stream
                    </>
                  )}
                  {inspectedState === "queued" && "Awaiting Swarm Piece Request"}
                </span>
                <span className="text-surface-100">{progressPercent}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
