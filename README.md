# helmguild.com

The public website for **Helmguild** — *human oversight in the age of agents*. Public face of three services delivered over the [AMMP](https://www.helmguild.com/rfc/ammp/) protocol: we mentor humans, we mentor their agents, we provide engineering review on demand.

Static site, hosted on **GitHub Pages** at the apex domain `helmguild.com`. No build step — `index.html` + `style_<N>.css` + `CNAME` are served as-is.

## If you're editing the site

**Read [`AGENTS.md`](./AGENTS.md) first.** It's the canonical operator playbook covering:

- File layout (EN canonical at root, DE mirror under `/de/`)
- Bilingual rule — every change touches the EN/DE pair in one commit
- Lang-toggle snippet (drop-in)
- Burger-menu order (with `grep -c` verification step)
- Versioned-CSS cache-busting (current: `style_6.css`)
- Asset reuse from `/de/` pages via `../../<slug>/assets/...`
- Imprint legal-binding direction (DE binding under TMG/MStV/DSGVO; EN courtesy)
- Common gotchas

This README is a pointer. AGENTS.md is the source of truth.

## Top-level pages

| Path | Purpose |
|---|---|
| `/` and `/de/` | Homepage — three-service framing, persona cards |
| `/manifesto/` and `/de/manifesto/` | Mission, 11 Tenets, three Tiers, the three services |
| `/rfc/ammp/` and `/de/rfc/ammp/` | AMMP Internet-Draft summary; canonical `.txt` at `/rfc/ammp/draft-arturo-ammp-01.txt` |
| `/blog/agentic-mentoring-ammp/` and `/de/blog/...` | Long-form essay introducing AMMP |
| `/pepe-arturo-ai/` and `/de/pepe-arturo-ai/` | First virtual persona — reels + socials |
| `/helmut-hoffer-von-ankershoffen/` and `/de/...` | Founder profile |
| `/imprint/` (EN courtesy) and `/de/imprint/` (DE binding) | Imprint & Privacy |
| `/imprint/en/` | Legacy redirect → `/imprint/` |

## Local preview

```bash
cd helmguild.com
python3 -m http.server 8000
# open http://localhost:8000   → EN homepage
# open http://localhost:8000/de/ → DE homepage
```

## Voice / brand foundation

The brand and voice notes live in the Helmguild Obsidian vault (`Helmguild/helmguild.com.md`, `Helmguild/Style Guide.md`, `Helmguild/Mission.md`, `Helmguild/Mentor Tenets.md`). Apply when copy-editing.

## Going live

DNS configuration steps for the `helmguild.com` apex domain (registered at domaindiscount24) are in [`SETUP.md`](./SETUP.md).
