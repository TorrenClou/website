import type { MetadataRoute } from "next";
import { source } from "@/lib/source";

const BASE_URL = "https://tc.gitnasr.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const docsPages = source.getPages().map((page) => ({
    url: `${BASE_URL}${page.url}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/docs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...docsPages,
  ];
}
