"use client";

import { Bookmark } from "lucide-react";
import type { CatalogProduct } from "@/config/catalog";
import { useBookmarks } from "@/hooks";

type BookmarkButtonProps = {
  product: CatalogProduct;
};

export function BookmarkButton({ product }: BookmarkButtonProps) {
  const { isBookmarked, toggle } = useBookmarks();
  const saved = isBookmarked(product.id);

  return (
    <button
      type="button"
      className={
        saved ? "product-detail-bookmark is-active" : "product-detail-bookmark"
      }
      aria-pressed={saved}
      onClick={() =>
        toggle({
          id: product.id,
          title: product.title,
          href: `/catalog/product/${product.slug}`,
          image: product.image,
        })
      }
    >
      <Bookmark
        className="size-4"
        strokeWidth={1.5}
        fill={saved ? "currentColor" : "none"}
      />
      {saved ? "Bookmarked" : "Bookmark"}
    </button>
  );
}
