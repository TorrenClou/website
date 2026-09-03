# Canonical snippets

Four strings that genuinely have to appear verbatim in more than one place — the
install commands, the image name, and the one-line product description. Every
other fact lives in exactly one page under `content/docs` and is linked to, not
repeated.

These files are the source of truth. They are **checked, not injected**: CI
fails if a file that should contain one of these strings has drifted, and a
nightly job in the `.github` repo raises an issue when another repository's
README drifts.

Injection was considered and rejected. It needs a bot with write access to four
repositories, it conflicts with every hand-edited README, and it produces commit
noise indistinguishable from real work — all to keep four short strings in sync.

## Why not an MDX component

Rendering these through a `<Snippet>` component would cost the syntax
highlighting and copy button Fumadocs gives a normal fenced code block, on the
most-copied commands on the site. Plain code fences plus a check gives the same
guarantee and a better page.

## The whitelist is closed at four

If you find yourself wanting to add a fifth, that is usually a sign the fact
belongs on one documentation page that other pages link to.
