"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { toSom, type Place } from "@/data/places";
import { useFavourites } from "@/lib/favourites";
import { EMERGENCY, MEALS, PACKING, TRANSPORT } from "@/data/guide";
import { pick, useLang } from "@/lib/i18n";
import { Cover, hasPlacePhoto, Icon, type IconName } from "@/components/ui";
import { Motif, OrnamentBand, ZigzagBand } from "@/components/ethno";
import { Art } from "@/components/art";
import { getStory } from "@/data/stories";
import { DrawIn, Reveal } from "@/components/motion";
import { BookingCard } from "./BookingCard";

export function PlaceView({ place }: { place: Place }) {
  const { lang, t } = useLang();
  const fav = useFavourites();
  const [copied, setCopied] = useState(false);
  const months = t.common.months.split(" ");

  const share = async () => {
    const url = window.location.href;
    const title = pick(place.title, lang);
    try {
      if (navigator.share) { await navigator.share({ title, url }); return; }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const facts: { k: string; v: string; icon: IconName }[] = [
    { k: t.place.fact.altitude, v: `${place.altitudeM} ${t.common.altitude}`, icon: "mount" },
    { k: t.place.fact.toilet, v: pick(place.toilet, lang), icon: "toilet" },
    { k: t.place.fact.wash, v: pick(place.wash, lang), icon: "shower" },
    { k: t.place.fact.signal, v: pick(place.net, lang), icon: place.hasSignal ? "signal" : "nosignal" },
    { k: t.place.fact.road, v: pick(place.roadType, lang), icon: place.carAccess === "car" ? "car" : "jeep" },
    { k: t.place.fact.heating, v: place.hasStove ? t.place.heatingYes : t.place.heatingNo, icon: "fire" },
    { k: t.place.fact.food, v: t.place.foodIncluded, icon: "food" },
    { k: t.place.fact.beds, v: place.type === "yurt" ? t.place.bedsYurt : t.place.bedsHouse, icon: "bed" },
  ];

  // Что подают именно здесь: горячее, завтрак и напиток.
  const table = [
    MEALS.find((m) => m.title.ru === (place.region === "jalal" ? "Плов" : "Бешбармак")),
    MEALS.find((m) => m.title.ru === "Шорпо"),
    MEALS.find((m) => m.title.ru === "Боорсок"),
    MEALS.find((m) => m.title.ru === (place.altitudeM > 2500 ? "Кумыс" : "Чай с горными травами")),
  ].filter(Boolean) as (typeof MEALS)[number][];

  // рассказ о месте, если он есть
  const STORY_BY_PLACE: Record<string, string> = {
    "sonkul-aseke": "son-kul",
    "tash-rabat": "tash-rabat",
    "jety-oguz": "jety-oguz",
    "arslanbob": "arslanbob",
    "tamga": "issyk-kul",
    "karakol-archa": "issyk-kul",
    "chon-kemin": "ala-archa",
  };
  const story = getStory(STORY_BY_PLACE[place.slug] ?? "");

  const ways = TRANSPORT.filter((w) =>
    place.carAccess === "4x4"
      ? ["Трансфер от Конок", "Аренда машины", "Верхом"].includes(w.title.ru)
      : ["Трансфер от Конок", "Маршрутка", "Общее такси", "Аренда машины"].includes(w.title.ru),
  );

  return (
    <div className="mx-auto max-w-[1280px] px-5 pb-10 pt-6 sm:px-10">
      <nav aria-label="breadcrumbs" className="flex items-center gap-2 text-[13px] text-fg-subtle">
        <Link href="/" className="inline-flex h-11 items-center text-fg-muted no-underline hover:text-fg">{t.nav.home}</Link>
        <span>·</span>
        <Link href="/stays/" className="inline-flex h-11 items-center text-fg-muted no-underline hover:text-fg">{t.nav.stays}</Link>
        <span>·</span>
        <span className="truncate">{pick(place.place, lang)}</span>
      </nav>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-x-10 gap-y-5 border-b border-rule pb-8">
        <h1 className="display m-0 max-w-[16ch] text-[clamp(28px,5.4vw,64px)]">{pick(place.title, lang)}</h1>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-fg-muted">
          <span className="inline-flex items-center gap-2"><Icon name="pin" size={15} strokeWidth={1.4} />{pick(place.place, lang)}</span>
          <span className="inline-flex items-center gap-2"><Icon name="mount" size={15} strokeWidth={1.4} />{place.altitudeM} {t.common.altitude}</span>
          <span className="inline-flex items-center gap-2"><Icon name="coin" size={15} strokeWidth={1.4} />${place.pricePerPersonUsd} ≈ {toSom(place.pricePerPersonUsd)} {t.common.som}</span>
          <span className="inline-flex items-center gap-2 text-success"><Icon name="check" size={14} strokeWidth={2.4} />{t.common.verifiedFull}</span>
          <span className="inline-flex items-center gap-2"><Icon name="car" size={15} strokeWidth={1.4} />{t.common.fromBishkek} {place.hoursFromBishkek} {t.common.hours}</span>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button" onClick={() => fav.toggle(place.slug)} aria-pressed={fav.has(place.slug)}
          className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border border-rule-strong px-5 text-[13px] text-fg transition-colors hover:border-ink"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true" fill={fav.has(place.slug) ? "#8E2420" : "none"} stroke="#8E2420" strokeWidth="1.8">
            <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
          </svg>
          {t.common.favourite}
        </button>
        <button
          type="button" onClick={share}
          className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border border-rule-strong px-5 text-[13px] text-fg transition-colors hover:border-ink"
        >
          <Icon name="arrow" size={15} strokeWidth={1.8} />
          {copied ? t.common.copied : t.common.share}
        </button>
      </div>

      {/* сезон: когда здесь принимают */}
      <div className="mt-6 border-t border-rule pt-5">
        <span className="eyebrow">{t.common.season}</span>
        <ul className="m-0 mt-3 grid list-none grid-cols-6 gap-1.5 p-0 sm:grid-cols-12">
          {months.map((mo, i) => {
            const n = i + 1;
            const on = place.seasonFrom <= place.seasonTo
              ? n >= place.seasonFrom && n <= place.seasonTo
              : n >= place.seasonFrom || n <= place.seasonTo;
            return (
              <li key={mo} className={`rounded-full py-1.5 text-center text-[12px] ${on ? "bg-accent text-cream" : "bg-cream-2 text-fg-subtle"}`}>
                {mo}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="relative mt-8 overflow-hidden bg-cream-2">
        <Cover place={place} wide priority className="block aspect-[16/10] w-full object-cover sm:aspect-[21/9]" />
        {!hasPlacePhoto(place, true) && (
          <span className="absolute bottom-4 left-4 rounded-full bg-ink/75 px-4 py-2 text-[12px] text-cream">{t.place.photoSoon}</span>
        )}
      </div>

      <div className="mt-12 flex flex-col gap-14 lg:flex-row lg:items-start lg:gap-16">
        <div className="flex min-w-0 flex-1 flex-col gap-14">
          <section className="border-t border-rule pt-8">
            <span className="eyebrow flex items-center gap-2.5">
              <DrawIn duration={1200}><Motif name="gul" size={30} className="text-ochre" /></DrawIn>
              {t.place.story}
            </span>
            <h2 className="serif m-0 mt-4 text-[28px]">{pick(place.host, lang)}</h2>
            <p className="m-0 mt-4 max-w-[62ch] text-[17px] leading-relaxed text-fg-muted">{pick(place.story, lang)}</p>
          </section>

          <section className="border-t border-rule pt-8">
            <div className="flex flex-wrap items-center gap-6">
              <Art name={place.type === "yurt" ? "yurt" : "house"} label={pick(place.title, lang)} width={280} className="h-auto w-[200px] flex-none sm:w-[280px]" />
              <div>
                <span className="eyebrow">{t.place.facts}</span>
                <h2 className="serif m-0 mt-3 text-[28px]">{t.place.factsTitle}</h2>
              </div>
            </div>
            <ul className="m-0 mt-7 grid list-none grid-cols-1 gap-x-10 gap-y-0 p-0 sm:grid-cols-2">
              {facts.map((f) => (
                <li key={f.k} className="flex items-center gap-4 border-b border-rule py-4">
                  <Icon name={f.icon} size={20} strokeWidth={1.3} className="flex-none text-fg-subtle" />
                  <span className="min-w-0">
                    <span className="block text-[13px] text-fg-subtle">{f.k}</span>
                    <span className="block text-[16px]">{f.v}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="border-t border-rule pt-8">
            <span className="eyebrow">{t.place.table}</span>
            <h2 className="serif m-0 mt-4 text-[28px]">{t.place.tableTitle}</h2>
            <p className="m-0 mt-3 max-w-[60ch] text-[15px] leading-relaxed text-fg-muted">{t.place.tableSub}</p>
            <ul className="m-0 mt-6 grid list-none grid-cols-1 gap-x-10 gap-y-0 p-0 sm:grid-cols-2">
              {table.map((m) => (
                <li key={m.title.ru} className="flex flex-col gap-3 border-t border-rule py-5 min-[420px]:flex-row min-[420px]:gap-4">
                  <Art name={m.art} label={pick(m.title, lang)} width={168} className="h-auto w-[168px] max-w-full flex-none min-[420px]:w-[120px] sm:w-[168px]" />
                  <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="serif m-0 text-[20px]">{pick(m.title, lang)}</h3>
                    {m.vegetarian && (
                      <span className="rounded-full border border-moss px-2.5 py-0.5 text-[12px] text-moss">
                        {m.note ? pick(m.note, lang) : t.guide.noMeat}
                      </span>
                    )}
                  </div>
                  <p className="m-0 mt-2 text-[15px] leading-relaxed text-fg-muted">{pick(m.text, lang)}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link href="/guide/#food" className="mt-6 inline-flex h-11 items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-accent no-underline">
              {t.place.allFood} <Icon name="arrow" size={14} strokeWidth={1.8} />
            </Link>
          </section>

          <section className="border-t border-rule pt-8">
            <span className="eyebrow">{t.place.road}</span>
            <h2 className="serif m-0 mt-4 text-[28px]">{t.place.roadTitle}</h2>
            <p className="m-0 mt-4 max-w-[62ch] text-[17px] leading-relaxed text-fg-muted">{pick(place.road, lang)}</p>

            <ul className="m-0 mt-7 flex list-none flex-col p-0">
              {ways.map((w) => (
                <li key={w.title.ru} className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-rule py-4">
                  <Art name={w.art} label={pick(w.title, lang)} width={140} className="h-auto w-[108px] flex-none sm:w-[140px]" />
                  <div className="min-w-0 flex-1 basis-[220px]">
                    <div className="text-[16px]">{pick(w.title, lang)}</div>
                    <div className="mt-1 max-w-[52ch] text-[14px] leading-relaxed text-fg-muted">{pick(w.text, lang)}</div>
                  </div>
                  <div className="serif whitespace-nowrap text-[17px]">{pick(w.price, lang)}</div>
                </li>
              ))}
            </ul>
          </section>

          <section className="border-t border-rule pt-8">
            <span className="eyebrow">{t.place.packing}</span>
            <h2 className="serif m-0 mt-4 text-[28px]">{t.place.packingTitle}</h2>
            <ul className="m-0 mt-5 grid list-none grid-cols-1 gap-x-10 gap-y-0 p-0 sm:grid-cols-2">
              {PACKING.slice(0, 6).map((item) => (
                <li key={item.ru} className="flex items-start gap-3 border-t border-rule py-3 text-[15px]">
                  <Icon name="check" size={16} strokeWidth={2} className="mt-1 flex-none text-moss" />
                  {pick(item, lang)}
                </li>
              ))}
            </ul>
          </section>

          {story && (
            <Reveal>
              <Link href={`/stories/${story.slug}/`} className="flex flex-wrap items-center gap-6 border border-rule bg-paper p-5 text-fg no-underline transition-colors hover:bg-cream-2">
                <Art name={story.art} label={pick(story.title, lang)} width={200} className="h-auto w-[140px] flex-none sm:w-[200px]" />
                <span className="min-w-0 flex-1 basis-[240px]">
                  <span className="eyebrow block">{t.common.aboutPlace}</span>
                  <span className="serif mt-2 block text-[24px]">{pick(story.title, lang)}</span>
                  <span className="mt-2 block max-w-[52ch] text-[15px] leading-relaxed text-fg-muted">{pick(story.lead, lang)}</span>
                  <span className="mt-3 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-accent">
                    {t.common.readMore} →
                  </span>
                </span>
              </Link>
            </Reveal>
          )}

          <Reveal>
            <section className="felt border border-rule bg-paper p-7">
              <span className="eyebrow">{t.place.safety}</span>
              <h2 className="serif m-0 mt-3 text-[24px]">{t.place.safetyTitle}</h2>
              <p className="m-0 mt-3 max-w-[58ch] text-[15px] leading-relaxed text-fg-muted">
                {t.place.safetyText} {place.hasSignal ? "" : t.place.noSignal}
              </p>
              <ul className="m-0 mt-5 flex list-none flex-wrap gap-x-10 gap-y-3 p-0">
                {EMERGENCY.slice(0, 4).map((c) => (
                  <li key={c.phone} className="flex items-baseline gap-3">
                    <a href={`tel:${c.phone}`} className="serif inline-flex h-11 items-center text-[24px] text-accent no-underline">{c.phone}</a>
                    <span className="text-[13px] text-fg-muted">{pick(c.title, lang)}</span>
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
        <div className="overflow-hidden"><div className="band-drift"><OrnamentBand id={`band-${place.slug}`} height={38} color="#EDE2C8" /></div></div>
        <ZigzagBand id={`zig-bot-${place.slug}`} height={14} flip />
      </div>
    </div>
  );
}
