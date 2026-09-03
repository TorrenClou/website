# Vendored fonts

`inter-latin-variable.woff2` — Inter, latin subset, variable weight 100–900.
Used by `src/app/layout.tsx` via `next/font/local`.

Vendored rather than pulled with `next/font/google`, which fetches from Google
Fonts **during `next build`**. That makes the build depend on a third party
being reachable and fast; the sibling frontend repo's arm64 image build failed
outright with `ETIMEDOUT` on exactly that call.

Downloaded from the URL in
`https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap`.

## Not to be confused with `public/fonts/`

`public/fonts/inter-{400,700,800}.woff` are a separate copy used only by the OG
image route. They cannot be replaced by the woff2 here: Satori, which renders
those images, reads TTF, OTF and WOFF but **not** WOFF2.

## License

Inter is licensed under the SIL Open Font License 1.1 — see `OFL.txt`.
Copyright (c) 2016 The Inter Project Authors (https://github.com/rsms/inter).
