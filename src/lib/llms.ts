import { existsSync, readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import schema from "@/../content/generated/config-schema.json";
import { source } from "@/lib/source";
import { siteConfig, absoluteUrl } from "@/lib/site";

const DOCS_DIR = join(process.cwd(), "content", "docs");

/** Strips the YAML frontmatter block from a raw MDX file. */
function stripFrontmatter(raw: string): string {
  const fence = "---";
  if (!raw.startsWith(fence)) return raw.trim();
  const end = raw.indexOf(`\n${fence}`, fence.length);
  if (end === -1) return raw.trim();
  return raw.slice(end + fence.length + 1).trim();
}

interface ConfigEntry {
  envName: string;
  description: string;
  default: string;
  secret: boolean;
  required: boolean;
  deprecated?: string;
}

const configSchema = schema as { productVersion: string; entries: ConfigEntry[] };

const NEWLINE = String.fromCharCode(10);

function expandComponents(body: string): string {
  const table = (filter: string): string => {
    const rows = configSchema.entries.filter((entry) => {
      const deprecated = Boolean(entry.deprecated);
      if (filter === "required") return entry.required && !deprecated;
      if (filter === "optional") return !entry.required && !deprecated;
      if (filter === "deprecated") return deprecated;
      return true;
    });

    if (rows.length === 0) return "_None._";

    const lines = [
      "| Variable | Default | What it does |",
      "|---|---|---|",
      ...rows.map((entry) => {
        const flags = [
          entry.required ? "**required**" : "",
          entry.secret ? "**secret**" : "",
        ]
          .filter(Boolean)
          .join(" ");
        const name = flags ? `\`${entry.envName}\` ${flags}` : `\`${entry.envName}\``;
        const description = entry.deprecated
          ? `${entry.description} ${entry.deprecated}`
          : entry.description;
        return `| ${name} | ${entry.default || "unset"} | ${description} |`;
      }),
    ];
    return lines.join(NEWLINE);
  };

  return body
    .replace(/<ConfigTable\s+filter="([a-z]+)"\s*\/>/g, (_m, filter: string) => table(filter))
    .replace(/<ConfigTable\s*\/>/g, () => table("all"))
    .replace(
      /<ConfigSchemaVersion\s*\/>/g,
      `Generated from TorrentDrive ${configSchema.productVersion}, describing ${configSchema.entries.length} configuration values.`,
    );
}

/** "/docs/providers/s3" -> "providers/s3.mdx"; "/docs" -> "index.mdx" */
function fileForUrl(url: string): string {
  const slug = url.replace(/^\/docs\/?/, "");
  return slug === "" ? "index.mdx" : `${slug}.mdx`;
}

export interface DocEntry {
  title: string;
  description: string;
  url: string;
  file: string;
  slug: string;
}

function navOrder(): string[] {
  const order: string[] = [];
  const rootMeta = join(DOCS_DIR, "meta.json");
  if (!existsSync(rootMeta)) return order;

  const root = JSON.parse(readFileSync(rootMeta, "utf8")) as { pages?: string[] };
  for (const entry of root.pages ?? []) {
    if (entry.startsWith("---")) continue;

    const childMeta = join(DOCS_DIR, entry, "meta.json");
    if (existsSync(childMeta)) {
      const child = JSON.parse(readFileSync(childMeta, "utf8")) as { pages?: string[] };
      for (const sub of child.pages ?? []) {
        if (sub.startsWith("---")) continue;
        order.push(sub === "index" ? entry : `${entry}/${sub}`);
      }
    } else {
      order.push(entry === "index" ? "" : entry);
    }
  }
  return order;
}

export function docEntries(): DocEntry[] {
  const order = navOrder();
  const rank = (slug: string) => {
    const i = order.indexOf(slug);
    return i === -1 ? Number.MAX_SAFE_INTEGER : i;
  };

  return source
    .getPages()
    .map((page) => ({
      title: page.data.title,
      description: page.data.description ?? "",
      url: absoluteUrl(page.url),
      file: fileForUrl(page.url),
      slug: page.url.replace(/^\/docs\/?/, ""),
    }))
    .sort((a, b) => rank(a.slug) - rank(b.slug) || a.title.localeCompare(b.title))
    .map(({ slug, ...entry }) => ({ ...entry, slug }));
}

/**
 * The llms.txt index: what this project is, and where every page lives.
 * Format follows the llmstxt.org convention — H1, a blockquote summary, then
 * link lists an assistant can follow.
 */
export function buildLlmsTxt(): string {
  const entries = docEntries();
  const lines: string[] = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    "TorrentDrive is an open-source, self-hosted torrent-to-Google Drive and S3 cloud downloader.",
    "It runs on your remote VPS, Dokploy, or Coolify server so your home ISP never sees BitTorrent",
    "peer connections or tracker announces. It enforces MSE/PE RC4 stream encryption, strict BEP 27",
    "private-tracker isolation, selective batch file picking, and automatic storage failover across",
    "Google Drive and S3-compatible providers (AWS S3, Cloudflare R2, Backblaze B2, Wasabi, MinIO).",
    "",
    "## Key Facts & Architecture",
    "",
    "- **Category**: Self-Hosted Cloud Torrent Downloader / ISP-Blind Seedbox to Google Drive & S3",
    "- **Stack**: .NET 9 (ASP.NET Core API, Hangfire Orchestrator, MonoTorrent Engine, Google Drive & S3 Workers), Next.js App Router UI, PostgreSQL 15, Redis 7, Prometheus & Grafana",
    "- **Default Web Port**: `47100` (same-origin API proxy; internal admin ports `47200`, `47500`, `47600` bind to `127.0.0.1`)",
    "- **Container Image**: `ghcr.io/torrentdrive/torrentdrive:latest`",
    "- **License**: MIT",
    "",
    "## Install in One Command",
    "",
    "Linux / macOS:",
    "```bash",
    "curl -fsSL https://raw.githubusercontent.com/TorrentDrive/backend/main/install.sh | bash",
    "```",
    "",
    "Docker Compose (Zero `.env` Required):",
    "```bash",
    "curl -fsSL https://raw.githubusercontent.com/TorrentDrive/backend/main/docker-compose.yml -o docker-compose.yml && docker compose up -d",
    "```",
    "",
    "Windows PowerShell:",
    "```powershell",
    "irm https://raw.githubusercontent.com/TorrentDrive/backend/main/install.ps1 | iex",
    "```",
    "",
    "## Documentation",
    "",
  ];

  for (const entry of entries) {
    const suffix = entry.description ? `: ${entry.description}` : "";
    lines.push(`- [${entry.title}](${entry.url})${suffix}`);
  }

  lines.push(
    "",
    "## Optional",
    "",
    `- [Full documentation as one file](${absoluteUrl("/llms-full.txt")}): every page above, concatenated`,
    `- [Source on GitHub](${siteConfig.github}): backend, frontend and website repositories`,
    "",
  );

  return lines.join("\n");
}

/** Every documentation page concatenated, for pasting into a model context. */
export async function buildLlmsFullTxt(): Promise<string> {
  const entries = docEntries();
  const parts: string[] = [
    `# ${siteConfig.name} documentation`,
    "",
    `> ${siteConfig.description}`,
    "",
    `Every page from ${absoluteUrl(siteConfig.docsPath)}, concatenated.`,
    "",
    "---",
    "",
  ];

  for (const entry of entries) {
    let body: string;
    try {
      body = expandComponents(stripFrontmatter(await readFile(join(DOCS_DIR, entry.file), "utf8")));
    } catch {
      continue;
    }
    parts.push(`# ${entry.title}`, "", `Source: ${entry.url}`, "", body, "", "---", "");
  }

  return parts.join("\n");
}
