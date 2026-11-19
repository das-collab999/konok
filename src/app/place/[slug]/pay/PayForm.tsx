"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Place } from "@/data/places";
import { formatDate, useBooking } from "@/lib/useBooking";
import { saveBooking } from "@/lib/bookings";
import { Icon } from "@/components/ui";
import { Motif } from "@/components/ethno";

// MVP: no real charge. The payment module is connected later (README, section 7).
const METHODS = [
  { id: "card", label: "Visa / Mastercard", note: "Для туристов из любой страны" },
  { id: "elsom", label: "Элсом", note: "Электронный кошелёк Кыргызстана" },
  { id: "mbank", label: "MBank", note: "Перевод по QR-коду" },
];

const field = "h-12 w-full border-0 border-b border-rule-strong bg-transparent px-0 text-[16px] text-fg outline-none focus:border-ink";

export function PayForm({ place }: { place: Place }) {
  const router = useRouter();
  const { nights, guests, date, total, query } = useBooking(place);
  const [method, setMethod] = useState("card");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2 || phone.replace(/\D/g, "").length < 7) {
      setError("Введите имя и телефон, чтобы хозяин мог с вами связаться.");
      return;
    }
    setError("");
    setSending(true);

    // Бронь уходит в базу (если она подключена) и всегда сохраняется в телефоне.
    const code = "KNK-" + String(Math.floor(10000 + Math.random() * 90000));
    await saveBooking({
      code,
      slug: place.slug,
      title: place.title,
      place: place.place,
      host: place.host,
      nights,
      guests,
      date,
      total,
      name: name.trim(),
      phone: phone.trim(),
      status: "pending",
    });

    router.push(`/place/${place.slug}/done/?${query}&name=${encodeURIComponent(name.trim())}&c=${code}`);
  };

  return (
    <div className="mx-auto max-w-[840px] px-5 pb-16 pt-8 sm:px-10">
      <Link href={`/place/${place.slug}/`} className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-fg-muted no-underline hover:text-fg">
        <Icon name="back" size={15} strokeWidth={1.6} /> Назад к месту
      </Link>

      <Motif name="kochkor" size={44} className="mt-6 text-ochre" />
      <h1 className="display m-0 mt-4 text-[clamp(30px,5vw,56px)]">Оформление брони</h1>

      <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-y border-rule py-6">
        <div className="min-w-0">
          <p className="serif m-0 text-[20px]">{place.title}</p>
          <p className="m-0 mt-2 text-[11px] uppercase tracking-[0.14em] text-fg-subtle">
            {place.place} · {nights} ноч. · {guests} гост.{date ? ` · заезд ${formatDate(date)}` : ""}
          </p>
        </div>
        <span className="serif text-[32px]">${total}</span>
      </div>

      <form onSubmit={submit} noValidate className="mt-10 flex flex-col gap-10">
        <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="p-name" className="eyebrow">Имя и фамилия</label>
            <input id="p-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="Anna Schmidt" className={field} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="p-phone" className="eyebrow">Телефон или WhatsApp</label>
            <input id="p-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" placeholder="+49 …" className={field} />
          </div>
          <div className="flex flex-col gap-2 sm:col-span-2">
            <label htmlFor="p-mail" className="eyebrow">Email (необязательно)</label>
            <input id="p-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="anna@example.com" className={field} />
          </div>
        </div>

        <fieldset className="m-0 border-0 p-0">
          <legend className="eyebrow mb-4">Способ оплаты</legend>
          <div className="flex flex-col">
            {METHODS.map((m) => (
              <label
                key={m.id}
                className={`flex cursor-pointer items-center gap-4 border-b py-4 transition-colors ${
                  method === m.id ? "border-ink" : "border-rule"
                }`}
              >
                <input type="radio" name="pay" checked={method === m.id} onChange={() => setMethod(m.id)} className="h-4 w-4 accent-[#7f2420]" />
                <span className="flex flex-1 flex-wrap items-baseline justify-between gap-2">
                  <span className="text-[16px]">{m.label}</span>
                  <span className="text-[12px] uppercase tracking-[0.12em] text-fg-subtle">{m.note}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {error && (
          <p role="alert" className="m-0 border-l-2 border-accent bg-accent-soft px-4 py-3 text-[14px] text-accent">{error}</p>
        )}

        <div className="flex flex-wrap items-center gap-6">
          <button type="submit" disabled={sending} className="pill pill-solid w-full disabled:opacity-60 sm:w-auto">
            {sending ? "Отправляем…" : `Отправить бронь · $${total}`}
          </button>
          <p className="m-0 text-[12px] leading-relaxed text-fg-subtle">
            Демо-режим: деньги не списываются.<br />Данные карты на сайте не хранятся.
          </p>
        </div>
      </form>
    </div>
  );
}
