"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Place } from "@/data/places";
import { formatDate, useBooking } from "@/lib/useBooking";
import { saveBooking } from "@/lib/bookings";
import { pick, useLang } from "@/lib/i18n";
import { Icon } from "@/components/ui";
import { Motif } from "@/components/ethno";

const field = "h-12 w-full border-0 border-b border-rule-strong bg-transparent px-0 text-[16px] text-fg outline-none focus:border-ink";

export function PayForm({ place }: { place: Place }) {
  const router = useRouter();
  const { lang, t } = useLang();
  const { nights, guests, date, total, query } = useBooking(place);
  const [method, setMethod] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2 || phone.replace(/\D/g, "").length < 7) {
      setError(t.pay.error);
      return;
    }
    setError("");
    setSending(true);

    const code = "KNK-" + String(Math.floor(10000 + Math.random() * 90000));
    await saveBooking({
      code,
      slug: place.slug,
      title: pick(place.title, lang),
      place: pick(place.place, lang),
      host: pick(place.host, lang),
      nights, guests, date, total,
      name: name.trim(),
      phone: phone.trim(),
      status: "pending",
    });

    router.push(`/place/${place.slug}/done/?${query}&name=${encodeURIComponent(name.trim())}&c=${code}`);
  };

  return (
    <div className="mx-auto max-w-[840px] px-5 pb-10 sm:pb-16 pt-8 sm:px-10">
      <Link href={`/place/${place.slug}/`} className="inline-flex h-11 items-center gap-2 text-[13px] text-fg-muted no-underline hover:text-fg">
        <Icon name="back" size={15} strokeWidth={1.6} /> {t.pay.back}
      </Link>

      <Motif name="kochkor" size={44} className="mt-6 text-ochre" />
      <h1 className="display m-0 mt-4 text-[clamp(27px,4.2vw,44px)]">{t.pay.title}</h1>

      <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-y border-rule py-6">
        <div className="min-w-0">
          <p className="serif m-0 text-[20px]">{pick(place.title, lang)}</p>
          <p className="m-0 mt-2 text-[13px] text-fg-subtle">
            {pick(place.place, lang)} · {nights} {t.common.nights} · {guests} {t.common.guests}
            {date ? ` · ${t.place.arrival}: ${formatDate(date, lang)}` : ""}
          </p>
        </div>
        <span className="serif text-[32px]">${total}</span>
      </div>

      <form onSubmit={submit} noValidate className="mt-10 flex flex-col gap-10">
        <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="p-name" className="eyebrow">{t.pay.name}</label>
            <input id="p-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="Anna Schmidt" className={field} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="p-phone" className="eyebrow">{t.pay.phone}</label>
            <input id="p-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" placeholder="+49 …" className={field} />
          </div>
          <div className="flex flex-col gap-2 sm:col-span-2">
            <label htmlFor="p-mail" className="eyebrow">{t.pay.email}</label>
            <input id="p-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="anna@example.com" className={field} />
          </div>
        </div>

        <fieldset className="m-0 border-0 p-0">
          <legend className="eyebrow mb-4">{t.pay.method}</legend>
          <div className="flex flex-col">
            {t.pay.methods.map((m, i) => (
              <label key={m.t} className={`flex cursor-pointer items-center gap-4 border-b py-4 transition-colors ${method === i ? "border-ink" : "border-rule"}`}>
                <input type="radio" name="pay" checked={method === i} onChange={() => setMethod(i)} className="h-5 w-5 accent-[#8e2420]" />
                <span className="flex flex-1 flex-wrap items-baseline justify-between gap-2">
                  <span className="text-[16px]">{m.t}</span>
                  <span className="text-[13px] text-fg-subtle">{m.d}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {error && <p role="alert" className="m-0 border-l-2 border-accent bg-accent-soft px-4 py-3 text-[14px] text-accent">{error}</p>}

        <div className="flex flex-wrap items-center gap-6">
          <button type="submit" disabled={sending} className="pill pill-solid w-full disabled:opacity-60 sm:w-auto">
            {sending ? t.pay.sending : `${t.pay.submit} · $${total}`}
          </button>
          <p className="m-0 text-[13px] leading-relaxed text-fg-subtle">{t.pay.note}</p>
        </div>
      </form>
    </div>
  );
}
