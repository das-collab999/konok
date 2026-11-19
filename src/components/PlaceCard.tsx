import Link from "next/link";
import type { Place } from "@/data/places";
import { Cover, Icon, type IconName } from "./ui";

export function placeChips(p: Place): { label: string; icon: IconName }[] {
  const chips: { label: string; icon: IconName }[] = [];
  if (p.hasStove) chips.push({ label: "Печка", icon: "fire" });
  if (p.hasBath) chips.push({ label: "Баня", icon: "bath" });
  chips.push(p.hasSignal ? { label: "Связь", icon: "signal" } : { label: "Без связи", icon: "nosignal" });
  chips.push(p.carAccess === "car" ? { label: "Легковая", icon: "car" } : { label: "4×4", icon: "jeep" });
  return chips;
}

export function PlaceCard({ place, query = "" }: { place: Place; query?: string }) {
  const href = `/place/${place.slug}/${query ? `?${query}` : ""}`;

  return (
    <article className="card group flex flex-col">
      <Link href={href} className="relative block aspect-[4/5] overflow-hidden bg-cream-2 no-underline">
        <Cover place={place} className="zoom block h-full w-full object-cover" />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-cream/90 px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-ink">
          <Icon name="check" size={11} strokeWidth={2.6} />
          Проверено
        </span>
        <span className="absolute bottom-4 right-4 rounded-full bg-ink/80 px-3 py-1.5 text-[12px] font-medium uppercase tracking-[0.16em] text-cream">
          {place.altitudeM} м
        </span>
      </Link>

      <div className="flex flex-1 flex-col pt-5">
        <span className="eyebrow">{place.place}</span>

        <h3 className="serif m-0 mt-3 text-[24px]">
          <Link href={href} className="text-fg no-underline decoration-rule-strong underline-offset-4 hover:underline">{place.title}</Link>
        </h3>

        <p className="m-0 mt-3 text-[15px] leading-relaxed text-fg-muted">{place.short}</p>

        <ul className="m-0 mt-4 flex list-none flex-wrap gap-x-4 gap-y-2 p-0 text-[12px] uppercase tracking-[0.1em] text-fg-subtle">
          {placeChips(place).map((c) => (
            <li key={c.label} className="flex items-center gap-1.5">
              <Icon name={c.icon} size={14} strokeWidth={1.4} />
              {c.label}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-end justify-between gap-4 border-t border-rule pt-4 mt-5">
          <div className="leading-none">
            <span className="serif text-[26px]">${place.pricePerPersonUsd}</span>
            <span className="ml-2 text-[12px] uppercase tracking-[0.12em] text-fg-subtle">чел./ночь</span>
          </div>
          <Link href={href} className="inline-flex h-11 items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-fg no-underline transition-colors hover:text-accent">
            Смотреть
            <Icon name="arrow" size={14} strokeWidth={1.8} />
          </Link>
        </div>
      </div>
    </article>
  );
}
