import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookmarkButton, ProductGrid } from "@/components/catalog";
import { Container, Section } from "@/components/ui";
import {
  catalogProducts,
  getCatalogProduct,
} from "@/config/catalog";
import { siteConfig } from "@/config/site";
import "../../catalog.css";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return catalogProducts.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getCatalogProduct(slug);
  if (!product) {
    return { title: "Product" };
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getCatalogProduct(slug);

  if (!product) {
    notFound();
  }

  const related = catalogProducts
    .filter(
      (item) =>
        item.id !== product.id &&
        (item.type === product.type || item.gender === product.gender)
    )
    .slice(0, 3);

  return (
    <Section>
      <Container>
        <p className="catalog-breadcrumb text-body-small text-muted">
          <Link href="/catalog" className="catalog-breadcrumb-link">
            Catalog
          </Link>
          <span aria-hidden> / </span>
          <span>{product.title}</span>
        </p>

        <div className="product-detail mt-8">
          <div className="product-detail-media">
            <Image
              src={product.image}
              alt={product.title}
              width={900}
              height={1200}
              className="product-detail-image"
              priority
            />
          </div>

          <div className="product-detail-info">
            <p className="product-detail-type">{product.type}</p>
            <h1 className="mt-2 text-heading-h2 text-foreground">
              {product.title}
            </h1>
            <p className="mt-3 product-detail-price">{product.priceLabel}</p>
            <p className="mt-6 text-body text-muted">{product.description}</p>

            <dl className="product-detail-specs mt-6">
              <div>
                <dt>Gender</dt>
                <dd>{product.gender === "men" ? "Men" : "Women"}</dd>
              </div>
              <div>
                <dt>Color</dt>
                <dd>{product.color}</dd>
              </div>
            </dl>

            <div className="product-detail-actions mt-8">
              <BookmarkButton product={product} />
              <Link href="/contact" className="product-detail-contact">
                Inquire about this piece
              </Link>
            </div>

            <p className="mt-6 text-body-small text-muted">
              Static catalog preview for {siteConfig.name}. Contact us to
              discuss sizing, leather, and bespoke options.
            </p>
          </div>
        </div>

        {related.length > 0 ? (
          <div className="mt-16">
            <h2 className="text-heading-h2 text-foreground">You may also like</h2>
            <div className="mt-8">
              <ProductGrid products={related} />
            </div>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
