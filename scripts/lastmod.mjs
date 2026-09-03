// Records the last git commit date for each docs file, for the sitemap.
//
// Without this every sitemap entry claims to have changed on every build, which
// is worse than saying nothing: it tells crawlers the whole site changed when
// almost none of it did. If git history is unavailable (a shallow CI clone, a
// downloaded tarball), we emit an empty map and the sitemap omits lastModified
// rather than inventing one.
import { execFileSync } from "node:child_process";
import { readdirSync, statSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";

const DOCS = "content/docs";
const OUT = "src/lib/lastmod.json";

function walk(dir) {
  const found = [];
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) found.push(...walk(path));
    else if (entry.endsWith(".mdx")) found.push(path);
  }
  return found;
}

/** content/docs/providers/s3.mdx -> "providers/s3"; index.mdx -> "" */
function toSlug(file) {
  return file
    .split("\\")
    .join("/")
    .replace(`${DOCS}/`, "")
    .replace(/\.mdx$/, "")
    .replace(/(^|\/)index$/, "");
}

const files = walk(DOCS);
const map = {};

for (const file of files) {
  try {
    const iso = execFileSync("git", ["log", "-1", "--format=%cI", "--", file], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (iso) map[toSlug(file)] = iso;
  } catch {
    // No git, a shallow clone, or the file is not committed yet. Skip it.
  }
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, `${JSON.stringify(map, null, 2)}\n`);

const dated = Object.keys(map).length;
console.log(`[lastmod] dated ${dated} of ${files.length} docs pages from git history`);
if (dated === 0 && files.length > 0) {
  console.log("[lastmod] no git dates available; sitemap will omit lastModified");
}
