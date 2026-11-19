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
      setList(Array.isArray(raw) ? [...raw].reverse() : []);
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
    <div className="mx-auto max-w-[1000px] px-5 pb-10 pt-10 sm:px-10">
      <span className="eyebrow">Личный кабинет</span>
      <h1 className="display m-0 mt-4 text-[clamp(32px,5.6vw,60px)]">Мои брони</h1>
      <p className="m-0 mt-6 max-w-[58ch] text-[16px] leading-relaxed text-fg-muted">
        Брони хранятся в этом телефоне или компьютере и открываются без интернета. Когда подключим базу данных,
        их можно будет найти по номеру брони и телефону с любого устройства.
      </p>

      {list === null && <p className="mt-12 text-[15px] text-fg-subtle">Загружаем…</p>}

      {list !== null && list.length === 0 && (
        <div className="mt-12 border border-dashed border-rule-strong px-8 py-20 text-center">
          <p className="serif m-0 text-[24px]">Здесь пока пусто</p>
          <p className="m-0 mt-3 text-[15px] text-fg-muted">Выберите место и оформите бронь — она появится на этой странице.</p>
          <Link href="/#stays" className="pill pill-solid mt-8">Посмотреть места</Link>
        </div>
      )}

      {list !== null && list.length > 0 && (
        <ul className="m-0 mt-12 flex list-none flex-col p-0">
          {list.map((b) => (
            <li key={b.code} className="border-t border-rule py-8 last:border-b">
              <div className="flex flex-wrap items-start justify-between gap-x-10 gap-y-5">
                <div className="min-w-0 flex-1 basis-[320px]">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-success">
                      <Icon name="check" size={13} strokeWidth={2.2} />
                      Ждём ответа хозяина
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.16em] text-fg-subtle">{b.code}</span>
                  </div>

                  <h2 className="serif m-0 mt-3 text-[24px]">
                    <Link href={`/place/${b.slug}/`} className="text-fg no-underline decoration-rule-strong underline-offset-4 hover:underline">{b.title}</Link>
                  </h2>

                  <p className="m-0 mt-2.5 text-[14px] text-fg-muted">
                    {b.place ? `${b.place} · ` : ""}{b.host}
                  </p>
                  <p className="m-0 mt-1 text-[14px] text-fg-muted">
                    {b.date ? `Заезд ${formatDate(b.date)} · ` : ""}{b.nights} ноч. · {b.guests} гост.
                  </p>
                </div>

                <div className="flex items-end gap-6">
                  <span className="serif text-[30px]">${b.total}</span>
                  <button
                    type="button"
                    onClick={() => forget(b.code)}
                    className="h-10 cursor-pointer text-[11px] uppercase tracking-[0.14em] text-fg-subtle underline underline-offset-4 transition-colors hover:text-fg"
                  >
                    Удалить
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
