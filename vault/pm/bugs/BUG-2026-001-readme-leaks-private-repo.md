---
tags: [type/bug]
status: backlog
priority: p1
created: 2026-01-09
updated: 2026-01-09
parent:
children: []
---

# Bug: README references private floimg-cloud repo

## Bug Details

- **Bug ID**: BUG-2026-001
- **Status**: backlog
- **Priority**: p1
- **Created**: 2026-01-09
- **Resolved**:

## Description

The README.md "Related Repos" section mentions `floimg-cloud (private) - Cloud API that powers gallery and auth`. This violates OSS context awareness principles - public repos must be self-contained and not reference private infrastructure.

External contributors seeing this:

1. Cannot access the referenced repo
2. May be confused about the architecture
3. Unnecessarily exposes internal infrastructure details

## Steps to Reproduce

1. Open README.md
2. Navigate to "Related Repos" section
3. Observe line referencing floimg-cloud (private)

## Expected Behavior

README should only reference publicly accessible repos that contributors can view and contribute to.

## Actual Behavior

README references a private repo with details about its purpose.

## Root Cause Analysis

Oversight when initially creating the README - internal documentation patterns were applied to a public-facing document.

## Fix

### Technical Approach

Remove the floimg-cloud line from the "Related Repos" section entirely.

### Files to Modify

- `README.md`

## Acceptance Criteria

- [ ] No references to floimg-cloud in README
- [ ] No references to private repos or internal infrastructure
- [ ] Related Repos section only lists public, accessible repos

## Progress Notes

### Work Log

- **2026-01-09**: Bug reported - OSS boundary violation identified
