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
    question: "Is my data private?",
    answer:
      "Yes. TorrenClou is 100% self-hosted. Your torrent files, downloads, and cloud credentials are stored exclusively inside your Docker container. No data is ever sent to any external service.",
  },
  {
    question: "Which cloud providers are supported?",
    answer:
      "Google Drive via OAuth 2.0 and any S3-compatible storage — including AWS S3, Backblaze B2, MinIO, Wasabi, Cloudflare R2, and DigitalOcean Spaces.",
  },
  {
    question: "What hardware do I need?",
    answer:
      "Minimum 2 GB RAM, 3 GB disk space for the Docker image, and any modern 64-bit processor. Runs on anything that supports Docker — Linux, macOS, or Windows with WSL2.",
  },
  {
    question: "How do I update to a new version?",
    answer:
      "Re-run the installer. It replaces the container and leaves the volumes alone, so your database, downloads and generated secrets survive.",
  },
  {
    question: "Can multiple users share one instance?",
    answer:
      "Currently designed for single-admin use. Multi-user support with per-user storage configurations and job isolation is planned for a future release.",
  },
  {
    question: "What happens if a download fails?",
    answer:
      "Failed jobs can be retried from the dashboard. The job queue is powered by Hangfire and Redis — it survives container restarts and tracks retry history.",
  },
  {
    question: "Can I access TorrenClou remotely?",
    answer:
      "Yes. Expose only port 47100 and put a reverse proxy with TLS in front of it. Port 47200 does not need to be open — the browser reaches the API through the frontend's same-origin proxy, and 47200 carries an unauthenticated Hangfire dashboard.",
  },
  {
    question: "Is there a hosted version?",
    answer:
      "No. TorrenClou is self-hosted by design. There is no cloud service, no accounts, no subscriptions. You own everything.",
  },
];
