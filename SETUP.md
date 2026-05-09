# Going live — DNS + GitHub Pages setup for helmguild.com

Step-by-step. Estimated time: **5 minutes hands-on** + 5 min – 1 h DNS propagation wait.

---

## Status of what's already done (by Pepe Arturo, 2026-05-09)

- ✅ Repo `helmut-hoffer-von-ankershoffen/helmguild.com` created on GitHub (public).
- ✅ Initial site committed: `index.html`, `style.css`, `CNAME`, `README.md`, this `SETUP.md`.
- ✅ GitHub Pages enabled — source `main` branch, root path.
- ✅ **Canonical custom domain = `www.helmguild.com`** (set via the `CNAME` file in the repo, updated 2026-05-09).

What's left = **DNS at domaindiscount24** + **enable HTTPS in GitHub** once DNS propagates.

---

## Why www-canonical (and what that means)

Apex (root) domains can't legally hold a `CNAME` record (RFC 1034 — apex must own the SOA/NS records, CNAME conflicts with that). So routing `helmguild.com` (apex) to GitHub Pages requires either four `A` records pointing at static IPs, or a non-standard `ALIAS`/`ANAME` record that some registrars expose.

Switching the canonical to `www.helmguild.com` makes the live site reachable via a single, clean **`CNAME www → helmut-hoffer-von-ankershoffen.github.io.`** record. Done. No A records strictly required.

The apex (`helmguild.com` typed bare) should still redirect to `www.helmguild.com` so people don't hit a 404 — see Step 2 below.

---

## Step 1 — point `www` at GitHub Pages

In domaindiscount24's DNS / zone editor for `helmguild.com`, add **one** record:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | `www` | `helmut-hoffer-von-ankershoffen.github.io.` | 3600 |

> The trailing dot at the end of the value is correct DNS form. domaindiscount24's UI may add it for you — don't worry if it doesn't appear in the saved record.

Save the zone. Propagation typically 5–60 minutes.

---

## Step 2 — handle the apex (`helmguild.com` without www) — pick ONE option

People will type `helmguild.com` without `www`. If you don't handle it, that resolves nowhere → 404. Three options, pick what's simplest:

### Option A (simplest) — registrar-side URL redirect

domaindiscount24 (and most registrars) have a feature called **"URL Forward"**, **"Web Forwarding"**, **"HTTP Redirect"**, or **"Domain Forwarding"** in the domain admin panel — separate from the DNS zone editor.

Configure: `helmguild.com` (apex) → permanent (301) redirect to `https://www.helmguild.com`. Keep "preserve path" or "forward with masking off" so the URL bar updates to www.

Result: typing `helmguild.com` lands on `https://www.helmguild.com`. No A records needed.

### Option B — `ALIAS` / `ANAME` record (if your DNS panel supports it)

Some registrars expose an `ALIAS` (or `ANAME`) record type that acts like an apex CNAME at zone-walk time. Not all do. If domaindiscount24's record-type dropdown offers it:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| ALIAS / ANAME | `@` (apex) | `helmut-hoffer-von-ankershoffen.github.io.` | 3600 |

Result: apex resolves at GitHub directly, GitHub auto-redirects apex → www (because the repo's CNAME file specifies `www`).

### Option C — four `A` records on apex (the bulletproof fallback)

Always works, even on dumb DNS panels. Add four A records on apex (`@` / blank host):

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | `@` | `185.199.108.153` | 3600 |
| A | `@` | `185.199.109.153` | 3600 |
| A | `@` | `185.199.110.153` | 3600 |
| A | `@` | `185.199.111.153` | 3600 |

Optional IPv6 (recommended for completeness):
| Type | Name | Value | TTL |
|------|------|-------|-----|
| AAAA | `@` | `2606:50c0:8000::153` | 3600 |
| AAAA | `@` | `2606:50c0:8001::153` | 3600 |
| AAAA | `@` | `2606:50c0:8002::153` | 3600 |
| AAAA | `@` | `2606:50c0:8003::153` | 3600 |

Result: apex resolves at GitHub, GitHub auto-redirects to `www.helmguild.com` (because the repo's CNAME file specifies www).

---

## Step 3 — verify DNS propagation

From a machine outside the registrar's network (your phone on cellular works well):

```bash
dig +short CNAME www.helmguild.com
# expected: helmut-hoffer-von-ankershoffen.github.io.
```

Or visit https://www.whatsmydns.net/#CNAME/www.helmguild.com — wait until most regions show GitHub.

Apex check (only if you used Option B or C):
```bash
dig +short A helmguild.com
# Option B: should resolve to GitHub IPs (server-side ALIAS flattening)
# Option C: explicit 4 GitHub IPs (or whichever subset is currently being served)
```

---

## Step 4 — enable HTTPS in GitHub Pages settings

Once DNS resolves to GitHub:

1. Open https://github.com/helmut-hoffer-von-ankershoffen/helmguild.com/settings/pages
2. Confirm "Custom domain" shows `www.helmguild.com` with a green "DNS check successful" (may take 15–30 min after DNS propagates).
3. Tick **Enforce HTTPS** — once GitHub has provisioned a Let's Encrypt certificate (usually within 1 hour of DNS being correct).

Site is live: https://www.helmguild.com

---

## Troubleshooting

- **"DNS check unsuccessful"** → DNS hasn't propagated, or the CNAME target has a typo. Re-verify with `dig`. Don't delete the custom-domain entry; just give it time.
- **`https://www.helmguild.com` shows certificate error** → GitHub is still provisioning the cert. 1-hour wait usually fixes it. After 6 hours of cert errors: in repo Pages settings, *remove* the custom domain → save → re-add → save. That kicks off a fresh cert request.
- **`helmguild.com` (without www) shows 404 or registrar parking page** → Step 2 isn't done. Pick Option A (URL redirect), B (ALIAS), or C (4 A records).
- **Email broken on `@helmguild.com`** → if you have MX records, those are independent of A/CNAME records and should still work. If MX wasn't there before, email never worked anyway.

---

## After it's live

Editing the site = `git push` to `main`. GitHub Pages rebuilds in ~30 seconds. No CI, no Jekyll, no Actions — pure static.

Voice and brand notes for future copy edits: see `Helmguild/helmguild.com.md` in your Obsidian vault.
