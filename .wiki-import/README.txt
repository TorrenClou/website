TEMPORARY STAGING — delete this whole directory in Wave 2.

Source material for the docs consolidation. Nothing here is published.

  *.md            The 9 pages from TorrenClou/deploy PR #1's wiki/ directory,
                  which we are NOT shipping as a GitHub wiki. They get rewritten
                  into content/docs/ instead.

  deploy-docs/    The three pages from deploy/docs/ on main, plus BLOG.md.
                  TECHNICAL.md and Architecture.md overlap heavily — merge them.
                  BLOG.md becomes a website blog post, not a docs page.

Known factual errors to fix during the rewrite, not to carry over:
  - TECHNICAL.md documents Postgres on 47300 and Redis on 47400.
    They are actually 5432 and 6379 (config/supervisord.conf:9,18).
  - TECHNICAL.md claims the databases are not exposed outside the container.
    run.sh published both. The zero-env installer no longer does.
  - USAGE.md tells you to rebuild with --build-arg NEXT_PUBLIC_BACKEND_URL,
    which the frontend Dockerfile says is no longer needed.
  - Everything describing a .env file or <CHANGE_ME> values is obsolete:
    the container generates its own secrets on first boot.
