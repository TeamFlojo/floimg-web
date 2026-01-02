import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = await getCollection("blog", ({ data }) => !data.draft);

  return rss({
    title: "FloImg Blog",
    description: "Updates, tutorials, and engineering insights from the FloImg team.",
    site: context.site ?? "https://floimg.com",
    items: posts
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: `/blog/${post.id}/`,
        categories: [post.data.category, ...post.data.tags],
        author: post.data.author,
      })),
    customData: `<language>en-us</language>`,
  });
}
