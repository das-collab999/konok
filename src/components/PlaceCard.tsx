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
    <article className="lift flex flex-col overflow-hidden rounded-card border border-border-muted bg-canvas">
      <Link href={href} className="relative block aspect-[16/10] overflow-hidden no-underline">
        <Cover place={place} className="block h-full w-full object-cover" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-canvas/95 px-2.5 py-1 text-[12px] font-medium text-success">
          <Icon name="check" size={12} strokeWidth={2.4} />
          Проверено
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="truncate text-[13px] text-fg-subtle">{place.place}</span>
          <span className="shrink-0 rounded-full bg-inset px-2 py-0.5 text-[12px] text-fg-muted">{place.altitudeM} м</span>
        </div>

        <h3 className="m-0 text-[17px] leading-snug">
          <Link href={href} className="text-fg no-underline hover:underline">{place.title}</Link>
        </h3>

        <p className="m-0 text-[14px] leading-relaxed text-fg-muted">{place.short}</p>

        <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
          {placeChips(place).map((c) => (
            <li key={c.label} className="inline-flex items-center gap-1.5 rounded-full border border-border-muted px-2.5 py-1 text-[12px] text-fg-muted">
              <Icon name={c.icon} size={13} />
              {c.label}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border-muted pt-3">
          <div>
            <span className="text-[18px] font-semibold">${place.pricePerPersonUsd}</span>
            <span className="ml-1 text-[13px] text-fg-subtle">/ чел. за ночь</span>
          </div>
          <Link
            href={href}
            className="inline-flex h-9 items-center rounded-lg border border-border px-3.5 text-[14px] font-medium text-fg no-underline transition-colors hover:bg-subtle"
          >
            Смотреть
          </Link>
        </div>
      </div>
    </article>
  );
}
