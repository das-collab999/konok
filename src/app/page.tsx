"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PLACES, REGIONS, type Place, type Region } from "@/data/places";
import { useLang } from "@/lib/i18n";
import { PlaceCard } from "@/components/PlaceCard";
import { HeroArt, Icon, Tunduk, type IconName } from "@/components/ui";

type Feature = "stove" | "bath" | "signal" | "car";

const FEATURES: { key: Feature; label: string; icon: IconName; test: (p: Place) => boolean }[] = [
  { key: "stove", label: "Печка", icon: "fire", test: (p) => p.hasStove },
  { key: "bath", label: "Баня или душ", icon: "bath", test: (p) => p.hasBath },
  { key: "signal", label: "Есть связь", icon: "signal", test: (p) => p.hasSignal },
  { key: "car", label: "Обычная машина", icon: "car", test: (p) => p.carAccess === "car" },
];

const PROMISES: { n: string; title: string; text: string }[] = [
  { n: "01", title: "Проверено лично", text: "Мы были в каждом лагере: печка, туалет, вода и дорога описаны как есть." },
  { n: "02", title: "Ответ за два часа", text: "Хозяин подтверждает бронь в мессенджере. Не ответил — подключается Конок." },
  { n: "03", title: "Отмена за семь дней", text: "Бесплатно и без переписки: планы в горах меняет погода, а не штрафы." },
  { n: "04", title: "Деньги остаются семье", text: "88% платежа уходит хозяину на Элсом, MBank или карту после заезда." },
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
    `inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border px-4 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors ${
      on ? "border-ink bg-ink text-cream" : "border-rule-strong text-fg-muted hover:border-ink hover:text-fg"
    }`;

  const searchLabel = "eyebrow";
  const searchField =
    "h-11 w-full border-0 border-b border-rule-strong bg-transparent px-0 text-[16px] text-fg outline-none focus:border-ink";

  return (
    <>
      {/* ---------------------------------------------------------- Hero */}
      <section className="border-b border-rule">
        <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 pb-14 pt-12 sm:px-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:pb-20 lg:pt-16">
          <div>
            <span className="eyebrow rise">Юрты и гостевые дома · Кыргызстан</span>
            <h1 className="display rise rise-2 m-0 mt-5 max-w-[13ch] text-[clamp(40px,8.4vw,92px)]">{t.heroTitle}</h1>
            <p className="rise rise-3 m-0 mt-6 max-w-[46ch] text-[17px] leading-relaxed text-fg-muted">{t.heroSub}</p>

            <form
              onSubmit={(e) => { e.preventDefault(); document.getElementById("stays")?.scrollIntoView({ behavior: "smooth" }); }}
              className="mt-10 border-t border-rule pt-7"
            >
              <div className="grid gap-6 sm:grid-cols-3">
                <div className="flex flex-col gap-2">
                  <label htmlFor="f-region" className={searchLabel}>{t.where}</label>
                  <select id="f-region" value={region} onChange={(e) => setRegion(e.target.value as Region | "all")} className={`${searchField} cursor-pointer`}>
                    {REGIONS.map((r) => <option key={r.key} value={r.key}>{r.label}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="f-date" className={searchLabel}>{t.when}</label>
                  <input id="f-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className={searchField} />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="f-guests" className={searchLabel}>{t.guests}</label>
                  <input
                    id="f-guests" type="number" min={1} max={12} value={guests}
                    onChange={(e) => setGuests(Math.min(12, Math.max(1, Number(e.target.value) || 1)))}
                    className={searchField}
                  />
                </div>
              </div>
              <button type="submit" className="pill pill-solid mt-8 w-full sm:w-auto">
                <Icon name="search" size={15} strokeWidth={1.8} />
                {t.find}
              </button>
            </form>
          </div>

          <div className="relative">
            <HeroArt className="block aspect-[4/5] w-full object-cover" />
            <div className="absolute bottom-0 left-0 flex items-center gap-3 bg-cream px-5 py-4">
              <Tunduk size={22} strokeWidth={1.2} className="text-accent" />
              <span className="text-[11px] uppercase tracking-[0.18em] text-fg-muted">Кош келиңиз!</span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Promises */}
      <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-10">
        <ul className="m-0 grid list-none grid-cols-1 gap-x-10 gap-y-10 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {PROMISES.map((p) => (
            <li key={p.n} className="border-t border-rule pt-5">
              <span className="serif text-[15px] text-accent">{p.n}</span>
              <h3 className="serif m-0 mt-3 text-[20px]">{p.title}</h3>
              <p className="m-0 mt-2.5 text-[14px] leading-relaxed text-fg-muted">{p.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* --------------------------------------------------------- Stays */}
      <section id="stays" className="mx-auto max-w-[1280px] scroll-mt-24 px-5 pb-10 sm:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-rule pt-10">
          <div className="max-w-[20ch]">
            <span className="eyebrow">Жильё</span>
            <h2 className="display m-0 mt-4 text-[clamp(30px,5vw,56px)]">{t.staysTitle}</h2>
          </div>
          <p className="m-0 max-w-[44ch] text-[15px] leading-relaxed text-fg-muted">
            Про каждое место честно написано, где туалет, как помыться, ловит ли связь и доедет ли обычная машина.
            <span className="mt-2 block text-[12px] uppercase tracking-[0.14em] text-fg-subtle" aria-live="polite">
              Найдено: {stays.length}
            </span>
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3">
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
                <Icon name={f.icon} size={14} strokeWidth={1.5} />
                {f.label}
              </button>
            ))}
            {(feats.length > 0 || region !== "all") && (
              <button type="button" onClick={() => { setFeats([]); setRegion("all"); }} className="h-10 cursor-pointer px-2 text-[11px] uppercase tracking-[0.14em] text-fg-subtle underline underline-offset-4 hover:text-fg">
                Сбросить
              </button>
            )}
          </div>
        </div>

        {stays.length === 0 ? (
          <div className="mt-12 border border-dashed border-rule-strong px-8 py-20 text-center">
            <p className="serif m-0 text-[24px]">Под эти условия пока нет мест</p>
            <p className="m-0 mt-3 text-[15px] text-fg-muted">Попробуйте убрать один фильтр — например «Есть связь».</p>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {stays.map((p) => <PlaceCard key={p.slug} place={p} query={query} />)}
          </div>
        )}
      </section>

      {/* --------------------------------------------------- Experiences */}
      <section id="exp" className="mt-20 scroll-mt-24 bg-cream-2">
        <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-[18ch]">
              <span className="eyebrow">Впечатления</span>
              <h2 className="display m-0 mt-4 text-[clamp(28px,4.4vw,48px)]">{t.expTitle}</h2>
            </div>
            <p className="m-0 max-w-[40ch] text-[15px] leading-relaxed text-fg-muted">
              Добавляются к брони одной галочкой. Деньги за впечатление получает та же семья.
            </p>
          </div>

          <ul className="m-0 mt-12 flex list-none flex-col p-0">
            {EXPERIENCES.map((e, i) => (
              <li key={e.title} className="flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-rule-strong py-7 last:border-b">
                <span className="serif w-10 text-[15px] text-accent">{String(i + 1).padStart(2, "0")}</span>
                <div className="flex flex-1 basis-[260px] items-start gap-4">
                  <Icon name={e.icon} size={22} strokeWidth={1.3} className="mt-1 flex-none text-fg-subtle" />
                  <div>
                    <h3 className="serif m-0 text-[22px]">{e.title}</h3>
                    <p className="m-0 mt-2 max-w-[60ch] text-[15px] leading-relaxed text-fg-muted">{e.text}</p>
                  </div>
                </div>
                <span className="serif text-[18px]">{e.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* --------------------------------------------------------- Hosts */}
      <section id="hosts" className="scroll-mt-24 bg-ink text-on-dark">
        <div className="mx-auto flex max-w-[1280px] flex-wrap gap-14 px-5 py-20 sm:px-10">
          <div className="flex-1 basis-[380px]">
            <span className="eyebrow text-on-dark-muted">Үй ээлерине — для хозяев</span>
            <h2 className="display m-0 mt-4 max-w-[14ch] text-[clamp(28px,4.4vw,52px)] text-cream">{t.hostsTitle}</h2>
            <p className="m-0 mt-6 max-w-[50ch] text-[16px] leading-relaxed text-on-dark-muted">
              Расскажите о своей семье, юрте или доме — мы приедем, сфотографируем и покажем вас туристам со всего мира.
              Брони приходят прямо в Telegram на кыргызском, отвечать нужно одной кнопкой.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/hosts/" className="pill pill-light">Как приходит бронь</Link>
              <Link href="/hosts/#join" className="pill pill-ghost border-rule-dark text-on-dark hover:border-cream">Подключить лагерь</Link>
            </div>
          </div>

          <ul className="m-0 grid flex-1 basis-[420px] list-none grid-cols-1 gap-x-10 gap-y-8 p-0 sm:grid-cols-2">
            {HOST_PERKS.map((h) => (
              <li key={h.title} className="border-t border-rule-dark pt-5">
                <Icon name={h.icon} size={22} strokeWidth={1.3} className="text-on-dark-muted" />
                <h3 className="serif m-0 mt-4 text-[19px] text-cream">{h.title}</h3>
                <p className="m-0 mt-2 text-[14px] leading-relaxed text-on-dark-muted">{h.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
