# T-2025-004: GDPR Cookie Consent and Privacy Policy

**Status**: COMPLETE
**Created**: 2025-12-31
**Completed**: 2025-12-31
**PR**: https://github.com/TeamFlojo/floimg-web/pull/42

## Summary

Implement GDPR-compliant cookie consent for floimg.com. This includes a privacy policy page, cookie consent banner, and cookie settings page for users to manage their preferences.

FloImg uses Umami for privacy-focused analytics (cookieless) and essential session cookies for authentication. This implementation provides transparency and user control over tracking.

## Why This Matters

- **Transparency**: Users deserve to know what data we collect
- **Compliance**: GDPR requires explicit consent for non-essential tracking
- **Trust**: A clear privacy stance builds user confidence
- **Future-ready**: Infrastructure for when/if we add marketing trackers

## Consent Categories

| Category  | Description          | Examples                | Required?       |
| --------- | -------------------- | ----------------------- | --------------- |
| Essential | Required for service | Session cookies         | Yes (always on) |
| Analytics | Usage tracking       | Umami analytics         | Optional        |
| Marketing | Advertising          | Future: GTM, Google Ads | Optional        |

## Deliverables

### Phase 1: Privacy Policy

- [x] Create `/privacy` page with privacy policy content
- [x] Add "Privacy Policy" link to footer
- [x] Reference privacy policy from Terms of Service

### Phase 2: Consent Infrastructure

- [x] Create consent store with:
  - Vanilla TypeScript store (no Zustand needed)
  - Cross-subdomain cookie utilities (`Domain=.floimg.com`)
  - React hooks for consent access (`useConsent`)
  - TypeScript types

### Phase 3: Cookie Banner

- [x] Create `ConsentBanner` component
  - Fixed to bottom of viewport
  - Three actions: Accept All, Reject All, Customize
  - Anti-flicker pattern (don't show until hydration complete)
- [x] Create inline customize dialog for custom preferences
- [x] Integrate banner into MarketingLayout.astro

### Phase 4: Cookie Settings Page

- [x] Create `/cookie-settings` page
- [x] Show current consent status
- [x] Allow granular preference changes
- [x] Add link in footer

### Phase 5: Analytics Gating

- [x] **Decision: Umami loads unconditionally**
  - Umami is cookieless and doesn't collect PII
  - No legal requirement for consent
  - Benefit: Analytics on 100% of visitors vs ~30-40% who accept consent
  - Consent infrastructure ready for future marketing trackers that DO need consent

## Technical Notes

### Cross-Subdomain Consent

Consent cookie uses `Domain=.floimg.com` so preferences set on floimg.com also apply to studio.floimg.com.

```typescript
// Cookie structure
{
  hasInteracted: boolean,
  preferences: { essential: true, analytics: boolean, marketing: boolean },
  timestamp: number,
  version: string
}
```

### Anti-Flicker Pattern

The banner uses an `isReady` flag via `useState` lazy initializer. Banner only renders when `shouldShowBanner` is true (isReady && !hasInteracted).

### Files Created

- `packages/frontend/src/stores/consent.ts` - Core consent logic
- `packages/frontend/src/hooks/useConsent.ts` - React hook
- `packages/frontend/src/components/ConsentBanner.tsx` - Banner UI
- `packages/frontend/src/components/CookieSettingsManager.tsx` - Settings controls
- `packages/frontend/src/pages/privacy.astro` - Privacy Policy
- `packages/frontend/src/pages/cookie-settings.astro` - Cookie Settings
- `vault/architecture/Cookie-Consent-System.md` - Technical documentation

### Files Modified

- `packages/frontend/src/layouts/MarketingLayout.astro` - Add banner, footer link
- `packages/frontend/src/pages/terms.astro` - Reference privacy policy
- `packages/frontend/src/styles/custom.css` - Add slide-up animation

## Acceptance Criteria

- [x] Privacy policy page is accessible at `/privacy`
- [x] Cookie banner appears for new visitors
- [x] Users can accept all, reject all, or customize
- [x] Preferences persist across sessions and subdomains
- [x] Cookie settings page allows changing preferences
- [x] Umami loads unconditionally (privacy-focused, no consent required)
- [x] No banner flash on subsequent page loads
