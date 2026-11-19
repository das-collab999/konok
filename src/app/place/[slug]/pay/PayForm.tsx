"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Place } from "@/data/places";
import { useBooking } from "@/lib/useBooking";
import { Icon } from "@/components/ui";

// MVP: no real payment. The payment module is connected later (README, section 7).
const METHODS = [
  { id: "card", label: "Visa / Mastercard", note: "Для туристов из любой страны" },
  { id: "elsom", label: "Элсом", note: "Электронный кошелёк Кыргызстана" },
  { id: "mbank", label: "MBank", note: "Перевод по QR-коду" },
];

const input = "h-12 rounded-[10px] border border-line-strong bg-white px-3.5 text-base";

export function PayForm({ place }: { place: Place }) {
  const router = useRouter();
  const { nights, guests, total, query } = useBooking(place);
  const [method, setMethod] = useState("card");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2 || phone.replace(/\D/g, "").length < 7) {
      setError("Введите имя и телефон, чтобы хозяин мог с вами связаться.");
      return;
    }
    router.push(`/place/${place.slug}/done/?${query}&name=${encodeURIComponent(name.trim())}`);
  };

  return (
    <div className="mx-auto flex max-w-[760px] flex-col gap-5 px-6 pb-[72px] pt-8">
      <Link href={`/place/${place.slug}/`} className="inline-flex h-11 items-center gap-1 self-start rounded-[10px] border border-line-strong bg-card px-4 font-semibold">
        <Icon name="back" size={18} /> Назад
      </Link>
      <h1 className="m-0 font-serif text-4xl">Оплата брони</h1>

      <div className="flex flex-wrap justify-between gap-2.5 rounded-2xl border border-line bg-card p-[18px]">
        <div className="flex flex-col gap-1">
          <strong className="text-[17px]">{place.title}</strong>
          <span className="text-sm text-muted">{place.place} · {nights} ноч. · {guests} гост.</span>
        </div>
        <strong className="text-[22px]">${total}</strong>
      </div>

      <form onSubmit={submit} noValidate className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="p-name" className="font-semibold">Имя и фамилия</label>
          <input id="p-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="Anna Schmidt" className={input} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="p-phone" className="font-semibold">Телефон или WhatsApp</label>
          <input id="p-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" placeholder="+49 …" className={input} />
        </div>

        <fieldset className="m-0 flex flex-col gap-2.5 border-0 p-0">
          <legend className="mb-2 font-bold">Способ оплаты</legend>
          {METHODS.map((m) => (
            <label key={m.id} className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 bg-white p-3.5 ${method === m.id ? "border-red" : "border-line"}`}>
              <input type="radio" name="pay" checked={method === m.id} onChange={() => setMethod(m.id)} className="h-5 w-5 accent-red" />
              <span className="flex flex-col"><strong>{m.label}</strong><span className="text-[13px] text-muted">{m.note}</span></span>
            </label>
          ))}
        </fieldset>

        {error && <p role="alert" className="m-0 rounded-[10px] bg-red/10 p-3 text-sm font-semibold text-red">{error}</p>}

        <button type="submit" className="h-14 cursor-pointer rounded-xl bg-red text-lg font-bold text-white hover:brightness-110">Оплатить ${total}</button>
        <span className="text-center text-[13px] text-muted">Это демо: деньги не списываются.</span>
      </form>
    </div>
  );
}
