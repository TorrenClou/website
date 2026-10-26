# TorrentDrive Website

<p align="center">
  <strong>The Marketing Website, Fumadocs Documentation &amp; AI-SEO Knowledge Engine for TorrentDrive</strong>
</p>

<p align="center">
  <a href="https://github.com/TorrentDrive/website/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="License: MIT" /></a>
  <a href="https://tc.gitnasr.com"><img src="https://img.shields.io/badge/Live-tc.gitnasr.com-00DC82?style=flat-square" alt="Live Site" /></a>
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js&logoColor=white" alt="Next.js 16" /></a>
  <a href="https://fumadocs.dev"><img src="https://img.shields.io/badge/Fumadocs-MDX-8b5cf6?style=flat-square" alt="Fumadocs" /></a>
  <a href="https://llmstxt.org/"><img src="https://img.shields.io/badge/LLM-llms.txt%20%2B%20Full-FF5722?style=flat-square" alt="llms.txt ready" /></a>
</p>

---

The marketing site and **canonical documentation portal** for [TorrentDrive](https://tc.gitnasr.com) — an open-source, self-hosted torrent-to-Google Drive and S3 cloud downloader.

Live at **[tc.gitnasr.com](https://tc.gitnasr.com)**.

---

## 🌟 SEO & Agent-Readiness Features

- **100% Next.js App Router Metadata**: `metadataBase`, strict canonical URLs, OpenGraph dynamic images (`/api/og`), Twitter cards, and responsive Viewport exports.
- **Rich JSON-LD Structured Data**: Interconnected `@graph` combining `SoftwareApplication`, `Organization`, `WebSite`, `HowTo`, `TechArticle`, `BreadcrumbList`, and `FAQPage`.
- **Machine-Readable AI Context**: Prerendered [`/llms.txt`](https://tc.gitnasr.com/llms.txt), [`/llms-full.txt`](https://tc.gitnasr.com/llms-full.txt), and [`/pricing.md`](https://tc.gitnasr.com/pricing.md) for direct consumption by autonomous agents and LLMs.
- **Fast Search Indexing**: Automated [`/sitemap.xml`](https://tc.gitnasr.com/sitemap.xml), [`/feed.xml`](https://tc.gitnasr.com/feed.xml) RSS feed, and `/api/indexnow` integration for instant search engine submission.
- **Search & AI Bot Access**: Comprehensive `robots.txt` configuration explicitly allowing Googlebot, Bingbot, `OAI-SearchBot`, `PerplexityBot`, `Claude-SearchBot`, `Applebot`, and other discovery crawlers.

---

## Docs live here, and only here

Every fact about installing, configuring or operating TorrentDrive belongs in `content/docs/`. The READMEs in [backend](https://github.com/TorrentDrive/backend) and [frontend](https://github.com/TorrentDrive/frontend) link here rather than restating anything.

If you are about to write a configuration table, a port list or an install walkthrough into another repo's README: write it here instead and link to it.

---

## Layout

```
content/docs/          The documentation. MDX, one file per page.
  meta.json            Sidebar order and section labels.
src/app/               Landing page, docs routes, sitemap, robots, OG images, feeds.
src/components/        Landing sections, comparison matrix, and shared UI.
snippets/              Short strings that must appear verbatim in other repos'
                       READMEs — the install commands, the image name.
```

Built with [Fumadocs](https://fumadocs.dev) on Next.js 16. Pages are statically generated from `content/docs`; `src/lib/source.ts` is the loader.

---

## Developing

```bash
git clone https://github.com/TorrentDrive/website.git
cd website
npm install
npm run dev
```

Open `http://localhost:3000`.

### Adding a documentation page

1. Create `content/docs/<name>.mdx` with `title` and `description` frontmatter.
2. Add its slug to `content/docs/meta.json` where you want it in the sidebar.

That is the whole process — the route, the sidebar entry, the sitemap entry, the RSS item, and the OG image all follow automatically from those two steps.

---

## Repositories

| Repository | Contents |
|------------|----------|
| [backend](https://github.com/TorrentDrive/backend) | .NET 9 API, workers, unified all-in-one container, compose manifests, PaaS blueprints, and installers |
| [frontend](https://github.com/TorrentDrive/frontend) | Next.js web app |
| [website](https://github.com/TorrentDrive/website) | Documentation site — the canonical docs live here |

---

## License

MIT — see [LICENSE](https://github.com/TorrentDrive/website/blob/main/LICENSE).
