# Codex Task Log

## 2026-05-31 - Stage and Problem Recommendation Matrix

### Goal

Refactor `/what-to-do-next` so recommendations are selected from the exact `Current stage + Main problem` combination instead of being dominated by the stage module.

### Files changed

- `components/what-to-do-next-client.tsx`
- `app/what-to-do-next/page.tsx`
- `CODEX_TASK_LOG.md`

### Pages added

None. This task updated the existing `/what-to-do-next` page.

### SEO changes

- Updated `/what-to-do-next` metadata description to emphasize current stage plus main bottleneck.

### Data changes

- Removed the `Available systems` selector, related state, and related recommendation logic.
- Added a local two-dimensional recommendation structure keyed by stage and problem.
- Added independent community-informed content for the required combinations, plus a dynamic fallback that combines the selected stage context with the selected problem context.

### Verification needed

- Manually review the player-sourced wording after future Travellers Rest updates.
- Exact item values, wage details, crop balance, room economics, and timing remain unverified and should not be treated as fixed data.

### Next recommended task

Add UI-level smoke tests or lightweight component tests that confirm changing stage and problem changes the recommendation title, summary, actions, avoid list, and explanation.

## 2026-05-31 - Community-Informed What To Do Next Planner

### Goal

Upgrade `/what-to-do-next` from generic decision bullets into a player-sourced, community-informed tavern planner focused on recurring player strategy patterns and current bottlenecks.

### Files changed

- `app/what-to-do-next/page.tsx`
- `components/what-to-do-next-client.tsx`
- `CODEX_TASK_LOG.md`

### Pages added

None. This task updated the existing `/what-to-do-next` page.

### SEO changes

- Updated `/what-to-do-next` metadata title and description for the player-sourced tavern strategy planner direction.
- Added natural long-tail keywords for early game tips, money, staff, reputation, guest rooms, crops, and brewing.

### Data changes

- Replaced generic recommendation output with local TypeScript strategy modules for first week, money, planting, busy tavern, staff, fishing, brewing, reputation, guest rooms, common mistakes, and the daily bottleneck rule.
- No exact prices, values, timers, levels, or unverified build orders were added.

### Verification needed

- Future manual review should compare the community-informed advice against current Travellers Rest mechanics after major updates.
- Exact item values, staff wage behavior, aging balance, crop availability, and guest room economics still need manual verification before being framed as specific rules.

### Next recommended task

Add a dedicated Problem Solver entry point that routes common player bottlenecks to `/what-to-do-next`, `/menu-planner`, progression stages, strategy guides, and database pages.

## 2026-05-30 - Project Rules Documentation

### Goal

Create persistent project direction and content rules so future Codex work follows the Travellers Rest Tavern Planner & Strategy Guide positioning.

### Files changed

- `PROJECT_DIRECTION.md`
- `CONTENT_RULES.md`
- `CODEX_TASK_LOG.md`
- `README.md`

### Pages added

None. This task only adds and updates documentation.

### SEO changes

None. No route metadata, sitemap entries, or page content were changed.

### Data changes

None. No game data, guide data, or database records were changed.

### Verification needed

- Future content work should continue verifying prices, levels, times, seasons, fish locations, merchants, recipe values, unlock requirements, and exact mechanics before marking data as verified.
- Confirm that future database pages keep `needs_verification` until manually checked.

### Next recommended task

Audit existing guide and database content against `PROJECT_DIRECTION.md` and `CONTENT_RULES.md`, then prioritize manual verification for recipe ingredients, drink chains, crop seasons, fish locations, and staff mechanics.
