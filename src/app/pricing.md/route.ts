export const dynamic = "force-static";

export function GET(): Response {
  const content = `# Pricing — TorrentDrive

TorrentDrive is 100% Free and Open-Source Software (FOSS) licensed under the MIT License.
There are no subscriptions, no tiered paywalls, no bandwidth throttling, and no account quotas.

## Edition: Self-Hosted Community Edition
- **Price**: $0.00 / free forever
- **Billing**: None / $0.00
- **License**: MIT Open Source License
- **Deployment Targets**: Single Docker container (Linux, macOS, Windows WSL2), 1-click Dokploy, 1-click Coolify, Railway, Render
- **Torrent Quota**: Unlimited concurrent swarms, unlimited torrent downloads
- **Storage Quota**: Unlimited (bring your own Google Drive or S3-compatible cloud storage)
- **Supported Storage Providers**:
  - Google Drive (direct streaming via OAuth 2.0 user credentials)
  - Amazon AWS S3
  - Cloudflare R2 (zero egress fees)
  - Backblaze B2
  - Wasabi Cloud Storage
  - MinIO (self-hosted S3)
  - DigitalOcean Spaces
- **Speed Limits**: None imposed by TorrentDrive (governed only by your host server bandwidth and cloud provider upload quotas)
- **Features Included**:
  - Web-based setup wizard on initial launch (port 47100)
  - MSE/PE RC4 stream encryption (ISP-blind stealth BitTorrent engine)
  - Strict BEP 27 private tracker isolation (DHT, PEX, LPD automatically disabled for private swarms)
  - Live swarm health analysis (BEP 15 UDP and BEP 48 HTTP/HTTPS tracker scraper)
  - Selective batch file picking before download begins
  - Storage health probing with automatic multi-drive failover
  - Automatic staging volume disk purge upon successful cloud verification
  - Pre-provisioned Grafana & Prometheus telemetry dashboards
  - Checkpointed multipart resumable uploads (survives container restarts)
- **Hardware Requirements**: Minimum 2 GB RAM, 3 GB disk for Docker image, any modern 64-bit AMD64 or ARM64 CPU
- **Support**: Open community support via GitHub Discussions and GitHub Issues (https://github.com/TorrentDrive)
- **Source Code Repositories**:
  - Monorepo & Backend: https://github.com/TorrentDrive/backend
  - Frontend Web UI: https://github.com/TorrentDrive/frontend
  - Documentation & Website: https://github.com/TorrentDrive/website
  - Organization Profile: https://github.com/TorrentDrive
`;

  return new Response(content, {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
    },
  });
}
