/**
 * Cookie Settings Manager Component
 *
 * Allows users to view and modify their cookie preferences.
 * Shows current consent status and provides toggle controls.
 */

import { useConsent } from "../hooks/useConsent";

export function CookieSettingsManager() {
  const {
    isReady,
    hasInteracted,
    preferences,
    consentDate,
    setPreferences,
    acceptAll,
    rejectAll,
    resetConsent,
  } = useConsent();

  if (!isReady) {
    return (
      <div className="animate-pulse">
        <div className="h-64 bg-zinc-200 dark:bg-zinc-800 rounded-lg"></div>
      </div>
    );
  }

  const handleToggle = (category: "analytics" | "marketing") => {
    setPreferences({ [category]: !preferences[category] });
  };

  return (
    <div className="space-y-6">
      {/* Status Banner */}
      {hasInteracted ? (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <div>
              <p className="font-medium text-emerald-900 dark:text-emerald-100">
                Preferences Saved
              </p>
              <p className="text-sm text-emerald-700 dark:text-emerald-300">
                Your cookie preferences were last updated on {consentDate}.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div>
              <p className="font-medium text-amber-900 dark:text-amber-100">No Preferences Set</p>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                Please make a selection below to save your cookie preferences.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Preference Controls */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg divide-y divide-zinc-200 dark:divide-zinc-700">
        {/* Essential - Always On */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex-1 pr-4">
            <p className="font-medium text-zinc-900 dark:text-white">Essential Cookies</p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Required for the website to function properly. Cannot be disabled.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-400">Always on</span>
            <div className="w-11 h-6 bg-teal-600 rounded-full relative cursor-not-allowed opacity-60">
              <div className="absolute top-[2px] right-[2px] bg-white w-5 h-5 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Analytics */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex-1 pr-4">
            <p className="font-medium text-zinc-900 dark:text-white">Analytics</p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Help us understand how visitors use our site using Umami (privacy-focused, no personal
              data collected).
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={preferences.analytics}
              onChange={() => handleToggle("analytics")}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-500 dark:peer-focus:ring-teal-600 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-zinc-600 peer-checked:bg-teal-600"></div>
          </label>
        </div>

        {/* Marketing */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex-1 pr-4">
            <p className="font-medium text-zinc-900 dark:text-white">Marketing</p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Used for advertising and promotional purposes. Not currently active.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={preferences.marketing}
              onChange={() => handleToggle("marketing")}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-500 dark:peer-focus:ring-teal-600 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-zinc-600 peer-checked:bg-teal-600"></div>
          </label>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={acceptAll}
          className="flex-1 px-4 py-2 text-sm font-medium bg-teal-600 text-white rounded-lg hover:bg-teal-500 transition-colors"
        >
          Accept All
        </button>
        <button
          onClick={rejectAll}
          className="flex-1 px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-600 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
        >
          Reject All Optional
        </button>
        {hasInteracted && (
          <button
            onClick={resetConsent}
            className="px-4 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
