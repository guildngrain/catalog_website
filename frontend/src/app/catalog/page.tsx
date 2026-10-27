import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogBrowser } from "@/components/catalog";
import { Container, Section } from "@/components/ui";
import { catalogProducts } from "@/config/catalog";
import { siteConfig } from "@/config/site";
import "./catalog.css";

export const metadata: Metadata = {
  title: "Catalog",
  description: `Browse and filter the ${siteConfig.name} leather catalog by gender, color, and style.`,
};

export default function CatalogPage() {
  return (
    <Section>
      <Container>
        <h1 className="text-heading-h2 text-foreground">Catalog</h1>
        <p className="mt-3 max-w-xl text-body text-muted">
          {catalogProducts.length} leather pieces. Filter by gender, color,
          style, or search — bookmark anything you like.
        </p>

        <div className="mt-10">
          <Suspense
            fallback={
              <p className="text-body text-muted">Loading catalog…</p>
            }
          >
            <CatalogBrowser />
          </Suspense>
        </div>
      </Container>
    </Section>
  );
}
