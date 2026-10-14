"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/config/navigation";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="nav-links flex items-center gap-8">
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
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
