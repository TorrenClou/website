import type { MetadataRoute } from "next";

import lastmod from "@/lib/lastmod.json";
import { source } from "@/lib/source";
import { siteConfig, absoluteUrl } from "@/lib/site";

const dates = lastmod as Record<string, string>;

/**
 * Dates come from `scripts/lastmod.mjs`, which reads the last commit touching
 * each file. If git history is temporarily unavailable, fall back to current date.
 */
function lastModifiedFor(slug: string): Date {
  const iso = dates[slug];
  return iso ? new Date(iso) : new Date();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const docsPages = source.getPages().map((page) => {
    // page.url is "/docs" or "/docs/providers/s3"; the lastmod map is keyed by
    // the slug relative to content/docs.
    const slug = page.url.replace(/^\/docs\/?/, "");
    const isRootDocs = slug === "";

    return {
      url: absoluteUrl(page.url),
      lastModified: lastModifiedFor(slug),
      changeFrequency: isRootDocs ? ("daily" as const) : ("weekly" as const),
      priority: isRootDocs ? 0.9 : 0.8,
    };
  });

  return [
    {
      url: absoluteUrl("/"),
      lastModified: lastModifiedFor(""),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    ...docsPages,
  ];
}
