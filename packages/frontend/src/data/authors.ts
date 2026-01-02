/**
 * Author data for blog posts.
 *
 * Maps author IDs (used in blog frontmatter) to display information.
 * Team members link to their /u/[username] profile pages.
 */

export interface Author {
  id: string;
  name: string;
  username: string | null; // Username for profile link, null for team/collective
  avatarUrl: string | null;
  role?: string;
  isTeam?: boolean;
}

export const authors: Record<string, Author> = {
  brett: {
    id: "brett",
    name: "Brett Cooke",
    username: "brett",
    avatarUrl: "https://github.com/brettcooke.png",
    role: "Co-founder & CEO",
    isTeam: true,
  },
  brandon: {
    id: "brandon",
    name: "Brandon L'Europa",
    username: "brandon",
    avatarUrl: "https://github.com/bleuropa.png",
    role: "Co-founder & CTO",
    isTeam: true,
  },
  team: {
    id: "team",
    name: "FloImg Team",
    username: null, // No profile link for collective
    avatarUrl: null,
    isTeam: true,
  },
};

/**
 * Get author data by ID.
 * Returns a default "FloImg Team" author if not found.
 */
export function getAuthor(authorId: string): Author {
  const normalized = authorId.toLowerCase();

  // Handle legacy "FloImg Team" string
  if (normalized === "floimg team" || normalized === "team") {
    return authors.team;
  }

  return (
    authors[normalized] || {
      id: authorId,
      name: authorId,
      username: null,
      avatarUrl: null,
    }
  );
}

/**
 * Get all team authors (for about page, etc.)
 */
export function getTeamAuthors(): Author[] {
  return Object.values(authors).filter((a) => a.isTeam && a.username);
}
