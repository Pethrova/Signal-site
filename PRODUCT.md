# Product

## Register

brand

## Users

B2B SaaS founders and GTM leaders (typically post-seed to Series A/B) who suspect their pipeline problem is upstream of tactics — ICP definition, buyer-state targeting, or timing signals — not lead volume or sales execution. They arrive skeptical of generic growth advice, having already tried the obvious plays. Their context: evaluating whether to trust an unfamiliar diagnostic instrument with real budget and strategic direction, usually while under pipeline pressure themselves.

Job to be done: get an honest, evidence-based read on where their GTM is actually broken (not where they assume it's broken), then act on it — either self-serve via the ebook/Path A framework, or buy into a paid diagnostic tier (T1/T2/T3) for a deeper, done-with-you engagement.

**Register split:** the interactive diagnostic assessment (`src/diagnostic.html`) and its question/scoring flow are a **product-register surface nested inside the brand** — completion rate, form ergonomics, and task clarity are the metrics there, not persuasion. Everything else (landing pages, pricing, blog, apply/checkout, tripwire, thank-you) is brand register, where the visual system does active conversion and trust-building work. Default to brand register for site-wide work; switch to product-register thinking specifically when working inside the diagnostic flow.

## Product Purpose

Signal Resolution is a GTM diagnostic and market-intelligence instrument for B2B SaaS. It exists to name the specific, hidden layer (buyer state, ICP mismatch, timing/technographic signals) causing inconsistent growth, using a structured assessment rather than generic advice. Success is a visitor who takes the diagnostic, recognizes their own situation in the output (the "unflinching" moment), and converts into a paid tier because the read was too accurate to ignore.

## Brand Personality

Three words: **Precise, confident, unflinching.**

- **Precise** — the diagnostic-instrument register: mono labels, data readouts, category/maturity bars, evidence-over-opinion framing. Nothing hand-wavy; every claim reads like it came off an instrument, not a pitch deck.
- **Confident** — premium dark-and-gold visual register, prices and claims stated with conviction, never hedged. Assured, not loud.
- **Unflinching** — names the buyer's problem directly and doesn't look away from it. This is where the fear-layer work happens, but it lives entirely in copy logic (direct statements, high-contrast claims, real deadlines/mechanics) — never in the visual register as flashing urgency or hype scaffolding.

Voice doctrine (from CLAUDE.md): benefits-driven, direct-response (Fladlien/Platten/Suby lineage). Every bullet states mechanism + transformation, not a feature label. Mirror the buyer's own language; never spec-sheet language.

## Anti-references

- **Generic SaaS cream/soft-pastel** — the saturated 2026 AI-default look (warm off-white bg, soft rounded cards, friendly illustration). Signal Resolution is dark, precise, and premium, not friendly-approachable.
- **Corporate consulting deck** — McKinsey blue/gray, stock-photo handshakes, safe-and-forgettable advisory-firm visual language. This is an intelligence instrument, not an advisory firm.
- **Bro-marketer hype page** — countdown timers, flashing scarcity banners, all-caps urgency everywhere. The funnel uses real deadline mechanics in copy, but the visual register never performs urgency.
- **Cyber/hacker dark-mode cliché** — matrix green, neon glow gradients, terminal cosplay. The brand is dark and precise, not cyberpunk-dashboard.

## Design Principles

1. **Evidence over opinion.** Every claim gets a visual data structure (bar, ring, ledger row, percentage) rather than a bare assertion — the instrument shows its work.
2. **Conviction without volume.** State prices, claims, and diagnoses plainly and confidently; urgency and fear-layer work live in copy logic and deadline mechanics, never in visual loudness (no flashing, no countdown chrome, no all-caps banners).
3. **The diagnostic is a tool, not a funnel page.** Inside `diagnostic.html`, prioritize completion rate, clarity of the next required action, and low-friction form ergonomics over persuasive framing — the persuasion already happened upstream on the landing pages.
4. **Practice what you preach.** As a GTM-precision brand, the site itself should not exhibit the generic-AI-marketing patterns (soft pastels, spec-sheet bullets, template hero) it diagnoses in its own audience's sites.
5. **Dark and gold carries authority, not decoration.** Reserve the gold/ember accent system for signal (scores, CTAs, emphasis) — it marks what matters, not what's merely present.

## Accessibility & Inclusion

WCAG AA baseline across the site. Particular attention required on:
- **Contrast**: the gold (`#f5a623`) and ember (`#ff6b35`) accents against the near-black backgrounds (`#080706`, `#0f0e0c`, `#161410`) must be checked per use — these accents are frequently used for small mono-label text and thin data elements where contrast margin is tightest.
- **Diagnostic form accessibility**: labels, visible focus states, and clear error messaging inside `diagnostic.html`'s question/lead-capture/application flows, since that surface is product-register and measured on completion, not just aesthetics.
