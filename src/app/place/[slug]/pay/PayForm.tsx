"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Place } from "@/data/places";
import { formatDate, useBooking } from "@/lib/useBooking";
import { Icon } from "@/components/ui";

// MVP: no real charge. The payment module is connected later (README, section 7).
const METHODS = [
  { id: "card", label: "Visa / Mastercard", note: "Для туристов из любой страны" },
  { id: "elsom", label: "Элсом", note: "Электронный кошелёк Кыргызстана" },
  { id: "mbank", label: "MBank", note: "Перевод по QR-коду" },
];

const input = "h-11 w-full rounded-lg border border-border bg-canvas px-3 text-[15px] outline-none focus:border-accent";

export function PayForm({ place }: { place: Place }) {
  const router = useRouter();
  const { nights, guests, date, total, query } = useBooking(place);
  const [method, setMethod] = useState("card");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2 || phone.replace(/\D/g, "").length < 7) {
      setError("Введите имя и телефон, чтобы хозяин мог с вами связаться.");
      return;
    }
    setError("");
    router.push(`/place/${place.slug}/done/?${query}&name=${encodeURIComponent(name.trim())}`);
  };

  return (
    <div className="mx-auto max-w-[720px] px-4 py-8 sm:px-6">
      <Link href={`/place/${place.slug}/`} className="inline-flex h-9 items-center gap-1.5 text-[14px] text-fg-muted no-underline hover:text-fg">
        <Icon name="back" size={16} /> Назад к месту
      </Link>

      <h1 className="m-0 mt-4 text-[26px] font-semibold">Оформление брони</h1>

      <div className="mt-5 rounded-card border border-border-muted bg-subtle p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="m-0 text-[15px] font-semibold">{place.title}</p>
            <p className="m-0 mt-1 text-[14px] text-fg-muted">
              {place.place} · {nights} ноч. · {guests} гост.{date ? ` · заезд ${formatDate(date)}` : ""}
            </p>
          </div>
          <span className="text-[20px] font-semibold">${total}</span>
        </div>
      </div>

      <form onSubmit={submit} noValidate className="mt-6 flex flex-col gap-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="p-name" className="text-[13px] font-medium text-fg-muted">Имя и фамилия</label>
            <input id="p-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="Anna Schmidt" className={input} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="p-phone" className="text-[13px] font-medium text-fg-muted">Телефон или WhatsApp</label>
            <input id="p-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" placeholder="+49 …" className={input} />
          </div>
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label htmlFor="p-mail" className="text-[13px] font-medium text-fg-muted">Email (необязательно)</label>
            <input id="p-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="anna@example.com" className={input} />
          </div>
        </div>

        <fieldset className="m-0 flex flex-col gap-2 border-0 p-0">
          <legend className="mb-1 text-[13px] font-medium text-fg-muted">Способ оплаты</legend>
          {METHODS.map((m) => (
            <label
              key={m.id}
              className={`flex cursor-pointer items-center gap-3 rounded-card border px-4 py-3 transition-colors ${
                method === m.id ? "border-accent bg-accent-soft" : "border-border-muted hover:bg-subtle"
              }`}
            >
              <input type="radio" name="pay" checked={method === m.id} onChange={() => setMethod(m.id)} className="h-4 w-4 accent-[#8b1e1e]" />
              <span className="flex flex-col">
                <span className="text-[15px] font-medium">{m.label}</span>
                <span className="text-[13px] text-fg-subtle">{m.note}</span>
              </span>
            </label>
          ))}
        </fieldset>

        {error && (
          <p role="alert" className="m-0 rounded-lg border border-accent bg-accent-soft px-3 py-2.5 text-[14px] text-accent">{error}</p>
        )}

        <button type="submit" className="flex h-12 w-full cursor-pointer items-center justify-center rounded-lg bg-accent text-[16px] font-medium text-white transition-colors hover:bg-accent-hover">
          Отправить бронь · ${total}
        </button>

        <p className="m-0 text-center text-[13px] text-fg-subtle">
          Демо-режим: деньги не списываются. Данные карты на сайте не хранятся.
        </p>
      </form>
    </div>
  );
}
