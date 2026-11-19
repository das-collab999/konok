"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { bookingCode, type Place } from "@/data/places";
import { formatDate, useBooking } from "@/lib/useBooking";
import { Icon } from "@/components/ui";

export function Done({ place }: { place: Place }) {
  const { nights, guests, date, total } = useBooking(place);
  const name = useSearchParams().get("name") ?? "";
  const code = bookingCode(place, nights, guests);

  // Kept on the phone, so the booking is readable without internet in the mountains.
  useEffect(() => {
    try {
      const list = JSON.parse(localStorage.getItem("konok-bookings") ?? "[]");
      if (!list.some((b: { code: string }) => b.code === code)) {
        list.push({ code, slug: place.slug, title: place.title, place: place.place, host: place.host, nights, guests, date, total, name, status: "pending" });
        localStorage.setItem("konok-bookings", JSON.stringify(list));
      }
    } catch {}
  }, [code, place, nights, guests, date, total, name]);

  const rows: [string, string][] = [
    ["Место", place.title],
    ["Регион", place.place],
    ["Заезд", date ? formatDate(date) : "—"],
    ["Ночей", String(nights)],
    ["Гостей", String(guests)],
    ["К оплате", `$${total}`],
  ];

  const notes = [
    "Бронь сохранена в телефоне и открывается без интернета",
    "Хозяин подтверждает заявку в течение 2 часов",
    "Водитель свяжется с вами накануне выезда",
  ];

  return (
    <div className="mx-auto max-w-[680px] px-4 py-10 sm:px-6">
      <div className="flex items-center gap-2 text-success">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-success-soft">
          <Icon name="check" size={18} strokeWidth={2.4} />
        </span>
        <span className="text-[14px] font-medium">Заявка отправлена</span>
      </div>

      <h1 className="m-0 mt-4 text-[26px] font-semibold leading-tight">
        {name ? `${name}, бронь ушла хозяевам` : "Бронь ушла хозяевам"}
      </h1>
      <p className="m-0 mt-3 text-[15px] leading-relaxed text-fg-muted">
        {place.host} получили заявку в мессенджере на кыргызском и подтвердят её в течение двух часов.
        Рахмат! Сизди күтөбүз.
      </p>

      <div className="mt-6 rounded-card border border-border bg-canvas">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-muted px-4 py-3">
          <span className="text-[13px] text-fg-subtle">Номер брони</span>
          <span className="font-mono text-[16px] font-semibold tracking-wide">{code}</span>
        </div>
        <dl className="m-0 divide-y divide-border-muted">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-4 px-4 py-2.5">
              <dt className="m-0 text-[14px] text-fg-muted">{k}</dt>
              <dd className="m-0 text-right text-[14px] font-medium">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <ul className="m-0 mt-5 flex list-none flex-col gap-2 p-0">
        {notes.map((n) => (
          <li key={n} className="flex items-start gap-2.5 text-[14px] text-fg-muted">
            <Icon name="check" size={16} strokeWidth={2.2} className="mt-0.5 flex-none text-success" />
            {n}
          </li>
        ))}
      </ul>

      <div className="mt-7 flex flex-wrap gap-3">
        <Link href="/bookings/" className="inline-flex h-10 items-center rounded-lg bg-accent px-5 text-[15px] font-medium text-white no-underline transition-colors hover:bg-accent-hover">
          Мои брони
        </Link>
        <Link href="/hosts/" className="inline-flex h-10 items-center rounded-lg border border-border px-5 text-[15px] font-medium text-fg no-underline transition-colors hover:bg-subtle">
          Что видит хозяин
        </Link>
        <Link href="/" className="inline-flex h-10 items-center rounded-lg border border-border px-5 text-[15px] font-medium text-fg no-underline transition-colors hover:bg-subtle">
          На главную
        </Link>
      </div>
    </div>
  );
}
