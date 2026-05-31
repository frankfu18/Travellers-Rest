# Codex Task Log

## 2026-05-31 - Remove Mechanical Source Labels

### Goal

Remove visible source-label phrasing such as explicit language/community labels from `/what-to-do-next` so the copy reads like authored strategy guidance rather than an AI-scanned summary.

### Files changed

- `app/what-to-do-next/page.tsx`
- `components/what-to-do-next-client.tsx`
- `CODEX_TASK_LOG.md`

### Pages added

None. This task updated copy on the existing `/what-to-do-next` page.

### SEO changes

- Simplified `/what-to-do-next` metadata description and keywords to remove mechanical language-source phrasing.

### Data changes

- Reworded action copy and source notes to use natural phrases such as beginner routes, progression notes, recipe-selection rules, player discussions, guide pages, and planning patterns.
- Removed explicit language-source labels from the visible page and recommendation copy.

### Verification needed

- Continue checking future edits for phrases that sound like source scanning rather than practical strategy writing.

### Next recommended task

Review other strategy pages for the same issue and replace mechanical source-label phrasing with direct player-facing guidance.

## 2026-05-31 - Long-Form Action Paragraphs

### Goal

Deepen `/what-to-do-next` Recommended Actions so each item reads like a short strategy paragraph with a clear title, scenario, action, reason, adjustment point, and community-informed planning logic.

### Files changed

- `components/what-to-do-next-client.tsx`
- `CODEX_TASK_LOG.md`

### Pages added

None. This task updated the existing `/what-to-do-next` page.

### SEO changes

None. Metadata and sitemap behavior were not changed.

### Data changes

- Converted rendered action items to `title + body` cards.
- Kept all 28 stage/problem combinations.
- Each combination now renders 8 card-like action paragraphs built from local static strategy notes.

### Verification needed

- Future content edits should keep action bodies practical and avoid exact unverified prices, levels, timers, multipliers, or formulas.

### Next recommended task

Move the what-to-do-next recommendation data into a dedicated local data file and add a validation script for action counts, unique titles, and minimum body length.

## 2026-05-31 - Recommended Actions Copy Polish

### Goal

Improve `/what-to-do-next` action copy so each recommendation reads more like practical strategy writing and less like AI-style community summary.

### Files changed

- `components/what-to-do-next-client.tsx`
- `CODEX_TASK_LOG.md`

### Pages added

None. This task updated copy for the existing `/what-to-do-next` page.

### SEO changes

None. Metadata and sitemap behavior were not changed.

### Data changes

- Added three concrete, stage-specific and problem-specific actions to each of the 28 recommendation combinations.
- Each combination now renders 8 recommended actions.
- Reduced mechanical source phrases inside action copy while preserving the English and Japanese community-informed strategy direction.

### Verification needed

- Continue checking future advice against current Travellers Rest mechanics before adding exact values, prices, levels, timers, or formulas.

### Next recommended task

Add automated checks for `/what-to-do-next` recommendation data: 28 unique titles, at least 8 actions per combination, and no duplicate action strings.

## 2026-05-31 - English and Japanese Planner Simplification

### Goal

Refactor `/what-to-do-next` into a simpler English + Japanese community-informed strategy planner with only two selectors and one Recommended Actions result area.

### Files changed

- `components/what-to-do-next-client.tsx`
- `app/what-to-do-next/page.tsx`
- `CODEX_TASK_LOG.md`

### Pages added

None. This task updated the existing `/what-to-do-next` page.

### SEO changes

- Updated `/what-to-do-next` metadata title and description for English and Japanese community-informed strategy positioning.
- Added natural keyword coverage for what to do next, early game tips, money, food, planting, reputation, staff, rooms, Japanese guide, and beginner guide intent.

### Data changes

- Reduced stages to First Week, Early Game, Mid Game, and Late Game.
- Reduced problems to seven common player bottlenecks.
- Removed Available systems state, UI, and recommendation logic.
- Added 28 independent static stage-and-problem recommendation combinations with five actions each.

### Verification needed

- Manually verify future balance-sensitive claims before adding exact prices, values, levels, timers, or formulas.
- Review Japanese guide/player-note themes after major Travellers Rest updates so the summaries stay accurate.

### Next recommended task

Add lightweight interaction tests for `/what-to-do-next` to confirm all 28 stage/problem combinations render distinct titles and actions.

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
