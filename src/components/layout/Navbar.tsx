"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useScrolled } from "@/hooks/useScrolled";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

const NAV_ITEMS: NavItem[] = [
  { label: "Docs", href: "/docs" },
  { label: "GitHub", href: "https://github.com/TorrenClou", external: true },
];

export function Navbar() {
  const scrolled = useScrolled(20);

  return (
    <motion.nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-colors duration-200",
        scrolled
          ? "bg-surface-500/90 border-b border-surface-300/30"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo.svg" alt="TorrenCloud" width={28} height={28} />
          <span className="text-lg font-bold text-white">TorrenCloud</span>
        </Link>

        <div className="flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="flex items-center gap-1 text-sm text-surface-50 transition-colors hover:text-white"
            >
              {item.label}
              {item.external && <ExternalLink size={12} />}
            </Link>
          ))}
          <Button href="/docs" size="sm">
            Get Started
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}
