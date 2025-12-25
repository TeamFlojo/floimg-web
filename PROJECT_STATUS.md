# PROJECT STATUS

**Last Updated**: 2025-12-25

## Current Focus

No active tasks. Use `/p [description]` to plan new work.

## Just Completed

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
