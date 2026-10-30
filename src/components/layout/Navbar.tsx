"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { navigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { BookmarkNavLink } from "./BookmarkNavLink";
import { NavLinks } from "./NavLinks";
import "./Navbar.css";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className="site-header sticky top-0 z-50 w-full">
      <div className="site-header-inner">
        <nav className="site-header-nav" aria-label="Primary">
          <Link href="/" className="site-header-logo">
            <Image
              src={siteConfig.logo}
              alt={siteConfig.name}
              width={200}
              height={48}
              priority
              className="site-header-logo-img"
              style={{ width: "auto" }}
            />
          </Link>

          <div className="site-header-desktop-links">
            <NavLinks />
          </div>

          <div className="site-header-actions">
            <form
              role="search"
              action="/catalog"
              method="get"
              className="site-header-search"
            >
              <Search
                className="site-header-search-icon"
                aria-hidden
                strokeWidth={1.5}
              />
              <input
                type="search"
                name="q"
                placeholder="Search"
                aria-label="Search catalog"
                className="search-input"
              />
            </form>

            <BookmarkNavLink />

            <Link
              href="/contact"
              className="contact-pill contact-pill--desktop"
              aria-label="Contact us"
            >
              Contact Us
            </Link>

            <button
              type="button"
              className="nav-menu-toggle"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? (
                <X className="size-6" strokeWidth={1.5} />
              ) : (
                <Menu className="size-6" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </nav>
      </div>

      <div
        id={menuId}
        className={open ? "mobile-nav is-open" : "mobile-nav"}
        hidden={!open}
      >
        <div
          className="mobile-nav-backdrop"
          aria-hidden
          onClick={() => setOpen(false)}
        />
        <div className="mobile-nav-panel" role="dialog" aria-modal="true" aria-label="Menu">
          <form
            role="search"
            action="/catalog"
            method="get"
            className="mobile-nav-search"
            onSubmit={() => setOpen(false)}
          >
            <Search
              className="site-header-search-icon"
              aria-hidden
              strokeWidth={1.5}
            />
            <input
              type="search"
              name="q"
              placeholder="Search catalog"
              aria-label="Search catalog"
              className="search-input"
            />
          </form>

          <ul className="mobile-nav-links">
            {navigation.main.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/contact"
            className="contact-pill contact-pill--mobile"
            onClick={() => setOpen(false)}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </header>
  );
}
