import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { loadPlace, loadPlaces } from "@/lib/source";
import { EMERGENCY, MEALS, PACKING, TRANSPORT } from "@/data/guide";
import { Cover, Icon, type IconName } from "@/components/ui";
import { Motif, OrnamentBand, ZigzagBand } from "@/components/ethno";
import { DrawIn, Reveal } from "@/components/motion";
import { BookingCard } from "./BookingCard";

export async function generateStaticParams() {
  const places = await loadPlaces();
  return places.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = await loadPlace((await params).slug);
  return { title: p ? `${p.title} — Конок` : "Конок" };
}

export default async function PlacePage({ params }: { params: Promise<{ slug: string }> }) {
  const place = await loadPlace((await params).slug);
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

  // Что обычно подают именно здесь: горячее, завтрак и напиток.
  const table = [
    MEALS.find((m) => m.title === (place.region === "jalal" ? "Плов" : "Бешбармак")),
    MEALS.find((m) => m.title === "Шорпо"),
    MEALS.find((m) => m.title === "Боорсок"),
    MEALS.find((m) => m.title === (place.altitudeM > 2500 ? "Кумыс" : "Чай с горными травами")),
  ].filter(Boolean) as (typeof MEALS)[number][];

  // Способы доехать: для высоких джайлоо показываем трансфер и внедорожник.
  const ways = TRANSPORT.filter((t) =>
    place.carAccess === "4x4"
      ? ["Трансфер от Конок", "Аренда внедорожника", "Верхом"].includes(t.title)
      : ["Трансфер от Конок", "Маршрутка", "Общее такси", "Аренда машины"].includes(t.title),
  );

  return (
    <div className="mx-auto max-w-[1280px] px-5 pb-10 pt-8 sm:px-10">
      <nav aria-label="Хлебные крошки" className="flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-fg-subtle">
        <Link href="/" className="text-fg-muted no-underline hover:text-fg">Главная</Link>
        <span>·</span>
        <Link href="/#stays" className="text-fg-muted no-underline hover:text-fg">Жильё</Link>
        <span>·</span>
        <span className="truncate">{place.place}</span>
      </nav>

      <div className="mt-7 flex flex-wrap items-end justify-between gap-x-10 gap-y-5 border-b border-rule pb-8">
        <h1 className="display m-0 max-w-[16ch] text-[clamp(30px,5.4vw,64px)]">{place.title}</h1>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] uppercase tracking-[0.14em] text-fg-muted">
          <span className="inline-flex items-center gap-2"><Icon name="pin" size={15} strokeWidth={1.4} />{place.place}</span>
          <span className="inline-flex items-center gap-2"><Icon name="mount" size={15} strokeWidth={1.4} />{place.altitudeM} м</span>
          <span className="inline-flex items-center gap-2 text-success"><Icon name="check" size={14} strokeWidth={2.4} />Проверено Конок</span>
        </div>
      </div>

      <div className="relative mt-8 overflow-hidden bg-cream-2">
        <Cover place={place} wide className="block aspect-[16/10] w-full object-cover sm:aspect-[21/9]" />
        {!place.photo && (
          <span className="absolute bottom-4 left-4 rounded-full bg-ink/75 px-4 py-2 text-[12px] uppercase tracking-[0.16em] text-cream">
            Фотографии появятся после съёмки
          </span>
        )}
      </div>

      <div className="mt-14 flex flex-col gap-14 lg:flex-row lg:items-start lg:gap-16">
        <div className="flex min-w-0 flex-1 flex-col gap-14">
          {/* История семьи */}
          <section className="border-t border-rule pt-8">
            <span className="eyebrow flex items-center gap-2.5">
              <DrawIn duration={1200}><Motif name="gul" size={30} className="text-ochre" /></DrawIn>
              История семьи
            </span>
            <h2 className="serif m-0 mt-4 text-[28px]">{place.host}</h2>
            <p className="m-0 mt-4 max-w-[62ch] text-[17px] leading-relaxed text-fg-muted">{place.story}</p>
          </section>

          {/* Быт */}
          <section className="border-t border-rule pt-8">
            <span className="eyebrow">Честно о быте</span>
            <h2 className="serif m-0 mt-4 text-[28px]">Что вас ждёт на самом деле</h2>
            <ul className="m-0 mt-7 grid list-none grid-cols-1 gap-x-10 gap-y-0 p-0 sm:grid-cols-2">
              {facts.map((f) => (
                <li key={f.k} className="flex items-center gap-4 border-b border-rule py-4">
                  <Icon name={f.icon} size={20} strokeWidth={1.3} className="flex-none text-fg-subtle" />
                  <span className="min-w-0">
                    <span className="block text-[12px] uppercase tracking-[0.14em] text-fg-subtle">{f.k}</span>
                    <span className="block text-[16px]">{f.v}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Стол */}
          <section className="border-t border-rule pt-8">
            <span className="eyebrow">Стол</span>
            <h2 className="serif m-0 mt-4 text-[28px]">Что здесь едят</h2>
            <p className="m-0 mt-3 max-w-[60ch] text-[15px] leading-relaxed text-fg-muted">
              Ужин и завтрак входят в цену. Не едите мясо — скажите при брони, сделают без него.
            </p>
            <ul className="m-0 mt-6 grid list-none grid-cols-1 gap-x-10 gap-y-0 p-0 sm:grid-cols-2">
              {table.map((m) => (
                <li key={m.title} className="border-t border-rule py-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="serif m-0 text-[20px]">{m.title}</h3>
                    {m.vegetarian && (
                      <span className="rounded-full border border-moss px-2.5 py-0.5 text-[12px] uppercase tracking-[0.12em] text-moss">
                        {m.note ?? "Без мяса"}
                      </span>
                    )}
                  </div>
                  <p className="m-0 mt-2 text-[15px] leading-relaxed text-fg-muted">{m.text}</p>
                </li>
              ))}
            </ul>
            <Link href="/guide/#food" className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-accent no-underline">
              Вся кухня в путеводителе <Icon name="arrow" size={14} strokeWidth={1.8} />
            </Link>
          </section>

          {/* Дорога */}
          <section className="border-t border-rule pt-8">
            <span className="eyebrow">Дорога</span>
            <h2 className="serif m-0 mt-4 text-[28px]">Как добраться</h2>
            <p className="m-0 mt-4 max-w-[62ch] text-[17px] leading-relaxed text-fg-muted">{place.road}</p>

            <ul className="m-0 mt-7 flex list-none flex-col p-0">
              {ways.map((w) => (
                <li key={w.title} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-rule py-4">
                  <div className="min-w-0">
                    <div className="text-[16px]">{w.title}</div>
                    <div className="mt-1 max-w-[52ch] text-[14px] leading-relaxed text-fg-muted">{w.text}</div>
                  </div>
                  <div className="serif whitespace-nowrap text-[17px]">{w.price}</div>
                </li>
              ))}
            </ul>
          </section>

          {/* Собраться */}
          <section className="border-t border-rule pt-8">
            <span className="eyebrow">Рюкзак</span>
            <h2 className="serif m-0 mt-4 text-[28px]">Что взять с собой</h2>
            <ul className="m-0 mt-5 grid list-none grid-cols-1 gap-x-10 gap-y-0 p-0 sm:grid-cols-2">
              {PACKING.slice(0, 6).map((item) => (
                <li key={item} className="flex items-start gap-3 border-t border-rule py-3 text-[15px]">
                  <Icon name="check" size={16} strokeWidth={2} className="mt-1 flex-none text-moss" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Безопасность */}
          <Reveal>
          <section className="felt border border-rule bg-paper p-7">
            <span className="eyebrow">Если что-то случилось</span>
            <h2 className="serif m-0 mt-3 text-[24px]">Телефоны под рукой</h2>
            <p className="m-0 mt-3 max-w-[58ch] text-[15px] leading-relaxed text-fg-muted">
              Телефон хозяина придёт вместе с подтверждением брони и сохранится в разделе «Мои брони» —
              он открывается без интернета. {place.hasSignal ? "" : "Здесь связи нет: уточните у хозяина, откуда ловит сеть."}
            </p>
            <ul className="m-0 mt-5 flex list-none flex-wrap gap-x-10 gap-y-3 p-0">
              {EMERGENCY.slice(0, 4).map((c) => (
                <li key={c.phone} className="flex items-baseline gap-3">
                  <a href={`tel:${c.phone}`} className="serif text-[24px] text-accent no-underline">{c.phone}</a>
                  <span className="text-[13px] text-fg-muted">{c.title}</span>
                </li>
              ))}
            </ul>
          </section>
          </Reveal>
        </div>

        <Suspense fallback={<div className="h-[560px] w-full bg-paper lg:w-[380px] lg:flex-none" />}>
          <BookingCard place={place} />
        </Suspense>
      </div>

      <div className="mt-16 bg-accent">
        <ZigzagBand id={`zig-top-${place.slug}`} height={14} />
        <div className="overflow-hidden">
          <div className="band-drift">
            <OrnamentBand id={`band-${place.slug}`} height={38} color="#EDE2C8" opacity={0.95} />
          </div>
        </div>
        <ZigzagBand id={`zig-bot-${place.slug}`} height={14} flip />
      </div>
    </div>
  );
}
