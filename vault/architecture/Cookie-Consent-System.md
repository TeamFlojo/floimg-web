# Cookie Consent System

Technical documentation for the GDPR-compliant cookie consent implementation.

## Overview

FloImg implements a cookie consent system that:

- Provides transparency about data collection via Privacy Policy and Cookie Settings pages
- Prepares infrastructure for future marketing trackers that require consent
- Shares consent state across all FloImg subdomains (floimg.com, studio.floimg.com)

## Architecture

### Consent Categories

| Category      | Requires Consent? | Current Usage                                |
| ------------- | ----------------- | -------------------------------------------- |
| **Essential** | No (always on)    | Session cookies, consent preference storage  |
| **Analytics** | No                | Umami (privacy-focused, cookieless)          |
| **Marketing** | Yes               | Not currently used; ready for future GTM/ads |

### Why Umami Doesn't Need Consent

Umami is specifically designed to be GDPR-compliant without consent:

- **No cookies** - Doesn't store anything on user devices
- **No personal data** - Hashes IP addresses, no user profiles
- **Aggregated only** - Collects anonymous statistics
- **Self-hosted** - Data stays on our infrastructure

The ePrivacy Directive requires consent for storing/accessing data on user devices. Since Umami doesn't do this, it loads unconditionally.

**Benefit**: We get analytics on 100% of visitors vs ~30-40% who typically accept consent banners.

### Cross-Subdomain Consent Sharing

Consent is stored in a cookie with `Domain=.floimg.com`, making it accessible across:

- `floimg.com` (marketing site)
- `studio.floimg.com` (FloImg Studio Cloud)
- `api.floimg.com` (API)

This uses the same pattern as our session cookie.

## Implementation

### Files

```
packages/frontend/src/
├── stores/consent.ts          # Core consent logic (vanilla TS)
├── hooks/useConsent.ts        # React hook wrapper
├── components/
│   ├── ConsentBanner.tsx      # Cookie consent banner
│   └── CookieSettingsManager.tsx  # Settings page controls
└── pages/
    ├── privacy.astro          # Privacy Policy
    └── cookie-settings.astro  # Cookie preferences page
```

### Consent State Structure

```typescript
interface ConsentState {
  hasInteracted: boolean; // User made a choice
  preferences: {
    essential: boolean; // Always true
    analytics: boolean; // For future gated analytics
    marketing: boolean; // For GTM, ads, etc.
  };
  timestamp: number; // When consent was given
  version: string; // Policy version (for re-consent)
}
```

### Cookie Details

| Cookie           | Purpose                    | Duration | Domain        |
| ---------------- | -------------------------- | -------- | ------------- |
| `floimg_consent` | Stores consent preferences | 1 year   | `.floimg.com` |
| `floimg_session` | Authentication session     | 30 days  | `.floimg.com` |

### Anti-Flicker Pattern

The banner uses an `isReady` flag to prevent flash during hydration:

```typescript
const { isReady, shouldShowBanner } = useConsent();

// Don't render until store is initialized
if (!shouldShowBanner) return null;
```

## Future: Adding Marketing Trackers

When adding GTM, Google Ads, or similar:

1. **Check consent before loading**:

```typescript
import { hasConsent } from "../stores/consent";

if (hasConsent("marketing")) {
  // Load GTM, Facebook Pixel, etc.
}
```

2. **Listen for consent changes**:

```typescript
window.addEventListener("consent-updated", (e) => {
  if (e.detail.marketing) {
    // Initialize marketing scripts
  }
});
```

3. **Update Privacy Policy** with new tracking details

4. **Increment version** in consent store to trigger re-consent

## OSS Considerations

This consent system is specific to FloImg's cloud services (floimg.com, studio.floimg.com). The self-hosted OSS version of FloImg Studio does NOT include this infrastructure - self-hosters are responsible for their own GDPR compliance.

## Related Documentation

- [Privacy Policy](/privacy) - User-facing privacy documentation
- [Cookie Settings](/cookie-settings) - User preference management
