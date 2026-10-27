"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ProductGrid } from "@/components/catalog";
import { Container, Section } from "@/components/ui";
import {
  catalogProducts,
  shuffleProducts,
  type CatalogProduct,
} from "@/config/catalog";
import "./FeaturedCatalog.css";

const ROW_COUNT = 4;

export function FeaturedCatalog() {
  const [items, setItems] = useState<CatalogProduct[]>([]);

  useEffect(() => {
    setItems(shuffleProducts(catalogProducts).slice(0, ROW_COUNT));
  }, []);

  return (
    <Section className="featured-catalog">
      <Container>
        <div className="featured-catalog-header">
          <div>
            <h2 className="text-heading-h2 text-foreground">From the catalog</h2>
            <p className="mt-3 max-w-xl text-body text-muted">
              A fresh row of leather pieces each visit. Explore the full
              collection with filters for gender, color, and style.
            </p>
          </div>
          <Link href="/catalog" className="featured-catalog-more">
            See more
          </Link>
        </div>

        <div className="mt-10">
          {items.length === 0 ? (
            <div className="featured-catalog-skeleton" aria-hidden>
              {Array.from({ length: ROW_COUNT }).map((_, index) => (
                <div key={index} className="featured-catalog-skeleton-card" />
              ))}
            </div>
          ) : (
            <ProductGrid products={items} layout="row" />
          )}
        </div>
      </Container>
    </Section>
  );
}
