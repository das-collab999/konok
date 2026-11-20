"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Включает офлайн-режим и показывает полоску, когда интернет пропал.
 *
 * Страницы, которые гость уже открывал, остаются доступными без сети —
 * это нужно в горах, где связи нет совсем.
 */
export function Offline() {
  const { t } = useLang();
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register(`${base}/sw.js`, { scope: `${base}/` }).catch(() => {});
    }
    const update = () => setOffline(!navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  if (!offline) return null;

  return (
    <div role="status" className="sticky top-0 z-[60] bg-ink px-4 py-2 text-center text-[13px] text-cream">
      {t.offline}
    </div>
  );
}
