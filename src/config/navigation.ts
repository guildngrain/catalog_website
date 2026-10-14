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
    shop: FooterColumn;
    brand: FooterColumn;
    help: FooterColumn;
  };
  legal: NavItem[];
}

export const navigation: NavConfig = {
  main: [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Blogs", href: "/blogs" },
  ],
  footer: {
    shop: {
      title: "Shop",
      links: [
        { label: "New Arrivals", href: "/shop/new-arrivals" },
        { label: "Men's Leather Jackets", href: "/shop/mens-leather-jackets" },
        { label: "Best Sellers", href: "/shop/best-sellers" },
        { label: "Gift for Him", href: "/shop/gift-for-him" },
        { label: "Men's Biker Jackets", href: "/shop/mens-biker-jackets" },
        { label: "Men's Cowboys Jackets", href: "/shop/mens-cowboys-jackets" },
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
