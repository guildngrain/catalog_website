export const BOOKMARKS_COOKIE = "gg_bookmarks";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 365; // 1 year
const MAX_ITEMS = 50;

export type BookmarkItem = {
  id: string;
  title: string;
  href: string;
  image?: string;
};

function isBookmarkItem(value: unknown): value is BookmarkItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "string" &&
    typeof item.title === "string" &&
    typeof item.href === "string" &&
    (item.image === undefined || typeof item.image === "string")
  );
}

export function parseBookmarksCookie(raw: string | undefined): BookmarkItem[] {
  if (!raw) return [];

  try {
    const decoded = decodeURIComponent(raw);
    const parsed: unknown = JSON.parse(decoded);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isBookmarkItem).slice(0, MAX_ITEMS);
  } catch {
    return [];
  }
}

export function serializeBookmarks(items: BookmarkItem[]): string {
  return encodeURIComponent(JSON.stringify(items.slice(0, MAX_ITEMS)));
}

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return match ? match.slice(name.length + 1) : undefined;
}

export function readBookmarks(): BookmarkItem[] {
  return parseBookmarksCookie(readCookie(BOOKMARKS_COOKIE));
}

export function writeBookmarks(items: BookmarkItem[]): void {
  if (typeof document === "undefined") return;
  const value = serializeBookmarks(items);
  document.cookie = `${BOOKMARKS_COOKIE}=${value}; path=/; max-age=${MAX_AGE_SECONDS}; SameSite=Lax`;
}

export function clearBookmarksCookie(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${BOOKMARKS_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}
