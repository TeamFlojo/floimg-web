# PROJECT STATUS

**Last Updated**: 2026-01-09

## Current Focus

**T-2026-007: Homepage Redesign**

Redesigning homepage to create tighter narrative, fix dark mode bugs, improve visual variety, and make Studio more prominent. Reducing from 10 to 7 sections.

Progress:

- [x] Fix dark mode bug in ShowcasePreview
- [ ] Fix H1 widow + improve headline
- [ ] Fix ImageShowcase links
- [ ] Add Studio nav button
- [ ] Remove redundant sections
- [ ] Create Studio section
- [ ] Streamline features
- [ ] Merge community sections

## Just Completed

**T-2026-005: Convert Pages to SSR** (2026-01-03)

- Created `/showcase/[id].astro` SSR page with dynamic og:image, og:title
- Deleted legacy `/showcase/item.astro` and `/profile.astro`
- Updated internal links in showcase.astro and u/[username].astro
- PR #53 merged

**T-2025-004: GDPR Cookie Consent and Privacy Policy** (2025-12-31)

- Added Privacy Policy page at `/privacy`
- Added Cookie Settings page at `/cookie-settings`
- Added cookie consent banner with Accept All/Reject All/Customize
- Consent shares across subdomains via `Domain=.floimg.com`
- Umami analytics loads unconditionally (privacy-focused, no consent required)
- Documented architecture in `vault/architecture/Cookie-Consent-System.md`
- PR #42 merged

**T-2025-003: Homepage Link Audit** (2025-12-28)

- Added gallery links to 8 hero images and 3 demo images
- Added docs links to 6 generator cards and 8 feature cards
- All links have hover effects and cursor pointers
- PR #30 merged

**T-2025-002: Fix Code Example Indentation** (2025-12-28)

- Fixed homepage code examples displaying with incorrect leading whitespace
- Added prettier-ignore to preserve fix
- PR #29 merged

**T-2025-001: AI Provider Documentation and Branding** (2025-12-25)

- Added 5 new AI provider plugin docs (OpenAI, Stability, Replicate, Google, Ollama)
- Updated branding to "FloImg" across all documentation
- Fixed FloImg Studio docs to reference correct monorepo location
- PR #15 merged

## Deployment

Deployed via Coolify to Hetzner at `floimg.com`.

| Domain            | Service                                |
| ----------------- | -------------------------------------- |
| floimg.com        | Marketing, docs, auth pages            |
| studio.floimg.com | FloImg Studio Cloud (via floimg-cloud) |
| api.floimg.com    | API (via floimg-cloud)                 |

## Documentation Structure

```
docs/
├── getting-started/   # Quick start, concepts
├── sdk/               # TypeScript/JavaScript API
├── cli/               # Command-line usage
├── plugins/           # Generator documentation
│   ├── quickchart     # Chart.js charts
│   ├── mermaid        # Diagrams
│   ├── qr             # QR codes
│   ├── screenshot     # Web screenshots
│   ├── openai         # DALL-E + transforms
│   ├── stability      # SDXL/SD3 + transforms
│   ├── replicate      # AI transforms
│   ├── google         # Imagen
│   └── ollama         # Local AI
├── studio/            # FloImg Studio docs
├── mcp/               # MCP server integration
└── claude-code/       # Claude Code plugin
```

## Next Up

- **BUG-2026-001**: Fix README referencing private floimg-cloud repo
- Add more plugin documentation
- Improve getting started guides
- Add more examples and tutorials

## Blockers

- None

## Notes

- Open-source (MIT license)
- SSR site served by Node.js (Astro Node adapter)
- CI/CD via Coolify (auto-deploy on push)
