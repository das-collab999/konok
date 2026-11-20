"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { EXTRAS, calcTotal, type Place } from "@/data/places";
import { formatDate } from "@/lib/useBooking";
import { pick, useLang } from "@/lib/i18n";
import { Icon } from "@/components/ui";

function Stepper({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (v: number) => void }) {
  const btn =
    "flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-rule-strong text-[17px] leading-none text-fg transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-35";
  return (
    <div className="flex items-center justify-between gap-3 border-b border-rule py-3.5">
      <span className="text-[14px] text-fg-muted">{label}</span>
      <div className="flex items-center gap-3">
        <button type="button" aria-label={`${label} −`} className={btn} disabled={value <= min} onClick={() => onChange(value - 1)}>−</button>
        <span className="serif min-w-7 text-center text-[20px]" aria-live="polite">{value}</span>
        <button type="button" aria-label={`${label} +`} className={btn} disabled={value >= max} onClick={() => onChange(value + 1)}>+</button>
      </div>
    </div>
  );
}

export function BookingCard({ place }: { place: Place }) {
  const router = useRouter();
  const sp = useSearchParams();
  const { lang, t } = useLang();

  const initGuests = Math.min(12, Math.max(1, parseInt(sp.get("g") ?? "", 10) || 2));
  const initDate = /^\d{4}-\d{2}-\d{2}$/.test(sp.get("d") ?? "") ? (sp.get("d") as string) : "";

  const [nights, setNights] = useState(2);
  const [guests, setGuests] = useState(initGuests);
  const [date, setDate] = useState(initDate);
  const [today, setToday] = useState("");
  const [extras, setExtras] = useState<string[]>(place.carAccess === "4x4" ? ["transfer"] : []);

  useEffect(() => {
    const now = new Date();
    const iso = (d: Date) => d.toISOString().slice(0, 10);
    setToday(iso(now));
    setDate((cur) => {
      if (cur) return cur;
      const soon = new Date(now);
      soon.setMonth(soon.getMonth() + 1);
      return iso(soon);
    });
  }, []);

  const { lines, total } = calcTotal(place, nights, guests, extras);
  const toggle = (id: string) => setExtras((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  const lineLabel = (id: string) => {
    if (id === "base") return `$${place.pricePerPersonUsd} × ${nights} ${t.common.nights} × ${guests} ${t.common.guests}`;
    const e = EXTRAS.find((x) => x.id === id);
    return e ? pick(e.label, lang) : id;
  };

  const book = () => {
    const q = new URLSearchParams({ n: String(nights), g: String(guests), d: date, x: extras.join(",") });
    router.push(`/place/${place.slug}/pay/?${q}`);
  };

  return (
    <aside className="w-full lg:sticky lg:top-28 lg:w-[380px] lg:flex-none">
      <div className="bg-paper p-7">
        <div className="flex items-baseline gap-2 border-b border-rule pb-5">
          <span className="serif text-[34px]">${place.pricePerPersonUsd}</span>
          <span className="text-[13px] text-fg-subtle">{t.place.withMeals}</span>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-3 border-b border-rule py-3.5">
            <label htmlFor="b-date" className="text-[14px] text-fg-muted">{t.place.checkIn}</label>
            <input
              id="b-date" type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)}
              className="h-11 border-0 bg-transparent p-0 text-right text-[15px] text-fg outline-none"
            />
          </div>
          <Stepper label={t.place.nightsLabel} value={nights} min={1} max={14} onChange={setNights} />
          <Stepper label={t.place.guestsLabel} value={guests} min={1} max={12} onChange={setGuests} />
        </div>

        <fieldset className="m-0 mt-6 border-0 p-0">
          <legend className="eyebrow mb-3">{t.place.extras}</legend>
          <div className="flex flex-col">
            {EXTRAS.map((x) => (
              <label key={x.id} className="flex cursor-pointer items-center gap-3 border-b border-rule py-3">
                <input type="checkbox" checked={extras.includes(x.id)} onChange={() => toggle(x.id)} className="h-5 w-5 accent-[#8e2420]" />
                <span className="flex-1 text-[14px]">{pick(x.label, lang)}</span>
                <span className="text-[13px] text-fg-muted">{x.per === "trip" ? `$${x.priceUsd}` : `$${x.priceUsd}/${t.common.guests}`}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-6 flex flex-col gap-2 text-[14px] text-fg-muted">
          {lines.map((l) => (
            <div key={l.id} className="flex justify-between gap-3"><span>{lineLabel(l.id)}</span><span>${l.usd}</span></div>
          ))}
          <div className="mt-3 flex items-baseline justify-between border-t border-rule-strong pt-4 text-fg">
            <span className="text-[13px] uppercase tracking-[0.14em]">{t.common.total}</span>
            <span className="serif text-[28px]">${total}</span>
          </div>
        </div>

        <button type="button" onClick={book} className="pill pill-solid mt-6 w-full">
          {t.place.book}
          <Icon name="arrow" size={15} strokeWidth={1.8} />
        </button>

        <p className="m-0 mt-4 text-center text-[13px] leading-relaxed text-fg-subtle">
          {date ? `${t.place.arrival}: ${formatDate(date, lang)}. ` : ""}{t.place.bookNote}
        </p>
      </div>
    </aside>
  );
}
