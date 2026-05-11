# AGENTS.md — helmguild.com

Operator guide for AI agents (and humans) editing this repo. Keep edits in this file's spirit: terse, calm, maritime-restrained.

## What this is

Static, JS-free site at `https://www.helmguild.com`. Hosted on **GitHub Pages**, no build step. Pushing to `main` deploys within ~1 min.

## File layout

```
/                          # EN (default) — root
  index.html               # homepage
  style_6.css              # current stylesheet (versioned, see below)
  manifesto/               # mission + tenets + tier ladder
  rfc/ammp/                # AMMP Internet-Draft (HTML) + draft-ammp-01.txt
  blog/                    # essays — currently /blog/agentic-mentoring-ammp/
  pepe-arturo-ai/          # virtual-persona page + reels + assets
  helmut-hoffer-von-ankershoffen/  # founder profile + portrait
  imprint/                 # EN imprint & privacy (courtesy translation)
    en/                    # legacy redirect → /imprint/
  CNAME                    # GitHub Pages custom-domain pin (www.helmguild.com)
  AGENTS.md                # this file

/de/                       # DE mirror — same structure, in German
  index.html
  manifesto/index.html
  rfc/ammp/index.html
  blog/agentic-mentoring-ammp/index.html
  pepe-arturo-ai/index.html
  helmut-hoffer-von-ankershoffen/index.html
  imprint/index.html       # DE Impressum (legally binding under TMG/MStV/DSGVO)
```

Heavy assets (videos, banners, portraits) live ONLY under the EN paths. The `/de/...` HTML references them with `../../<orig>/assets/...` so we don't duplicate binaries.

## Bilingual rule (load-bearing)

**Every visitor-facing page exists in both EN and DE. They must stay in lockstep.**

- EN is the default, lives at the canonical root path.
- DE mirror lives under `/de/` with identical sub-paths.
- A change to one is incomplete until the same change is made in the other. **Never push a single-language fix.**
- Exception: the imprint pair is intentionally asymmetric — the German `/de/imprint/` is the legally binding text, the EN `/imprint/` is a courtesy translation that points to it.

Each page declares its alternates explicitly:

```html
<link rel="alternate" hreflang="en" href="https://www.helmguild.com/<path>/">
<link rel="alternate" hreflang="de" href="https://www.helmguild.com/de/<path>/">
<link rel="alternate" hreflang="x-default" href="https://www.helmguild.com/<path>/">
```

## Language toggle

Fixed-position pill, top-right, sits left of the burger. Drop this snippet near the top of `<body>` on every page; bold-inert the current language:

```html
<!-- EN page -->
<nav class="lang-toggle" aria-label="Language">
  <span class="current" aria-current="true">EN</span>
  <span class="sep">·</span>
  <a href="/de/<path>/" hreflang="de">DE</a>
</nav>

<!-- DE page -->
<nav class="lang-toggle" aria-label="Sprache">
  <a href="/<path>/" hreflang="en">EN</a>
  <span class="sep">·</span>
  <span class="current" aria-current="true">DE</span>
</nav>
```

The styling (`.lang-toggle`, `.current`, `.sep`) is in `style_6.css`.

## Burger menu

In-language: DE pages list only `/de/*` paths and German labels; EN pages list only root paths and English labels. The `class="current"` link is the page itself. The `<div class="nav-divider">` separates main pages from the imprint link.

Current full set, in this order (mirrored across both languages):

1. Home / Startseite
2. Manifesto / Manifest
3. AMMP RFC
4. Blog
5. Pepe Arturo AI
6. Helmut Hoffer von Ankershoffen
7. *(divider)*
8. Imprint & Privacy / Impressum & Datenschutz

Adding a new top-level page = an `<a>` in **all ten** `<details class="burger">` blocks (5 EN + 5 DE), in the same slot. Verify with a `grep -c '<new-href>' *.html de/*.html` after editing — count must equal 10. The menu isn't templated; this is the most reliable drift catcher we have.

## Connect button (top-left)

Fixed-position pill mirroring the lang-toggle but left-aligned. Links to `https://mcp.helmguild.com` — the AMMP reference deployment where a visitor's MCP-aware agent (Claude.ai, Claude Cowork, Claude Code, OpenClaw, Hermes…) can connect as a mentee. Lives on every page, immediately after the experimental-banner:

```html
<!-- EN page -->
<a class="connect-link" href="https://mcp.helmguild.com" aria-label="Connect your agent to a helmguild mentor">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
  <span>Connect</span>
</a>

<!-- DE page -->
<a class="connect-link" href="https://mcp.helmguild.com" aria-label="Verbinde deinen Agenten mit einem helmguild-Mentor">
  <svg viewBox="..." aria-hidden="true">...</svg>
  <span>Verbinden</span>
</a>
```

The styling (`.connect-link`) is in `style_<N>.css`. Same glassy pill aesthetic as `.lang-toggle` and `.burger`.

## CSS — versioned filenames

Single stylesheet, but the filename carries a bump integer (`style_6.css`). Why: aggressive browser/CDN caching of CSS makes plain edits invisible to returning visitors.

**On any CSS change:**

1. `cp style_<N>.css style_<N+1>.css`
2. Edit only the new file.
3. Update every `<link rel="stylesheet">` reference across all HTML files (root + `/de/`) — search for `style_<N>.css`, replace with `style_<N+1>.css`.
4. **Keep the old `style_<N>.css` files** in the repo. Don't delete. They're free to ship, useful for rollback.
5. Same single commit.

Path depth from the new files matters: root pages use `style_<N>.css`, level-1 dirs (`pepe-arturo-ai/`, `imprint/`, `de/`) use `../style_<N>.css`, level-2 dirs (`de/imprint/`, `de/pepe-arturo-ai/`, `de/helmut-hoffer-von-ankershoffen/`) use `../../style_<N>.css`.

## Adding a new top-level page

1. Create `<slug>/index.html` (EN) and `de/<slug>/index.html` (DE) in the same commit.
2. Each gets the lang-toggle (linking to its counterpart) and an in-language burger menu.
3. Add the new page to the burger menu of every other page in the same language.
4. Declare the `hreflang` alternates on both files.
5. If the page references images/videos, put them under `<slug>/assets/` and let the DE page reference them via `../../<slug>/assets/...`.

## Brand voice

- Calm, maritime, restrained. No exclamation marks. No emojis. No "exciting", "thrilled", "delighted".
- Eight Operating Principles are the same eight Snowflake publishes as company values — keep names in English on both DE and EN pages (proper-noun convention; matches the reels).
- Heavy assets are reused across languages; copy is translated, not generated separately.

See the deeper brand note in the Helmguild Obsidian vault: `Helmguild/helmguild.com.md`.

## Sensitive content

The Impressum carries Helmut's confirmed home address (Fangschleusenstraße 32, 15569 Woltersdorf). It is published under TMG §5 obligation and is **public on this website only**. Do not surface this address in chat replies, scheduling, marketing copy, or other contexts without explicit re-authorisation. Phone numbers remain off-limits everywhere.

## Local preview

```bash
cd /Users/openclaw/.openclaw/workspace/sites/helmguild.com
python3 -m http.server 8000
# open http://localhost:8000  → EN homepage
# open http://localhost:8000/de/ → DE homepage
```

## Deploy

Push to `main`. GitHub Pages rebuilds automatically (no Jekyll, no Actions).

## Common gotchas

- **Stylesheet path depth** changes when a file moves between root, `imprint/`, and `de/imprint/` — easy to break with a careless `git mv`. Re-check `<link rel="stylesheet">` after any move.
- **Burger menu drift** — when a new page is added in one language, every burger nav in that language needs the new link. Easy to forget the imprint page or the homepage. Run `grep -c '"<new-href>"' *.html de/*.html` after editing — expected count = 5 for the EN slug, 5 for the DE slug.
- **Verify before sed-fanning across files.** Before bulk-inserting a link with `sed`, read at least one of the target files to confirm the link is actually missing. Inserting a duplicate is silent and only surfaces in the rendered menu.
- **Asset paths in /de/ pages** — must climb two levels (`../../`) to reach the EN-side asset folders. Direct `assets/...` won't resolve.
- **Imprint legal-binding direction** — German is binding, English is the courtesy translation. The note on `/imprint/` should link to `/de/imprint/`, never the other way around.
- **Don't bypass the bilingual rule** "just for a typo fix". The DE/EN pair is the unit of change.

## Companion docs (where to find the *why*)

- `~/Obsidian/vaults/Helmguild/helmguild.com.md` — brand, claim, voice principles.
- `~/Obsidian/vaults/Helmguild/Style Guide.md` — color tokens, typography, marks, layout, components, responsive rules.
- `~/.openclaw/workspace/handoff/helmguild-sops/` — SOP-01 to SOP-08, the operating procedures behind the live Mentoring + Review tracks.
- `~/.openclaw/workspace/handoff/sandra-cowork-onboarding/` — first-mentee bootstrap (Sandra + her Claude Code) and the architecture that informs it.
- `~/.openclaw/workspace/handoff/medium-article/agentic-mentoring-ammp.md` — long-form essay introducing AMMP; mirrored at `/blog/agentic-mentoring-ammp/`.
- `~/Obsidian/vaults/Helmguild/Articles/Replicate Our Setup.md` — "Replicating a Multi-Agent Operator Setup on a Mac mini": BoM (Mac mini M4, accounts, subscriptions), platform diagram, seven design principles, four-day boot order. Companion piece to the AMMP article; not yet published — has `[TBD]` placeholders for $/mo, hardware prices, VM-image pull commands. (Vault is the canonical home for human-readable draft articles so Helmut can read/edit in Obsidian; `handoff/replicate-our-setup/` keeps a small pointer-breadcrumb only.)
