export type CatalogCategory = {
  slug: string;
  label: string;
  description: string;
};

export const catalogCategories: CatalogCategory[] = [
  {
    slug: "new-arrivals",
    label: "New Arrivals",
    description: "Latest small-batch pieces fresh from the bench.",
  },
  {
    slug: "mens-leather-jackets",
    label: "Men's Leather Jackets",
    description: "Everyday and statement jackets in vegetable-tanned leather.",
  },
  {
    slug: "best-sellers",
    label: "Best Sellers",
    description: "Proven fits and finishes customers return to.",
  },
  {
    slug: "gift-for-him",
    label: "Gift for Him",
    description: "Thoughtful leather gifts built to last.",
  },
  {
    slug: "mens-biker-jackets",
    label: "Men's Biker Jackets",
    description: "Road-ready silhouettes with classic hardware.",
  },
  {
    slug: "mens-cowboys-jackets",
    label: "Men's Cowboys Jackets",
    description: "Western-inspired cuts for open-country wear.",
  },
] as const;

export function getCatalogCategory(slug: string): CatalogCategory | undefined {
  return catalogCategories.find((category) => category.slug === slug);
}
