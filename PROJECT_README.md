# Big Oak Consulting — Website Build Notes

Status as of 2026-08-30. This file is project notes for whoever works on this next (including a future session) — it's not part of the deployed site.

## What's here

- `site/` — the actual deployable website. Plain hand-coded HTML/CSS/JS, no build step, no framework. Ready to deploy to Netlify as-is.
- `extracted/` — the original Claude Design handoff (`.dc.html` spec + README + design tokens) this site was built from. Kept for reference; not deployed.
- `serve.ps1` + `.claude/launch.json` — a tiny local static file server (PowerShell `HttpListener`, since this machine has no Node/Python installed) used to preview the site during the build.

## Pages built (10)

Home, Services, Training Catalog, Team, Clients, Resources, Credentials, Field Notes (index), FAQ, Contact — all linked from a shared header/footer, matching the design system (oak/olive palette, Barlow/Barlow Condensed, square-corner "blueprint" cards).

**Cut from the original 11-view design** (per decisions made 2026-08-30): the **Client Sign-in** page — there's no real auth/portal. "Client Access" links in the header/footer currently route to Contact instead. Revisit as a separate project if/when a real client portal is wanted.

## What's real vs. what's still placeholder

Search the `site/` files for `PLACEHOLDER` (in HTML comments) to find every spot that needs real content before this goes live publicly. In order of importance:

1. **Compliance-sensitive — do not skip:** [credentials.html](site/credentials.html) has invented OSHA authorization numbers and insurance limits. These must be replaced with verified figures from real certificates before launch — misstating either carries real liability. Same caution applies to the "OSHA-authorized outreach trainer · Fully insured" line in every page footer.
2. Real contact info (phone, email, office address, hours) — currently placeholder throughout, especially [contact.html](site/contact.html) and the homepage hero.
3. Real team members, bios, credentials, and portraits — [team.html](site/team.html) currently has six invented people.
4. Real client names/logos, or confirm the anonymized-by-type pattern is fine to keep — [clients.html](site/clients.html).
5. Real testimonials (with permission to attribute) — homepage.
6. The 6 downloadable resource files (PDFs/DOCX) — [resources.html](site/resources.html) links currently go nowhere (`href="#"`).
7. Field Notes blog posts — index page exists with 5 placeholder titles linking nowhere; no post template/pages exist yet. You said you'd provide real posts — once you do, I'll build individual post pages and wire up `rss.xml`.
8. FAQ answers — copied from the design as-is; a couple make commitments (response time, fee credit, inspection attendance) worth double-checking before publishing.
9. Favicon/social-share image — currently just reusing the full logo PNG as the favicon; fine for now, a proper small favicon would be nicer.

## How to preview locally

```bash
powershell -NoProfile -ExecutionPolicy Bypass -File serve.ps1
```
Then open `http://localhost:8791/`. Stop with Ctrl+C.

## Deployment plan (agreed 2026-08-30)

- **Host:** Netlify (free tier is plenty for this site). Chosen over Vercel/Cloudflare Pages because Netlify Forms handles the Contact form natively with zero backend code.
- **Domain:** keep it registered at GoDaddy; just repoint its DNS to Netlify once the site is live there. (GoDaddy's account dashboard flagged this session's automated browser as suspicious — that login/DNS step needs to happen in a normal browser, not automation.)
- **Contact form:** already wired for Netlify Forms (`data-netlify="true"` + honeypot field in `contact.html`; `script.js` submits via fetch for the inline success state). This will start working automatically once deployed to Netlify — no extra setup needed beyond deploying.
- **Deploying:** needs your own Netlify account (account creation isn't something I can do on your behalf). Easiest path once you have one: drag-and-drop the `site/` folder onto Netlify's dashboard, or connect a git repo with `site/` as the publish directory. Happy to walk through either, in your own browser session.

## Possible phase-2 work (not started)

- LinkedIn cross-posting: publish Field Notes via `rss.xml` (already stubbed) → Zapier/Make.com "New RSS item → Post to LinkedIn Company Page" automation, once real blog posts exist.
- A real client portal (login + document/roster access), if ever wanted — bigger scope than this static site.
