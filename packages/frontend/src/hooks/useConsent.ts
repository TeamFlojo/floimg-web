/**
 * React hook for cookie consent state.
 *
 * Uses useSyncExternalStore for proper integration with the consent store.
 * Handles the anti-flicker pattern by tracking initialization state.
 */

import { useSyncExternalStore, useCallback, useState, useLayoutEffect } from "react";
import {
  type ConsentPreferences,
  initializeConsent,
  getConsentState,
  acceptAll as acceptAllFn,
  rejectAll as rejectAllFn,
  setPreferences as setPreferencesFn,
  resetConsent as resetConsentFn,
  subscribe,
  getConsentDate,
} from "../stores/consent";

interface UseConsentReturn {
  /** Whether the consent store has initialized (prevents banner flash) */
  isReady: boolean;
  /** Whether user has made a consent choice */
  hasInteracted: boolean;
  /** Current consent preferences */
  preferences: ConsentPreferences;
  /** Formatted date of consent */
  consentDate: string | null;
  /** Privacy policy version */
  version: string;
  /** Accept all consent categories */
  acceptAll: () => void;
  /** Reject all optional categories */
  rejectAll: () => void;
  /** Set custom preferences */
  setPreferences: (prefs: Partial<ConsentPreferences>) => void;
  /** Reset consent (re-show banner) */
  resetConsent: () => void;
  /** Whether the banner should be shown */
  shouldShowBanner: boolean;
}

// Server snapshot - default state for SSR
const getServerSnapshot = () => ({
  hasInteracted: false,
  preferences: { essential: true, analytics: false, marketing: false },
  timestamp: 0,
  version: "1.0",
});

export function useConsent(): UseConsentReturn {
  // Track if we've initialized on the client
  // Using lazy initializer to avoid the effect setState warning
  const [isReady, setIsReady] = useState(() => {
    // On server, not ready. On client, initialize immediately.
    if (typeof window === "undefined") return false;
    initializeConsent();
    return true;
  });

  // For SSR hydration - ensure initialization happens
  useLayoutEffect(() => {
    if (!isReady) {
      initializeConsent();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsReady(true);
    }
  }, [isReady]);

  // Subscribe to consent state changes
  const state = useSyncExternalStore(subscribe, getConsentState, getServerSnapshot);

  const acceptAll = useCallback(() => {
    acceptAllFn();
  }, []);

  const rejectAll = useCallback(() => {
    rejectAllFn();
  }, []);

  const setPreferences = useCallback((prefs: Partial<ConsentPreferences>) => {
    setPreferencesFn(prefs);
  }, []);

  const resetConsent = useCallback(() => {
    resetConsentFn();
  }, []);

  return {
    isReady,
    hasInteracted: state.hasInteracted,
    preferences: state.preferences,
    consentDate: getConsentDate(),
    version: state.version,
    acceptAll,
    rejectAll,
    setPreferences,
    resetConsent,
    shouldShowBanner: isReady && !state.hasInteracted,
  };
}
