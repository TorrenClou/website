# TorrenClou Website

The marketing site and — more importantly — **the canonical documentation** for
[TorrenClou](https://tc.gitnasr.com), self-hosted torrent-to-cloud.

Live at **[tc.gitnasr.com](https://tc.gitnasr.com)**.

## Docs live here, and only here

Every fact about installing, configuring or operating TorrenClou belongs in
`content/docs/`. The READMEs in
[backend](https://github.com/TorrenClou/backend),
[frontend](https://github.com/TorrenClou/frontend) and
[deploy](https://github.com/TorrenClou/deploy) link here rather than restating
anything, because for a long time they each kept their own copy and the copies
disagreed with each other and with the code.

If you are about to write a configuration table, a port list or an install
walkthrough into another repo's README: write it here instead and link to it.

## Layout

```
content/docs/          The documentation. MDX, one file per page.
  meta.json            Sidebar order and section labels.
src/app/               Landing page, docs routes, sitemap, robots, OG images.
src/components/        Landing sections and shared UI.
snippets/              Short strings that must appear verbatim in other repos'
                       READMEs — the install commands, the image name.
```

Built with [Fumadocs](https://fumadocs.dev) on Next.js. Pages are statically
generated from `content/docs`; `src/lib/source.ts` is the loader.

## Developing

```bash
git clone https://github.com/TorrenClou/website.git
cd website
npm install
npm run dev
```

Open `http://localhost:3000`.

### Adding a documentation page

1. Create `content/docs/<name>.mdx` with `title` and `description` frontmatter.
2. Add its slug to `content/docs/meta.json` where you want it in the sidebar.

That is the whole process — the route, the sidebar entry, the sitemap entry and
the OG image all follow from those two steps.

## Repositories

| Repository | Contents |
|------------|----------|
| [backend](https://github.com/TorrenClou/backend) | .NET 9 API and workers |
| [frontend](https://github.com/TorrenClou/frontend) | Next.js web app |
| [deploy](https://github.com/TorrenClou/deploy) | All-in-one image, installer, CI |

## License

MIT — see [LICENSE](https://github.com/TorrenClou/website/blob/main/LICENSE).
