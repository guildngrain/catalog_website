import type { MetadataRoute } from "next";
import { catalogCategories } from "@/config/catalog";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  const catalogEntries: MetadataRoute.Sitemap = [
    {
      url: `${base}/catalog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...catalogCategories.map((category) => ({
      url: `${base}/catalog/${category.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...catalogEntries,
    {
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/bookmarks`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];
}
