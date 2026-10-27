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
  };
  legal: NavItem[];
}

export const navigation: NavConfig = {
  main: [
    { label: "Home", href: "/" },
    { label: "Catalog", href: "/catalog" },
    { label: "Contact", href: "/contact" },
  ],
  footer: {
    catalog: {
      title: "Catalog",
      links: [{ label: "Catalog", href: "/catalog" }],
    },
  },
  legal: [{ label: "Sitemap", href: "/sitemap.xml" }],
};
