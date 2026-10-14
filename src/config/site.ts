export const siteConfig = {
  name: "Guild & Grain",
  tagline: "Bespoke Leatherworks",
  description:
    "100% Real Leather. Built to Last. Premium jackets & coats, crafted factory-direct with timeless style and easy returns.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  locale: "en_US",
  logo: "/brand/logo.svg",
  author: {
    name: "Guild & Grain",
    url: "",
  },
  social: {
    facebook: {
      href: "https://facebook.com",
      icon: "/social/facebook.svg",
      label: "Facebook",
    },
    whatsapp: {
      href: "https://wa.me/",
      icon: "/social/whatsapp.svg",
      label: "WhatsApp",
    },
    instagram: {
      href: "https://instagram.com",
      icon: "/social/instagram.svg",
      label: "Instagram",
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
