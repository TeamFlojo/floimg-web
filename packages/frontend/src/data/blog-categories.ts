export interface BlogCategory {
  id: string;
  label: string;
  description: string;
}

export const blogCategories: BlogCategory[] = [
  {
    id: "Announcements",
    label: "Announcements",
    description: "Product updates, releases, and company news",
  },
  {
    id: "Tutorials",
    label: "Tutorials",
    description: "Step-by-step guides and how-tos",
  },
  {
    id: "Engineering",
    label: "Engineering",
    description: "Technical deep dives and architecture decisions",
  },
  {
    id: "Community",
    label: "Community",
    description: "Community highlights and contributions",
  },
];

export function getCategoryById(id: string): BlogCategory | undefined {
  return blogCategories.find((cat) => cat.id === id);
}
