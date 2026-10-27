import type { CatalogProduct } from "@/config/catalog";
import { ProductCard } from "./ProductCard";
import "./ProductGrid.css";

type ProductGridProps = {
  products: CatalogProduct[];
  layout?: "grid" | "row";
};

export function ProductGrid({ products, layout = "grid" }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="catalog-empty">
        <p className="text-body text-muted">
          No pieces match these filters. Clear filters or try another style,
          color, or gender.
        </p>
      </div>
    );
  }

  return (
    <ul
      className={
        layout === "row" ? "product-grid product-grid--row" : "product-grid"
      }
    >
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
