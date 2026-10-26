import { source } from "@/lib/source";
import { siteConfig, absoluteUrl } from "@/lib/site";
import lastmod from "@/lib/lastmod.json";

export const dynamic = "force-static";

const dates = lastmod as Record<string, string>;

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET(): Response {
  const pages = source.getPages();

  const itemsXml = pages
    .map((page) => {
      const slug = page.url.replace(/^\/docs\/?/, "");
      const dateStr = dates[slug];
      const pubDate = dateStr ? new Date(dateStr).toUTCString() : new Date().toUTCString();
      const title = escapeXml(page.data.title || "TorrentDrive Documentation");
      const description = escapeXml(page.data.description || siteConfig.description);
      const url = absoluteUrl(page.url);

      return `    <item>
      <title>${title}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${description}</description>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)} Documentation &amp; Updates</title>
    <link>${absoluteUrl("/")}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en-us</language>
    <atom:link href="${absoluteUrl("/feed.xml")}" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${itemsXml}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
    },
  });
}
