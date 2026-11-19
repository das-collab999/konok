"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { EXTRAS, calcTotal, type Place } from "@/data/places";
import { formatDate } from "@/lib/useBooking";
import { Icon } from "@/components/ui";

function Stepper({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (v: number) => void }) {
  const btn =
    "flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-border bg-canvas text-[18px] leading-none text-fg transition-colors hover:bg-subtle disabled:cursor-not-allowed disabled:opacity-40";
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[15px] text-fg">{label}</span>
      <div className="flex items-center gap-2">
        <button type="button" aria-label={`${label}: меньше`} className={btn} disabled={value <= min} onClick={() => onChange(value - 1)}>−</button>
        <span className="min-w-7 text-center text-[15px] font-semibold" aria-live="polite">{value}</span>
        <button type="button" aria-label={`${label}: больше`} className={btn} disabled={value >= max} onClick={() => onChange(value + 1)}>+</button>
      </div>
    </div>
  );
}

export function BookingCard({ place }: { place: Place }) {
  const router = useRouter();
  const sp = useSearchParams();

  const initGuests = Math.min(12, Math.max(1, parseInt(sp.get("g") ?? "", 10) || 2));
  const initDate = /^\d{4}-\d{2}-\d{2}$/.test(sp.get("d") ?? "") ? (sp.get("d") as string) : "2027-07-12";

  const [nights, setNights] = useState(2);
  const [guests, setGuests] = useState(initGuests);
  const [date, setDate] = useState(initDate);
  // Transfer is pre-selected when the road needs a 4×4.
  const [extras, setExtras] = useState<string[]>(place.carAccess === "4x4" ? ["transfer"] : []);

  const { lines, total } = calcTotal(place, nights, guests, extras);
  const toggle = (id: string) => setExtras((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  const book = () => {
    const q = new URLSearchParams({ n: String(nights), g: String(guests), d: date, x: extras.join(",") });
    router.push(`/place/${place.slug}/pay/?${q}`);
  };

  return (
    <aside className="w-full lg:sticky lg:top-24 lg:w-[360px] lg:flex-none">
      <div className="rounded-card border border-border bg-canvas p-5 shadow-sm">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[24px] font-semibold">${place.pricePerPersonUsd}</span>
          <span className="text-[14px] text-fg-muted">/ чел. за ночь, с ужином и завтраком</span>
        </div>

        <div className="mt-4 flex flex-col gap-3 border-t border-border-muted pt-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="b-date" className="text-[13px] font-medium text-fg-muted">Дата заезда</label>
            <input
              id="b-date" type="date" value={date} onChange={(e) => setDate(e.target.value)}
              className="h-10 w-full rounded-lg border border-border bg-canvas px-3 text-[15px] outline-none focus:border-accent"
            />
          </div>
          <Stepper label="Ночей" value={nights} min={1} max={14} onChange={setNights} />
          <Stepper label="Гостей" value={guests} min={1} max={12} onChange={setGuests} />
        </div>

        <fieldset className="m-0 mt-4 flex flex-col gap-2 border-0 border-t border-border-muted p-0 pt-4">
          <legend className="mb-1 text-[13px] font-medium text-fg-muted">Добавить к поездке</legend>
          {EXTRAS.map((x) => (
            <label key={x.id} className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-border-muted px-3 py-2.5 transition-colors hover:bg-subtle">
              <input type="checkbox" checked={extras.includes(x.id)} onChange={() => toggle(x.id)} className="h-4 w-4 accent-[#8b1e1e]" />
              <span className="flex-1 text-[14px]">{x.label}</span>
              <span className="text-[13px] font-medium text-fg-muted">{x.per === "trip" ? `$${x.priceUsd}` : `$${x.priceUsd}/чел.`}</span>
            </label>
          ))}
        </fieldset>

        <div className="mt-4 flex flex-col gap-1.5 border-t border-border-muted pt-4 text-[14px] text-fg-muted">
          {lines.map((l) => (
            <div key={l.label} className="flex justify-between gap-3"><span>{l.label}</span><span>${l.usd}</span></div>
          ))}
          <div className="mt-2 flex justify-between border-t border-border-muted pt-3 text-[17px] font-semibold text-fg">
            <span>Итого</span><span>${total}</span>
          </div>
        </div>

        <button
          type="button" onClick={book}
          className="mt-4 flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-accent text-[15px] font-medium text-white transition-colors hover:bg-accent-hover"
        >
          Забронировать
          <Icon name="arrow" size={16} strokeWidth={2} />
        </button>

        <p className="m-0 mt-3 text-center text-[13px] leading-relaxed text-fg-subtle">
          {date ? `Заезд ${formatDate(date)}. ` : ""}Бесплатная отмена за 7 дней. Хозяин подтверждает бронь в течение 2 часов.
        </p>
      </div>
    </aside>
  );
}
