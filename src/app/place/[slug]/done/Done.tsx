"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { bookingCode, type Place } from "@/data/places";
import { formatDate, useBooking } from "@/lib/useBooking";
import { Icon, Tunduk } from "@/components/ui";

export function Done({ place }: { place: Place }) {
  const { nights, guests, date, total } = useBooking(place);
  const sp = useSearchParams();
  const name = sp.get("name") ?? "";
  // Номер брони приходит со страницы оплаты; если зашли сюда напрямую — считаем его сами.
  const code = sp.get("c") ?? bookingCode(place, nights, guests);

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
    "Хозяин подтверждает заявку в течение двух часов",
    "Водитель свяжется с вами накануне выезда",
  ];

  return (
    <div className="mx-auto max-w-[840px] px-5 pb-16 pt-12 sm:px-10">
      <div className="flex items-center gap-3">
        <Tunduk size={26} strokeWidth={1.2} className="text-accent" />
        <span className="eyebrow">Рахмат! Сизди күтөбүз</span>
      </div>

      <h1 className="display m-0 mt-6 max-w-[14ch] text-[clamp(32px,5.6vw,64px)]">
        {name ? `${name}, бронь ушла хозяевам` : "Бронь ушла хозяевам"}
      </h1>

      <p className="m-0 mt-6 max-w-[56ch] text-[17px] leading-relaxed text-fg-muted">
        {place.host} получили заявку в мессенджере на кыргызском и подтвердят её в течение двух часов.
      </p>

      <div className="mt-10 bg-paper p-7">
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-rule pb-5">
          <span className="eyebrow">Номер брони</span>
          <span className="serif text-[28px] tracking-wide">{code}</span>
        </div>
        <dl className="m-0 flex flex-col">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-6 border-b border-rule py-3.5 last:border-b-0">
              <dt className="m-0 text-[11px] uppercase tracking-[0.14em] text-fg-subtle">{k}</dt>
              <dd className="m-0 text-right text-[15px]">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <ul className="m-0 mt-8 flex list-none flex-col p-0">
        {notes.map((n) => (
          <li key={n} className="flex items-start gap-3 border-b border-rule py-3.5 text-[15px] text-fg-muted">
            <Icon name="check" size={16} strokeWidth={2} className="mt-1 flex-none text-success" />
            {n}
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/bookings/" className="pill pill-solid">Мои брони</Link>
        <Link href="/hosts/" className="pill pill-ghost">Что видит хозяин</Link>
        <Link href="/" className="pill pill-ghost">На главную</Link>
      </div>
    </div>
  );
}
