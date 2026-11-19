"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatDate } from "@/lib/useBooking";
import { Icon } from "@/components/ui";

type Saved = {
  code: string;
  slug: string;
  title: string;
  place?: string;
  host: string;
  nights: number;
  guests: number;
  date?: string;
  total: number;
  name?: string;
  status?: string;
};

export default function BookingsPage() {
  const [list, setList] = useState<Saved[] | null>(null);

  // Bookings live in the phone until there is a database behind the site.
  useEffect(() => {
    try {
      const raw = JSON.parse(localStorage.getItem("konok-bookings") ?? "[]");
      setList(Array.isArray(raw) ? raw.reverse() : []);
    } catch {
      setList([]);
    }
  }, []);

  const forget = (code: string) => {
    setList((cur) => {
      const next = (cur ?? []).filter((b) => b.code !== code);
      try { localStorage.setItem("konok-bookings", JSON.stringify([...next].reverse())); } catch {}
      return next;
    });
  };

  return (
    <div className="mx-auto max-w-[820px] px-4 py-8 sm:px-6">
      <h1 className="m-0 text-[26px] font-semibold">Мои брони</h1>
      <p className="m-0 mt-2 max-w-[60ch] text-[15px] leading-relaxed text-fg-muted">
        Брони хранятся в этом телефоне или компьютере и открываются без интернета. Когда подключим базу данных,
        их можно будет найти по номеру брони и телефону с любого устройства.
      </p>

      {list === null && <p className="mt-8 text-[15px] text-fg-subtle">Загружаем…</p>}

      {list !== null && list.length === 0 && (
        <div className="mt-8 rounded-card border border-dashed border-border px-6 py-14 text-center">
          <p className="m-0 text-[17px] font-semibold">Здесь пока пусто</p>
          <p className="m-0 mt-2 text-[15px] text-fg-muted">Выберите место и оформите бронь — она появится на этой странице.</p>
          <Link href="/#stays" className="mt-5 inline-flex h-10 items-center rounded-lg bg-accent px-5 text-[15px] font-medium text-white no-underline transition-colors hover:bg-accent-hover">
            Посмотреть места
          </Link>
        </div>
      )}

      {list !== null && list.length > 0 && (
        <ul className="m-0 mt-7 flex list-none flex-col gap-4 p-0">
          {list.map((b) => (
            <li key={b.code} className="rounded-card border border-border-muted bg-canvas">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-muted px-4 py-3">
                <span className="inline-flex items-center gap-2 text-[13px] text-fg-muted">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-success-soft px-2.5 py-1 text-[12px] font-medium text-success">
                    <Icon name="check" size={12} strokeWidth={2.4} />
                    Ждём ответа хозяина
                  </span>
                </span>
                <span className="font-mono text-[14px] font-semibold tracking-wide">{b.code}</span>
              </div>

              <div className="flex flex-wrap items-start justify-between gap-4 px-4 py-4">
                <div className="min-w-0">
                  <h2 className="m-0 text-[17px] font-semibold">
                    <Link href={`/place/${b.slug}/`} className="text-fg no-underline hover:underline">{b.title}</Link>
                  </h2>
                  <p className="m-0 mt-1.5 text-[14px] text-fg-muted">
                    {b.place ? `${b.place} · ` : ""}{b.host}
                  </p>
                  <p className="m-0 mt-1 text-[14px] text-fg-muted">
                    {b.date ? `Заезд ${formatDate(b.date)} · ` : ""}{b.nights} ноч. · {b.guests} гост.
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-[18px] font-semibold">${b.total}</span>
                  <button
                    type="button"
                    onClick={() => forget(b.code)}
                    className="h-8 cursor-pointer rounded-lg border border-border px-3 text-[13px] text-fg-muted transition-colors hover:bg-subtle hover:text-fg"
                  >
                    Удалить с устройства
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
