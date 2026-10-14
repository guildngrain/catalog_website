export const siteConfig = {
  name: "Guild & Grain",
  description:
    "Guild & Grain — craft, community, and flavor rooted in tradition.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  locale: "en_US",
  author: {
    name: "Guild & Grain",
    url: "",
  },
  social: {
    twitter: "",
    github: "",
    linkedin: "",
  },
} as const;

export type SiteConfig = typeof siteConfig;
