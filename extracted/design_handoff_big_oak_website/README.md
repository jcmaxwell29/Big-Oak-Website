# Handoff: Big Oak Consulting Marketing Website

## Overview
A multi-page marketing website for **Big Oak Consulting**, a safety consulting firm specializing in OSHA training, EHS support, and safety document development (manuals, written programs, procedures) for utilities, natural gas, telecom, government/municipal, energized work, heavy civil, renewables, and general industry clients. Primary audience: small contractors needing compliance help.

The design ships eleven views behind a single top nav: Home, Services, Training Catalog, Team, Clients, Resources, Credentials, Field Notes (blog index), FAQ, Contact (with form), and Client Sign-in.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing intended look and behavior, **not production code to copy directly**.

`Big Oak Consulting.dc.html` is authored in a proprietary HTML component format (custom `<sc-for>` / `<sc-if>` template tags plus a JS logic class). Do not try to run or port that runtime. Read it as a **spec**: markup structure, inline styles, and the data arrays in the logic class are the source of truth for layout, copy, and content.

The task is to **recreate these designs in the target codebase's existing environment** (Next.js/React, Astro, Vue, WordPress, etc.) using its established patterns, routing, and component library. If no environment exists yet, choose the most appropriate stack — for a marketing site of this shape, a static-first framework (Next.js App Router or Astro) with file-based routes per page is the natural fit.

## Fidelity
**High-fidelity.** Colors, typography, spacing, borders, and copy are final-intent. Recreate pixel-faithfully. Two caveats:
- The design system underneath (see *Design System* below) is a "wireframe/blueprint" style bound to this project. Its stylesheet supplies tokens and base component classes; the page overrides its palette to an oak/olive earth tone.
- Content marked below as **placeholder** must be replaced with real data before launch.

## Design System
The page loads a bound design system called **Industry** (namespace `Industry_indust`) from `_ds/industry-5749ed63-89af-4f73-b02a-0255f5db9a7a/styles.css`, included in this bundle.

Its character, which the site follows: light technical ground, **Barlow Condensed** headings over **Barlow** body, square corners everywhere (no rounded cards), hairline-bordered "line drawing" cards rather than filled surfaces, a modular grid with strong horizontal rhythm, and exactly one solid-filled object per view (the primary button).

Classes consumed from it: `.btn` / `.btn-primary` / `.btn-secondary` / `.btn-ghost`, `.tag` / `.tag-accent` / `.tag-outline`, `.field` + `label` + `.input`, `.card` / `.card-kicker`, `.table`, `.blueprint`.

**Two deliberate deviations from the stock system**, both must be preserved:
1. The palette is retoned from steel blue to warm oak/olive (see tokens).
2. The blueprint corner registration marks (`+` crosshairs) are **suppressed** (`.blueprint > .corner { display: none }`) and frames are thickened to 2px in a deep olive. Markup still contains `<i class="corner tl|tr|bl|br">` children — they are inert. When rebuilding, you may simply omit those `<i>` elements.

## Design Tokens

### Color
Declared as CSS custom properties on `:root`, overriding the design system's defaults.

| Token | Value | Role |
| --- | --- | --- |
| `--color-bg` | `#f1ede4` | Warm paper ground (page background) |
| `--color-surface` | `#e8e3d7` | Slightly darker fill (image placeholders) |
| `--color-text` | `#2a2a1d` | Body and heading text |
| `--color-accent` | `#6f7a42` | Base olive accent |
| `--color-accent-2` | `#7a6a45` | Bark/brown secondary (rarely used) |
| `--color-divider` | `color-mix(in srgb, #2a2a1d 16%, transparent)` | Hairline rules |

Accent ramp (olive):

| Step | Hex |
| --- | --- |
| 100 | `#e9ebda` |
| 200 | `#d6dbbb` |
| 300 | `#c0c89c` |
| 400 | `#a4ae7c` |
| 500 | `#88925d` |
| 600 | `#6f7a42` |
| 700 | `#5a6335` |
| 800 | `#454b28` |
| 900 | `#2f331b` |

Accent-2 ramp (bark): 100 `#ece7da`, 200 `#dcd3bd`, 300 `#c8bb9d`, 400 `#b0a07d`, 500 `#96855f`, 600 `#7a6a45`, 700 `#635538`, 800 `#4b402a`, 900 `#33291c`.

**Border green:** `#3f4a2c` — a deep olive/forest used for every information frame. Applied as:
```css
.blueprint, .card      { border: 2px solid #3f4a2c; }
.blueprint             { box-shadow: inset 0 0 0 1px color-mix(in srgb, #3f4a2c 16%, transparent); }
.blueprint > .corner   { display: none; }
.table th              { border-bottom: 2px solid #3f4a2c; }
.table td              { border-bottom-color: color-mix(in srgb, #3f4a2c 28%, transparent); }
.input                 { border: 2px solid color-mix(in srgb, #3f4a2c 70%, transparent); }
.input:hover           { border-color: #3f4a2c; }
```

**Link colors** (must be defined explicitly; do not inherit browser blue):
```css
a        { color: var(--color-accent-700); text-decoration: none; }
a:hover  { color: var(--color-accent-900); }
```

**Focus:** `*:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }`

**Dark fields:** `--color-accent-900` (`#2f331b`) carries two full-bleed dark bands — the homepage "Industries served" section and the site footer — with text reversed to `#f2efe6` / `#eae6da` and `--color-accent-300` for kickers and hover.

### Typography
- `--font-heading`: **Barlow Condensed** (from design system)
- `--font-body`: **Barlow** (from design system)

Heading scale as used (all Barlow Condensed):

| Use | Size | Line-height | Notes |
| --- | --- | --- | --- |
| Home h1 | 68px | 0.98 | `letter-spacing: -0.01em`, `text-wrap: balance` |
| Interior page h1 | 56px | 1.0 | Contact h1 is 52px, sign-in h1 38px |
| Dark-band h2 | 40px | 1.02 | |
| Section h2 | 34–36px | default | |
| Services row h2 | 32px | 1.05 | |
| Course group h2 | 30px | default | |
| Blog post title | 27px | 1.1 | |
| Card / person / resource title | 23–24px | 1.1 | |
| FAQ question | 23px | default | button-as-heading |
| Testimonial quote | 21px | 1.28 | heading font used at body scale |
| Stat number | 38px | 1.0 | accent-700 |
| Footer brand | 22px | — | `letter-spacing: 0.06em`, uppercase |

Body (Barlow):

| Use | Size | Line-height |
| --- | --- | --- |
| Hero lede | 18px | 1.6 |
| Page lede | 17–18px | 1.6 |
| Body / list item | 15–16px | 1.4–1.6 |
| Card body | 15px | 1.55 |
| Meta / caption | 13–14px | 1.4 |

**Eyebrow / kicker pattern** (used above every page h1):
```css
font-family: var(--font-heading);
font-size: 12px;            /* 11px in tighter contexts */
letter-spacing: 0.26em;     /* 0.18–0.24em variants */
text-transform: uppercase;
color: var(--color-accent-700);
```

**Nav / button label pattern:**
```css
font-family: var(--font-heading);
font-size: 13–14px;
letter-spacing: 0.1em;
text-transform: uppercase;
```

Long-form paragraphs use `text-wrap: pretty`; large display headings use `text-wrap: balance`. Muted body text is `color-mix(in srgb, var(--color-text) 75–82%, transparent)`.

### Spacing & layout
- Content container: `max-width: 1180px`, `margin: 0 auto`, `padding: 0 28px`.
- Main bottom padding: 96px.
- Page header block: `padding: 76px 0 44px`.
- Home hero: `padding: 88px 0 64px`, bottom hairline divider.
- Section vertical rhythm: 56–72px.
- Grid gaps: 26–28px (cards), 36–64px (two-column splits), 8–18px (form fields, chips).
- **No border radius anywhere** — square corners are the system.
- Layout is flex/grid with `gap` throughout; no margin-based spacing between siblings.

### Elevation
No drop shadows except the 1px inset hairline on `.blueprint`. Depth comes from line weight, not shadow.

## Global Chrome

### Background watermark
The full Big Oak logo lockup (tree + "BIG OAK CONSULTING" wordmark) sits fixed and centered behind all content:
```css
position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%);
width: 64vw; max-width: 900px;
opacity: 0.055;
filter: grayscale(1) contrast(1.1);
pointer-events: none; z-index: 0;
```
Asset: `assets/big-oak-logo.png` (2100×1500). It is toggleable via a `showWatermark` flag (default on). Content sits at `z-index: 1`; header at `z-index: 20`.

Also included, unused in the current design: `assets/oak-canopy.png` (canopy-only crop) and `assets/oak-tree.png` (tree + roots, wordmark removed) — earlier watermark explorations, kept in case a tree-only mark is wanted.

### Header (sticky)
`position: sticky; top: 0`, background `color-mix(in srgb, #f1ede4 92%, transparent)` with `backdrop-filter: blur(6px)`, 1px bottom divider, inner `padding: 14px 28px`.

Left: logo image at `height: 42px` + a two-line stacked wordmark — "BIG OAK" at 19px/600/`letter-spacing:0.04em` uppercase, "CONSULTING" beneath at 11px/`letter-spacing:0.22em` in accent-700.

Center: eight nav links, `gap: 22px` — Home, Services, Training, Team, Clients, Resources, Insights, Contact. Active item is accent-700 with a 1px bottom border in accent-700; inactive is `--color-text` with a transparent bottom border (so nothing shifts). Hover → accent-700.

Right: **Client Login** primary button, accent-700 fill, `#f6f3ec` text, `padding: 8px 16px`.

Note: "Credentials" and "FAQ" are reachable from the footer and from in-page CTAs, not from the top nav.

### Footer
Full-bleed `--color-accent-900` band, `padding: 56px 28px 34px`, text `#eae6da`. Four columns (`1.4fr 1fr 1fr 1fr`, `gap: 44px`): brand blurb, then Services / Company / More link columns. Column headings use the 11px/`0.2em` uppercase kicker in accent-300. Bottom bar separated by a 1px `color-mix(#eae6da 20%)` rule: copyright left, "OSHA-authorized outreach trainer · Fully insured · Placeholder contact details" right.

Footer link map:
- **Services** → OSHA training (training page), EHS support, Document development, Assessments (all → services page)
- **Company** → Our team, Clients, Credentials, Field notes
- **More** → Resources, FAQ, Contact, Client login

## Screens / Views

### 1. Home
**Purpose:** Establish credibility and route to a proposal request, an assessment, or a phone call.

**Layout:** Five stacked sections in the 1180px container, plus one full-bleed dark band.

**1a. Hero** — grid `1.15fr 0.85fr`, `gap: 56px`, `align-items: end`.
- Left: eyebrow "Safety Consulting · OSHA Training · EHS Programs"; h1 (68px) "Safety that holds up in the field, not just in the binder."; lede (18px, max 52ch) "We help small contractors and crews in utilities, natural gas, telecom and energized work build safety programs they can actually run — written plainly, trained in person, and sized to the way you already work."; three CTAs in a flex row (`gap: 12px`): **Request a proposal** (primary → Contact), **See what we do** (secondary → Services), **(555) 014-2200** (ghost, `tel:` link).
- Right: blueprint panel, "BY THE NUMBERS" kicker, four stat rows each with a 38px accent-700 figure (`min-width: 104px`) and a 14px label, separated by 1px top rules:
  - **30 yrs** — Consulting on utility, gas and telecom jobsites
  - **6,400+** — Workers trained and carded
  - **35** — Courses in the catalog, all deliverable on site
  - **CSP · CHST** — Credentialed practitioners on every engagement

**1b. "Where we help"** — h2 with an "All services →" link right-aligned on the baseline; three blueprint cards (`repeat(3, 1fr)`, `gap: 26px`), each numbered 01/02/03 in an accent-700 kicker with a 24px title and 15px body:
- **01 OSHA Training** — "Outreach 10 and 30, plus the competent-person and refresher courses your contracts require — taught in your yard, in plain language."
- **02 EHS Support** — "Fractional safety management: audits, incident investigation, recordkeeping, inspection support and the reporting your clients ask for."
- **03 Document Development** — "Safety manuals, written programs, JSAs and procedures built from how your crews actually work — not a template with your logo dropped in."

**1c. "Industries served"** (dark band, `--color-accent-900`, `padding: 56px 34px`) — grid `0.9fr 1.1fr`, `gap: 48px`. Left: accent-300 kicker + 40px h2 "We speak the trade before we speak the standard." Right: two-column list, each row `justify-content: space-between` with a 1px `color-mix(#f2efe6 18%)` bottom rule — name left, accent-300 12px tag right:
Electric utilities (T&D · substation), Natural gas (distribution · OQ), Telecom (OSP · aerial), Energized work (NFPA 70E), Government & municipal (public works), Heavy civil (excavation), Renewables (solar · storage), General industry (1910).

**1d. Testimonials** — three blueprint panels, `gap: 26px`. Quote set in the **heading** font at 21px/1.28; attribution 13px muted, pushed to the bottom with `margin-top: auto`. All three are **placeholder** and unattributed by name:
- "They rewrote our manual in three weeks and it finally sounds like us. Our guys read it." — Operations Manager, Gas distribution contractor, 40 employees
- "Showed up the morning of the inspection and knew our site better than we did." — Owner, Telecom OSP contractor
- "First trainer our linemen didn't tune out. He'd done the work." — Safety Coordinator, Municipal electric utility

**1e. Closing CTA** — blueprint panel, `padding: 44px 36px`, flex row space-between with wrap. h2 "Not sure where your gaps are?" + "A site assessment takes half a day and ends with a written punch list — no obligation after it." and a **Schedule an assessment** primary button → Contact.

### 2. Services
Eyebrow "SERVICES"; h1 "Four things, done thoroughly."; lede "We stay narrow on purpose. Every engagement starts with a walk of the work and ends with something your crew can use on Monday."

Then four rows, each grid `88px 1fr 1fr` with `gap: 36px` and `padding: 38px 0`, divided by 1px rules top and bottom. Column 1: 14px accent-700 number. Column 2: 32px h2 + 16px body (max 44ch). Column 3: bulleted deliverables, each an 11px-padded row with a 1px hairline bottom rule and an accent-700 `+` in place of a bullet.

1. **OSHA Training** — "Authorized outreach training plus the trade-specific courses your prequalification packets keep asking for. On site, on your shift schedule." → OSHA 10 & 30 (Construction and General Industry); NFPA 70E electrical safety; Confined space entry & rescue awareness; Excavation competent person; Fall protection competent person; Refresher and annual retraining
2. **EHS Support** — "Ongoing safety management without a full-time hire. We work as your safety department at whatever cadence the work needs." → Mock OSHA audits & gap analysis; Incident investigation and root cause; OSHA 300 log and recordkeeping review; Inspection representation & abatement; Contractor prequalification portals; Monthly toolbox talks and site walks
3. **Document Development** — "Written programs that survive an inspection and still make sense to a first-year apprentice." → Safety & health manuals; Written programs (LOTO, HazCom, respiratory); Job safety analyses and task procedures; Emergency action & site-specific plans; Arc flash and energized work procedures; Forms, permits and inspection checklists
4. **Assessments** — "A structured look at where you actually stand, ending in a written punch list ranked by exposure — not by how easy it is to sell." → Half-day site assessment; Program document review; Training matrix build-out; Insurance and EMR improvement planning

Footer of the page: **Request a proposal** (primary) + **Browse the course catalog** (secondary).

### 3. Training Catalog
**Purpose:** Show the full course list and let a visitor narrow by group.

**Header:** grid `1.1fr 0.9fr`, `gap: 48px`. Left: eyebrow "TRAINING CATALOG"; h1 "Courses taught by people who did the work."; lede "Thirty-five courses across heavy equipment, traffic control, OSHA outreach and worker safety programs — all deliverable at your facility. Call for current scheduling and pricing." Right: blueprint filter panel, "FILTER BY TRACK" kicker, chip buttons wrapped at `gap: 8px`.

**Filter chips:** All · Heavy Equipment · MOT & Vehicle (FDOT) · OSHA Training · Special Worker Safety Programs. Selected chip = accent-700 fill, `#f6f3ec` text, accent-700 border. Unselected = transparent fill, `--color-text`, `--color-divider` border. "All" shows every group; any other selection shows only that group.

**Course groups:** each group has a header row — 30px h2, a flex-filling 2px `#3f4a2c` rule at 50% opacity, and a right-aligned accent-700 "N courses" count — then a two-column list (`repeat(2, 1fr)`, `gap: 0 40px`). Each course row: zero-padded index (`01`, `02`…) in accent-700 heading font, then the name at 16px/1.4, with a 1px `color-mix(#3f4a2c 28%)` bottom rule. Groups separated by `gap: 44px`. Note the numbering restarts per group and reflows per column pair.

**⚠ This is real client data — do not substitute.** Prices, hour counts, and spreadsheet headers were deliberately excluded; only course names appear.

**Heavy Equipment (8)**
1. Backhoe Operator Safety Awareness
2. Front Loader Operator Safety Awareness
3. Skid Steer Operator Safety Awareness
4. Forklift Operator Safety Awareness
5. Crane Truck Operator Safety Awareness
6. Vac-Truck Operator Safety Awareness
7. Aerial & Scissor Lift for the Competent Person
8. Mowers and Other Landscaping Equipment

**MOT & Vehicle (FDOT) (4)**
1. FDOT (MOT) Intermediate Course
2. FDOT (MOT) Advanced Course
3. FDOT (MOT) Refresher — Advanced / Intermediate
4. FDOT (MOT) Flagger

**OSHA Training (5)**
1. 10-Hour Construction OSHA Certification Course
2. 30-Hour Construction OSHA Certification Course
3. OSHA 10 — ET&D (Electrical Transmission & Distribution)
4. OSHA 20 — ET&D (Electrical Transmission & Distribution)
5. OSHA 300 & 300A Log Training

**Special Worker Safety Programs (18)**
1. Confined Space Entry
2. Excavating Safety (Competent Person)
3. Fall Protection, Ladder Safety, PPE, Bloodborne Pathogens
4. NFPA 70E Electrical Safety Training
5. Lock-out / Tag-out, Electrical Safety, Arc Flash, Chemical Hazards
6. Machine Guarding, Electrical Safety, Arc Flash, Chemical Hazards
7. Hazardous Materials, Heat Stress, PPE, Crystalline Silica
8. Welding, Cutting & Brazing, Heat Stress, PPE, Ergonomics
9. Crane Safety & Gantry Crane Safety Awareness
10. Scaffolding
11. Tree Work Safety (Trimming, Felling, Limbing, Bucking, Chainsaws, Wood Chippers)
12. Respirator Training and Fit Testing (Quantitative)
13. Defensive Driving Course
14. Hurricane Preparedness — Preparing for Storms and Recovery
15. Office Safety, Emergency Evacuation, Ergonomics & Fire Extinguisher
16. Reasonable Suspicion Training for Supervisors
17. Crisis Management Training
18. CPR & First Aid

Verify the exact group ordering and any late additions against the logic class in the bundled `.dc.html`, which is authoritative.

### 4. Team
Eyebrow "WHO WE ARE"; h1 "Small firm. Long resumes."; lede "Everyone here came out of the field — line work, gas distribution, outside plant, plant EHS. You get the same person from the first walkthrough through the last card issued."

Grid `repeat(3, 1fr)`, `gap: 28px`. Each person: a `4/5` aspect-ratio blueprint frame filled `--color-surface` containing a centered 12px uppercase "PORTRAIT" label (**image placeholder — real portraits needed**; note the design system's `.duotone` treatment is intentionally *not* applied to placeholders, but **should** be applied to real photographs), then name (24px), role (13px uppercase accent-700 heading font), 15px bio, and credential tags (`.tag.tag-outline`).

**All six people are placeholder** — invented names, roles, bios and credentials. Replace entirely:
- Ray Whitlock — Principal Consultant — CSP, OSHA 500
- Dana Kessler — EHS Director — CHST, ASP
- Marcus Ford — Lead Trainer — OSHA 502, CPR/AED Instr.
- Priya Raman — Documentation Lead — ASP, Tech. Writing
- Tom Alvarez — Senior Consultant — CHST
- Nicole Barrett — Client Programs — STSC

Closes with a blueprint bar: "Credentials, OSHA authorizations and insurance certificates are listed in full on our credentials sheet." + **View credentials** secondary button.

### 5. Clients
Eyebrow "CLIENTS"; h1 "Who we work with."; lede acknowledging placeholders.

**Logo wall:** `repeat(4, 1fr)` grid with `gap: 1px` on a `--color-divider` background and a 1px outer border, producing hairline cell separators. Twelve 112px cells, each centered 15px uppercase "CLIENT LOGO" text. **All placeholder** — swap for real client logos or remove.

**"Recent engagements" table** (`.table`): columns Client type / Scope / Sector / Status. Client type in heading font at 17px; status as `.tag.tag-accent` (accent-100 background, accent-800 text). Six rows, **all placeholder** — anonymized by client *type* rather than name, which is a defensible pattern to keep if real names can't be published:
- Gas distribution contractor — Full safety manual rewrite + OQ training matrix — Natural gas — Current
- Municipal electric utility — NFPA 70E program and arc flash procedures — Utilities — Current
- OSP telecom contractor — OSHA 10/30 for 60 field staff — Telecom — Current
- County public works — Confined space program and rescue plan — Government — Complete
- Heavy civil contractor — Mock OSHA audit and abatement support — Heavy civil — Complete
- Solar EPC — Site-specific safety plans, 4 project sites — Renewables — Complete

### 6. Resources
Eyebrow "RESOURCES"; h1 "Take these with you."; lede "Templates and checklists we hand out on site. Free, no form wall. Clients get the editable versions in the portal."

Grid `repeat(2, 1fr)`, `gap: 26px`. Each blueprint card: a kicker/meta row (kind left in accent-700, format+length right in muted 12px), 23px title, 15px body, and a "Download →" link. **Download targets are unimplemented** — wire to real files.
- Checklist · PDF · 2 pp — **Pre-inspection walkthrough** — "The same list we walk when we arrive on site. Run it yourself before we do."
- Template · DOCX · editable — **Job safety analysis form** — "A one-page JSA that a foreman will actually fill out at the tailboard."
- Guide · PDF · 6 pp — **Training matrix starter** — "Which courses each role needs, with renewal intervals, for utility and telecom crews."
- Checklist · PDF · 1 p — **Excavation daily inspection** — "Competent-person daily log sized to fit on a clipboard."
- Guide · PDF · 4 pp — **What to do in the first hour** — "Incident response sequence: scene, care, notification, evidence, reporting clock."
- Reference · PDF · 2 pp — **NFPA 70E boundary quick card** — "Approach boundaries and PPE categories in a format that fits a hard hat liner."

### 7. Credentials
Eyebrow "CREDENTIALS"; h1 "Authorizations and credentials."; lede "Everything a prequalification packet asks for, in one place. Certificates and W-9 available on request."

Two columns, `gap: 48px`, each a 26px h2 over a list of space-between rows (name left, accent-700 13px reference right) with 1px hairline rules.

**Authorizations** — OSHA Outreach Construction (500/502) · Authorized; OSHA Outreach General Industry (501) · Authorized; General liability & professional liability · $2M / $1M; Workers compensation · In force; ISNetworld / Avetta registered · On request.

**Individual certifications** — Certified Safety Professional · CSP; Construction Health & Safety Technician · CHST; Associate Safety Professional · ASP; Safety Trained Supervisor Construction · STSC; CPR / AED / First Aid Instructor · AHA.

**⚠ Compliance-sensitive placeholder.** Insurance limits, authorization numbers and registration status are invented and **must be verified against real certificates before publishing** — misstating OSHA authorization or insurance coverage carries real liability.

Closes with a blueprint bar: "Need us added to ISNetworld, Avetta or a client-specific portal? Send the invitation and we'll handle the paperwork." + **Send an invitation** → Contact.

### 8. Field Notes (blog index)
Eyebrow "FIELD NOTES"; h1 "What we're seeing on jobsites."; lede "Short pieces on rule changes, citations we see repeat, and how to fix them without buying anything."

A list of full-width rows, each an `<a>` laid out `150px 1fr 140px` with `gap: 32px` and `padding: 28px 0`, divided by 1px rules, hover `background: color-mix(in srgb, #2a2a1d 3%, transparent)`. Left: date (13px uppercase muted). Middle: 27px title + 15px dek (max 62ch). Right: topic, right-aligned, accent-700 12px uppercase.

**All five posts are placeholder and link nowhere** — no article template exists. Either write the posts and add a detail route, or cut this page from v1:
- Aug 2026 · Recordkeeping — "The 300 log mistake we find on almost every audit"
- Jul 2026 · Energized work — "Your arc flash labels are probably out of date"
- Jun 2026 · Excavation — "Competent person is a role, not a certificate"
- May 2026 · Training — "Why annual refreshers stop working after year three"
- Apr 2026 · Programs — "A safety manual nobody reads is a liability, not a defense"

### 9. FAQ
Eyebrow "FAQ"; h1 "Questions we get every week."; a `max-width: 900px` accordion.

Each item: a full-width borderless `<button>` (`padding: 22px 0`, `gap: 24px`, left-aligned, heading font 23px) whose first child is an accent-700 marker — `+` when closed, `—` when open — followed by the question. The answer paragraph sits at `margin: 0 0 24px 42px`, 16px/1.6, max 64ch. 1px rule under every item.

**Behavior:** single-open accordion. Index 0 is open on load; clicking the open item closes it (state → −1). Copy for all seven Q&As is in the bundled file's `faqData` array. Answers are plausible but **owner-review required** — several make commitments (response times, credit-back on the assessment fee, inspection attendance).

### 10. Contact
Grid `0.85fr 1.15fr`, `gap: 64px`, `align-items: start`.

**Left:** eyebrow "CONTACT"; h1 (52px) "Tell us about the work."; lede "We answer every inquiry within one business day. If it's urgent — an inspection, an incident, a shutdown — call and someone picks up."; then four label/value rows with 1px top rules — label in the 11px uppercase muted kicker, value at 17px. **All placeholder:**
- Phone — (555) 014-2200
- Email — hello@bigoakconsulting.com
- Office — 1420 Ridge Road, Suite 3 — placeholder address
- Hours — Mon–Fri 7:00–17:00 · after-hours line for incidents

**Right:** blueprint panel, `padding: 36px 34px`, containing a two-column form grid (`gap: 18px`):

| Field | Type | Placeholder | Required |
| --- | --- | --- | --- |
| Name | text | Full name | **yes** |
| Company | text | Company name | no |
| Email | email | you@company.com | **yes** |
| Phone | text | (555) 000-0000 | no |
| Service needed | select | — | defaults to "OSHA training" |
| Site location | text | City, state | no |
| What's going on? | textarea, 5 rows, `grid-column: 1 / -1`, `resize: vertical` | "Crew size, scope, deadlines, anything a regulator has already told you." | **yes** |

Select options: OSHA training · EHS support · Document development · Site assessment · Not sure yet. (The native select is given `appearance: none` to match the square field styling — supply your own chevron.)

Submit row spans both columns: **Send inquiry** primary button plus an inline notice slot.

**Validation:** on submit, if name, email, or message is empty, show "Name, email and a short note, and we're set." in accent-800 next to the button and do not submit. The notice slot is always present with `color: transparent` when empty, so nothing reflows when it appears.

**Success state** replaces the whole form with a centered block: 34px "Thanks — it's in.", then "We'll be back to you within one business day, usually with two or three questions before we quote.", and a **Send another** secondary button that clears state and returns to the form.

**⚠ No backend.** The form is client-side only. Wire to a real handler (email service, CRM, or form endpoint), add spam protection, and add proper `required` / `aria-invalid` / `aria-describedby` semantics — the prototype's validation is visual only.

### 11. Client Sign-in
Centered card, `width: min(430px, 100%)`, `padding: 40px 36px`, blueprint frame, background `color-mix(in srgb, #f1ede4 70%, transparent)` so the watermark reads through. Section padding `96px 0`.

Eyebrow "CLIENT PORTAL"; h1 (38px) "Sign in"; 15px lede "Training rosters, cards, editable program documents and inspection reports."; then Email and Password fields, a row with a "Keep me signed in" checkbox (`accent-color: var(--color-accent-700)`) and a "Forgot password?" link, a full-width centered primary **Sign in** button, and "Need access? Ask us for an account" linking to Contact.

**⚠ Non-functional by design** — no auth, no validation, no portal behind it. Requires real authentication (and the portal itself) before shipping. Treat the described portal contents as the product requirement for what a logged-in client should see.

## Interactions & Behavior
- **Navigation:** single-page state switch in the prototype (`page` state, `window.scrollTo(0,0)` on change). **In production, use real routes** — one URL per view, server-rendered for SEO. This is a marketing site; client-side-only view switching would be a mistake.
- **Nav active state:** driven by current route; accent-700 text + 1px accent-700 underline.
- **Training filter:** local state, no URL change in the prototype. Consider reflecting the selected group in a query param so a filtered catalog is linkable.
- **FAQ accordion:** single-open, first item open by default, toggling the open item closes it.
- **Contact form:** three-required validation → inline notice; success replaces form; "Send another" resets.
- **Hovers:** links → accent-900; nav → accent-700; blog rows → 3% ink wash; inputs → full `#3f4a2c` border. All hover/pressed states must come from the accent ramp, never browser defaults.
- **Focus:** 2px accent outline at 2px offset on everything focusable.
- **Transitions:** none specified. If you add them, keep them short (120–180ms) and on color only — the system's character is static and drawn, not animated.
- **Responsive:** **not yet designed.** Every grid is fixed-column and the type scale is desktop-only. Breakpoints are required work. Suggested approach: collapse all multi-column grids to one column under ~900px; step the h1 scale down (68px → ~40px, 56px → ~34px); collapse the header nav to a drawer; make the training group lists single-column; stack the contact split. Confirm the intended mobile treatment with the designer before implementing.

## State Management
Prototype state, for reference when mapping to routes/components:
- `page` — active view (replace with routing)
- `track` — selected training group filter, default `'All'`
- `openFaq` — open accordion index, default `0`, `-1` = all closed
- `sent` — contact form success flag
- `notice` — validation message string
- `form` — `{ name, company, email, phone, service, site, message }`, `service` defaults to `'OSHA training'`

Two configurable flags exist on the root component: `showWatermark` (boolean, default true) and `startPage` (enum of the eleven view names) — both are prototype conveniences, not product features.

No data fetching. If the training catalog or team list should become editable, a CMS collection per list (courses grouped by track, team members, clients, resources, posts) is the obvious shape.

## Assets
In `assets/`:
- `big-oak-logo.png` — 2100×1500, the client's own logo (tree + wordmark). Used at 42px height in the header and as the centered background watermark. **Client-supplied — use as-is.** Consider exporting an SVG for the header, and a smaller/optimized raster (or SVG) for the watermark, since 2100px is far larger than needed.
- `oak-canopy.png` — canopy-only crop, unused.
- `oak-tree.png` — tree + roots with wordmark removed, unused.

Fonts (Barlow, Barlow Condensed) are loaded by the design system stylesheet. Icons: **Lucide at stroke-width 1.5** per the design system — the current build uses no icons, but any added must follow that.

Missing assets that must be sourced: team portraits (6), client logos (12 or fewer), the six downloadable resource files, and a favicon / social share image.

## Accessibility notes
Address during implementation — the prototype does not:
- Give the nav a landmark and mark the current page with `aria-current="page"`.
- Add `aria-expanded` + `aria-controls` to the FAQ buttons and associate each panel.
- The training filter chips are `<button>`s with no group semantics — consider a `role="group"` with an accessible name, or radio semantics.
- Form fields need programmatic label association, `required`, and error text tied via `aria-describedby`; the validation notice should be a live region.
- Verify text contrast on the warm ground. Accent-700 (`#5a6335`) on `#f1ede4` is intended for body-size accent text per the design system's guidance (use deep ramp steps, not the base accent, for paragraph text). Muted body text set at 75% ink should be spot-checked at small sizes.
- The watermark image has an empty `alt` — correct, keep it decorative.

## Files
- `Big Oak Consulting.dc.html` — the complete design: all eleven views, all inline styles, and the logic class holding every content array. **The authoritative source for copy and content.**
- `assets/` — logo and the two unused oak crops.
- `_ds/industry-.../styles.css` — the design system token sheet and component layer. Read the `:root` block for the base tokens the page overrides.
- `_ds/industry-.../readme.md` — the design system's own guide (direction, do/don't, component inventory).
- `_ds/industry-.../_ds_bundle.js` — the design system's component bundle. Included for completeness; the site uses its CSS classes, not its JS components.

## Summary of blockers before launch
1. Real contact details (phone, email, address, hours).
2. Real team members, bios, credentials, and portraits.
3. Verified credentials and insurance limits (compliance risk).
4. Real client logos/names, or keep the anonymized-by-type pattern.
5. Contact form backend + spam protection.
6. Client portal authentication, or replace the sign-in page with a "request access" flow.
7. Responsive design for all eleven views.
8. Blog posts written, or the Field Notes page cut.
9. The six resource downloads produced.
10. Owner review of every FAQ answer that makes a commitment.
