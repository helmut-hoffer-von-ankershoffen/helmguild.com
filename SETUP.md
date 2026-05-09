# Going live — DNS + GitHub Pages setup for helmguild.com

Step-by-step. Estimated time: **15 minutes hands-on** + 30 min – 24 h DNS propagation wait.

---

## Status of what's already done (by Pepe Arturo, 2026-05-09)

- ✅ Repo `helmut-hoffer-von-ankershoffen/helmguild.com` created on GitHub (public).
- ✅ Initial commit pushed to `main` with `index.html`, `style.css`, `CNAME` (= `helmguild.com`), `README.md`, this `SETUP.md`.
- ✅ GitHub Pages enabled, source `main` branch, root path.
- ✅ Custom domain set in repo Settings → Pages: `helmguild.com`.

What's left = **DNS at domaindiscount24** + **enable HTTPS in GitHub** once DNS propagates.

---

## Step 1 — point DNS at GitHub Pages (do this at domaindiscount24)

Log in to your domaindiscount24 account → open the domain admin for `helmguild.com` → find the DNS / nameserver / zone editor section. Configure these records:

### Required: 4 A records on the apex (`@`)

These tell the world that `helmguild.com` itself resolves to GitHub's Pages servers.

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | `@` (apex / root / blank) | `185.199.108.153` | 3600 |
| A | `@` | `185.199.109.153` | 3600 |
| A | `@` | `185.199.110.153` | 3600 |
| A | `@` | `185.199.111.153` | 3600 |

> **If domaindiscount24's UI uses an empty hostname instead of `@`** to mean "the apex", that's fine — same thing. Some panels label it "root" or just leave the host field blank.

> **Optional but recommended — IPv6 (AAAA) records**:
> ```
> AAAA  @  2606:50c0:8000::153
> AAAA  @  2606:50c0:8001::153
> AAAA  @  2606:50c0:8002::153
> AAAA  @  2606:50c0:8003::153
> ```
> GitHub Pages serves IPv6; adding AAAA makes the site reachable on dual-stack networks.

### Recommended: CNAME for `www` subdomain

So `www.helmguild.com` redirects to the apex automatically (via GitHub).

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | `www` | `helmut-hoffer-von-ankershoffen.github.io.` | 3600 |

> The trailing dot at the end of the value (`...github.io.`) is correct DNS form. domaindiscount24's UI may add it for you — don't worry if it doesn't appear in the saved record.

### Remove conflicting records

If domaindiscount24 set up any default `A`, `AAAA`, `CNAME`, or `MX` records on the apex pointing at their parking page or default mail, **delete those** (except keep `MX` if you actually want email — but parking-page `A` records will break the GitHub Pages routing). Specifically:

- Delete any `A @` records that are NOT one of the 4 GitHub IPs above.
- Delete any `CNAME @` records (apex CNAMEs are invalid anyway).

Save the zone. domaindiscount24 typically applies changes within 1–5 minutes.

---

## Step 2 — verify DNS propagation

From a machine **outside** the registrar's network (your phone on cellular works well — or any non-Mac terminal):

```bash
dig +short A helmguild.com
# expected: 4 lines with the GitHub IPs above
```

Or visit https://www.whatsmydns.net/#A/helmguild.com — wait until most regions show GitHub's IPs.

Typical propagation: **5 minutes – 1 hour**. Worst case 24h.

---

## Step 3 — enable HTTPS in GitHub Pages settings

Once DNS resolves to GitHub:

1. Go to https://github.com/helmut-hoffer-von-ankershoffen/helmguild.com/settings/pages
2. Under "Custom domain", confirm `helmguild.com` is listed and the green "DNS check successful" appears (may take 15-30 min after DNS goes live).
3. Tick **Enforce HTTPS** — once GitHub has provisioned a Let's Encrypt certificate (usually within 1 hour of DNS being correct).

Site is live: https://helmguild.com

---

## Troubleshooting

- **"DNS check unsuccessful"** in GitHub Pages settings → DNS hasn't propagated yet, or one of the 4 A records is wrong. Wait, then re-check via `dig`. Don't delete the custom-domain entry; just give it time.
- **`http://helmguild.com` works but `https://helmguild.com` shows certificate error** → GitHub is still provisioning the cert. 1-hour wait usually fixes it. After 6 hours of cert errors: in repo Pages settings, *remove* the custom domain → save → re-add → save. That kicks off a fresh cert request.
- **`www.helmguild.com` doesn't redirect** → check the CNAME for `www` is exactly `helmut-hoffer-von-ankershoffen.github.io.` (with the trailing dot if your registrar requires it).
- **Email broken on @helmguild.com** → if you set up MX records, those are independent of A records and should still work. If MX wasn't there before, email never worked anyway.

---

## After it's live

Editing the site = `git push` to `main`. GitHub Pages rebuilds in ~30 seconds. No CI, no Jekyll, no Actions — pure static.

Voice and brand notes for future copy edits: see `Helmguild/helmguild.com.md` in your Obsidian vault.
