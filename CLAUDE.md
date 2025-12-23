# floimg-web - Claude Code Quick Reference

Marketing website, documentation, and public gallery for FloImg.

## Project Overview

- **Type**: Open-source website
- **Stack**: React 19, Vite, Tailwind CSS
- **Packages**:
  - `packages/frontend` - Main website (marketing, docs, gallery)
  - `packages/shared` - TypeScript types

## Git Conventions

### Commits

- **No AI co-authorship**: Do not add `Co-Authored-By: Claude` or similar footers
- **Conventional style**: `type: description` (e.g., `feat: add pricing page`)

### Pull Requests

- **Always use PRs** - No direct pushes to main
- **Linear history** - Use "Rebase and merge" (not merge commits)
- **Branch naming**: `type/description` (e.g., `feat/add-docs`, `fix/mobile-nav`)

**Branch prefixes:** `feat/`, `fix/`, `chore/`, `refactor/`, `docs/`

## Quick Start

```bash
pnpm install          # Install dependencies
pnpm dev              # Run dev server
pnpm build            # Production build
pnpm typecheck        # TypeScript validation
```

## Key Pages

- `/` - Marketing home
- `/docs` - Documentation
- `/gallery` - Public image gallery
- `/pricing` - Pricing page
- `/login`, `/signup` - Auth pages

## Deployment

Deployed via Coolify to Hetzner at `floimg.com`.

Static files served by nginx. See `DEPLOYMENT.md` for details.

## API Integration

This site calls `api.floimg.com` for:

- Authentication (login/signup/OAuth)
- Gallery data
- User dashboard

Cross-origin cookies enabled via `Domain=.floimg.com`.
