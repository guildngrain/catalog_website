export interface NavItem {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: NavItem[];
}

export interface NavConfig {
  main: NavItem[];
  footer: {
    catalog: FooterColumn;
    journal: FooterColumn;
  };
  legal: NavItem[];
}

export const navigation: NavConfig = {
  main: [
    { label: "Home", href: "/" },
    { label: "Catalog", href: "/catalog" },
    { label: "Blogs", href: "/blogs" },
    { label: "Contact", href: "/contact" },
  ],
  footer: {
    catalog: {
      title: "Catalog",
      links: [{ label: "Catalog", href: "/catalog" }],
    },
    journal: {
      title: "Journal",
      links: [{ label: "Blogs", href: "/blogs" }],
    },
  },
  legal: [{ label: "Sitemap", href: "/sitemap.xml" }],
};
