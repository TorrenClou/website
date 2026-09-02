import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Heart } from "lucide-react";

const FOOTER_LINKS = [
  { label: "Docs", href: "/docs" },
  { label: "GitHub", href: "https://github.com/TorrenClou", external: true },
  { label: "License", href: "https://github.com/TorrenClou/deploy/blob/main/LICENSE", external: true },
];

export function Footer() {
  return (
    <footer className="border-t border-surface-300/20">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <Image src="/logo.svg" alt="TorrenClou" width={24} height={24} />
          <span className="text-sm text-surface-100">
            Open source torrent-to-cloud sync.
          </span>
        </div>

        <div className="flex items-center gap-6">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="flex items-center gap-1 text-sm text-surface-100 transition-colors hover:text-white"
            >
              {link.label}
              {link.external && <ExternalLink size={12} />}
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t border-surface-300/10 py-4 text-center">
        <span className="inline-flex items-center gap-1.5 text-xs text-surface-100">
          Created with
          <Heart size={12} className="fill-red-500 text-red-500" />
          by
          <Link
            href="https://gitnasr.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary-400 transition-colors hover:text-primary-300"
          >
            gitnasr.com
          </Link>
        </span>
      </div>
    </footer>
  );
}
