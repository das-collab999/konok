"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { bookingCode, type Place } from "@/data/places";
import { formatDate, useBooking } from "@/lib/useBooking";
import { pick, useLang } from "@/lib/i18n";
import { Icon, Tunduk } from "@/components/ui";

export function Done({ place }: { place: Place }) {
  const { lang, t } = useLang();
  const { nights, guests, date, total } = useBooking(place);
  const sp = useSearchParams();
  const name = sp.get("name") ?? "";
  const code = sp.get("c") ?? bookingCode(place, nights, guests);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const rows: [string, string][] = [
    [t.done.rows.place, pick(place.title, lang)],
    [t.done.rows.region, pick(place.place, lang)],
    [t.done.rows.checkIn, date ? formatDate(date, lang) : "—"],
    [t.done.rows.nights, String(nights)],
    [t.done.rows.guests, String(guests)],
    [t.done.rows.total, `$${total}`],
  ];

  return (
    <div className="mx-auto max-w-[840px] px-5 pb-10 sm:pb-16 pt-12 sm:px-10">
      <div className="flex items-center gap-3">
        <Tunduk size={26} strokeWidth={1.2} className="text-accent" />
        <span className="eyebrow">{t.done.greeting}</span>
      </div>

      <h1 className="display m-0 mt-6 max-w-[16ch] text-[clamp(28px,4.6vw,48px)]">
        {name ? `${name}, ${t.done.titleWith}` : t.done.title}
      </h1>

      <p className="m-0 mt-6 max-w-[56ch] text-[17px] leading-relaxed text-fg-muted">
        {pick(place.host, lang)} {t.done.text}
      </p>

      <div className="mt-10 bg-paper p-7">
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-rule pb-5">
          <span className="eyebrow">{t.done.code}</span>
          <span className="flex items-center gap-3">
            <span className="serif text-[28px] tracking-wide">{code}</span>
            <button type="button" onClick={copy} className="h-11 cursor-pointer rounded-full border border-rule-strong px-4 text-[13px] transition-colors hover:border-ink">
              {copied ? t.common.copied : t.common.copy}
            </button>
          </span>
        </div>
        <dl className="m-0 flex flex-col">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-6 border-b border-rule py-3.5 last:border-b-0">
              <dt className="m-0 text-[13px] text-fg-subtle">{k}</dt>
              <dd className="m-0 text-right text-[15px]">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <ul className="m-0 mt-8 flex list-none flex-col p-0">
        {t.done.notes.map((n) => (
          <li key={n} className="flex items-start gap-3 border-b border-rule py-3.5 text-[15px] text-fg-muted">
            <Icon name="check" size={16} strokeWidth={2} className="mt-1 flex-none text-success" />
            {n}
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/bookings/" className="pill pill-solid">{t.done.myBookings}</Link>
        <Link href="/hosts/" className="pill pill-ghost">{t.done.hostView}</Link>
        <Link href="/" className="pill pill-ghost">{t.done.home}</Link>
      </div>
    </div>
  );
}
