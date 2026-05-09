# helmguild.com

The public website for [Helmguild Inc.](https://helmguild.com) — Helmut Hoffer von Ankershoffen's mentoring business.

Static site, hosted on **GitHub Pages** at the apex domain `helmguild.com`. No build step — `index.html` + `style.css` + `CNAME` are served as-is.

## Files

- `index.html` — the page itself.
- `style_<N>.css` — minimal, professional, maritime-restrained styling. Versioned for cache-busting (see below).
- `CNAME` — tells GitHub Pages to serve at the `www.helmguild.com` custom domain.

## Cache-busting convention

Browsers and CDNs cache CSS aggressively. To force every visitor to pull the latest stylesheet on every change, the CSS file is **versioned in its filename** (not via query string):

- Current: `style_1.css`
- Next change: rename to `style_2.css`, update the `<link href>` in `index.html` to match, delete the previous version.

In short: every CSS edit = bump the integer + rename + relink + delete previous. Same single commit. Never edit `style_<N>.css` in place across deploys; always cut a new file.

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
