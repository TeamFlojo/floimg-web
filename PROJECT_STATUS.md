# PROJECT STATUS

**Last Updated**: 2025-12-31

## Current Focus

None - pending PR merge.

## Just Completed

**T-2025-004: GDPR Cookie Consent and Privacy Policy** (2025-12-31)

- Added Privacy Policy page at `/privacy`
- Added Cookie Settings page at `/cookie-settings`
- Added cookie consent banner with Accept All/Reject All/Customize
- Consent shares across subdomains via `Domain=.floimg.com`
- Umami analytics loads unconditionally (privacy-focused, no consent required)
- Documented architecture in `vault/architecture/Cookie-Consent-System.md`
- PR #42 pending review

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

- Add more plugin documentation
- Improve getting started guides
- Add more examples and tutorials

## Blockers

- None

## Notes

- Open-source (MIT license)
- Static site served by nginx
- CI/CD via Coolify (auto-deploy on push)
