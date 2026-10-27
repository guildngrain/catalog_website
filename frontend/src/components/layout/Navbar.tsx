import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { siteConfig } from "@/config/site";
import { BookmarkNavLink } from "./BookmarkNavLink";
import { NavLinks } from "./NavLinks";
import "./Navbar.css";

export function Navbar() {
  return (
    <header className="site-header sticky top-0 z-50 w-full">
      <div className="site-header-inner">
        <nav className="site-header-nav" aria-label="Primary">
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

          <div className="hidden items-center lg:flex">
            <NavLinks />
          </div>

          <div className="flex items-center gap-4">
            <form
              role="search"
              action="/catalog"
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
                aria-label="Search catalog"
                className="search-input h-10 w-full rounded-full border border-border bg-card pr-4 pl-10 text-foreground placeholder:text-muted"
              />
            </form>

            <BookmarkNavLink />

            <Link
              href="/contact"
              className="contact-pill"
              aria-label="Contact us"
            >
              Contact Us
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
