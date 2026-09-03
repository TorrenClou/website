import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/site";

/**
 * Everything here is public documentation for a self-hosted product, and being
 * quoted by an assistant is the point rather than a leak. The AI crawlers are
 * named explicitly rather than left to the wildcard so the decision is visible:
 * if any of them should ever be disallowed, this is the file to edit, and the
 * absence of a rule will not be mistaken for an oversight.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "meta-externalagent",
  "Bytespider",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl(),
  };
}
