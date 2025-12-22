export interface GitHubContributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

export interface GitHubRepoStats {
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
}

const GITHUB_API = "https://api.github.com";
const REPO = "TeamFlojo/floimg";

export async function fetchContributors(): Promise<GitHubContributor[]> {
  try {
    const response = await fetch(`${GITHUB_API}/repos/${REPO}/contributors`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        ...(import.meta.env.GITHUB_TOKEN
          ? { Authorization: `token ${import.meta.env.GITHUB_TOKEN}` }
          : {}),
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch contributors:", response.status);
      return getFallbackContributors();
    }

    const contributors: GitHubContributor[] = await response.json();
    return contributors.slice(0, 20);
  } catch (error) {
    console.error("Error fetching contributors:", error);
    return getFallbackContributors();
  }
}

export async function fetchRepoStats(): Promise<GitHubRepoStats> {
  try {
    const response = await fetch(`${GITHUB_API}/repos/${REPO}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        ...(import.meta.env.GITHUB_TOKEN
          ? { Authorization: `token ${import.meta.env.GITHUB_TOKEN}` }
          : {}),
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch repo stats:", response.status);
      return getFallbackStats();
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching repo stats:", error);
    return getFallbackStats();
  }
}

function getFallbackContributors(): GitHubContributor[] {
  return [
    {
      login: "brettcooke",
      avatar_url: "https://github.com/brettcooke.png",
      html_url: "https://github.com/brettcooke",
      contributions: 100,
    },
  ];
}

function getFallbackStats(): GitHubRepoStats {
  return {
    stargazers_count: 0,
    forks_count: 0,
    open_issues_count: 0,
  };
}
