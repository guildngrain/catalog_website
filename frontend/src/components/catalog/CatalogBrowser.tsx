"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  catalogColors,
  catalogProducts,
  catalogTypes,
  filterCatalogProducts,
  type CatalogGender,
} from "@/config/catalog";
import { ProductGrid } from "./ProductGrid";
import "./CatalogBrowser.css";

function setParam(
  params: URLSearchParams,
  key: string,
  value: string | null
) {
  if (!value || value === "all") {
    params.delete(key);
  } else {
    params.set(key, value);
  }
}

export function CatalogBrowser() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const gender = (searchParams.get("gender") as CatalogGender | null) ?? "all";
  const color = searchParams.get("color") ?? "all";
  const type = searchParams.get("type") ?? "all";
  const q = searchParams.get("q") ?? "";
  const onlyNew = searchParams.get("new") === "1";
  const onlyFeatured = searchParams.get("featured") === "1";

  const filtered = useMemo(
    () =>
      filterCatalogProducts(catalogProducts, {
        gender,
        color,
        type,
        q,
        onlyNew,
        onlyFeatured,
      }),
    [gender, color, type, q, onlyNew, onlyFeatured]
  );

  function update(mutator: (params: URLSearchParams) => void) {
    const params = new URLSearchParams(searchParams.toString());
    mutator(params);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function clearFilters() {
    router.replace(pathname, { scroll: false });
  }

  const hasActiveFilters =
    gender !== "all" ||
    color !== "all" ||
    type !== "all" ||
    q.trim().length > 0 ||
    onlyNew ||
    onlyFeatured;

  return (
    <div className="catalog-browser">
      <form
        className="catalog-filters"
        onSubmit={(event) => event.preventDefault()}
        aria-label="Filter catalog"
      >
        <label className="catalog-filter-field">
          <span>Search</span>
          <input
            type="search"
            value={q}
            placeholder="Jacket, color…"
            onChange={(event) =>
              update((params) => setParam(params, "q", event.target.value || null))
            }
          />
        </label>

        <label className="catalog-filter-field">
          <span>Gender</span>
          <select
            value={gender}
            onChange={(event) =>
              update((params) => setParam(params, "gender", event.target.value))
            }
          >
            <option value="all">All</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
          </select>
        </label>

        <label className="catalog-filter-field">
          <span>Color</span>
          <select
            value={color}
            onChange={(event) =>
              update((params) => setParam(params, "color", event.target.value))
            }
          >
            <option value="all">All</option>
            {catalogColors.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="catalog-filter-field">
          <span>Style</span>
          <select
            value={type}
            onChange={(event) =>
              update((params) => setParam(params, "type", event.target.value))
            }
          >
            <option value="all">All</option>
            {catalogTypes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <fieldset className="catalog-filter-toggles">
          <legend className="sr-only">Quick filters</legend>
          <label className="catalog-filter-check">
            <input
              type="checkbox"
              checked={onlyNew}
              onChange={(event) =>
                update((params) =>
                  setParam(params, "new", event.target.checked ? "1" : null)
                )
              }
            />
            New
          </label>
          <label className="catalog-filter-check">
            <input
              type="checkbox"
              checked={onlyFeatured}
              onChange={(event) =>
                update((params) =>
                  setParam(params, "featured", event.target.checked ? "1" : null)
                )
              }
            />
            Featured
          </label>
        </fieldset>

        {hasActiveFilters ? (
          <button
            type="button"
            className="catalog-filters-clear"
            onClick={clearFilters}
          >
            Clear
          </button>
        ) : null}
      </form>

      <p className="catalog-browser-count text-body-small text-muted">
        Showing {filtered.length} of {catalogProducts.length} pieces
      </p>

      <ProductGrid products={filtered} />
    </div>
  );
}
