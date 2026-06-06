# Content Workflows — Signal Resolution

## Overview

There are four core workflows. Run them in sequence every week.

Workflow A is always first. B and C follow A. D is the planning layer that feeds A.

---

## Workflow D — Weekly Planning (Monday)

**Input:** Content topics you want to cover this week
**Output:** Filled weekly_content_queue.md

Steps:
1. Open /08_workflows/weekly_content_queue.md
2. Choose 3–5 keywords or pain themes
3. Assign: Audience Stage, Content Type, Framework, Priority
4. Save the queue
5. Do not start generating until the queue is complete

Time: 15–20 minutes

---

## Workflow A — Keyword to Website Article (Tuesday–Wednesday)

**Input:** One row from weekly_content_queue.md
**Output:** Published-ready website article in /09_drafts/website/

Steps:

**Step A1 — Expand the Idea**
1. Open /07_prompts/idea_expander_prompt.txt
2. Fill in: Keyword, Audience Stage
3. Run in Claude with the prompt pasted
4. Review output — confirm angle, framework, content type
5. Save brief as: /09_drafts/briefs/YYYY-MM-DD_keyword_brief.md

**Step A2 — Generate the Article**
1. Open /07_prompts/master_blog_prompt.txt
2. Fill in all INPUT fields from the brief
3. Paste these files before the prompt:
   - /00_brand_core/brand_terms.md
   - /01_audience/icp_primary.md
   - /01_audience/audience_stages.md
   - /01_audience/language_bank.md
   - /02_frameworks/[framework_file].md
   - /03_voice_rules/voice_profile.md
   - /03_voice_rules/banned_phrases.md
4. Run in Claude
5. Save draft as: /09_drafts/website/YYYY-MM-DD_keyword_website_draft.md

**Step A3 — Human Edit (20%)**
Apply /03_voice_rules/editing_standard.md
Minimum 15 minutes focused editing.
Check: hook, tension, framework attribution, FAQ section, CTA.

**Step A4 — Publish**
Publish on Signal Resolution website.
Move final to: /10_published/website/YYYY-MM-DD_keyword_website.md
Note the published URL — needed for Medium canonical link.

---

## Workflow B — Website Article to LinkedIn (Thursday)

**Input:** Published website article
**Output:** LinkedIn-native post in /09_drafts/linkedin/

Steps:

1. Open /07_prompts/linkedin_prompt.txt
2. Paste the full website article as {{blog_content}}
3. Run in Claude
4. Review output:
   - Hook works before "See more"?
   - One idea only?
   - Short lines and paragraphs?
   - No banned phrases?
5. Human sharpen: tighten the hook, cut anything that reads like a blog excerpt
6. Save as: /09_drafts/linkedin/YYYY-MM-DD_keyword_linkedin.md
7. Post to LinkedIn
8. Move final to: /10_published/linkedin/

Time: 20–30 minutes per article

---

## Workflow C — Website Article to Medium (Thursday–Friday)

**Input:** Published website article + its URL
**Output:** Medium-ready article in /09_drafts/medium/

Steps:

1. Open /07_prompts/medium_prompt.txt
2. Paste the full website article as {{blog_content}}
3. Fill in the {{website_url}} field
4. Run in Claude
5. Review output:
   - Title is more descriptive than website H1?
   - All branded terms retained with attribution?
   - FAQ section present?
   - Canonical footer at the bottom?
6. Human finalize: light edit for narrative flow
7. Save as: /09_drafts/medium/YYYY-MM-DD_keyword_medium.md
8. Publish on Medium
9. Move final to: /10_published/medium/

Time: 20–30 minutes per article

---

## Weekly Rhythm Summary

| Day | Task |
|---|---|
| Monday | Fill weekly_content_queue.md (Workflow D) |
| Tuesday | Run idea expander — save briefs |
| Wednesday | Generate website drafts — human edit — publish |
| Thursday | LinkedIn and Medium adaptations |
| Friday | Final LinkedIn/Medium edits — post — archive in /10_published/ |

---

## Output Per Week

1 published website article
1–2 LinkedIn posts adapted from the article
1 Medium adaptation

That is the minimum viable content cadence for Signal Resolution.

Three weeks of this = enough content infrastructure to test what resonates before scaling.
