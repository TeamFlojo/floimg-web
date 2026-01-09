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

# Task: Align Value Proposition Messaging Across Site

## Task Details

- **Task ID**: T-2026-011
- **Status**: in-progress
- **Priority**: p1
- **Created**: 2026-01-09
- **Completed**:

## Description

FloImg's value proposition was reframed from "Three Problems We Solve" to two core concepts:

1. **Deterministic Transforms** - Precise, repeatable image operations
2. **A Unified API** - Composable pipelines across SDK, CLI, Studio, MCP

This task ensures consistent messaging across the site, with special emphasis on the **composability story**: FloImg lets you mix AI generation with deterministic transforms in the same pipeline.

### Key Messaging Principle

The power isn't just "deterministic" OR "AI" - it's **composing both together**:

- Purely AI workflows (generate → refine → variations)
- Purely practical workflows (resize → caption → upload)
- **Mixed workflows** (AI generate → deterministic resize → caption → S3)

### Messaging Guidelines

- **Be factual**: Don't claim competitors can't do things (Adobe has AI in Photoshop now)
- **Focus on our approach**: Composable, API-first, functional model (image → image)
- **Frame for the user**: "What does this do for me?" not technical differentiators
- **Show, don't just tell**: Examples of mixed workflows are more powerful than claims

## Acceptance Criteria

### Already Completed

- [x] Consolidate about.astro from 3 problems to 2
- [x] Consolidate claude-code.astro from 3 problems to 2
- [x] Update docs/claude-code/index.mdx with 2-point framing
- [x] Update vault/Glossary.md terminology

### Audit & Fixes (Completed)

#### Critical

- [x] **concepts.mdx**: Add AI generators (OpenAI, Stability, Google, Replicate, Ollama, xAI)
- [x] **concepts.mdx**: Remove "Unlike AI image generation" comparative framing
- [x] **concepts.mdx**: Add mixed workflow example (AI generate → transform → save)

#### High Priority

- [x] **faq.ts**: Reframe "What can FloImg do that AI generators can't?" to composability focus
- [x] **mcp/index.mdx**: Replace vs-table with complementary framing
- [x] **about.astro**: Fix "problems that AI image tools can't solve alone"

#### Medium Priority

- [x] **index.astro**: Update feature descriptions to show composition
- [x] **installation.mdx**: Add missing AI generators (Google, Replicate, Ollama, xAI)

#### Verification

- [x] Build passes
- [x] No "X can't do Y" competitive claims remain
- [x] Composability message clear on key pages

## Implementation Details

### Audit Findings (14 issues across 6 files)

| File               | Priority | Issues Found                                                 |
| ------------------ | -------- | ------------------------------------------------------------ |
| `concepts.mdx`     | Critical | Missing AI generators, "Unlike AI" framing, no mixed example |
| `faq.ts`           | High     | "What can FloImg do that AI generators can't?"               |
| `mcp/index.mdx`    | High     | Comparison table positions FloImg vs AI                      |
| `about.astro`      | High     | Line 40: "problems AI tools can't solve alone"               |
| `index.astro`      | Medium   | Features treated as separate, not composed                   |
| `installation.mdx` | Medium   | Missing 4 AI generators                                      |

### Specific Text to Fix

**Competitive claims to remove:**

- "What can FloImg do that AI generators can't?" (faq.ts:130)
- "Unlike AI image generation..." (concepts.mdx:104)
- "problems that AI image tools can't solve alone" (about.astro:40)

**Contrast framing to reframe:**

- MCP table showing FloImg beating AI on every row (mcp/index.mdx:22-27)

### Three Workflow Types (add where missing)

```
| Workflow Type | Example |
|---------------|---------|
| AI + Professional | Generate with DALL-E → resize → caption → S3 |
| Purely Creative | AI generate → AI refine → variations |
| Purely Practical | Chart → resize → format convert → CDN |
```

### Composition Framing (use this language)

Good:

- "Mix AI generation with deterministic transforms in one pipeline"
- "Generate creatively, transform precisely"
- "Composable pipelines that handle any combination"

Avoid:

- "Better than X" or "X can't do Y" (competitive claims)
- "Three problems we solve" (old framing)
- Positioning FloImg _vs_ AI (we complement AI, not compete)

## Dependencies

- **Blocked By**: None
- **Related Tasks**: Builds on homepage redesign (T-2026-007)

## Progress Notes

### Work Log

- **2026-01-09**: Completed initial consolidation (3→2 problems) in about.astro, claude-code.astro, docs/claude-code/index.mdx, Glossary.md
- **2026-01-09**: Audit identified remaining gaps in concepts.mdx, index.astro, mcp/index.mdx

## Review Checklist

- [ ] Build passes (`pnpm build`)
- [ ] No "Three Problems" language remains
- [ ] No outdated competitive claims
- [ ] Composability message clear on key pages
- [ ] Examples show mixed AI + deterministic workflows
