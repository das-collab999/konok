"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatDate } from "@/lib/useBooking";
import { readBookings, writeBookings, type SavedBooking } from "@/lib/bookings";
import { useLang } from "@/lib/i18n";
import { Icon } from "@/components/ui";
import { Motif } from "@/components/ethno";
import { PLACES } from "@/data/places";
import { useFavourites } from "@/lib/favourites";
import { PlaceCard } from "@/components/PlaceCard";

export default function BookingsPage() {
  const { lang, t } = useLang();
  const [list, setList] = useState<SavedBooking[] | null>(null);
  const fav = useFavourites();
  const saved = PLACES.filter((p) => fav.has(p.slug));

  useEffect(() => {
    setList([...readBookings()].reverse());
  }, []);

  const forget = (code: string) => {
    setList((cur) => {
      const next = (cur ?? []).filter((b) => b.code !== code);
      writeBookings([...next].reverse());
      return next;
    });
  };

  return (
    <div className="mx-auto max-w-[1100px] px-5 pb-10 pt-10 sm:px-10">
      <span className="eyebrow">{t.bookings.eyebrow}</span>
      <h1 className="display m-0 mt-4 text-[clamp(30px,5.6vw,60px)]">{t.bookings.title}</h1>
      <p className="m-0 mt-6 max-w-[58ch] text-[16px] leading-relaxed text-fg-muted">{t.bookings.text}</p>

      {list === null && <p className="mt-12 text-[15px] text-fg-subtle">{t.common.loading}</p>}

      {list !== null && list.length === 0 && (
        <div className="mt-12 border border-dashed border-rule-strong px-8 py-8 sm:py-12 sm:py-20 text-center">
          <Motif name="gul" size={72} className="mx-auto text-rule-strong" />
          <p className="serif m-0 mt-5 text-[24px]">{t.bookings.emptyTitle}</p>
          <p className="m-0 mt-3 text-[15px] text-fg-muted">{t.bookings.emptySub}</p>
          <Link href="/stays/" className="pill pill-solid mt-8">{t.bookings.emptyBtn}</Link>
        </div>
      )}

      {list !== null && list.length > 0 && (
        <ul className="m-0 mt-12 flex list-none flex-col p-0">
          {list.map((b) => (
            <li key={b.code} className="border-t border-rule py-8 last:border-b">
              <div className="flex flex-wrap items-start justify-between gap-x-10 gap-y-5">
                <div className="min-w-0 flex-1 basis-[320px]">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="inline-flex items-center gap-2 text-[13px] text-success">
                      <Icon name="check" size={13} strokeWidth={2.2} />
                      {t.bookings.waiting}
                    </span>
                    <span className="text-[13px] tracking-[0.12em] text-fg-subtle">{b.code}</span>
                  </div>

                  <h2 className="serif m-0 mt-3 text-[24px]">
                    <Link href={`/place/${b.slug}/`} className="text-fg no-underline decoration-rule-strong underline-offset-4 hover:underline">{b.title}</Link>
                  </h2>

                  <p className="m-0 mt-2.5 text-[14px] text-fg-muted">{b.place ? `${b.place} · ` : ""}{b.host}</p>
                  <p className="m-0 mt-1 text-[14px] text-fg-muted">
                    {b.date ? `${t.place.arrival}: ${formatDate(b.date, lang)} · ` : ""}{b.nights} {t.common.nights} · {b.guests} {t.common.guests}
                  </p>
                </div>

                <div className="flex items-end gap-6">
                  <span className="serif text-[30px]">${b.total}</span>
                  <button
                    type="button"
                    onClick={() => forget(b.code)}
                    className="h-11 cursor-pointer text-[13px] text-fg-subtle underline underline-offset-4 transition-colors hover:text-fg"
                  >
                    {t.bookings.remove}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Избранное */}
      <section className="mt-20 border-t border-rule pt-10">
        <span className="eyebrow">{t.common.favourites}</span>
        <h2 className="display m-0 mt-4 text-[clamp(24px,4vw,40px)]">{t.common.favourites}</h2>
        {saved.length === 0 ? (
          <p className="m-0 mt-5 max-w-[52ch] text-[15px] text-fg-muted">{t.common.noFavourites}</p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {saved.map((p) => <PlaceCard key={p.slug} place={p} />)}
          </div>
        )}
      </section>
    </div>
  );
}
