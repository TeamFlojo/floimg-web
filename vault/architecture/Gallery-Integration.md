# Gallery Integration

floimg-web provides a public gallery that showcases floimg capabilities and links to floimg-studio.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                   floimg-web Gallery                             │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ Template Metadata                                            │ │
│  │ - id, name, description, category, generator, tags          │ │
│  │ - Stored in src/data/templates.ts                           │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                              │                                    │
│                              │ "Open in Studio" link              │
│                              ▼                                    │
└─────────────────────────────────────────────────────────────────┘
                               │
                               │ URL: studio.floimg.com/?template=<id>
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                   floimg-studio                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ Full Template Data                                           │ │
│  │ - id, name, description, category, generator, tags          │ │
│  │ - workflow: { nodes, edges }                                 │ │
│  │ - Stored in src/templates/                                   │ │
│  └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## Data Separation

Template data is intentionally split between repositories:

| Repository | Data | Purpose |
|------------|------|---------|
| floimg-web | Metadata only (id, name, description) | Gallery display |
| floimg-studio | Full workflow (nodes, edges) | Execution |

This separation exists because:
1. floimg-web is statically built - cannot fetch from Studio API at build time
2. floimg-web only needs display metadata, not executable workflows
3. Template IDs must match across repos for "Open in Studio" to work

## Template Schema (floimg-web)

```typescript
interface GalleryTemplate {
  id: string;           // Must match floimg-studio template ID
  name: string;
  description: string;
  category: string;     // "Charts" | "Diagrams" | "QR Codes" | "Pipelines"
  generator: string;    // "quickchart" | "mermaid" | "qr"
  tags?: string[];
}
```

## Key Files

| File | Purpose |
|------|---------|
| `src/data/templates.ts` | Template metadata for gallery |
| `src/pages/gallery.astro` | Gallery page rendering |

## Adding Templates

When adding a new template:

1. Create the template in floimg-studio:
   - Add `packages/frontend/src/templates/<name>.ts`
   - Export from `packages/frontend/src/templates/index.ts`

2. Add metadata to floimg-web:
   - Add entry to `packages/frontend/src/data/templates.ts`
   - Use the same `id` as floimg-studio

3. Verify:
   - Gallery shows the new template
   - "Open in Studio" link loads the correct workflow

## URL Scheme

Gallery items link to Studio with the template ID:

```
https://studio.floimg.com/?template=<template-id>
```

Studio parses this URL parameter on load and applies the matching template to the workflow editor.
