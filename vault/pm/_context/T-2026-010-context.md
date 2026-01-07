# Context: T-2026-010 Fix Docs Page Title Typography

**Task**: [[T-2026-010-docs-page-title-typography]]
**Created**: 2026-01-07
**Status**: In Progress

## Overview

The page titles on FloImg docs (floimg.com/docs/\*) are rendering much too small, breaking visual hierarchy.

## Root Cause Analysis

Used Chrome DevTools MCP to diagnose:

1. **Page title h1#\_top**: 16px font-size, 400 font-weight
2. **Section heading h2**: 35px font-size, 400 font-weight

The `--sl-text-h1` CSS variable is correctly set to `2.625rem` (42px), but the actual computed style is 16px.

**Cause**: Tailwind's base CSS reset:

```css
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}
```

This overrides Starlight's `@layer starlight.core` styles. The h1#\_top page title is outside `.sl-markdown-content` so it doesn't benefit from the markdown content heading styles.

## Solution

Add explicit styles for `h1#_top` in custom.css to restore Starlight's intended typography.

## Key Decisions

- Use Starlight's CSS variables (--sl-text-h1, --sl-color-white) for consistency
- Target h1#\_top specifically rather than all h1 elements

## Next Steps

1. Add CSS fix to custom.css
2. Test in dev server
3. Verify light/dark mode
4. Commit and push
