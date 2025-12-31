/**
 * GDPR Cookie Consent Banner
 *
 * Shows a banner at the bottom of the viewport for users who haven't
 * made a consent choice. Uses anti-flicker pattern to avoid showing
 * the banner briefly during hydration.
 */

import { useState } from "react";
import { useConsent } from "../hooks/useConsent";

interface ConsentBannerProps {
  /** Optional: show customize dialog inline instead of linking to settings page */
  showInlineCustomize?: boolean;
}

export function ConsentBanner({ showInlineCustomize = false }: ConsentBannerProps) {
  const { shouldShowBanner, acceptAll, rejectAll, preferences, setPreferences } = useConsent();
  const [showCustomize, setShowCustomize] = useState(false);
  const [customPrefs, setCustomPrefs] = useState({
    analytics: false,
    marketing: false,
  });

  // Don't render anything until ready and if user has already interacted
  if (!shouldShowBanner) {
    return null;
  }

  const handleCustomize = () => {
    if (showInlineCustomize) {
      setCustomPrefs({
        analytics: preferences.analytics,
        marketing: preferences.marketing,
      });
      setShowCustomize(true);
    } else {
      // Navigate to cookie settings page
      window.location.href = "/cookie-settings";
    }
  };

  const handleSaveCustom = () => {
    setPreferences(customPrefs);
    setShowCustomize(false);
  };

  if (showCustomize && showInlineCustomize) {
    return (
      <div className="fixed bottom-0 inset-x-0 z-50 animate-slide-up">
        <div className="bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-700 shadow-lg">
          <div className="mx-auto max-w-4xl px-6 py-6">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
              Cookie Preferences
            </h3>

            <div className="space-y-4 mb-6">
              {/* Essential - Always On */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-zinc-900 dark:text-white">Essential Cookies</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Required for the website to function. Cannot be disabled.
                  </p>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={true}
                    disabled
                    className="h-4 w-4 rounded border-zinc-300 bg-zinc-100 cursor-not-allowed"
                  />
                  <span className="ml-2 text-sm text-zinc-400">Always on</span>
                </div>
              </div>

              {/* Analytics */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-zinc-900 dark:text-white">Analytics</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Help us understand how visitors use our site (Umami - privacy-focused).
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={customPrefs.analytics}
                    onChange={(e) =>
                      setCustomPrefs({ ...customPrefs, analytics: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-500 dark:peer-focus:ring-teal-600 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-zinc-600 peer-checked:bg-teal-600"></div>
                </label>
              </div>

              {/* Marketing */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-zinc-900 dark:text-white">Marketing</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Used for advertising and promotional purposes (not currently active).
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={customPrefs.marketing}
                    onChange={(e) =>
                      setCustomPrefs({ ...customPrefs, marketing: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-500 dark:peer-focus:ring-teal-600 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-zinc-600 peer-checked:bg-teal-600"></div>
                </label>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <button
                onClick={() => setShowCustomize(false)}
                className="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCustom}
                className="px-4 py-2 text-sm font-medium bg-teal-600 text-white rounded-lg hover:bg-teal-500 transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 animate-slide-up">
      <div className="bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-700 shadow-lg">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                We use cookies to improve your experience. By continuing, you agree to our{" "}
                <a href="/privacy" className="text-teal-600 dark:text-teal-400 hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={rejectAll}
                className="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-600 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                Reject All
              </button>
              <button
                onClick={handleCustomize}
                className="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-600 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                Customize
              </button>
              <button
                onClick={acceptAll}
                className="px-4 py-2 text-sm font-medium bg-teal-600 text-white rounded-lg hover:bg-teal-500 transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
