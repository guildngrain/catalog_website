import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Section } from "@/components/ui";
import {
  catalogCategories,
  getCatalogCategory,
} from "@/config/catalog";
import { siteConfig } from "@/config/site";
import "../catalog.css";

type CatalogCategoryPageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return catalogCategories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: CatalogCategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCatalogCategory(slug);
  if (!category) {
    return { title: "Catalog" };
  }

  return {
    title: category.label,
    description: category.description || `${category.label} — ${siteConfig.name}`,
  };
}

export default async function CatalogCategoryPage({
  params,
}: CatalogCategoryPageProps) {
  const { category: slug } = await params;
  const category = getCatalogCategory(slug);

  if (!category) {
    notFound();
  }

  return (
    <Section>
      <Container>
        <p className="catalog-breadcrumb text-body-small text-muted">
          <Link href="/catalog" className="catalog-breadcrumb-link">
            Catalog
          </Link>
          <span aria-hidden> / </span>
          <span>{category.label}</span>
        </p>

        <h1 className="mt-4 text-heading-h2 text-foreground">
          {category.label}
        </h1>
        <p className="mt-3 max-w-xl text-body text-muted">
          {category.description}
        </p>

        <div className="catalog-empty mt-10">
          <p className="text-body text-muted">
            Pieces for this category will appear here as the static catalog is
            filled in.
          </p>
          <Link href="/contact" className="catalog-empty-cta mt-6">
            Ask about availability
          </Link>
        </div>
      </Container>
    </Section>
  );
}
