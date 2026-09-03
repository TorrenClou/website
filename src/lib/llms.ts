import { existsSync, readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

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

/**
 * The slugs of every page, in the order meta.json puts them in the sidebar.
 *
 * source.getPages() returns them alphabetically, which for a reader starting at
 * the top means Architecture before Overview. An assistant consuming llms.txt
 * reads top to bottom, so it should get the same order a person browsing the
 * sidebar would.
 */
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
        if (!sub.startsWith("---")) order.push(`${entry}/${sub}`);
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
    "TorrenClou downloads torrents on your own server and uploads them to Google Drive",
    "or S3-compatible storage, then deletes the local copy. It ships as a single Docker",
    "container that generates its own secrets and is configured entirely in the browser —",
    "there is no configuration file to edit and no environment variable that must be set.",
    "",
    "Install with one command:",
    "",
    "```bash",
    "curl -fsSL https://raw.githubusercontent.com/TorrenClou/deploy/main/install.sh | bash",
    "```",
    "",
    "## Docs",
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
    `- [Source on GitHub](${siteConfig.github}): backend, frontend, deploy and website repositories`,
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
      body = stripFrontmatter(await readFile(join(DOCS_DIR, entry.file), "utf8"));
    } catch {
      // A page listed by the loader with no readable file on disk. Skip it
      // rather than emitting a heading with nothing under it.
      continue;
    }
    parts.push(`# ${entry.title}`, "", `Source: ${entry.url}`, "", body, "", "---", "");
  }

  return parts.join("\n");
}
