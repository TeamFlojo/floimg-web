---
tags: [type/task]
status: in-progress
priority: p1
created: 2026-01-09
updated: 2026-01-09
parent:
children: []
epic:
---

# Task: Documentation Consistency Update

## Task Details

- **Task ID**: T-2026-011
- **Status**: in-progress
- **Priority**: p1
- **Created**: 2026-01-09
- **Completed**:

## Description

Update documentation across the site to ensure consistent messaging about FloImg's capabilities. Key improvements:

1. Add missing AI generator documentation (Google, Replicate, Ollama, xAI)
2. Add examples showing mixed workflows (AI generation + deterministic transforms)
3. Improve concepts.mdx with workflow type examples
4. Update feature descriptions on homepage

## Acceptance Criteria

- [x] Add AI generators to concepts.mdx
- [x] Add mixed workflow examples to concepts.mdx
- [x] Update installation.mdx with all AI generators
- [x] Update homepage feature cards
- [x] Update MCP docs to show complementary capabilities
- [x] Consolidate about.astro content
- [x] Update claude-code.astro content
- [x] Build passes (`pnpm build`)

## Files Changed

| File                | Change                                                            |
| ------------------- | ----------------------------------------------------------------- |
| `concepts.mdx`      | Added AI generators, workflow types table, mixed workflow example |
| `installation.mdx`  | Added missing AI generators                                       |
| `index.astro`       | Updated feature cards                                             |
| `about.astro`       | Consolidated content from 3 to 2 sections                         |
| `claude-code.astro` | Consolidated content from 3 to 2 sections                         |
| `mcp/index.mdx`     | Updated capability descriptions                                   |
| `faq.ts`            | Updated FAQ content                                               |

## Progress Notes

- **2026-01-09**: Initial updates to about.astro, claude-code.astro
- **2026-01-09**: Comprehensive updates to concepts.mdx, installation.mdx, index.astro, mcp/index.mdx

## Dependencies

- **Blocked By**: None
