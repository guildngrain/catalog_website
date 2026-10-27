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
    brand: FooterColumn;
    help: FooterColumn;
  };
  legal: NavItem[];
}

export const navigation: NavConfig = {
  main: [
    { label: "Home", href: "/" },
    { label: "Catalog", href: "/catalog" },
    { label: "Blogs", href: "/blogs" },
  ],
  footer: {
    catalog: {
      title: "Catalog",
      links: [
        { label: "All Pieces", href: "/catalog" },
        { label: "New Arrivals", href: "/catalog?new=1" },
        { label: "Featured", href: "/catalog?featured=1" },
        { label: "Men", href: "/catalog?gender=men" },
        { label: "Women", href: "/catalog?gender=women" },
        { label: "Black Leather", href: "/catalog?color=Black" },
        { label: "Brown Leather", href: "/catalog?color=Brown" },
        { label: "Biker Jackets", href: "/catalog?type=Classic%20Biker" },
      ],
    },
    brand: {
      title: "Brand",
      links: [
        { label: "Our Story", href: "/our-story" },
        { label: "Leather Care Guide", href: "/leather-care" },
        { label: "Size Guide", href: "/size-guide" },
        { label: "Buying Guides", href: "/buying-guides" },
        { label: "Blogs", href: "/blogs" },
      ],
    },
    help: {
      title: "Help",
      links: [
        { label: "Customer Care", href: "/help/customer-care" },
        { label: "Shipping Policy", href: "/help/shipping" },
        { label: "Returns & Exchange", href: "/help/returns" },
        { label: "Refund Policy", href: "/help/refunds" },
        { label: "Bulk Orders", href: "/help/bulk-orders" },
        { label: "Contact Us", href: "/contact" },
      ],
    },
  },
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Sitemap", href: "/sitemap.xml" },
  ],
};
