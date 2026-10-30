"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import {
  clearBookmarksCookie,
  readBookmarks,
  writeBookmarks,
  type BookmarkItem,
} from "@/lib/bookmarks";

type Listener = () => void;

const listeners = new Set<Listener>();
const EMPTY_BOOKMARKS: BookmarkItem[] = [];
let cachedBookmarks: BookmarkItem[] = EMPTY_BOOKMARKS;
let cacheReady = false;

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function emitChange() {
  listeners.forEach((listener) => listener());
}

function refreshCache() {
  cachedBookmarks = readBookmarks();
  cacheReady = true;
  return cachedBookmarks;
}

function getSnapshot(): BookmarkItem[] {
  if (!cacheReady && typeof document !== "undefined") {
    return refreshCache();
  }
  return cachedBookmarks;
}

function getServerSnapshot(): BookmarkItem[] {
  return EMPTY_BOOKMARKS;
}

function persist(next: BookmarkItem[]) {
  writeBookmarks(next);
  cachedBookmarks = next;
  cacheReady = true;
  emitChange();
}

export function useBookmarks() {
  const bookmarks = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    refreshCache();
    emitChange();
    setHydrated(true);
  }, []);

  const isBookmarked = useCallback(
    (id: string) => bookmarks.some((item) => item.id === id),
    [bookmarks]
  );

  const add = useCallback(
    (item: BookmarkItem) => {
      const current = getSnapshot();
      if (current.some((b) => b.id === item.id)) return;
      persist([item, ...current]);
    },
    []
  );

  const remove = useCallback((id: string) => {
    persist(getSnapshot().filter((item) => item.id !== id));
  }, []);

  const toggle = useCallback((item: BookmarkItem) => {
    const current = getSnapshot();
    if (current.some((b) => b.id === item.id)) {
      persist(current.filter((b) => b.id !== item.id));
    } else {
      persist([item, ...current]);
    }
  }, []);

  const clear = useCallback(() => {
    clearBookmarksCookie();
    cachedBookmarks = EMPTY_BOOKMARKS;
    cacheReady = true;
    emitChange();
  }, []);

  return {
    bookmarks,
    count: hydrated ? bookmarks.length : 0,
    hydrated,
    isBookmarked,
    add,
    remove,
    toggle,
    clear,
  };
}
