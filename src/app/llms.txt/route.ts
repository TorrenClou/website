import { buildLlmsTxt } from "@/lib/llms";

// Prerendered at build time and served as a static file.
export const dynamic = "force-static";

export function GET(): Response {
  return new Response(buildLlmsTxt(), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
