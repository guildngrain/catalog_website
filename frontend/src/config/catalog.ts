export type CatalogCategory = {
  slug: string;
  label: string;
  description: string;
};

export type CatalogGender = "men" | "women";

export type CatalogProduct = {
  id: string;
  slug: string;
  title: string;
  type: string;
  gender: CatalogGender;
  color: string;
  categories: string[];
  description: string;
  image: string;
  priceLabel: string;
  featured?: boolean;
  isNew?: boolean;
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
    slug: "womens-leather-jackets",
    label: "Women's Leather Jackets",
    description: "Tailored leather silhouettes cut for her.",
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
    slug: "womens-biker-jackets",
    label: "Women's Biker Jackets",
    description: "Asymmetric zips and fitted leather for the road.",
  },
  {
    slug: "mens-cowboys-jackets",
    label: "Men's Cowboys Jackets",
    description: "Western-inspired cuts for open-country wear.",
  },
];

/** Seven jacket types with mixed gender / color variants for the static catalog. */
export const catalogProducts: CatalogProduct[] = [
  // 1. Classic Biker
  {
    id: "biker-men-black",
    slug: "classic-biker-men-black",
    title: "Classic Biker — Men, Black",
    type: "Classic Biker",
    gender: "men",
    color: "Black",
    categories: [
      "mens-biker-jackets",
      "mens-leather-jackets",
      "best-sellers",
      "gift-for-him",
    ],
    description:
      "Asymmetric zip, quilted shoulders, and polished hardware on full-grain black leather.",
    image: "/catalog/products/biker-men-black.jpg",
    priceLabel: "From $480",
    featured: true,
  },
  {
    id: "biker-men-brown",
    slug: "classic-biker-men-brown",
    title: "Classic Biker — Men, Brown",
    type: "Classic Biker",
    gender: "men",
    color: "Brown",
    categories: ["mens-biker-jackets", "mens-leather-jackets", "gift-for-him"],
    description:
      "The same road-ready biker cut in warm cognac-brown vegetable-tanned hide.",
    image: "/catalog/products/biker-men-brown.jpg",
    priceLabel: "From $480",
  },
  {
    id: "biker-women-black",
    slug: "classic-biker-women-black",
    title: "Classic Biker — Women, Black",
    type: "Classic Biker",
    gender: "women",
    color: "Black",
    categories: [
      "womens-biker-jackets",
      "womens-leather-jackets",
      "best-sellers",
      "new-arrivals",
    ],
    description:
      "Fitted women's biker with a nipped waist, asymmetric zip, and matte black leather.",
    image: "/catalog/products/biker-women-black.jpg",
    priceLabel: "From $460",
    featured: true,
    isNew: true,
  },
  {
    id: "biker-women-brown",
    slug: "classic-biker-women-brown",
    title: "Classic Biker — Women, Brown",
    type: "Classic Biker",
    gender: "women",
    color: "Brown",
    categories: ["womens-biker-jackets", "womens-leather-jackets"],
    description:
      "Women's classic biker in rich chestnut brown with silver-tone zippers.",
    image: "/catalog/products/biker-women-brown.jpg",
    priceLabel: "From $460",
  },

  // 2. Long Coat
  {
    id: "longcoat-men-black",
    slug: "long-coat-men-black",
    title: "Long Leather Coat — Men, Black",
    type: "Long Coat",
    gender: "men",
    color: "Black",
    categories: ["mens-leather-jackets", "best-sellers", "gift-for-him"],
    description:
      "Knee-length overcoat in dense black leather with a clean lapel and storm flap.",
    image: "/catalog/products/longcoat-men-black.jpg",
    priceLabel: "From $720",
    featured: true,
  },
  {
    id: "longcoat-women-black",
    slug: "long-coat-women-black",
    title: "Long Leather Coat — Women, Black",
    type: "Long Coat",
    gender: "women",
    color: "Black",
    categories: ["womens-leather-jackets", "best-sellers", "new-arrivals"],
    description:
      "Floor-skimming women's leather coat with a belt waist and soft black sheen.",
    image: "/catalog/products/longcoat-women-black.jpg",
    priceLabel: "From $690",
    isNew: true,
  },
  {
    id: "longcoat-women-brown",
    slug: "long-coat-women-brown",
    title: "Long Leather Coat — Women, Brown",
    type: "Long Coat",
    gender: "women",
    color: "Brown",
    categories: ["womens-leather-jackets", "new-arrivals"],
    description:
      "Long belted coat in tobacco-brown leather for layered winter wear.",
    image: "/catalog/products/longcoat-women-brown.jpg",
    priceLabel: "From $690",
    isNew: true,
  },

  // 3. Cowboy
  {
    id: "cowboy-men-black",
    slug: "cowboy-jacket-men-black",
    title: "Cowboy Jacket — Men, Black",
    type: "Cowboy Jacket",
    gender: "men",
    color: "Black",
    categories: ["mens-cowboys-jackets", "mens-leather-jackets", "gift-for-him"],
    description:
      "Western yoke, snap front, and pointed flaps on rugged black cowhide.",
    image: "/catalog/products/cowboy-men-black.jpg",
    priceLabel: "From $440",
  },
  {
    id: "cowboy-men-brown",
    slug: "cowboy-jacket-men-brown",
    title: "Cowboy Jacket — Men, Brown",
    type: "Cowboy Jacket",
    gender: "men",
    color: "Brown",
    categories: [
      "mens-cowboys-jackets",
      "mens-leather-jackets",
      "best-sellers",
    ],
    description:
      "Heritage cowboy cut in sun-worn saddle brown with contrast stitching.",
    image: "/catalog/products/cowboy-men-brown.jpg",
    priceLabel: "From $440",
    featured: true,
  },

  // 4. Cafe Racer
  {
    id: "caferacer-men-black",
    slug: "cafe-racer-men-black",
    title: "Cafe Racer — Men, Black",
    type: "Cafe Racer",
    gender: "men",
    color: "Black",
    categories: [
      "mens-leather-jackets",
      "mens-biker-jackets",
      "best-sellers",
      "gift-for-him",
    ],
    description:
      "Slim upright collar, clean front zip, and minimal hardware in black leather.",
    image: "/catalog/products/caferacer-men-black.jpg",
    priceLabel: "From $450",
    featured: true,
  },
  {
    id: "caferacer-women-black",
    slug: "cafe-racer-women-black",
    title: "Cafe Racer — Women, Black",
    type: "Cafe Racer",
    gender: "women",
    color: "Black",
    categories: ["womens-leather-jackets", "womens-biker-jackets", "new-arrivals"],
    description:
      "Streamlined women's cafe racer with a stand collar and slim black leather body.",
    image: "/catalog/products/caferacer-women-black.jpg",
    priceLabel: "From $430",
    isNew: true,
  },

  // 5. Bomber
  {
    id: "bomber-men-brown",
    slug: "leather-bomber-men-brown",
    title: "Leather Bomber — Men, Brown",
    type: "Leather Bomber",
    gender: "men",
    color: "Brown",
    categories: ["mens-leather-jackets", "gift-for-him", "new-arrivals"],
    description:
      "Ribbed cuffs and hem on a soft brown leather bomber with a zip front.",
    image: "/catalog/products/bomber-men-brown.jpg",
    priceLabel: "From $420",
    isNew: true,
  },
  {
    id: "bomber-women-black",
    slug: "leather-bomber-women-black",
    title: "Leather Bomber — Women, Black",
    type: "Leather Bomber",
    gender: "women",
    color: "Black",
    categories: ["womens-leather-jackets", "best-sellers"],
    description:
      "Cropped women's bomber in black leather with knit trim and a relaxed shoulder.",
    image: "/catalog/products/bomber-women-black.jpg",
    priceLabel: "From $400",
    featured: true,
  },

  // 6. Trucker
  {
    id: "trucker-men-black",
    slug: "trucker-jacket-men-black",
    title: "Trucker Jacket — Men, Black",
    type: "Trucker Jacket",
    gender: "men",
    color: "Black",
    categories: ["mens-leather-jackets", "gift-for-him"],
    description:
      "Button-front trucker with chest pockets and a straight black leather body.",
    image: "/catalog/products/trucker-men-black.jpg",
    priceLabel: "From $410",
  },
  {
    id: "trucker-women-brown",
    slug: "trucker-jacket-women-brown",
    title: "Trucker Jacket — Women, Brown",
    type: "Trucker Jacket",
    gender: "women",
    color: "Brown",
    categories: ["womens-leather-jackets", "new-arrivals"],
    description:
      "Women's leather trucker in warm brown with a slightly cropped hem.",
    image: "/catalog/products/trucker-women-brown.jpg",
    priceLabel: "From $395",
    isNew: true,
  },

  // 7. Blazer
  {
    id: "blazer-women-black",
    slug: "leather-blazer-women-black",
    title: "Leather Blazer — Women, Black",
    type: "Leather Blazer",
    gender: "women",
    color: "Black",
    categories: ["womens-leather-jackets", "best-sellers", "new-arrivals"],
    description:
      "Sharp single-breasted leather blazer with notch lapels in deep black.",
    image: "/catalog/products/blazer-women-black.jpg",
    priceLabel: "From $510",
    featured: true,
    isNew: true,
  },
  {
    id: "blazer-men-brown",
    slug: "leather-blazer-men-brown",
    title: "Leather Blazer — Men, Brown",
    type: "Leather Blazer",
    gender: "men",
    color: "Brown",
    categories: ["mens-leather-jackets", "gift-for-him", "best-sellers"],
    description:
      "Tailored men's leather blazer in espresso brown for polished casual wear.",
    image: "/catalog/products/blazer-men-brown.jpg",
    priceLabel: "From $540",
  },
];

export function getCatalogCategory(slug: string): CatalogCategory | undefined {
  return catalogCategories.find((category) => category.slug === slug);
}

export function getCatalogProduct(slug: string): CatalogProduct | undefined {
  return catalogProducts.find((product) => product.slug === slug);
}

export function getProductsByCategory(categorySlug: string): CatalogProduct[] {
  return catalogProducts.filter((product) =>
    product.categories.includes(categorySlug)
  );
}

export const catalogTypes = Array.from(
  new Set(catalogProducts.map((product) => product.type))
).sort();

export const catalogColors = Array.from(
  new Set(catalogProducts.map((product) => product.color))
).sort();

export type CatalogFilters = {
  gender?: CatalogGender | "all";
  color?: string;
  type?: string;
  q?: string;
  onlyNew?: boolean;
  onlyFeatured?: boolean;
};

export function filterCatalogProducts(
  products: CatalogProduct[],
  filters: CatalogFilters
): CatalogProduct[] {
  const query = filters.q?.trim().toLowerCase() ?? "";

  return products.filter((product) => {
    if (
      filters.gender &&
      filters.gender !== "all" &&
      product.gender !== filters.gender
    ) {
      return false;
    }
    if (
      filters.color &&
      filters.color !== "all" &&
      product.color !== filters.color
    ) {
      return false;
    }
    if (
      filters.type &&
      filters.type !== "all" &&
      product.type !== filters.type
    ) {
      return false;
    }
    if (filters.onlyNew && !product.isNew) return false;
    if (filters.onlyFeatured && !product.featured) return false;
    if (query) {
      const haystack = [
        product.title,
        product.type,
        product.color,
        product.gender,
        product.description,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });
}

/** Fisher–Yates shuffle copy — used for home preview rows. */
export function shuffleProducts(products: CatalogProduct[]): CatalogProduct[] {
  const next = [...products];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}
