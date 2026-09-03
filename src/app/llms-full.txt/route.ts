import { buildLlmsFullTxt } from "@/lib/llms";

export const dynamic = "force-static";

export async function GET(): Promise<Response> {
  return new Response(await buildLlmsFullTxt(), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
