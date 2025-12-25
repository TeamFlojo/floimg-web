# T-2025-001: AI Provider Documentation and Branding

**Status**: COMPLETE
**Created**: 2025-12-25
**Completed**: 2025-12-25

## Summary

Add comprehensive AI provider plugin documentation and fix branding consistency across all docs.

## Deliverables

### New Plugin Documentation

- [x] `docs/plugins/openai.mdx` - DALL-E generation + edit/variations transforms
- [x] `docs/plugins/stability.mdx` - SDXL/SD3 generation + 4 AI transforms
- [x] `docs/plugins/replicate.mdx` - faceRestore, colorize, realEsrgan, fluxEdit
- [x] `docs/plugins/google.mdx` - Google Imagen generation
- [x] `docs/plugins/ollama.mdx` - Local AI with LLaVA and Llama

### Branding Updates

- [x] Updated 15+ .mdx files with "FloImg" branding (proper case in prose)
- [x] Keep "floimg" for npm packages, CLI commands, code references
- [x] Consistent "FloImg Studio" naming

### Bug Fixes

- [x] Fixed FloImg Studio self-hosting docs to reference correct repo
  - Was: `git clone floimg-studio.git`
  - Now: `git clone floimg.git` + `pnpm dev:studio`

## PR

https://github.com/TeamFlojo/floimg-web/pull/15 (merged)
