import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PLACES, getPlace } from "@/data/places";
import { Cover, Icon, type IconName } from "@/components/ui";
import { BookingCard } from "./BookingCard";

export function generateStaticParams() {
  return PLACES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPlace((await params).slug);
  return { title: p ? `${p.title} — Конок` : "Конок" };
}

export default async function PlacePage({ params }: { params: Promise<{ slug: string }> }) {
  const place = getPlace((await params).slug);
  if (!place) notFound();

  const facts: { k: string; v: string; icon: IconName }[] = [
    { k: "Высота", v: `${place.altitudeM} м над морем`, icon: "mount" },
    { k: "Туалет", v: place.toilet, icon: "toilet" },
    { k: "Помыться", v: place.wash, icon: "shower" },
    { k: "Связь", v: place.net, icon: place.hasSignal ? "signal" : "nosignal" },
    { k: "Дорога", v: place.roadType, icon: place.carAccess === "car" ? "car" : "jeep" },
    { k: "Отопление", v: place.hasStove ? "Печка-буржуйка" : "Летом не нужно", icon: "fire" },
    { k: "Питание", v: "Ужин и завтрак включены", icon: "food" },
    { k: "Спальные места", v: place.type === "yurt" ? "Кошмы и тёплые одеяла" : "Кровати", icon: "bed" },
  ];

  return (
    <div className="mx-auto max-w-[1120px] px-4 py-6 sm:px-6">
      <nav aria-label="Хлебные крошки" className="flex items-center gap-1.5 text-[14px] text-fg-subtle">
        <Link href="/" className="text-fg-muted no-underline hover:underline">Главная</Link>
        <span>/</span>
        <Link href="/#stays" className="text-fg-muted no-underline hover:underline">Жильё</Link>
        <span>/</span>
        <span className="truncate">{place.place}</span>
      </nav>

      <div className="mt-5 flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
        <div className="min-w-0">
          <h1 className="m-0 max-w-[24ch] text-[clamp(24px,3.4vw,34px)] font-semibold leading-tight">{place.title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[14px] text-fg-muted">
            <span className="inline-flex items-center gap-1.5"><Icon name="pin" size={15} />{place.place}</span>
            <span className="inline-flex items-center gap-1.5"><Icon name="mount" size={15} />{place.altitudeM} м</span>
            <span className="inline-flex items-center gap-1.5 text-success"><Icon name="check" size={14} strokeWidth={2.4} />Проверено Конок</span>
          </div>
        </div>
      </div>

      <div className="relative mt-5 overflow-hidden rounded-card border border-border-muted">
        <Cover place={place} wide className="block aspect-[16/9] w-full object-cover sm:aspect-[21/9]" />
        {!place.photo && (
          <span className="absolute bottom-3 left-3 rounded-full bg-dark/80 px-3 py-1.5 text-[12px] text-white">
            Фотографии появятся после съёмки — пока условная картинка
          </span>
        )}
      </div>

      <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-start">
        <div className="flex min-w-0 flex-1 flex-col gap-10">
          <section className="rounded-card border border-border-muted bg-subtle p-5">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-accent text-[17px] font-semibold text-white">
                {place.host.replace("Семья ", "").charAt(0)}
              </span>
              <div className="min-w-0">
                <span className="eyebrow">История семьи</span>
                <h2 className="m-0 mt-1 text-[18px] font-semibold">{place.host}</h2>
                <p className="m-0 mt-2 text-[15px] leading-relaxed text-fg-muted">{place.story}</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="m-0 text-[20px] font-semibold">Честно о быте</h2>
            <ul className="m-0 mt-4 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2">
              {facts.map((f) => (
                <li key={f.k} className="flex items-center gap-3 rounded-card border border-border-muted px-4 py-3">
                  <Icon name={f.icon} size={20} className="flex-none text-fg-subtle" />
                  <span className="min-w-0">
                    <span className="block text-[12px] text-fg-subtle">{f.k}</span>
                    <span className="block text-[15px] font-medium">{f.v}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="m-0 text-[20px] font-semibold">Как добраться</h2>
            <p className="m-0 mt-3 max-w-[70ch] text-[15px] leading-relaxed text-fg-muted">{place.road}</p>
          </section>
        </div>

        <Suspense fallback={<div className="h-[520px] w-full rounded-card border border-border-muted bg-subtle lg:w-[360px] lg:flex-none" />}>
          <BookingCard place={place} />
        </Suspense>
      </div>
    </div>
  );
}
