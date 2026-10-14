export const siteConfig = {
  name: "Template",
  description: "A modern, SEO-friendly website template built with Next.js",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  locale: "en_US",
  author: {
    name: "",
    url: "",
  },
  social: {
    twitter: "",
    github: "",
    linkedin: "",
  },
} as const;

export type SiteConfig = typeof siteConfig;
