"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { bookingCode, type Place } from "@/data/places";
import { useBooking } from "@/lib/useBooking";
import { Icon, Tunduk } from "@/components/ui";

export function Done({ place }: { place: Place }) {
  const { nights, guests, total } = useBooking(place);
  const name = useSearchParams().get("name") ?? "";
  const code = bookingCode(place, nights, guests);

  // Keep the booking on the phone so it works without internet in the mountains.
  useEffect(() => {
    try {
      const list = JSON.parse(localStorage.getItem("konok-bookings") ?? "[]");
      if (!list.some((b: { code: string }) => b.code === code)) {
        list.push({ code, slug: place.slug, title: place.title, host: place.host, nights, guests, total, name });
        localStorage.setItem("konok-bookings", JSON.stringify(list));
      }
    } catch {}
  }, [code, place, nights, guests, total, name]);

  const notes = [
    "Бронь, карта и контакты сохранены в телефоне — работают без интернета в горах",
    "Водитель свяжется с вами накануне выезда",
    "Словарик: «Салам» — привет, «Рахмат» — спасибо, «Даамдуу!» — вкусно!",
  ];

  return (
    <div className="mx-auto flex max-w-[720px] flex-col items-center gap-[18px] px-6 pb-20 pt-14 text-center">
      <div className="tunduk-rise">
        <Tunduk size={120} className="tunduk-spin" />
      </div>
      <span className="font-serif text-[22px] italic text-red">Рахмат! Сизди күтөбүз.</span>
      <h1 className="m-0 font-serif text-[clamp(30px,4vw,38px)] leading-tight">Бронь отправлена хозяевам</h1>
      <p className="m-0 text-[17px] leading-relaxed text-ink-soft">
        {name ? `${name}, ` : ""}{place.host} получили вашу заявку в мессенджере и подтвердят её в течение 2 часов. Номер брони: <strong>{code}</strong>
      </p>
      <div className="flex w-full flex-col gap-2.5 rounded-2xl border border-line bg-card p-[18px] text-left">
        {notes.map((n) => (
          <div key={n} className="flex items-center gap-2.5">
            <Icon name="check" size={22} strokeWidth={2} className="flex-none text-green" />
            <span>{n}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/hosts/" className="inline-flex h-12 items-center rounded-[10px] bg-ink px-5 font-bold text-felt">Что видит хозяин</Link>
        <Link href="/" className="inline-flex h-12 items-center rounded-[10px] border border-line-strong bg-card px-5 font-semibold">На главную</Link>
      </div>
    </div>
  );
}
