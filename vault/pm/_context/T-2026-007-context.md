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

### In Progress

- [ ] Fix H1 widow + improve headline
- [ ] Fix ImageShowcase links

### Remaining

- [ ] Add Studio nav button
- [ ] Remove redundant sections
- [ ] Create Studio section
- [ ] Streamline features (8→6)
- [ ] Merge community sections
- [ ] Restructure hero CTAs
- [ ] Add visual variety
- [ ] Test dark/light modes

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
