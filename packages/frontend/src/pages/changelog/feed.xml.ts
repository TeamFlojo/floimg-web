import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import {
  parseChangelog,
  fetchFloimgChangelog,
  fetchCloudChangelog,
} from "../../lib/changelog-parser";

export async function GET(context: APIContext) {
  // Fetch FloImg OSS changelog from GitHub
  const ossContent = await fetchFloimgChangelog();
  const ossReleases = ossContent ? parseChangelog(ossContent) : [];

  // Fetch FSC changelog from API (graceful degradation if unavailable)
  const cloudContent = await fetchCloudChangelog();
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
