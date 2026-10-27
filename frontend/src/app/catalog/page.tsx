import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/ui";
import { catalogCategories } from "@/config/catalog";
import { siteConfig } from "@/config/site";
import "./catalog.css";

export const metadata: Metadata = {
  title: "Catalog",
  description: `Browse the ${siteConfig.name} leather catalog — jackets, gifts, and small-batch arrivals.`,
};

export default function CatalogPage() {
  return (
    <Section>
      <Container>
        <h1 className="text-heading-h2 text-foreground">Catalog</h1>
        <p className="mt-3 max-w-xl text-body text-muted">
          Explore our leather collection by category. Bookmark pieces you like —
          they stay on this device.
        </p>

        <ul className="catalog-grid mt-10">
          {catalogCategories.map((category) => (
            <li key={category.slug}>
              <Link
                href={`/catalog/${category.slug}`}
                className="catalog-card"
              >
                <span className="catalog-card-title">{category.label}</span>
                <span className="catalog-card-desc">{category.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
