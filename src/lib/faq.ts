import type { FaqItem } from "@/types";

/**
 * The landing page FAQ.
 *
 * Lives here rather than inside FaqSection because the FAQPage structured data
 * on the landing page is generated from this same array. Keeping one copy means
 * the schema cannot end up advertising answers the page does not show, which is
 * exactly the mismatch search engines penalise.
 *
 * The longer-form version is content/docs/faq.mdx.
 */
export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Can my home ISP see what I am torrenting?",
    answer:
      "No. When you deploy TorrentDrive on a cloud VPS, Dokploy, or Coolify, your home connection never joins a BitTorrent swarm or talks to trackers. You upload the .torrent file over HTTPS to your TorrentDrive dashboard, the remote server downloads it with MSE/PE RC4 stream encryption, and the finished files are pushed directly to your Google Drive or S3 over Google/AWS HTTPS APIs.",
  },
  {
    question: "Is my data private?",
    answer:
      "Yes. TorrentDrive is 100% self-hosted. Your torrent files, downloads, and cloud credentials are stored exclusively inside your Docker container. No data is ever sent to any third-party relay.",
  },
  {
    question: "Which cloud providers are supported?",
    answer:
      "Google Drive via OAuth 2.0 and any S3-compatible storage — including AWS S3, Backblaze B2, MinIO, Wasabi, Cloudflare R2, and DigitalOcean Spaces.",
  },
  {
    question: "What hardware do I need?",
    answer:
      "Minimum 2 GB RAM, 3 GB disk space for the Docker image, and any modern 64-bit processor. Runs on anything that supports Docker — a $4 cloud VPS, Dokploy, Coolify, Linux, macOS, or Windows with WSL2.",
  },
  {
    question: "How do I update to a new version?",
    answer:
      "Re-run the installer or pull the latest Docker Compose image. It replaces the container and leaves the volumes alone, so your database, downloads, and generated secrets survive.",
  },
  {
    question: "What happens if a download or upload fails?",
    answer:
      "TorrentDrive continuously probes storage health and automatically fails over to another healthy drive if your primary storage fills up. Failed jobs can also be retried from the dashboard with full checkpoint recovery.",
  },
  {
    question: "Can I access TorrentDrive remotely?",
    answer:
      "Yes. Expose only port 47100 and put a reverse proxy with TLS in front of it (or deploy with 1 click on Dokploy or Coolify). Internal admin ports (47200, 47500, 47600) are bound to 127.0.0.1 by default.",
  },
  {
    question: "Is there a hosted version?",
    answer:
      "No. TorrentDrive is self-hosted by design. There is no cloud service, no accounts, no subscriptions. You own everything.",
  },
];