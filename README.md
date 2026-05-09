# helmguild.com

The public website for [Helmguild Inc.](https://helmguild.com) — Helmut Hoffer von Ankershoffen's mentoring business.

Static site, hosted on **GitHub Pages** at the apex domain `helmguild.com`. No build step — `index.html` + `style.css` + `CNAME` are served as-is.

## Files

- `index.html` — the page itself.
- `style_<N>.css` — minimal, professional, maritime-restrained styling. Versioned for cache-busting (see below).
- `CNAME` — tells GitHub Pages to serve at the `www.helmguild.com` custom domain.

## Cache-busting convention

Browsers and CDNs cache CSS aggressively. To force every visitor to pull the latest stylesheet on every change, the CSS file is **versioned in its filename** (not via query string):

- Current: `style_2.css`
- Next change: copy/rename to `style_3.css`, edit the new file, update the `<link href>` in `index.html` to match. **Keep the old versions** in the repo — don't delete them.

In short: every CSS edit = bump the integer + new file + relink. Same single commit. Old versions stay alongside the new one — no link points to them, but they're available for review / rollback / diff.

## Local preview

```bash
cd helmguild.com
python3 -m http.server 8000
# open http://localhost:8000
```

## Editing

Edit `index.html` and `style.css` directly. Push to `main`. GitHub Pages rebuilds automatically (no Jekyll, no Actions).

## Voice / brand foundation

See the brand foundation note in the Helmguild Obsidian vault (`Helmguild/helmguild.com.md`) — claim, voice principles, tier ladder, "what helmguild.com is NOT". Apply when copy-editing.

## Going live

DNS configuration steps for the `helmguild.com` apex domain (registered at domaindiscount24) are in [`SETUP.md`](./SETUP.md).
