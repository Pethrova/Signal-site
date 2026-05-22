# Blog Template Parity Rules

## Exact parity objective
Ensure all blog-facing templates render with equivalent structure, spacing intent, and semantic landmarks so users see a consistent experience between blog index and blog article pages.

## Source of truth template
`src/_layouts/blog.njk` is the canonical parity reference. Any blog-related template updates must be reconciled against this file before merge.

## Required class names
The following class contracts are mandatory wherever their corresponding regions exist:
- `blog-hero`
- `blog-title`
- `blog-meta`
- `blog-content`
- `blog-footer`
- `blog-cta`

## Forbidden legacy classes
Do not introduce or retain legacy aliases that diverge from the required class contract:
- `post-hero`
- `post-title`
- `post-meta-row`
- `post-body`
- `post-footer-legacy`

## Validation commands
Run all checks below before declaring parity-complete:
- `npm run build`
- `npm run lint` (if configured)
- `rg "post-hero|post-title|post-meta-row|post-body|post-footer-legacy" src`
- `rg "blog-hero|blog-title|blog-meta|blog-content|blog-footer|blog-cta" src`

## "Done means" definition
Parity work is done only when:
1. Blog templates conform to required class contracts.
2. Forbidden legacy classes are absent from `src/` blog templates/styles.
3. Build succeeds without introducing new warnings attributable to parity edits.
4. PR includes validation command output and notes any explicit exceptions.
