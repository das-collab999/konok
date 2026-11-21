"use client";

import Link from "next/link";
import { toSom, type Place } from "@/data/places";
import { useFavourites } from "@/lib/favourites";
import { pick, useLang, type L } from "@/lib/i18n";
import { Cover, Icon, type IconName } from "./ui";

export function placeChips(p: Place): { key: string; label: L; icon: IconName }[] {
  const chips: { key: string; label: L; icon: IconName }[] = [];
  if (p.hasStove) chips.push({ key: "stove", label: { ru: "Печка", en: "Stove", zh: "炉子" }, icon: "fire" });
  if (p.hasBath) chips.push({ key: "bath", label: { ru: "Баня", en: "Banya", zh: "蒸浴" }, icon: "bath" });
  chips.push(
    p.hasSignal
      ? { key: "signal", label: { ru: "Связь", en: "Signal", zh: "有信号" }, icon: "signal" }
      : { key: "nosignal", label: { ru: "Без связи", en: "No signal", zh: "无信号" }, icon: "nosignal" },
  );
  chips.push(
    p.carAccess === "car"
      ? { key: "car", label: { ru: "Легковая", en: "Any car", zh: "轿车可达" }, icon: "car" }
      : { key: "jeep", label: { ru: "4×4", en: "4×4", zh: "需越野车" }, icon: "jeep" },
  );
  return chips;
}

export function PlaceCard({ place, query = "" }: { place: Place; query?: string }) {
  const { lang, t } = useLang();
  const fav = useFavourites();
  const href = `/place/${place.slug}/${query ? `?${query}` : ""}`;

  return (
    <article className="card surface surface-hover group relative flex h-full flex-col overflow-hidden rounded-2xl">
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden bg-cream-2 no-underline">
        <Cover place={place} className="zoom block h-full w-full object-cover" />
        <span className="tag absolute left-3 top-3 bg-paper/95 text-ink">
          <Icon name="check" size={12} strokeWidth={2.6} className="text-success" />
          {t.common.verified}
        </span>
        <span className="tag absolute bottom-3 left-3 bg-ink/85 text-cream">
          {place.altitudeM} {t.common.altitude}
        </span>
      </Link>

      <button
        type="button"
        onClick={() => fav.toggle(place.slug)}
        aria-pressed={fav.has(place.slug)}
        aria-label={t.common.favourite}
        title={t.common.favourite}
        className="absolute right-3 top-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-paper/95 shadow-[0_2px_8px_rgba(22,19,15,.18)] transition-transform hover:scale-105"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"
          fill={fav.has(place.slug) ? "#8E2420" : "none"} stroke="#8E2420" strokeWidth="1.8">
          <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
        </svg>
      </button>

      <div className="flex flex-1 flex-col p-5">
        <span className="text-[13px] text-fg-subtle">{pick(place.place, lang)}</span>

        <h3 className="m-0 mt-1.5 text-[19px] font-semibold leading-snug tracking-[-0.01em]">
          <Link href={href} className="text-fg no-underline hover:text-accent">
            {pick(place.title, lang)}
          </Link>
        </h3>

        <p className="m-0 mt-2 line-clamp-2 text-[14px] leading-relaxed text-fg-muted">{pick(place.short, lang)}</p>

        <ul className="m-0 mt-3.5 flex list-none flex-wrap gap-1.5 p-0">
          {placeChips(place).map((c) => (
            <li key={c.key} className="flex items-center gap-1.5 rounded-full border border-rule px-2.5 py-1 text-[12px] text-fg-muted">
              <Icon name={c.icon} size={13} strokeWidth={1.6} />
              {pick(c.label, lang)}
            </li>
          ))}
          <li className="flex items-center gap-1.5 rounded-full border border-rule px-2.5 py-1 text-[12px] text-fg-muted">
            <Icon name="car" size={13} strokeWidth={1.6} />
            {place.hoursFromBishkek} {t.common.hours}
          </li>
        </ul>

        <div className="mt-5 flex items-end justify-between gap-4 border-t border-rule pt-4" style={{ marginTop: "auto", paddingTop: "1rem" }}>
          <div className="leading-none">
            <span className="text-[22px] font-semibold tracking-[-0.02em]">${place.pricePerPersonUsd}</span>
            <span className="ml-1.5 text-[13px] text-fg-subtle">{t.common.perNight}</span>
            <span className="mt-1.5 block text-[12px] text-fg-subtle">≈ {toSom(place.pricePerPersonUsd)} {t.common.som}</span>
          </div>
          <Link href={href} className="pill pill-solid h-10 px-5 text-[12px]">
            {t.common.view}
            <Icon name="arrow" size={14} strokeWidth={1.8} />
          </Link>
        </div>
      </div>
    </article>
  );
}
