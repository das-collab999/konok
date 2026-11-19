"use client";

import { useState } from "react";
import Link from "next/link";
import { PLACES, REGIONS, type Place, type Region } from "@/data/places";
import { useLang } from "@/lib/i18n";
import { PlaceCard } from "@/components/PlaceCard";
import { Icon, Ornament, type IconName } from "@/components/ui";

type Feature = "stove" | "bath" | "signal" | "car";
const FEATURES: { key: Feature; label: string; icon: IconName; test: (p: Place) => boolean }[] = [
  { key: "stove", label: "Печка", icon: "fire", test: (p) => p.hasStove },
  { key: "bath", label: "Баня или душ", icon: "bath", test: (p) => p.hasBath },
  { key: "signal", label: "Есть связь", icon: "signal", test: (p) => p.hasSignal },
  { key: "car", label: "Обычная машина", icon: "car", test: (p) => p.carAccess === "car" },
];

const EXPERIENCES: { title: string; text: string; price: string; icon: IconName }[] = [
  { title: "Шырдак и войлок", text: "Мастерица из Кочкора покажет, как валяют войлок и шьют шырдак. Узор заберёте с собой.", price: "от $10", icon: "wool" },
  { title: "Бешбармак с семьёй", text: "Раскатываем тесто, режем мясо и едим руками — как положено.", price: "от $12", icon: "food" },
  { title: "Конный день на джайлоо", text: "Маршрут с местным чабаном по пастбищам, озеро и обед у юрты.", price: "от $25", icon: "horse" },
  { title: "Кок-бору и игры кочевников", text: "Смотрим конные игры, знакомимся с всадниками, пробуем ордо.", price: "от $15", icon: "ball" },
];

const HOST_PERKS: { title: string; text: string; icon: IconName }[] = [
  { title: "Бесплатное размещение", text: "Платите только небольшую комиссию, когда гость приехал.", icon: "shield" },
  { title: "Фото и видео — от нас", text: "Приезжаем, снимаем вашу юрту, семью и природу бесплатно.", icon: "camera" },
  { title: "Брони в мессенджере", text: "Заявка приходит на кыргызском. Ответ одной кнопкой «Да» или «Нет».", icon: "chat" },
  { title: "Деньги сразу", text: "Выплата на Элсом, MBank или карту после заезда гостя.", icon: "coin" },
  { title: "Английский для хозяев", text: "Короткий курс: приветствие, еда, правила, цены — без учебников.", icon: "book" },
  { title: "Продажа ремесла", text: "Шырдаки, войлок, мёд и курут — продавайте гостям через сайт.", icon: "wool" },
];

function chipClass(on: boolean) {
  return `inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border px-[18px] text-[15px] font-semibold ${
    on ? "border-red bg-red text-white" : "border-line-strong bg-card text-ink"
  }`;
}

const field = "h-12 w-full rounded-[10px] border border-line-strong bg-white px-3 text-base text-ink";

export default function Home() {
  const { t } = useLang();
  const [region, setRegion] = useState<Region | "all">("all");
  const [feats, setFeats] = useState<Feature[]>([]);

  const stays = PLACES.filter(
    (p) => (region === "all" || p.region === region) && FEATURES.every((f) => !feats.includes(f.key) || f.test(p)),
  );
  const toggle = (k: Feature) => setFeats((cur) => (cur.includes(k) ? cur.filter((x) => x !== k) : [...cur, k]));

  return (
    <>
      {/* Hero */}
      <section id="top" className="relative overflow-hidden bg-sky">
        <HeroArt />
        <div className="relative mx-auto flex max-w-[1240px] flex-col gap-5 px-6 pb-28 pt-20">
          <span className="font-serif text-xl italic text-gold">Кош келиңиз!</span>
          <h1 className="m-0 max-w-[720px] font-serif text-[clamp(36px,5vw,64px)] leading-[1.08] text-white">{t.heroTitle}</h1>
          <p className="m-0 max-w-[620px] text-[19px] leading-relaxed text-[#EFE4D0]">{t.heroSub}</p>

          <form
            onSubmit={(e) => { e.preventDefault(); document.getElementById("stays")?.scrollIntoView(); }}
            className="mt-3.5 flex max-w-[900px] flex-wrap items-end gap-3 rounded-[18px] bg-card p-3.5 shadow-[0_18px_40px_rgba(0,0,0,.25)]"
          >
            <div className="flex flex-[1_1_200px] flex-col gap-1.5">
              <label htmlFor="f-region" className="text-[13px] font-semibold text-muted">{t.where}</label>
              <select id="f-region" value={region} onChange={(e) => setRegion(e.target.value as Region | "all")} className={field}>
                {REGIONS.map((r) => <option key={r.key} value={r.key}>{r.label}</option>)}
              </select>
            </div>
            <div className="flex flex-[1_1_160px] flex-col gap-1.5">
              <label htmlFor="f-date" className="text-[13px] font-semibold text-muted">{t.when}</label>
              <input id="f-date" type="date" defaultValue="2027-07-12" className={field} />
            </div>
            <div className="flex flex-[0_1_120px] flex-col gap-1.5">
              <label htmlFor="f-guests" className="text-[13px] font-semibold text-muted">{t.guests}</label>
              <input id="f-guests" type="number" min={1} max={12} defaultValue={2} className={field} />
            </div>
            <button type="submit" className="h-12 cursor-pointer rounded-[10px] bg-red px-7 text-base font-bold text-white hover:brightness-110">{t.find}</button>
          </form>
        </div>
      </section>

      <Ornament id="orn-top" />

      {/* Stays */}
      <section id="stays" className="mx-auto flex max-w-[1240px] scroll-mt-4 flex-col gap-5 px-6 pb-6 pt-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="flex flex-col gap-1.5">
            <h2 className="m-0 font-serif text-[38px]">{t.staysTitle}</h2>
            <p className="m-0 text-base text-muted">Каждое место мы проверили лично: печка, туалет, связь и дорога — честно.</p>
          </div>
          <span className="text-[15px] font-semibold text-muted" aria-live="polite">Найдено мест: {stays.length}</span>
        </div>

        <div role="group" aria-label="Регион" className="flex flex-wrap gap-2.5">
          {REGIONS.map((r) => (
            <button key={r.key} type="button" aria-pressed={region === r.key} onClick={() => setRegion(r.key)} className={chipClass(region === r.key)}>
              {r.key === "all" ? "Все" : r.label}
            </button>
          ))}
        </div>
        <div role="group" aria-label="Удобства" className="flex flex-wrap items-center gap-2.5">
          <span className="mr-1 text-sm font-semibold text-muted">Важно для меня:</span>
          {FEATURES.map((f) => (
            <button key={f.key} type="button" aria-pressed={feats.includes(f.key)} onClick={() => toggle(f.key)} className={chipClass(feats.includes(f.key))}>
              <Icon name={f.icon} size={18} />
              {f.label}
            </button>
          ))}
        </div>

        {stays.length === 0 && (
          <div className="rounded-2xl border border-dashed border-ochre bg-card p-8 text-center text-[17px] text-muted">
            Под эти условия пока нет мест. Попробуйте убрать один фильтр.
          </div>
        )}

        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
          {stays.map((p) => <PlaceCard key={p.slug} place={p} />)}
        </div>
      </section>

      {/* Experiences */}
      <section id="exp" className="mx-auto flex max-w-[1240px] scroll-mt-4 flex-col gap-5 px-6 py-12">
        <h2 className="m-0 font-serif text-[34px]">{t.expTitle}</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-[18px]">
          {EXPERIENCES.map((e) => (
            <div key={e.title} className="flex flex-col gap-2.5 rounded-2xl border border-line bg-card p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red text-gold"><Icon name={e.icon} size={26} /></div>
              <h3 className="m-0 text-lg font-bold">{e.title}</h3>
              <p className="m-0 text-sm leading-relaxed text-muted">{e.text}</p>
              <span className="text-[15px] font-bold text-red">{e.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Hosts */}
      <section id="hosts" className="scroll-mt-4 bg-ink text-felt">
        <Ornament id="orn-hosts" color="#C8962E" bg="transparent" />
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-start gap-10 px-6 pb-16 pt-12">
          <div className="flex flex-[1_1_360px] flex-col gap-4">
            <span className="font-serif text-lg italic text-gold">Үй ээлерине — для хозяев</span>
            <h2 className="m-0 font-serif text-[38px] leading-tight text-white">{t.hostsTitle}</h2>
            <p className="m-0 text-[17px] leading-relaxed text-line">
              Расскажите о своей семье, юрте или доме — мы приедем, сфотографируем и покажем вас туристам со всего мира. Брони приходят прямо в Telegram или WhatsApp на кыргызском.
            </p>
            <div className="mt-1.5 flex flex-wrap gap-3">
              <Link href="/hosts/" className="inline-flex h-12 items-center rounded-[10px] bg-gold px-5 font-bold text-ink hover:brightness-110">Как хозяин получает бронь</Link>
              <Link href="/hosts/#join" className="inline-flex h-12 items-center rounded-[10px] border border-ochre px-5 font-semibold text-felt">Подключить свой лагерь</Link>
            </div>
          </div>
          <div className="grid flex-[1_1_480px] grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
            {HOST_PERKS.map((h) => (
              <div key={h.title} className="flex flex-col gap-2 rounded-[14px] border border-ochre/45 bg-felt/5 p-[18px]">
                <Icon name={h.icon} size={28} className="text-gold" />
                <h3 className="m-0 text-[17px] text-white">{h.title}</h3>
                <p className="m-0 text-sm leading-relaxed text-line">{h.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function HeroArt() {
  const stars: [number, number, number][] = [[1180, 120, 3], [980, 70, 2], [1300, 200, 2], [860, 150, 2.5], [1080, 230, 1.8], [1380, 80, 2.2], [760, 60, 1.8]];
  const yurt = (
    <>
      <path d="M0 60 Q0 20 60 6 Q120 20 120 60Z" fill="#F3E9D7" />
      <rect x="0" y="58" width="120" height="50" fill="#EADCC2" />
      <path d="M0 72 H120" stroke="#8B1E1E" strokeWidth="5" />
      <rect x="48" y="74" width="24" height="34" fill="#8B1E1E" />
    </>
  );
  return (
    <svg viewBox="0 0 1440 560" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <rect width="1440" height="560" fill="#1F4E79" />
      {stars.map(([x, y, r]) => <circle key={x} cx={x} cy={y} r={r} fill="#F3E9D7" />)}
      <circle cx="1240" cy="130" r="46" fill="#F6E3B4" />
      <circle cx="1258" cy="118" r="44" fill="#1F4E79" />
      <polygon points="0,420 180,240 320,360 520,170 700,330 880,210 1060,340 1240,200 1440,320 1440,560 0,560" fill="#2C5F8A" />
      <polygon points="500,190 520,170 540,190 530,186 520,194 510,186" fill="#F3E9D7" />
      <polygon points="860,230 880,210 900,230 890,226 880,233 870,226" fill="#F3E9D7" />
      <polygon points="1220,220 1240,200 1260,220 1250,216 1240,223 1230,216" fill="#F3E9D7" />
      <path d="M0 470 Q260 400 520 450 T1040 440 T1440 430 V560 H0Z" fill="#2E5E3A" />
      <path d="M0 510 Q300 470 640 500 T1440 490 V560 H0Z" fill="#244A2E" />
      <g transform="translate(980 395)">{yurt}<circle cx="60" cy="8" r="7" fill="#C8962E" /></g>
      <g transform="translate(1150 425) scale(.6)">{yurt}</g>
    </svg>
  );
}
