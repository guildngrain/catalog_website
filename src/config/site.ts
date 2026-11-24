export const siteConfig = {
  name: "Guild & Grain",
  tagline: "Bespoke Leatherworks",
  description:
    "100% Real Leather. Built to Last. Premium jackets & coats, crafted factory-direct with timeless style and easy returns.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  locale: "en_US",
  logo: "/brand/logo.svg",
  whatsapp: {
    display: "+92 300 9759050",
    href: "https://wa.me/923009759050",
  },
  author: {
    name: "Guild & Grain",
    url: "",
  },
} as const;

export type SiteConfig = typeof siteConfig;
