"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PLACES, REGIONS, type Place, type Region } from "@/data/places";
import { useLang } from "@/lib/i18n";
import { PlaceCard } from "@/components/PlaceCard";
import { HeroArt, Icon, type IconName } from "@/components/ui";

type Feature = "stove" | "bath" | "signal" | "car";

const FEATURES: { key: Feature; label: string; icon: IconName; test: (p: Place) => boolean }[] = [
  { key: "stove", label: "Печка", icon: "fire", test: (p) => p.hasStove },
  { key: "bath", label: "Баня или душ", icon: "bath", test: (p) => p.hasBath },
  { key: "signal", label: "Есть связь", icon: "signal", test: (p) => p.hasSignal },
  { key: "car", label: "Обычная машина", icon: "car", test: (p) => p.carAccess === "car" },
];

const PROMISES: { title: string; text: string; icon: IconName }[] = [
  { title: "Проверено лично", text: "Мы были в каждом лагере: печка, туалет, вода и дорога описаны как есть.", icon: "shield" },
  { title: "Ответ за 2 часа", text: "Хозяин подтверждает бронь в мессенджере. Не ответил — подключается Конок.", icon: "chat" },
  { title: "Отмена за 7 дней", text: "Бесплатно и без переписки: планы в горах меняет погода, а не штрафы.", icon: "calendar" },
  { title: "Деньги остаются семье", text: "88% платежа уходит хозяину на Элсом, MBank или карту после заезда.", icon: "coin" },
];

const EXPERIENCES: { title: string; text: string; price: string; icon: IconName }[] = [
  { title: "Шырдак и войлок", text: "Мастерица из Кочкора показывает, как валяют войлок и шьют шырдак. Свой узор заберёте с собой.", price: "от $10", icon: "wool" },
  { title: "Бешбармак с семьёй", text: "Раскатываем тесто, режем мясо и едим руками — так, как это делают дома.", price: "от $12", icon: "food" },
  { title: "Конный день на джайлоо", text: "Маршрут с чабаном по летним пастбищам, озеро и обед у юрты.", price: "от $25", icon: "horse" },
  { title: "Кок-бору и игры кочевников", text: "Смотрим конные игры, знакомимся с всадниками, пробуем ордо.", price: "от $15", icon: "ball" },
];

const HOST_PERKS: { title: string; text: string; icon: IconName }[] = [
  { title: "Размещение бесплатно", text: "Комиссия — только когда гость приехал.", icon: "shield" },
  { title: "Съёмка за наш счёт", text: "Приезжаем и фотографируем юрту, семью и дорогу.", icon: "camera" },
  { title: "Брони в мессенджере", text: "Заявка на кыргызском, ответ одной кнопкой.", icon: "chat" },
  { title: "Выплаты после заезда", text: "Элсом, MBank или карта — на выбор.", icon: "coin" },
];

export default function Home() {
  const { t } = useLang();
  const [region, setRegion] = useState<Region | "all">("all");
  const [feats, setFeats] = useState<Feature[]>([]);
  const [date, setDate] = useState("2027-07-12");
  const [guests, setGuests] = useState(2);

  const stays = useMemo(
    () => PLACES.filter((p) => (region === "all" || p.region === region) && FEATURES.every((f) => !feats.includes(f.key) || f.test(p))),
    [region, feats],
  );

  // Carried into the place page so the booking card opens with what was searched.
  const query = new URLSearchParams({ g: String(guests), d: date }).toString();
  const toggle = (k: Feature) => setFeats((cur) => (cur.includes(k) ? cur.filter((x) => x !== k) : [...cur, k]));

  const chip = (on: boolean) =>
    `inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full border px-3.5 text-[14px] transition-colors ${
      on ? "border-accent bg-accent text-white" : "border-border bg-canvas text-fg-muted hover:bg-subtle hover:text-fg"
    }`;

  const fieldLabel = "text-[12px] font-medium text-fg-subtle";
  const fieldInput = "h-9 w-full rounded-lg border border-border bg-canvas px-2.5 text-[15px] text-fg outline-none focus:border-accent";

  return (
    <>
      {/* ---------------------------------------------------------- Hero */}
      <section className="border-b border-border-muted bg-subtle">
        <div className="mx-auto grid max-w-[1120px] items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:py-16">
          <div>
            <span className="eyebrow">Кыргызстан · Тянь-Шань</span>
            <h1 className="m-0 mt-3 max-w-[15ch] text-[clamp(30px,4.6vw,46px)] font-semibold leading-[1.08]">{t.heroTitle}</h1>
            <p className="m-0 mt-4 max-w-[52ch] text-[16px] leading-relaxed text-fg-muted sm:text-[17px]">{t.heroSub}</p>

            <form
              onSubmit={(e) => { e.preventDefault(); document.getElementById("stays")?.scrollIntoView({ behavior: "smooth" }); }}
              className="mt-7 rounded-card border border-border-muted bg-canvas p-3 shadow-sm"
            >
              <div className="grid gap-3 sm:grid-cols-[1.2fr_1fr_auto]">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="f-region" className={fieldLabel}>{t.where}</label>
                  <select id="f-region" value={region} onChange={(e) => setRegion(e.target.value as Region | "all")} className={`${fieldInput} cursor-pointer`}>
                    {REGIONS.map((r) => <option key={r.key} value={r.key}>{r.label}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="f-date" className={fieldLabel}>{t.when}</label>
                  <input id="f-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className={fieldInput} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="f-guests" className={fieldLabel}>{t.guests}</label>
                  <input
                    id="f-guests" type="number" min={1} max={12} value={guests}
                    onChange={(e) => setGuests(Math.min(12, Math.max(1, Number(e.target.value) || 1)))}
                    className={`${fieldInput} sm:w-20`}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-3 inline-flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-accent px-5 text-[15px] font-medium text-white transition-colors hover:bg-accent-hover sm:w-auto"
              >
                <Icon name="search" size={16} strokeWidth={2} />
                {t.find}
              </button>
            </form>
          </div>

          <div className="overflow-hidden rounded-card border border-border-muted">
            <HeroArt className="block aspect-[4/3] w-full object-cover lg:aspect-[5/4]" />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Promises */}
      <section className="mx-auto max-w-[1120px] px-4 py-10 sm:px-6">
        <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {PROMISES.map((p) => (
            <li key={p.title} className="rounded-card border border-border-muted bg-canvas p-4">
              <Icon name={p.icon} size={20} className="text-accent" />
              <h3 className="m-0 mt-3 text-[15px] font-semibold">{p.title}</h3>
              <p className="m-0 mt-1.5 text-[14px] leading-relaxed text-fg-muted">{p.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* --------------------------------------------------------- Stays */}
      <section id="stays" className="mx-auto max-w-[1120px] scroll-mt-20 px-4 py-6 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-[52ch]">
            <h2 className="m-0 text-[26px] font-semibold">{t.staysTitle}</h2>
            <p className="m-0 mt-2 text-[15px] leading-relaxed text-fg-muted">
              Про каждое место честно написано, где туалет, как помыться, ловит ли связь и доедет ли обычная машина.
            </p>
          </div>
          <span className="text-[14px] text-fg-subtle" aria-live="polite">
            {stays.length} {stays.length === 1 ? "место" : stays.length < 5 ? "места" : "мест"}
          </span>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-y border-border-muted py-4">
          <div role="group" aria-label="Регион" className="flex flex-wrap gap-2">
            {REGIONS.map((r) => (
              <button key={r.key} type="button" aria-pressed={region === r.key} onClick={() => setRegion(r.key)} className={chip(region === r.key)}>
                {r.key === "all" ? "Все регионы" : r.label}
              </button>
            ))}
          </div>
          <div role="group" aria-label="Удобства" className="flex flex-wrap items-center gap-2">
            {FEATURES.map((f) => (
              <button key={f.key} type="button" aria-pressed={feats.includes(f.key)} onClick={() => toggle(f.key)} className={chip(feats.includes(f.key))}>
                <Icon name={f.icon} size={14} />
                {f.label}
              </button>
            ))}
            {(feats.length > 0 || region !== "all") && (
              <button type="button" onClick={() => { setFeats([]); setRegion("all"); }} className="h-9 cursor-pointer px-2 text-[14px] text-fg-subtle underline underline-offset-4 hover:text-fg">
                Сбросить
              </button>
            )}
          </div>
        </div>

        {stays.length === 0 ? (
          <div className="mt-8 rounded-card border border-dashed border-border px-6 py-14 text-center">
            <p className="m-0 text-[17px] font-semibold">Под эти условия пока нет мест</p>
            <p className="m-0 mt-2 text-[15px] text-fg-muted">Попробуйте убрать один фильтр — например «Есть связь».</p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {stays.map((p) => <PlaceCard key={p.slug} place={p} query={query} />)}
          </div>
        )}
      </section>

      {/* --------------------------------------------------- Experiences */}
      <section id="exp" className="mt-16 scroll-mt-20 border-y border-border-muted bg-subtle">
        <div className="mx-auto max-w-[1120px] px-4 py-14 sm:px-6">
          <h2 className="m-0 text-[26px] font-semibold">{t.expTitle}</h2>
          <p className="m-0 mt-2 max-w-[56ch] text-[15px] leading-relaxed text-fg-muted">
            Добавляются к брони одной галочкой. Деньги за впечатление получает та же семья.
          </p>

          <ul className="m-0 mt-8 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
            {EXPERIENCES.map((e) => (
              <li key={e.title} className="flex items-start gap-3.5 rounded-card border border-border-muted bg-canvas p-4">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Icon name={e.icon} size={20} />
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="m-0 text-[16px] font-semibold">{e.title}</h3>
                    <span className="text-[14px] font-medium text-fg-muted">{e.price}</span>
                  </div>
                  <p className="m-0 mt-1.5 text-[14px] leading-relaxed text-fg-muted">{e.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* --------------------------------------------------------- Hosts */}
      <section id="hosts" className="scroll-mt-20 bg-dark text-on-dark">
        <div className="mx-auto flex max-w-[1120px] flex-wrap gap-12 px-4 py-14 sm:px-6">
          <div className="flex-1 basis-[360px]">
            <span className="eyebrow text-on-dark-muted">Үй ээлерине — для хозяев</span>
            <h2 className="m-0 mt-3 max-w-[18ch] text-[clamp(24px,3.2vw,34px)] font-semibold leading-tight text-white">{t.hostsTitle}</h2>
            <p className="m-0 mt-4 max-w-[52ch] text-[15px] leading-relaxed text-on-dark-muted">
              Расскажите о своей семье, юрте или доме — мы приедем, сфотографируем и покажем вас туристам со всего мира.
              Брони приходят прямо в Telegram на кыргызском, отвечать нужно одной кнопкой.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/hosts/" className="inline-flex h-10 items-center rounded-lg bg-accent px-5 text-[15px] font-medium text-white no-underline transition-colors hover:bg-accent-hover">
                Как хозяин получает бронь
              </Link>
              <Link href="/hosts/#join" className="inline-flex h-10 items-center rounded-lg border border-border-dark px-5 text-[15px] font-medium text-on-dark no-underline transition-colors hover:bg-dark-2">
                Подключить лагерь
              </Link>
            </div>
          </div>

          <ul className="m-0 grid flex-1 basis-[420px] list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2">
            {HOST_PERKS.map((h) => (
              <li key={h.title} className="rounded-card border border-border-dark bg-dark-2 p-4">
                <Icon name={h.icon} size={20} className="text-on-dark-muted" />
                <h3 className="m-0 mt-3 text-[15px] font-semibold text-white">{h.title}</h3>
                <p className="m-0 mt-1.5 text-[14px] leading-relaxed text-on-dark-muted">{h.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
