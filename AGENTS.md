# AGENTS.md

## Repo mission
- Maintain and evolve the Signal public website as a fast, static, privacy-first marketing and content property.
- Keep behavior deterministic across local builds, preview deploys, and production deploys.
- Preserve visual and structural consistency for global layouts and blog templates.

## Deployment architecture
- Source content and templates live under `src/` and `_data/`.
- Site output is generated into `_site/` by the static site generator.
- Production hosting serves only generated artifacts from `_site/`; never hand-edit files inside `_site/` as a source change.
- CI/CD must run a clean build before deployment and fail fast on template/build errors.

## Build rules
- Use project scripts from `package.json` for install/build/serve tasks.
- Validate from a clean working tree where possible before opening PRs.
- Treat build warnings as actionable and fix them when introduced by your change.
- Never commit dependencies or lockfile churn unrelated to the requested task.

## Forbidden actions
- Do not modify runtime site code or templates unless the task explicitly requires it.
- Do not rewrite history on shared branches.
- Do not force-push over collaborator work without explicit instruction.
- Do not commit secrets, credentials, tokens, or private keys.
- Do not edit generated `_site/` files as authoritative source changes.

## CSS contamination prevention
- Scope any new styles to route- or component-specific selectors.
- Avoid unscoped global selectors that can affect unrelated pages.
- Reuse existing design tokens/utilities before adding new one-off declarations.
- Validate key pages for regressions whenever CSS-affecting files change.

## Blog parity rules
- Blog listing and blog post templates must remain visually and semantically aligned with the canonical blog template rules in `tasks/blog-template-parity.md`.
- Shared structural elements (headline block, metadata row, content body, CTA/footer region) must keep consistent class contracts.
- Any intentional deviation requires explicit documentation in the PR description.

## Reporting format
- Every implementation report must include:
  1. Changed files
  2. Commands run for validation and their outcomes
  3. Branch name
  4. PR URL (when opened)
  5. Brief risk/rollback notes if behavior changed

## Commit rules
- Keep commits scoped to a single concern.
- Use clear, imperative commit messages.
- Ensure each commit is buildable and reviewable on its own.
- Do not mix formatting-only churn with functional changes unless required.

## PR rules
- Open PRs against `main` unless instructed otherwise.
- Include summary, motivation, validation evidence, and any parity-impact notes.
- Link related task docs when rules or process documents are added/updated.
- PRs that affect templates/CSS must mention regression-check scope.

## Route rules
- Keep route structure under `src/` stable unless migration is explicitly requested.
- Preserve canonical URL patterns for blog pages and avoid silent route renames.
- Add redirects/migration notes when introducing any route-level changes.
- Do not break existing internal links as part of unrelated tasks.
