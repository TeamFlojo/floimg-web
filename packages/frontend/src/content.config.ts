import { defineCollection, z } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default("FloImg Team"),
    tags: z.array(z.string()).default([]),
    category: z.enum(["Announcements", "Tutorials", "Engineering", "Community"]),
    heroImage: z.string().optional(),
    heroWorkflow: z.string().optional(), // FloImg workflow that generated the hero image
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
  blog: blogCollection,
};
