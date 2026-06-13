# CLAUDE.md — Signal Resolution

## What this is
Static site (Eleventy 2 + Nunjucks) for signalresolution.com.
One CSS file, one JS file, no bundler. 
Cloudflare Pages deploys on push to main.

## Build commands
npm start          # dev server at localhost:8080
npx eleventy       # production build to _site/
npm run debug      # verbose eleventy output

## Key files
src/_layouts/base.njk       — HTML shell, meta, fonts
src/_layouts/post.njk       — article template
src/_includes/nav.njk       — fixed nav
src/_includes/footer.njk    — footer
src/blog/index.njk          — blog listing page
src/assets/css/global.css   — all styles (single file)
src/assets/js/main.js       — cursor, nav, filter JS
_data/site.json             — global metadata
_reference/blog.html        — canonical blog reference (do not edit)
src/diagnostic.html         — standalone diagnostic app (passthrough, not processed by Eleventy)
src/assessment.njk          — diagnostic landing/explanation page at /assessment/

## CSS rules
Blog CSS lives at bottom of global.css — lines 415+.
Always reconcile against _reference/blog.html before 
touching blog templates. Required classes: pc-*, fsc-*, 
fp-card, fp-side-card. Forbidden: fp-badge inside 
post-card, is-active (use .on instead... actually both 
are aliased now — prefer .on).

## Adding posts
Add .md to src/blog/ with frontmatter:
layout, title, description, date, category, featured, 
permalink, readTime

## Deployment
Push to main → Cloudflare builds and deploys (~60s).
Never edit _site/ directly.
Never commit node_modules.

## Known remaining work
- First real article links: blog index side cards and post-grid still link to article.html placeholder — need to point to real post URLs via {{ post.url }}
- Tripwire checkout URLs in diagnostic.html are placeholders (console.log only) — need real URLs when checkout is live
- OG images not set on posts
- No favicon
- RSS feed at /feed.xml and sitemap at /sitemap.xml — live
- Tier 1 checkout URL in diagnostic.html is an alert placeholder

## Blog automation system
Full context in CLAUDE_BLOG_SYSTEM.md — read alongside this file for blog work.

### Quick reference
- Blog posts: src/blog/
- Content Brain: content-brain/ (47 files across 14 folders)
- Scripts: scripts/
- Prompts: prompts/
- Routing: routing/
- n8n content workflow: WF3 v2 (iZVWzVhHjZ3dae17)
- Notion Blog DB: SR Blog Editor (create in Archer workspace)

### Content brain location
content-brain/ is in Signal-site root.
n8n reads these files via GitHub API.
Never delete or move this folder.

### Blog frontmatter required fields
layout, title, description, date, category, buyer_state, tier,
content_type, featured, permalink, readTime, cta_type, canonical_url, og_image
Current Workstream — Offer Positioning Rebuild (June 2026)

Driven by OFFER DRIVEN $450k chat audit. Offer positioning graded at
35–40% — the lowest-scoring element in commercial architecture. This
workstream raises it to 75%+ by designing the fixes the audit only graded.

Sequenced phases:

Phase 1 ✓ pricing.html rebuild — competitor anchor, identity tags,
outcome-tied guarantees, benefits-driven bullets, design polish
(commits 6a075d1, c0ac7b9, f35b382)
Phase 2 — result page split-CTA by score band (0–3/4–6/7–10) +
downloadable PDF (HIGHEST LEVERAGE — every diagnostic-taker hits it)
Phase 3 — tripwire page rewrite + tripwire output content
(rename from "report" framing to "completed output" framing)
Phase 4 — ebook page rewrite + ebook content upgrade
(Path A descension, currently spec-heavy not benefits-driven)
Phase 5 — voice alignment across apply.html / thank-you.html /
refund.html so the funnel doesn't fracture between pages

Voice rule across the commercial layer: benefits-driven
Fladlien/Platten/Suby. Every bullet states mechanism + transformation,
not feature labels. Strategic outcome lines do fear-layer work
(currently 35% effectiveness). No spec-sheet language. Mirror buyer
language, not system labels.

Guarantees stay outcome-tied across all surfaces:


T1 = 30-day, 15 deployable avatar-matched signals, refund
T2 = 90-day, 3 validated avatars + 50 deployable signals, extension
T3 = 120-day, operational signal layer, extension
No "money back" language on T2 or T3 — extension only


Active operational notes:


T1 CTA points at /apply.html as interim — swap to Whop checkout
URL once Whop integration completes
Tripwire CHECKOUT const same interim — swap to Whop in same push
LemonSqueezy URLs are dead; do not restore them anywhere


Workflow pattern that works for this site:


Architect prompt-block built in Claude.ai chat
Drop self-contained script + prompt into funnel_push/ folder
One Claude Code session: read CLAUDE.md, run script, verify, push
Script edits use exact-string find/replace with strict guards
(bails on zero or multiple matches) — never freehand find/replace
Whole-file overwrites for substantive rewrites
One commit per logical push, push to main, Cloudflare auto-deploys