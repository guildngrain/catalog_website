import Image from "next/image";
import Link from "next/link";
import { Heart, Search, ShoppingBag } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui";
import { NavLinks } from "./NavLinks";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <Container>
        <nav
          className="flex items-center justify-between gap-8 py-5"
          aria-label="Primary"
        >
          <Link href="/" className="shrink-0">
            <Image
              src={siteConfig.logo}
              alt={siteConfig.name}
              width={200}
              height={48}
              priority
              className="h-11 w-auto"
              style={{ width: "auto" }}
            />
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            <NavLinks />
          </div>

          <div className="flex items-center gap-4">
            <form
              role="search"
              action="/shop"
              method="get"
              className="relative hidden w-48 lg:block xl:w-56"
            >
              <Search
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted"
                aria-hidden
              />
              <input
                type="search"
                name="q"
                placeholder="Search"
                aria-label="Search products"
                className="search-input h-10 w-full rounded-full border border-border bg-card pr-4 pl-10 text-foreground placeholder:text-muted"
              />
            </form>

            <Link
              href="/wishlist"
              className="nav-icon relative"
              aria-label="Wishlist, 0 items"
            >
              <Heart className="size-5" strokeWidth={1.5} />
              <span className="badge absolute -top-1.5 -right-2">0</span>
            </Link>

            <Link href="/cart" className="cart-pill" aria-label="Cart, $0.0">
              <span>$0.0</span>
              <span className="relative">
                <ShoppingBag className="size-5" strokeWidth={1.5} />
                <span className="badge absolute -top-1.5 -right-2">0</span>
              </span>
            </Link>
          </div>
        </nav>
      </Container>
    </header>
  );
}
