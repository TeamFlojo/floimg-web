# Context: BUG-2026-001 README leaks private repo

**Bug**: [[BUG-2026-001-readme-leaks-private-repo]]
**Created**: 2026-01-09
**Status**: Planning

## Overview

The floimg-web README incorrectly references `floimg-cloud (private)` in the Related Repos section. This is a simple one-line fix but represents an important principle: public repos must be completely self-contained without references to private infrastructure.

## The Fix

Remove line 38 from README.md:

```
- floimg-cloud (private) - Cloud API that powers gallery and auth
```

The Related Repos section should only list:

- floimg - Core library
- floimg-studio - Visual builder (if public)

## OSS Context Principle

From CLAUDE.md:

> **Public repos must be self-contained.** External contributors cannot see private repos.

This bug demonstrates why this rule exists - it's confusing and unhelpful to reference repos that contributors can't access.

## Next Steps

1. Run `/s BUG-2026-001` to start work
2. Edit README.md to remove the line
3. Submit PR (floimg-web is public, requires PR)
