"use client";

import { useEffect, useState } from "react";

/** Избранные места. Хранятся в телефоне, работают без интернета. */
const KEY = "konok-favourites";

function read(): string[] {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

function write(list: string[]) {
  try { localStorage.setItem(KEY, JSON.stringify(list)); } catch {}
  window.dispatchEvent(new CustomEvent("konok-fav"));
}

export function useFavourites() {
  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
    setList(read());
    const sync = () => setList(read());
    window.addEventListener("konok-fav", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("konok-fav", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = (slug: string) => {
    const next = read().includes(slug) ? read().filter((s) => s !== slug) : [...read(), slug];
    write(next);
    setList(next);
  };

  return { list, has: (slug: string) => list.includes(slug), toggle };
}
