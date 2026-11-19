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
    <div className="mx-auto max-w-[1280px] px-5 pb-10 pt-8 sm:px-10">
      <nav aria-label="Хлебные крошки" className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
        <Link href="/" className="text-fg-muted no-underline hover:text-fg">Главная</Link>
        <span>·</span>
        <Link href="/#stays" className="text-fg-muted no-underline hover:text-fg">Жильё</Link>
        <span>·</span>
        <span className="truncate">{place.place}</span>
      </nav>

      <div className="mt-7 flex flex-wrap items-end justify-between gap-x-10 gap-y-5 border-b border-rule pb-8">
        <h1 className="display m-0 max-w-[16ch] text-[clamp(30px,5.4vw,64px)]">{place.title}</h1>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.14em] text-fg-muted">
          <span className="inline-flex items-center gap-2"><Icon name="pin" size={15} strokeWidth={1.4} />{place.place}</span>
          <span className="inline-flex items-center gap-2"><Icon name="mount" size={15} strokeWidth={1.4} />{place.altitudeM} м</span>
          <span className="inline-flex items-center gap-2 text-success"><Icon name="check" size={14} strokeWidth={2.4} />Проверено Конок</span>
        </div>
      </div>

      <div className="relative mt-8 overflow-hidden bg-cream-2">
        <Cover place={place} wide className="block aspect-[16/10] w-full object-cover sm:aspect-[21/9]" />
        {!place.photo && (
          <span className="absolute bottom-4 left-4 rounded-full bg-ink/75 px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-cream">
            Фотографии появятся после съёмки
          </span>
        )}
      </div>

      <div className="mt-14 flex flex-col gap-14 lg:flex-row lg:items-start lg:gap-16">
        <div className="flex min-w-0 flex-1 flex-col gap-14">
          <section className="border-t border-rule pt-8">
            <span className="eyebrow">История семьи</span>
            <h2 className="serif m-0 mt-4 text-[28px]">{place.host}</h2>
            <p className="m-0 mt-4 max-w-[62ch] text-[17px] leading-relaxed text-fg-muted">{place.story}</p>
          </section>

          <section className="border-t border-rule pt-8">
            <span className="eyebrow">Честно о быте</span>
            <h2 className="serif m-0 mt-4 text-[28px]">Что вас ждёт на самом деле</h2>
            <ul className="m-0 mt-7 grid list-none grid-cols-1 gap-x-10 gap-y-0 p-0 sm:grid-cols-2">
              {facts.map((f) => (
                <li key={f.k} className="flex items-center gap-4 border-b border-rule py-4">
                  <Icon name={f.icon} size={20} strokeWidth={1.3} className="flex-none text-fg-subtle" />
                  <span className="min-w-0">
                    <span className="block text-[11px] uppercase tracking-[0.14em] text-fg-subtle">{f.k}</span>
                    <span className="block text-[16px]">{f.v}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="border-t border-rule pt-8">
            <span className="eyebrow">Как добраться</span>
            <p className="m-0 mt-4 max-w-[62ch] text-[17px] leading-relaxed text-fg-muted">{place.road}</p>
          </section>
        </div>

        <Suspense fallback={<div className="h-[560px] w-full bg-paper lg:w-[380px] lg:flex-none" />}>
          <BookingCard place={place} />
        </Suspense>
      </div>
    </div>
  );
}
