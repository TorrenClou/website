import type { MetadataRoute } from "next";

import lastmod from "@/lib/lastmod.json";
import { source } from "@/lib/source";
import { absoluteUrl } from "@/lib/site";

const dates = lastmod as Record<string, string>;

/**
 * Dates come from `scripts/lastmod.mjs`, which reads the last commit touching
 * each file. When git history is unavailable the map is empty and the entry
 * simply carries no lastModified — previously every page was stamped with the
 * build time, which told crawlers the entire site changed on every deploy.
 */
function lastModifiedFor(slug: string): Date | undefined {
  const iso = dates[slug];
  return iso ? new Date(iso) : undefined;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const docsPages = source.getPages().map((page) => {
    // page.url is "/docs" or "/docs/providers/s3"; the lastmod map is keyed by
    // the slug relative to content/docs.
    const slug = page.url.replace(/^\/docs\/?/, "");
    return {
      url: absoluteUrl(page.url),
      lastModified: lastModifiedFor(slug),
      changeFrequency: "weekly" as const,
      priority: slug === "" ? 0.9 : 0.7,
    };
  });

  return [
    {
      url: absoluteUrl("/"),
      lastModified: lastModifiedFor(""),
      changeFrequency: "monthly" as const,
      priority: 1.0,
    },
    ...docsPages,
  ];
}
