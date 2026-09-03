/**
 * One place for the values that describe this site.
 *
 * The canonical URL used to be hard-coded at nine separate call sites — the
 * root metadata, the landing page's canonical and JSON-LD, the docs page
 * canonical and OG image, robots.txt and sitemap.xml. Changing the domain meant
 * finding all nine, and missing one produced a canonical or a sitemap entry
 * pointing at the wrong host, which is the kind of mistake search engines act
 * on silently.
 *
 * NEXT_PUBLIC_SITE_URL lets a preview deployment describe itself correctly
 * rather than claiming to be production.
 */
export const siteConfig = {
  name: "TorrenClou",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://tc.gitnasr.com").replace(/\/$/, ""),
  tagline: "Torrent to Cloud, One Command Away",
  description:
    "Self-hosted torrent-to-cloud sync. Download torrents and auto-sync to Google Drive or S3. One Docker container, one command.",
  docsPath: "/docs",
  github: "https://github.com/TorrenClou",
  twitter: "@c0nasr",
  license: "MIT",
} as const;

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path = "/"): string {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
