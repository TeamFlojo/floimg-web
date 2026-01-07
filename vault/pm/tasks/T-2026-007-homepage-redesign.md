# T-2026-007: Homepage Redesign

## Task Details

- **ID**: T-2026-007
- **Priority**: P1
- **Status**: In Progress
- **Created**: 2026-01-06
- **Estimate**: Medium (1-2 days)

## Description

Redesign the homepage to create a tighter narrative, fix dark mode bugs, improve visual variety, and make Studio more prominent. Reduce from 10 sections to 7 with a clearer story arc.

### Strategic Changes

- Add "Studio" as prominent nav button (not hidden in Product dropdown)
- Add dedicated Studio section (Section 3, after Demo)
- Hero CTAs: "Try Studio" as primary teal, "View Docs" as secondary
- Improve headline to avoid widow, use "workflow engine" framing

### Sections to Remove

- "Two Ways to Use FloImg" (redundant with hero CTAs + Studio section)
- "Generators" (covered elsewhere, too esoteric for homepage)
- "Claude Code Callout" (too niche for homepage)

### Bug Fixes

- Dark mode broken in ShowcasePreview (light text on light background)
- H1 widow ("agents" on its own line)
- ImageShowcase links all go to /templates instead of specific categories

## Acceptance Criteria

- [ ] Dark mode works correctly in all sections
- [ ] H1 has no widow, uses "workflow engine" framing
- [ ] Hero showcase images link to category-filtered templates
- [ ] "Studio" button added to navigation (not hidden in dropdown)
- [ ] Dedicated Studio section added after Demo
- [ ] "Two Ways to Use", "Generators", "Claude Code" sections removed
- [ ] Features section streamlined (8 → 6 cards, 2x3 grid)
- [ ] Community sections merged (Showcase + Contributors)
- [ ] Visual variety improved with alternating section backgrounds
- [ ] All changes tested in both dark and light mode

## Implementation Notes

See plan file: `~/.claude/plans/idempotent-snacking-pillow.md`

New section order:

1. Hero (revised)
2. See It in Action (keep tabbed demo)
3. FloImg Studio (NEW)
4. Start with a Template (keep)
5. Why FloImg (streamlined)
6. Community (merged)
7. Get Started (simplified)

## Files to Modify

- `packages/frontend/src/pages/index.astro` - Main homepage
- `packages/frontend/src/layouts/MarketingLayout.astro` - Nav Studio button
- `packages/frontend/src/components/ShowcasePreview.astro` - Dark mode fix
- `packages/frontend/src/components/ImageShowcase.astro` - Category links
