"use client";

import Link from "next/link";
import { Bookmark } from "lucide-react";
import { useBookmarks } from "@/hooks";

export function BookmarkNavLink() {
  const { count } = useBookmarks();
  const label =
    count === 1 ? "Bookmarks, 1 item" : `Bookmarks, ${count} items`;

  return (
    <Link href="/bookmarks" className="nav-icon relative" aria-label={label}>
      <Bookmark className="size-5" strokeWidth={1.5} />
      {count > 0 ? (
        <span className="badge absolute -top-1.5 -right-2">{count}</span>
      ) : null}
    </Link>
  );
}
