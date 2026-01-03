# T-2026-005: Convert Pages to SSR

**Status**: DONE
**Created**: 2026-01-03
**Completed**: 2026-01-03
**Priority**: P2
**PR**: #53

## Summary

Convert appropriate floimg-web pages to SSR now that we have proper SSR support with the Node adapter Dockerfile.

## Background

We just fixed the floimg-web Dockerfile to properly support Astro's Node adapter for SSR. Currently only `/u/[username].astro` uses SSR. Other pages that display shareable content use query params and client-side fetching, which breaks social sharing previews (og:image, og:title).

## Changes Made

### 1. Created `/showcase/[id].astro` (SSR)

New SSR page for showcase item details with:

- Server-side data fetching from API
- Dynamic `og:image`, `og:title`, `og:description` for social sharing
- Client-side hydration for likes/comments interactivity

### 2. Deleted Legacy Pages

- Deleted `/showcase/item.astro` (legacy query param route)
- Deleted `/profile.astro` (duplicate of `/u/[username].astro`)

No redirects needed - internal links updated to use new patterns.

### 3. Updated Internal Links

- `showcase.astro`: `/showcase/item?id=X` → `/showcase/X`, `/profile?username=X` → `/u/X`
- `u/[username].astro`: `/showcase/item?id=X` → `/showcase/X`

## Files Modified

| File                        | Action                 |
| --------------------------- | ---------------------- |
| `pages/showcase/[id].astro` | Created - New SSR page |
| `pages/showcase/item.astro` | Deleted                |
| `pages/profile.astro`       | Deleted                |
| `pages/showcase.astro`      | Updated links          |
| `pages/u/[username].astro`  | Updated links          |

## Acceptance Criteria

- [x] `/showcase/[id]` renders with correct og:image, og:title, og:description
- [x] Likes/comments still work (client-side hydration)
- [x] `pnpm build` succeeds without SSR errors
- [x] Internal links throughout the site use new URL patterns
