import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { parseChangelog } from "../../lib/changelog-parser";
import fs from "node:fs";
import path from "node:path";

// Helper to read changelog from possible paths
function readChangelogFile(possiblePaths: string[]): string {
  for (const changelogPath of possiblePaths) {
    try {
      return fs.readFileSync(changelogPath, "utf-8");
    } catch {
      // Try next path
    }
  }
  return "";
}

export async function GET(context: APIContext) {
  // Read CHANGELOG.md from floimg repo (OSS)
  const floimgPaths = [
    path.resolve(process.cwd(), "../../floimg/CHANGELOG.md"),
    path.resolve(process.cwd(), "../../../floimg/CHANGELOG.md"),
    path.resolve(process.cwd(), "../../../../repos/floimg/CHANGELOG.md"),
  ];
  const ossContent = readChangelogFile(floimgPaths);
  const ossReleases = ossContent ? parseChangelog(ossContent) : [];

  // Read CHANGELOG.md from floimg-cloud (Cloud platform)
  const cloudPaths = [
    path.resolve(process.cwd(), "../../floimg-cloud/CHANGELOG.md"),
    path.resolve(process.cwd(), "../../../floimg-cloud/CHANGELOG.md"),
    path.resolve(process.cwd(), "../../../../repos/floimg-cloud/CHANGELOG.md"),
  ];
  const cloudContent = readChangelogFile(cloudPaths);
  const cloudReleases = cloudContent ? parseChangelog(cloudContent) : [];

  // Mark cloud releases with Cloud category
  cloudReleases.forEach((release) => {
    release.category = "Cloud";
  });

  // Merge and sort all releases by date (newest first)
  const releases = [...ossReleases, ...cloudReleases].sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return rss({
    title: "FloImg Changelog",
    description: "Track all updates to FloImg packages, Studio, and Cloud platform.",
    site: context.site ?? "https://floimg.com",
    items: releases.map((release) => {
      // Summarize changes for description
      const packageChanges = release.packages.map((pkg) => `${pkg.name}@${pkg.version}`).join(", ");

      const totalChanges =
        release.packages.reduce((sum, pkg) => sum + pkg.changes.length, 0) +
        release.sections.reduce((sum, sec) => sum + sec.items.length, 0);

      const description = packageChanges
        ? `${packageChanges} - ${totalChanges} change(s)`
        : `${totalChanges} change(s)`;

      return {
        title: `${release.version} Released`,
        description,
        pubDate: new Date(release.date),
        link: `/changelog/#${release.version}`,
        categories: [release.category],
      };
    }),
    customData: `<language>en-us</language>`,
  });
}
