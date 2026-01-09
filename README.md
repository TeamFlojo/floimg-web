# floimg-web

Public website for the FloImg ecosystem: marketing pages, documentation, and workflow gallery.

**Live site:** [floimg.com](https://floimg.com)

## Quick Start

### Native Development

```bash
# Prerequisites: Node.js 22+, pnpm 9+
pnpm install
pnpm dev              # Starts at localhost:5174
```

### Devcontainer (VS Code)

1. Open in VS Code
2. Click "Reopen in Container" when prompted
3. Run `pnpm install && pnpm dev`

## Project Structure

```
packages/
├── frontend/           # Main website
│   ├── src/
│   │   ├── pages/      # Route pages (/, /docs, /pricing, /templates)
│   │   ├── components/ # React components
│   │   ├── layouts/    # Page layouts (Marketing, Blog, Docs)
│   │   ├── content/    # MDX content for docs
│   │   └── styles/     # Global styles
│   └── public/         # Static assets
└── shared/             # TypeScript types

vault/                  # Documentation
├── architecture/       # Technical decisions
└── pm/                 # Project management
```

## Tech Stack

| Layer        | Technology        |
| ------------ | ----------------- |
| Framework    | React 19 + Vite   |
| Styling      | Tailwind CSS      |
| Routing      | React Router      |
| Server State | TanStack Query    |
| Client State | Zustand           |
| Docs         | Starlight (Astro) |

## Key Pages

| Route               | Purpose            |
| ------------------- | ------------------ |
| `/`                 | Marketing homepage |
| `/docs`             | Documentation hub  |
| `/pricing`          | Pricing tiers      |
| `/templates`        | Workflow gallery   |
| `/login`, `/signup` | Authentication     |
| `/dashboard`        | User dashboard     |

## Commands

```bash
pnpm dev          # Development server
pnpm build        # Production build
pnpm preview      # Preview production build
pnpm typecheck    # TypeScript validation
pnpm lint         # ESLint
pnpm format       # Prettier
```

## Environment Variables

Copy `.env.example` to `.env`:

```bash
VITE_API_URL=https://api.floimg.com   # API endpoint
VITE_STUDIO_URL=https://studio.floimg.com
```

## Deployment

Deployed via Coolify to Hetzner at [floimg.com](https://floimg.com).

See [DEPLOYMENT.md](./DEPLOYMENT.md) for details.

## API Integration

This site integrates with `api.floimg.com` for:

- Authentication (session cookies via `Domain=.floimg.com`)
- User dashboard data
- Workflow gallery

## Related Repos

| Repository                                    | Purpose                      |
| --------------------------------------------- | ---------------------------- |
| [FloImg](https://github.com/TeamFlojo/FloImg) | Core library + FloImg Studio |

## Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
- [vault/architecture/](./vault/architecture/) - Technical decisions
- [CLAUDE.md](./CLAUDE.md) - AI assistant context

## Contributing

1. Fork the repository
2. Create a feature branch (`feat/your-feature`)
3. Make your changes
4. Run `pnpm typecheck && pnpm lint`
5. Submit a pull request

## Contributors

<a href="https://github.com/teamflojo/floimg-web/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=teamflojo/floimg-web" />
</a>

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=teamflojo/floimg-web&type=Date)](https://star-history.com/#teamflojo/floimg-web&Date)
