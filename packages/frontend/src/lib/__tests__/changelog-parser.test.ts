import { describe, it, expect } from "vitest";
import { parseChangelog, formatReleaseDate } from "../changelog-parser";

describe("parseChangelog", () => {
  it("parses a simple release with package changes", () => {
    const content = `# Changelog

## [v0.8.3] - 2026-01-15

### @teamflojo/floimg (0.8.3)

- feat: add new transform option
- fix: correct image sizing bug
`;

    const releases = parseChangelog(content);

    expect(releases).toHaveLength(1);
    expect(releases[0].version).toBe("v0.8.3");
    expect(releases[0].date).toBe("2026-01-15");
    expect(releases[0].packages).toHaveLength(1);
    expect(releases[0].packages[0].name).toBe("@teamflojo/floimg");
    expect(releases[0].packages[0].version).toBe("0.8.3");
    expect(releases[0].packages[0].changes).toHaveLength(2);
  });

  it("parses multiple releases", () => {
    const content = `# Changelog

## [v0.9.0] - 2026-01-20

### @teamflojo/floimg (0.9.0)

- feat: new feature

## [v0.8.0] - 2026-01-10

### @teamflojo/floimg (0.8.0)

- feat: another feature
`;

    const releases = parseChangelog(content);

    expect(releases).toHaveLength(2);
    expect(releases[0].version).toBe("v0.9.0");
    expect(releases[1].version).toBe("v0.8.0");
  });

  it("parses version without v prefix", () => {
    const content = `## [0.8.3] - 2026-01-15

### @teamflojo/floimg (0.8.3)

- feat: test feature
`;

    const releases = parseChangelog(content);

    expect(releases).toHaveLength(1);
    expect(releases[0].version).toBe("v0.8.3");
  });

  it("parses section-based changes (Added, Fixed, etc.)", () => {
    const content = `## [v1.0.0] - 2026-01-15

### Added

- New dashboard page
- User profile settings

### Fixed

- Login redirect issue
`;

    const releases = parseChangelog(content);

    expect(releases).toHaveLength(1);
    expect(releases[0].sections).toHaveLength(2);
    expect(releases[0].sections[0].name).toBe("Added");
    expect(releases[0].sections[0].items).toHaveLength(2);
    expect(releases[0].sections[1].name).toBe("Fixed");
    expect(releases[0].sections[1].items).toHaveLength(1);
  });

  it("categorizes SDK releases correctly", () => {
    const content = `## [v0.8.0] - 2026-01-15

### @teamflojo/floimg (0.8.0)

- feat: core library change
`;

    const releases = parseChangelog(content);

    expect(releases[0].category).toBe("SDK");
  });

  it("categorizes Studio releases correctly", () => {
    const content = `## [v0.2.0] - 2026-01-15

### @teamflojo/floimg-studio-ui (0.2.0)

- feat: studio feature
`;

    const releases = parseChangelog(content);

    expect(releases[0].category).toBe("Studio");
  });

  it("categorizes Repository releases correctly", () => {
    const content = `## [v0.1.0] - 2026-01-15

### Repository

- chore: update CI workflow
`;

    const releases = parseChangelog(content);

    expect(releases[0].category).toBe("Repository");
  });

  it("parses change type prefixes correctly", () => {
    const content = `## [v1.0.0] - 2026-01-15

### @teamflojo/floimg (1.0.0)

- feat: new feature
- fix: bug fix
- docs: documentation update
- chore: maintenance task
- breaking: API change
- plain description without prefix
`;

    const releases = parseChangelog(content);
    const changes = releases[0].packages[0].changes;

    expect(changes[0].type).toBe("feat");
    expect(changes[0].description).toBe("new feature");
    expect(changes[1].type).toBe("fix");
    expect(changes[2].type).toBe("docs");
    expect(changes[3].type).toBe("chore");
    expect(changes[4].type).toBe("breaking");
    expect(changes[5].type).toBe("other");
  });

  it("handles scoped conventional commits", () => {
    const content = `## [v1.0.0] - 2026-01-15

### @teamflojo/floimg (1.0.0)

- feat(transforms): add resize option
- fix(core): memory leak
`;

    const releases = parseChangelog(content);
    const changes = releases[0].packages[0].changes;

    expect(changes[0].type).toBe("feat");
    expect(changes[0].description).toBe("add resize option");
    expect(changes[1].type).toBe("fix");
    expect(changes[1].description).toBe("memory leak");
  });

  it("skips Unreleased section", () => {
    const content = `## [Unreleased]

- Upcoming feature

## [v1.0.0] - 2026-01-15

### Added

- Released feature
`;

    const releases = parseChangelog(content);

    expect(releases).toHaveLength(1);
    expect(releases[0].version).toBe("v1.0.0");
  });

  it("handles multiple packages in one release", () => {
    const content = `## [v0.8.0] - 2026-01-15

### @teamflojo/floimg (0.8.0)

- feat: core change

### @teamflojo/floimg-openai (0.2.0)

- feat: openai change
`;

    const releases = parseChangelog(content);

    expect(releases[0].packages).toHaveLength(2);
    expect(releases[0].packages[0].name).toBe("@teamflojo/floimg");
    expect(releases[0].packages[1].name).toBe("@teamflojo/floimg-openai");
  });

  it("handles empty changelog", () => {
    const content = `# Changelog

All notable changes to this project will be documented in this file.
`;

    const releases = parseChangelog(content);

    expect(releases).toHaveLength(0);
  });

  it("parses sub-section headers as features", () => {
    const content = `## [v1.0.0] - 2026-01-15

### Added

#### New Plugin: xAI Grok

- Feature details
`;

    const releases = parseChangelog(content);
    const items = releases[0].sections[0].items;

    expect(items).toHaveLength(2);
    expect(items[0].type).toBe("feat");
    expect(items[0].description).toBe("New Plugin: xAI Grok");
  });
});

describe("formatReleaseDate", () => {
  it("formats date correctly", () => {
    const result = formatReleaseDate("2026-01-15");

    // Date parsing can shift by timezone, so just check the format is correct
    expect(result).toMatch(/January \d{1,2}, 2026/);
  });

  it("returns a human-readable date string", () => {
    const result = formatReleaseDate("2026-06-15");

    // Should contain month name, day, and year
    expect(result).toMatch(/\w+ \d{1,2}, \d{4}/);
    expect(result).toContain("2026");
  });
});
