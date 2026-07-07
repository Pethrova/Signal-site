---
name: Signal Resolution
description: GTM diagnostic and market intelligence for B2B SaaS founders — a dark, precise instrument panel, not a SaaS landing page.
colors:
  void: "#080706"
  surface-1: "#0f0e0c"
  surface-2: "#161410"
  surface-3: "#1c1a16"
  ink-deep: "#1a1714"
  gold: "#f5a623"
  gold-bright: "#ffd166"
  ember: "#ff6b35"
  text: "#ede8df"
  slate: "#c8c4bb"
  muted: "#6e6860"
  dim: "#3a3530"
  border: "rgba(255,200,80,0.07)"
  border-hi: "rgba(255,200,80,0.18)"
  border-ember: "rgba(255,107,53,0.16)"
  border-ember-lo: "rgba(255,107,53,0.09)"
typography:
  display:
    fontFamily: "'Bebas Neue', sans-serif"
    fontSize: "clamp(2.5rem, 8.5vw, 7.75rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "0.01em"
  headline:
    fontFamily: "'Bebas Neue', sans-serif"
    fontSize: "clamp(1.75rem, 4vw, 3.25rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "0.02em"
  reflective:
    fontFamily: "'Fraunces', serif"
    fontSize: "16px"
    fontWeight: 400
    fontStyle: "italic"
    lineHeight: 1.8
  body:
    fontFamily: "'Fraunces', serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.9
  label:
    fontFamily: "'IBM Plex Mono', monospace"
    fontSize: "11px"
    fontWeight: 400
    letterSpacing: "0.14em"
    textTransform: "uppercase"
rounded:
  none: "0px"
  pip: "1px"
  full: "50%"
spacing:
  seam: "2px"
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "56px"
  section: "100px"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.void}"
    rounded: "{rounded.none}"
    padding: "15px 30px"
  button-primary-hover:
    backgroundColor: "{colors.gold-bright}"
    textColor: "{colors.void}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.none}"
  button-ghost-hover:
    textColor: "{colors.gold}"
  card:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.text}"
    rounded: "{rounded.none}"
    padding: "30px 28px"
  card-hover:
    backgroundColor: "{colors.surface-1}"
  input:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.text}"
    rounded: "{rounded.none}"
    padding: "12px 14px"
  input-focus:
    backgroundColor: "{colors.surface-2}"
---

# Design System: Signal Resolution

## 1. Overview

**Creative North Star: "The Instrument Panel"**

Signal Resolution reads like a diagnostic instrument that happens to sell something, not a SaaS landing page that happens to have a quiz. The surface is void-dark (#080706) with two working accent signals — gold for what's working or what to act on, ember for what's broken or costing money — laid over a strict mono-label vocabulary (IBM Plex Mono) that treats every piece of UI chrome, from nav links to category scores, as a readout rather than marketing copy. Condensed Bebas Neue display type delivers headlines and numbers with blunt, confident force; italic Fraunces serif is the one warm register in the system, reserved for the moments the copy turns reflective (pull-quotes, taglines, the buyer's own inner monologue).

The system explicitly rejects the three postures a diagnostic-for-founders product could easily fall into: the **generic SaaS cream/pastel** AI-default (this is dark and saturated where that is warm and soft), the **corporate consulting deck** (this is an instrument's readout, not a McKinsey slide — no blue/gray safety, no stock-photo handshakes), and the **cyber/hacker cliché** (no matrix green, no neon gradient glow, no terminal cosplay — precision is conveyed through hairline borders and data density, not glowing chrome). Urgency is a copy-logic property (deadline mechanics, direct claims), never a visual one — there is no flashing, no countdown-timer aesthetic, no all-caps siren banners.

**Key Characteristics:**
- Void-dark base with a strict four-step surface ladder (void → surface-1 → surface-2 → surface-3), no gradients used for depth.
- Two accents with distinct jobs: gold = signal/positive/primary action, ember = cost/gap/alert — never interchangeable.
- Nearly all UI text is mono-uppercase-tracked; serif italic is rationed to reflective copy only.
- Adjacent bordered blocks sit in a 2px hairline seam grid instead of touching or gapping widely — the system's structural signature.
- Zero border-radius except true circles (dots, rings) and 1px bar caps.

## 2. Colors

A two-accent instrument palette on a four-step dark ladder — nothing pastel, nothing neon, no unearned gradients.

### Primary
- **Signal Gold** (#f5a623): the color of "this is working" and "act here." Used on every primary CTA, score rings, category-strength bars, gold-lit borders on hover, and the mono eyebrow labels that head every section. Its brighter twin **Gold-Bright** (#ffd166) appears only in hover states and the gold→ember gradient hairline that tops featured cards — never as a resting color.

### Secondary
- **Ember** (#ff6b35): the color of cost, gap, or weakness — the compound-cost ledger, "before" states in before/after blocks, weak category bars, urgency copy blocks. Ember and gold never both mean "good"; ember is reserved for what the diagnostic found wrong.

### Neutral
- **Void** (#080706): the base background across the entire site — deliberately near-black, not a dark gray.
- **Surface-1 / Surface-2 / Surface-3** (#0f0e0c / #161410 / #1c1a16): a tonal ladder used for layered sections and nested panels (e.g. a table row inside a bordered block sits one step lighter than its container). No shadows do this work; the step itself is the depth cue.
- **Text** (#ede8df): primary reading color for headlines and body copy — warm off-white, not pure white.
- **Slate** (#c8c4bb): secondary reading color for serif/reflective copy and quote text.
- **Muted** (#6e6860): the default color for mono labels, sub-copy, and metadata — most of the site's small text lives here.
- **Dim** (#3a3530): the lowest-contrast tier, for footer copy, disabled states, and background numerals (giant low-opacity display-font watermarks like "SIGNAL" behind section content).
- **Border / Border-Hi** (rgba(255,200,80,.07) / .18): the hairline border system. Border is the resting 1px line around every card, row, and panel; Border-Hi is what it becomes on hover — brightness shift, never a new color.

### Named Rules
**The Two-Accent Discipline.** Gold means "signal" (working, act, positive). Ember means "gap" (cost, weakness, negative). A UI element never borrows the other accent to mean the same thing twice — if a category bar is weak, it is ember; if it's strong, it is gold. Never both used decoratively on the same element.

**The Unflinching-in-Copy-Only Rule.** Urgency lives in copy logic (real deadlines, direct claims, deadline mechanics on tiers) and never in the visual register. No flashing states, no countdown-timer chrome, no siren-red banners, no all-caps shouting beyond the standard mono label treatment already used everywhere.

## 3. Typography

**Display Font:** Bebas Neue (condensed sans, uppercase-forward, no true fallback needed — system sans-serif as backstop)
**Body Font:** Fraunces (serif, used mostly italic)
**Label/Mono Font:** IBM Plex Mono — the workhorse; the large majority of all UI text on the site is this face

**Character:** A blunt condensed display face for numbers and headlines, paired against a warm italic serif reserved for the rare reflective beat, both floating on a mono-label substrate that treats every piece of chrome as instrument readout. The pairing is the brand's precision/confidence contrast in typographic form.

### Hierarchy
- **Display** (400, `clamp(64px,8.5vw,124px)`, line-height .90): hero headlines only. Uses `.g` (dim) and `.gold` inline spans to mute or highlight specific words within one headline.
- **Headline** (400, `clamp(28px,3.5vw,86px)` depending on section weight, line-height .90–1.0): section headlines (`.sec-hl`), card titles (`.sc-title`, `.ba-hl`), and giant background watermark numerals.
- **Reflective/Body-Italic** (400 italic, 15–18px, line-height 1.7–1.9): taglines, pull-quotes, testimonial copy, the "reframe" question blocks — the single warm register in the system. Max width kept to ~500–580px (roughly 65–75ch equivalent for the italic serif setting).
- **Body** (400, 16px, line-height 1.9): non-italic serif prose paragraphs (about-body, longer explanatory copy).
- **Label** (400, 9–13px, letter-spacing .1–.24em, uppercase): nav links, eyebrows, buttons, card metadata, category names, form labels — the dominant text treatment on the page. Sub-variants exist by size (9px ticker/eyebrow micro-labels up to 13.5px component titles) but all share the mono-uppercase-tracked treatment.

### Named Rules
**The Mono-Default Rule.** When in doubt, UI chrome is IBM Plex Mono, uppercase, letter-spaced. Serif italic is earned, not default — reserve it for copy that is meant to sound like a person thinking, not a system labeling something.

**The Headline Ceiling.** Display headlines cap at `clamp()` max ~124px; never push past it even for hero moments. Letter-spacing on display type stays at .01–.04em — tight enough to read as designed, never negative-cramped.

## 4. Elevation

Flat by default. Depth is conveyed entirely through the surface ladder (void → surface-1 → surface-2 → surface-3) and 1px hairline borders that brighten on hover — not through box-shadow. The one exception is interactive glow: primary buttons and score elements emit a soft gold `box-shadow` blur purely as hover feedback, never as resting elevation.

### Shadow Vocabulary
- **Interactive glow** (`box-shadow: 0 0 56px rgba(245,166,35,.32)`): applied only on `:hover` of primary buttons (`.btn`) and disabled on `:disabled`/rest states. Signals "this is the live action," not depth.
- **No ambient/resting shadow exists anywhere else in the system.**

### Named Rules
**The Flat Ledger Rule.** Surfaces never lift at rest. A card sitting "above" its container is expressed by moving one step up the surface ladder and adding a 1px border, not a shadow. Shadows only ever answer a hover or focus event.

## 5. Components

Every component in the system is a hairline-bordered rectangle at 0 radius; the only curves in the entire UI are true circles (status dots, score rings, avatar placeholders).

### Buttons
- **Shape:** 0 radius, sharp rectangle.
- **Primary (`.btn`):** solid gold background, void-black text, mono uppercase label, 15px/30px padding. A gold-bright fill sweeps in from the left on hover (`skewX(-8deg)` wipe), paired with the interactive glow shadow and a 1px upward `translateY`.
- **Ghost (`.btn-ghost` / `.btn-line`):** transparent background, muted mono label, no border chrome beyond what the row/card already has; text shifts to gold on hover and an inline arrow glyph animates outward (`translateX`).
- **Diagnostic "fire" button (product-register surface):** same gold-fill primary treatment, but disabled state is explicit and visible (`background: var(--dim); opacity:.5; cursor:not-allowed`) — inside the diagnostic flow, button state must always communicate task-readiness, not just style.

### Cards / Containers
- **Corner style:** 0 radius, always.
- **Background:** one step up the surface ladder from whatever contains it (a card on the void body sits at surface-1; a nested row inside that card sits at surface-2).
- **Border:** 1px hairline border at the resting `--bdr` opacity, brightening to `--bdr-hi` on hover — this border-brightening is the primary hover affordance across the entire site, more common than any color or background change.
- **Signature top-hairline:** featured/emphasis cards (`score-card`, `diag-card`, `fp-card`) carry a 2px top border rendered as a gold→ember gradient fading to transparent — the closest thing to a decorative flourish the system allows, and it never appears on ordinary cards.
- **Internal padding:** 26–44px depending on card prominence (side cards tighter, featured/hero cards looser).

### Inputs / Fields
- **Style:** surface-2 background, 1px hairline border, mono label typography, 0 radius, 12px/14px padding.
- **Focus:** border brightens toward gold (`rgba(245,166,35,.4)`) — no glow, no background change, consistent with the flat-ledger elevation rule.
- **Disabled:** dim background, reduced opacity, `cursor:not-allowed` — used prominently in the diagnostic flow where task-state clarity matters more than aesthetic polish.

### Navigation
- Fixed top nav, transparent until scrolled (`.stuck` adds a blurred near-black background + hairline bottom border). Links are compact mono labels (9.5px, wide tracking, muted, gold on hover); the primary nav CTA is a gold-outlined button that fills solid gold on hover via the same left-to-right wipe used elsewhere.

### The Hairline Seam Grid (signature pattern)
Adjacent same-role blocks — post cards, category rows, cost-ledger rows, proof cards, layer rows — sit in a grid with a **2px gap** between cells rather than touching edge-to-edge or using generous whitespace gaps. The 2px gap itself (matching the border color) reads as a seam in a single instrument panel rather than a set of separate floating cards. This is the system's most distinctive and non-obvious layout device; collapsing it to 0 (touching) or expanding it to normal card-grid gutters (16–24px) both break the "single panel" read.

## 6. Do's and Don'ts

### Do:
- **Do** treat mono uppercase IBM Plex Mono as the default for all UI chrome; reserve italic Fraunces for reflective/quote copy only.
- **Do** use the 2px hairline seam grid between same-role adjacent blocks (cards, rows, ledger lines) — it is the system's signature, not an accident to fix.
- **Do** convey depth via the surface ladder (void → surface-1 → surface-2 → surface-3) and border brightening on hover, never via box-shadow at rest.
- **Do** keep gold strictly for "signal/positive/act" and ember strictly for "gap/cost/weak" — never swap their meaning on a single element.
- **Do** let urgency live in copy (real deadlines, direct claims) — the visual register stays precise and unflinching, not loud.
- **Do** hold diagnostic.html and its assessment flow to product-register standards: visible focus states, explicit disabled states, and low-friction form ergonomics take priority over persuasive framing there.

### Don't:
- **Don't** introduce a warm cream/pastel/off-white background anywhere in the system — the AI-default SaaS look (per PRODUCT.md anti-references) is explicitly rejected.
- **Don't** reach for corporate-consulting-deck visual language: no blue/gray "safe" palettes, no stock-photo handshakes, no advisory-firm styling. This is an intelligence instrument, not a consultancy.
- **Don't** add matrix-green, neon gradient glow, or terminal-cosplay chrome. Precision reads through hairline borders and mono data density, not glowing cyberpunk surfaces.
- **Don't** ship countdown timers, flashing scarcity banners, or all-caps siren-style urgency in the UI — deadline mechanics belong in copy, never in visual performance.
- **Don't** round corners on anything except true circles (dots, score rings) — a rounded card or button is an immediate tell that it isn't this system.
- **Don't** add resting box-shadow to any card or panel; the only shadow in the system is the hover-only gold glow on primary buttons.
- **Don't** use border-left or border-right as a colored accent stripe on cards or callouts (matches the general slop-avoidance rule); the system's accent device is the full 1px hairline border and the top-only gradient hairline on featured cards, never a side stripe.
