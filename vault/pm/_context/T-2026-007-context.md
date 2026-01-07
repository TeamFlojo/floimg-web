# Context: T-2026-007 Homepage Redesign

**Task**: [[T-2026-007-homepage-redesign]]
**Created**: 2026-01-06
**Status**: In Progress

## Overview

Major homepage refresh to improve narrative flow, fix bugs, and make Studio more prominent. Consolidating from 10 sections to 7 with tighter messaging.

## Key Decisions

- Studio will be prominent in nav (not hidden in Product dropdown) AND have dedicated section
- Hero CTA: "Try Studio" primary, "Read Docs" secondary
- Headline direction: Combo of transformation focus + workflow engine framing
- Remove Generators, Claude Code, Two Ways sections (too esoteric/redundant)
- ShowcasePreview stays always-dark (like TabbedDemo) - simpler than fighting CSS specificity

## Implementation Progress

### Completed

- [x] Fix dark mode bug in ShowcasePreview (made always-dark)
- [x] Fix H1 widow + improve headline ("The composable image workflow engine")
- [x] Restructure hero CTAs ("Try Studio" + "Read the Docs")
- [x] Fix ImageShowcase links (each category links to filtered templates)
- [x] Add Studio nav button
- [x] Remove redundant sections (Two Ways, Generators, Claude Code)
- [x] Create Studio section with screenshot
- [x] Streamline features (8→6 cards in 3x2 grid)
- [x] Merge community sections (ShowcasePreview + Contributor CTA)
- [x] Add visual variety (alternating backgrounds)
- [x] Fix light mode contrast issues

### Light Mode Fix Details

Root cause: Global `!important` rules in custom.css on h1-h6 were overriding all headings, including marketing pages. When OS is in dark mode, `@media (prefers-color-scheme: dark)` would apply dark text colors even when page was in light mode.

Solution:

1. Scoped heading color overrides to Starlight docs only (`.sl-markdown-content`, `.content-panel`)
2. Removed all `!important` from these rules
3. Fixed feature cards to use explicit `background: white` instead of `var(--sl-color-bg)`
4. Dark mode uses `:global(.dark)` class toggles, not CSS variables

## Design References

See UI/UX designer analysis in plan file.

Brand guidelines:

- Primary accent: Teal (teal-600 / #0D9488) for primary CTAs only
- One teal element per viewport
- Dark mode first (developers live in dark mode)

## Open Questions

None currently - plan approved.

## Notes

Using Chrome DevTools MCP to verify changes in real-time.
