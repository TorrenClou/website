import { NextResponse } from "next/server";
import { source } from "@/lib/source";
import { siteConfig, absoluteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

/**
 * Instant Indexing via IndexNow protocol (supported by Microsoft Bing, Yandex, Seznam, Naver).
 * When invoked (e.g. on deployment or CI/CD), it immediately submits all site URLs to search engines.
 */
export async function POST(): Promise<NextResponse> {
  const host = new URL(siteConfig.url).host;
  const key = "torrentdrive-indexnow-key";
  const keyLocation = absoluteUrl("/torrentdrive-indexnow-key.txt");

  const urls = [
    absoluteUrl("/"),
    ...source.getPages().map((page) => absoluteUrl(page.url)),
  ];

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host,
        key,
        keyLocation,
        urlList: urls,
      }),
    });

    return NextResponse.json({
      status: res.status,
      ok: res.ok,
      message: res.ok
        ? `Successfully submitted ${urls.length} URLs to IndexNow search engine cluster.`
        : `IndexNow responded with status ${res.status}`,
      urlsSubmitted: urls.length,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Failed to ping IndexNow",
      },
      { status: 500 }
    );
  }
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    protocol: "IndexNow",
    host: new URL(siteConfig.url).host,
    keyLocation: absoluteUrl("/torrentdrive-indexnow-key.txt"),
    instructions: "Send a POST request to this endpoint to submit all site pages to IndexNow for immediate crawl.",
  });
}
