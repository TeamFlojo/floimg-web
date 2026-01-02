/**
 * Changelog Parser
 *
 * Parses CHANGELOG.md files in Keep a Changelog format.
 * Extracts releases, packages, and changes.
 *
 * Fetches from GitHub raw URLs in production for reliability.
 * Falls back to filesystem paths in local development.
 */

// Public URLs for changelog data
const FLOIMG_CHANGELOG_URL = "https://raw.githubusercontent.com/TeamFlojo/FloImg/main/CHANGELOG.md";
const FSC_CHANGELOG_API = "https://api.floimg.com/api/changelog";

/**
 * Fetch FloImg OSS changelog from GitHub
 */
export async function fetchFloimgChangelog(): Promise<string> {
  try {
    const response = await fetch(FLOIMG_CHANGELOG_URL, {
      headers: { "User-Agent": "floimg-web" },
    });
    if (response.ok) {
      return await response.text();
    }
  } catch {
    // GitHub fetch failed
  }
  return "";
}

/**
 * Fetch FSC changelog from API
 * Returns empty string if API unavailable - graceful degradation
 */
export async function fetchCloudChangelog(): Promise<string> {
  try {
    const response = await fetch(FSC_CHANGELOG_API, {
      headers: { "User-Agent": "floimg-web" },
    });
    if (response.ok) {
      return await response.text();
    }
  } catch {
    // API unavailable - graceful degradation
  }
  return "";
}

export interface ChangeEntry {
  type: "feat" | "fix" | "breaking" | "docs" | "chore" | "other";
  description: string;
}

export interface PackageChanges {
  name: string;
  version: string;
  changes: ChangeEntry[];
}

export interface ChangelogRelease {
  version: string;
  date: string;
  packages: PackageChanges[];
  sections: SectionChanges[];
  category: "SDK" | "Studio" | "Repository";
}

export interface SectionChanges {
  name: string; // e.g., "Added", "Fixed", "Changed", "Repository"
  items: ChangeEntry[];
}

/**
 * Determine change type from description prefix
 */
function parseChangeType(description: string): { type: ChangeEntry["type"]; text: string } {
  const trimmed = description.trim();

  // Check for conventional commit prefixes
  if (trimmed.startsWith("feat:") || trimmed.startsWith("feat(")) {
    return { type: "feat", text: trimmed.replace(/^feat(\([^)]+\))?:\s*/, "") };
  }
  if (trimmed.startsWith("fix:") || trimmed.startsWith("fix(")) {
    return { type: "fix", text: trimmed.replace(/^fix(\([^)]+\))?:\s*/, "") };
  }
  if (trimmed.startsWith("docs:") || trimmed.startsWith("docs(")) {
    return { type: "docs", text: trimmed.replace(/^docs(\([^)]+\))?:\s*/, "") };
  }
  if (trimmed.startsWith("chore:") || trimmed.startsWith("chore(")) {
    return { type: "chore", text: trimmed.replace(/^chore(\([^)]+\))?:\s*/, "") };
  }
  if (trimmed.startsWith("breaking:") || trimmed.startsWith("BREAKING")) {
    return { type: "breaking", text: trimmed.replace(/^(breaking:|BREAKING\s*CHANGE:?)\s*/i, "") };
  }

  return { type: "other", text: trimmed };
}

/**
 * Determine category from release content
 */
function determineCategory(release: ChangelogRelease): "SDK" | "Studio" | "Repository" {
  // Check if primarily Studio changes
  const hasStudioPackages = release.packages.some(
    (p) => p.name.includes("studio") || p.name.includes("floimg-studio")
  );

  // Check if any SDK packages
  const hasSDKPackages = release.packages.some(
    (p) => p.name.includes("@teamflojo/floimg") && !p.name.includes("studio")
  );

  // Check for repository-level sections
  const hasRepoSection = release.sections.some((s) => s.name === "Repository");

  if (hasStudioPackages && !hasSDKPackages) return "Studio";
  if (hasRepoSection && !hasStudioPackages && !hasSDKPackages) return "Repository";
  return "SDK";
}

/**
 * Parse a CHANGELOG.md file content
 */
export function parseChangelog(content: string): ChangelogRelease[] {
  const releases: ChangelogRelease[] = [];
  const lines = content.split("\n");

  let currentRelease: ChangelogRelease | null = null;
  let currentPackage: PackageChanges | null = null;
  let currentSection: SectionChanges | null = null;

  for (const line of lines) {
    // Match version header: ## [v0.8.3] - 2026-01-01 or ## [0.8.3] - 2025-12-31
    const versionMatch = line.match(/^## \[v?(\d+\.\d+\.\d+)\]\s*-\s*(\d{4}-\d{2}-\d{2})/);
    if (versionMatch) {
      // Save previous release
      if (currentRelease) {
        if (currentPackage) {
          currentRelease.packages.push(currentPackage);
          currentPackage = null;
        }
        if (currentSection) {
          currentRelease.sections.push(currentSection);
          currentSection = null;
        }
        currentRelease.category = determineCategory(currentRelease);
        releases.push(currentRelease);
      }

      currentRelease = {
        version: `v${versionMatch[1]}`,
        date: versionMatch[2],
        packages: [],
        sections: [],
        category: "SDK",
      };
      continue;
    }

    // Skip unreleased section
    if (line.match(/^## \[Unreleased\]/i)) {
      // Close any open release
      if (currentRelease) {
        if (currentPackage) {
          currentRelease.packages.push(currentPackage);
          currentPackage = null;
        }
        if (currentSection) {
          currentRelease.sections.push(currentSection);
          currentSection = null;
        }
        currentRelease.category = determineCategory(currentRelease);
        releases.push(currentRelease);
        currentRelease = null;
      }
      continue;
    }

    if (!currentRelease) continue;

    // Match package header: ### @teamflojo/floimg-studio-ui (0.2.3)
    const packageMatch = line.match(/^### (@teamflojo\/[\w-]+)\s*\((\d+\.\d+\.\d+)\)/);
    if (packageMatch) {
      // Save previous package/section
      if (currentPackage) {
        currentRelease.packages.push(currentPackage);
      }
      if (currentSection) {
        currentRelease.sections.push(currentSection);
        currentSection = null;
      }

      currentPackage = {
        name: packageMatch[1],
        version: packageMatch[2],
        changes: [],
      };
      continue;
    }

    // Match section header: ### Added, ### Fixed, ### Changed, ### Repository
    const sectionMatch = line.match(
      /^### (Added|Fixed|Changed|Repository|Removed|Security|Notes)$/
    );
    if (sectionMatch) {
      // Save previous package/section
      if (currentPackage) {
        currentRelease.packages.push(currentPackage);
        currentPackage = null;
      }
      if (currentSection) {
        currentRelease.sections.push(currentSection);
      }

      currentSection = {
        name: sectionMatch[1],
        items: [],
      };
      continue;
    }

    // Match change entry: - description
    const changeMatch = line.match(/^-\s+(.+)$/);
    if (changeMatch) {
      const { type, text } = parseChangeType(changeMatch[1]);
      const entry: ChangeEntry = { type, description: text };

      if (currentPackage) {
        currentPackage.changes.push(entry);
      } else if (currentSection) {
        currentSection.items.push(entry);
      }
      continue;
    }

    // Match sub-section headers like #### New Plugin: xAI Grok (treat as description)
    const subSectionMatch = line.match(/^#### (.+)$/);
    if (subSectionMatch && currentSection) {
      currentSection.items.push({
        type: "feat",
        description: subSectionMatch[1],
      });
      continue;
    }

    // Match nested list items: - **item** - description
    const nestedMatch = line.match(/^\s+-\s+\*\*(.+?)\*\*\s*[-–]\s*(.+)$/);
    if (nestedMatch && currentSection) {
      currentSection.items.push({
        type: "feat",
        description: `${nestedMatch[1]}: ${nestedMatch[2]}`,
      });
      continue;
    }

    // Match simple nested items: - **item** - description (without bold dash)
    const simpleNestedMatch = line.match(/^\s+-\s+\*\*(.+?)\*\*\s+(.+)$/);
    if (simpleNestedMatch && currentSection) {
      currentSection.items.push({
        type: "feat",
        description: `${simpleNestedMatch[1]}: ${simpleNestedMatch[2]}`,
      });
      continue;
    }
  }

  // Save final release
  if (currentRelease) {
    if (currentPackage) {
      currentRelease.packages.push(currentPackage);
    }
    if (currentSection) {
      currentRelease.sections.push(currentSection);
    }
    currentRelease.category = determineCategory(currentRelease);
    releases.push(currentRelease);
  }

  return releases;
}

/**
 * Format date for display
 */
export function formatReleaseDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
