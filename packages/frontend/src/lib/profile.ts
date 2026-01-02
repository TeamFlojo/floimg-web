/**
 * Profile resolution logic for unified creator profiles.
 *
 * Profiles can come from:
 * 1. FSC users (have an account on FloImg Studio Cloud)
 * 2. GitHub contributors (contributed to floimg repo but no FSC account)
 *
 * The profile page at /u/[username] tries FSC first, then falls back to GitHub.
 */

import type { GitHubContributor } from "./github";
import { fetchContributors } from "./github";

const API_URL = import.meta.env.PUBLIC_API_URL || "https://api.floimg.com";

export interface FSCProfile {
  type: "fsc";
  user: {
    id: string;
    name: string | null;
    username: string;
    bio: string | null;
    avatarUrl: string | null;
    githubHandle: string | null;
    twitterHandle: string | null;
    blueskyHandle: string | null;
    instagramHandle: string | null;
    websiteUrl: string | null;
    isTeamMember: boolean;
    teamRole: string | null;
    createdAt: string;
  };
  stats: {
    publicProjects: number;
    publicWorkflows: number;
    publicImages: number;
    showcaseItems: number;
  };
}

export interface GitHubProfile {
  type: "github";
  contributor: GitHubContributor;
}

export type ProfileData = FSCProfile | GitHubProfile | null;

/**
 * Resolve a profile by username.
 *
 * First tries FSC API, then falls back to GitHub contributors.
 * Returns null if not found in either.
 */
export async function resolveProfile(username: string): Promise<ProfileData> {
  // 1. Try FSC user
  try {
    const response = await fetch(`${API_URL}/api/users/${username}`, {
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      return {
        type: "fsc",
        user: data.user,
        stats: data.stats,
      };
    }
  } catch (error) {
    console.error("Error fetching FSC profile:", error);
  }

  // 2. Try GitHub contributor (username might be GitHub handle)
  try {
    const contributors = await fetchContributors();
    const contributor = contributors.find((c) => c.login.toLowerCase() === username.toLowerCase());

    if (contributor) {
      return {
        type: "github",
        contributor,
      };
    }
  } catch (error) {
    console.error("Error fetching GitHub contributors:", error);
  }

  // 3. Not found
  return null;
}

/**
 * Check if a GitHub handle has an associated FSC account.
 * Returns the FSC username if found, null otherwise.
 */
export async function checkFSCAccountByGitHub(
  githubHandle: string
): Promise<{ found: boolean; username?: string }> {
  try {
    const response = await fetch(`${API_URL}/api/users/by-github/${githubHandle}`, {
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(`Error checking FSC account for ${githubHandle}:`, error);
  }

  return { found: false };
}

/**
 * Batch check multiple GitHub handles for FSC accounts.
 * Returns a map of github_handle -> fsc_username (or undefined if not found).
 */
export async function batchCheckFSCAccounts(
  githubHandles: string[]
): Promise<Map<string, string | undefined>> {
  const results = new Map<string, string | undefined>();

  // Check in parallel with a limit to avoid overwhelming the API
  const batchSize = 10;
  for (let i = 0; i < githubHandles.length; i += batchSize) {
    const batch = githubHandles.slice(i, i + batchSize);
    const checks = await Promise.all(
      batch.map(async (handle) => {
        const result = await checkFSCAccountByGitHub(handle);
        return { handle, username: result.found ? result.username : undefined };
      })
    );

    for (const check of checks) {
      results.set(check.handle, check.username);
    }
  }

  return results;
}

/**
 * Get social links for display.
 */
export function getSocialLinks(profile: FSCProfile["user"]) {
  const links: { platform: string; url: string; handle: string }[] = [];

  if (profile.githubHandle) {
    links.push({
      platform: "github",
      url: `https://github.com/${profile.githubHandle}`,
      handle: profile.githubHandle,
    });
  }

  if (profile.twitterHandle) {
    links.push({
      platform: "twitter",
      url: `https://x.com/${profile.twitterHandle}`,
      handle: profile.twitterHandle,
    });
  }

  if (profile.blueskyHandle) {
    links.push({
      platform: "bluesky",
      url: `https://bsky.app/profile/${profile.blueskyHandle}`,
      handle: profile.blueskyHandle,
    });
  }

  if (profile.instagramHandle) {
    links.push({
      platform: "instagram",
      url: `https://instagram.com/${profile.instagramHandle}`,
      handle: profile.instagramHandle,
    });
  }

  if (profile.websiteUrl) {
    const url = new URL(profile.websiteUrl);
    links.push({
      platform: "website",
      url: profile.websiteUrl,
      handle: url.hostname,
    });
  }

  return links;
}
