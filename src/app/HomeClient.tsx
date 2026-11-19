"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { REGIONS, type Place, type Region } from "@/data/places";
import { useLang } from "@/lib/i18n";
import { PlaceCard } from "@/components/PlaceCard";
import { HeroArt, Icon, Tunduk, type IconName } from "@/components/ui";
import { MOTIFS, Medallion, Motif, OrnamentBand, Shyrdak, ZigzagBand, type MotifName } from "@/components/ethno";
import { DrawIn, Intro, Parallax, Reveal, RevealItem } from "@/components/motion";

type Feature = "stove" | "bath" | "signal" | "car";

const FEATURES: { key: Feature; label: string; icon: IconName; test: (p: Place) => boolean }[] = [
  { key: "stove", label: "Печка", icon: "fire", test: (p) => p.hasStove },
  { key: "bath", label: "Баня или душ", icon: "bath", test: (p) => p.hasBath },
  { key: "signal", label: "Есть связь", icon: "signal", test: (p) => p.hasSignal },
  { key: "car", label: "Обычная машина", icon: "car", test: (p) => p.carAccess === "car" },
];

const PROMISES: { n: string; title: string; text: string; motif: MotifName }[] = [
  { n: "01", title: "Проверено лично", text: "Мы были в каждом лагере: печка, туалет, вода и дорога описаны как есть.", motif: "kochkor" },
  { n: "02", title: "Ответ за два часа", text: "Хозяин подтверждает бронь в мессенджере. Не ответил — подключается Конок.", motif: "itkuyruk" },
  { n: "03", title: "Отмена за семь дней", text: "Бесплатно и без переписки: планы в горах меняет погода, а не штрафы.", motif: "gul" },
  { n: "04", title: "Деньги остаются семье", text: "88% платежа уходит хозяину на Элсом, MBank или карту после заезда.", motif: "tumar" },
];

const GUIDE_LINKS: { title: string; text: string; href: string; icon: IconName }[] = [
  { title: "Что едят", text: "Бешбармак, лагман, кумыс и боорсок — что заказать и чего ждать на столе.", href: "/guide/#food", icon: "food" },
  { title: "Как доехать", text: "Трансфер, маршрутка, такси, аренда машины: цены, время и что выбрать.", href: "/guide/#road", icon: "car" },
  { title: "Условия и что взять", text: "Высота, погода, туалет, душ, связь, электричество, деньги.", href: "/guide/#conditions", icon: "shield" },
  { title: "Помощь и телефоны", text: "112 и другие экстренные номера, поддержка Конок, телефон хозяина.", href: "/guide/#help", icon: "chat" },
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

const MOTIF_ORDER: MotifName[] = ["kochkor", "bugu", "itkuyruk", "kyial", "gul", "tumar"];

export function HomeClient({ places }: { places: Place[] }) {
  const { t } = useLang();
  const [region, setRegion] = useState<Region | "all">("all");
  const [feats, setFeats] = useState<Feature[]>([]);
  const [date, setDate] = useState("2027-07-12");
  const [guests, setGuests] = useState(2);

  const stays = useMemo(
    () => places.filter((p) => (region === "all" || p.region === region) && FEATURES.every((f) => !feats.includes(f.key) || f.test(p))),
    [places, region, feats],
  );

  // Переносим дату и число гостей в бронь.
  const query = new URLSearchParams({ g: String(guests), d: date }).toString();
  const toggle = (k: Feature) => setFeats((cur) => (cur.includes(k) ? cur.filter((x) => x !== k) : [...cur, k]));

  const chip = (on: boolean) =>
    `inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border px-4 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors ${
      on ? "border-ink bg-ink text-cream" : "border-rule-strong text-fg-muted hover:border-ink hover:text-fg"
    }`;

  const searchField = "h-11 w-full border-0 border-b border-rule-strong bg-transparent px-0 text-[16px] text-fg outline-none focus:border-ink";

  return (
    <>
      <Intro>
        <div className="flex flex-col items-center gap-6">
          <Medallion id="intro-med" size={240} color="#DDAE52" strokeWidth={7} />
          <span className="display text-[28px] tracking-[0.2em] text-cream">Конок</span>
        </div>
      </Intro>

      {/* ---------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden">
        {/* Водяной знак: медальон ала-кийиза медленно поворачивается */}
        <Medallion
          id="hero-watermark"
          size={760}
          color="#8E2420"
          strokeWidth={6}
          className="spin-slow pointer-events-none absolute -left-[280px] top-[40px] opacity-[0.06]"
        />

        <div className="relative mx-auto grid max-w-[1280px] items-center gap-10 px-5 pb-12 pt-12 sm:px-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:pb-16 lg:pt-16">
          <div>
            <span className="eyebrow rise flex items-center gap-2.5">
              <DrawIn duration={1200}><Motif name="kochkor" size={26} strokeWidth={4} className="text-accent" /></DrawIn>
              Юрты и гостевые дома · Кыргызстан
            </span>
            <h1 className="display rise rise-2 m-0 mt-5 max-w-[13ch] text-[clamp(40px,8.4vw,92px)]">{t.heroTitle}</h1>
            <p className="rise rise-3 m-0 mt-6 max-w-[46ch] text-[17px] leading-relaxed text-fg-muted">{t.heroSub}</p>

            <form
              onSubmit={(e) => { e.preventDefault(); document.getElementById("stays")?.scrollIntoView({ behavior: "smooth" }); }}
              className="mt-10 border-t border-rule pt-7"
            >
              <div className="grid gap-6 sm:grid-cols-3">
                <div className="flex flex-col gap-2">
                  <label htmlFor="f-region" className="eyebrow">{t.where}</label>
                  <select id="f-region" value={region} onChange={(e) => setRegion(e.target.value as Region | "all")} className={`${searchField} cursor-pointer`}>
                    {REGIONS.map((r) => <option key={r.key} value={r.key}>{r.label}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="f-date" className="eyebrow">{t.when}</label>
                  <input id="f-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className={searchField} />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="f-guests" className="eyebrow">{t.guests}</label>
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

          {/* Пейзаж с полосой шырдака вдоль края */}
          <div className="relative flex">
            <Shyrdak id="hero-shyrdak" rows={4} className="hidden w-[92px] flex-none sm:block" />
            <div className="relative flex-1 overflow-hidden">
              <Parallax strength={0.06}>
                <HeroArt className="block aspect-[4/5] w-full scale-110 object-cover" />
              </Parallax>
              <div className="absolute bottom-0 left-0 flex items-center gap-3 bg-cream px-5 py-4">
                <Tunduk size={22} strokeWidth={1.2} className="text-accent" />
                <span className="text-[11px] uppercase tracking-[0.18em] text-fg-muted">Кош келиңиз!</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-accent">
        <ZigzagBand id="zig-hero-top" height={18} />
        <div className="overflow-hidden">
          <div className="band-drift">
            <OrnamentBand id="band-hero" height={34} color="#EDE2C8" opacity={0.95} />
          </div>
        </div>
        <ZigzagBand id="zig-hero-bot" height={18} flip />
      </div>

      {/* ------------------------------------------------------ Promises */}
      <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-10">
        <ul className="m-0 grid list-none grid-cols-1 gap-x-10 gap-y-10 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {PROMISES.map((p, i) => (
            <RevealItem key={p.n} delay={i * 90} className="border-t border-rule pt-5">
              <DrawIn><Motif name={p.motif} size={38} className="text-ochre" /></DrawIn>
              <h3 className="serif m-0 mt-4 text-[20px]">{p.title}</h3>
              <p className="m-0 mt-2.5 text-[14px] leading-relaxed text-fg-muted">{p.text}</p>
            </RevealItem>
          ))}
        </ul>
      </section>

      {/* --------------------------------------------------------- Stays */}
      <section id="stays" className="mx-auto max-w-[1280px] scroll-mt-24 px-5 pb-10 sm:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-rule pt-10">
          <div className="max-w-[30rem]">
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
            <Motif name="kyial" size={48} className="mx-auto text-rule-strong" />
            <p className="serif m-0 mt-5 text-[24px]">Под эти условия пока нет мест</p>
            <p className="m-0 mt-3 text-[15px] text-fg-muted">Попробуйте убрать один фильтр — например «Есть связь».</p>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {stays.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 110}>
                <PlaceCard place={p} query={query} />
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* ------------------------------------------------- Что нужно знать */}
      <section className="mt-20 bg-cream-2">
        <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-[30rem]">
              <span className="eyebrow">Путеводитель</span>
              <h2 className="display m-0 mt-4 text-[clamp(28px,4.4vw,48px)]">Всё для поездки в одном месте</h2>
            </div>
            <p className="m-0 max-w-[42ch] text-[15px] leading-relaxed text-fg-muted">
              Чтобы не искать по десяти сайтам: еда, дороги, высота, погода, деньги, слова на кыргызском и телефоны на случай беды.
            </p>
          </div>

          <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-px bg-rule p-0 sm:grid-cols-2 lg:grid-cols-4">
            {GUIDE_LINKS.map((g) => (
              <li key={g.title} className="bg-cream-2">
                <Link href={g.href} className="flex h-full flex-col gap-3 p-6 text-fg no-underline transition-colors hover:bg-paper">
                  <Icon name={g.icon} size={24} strokeWidth={1.3} className="text-accent" />
                  <h3 className="serif m-0 text-[20px]">{g.title}</h3>
                  <p className="m-0 text-[14px] leading-relaxed text-fg-muted">{g.text}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                    Открыть <Icon name="arrow" size={14} strokeWidth={1.8} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ----------------------------------------------------- Орнаменты */}
      <section className="relative mx-auto max-w-[1280px] overflow-hidden px-5 py-20 sm:px-10">
        <Medallion
          id="motif-watermark"
          size={520}
          color="#8E2420"
          strokeWidth={7}
          className="spin-slow pointer-events-none absolute -right-[150px] top-[60px] opacity-[0.07]"
        />
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[32rem]">
            <span className="eyebrow">Узоры</span>
            <h2 className="display m-0 mt-4 text-[clamp(28px,4.4vw,48px)]">Язык, на котором говорит войлок</h2>
          </div>
          <p className="m-0 max-w-[44ch] text-[15px] leading-relaxed text-fg-muted">
            Эти узоры вы увидите на шырдаке под ногами, на ала-кийизе у стены юрты и на нашем сайте.
            Каждый что-то значит — спросите у хозяйки, она расскажет про свой.
          </p>
        </div>

        <ul className="relative m-0 mt-12 grid list-none grid-cols-2 gap-5 p-0 sm:grid-cols-3 lg:grid-cols-6">
          {MOTIF_ORDER.map((name, i) => (
            <RevealItem key={name} delay={i * 80} className="felt border border-rule-strong bg-paper p-5 text-center">
              <DrawIn duration={1800}>
                <Motif name={name} size={104} strokeWidth={3.4} className="mx-auto text-accent" />
              </DrawIn>
              <h3 className="serif m-0 mt-4 text-[17px]">{MOTIFS[name].label}</h3>
              <p className="m-0 mt-2 text-[13px] leading-relaxed text-fg-muted">{MOTIFS[name].meaning}</p>
            </RevealItem>
          ))}
        </ul>
      </section>

      {/* ------------------------------------------------- Пословица */}
      <section className="felt relative overflow-hidden bg-ink text-cream">
        <ZigzagBand id="zig-saying-top" height={18} color="#8E2420" bg="#16130F" />
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-14 px-5 py-20 sm:px-10">
          <DrawIn duration={2200}>
            <Medallion id="saying-med" size={280} color="#DDAE52" strokeWidth={7} className="flex-none" />
          </DrawIn>
          <Reveal className="max-w-[34rem]">
            <span className="eyebrow text-gold">Кыргызская пословица</span>
            <p className="display m-0 mt-5 text-[clamp(28px,4.4vw,52px)] leading-[1.05] text-cream">
              Конок келсе — кут келет
            </p>
            <p className="m-0 mt-6 text-[17px] leading-relaxed text-on-dark-muted">
              «Придёт гость — придёт достаток». Отсюда и название: конок — это гость, которого ждут.
              Мы делаем так, чтобы за один вечер у очага вы поняли про эту страну больше,
              чем за неделю в отеле.
            </p>
          </Reveal>
        </div>
        <ZigzagBand id="zig-saying-bot" height={18} color="#8E2420" bg="#16130F" flip />
      </section>

      {/* --------------------------------------------------- Experiences */}
      <section id="exp" className="scroll-mt-24 border-t border-rule">
        <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-[26rem]">
              <span className="eyebrow">Впечатления</span>
              <h2 className="display m-0 mt-4 text-[clamp(28px,4.4vw,48px)]">{t.expTitle}</h2>
            </div>
            <p className="m-0 max-w-[40ch] text-[15px] leading-relaxed text-fg-muted">
              Добавляются к брони одной галочкой. Деньги за впечатление получает та же семья.
            </p>
          </div>

          <ul className="m-0 mt-12 flex list-none flex-col p-0">
            {EXPERIENCES.map((e, i) => (
              <li key={e.title} className="flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-rule py-7 last:border-b">
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
      <section id="hosts" className="felt scroll-mt-24 bg-ink text-on-dark">
        <div className="overflow-hidden">
          <div className="band-drift">
            <OrnamentBand id="band-hosts" height={28} color="#6b5a3a" />
          </div>
        </div>
        <div className="mx-auto flex max-w-[1280px] flex-wrap gap-14 px-5 py-20 sm:px-10">
          <div className="flex-1 basis-[380px]">
            <span className="eyebrow text-gold">Үй ээлерине — для хозяев</span>
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
                <Icon name={h.icon} size={22} strokeWidth={1.3} className="text-gold" />
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
