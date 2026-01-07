# T-2026-006: Fix Docs Branding

**Status**: DONE
**Created**: 2026-01-06
**Completed**: 2026-01-06
**Priority**: P2
**PR**: #61 (merged)

## Summary

Fix branding inconsistencies where "floimg" appears instead of "FloImg" in docs, and add "FloImg Docs" logo to distinguish documentation pages.

## Background

Per the FloImg Glossary, the product name is "FloImg" (capital I), not "floimg" in marketing and documentation contexts. Several docs pages use lowercase which violates brand guidelines.

Additionally, docs pages lack visual distinction from marketing pages - users requested a "Docs" indicator in the header.

## Planned Changes

### 1. Fix Logo SVGs

- `logo-light.svg`: "floimg" → "FloImg"
- `logo-dark.svg`: "floimg" → "FloImg"

### 2. Create Docs-Specific Logos

- New `logo-docs-light.svg` with "FloImg Docs" text
- New `logo-docs-dark.svg` with "FloImg Docs" text

### 3. Update Starlight Config

- `astro.config.mjs`: title 'floimg' → 'FloImg'
- Update logo config to use docs-specific logos

### 4. Fix Docs Content

- `docs/cli/index.mdx`: Fix lowercase "floimg" in description and prose
- `docs/claude-code/index.mdx`: Fix lowercase "floimg" references
- `docs/claude-code/commands.mdx`: Fix lowercase "floimg" in description

## Acceptance Criteria

- [ ] Logo SVGs display "FloImg" (capital I)
- [ ] Docs pages show "FloImg Docs" in header logo
- [ ] Browser tab shows "FloImg" not "floimg" for docs
- [ ] Docs prose uses "FloImg" consistently (not "floimg")
- [ ] Code examples and config file references remain lowercase (correct)
