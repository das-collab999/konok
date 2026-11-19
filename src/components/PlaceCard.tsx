import Link from "next/link";
import type { Place } from "@/data/places";
import { Icon, PlaceArt, type IconName } from "./ui";

export function placeChips(p: Place): { label: string; icon: IconName }[] {
  const chips: { label: string; icon: IconName }[] = [];
  if (p.hasStove) chips.push({ label: "Печка", icon: "fire" });
  if (p.hasBath) chips.push({ label: "Баня", icon: "bath" });
  chips.push(p.hasSignal ? { label: "Связь", icon: "signal" } : { label: "Без связи", icon: "nosignal" });
  chips.push(p.carAccess === "car" ? { label: "Легковая", icon: "car" } : { label: "4×4", icon: "jeep" });
  return chips;
}

export function PlaceCard({ place }: { place: Place }) {
  return (
    <article className="card-hover flex flex-col overflow-hidden rounded-[18px] border border-line bg-card">
      <div className="relative h-[190px]">
        <PlaceArt place={place} className="block h-full w-full" />
        <span className="absolute left-3 top-3 rounded-full bg-green px-2.5 py-1.5 text-xs font-bold text-white">Проверено Конок</span>
        <span className="absolute right-3 top-3 rounded-full bg-ink/80 px-2.5 py-1.5 text-xs font-semibold text-felt">{place.altitudeM} м</span>
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-[18px] pb-5">
        <div className="text-[13px] font-bold uppercase tracking-wide text-red">{place.place}</div>
        <h3 className="m-0 font-serif text-[22px] leading-tight">{place.title}</h3>
        <p className="m-0 text-sm leading-relaxed text-muted">{place.short}</p>
        <div className="flex flex-wrap gap-1.5">
          {placeChips(place).map((c) => (
            <span key={c.label} className="inline-flex items-center gap-1.5 rounded-lg bg-felt px-2 py-1 text-xs font-semibold">
              <Icon name={c.icon} size={14} className="text-red" strokeWidth={2} />
              {c.label}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between gap-2.5 pt-2">
          <div>
            <span className="text-[22px] font-bold">${place.pricePerPersonUsd}</span>
            <span className="text-[13px] text-muted"> / чел. за ночь</span>
          </div>
          <Link href={`/place/${place.slug}/`} className="inline-flex h-11 items-center rounded-[10px] bg-red px-[18px] text-[15px] font-bold text-white hover:brightness-110">
            Смотреть
          </Link>
        </div>
      </div>
    </article>
  );
}
