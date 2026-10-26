import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/site";

/**
 * Everything here is public documentation and product pages for a self-hosted
 * product. Being quoted by AI assistants and indexed by all search engines
 * is the primary goal.
 */
const SEARCH_AND_AI_BOTS = [
  // Primary Search Engines
  "Googlebot",
  "Bingbot",
  "Slurp",
  "DuckDuckBot",
  "Baiduspider",
  "YandexBot",
  "Applebot",

  // AI Search & Extraction Crawlers
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "GoogleOther",
  "Applebot-Extended",
  "Amazonbot",
  "YouBot",
  "DuckAssistBot",
  "cohere-ai",
  "meta-externalagent",
  "meta-externalfetcher",
  "Bytespider",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      ...SEARCH_AND_AI_BOTS.map((userAgent) => ({
        userAgent,
        allow: "/",
      })),
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl(),
  };
}
