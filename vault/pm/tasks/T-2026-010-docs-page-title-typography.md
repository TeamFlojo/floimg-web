# T-2026-010: Fix Docs Page Title Typography

**Status**: In Progress
**Created**: 2026-01-07
**Priority**: P2

## Summary

Fix the visual hierarchy of docs pages where page titles (h1) render at 16px instead of the expected 42px, making them smaller than section headings (h2).

## Background

Tailwind's CSS reset (`font-size: inherit; font-weight: inherit` on h1-h6) overrides Starlight's `@layer starlight.core` styles. The page title h1 (`#_top`) sits outside `.sl-markdown-content`, so it doesn't get the markdown content heading styles.

**Visual evidence:**
| Element | Expected | Actual |
|---------|----------|--------|
| Page title (h1#\_top) | 42px, weight 600 | 16px, weight 400 |
| Section heading (h2) | 35px | 35px (correct) |

## Implementation

Add explicit styles for `h1#_top` in `custom.css` using Starlight's CSS variables.

**File**: `packages/frontend/src/styles/custom.css`

## Acceptance Criteria

- [ ] Page title is visually larger than section headings
- [ ] Works in both light and dark modes
- [ ] Consistent across all docs pages

## Related

- Diagnosed via Chrome DevTools MCP
