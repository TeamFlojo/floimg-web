# T-2025-003: Homepage Link Audit and Improvements

**Status**: IN PROGRESS
**Created**: 2025-12-28

## Summary

Add missing links to homepage elements that look interactive but don't navigate anywhere. This improves UX by allowing users to click images and cards to explore further.

## Deliverables

### ImageShowcase Component

- [ ] Wrap 8 hero images with `/gallery` links

### TabbedDemo Component

- [ ] Wrap 3 demo images with `/gallery` links

### Generator Cards

- [ ] Link 6 generator cards to their respective `/docs/plugins/{name}` pages

### Feature Cards

- [ ] Link 8 feature cards to relevant docs pages:
  - AI Image Generation → `/docs/plugins/openai`
  - LLM-Ready → `/docs/mcp`
  - Pipeline Engine → `/docs/getting-started/concepts`
  - Deterministic → `/docs/getting-started/concepts`
  - Charts & Diagrams → `/docs/plugins/quickchart`
  - QR & Barcodes → `/docs/plugins/qr`
  - Self-Hostable → `/docs/studio/self-hosting`
  - TypeScript First → `/docs/sdk/fluent`

## Files to Modify

- `packages/frontend/src/components/ImageShowcase.astro`
- `packages/frontend/src/components/TabbedDemo.astro`
- `packages/frontend/src/pages/index.astro`

## PR

(pending)
