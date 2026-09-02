import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import type { OgImageType } from "@/types";

export const runtime = "edge";

async function loadFont(
  request: NextRequest,
  weight: 400 | 700 | 800
): Promise<ArrayBuffer> {
  // Fonts are in /public/fonts/ — fetch via the same origin so it works in
  // both dev (localhost) and production (tc.gitnasr.com)
  const { origin } = new URL(request.url);
  return fetch(`${origin}/fonts/inter-${weight}.woff`).then((r) =>
    r.arrayBuffer()
  );
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title") ?? "TorrenClou";
  const description =
    searchParams.get("description") ??
    "You're One Command Away from Having Your Torrent to Your Cloud";
  const type = (searchParams.get("type") as OgImageType) ?? "landing";

  const [fontRegular, fontBold, fontExtraBold] = await Promise.all([
    loadFont(request, 400),
    loadFont(request, 700),
    loadFont(request, 800),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#0d1117",
          padding: "60px 80px",
          fontFamily: "Inter",
          position: "relative",
        }}
      >
        {/* Subtle radial glow */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -80,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(18,135,117,0.18) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background:
              "linear-gradient(90deg, #128775 0%, #3c9483 60%, transparent 100%)",
            display: "flex",
          }}
        />

        {/* Logo row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "36px",
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: "linear-gradient(135deg, #128775 0%, #3c9483 100%)",
              marginRight: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
            }}
          >
            ☁
          </div>
          <span style={{ fontSize: 24, fontWeight: 700, color: "#ffffff" }}>
            TorrenClou
          </span>
          {type === "docs" && (
            <span
              style={{
                marginLeft: 14,
                fontSize: 13,
                fontWeight: 600,
                color: "#3c9483",
                border: "1px solid #3c9483",
                borderRadius: 6,
                padding: "3px 10px",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                display: "flex",
              }}
            >
              Docs
            </span>
          )}
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: type === "docs" ? 54 : 56,
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.15,
            maxWidth: 920,
            letterSpacing: "-0.02em",
            display: "flex",
          }}
        >
          {title}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 22,
            fontWeight: 400,
            color: "#8b949e",
            marginTop: 22,
            maxWidth: 800,
            lineHeight: 1.55,
            display: "flex",
          }}
        >
          {description}
        </div>

        {/* Bottom row */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            left: 80,
            right: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: "#3c9483" }}>
              Self-hosted
            </span>
            <span style={{ color: "#30363d", fontSize: 18 }}>•</span>
            <span style={{ fontSize: 15, fontWeight: 600, color: "#3c9483" }}>
              Open Source
            </span>
            <span style={{ color: "#30363d", fontSize: 18 }}>•</span>
            <span style={{ fontSize: 15, fontWeight: 600, color: "#3c9483" }}>
              Free Forever
            </span>
          </div>
          <span style={{ fontSize: 14, color: "#484f58", fontWeight: 400 }}>
            tc.gitnasr.com
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Inter", data: fontRegular, weight: 400, style: "normal" },
        { name: "Inter", data: fontBold, weight: 700, style: "normal" },
        { name: "Inter", data: fontExtraBold, weight: 800, style: "normal" },
      ],
    }
  );
}
