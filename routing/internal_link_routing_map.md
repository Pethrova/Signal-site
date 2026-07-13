# Internal Link / CTA Routing — Canonical Description

> This file previously prescribed per-buyer-state pre-diagnostic CTA targets.
> That model was retired because it did not match the live system (see
> _reference/funnel-link-architecture-audit.md). This file now DESCRIBES how
> routing actually works. It is documentation, not a lookup table — templates
> hardcode the correct links directly.

## Top-of-funnel (all content pages)
Every TOF CTA links to `/diagnostic.html` with no query param.
Buyer state is UNKNOWN until the diagnostic runs — there is no pre-diagnostic
per-state routing, and none is possible without new build logic. Do not
reintroduce per-state CTA targets ahead of the diagnostic.

## The diagnostic is the sole entry gate
All leads must pass through `/diagnostic.html` and self-classify before any
offer, price, or product page. Commercial pages (pricing, apply, tripwire,
godfather, thank-you) are guarded and bounce cold traffic back to the diagnostic.

## Post-diagnostic branching (inside diagnostic.html)
Branching is by SCORE / PATHWAY, not buyer state:
- Score < 60 → /pricing.html (recTier=1, DIY)
- Score 60–84 → /apply.html (recTier=2, DWY)
- Score ≥ 85 → /apply.html (recTier=3, DFY)
- Path A pathways → /godfather.html
- Default → /tripwire.html
Buyer state (archetype) travels downstream only as DISPLAY personalization on
tripwire.html and godfather.html — it never selects which page a visitor lands on.

## Canonical buyer states (public, display-only)
Overwhelmed Founder · Velocity Victim · Stuck Optimizer · Timing Blind · Chaos Scaler
(The deprecated "AI-Era Psychographic States" naming must not be used.
The 7 internal diagnostic identifiers are internal-only and never appear in
public content or links.)

## Future idea (NOT built)
Per-state pre-diagnostic landing copy for segmented paid traffic would require
new pages + param-consumption logic in diagnostic.html. Documented here as an
aspiration only — it does not exist today.
