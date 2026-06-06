# CLAUDE_BLOG_SYSTEM.md — Signal Resolution Blog Automation
Read this alongside CLAUDE.md at the start of every blog system session.

## Folder map
content-brain/    ← 47 Content Brain files (voice, framework, AEO, platform rules)
scripts/          ← notion_block_converter.js, blog_quality_gate.js, neon_schema_blog.sql
prompts/          ← blog_generation_prompt.md, aeo_content_prompts.md
routing/          ← internal_link_routing_map.md
src/blog/         ← published blog posts (.md files)

## n8n workflow IDs (data009.app.n8n.cloud)
WF0 Signal Feed:         F6immwY7Ws17RYPA  (inactive — activate first)
WF3 v2 Content Generator: iZVWzVhHjZ3dae17  (inactive — primary generator)
WF3 original:            rMAubeStS0cVACS5  (inactive — evaluate vs v2)
Retrieval Exa v6:        OmIhAcMTThAfJwVF  (ACTIVE)
QI Planner v1.5:         ybNHKlQCErjEanIG  (inactive)

## Notion
Workspace: Archer workspace
Blog Editor DB: SR Blog Editor (create manually — not yet built)
Status flow: draft → reviewed → approved → published → syndicated

## Neon Postgres
blog_briefs table: needs creation (scripts/neon_schema_blog.sql)
content_objects: needs 3 new columns (blog_id, asset_tier, resonance_score)

## Blog frontmatter standard
Every src/blog/*.md file must have:
layout: post
title: ""
description: ""
date: YYYY-MM-DD
category: ""
buyer_state: ""        ← chaos_scaler | overwhelmed_founder | timing_blind | stuck_optimizer | velocity_victim
tier: ""               ← A | B | C
content_type: ""       ← standard | comparison | definition | research
featured: false
permalink: /blog/slug/
readTime: ""
cta_type: ""           ← diagnostic | tripwire | deposit
canonical_url: ""

## Eleventy blog config
Collection name: posts
Source: src/blog/*.md
Output: _site/
Blog layout: src/_layouts/post.njk

## GitHub
Remote: https://github.com/Pethrova/Signal-site.git
Deploy branch: main
Working branch: feat/blog-system

## Deployment flow
1. n8n WF3 v2 generates blog → Notion SR Blog Editor (status=draft)
2. Rome edits in Notion (20% human touch, 15-25 min)
3. Rome sets status=approved
4. n8n Publish Trigger → Notion blocks → Markdown → GitHub src/blog/[slug].md
5. Cloudflare builds → live at signalresolution.com/blog/[slug] in ~90s
6. n8n updates Notion: status=published, canonical_url populated
7. Medium syndication: manual, 7 days after publish

## LinkedIn (MANUAL — no API)
Rome posts manually using 30-min comment warm-up technique.
System generates copy only. Stores in Notion LinkedIn Queue view.

## Content quality rules
1. Word count ≥ 1,000 (Tier A ≥ 1,200)
2. AEO direct answer in first 150 words
3. FAQ section ≥ 3 questions
4. ≥ 3 proprietary vocabulary terms
5. No banned phrases (see content-brain voice rules)
6. 70% diagnostic / 30% stabilization tone ratio
7. CTA matches buyer_state routing
8. ≥ 2 internal links

## Buyer state → CTA routing
chaos_scaler → /assessment/ ("Run the Signal Diagnostic")
overwhelmed_founder → /assessment/ ("Get Your Signal Read")
timing_blind → /assessment/ ("Find Your Timing Window")
stuck_optimizer → /pricing/ ("Get the Signal Correction Report")
velocity_victim → /pricing/ ("Run the False Momentum Diagnostic")
Tier 3 any state → /pricing/

## Session rules
- Always read CLAUDE.md + CLAUDE_BLOG_SYSTEM.md before any blog work
- Never hardcode internal links — always reference routing/internal_link_routing_map.md
- Never edit _site/ directly
- Blog posts → src/blog/ only
- Scripts → scripts/ only
- Prompts → prompts/ only
