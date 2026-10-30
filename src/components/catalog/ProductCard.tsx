"use client";

import Image from "next/image";
import Link from "next/link";
import { Bookmark } from "lucide-react";
import type { CatalogProduct } from "@/config/catalog";
import { useBookmarks } from "@/hooks";
import "./ProductCard.css";

type ProductCardProps = {
  product: CatalogProduct;
};

export function ProductCard({ product }: ProductCardProps) {
  const { isBookmarked, toggle } = useBookmarks();
  const saved = isBookmarked(product.id);

  return (
    <article className="product-card">
      <Link href={`/catalog/product/${product.slug}`} className="product-card-media">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
          className="product-card-image"
        />
        {product.isNew ? <span className="product-card-badge">New</span> : null}
      </Link>

      <div className="product-card-body">
        <div className="product-card-meta">
          <p className="product-card-type">{product.type}</p>
          <button
            type="button"
            className={
              saved ? "product-card-bookmark is-active" : "product-card-bookmark"
            }
            aria-label={
              saved
                ? `Remove ${product.title} from bookmarks`
                : `Bookmark ${product.title}`
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
          </button>
        </div>

        <Link
          href={`/catalog/product/${product.slug}`}
          className="product-card-title"
        >
          {product.title}
        </Link>
      </div>
    </article>
  );
}
