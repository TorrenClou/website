import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/install.sh",
        destination:
          "https://raw.githubusercontent.com/TorrentDrive/backend/main/install.sh",
        permanent: false,
      },
      {
        source: "/install.ps1",
        destination:
          "https://raw.githubusercontent.com/TorrentDrive/backend/main/install.ps1",
        permanent: false,
      },
      {
        source: "/docker-compose.yml",
        destination:
          "https://raw.githubusercontent.com/TorrentDrive/backend/main/docker-compose.yml",
        permanent: false,
      },
    ];
  },
};

export default withMDX(nextConfig);
