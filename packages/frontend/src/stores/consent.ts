/**
 * Cookie consent store for GDPR compliance.
 *
 * Uses cross-subdomain cookies (Domain=.floimg.com) so consent given
 * on floimg.com also applies to studio.floimg.com.
 *
 * Categories:
 * - essential: Always true, required for site functionality
 * - analytics: Umami analytics (optional)
 * - marketing: Future GTM, ads (optional)
 */

// --- Types ---

export interface ConsentPreferences {
  essential: boolean; // Always true
  analytics: boolean;
  marketing: boolean;
}

export interface ConsentState {
  hasInteracted: boolean;
  preferences: ConsentPreferences;
  timestamp: number;
  version: string;
}

// --- Constants ---

const COOKIE_NAME = "floimg_consent";
const COOKIE_DOMAIN = ".floimg.com";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year
const STORAGE_KEY = "floimg_consent";
const CURRENT_VERSION = "1.0";

const DEFAULT_PREFERENCES: ConsentPreferences = {
  essential: true,
  analytics: false,
  marketing: false,
};

const DEFAULT_STATE: ConsentState = {
  hasInteracted: false,
  preferences: DEFAULT_PREFERENCES,
  timestamp: 0,
  version: CURRENT_VERSION,
};

// --- Cookie Utilities ---

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split("=");
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}

function setCookie(name: string, value: string, maxAge: number): void {
  if (typeof document === "undefined") return;

  // Use .floimg.com domain in production, omit in development
  const isProduction =
    typeof window !== "undefined" && window.location.hostname.endsWith("floimg.com");
  const domain = isProduction ? `Domain=${COOKIE_DOMAIN}; ` : "";

  document.cookie =
    `${name}=${encodeURIComponent(value)}; ` +
    `${domain}` +
    `Path=/; ` +
    `Max-Age=${maxAge}; ` +
    `SameSite=Lax; ` +
    `Secure`;
}

function deleteCookie(name: string): void {
  if (typeof document === "undefined") return;

  const isProduction =
    typeof window !== "undefined" && window.location.hostname.endsWith("floimg.com");
  const domain = isProduction ? `Domain=${COOKIE_DOMAIN}; ` : "";

  document.cookie = `${name}=; ${domain}Path=/; Max-Age=0`;
}

// --- Storage Utilities ---

function getFromStorage(): ConsentState | null {
  if (typeof localStorage === "undefined") return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as ConsentState;
    }
  } catch {
    // Ignore parse errors
  }
  return null;
}

function setToStorage(state: ConsentState): void {
  if (typeof localStorage === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage errors (e.g., private browsing)
  }
}

// --- State Management ---

type Listener = (state: ConsentState) => void;
const listeners = new Set<Listener>();

let currentState: ConsentState = DEFAULT_STATE;
let isInitialized = false;

/**
 * Initialize consent state from cookie/localStorage.
 * Call this once on app load.
 */
export function initializeConsent(): ConsentState {
  if (typeof window === "undefined") {
    return DEFAULT_STATE;
  }

  if (isInitialized) {
    return currentState;
  }

  // Try cookie first (authoritative for cross-subdomain)
  const cookieValue = getCookie(COOKIE_NAME);
  if (cookieValue) {
    try {
      const parsed = JSON.parse(cookieValue) as ConsentState;
      // Ensure essential is always true
      parsed.preferences.essential = true;
      currentState = parsed;
      isInitialized = true;
      // Sync to localStorage as cache
      setToStorage(currentState);
      return currentState;
    } catch {
      // Invalid cookie, continue to localStorage
    }
  }

  // Fall back to localStorage
  const stored = getFromStorage();
  if (stored) {
    stored.preferences.essential = true;
    currentState = stored;
    isInitialized = true;
    // Sync to cookie
    setCookie(COOKIE_NAME, JSON.stringify(currentState), COOKIE_MAX_AGE);
    return currentState;
  }

  isInitialized = true;
  return currentState;
}

/**
 * Get current consent state.
 */
export function getConsentState(): ConsentState {
  if (!isInitialized) {
    return initializeConsent();
  }
  return currentState;
}

/**
 * Check if user has interacted with consent banner.
 */
export function hasUserInteracted(): boolean {
  return getConsentState().hasInteracted;
}

/**
 * Check if a specific consent category is enabled.
 */
export function hasConsent(category: keyof ConsentPreferences): boolean {
  return getConsentState().preferences[category];
}

/**
 * Update consent state and persist.
 */
function updateState(newState: ConsentState): void {
  // Ensure essential is always true
  newState.preferences.essential = true;
  currentState = newState;

  // Persist to both cookie and localStorage
  setCookie(COOKIE_NAME, JSON.stringify(currentState), COOKIE_MAX_AGE);
  setToStorage(currentState);

  // Notify listeners
  listeners.forEach((listener) => listener(currentState));

  // Dispatch custom event for analytics components
  if (typeof window !== "undefined") {
    // eslint-disable-next-line no-undef
    window.dispatchEvent(new CustomEvent("consent-updated", { detail: currentState.preferences }));
  }
}

/**
 * Accept all consent categories.
 */
export function acceptAll(): void {
  updateState({
    hasInteracted: true,
    preferences: {
      essential: true,
      analytics: true,
      marketing: true,
    },
    timestamp: Date.now(),
    version: CURRENT_VERSION,
  });
}

/**
 * Reject all optional consent categories.
 */
export function rejectAll(): void {
  updateState({
    hasInteracted: true,
    preferences: {
      essential: true,
      analytics: false,
      marketing: false,
    },
    timestamp: Date.now(),
    version: CURRENT_VERSION,
  });
}

/**
 * Set custom consent preferences.
 */
export function setPreferences(preferences: Partial<ConsentPreferences>): void {
  const current = getConsentState();
  updateState({
    hasInteracted: true,
    preferences: {
      essential: true, // Always true
      analytics: preferences.analytics ?? current.preferences.analytics,
      marketing: preferences.marketing ?? current.preferences.marketing,
    },
    timestamp: Date.now(),
    version: CURRENT_VERSION,
  });
}

/**
 * Reset consent (for testing or user request).
 */
export function resetConsent(): void {
  deleteCookie(COOKIE_NAME);
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
  currentState = DEFAULT_STATE;
  isInitialized = false;
  listeners.forEach((listener) => listener(currentState));
}

/**
 * Subscribe to consent state changes.
 */
export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * Get formatted consent date.
 */
export function getConsentDate(): string | null {
  const state = getConsentState();
  if (!state.hasInteracted || !state.timestamp) return null;

  return new Date(state.timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
