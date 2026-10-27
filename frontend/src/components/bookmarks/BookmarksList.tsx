"use client";

import Image from "next/image";
import Link from "next/link";
import { Bookmark } from "lucide-react";
import { useBookmarks } from "@/hooks";
import "./BookmarksList.css";

export function BookmarksList() {
  const { bookmarks, count, hydrated, remove, clear } = useBookmarks();

  if (!hydrated) {
    return (
      <p className="bookmarks-empty text-muted" aria-live="polite">
        Loading bookmarks…
      </p>
    );
  }

  if (count === 0) {
    return (
      <div className="bookmarks-empty">
        <Bookmark className="size-10 text-muted" strokeWidth={1.25} aria-hidden />
        <p className="mt-4 text-body text-muted">
          No bookmarks yet. Save pieces you like while browsing the catalog —
          they&apos;ll stay on this device.
        </p>
        <Link href="/catalog" className="bookmarks-browse mt-6">
          Browse catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="bookmarks-list">
      <div className="bookmarks-list-toolbar">
        <p className="text-body-small text-muted">
          {count} saved {count === 1 ? "item" : "items"}
        </p>
        <button type="button" className="bookmarks-clear" onClick={clear}>
          Clear all
        </button>
      </div>

      <ul className="mt-6 flex flex-col gap-4">
        {bookmarks.map((item) => (
          <li key={item.id} className="bookmarks-item">
            <Link href={item.href} className="bookmarks-item-link">
              {item.image ? (
                <Image
                  src={item.image}
                  alt=""
                  width={72}
                  height={72}
                  className="bookmarks-item-image"
                />
              ) : (
                <span className="bookmarks-item-placeholder" aria-hidden>
                  <Bookmark className="size-5" strokeWidth={1.5} />
                </span>
              )}
              <span className="bookmarks-item-title">{item.title}</span>
            </Link>
            <button
              type="button"
              className="bookmarks-remove"
              onClick={() => remove(item.id)}
              aria-label={`Remove ${item.title} from bookmarks`}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
