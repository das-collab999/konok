"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EXTRAS, calcTotal, type Place } from "@/data/places";

function Stepper({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (v: number) => void }) {
  const btn = "h-11 w-11 cursor-pointer rounded-full border border-line-strong bg-white text-xl text-ink disabled:opacity-40";
  return (
    <div className="flex items-center justify-between">
      <span className="font-semibold">{label}</span>
      <div className="flex items-center gap-2.5">
        <button type="button" aria-label={`${label}: меньше`} className={btn} disabled={value <= min} onClick={() => onChange(value - 1)}>−</button>
        <span className="min-w-6 text-center text-lg font-bold" aria-live="polite">{value}</span>
        <button type="button" aria-label={`${label}: больше`} className={btn} disabled={value >= max} onClick={() => onChange(value + 1)}>+</button>
      </div>
    </div>
  );
}

export function BookingCard({ place }: { place: Place }) {
  const router = useRouter();
  const [nights, setNights] = useState(2);
  const [guests, setGuests] = useState(2);
  // Transfer is pre-selected when the road needs a 4×4.
  const [extras, setExtras] = useState<string[]>(place.carAccess === "4x4" ? ["transfer"] : []);
  const { lines, total } = calcTotal(place, nights, guests, extras);

  const toggle = (id: string) => setExtras((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  const book = () => {
    const q = new URLSearchParams({ n: String(nights), g: String(guests), x: extras.join(",") });
    router.push(`/place/${place.slug}/pay/?${q}`);
  };

  return (
    <aside className="flex flex-[1_1_340px] flex-col gap-4 rounded-[20px] border-2 border-red bg-card p-5">
      <div>
        <span className="text-[30px] font-bold">${place.pricePerPersonUsd}</span>
        <span className="text-sm text-muted"> / чел. за ночь, с ужином и завтраком</span>
      </div>

      <Stepper label="Ночей" value={nights} min={1} max={14} onChange={setNights} />
      <Stepper label="Гостей" value={guests} min={1} max={12} onChange={setGuests} />

      <fieldset className="m-0 flex flex-col gap-2 border-0 p-0">
        <legend className="mb-2 font-bold">Добавить к поездке</legend>
        {EXTRAS.map((x) => (
          <label key={x.id} className="flex min-h-11 cursor-pointer items-center gap-2.5 rounded-[10px] border border-line bg-white px-3 py-2.5">
            <input type="checkbox" checked={extras.includes(x.id)} onChange={() => toggle(x.id)} className="h-5 w-5 accent-red" />
            <span className="flex-1 text-[15px]">{x.label}</span>
            <span className="text-sm font-bold text-red">{x.per === "trip" ? `$${x.priceUsd}` : `$${x.priceUsd}/чел.`}</span>
          </label>
        ))}
      </fieldset>

      <div className="flex flex-col gap-1.5 border-t border-dashed border-ochre pt-3.5 text-sm text-muted">
        {lines.map((l) => (
          <div key={l.label} className="flex justify-between gap-2"><span>{l.label}</span><span>${l.usd}</span></div>
        ))}
        <div className="mt-1.5 flex justify-between text-xl font-bold text-ink"><span>Итого</span><span>${total}</span></div>
      </div>

      <button type="button" onClick={book} className="h-[54px] cursor-pointer rounded-xl bg-red text-[17px] font-bold text-white hover:brightness-110">
        Забронировать
      </button>
      <span className="text-center text-[13px] text-muted">Бесплатная отмена за 7 дней. Хозяин подтверждает бронь в течение 2 часов.</span>
    </aside>
  );
}
