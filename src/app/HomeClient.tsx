"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { REGIONS, type Place, type Region } from "@/data/places";
import { pick, useLang } from "@/lib/i18n";
import { PlaceCard } from "@/components/PlaceCard";
import { HeroArt, Icon, Tunduk, type IconName } from "@/components/ui";
import { MOTIFS, Medallion, Motif, OrnamentBand, Shyrdak, TermeBand, ZigzagBand, type MotifName } from "@/components/ethno";
import { DrawIn, Intro, Parallax, Reveal, RevealItem } from "@/components/motion";
import { Art, type ArtName } from "@/components/art";
import { KyrgyzMap } from "@/components/Map";
import { STORIES } from "@/data/stories";
import { useFavourites } from "@/lib/favourites";

type Feature = "stove" | "bath" | "signal" | "car";

const FEATURES: { key: Feature; icon: IconName; test: (p: Place) => boolean; label: { ru: string; en: string; zh: string } }[] = [
  { key: "stove", icon: "fire", test: (p) => p.hasStove, label: { ru: "Печка", en: "Stove", zh: "有炉子" } },
  { key: "bath", icon: "bath", test: (p) => p.hasBath, label: { ru: "Баня или душ", en: "Banya or shower", zh: "有浴" } },
  { key: "signal", icon: "signal", test: (p) => p.hasSignal, label: { ru: "Есть связь", en: "Mobile signal", zh: "有信号" } },
  { key: "car", icon: "car", test: (p) => p.carAccess === "car", label: { ru: "Обычная машина", en: "Ordinary car", zh: "轿车可达" } },
];

const MOTIF_ORDER: MotifName[] = ["kochkor", "bugu", "itkuyruk", "kyial", "gul", "tumar"];
const GUIDE_HREFS = ["/guide/#food", "/guide/#road", "/guide/#conditions", "/guide/#help"];
const EXP_ART: ArtName[] = ["felt", "cooking", "horse", "games"];
const GUIDE_ART: ArtName[] = ["beshbarmak", "transfer", "weather", "nosignal"];
const PERK_ICONS: IconName[] = ["shield", "camera", "chat", "coin"];
const HOW_ICONS: IconName[] = ["search", "user", "check"];
const PROMISE_MOTIFS: MotifName[] = ["kochkor", "itkuyruk", "gul", "tumar"];

export function HomeClient({ places }: { places: Place[] }) {
  const { lang, t } = useLang();
  const [region, setRegion] = useState<Region | "all">("all");
  const [feats, setFeats] = useState<Feature[]>([]);
  const [date, setDate] = useState("");
  const [today, setToday] = useState("");
  const [guests, setGuests] = useState(2);
  const [onlyFav, setOnlyFav] = useState(false);
  const fav = useFavourites();

  useEffect(() => {
    const now = new Date();
    const iso = (d: Date) => d.toISOString().slice(0, 10);
    setToday(iso(now));
    const soon = new Date(now);
    soon.setMonth(soon.getMonth() + 1);
    setDate(iso(soon));
  }, []);

  const stays = useMemo(
    () => places.filter((p) =>
      (region === "all" || p.region === region) &&
      FEATURES.every((f) => !feats.includes(f.key) || f.test(p)) &&
      (!onlyFav || fav.has(p.slug))),
    [places, region, feats, onlyFav, fav],
  );

  const query = new URLSearchParams({ g: String(guests), d: date }).toString();
  const toggle = (k: Feature) => setFeats((cur) => (cur.includes(k) ? cur.filter((x) => x !== k) : [...cur, k]));

  const chip = (on: boolean) =>
    `inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-[13px] transition-colors ${
      on ? "border-ink bg-ink text-cream" : "border-rule-strong text-fg-muted hover:border-ink hover:text-fg"
    }`;

  const field = "h-11 w-full border-0 border-b border-rule-strong bg-transparent px-0 text-[16px] text-fg outline-none focus:border-ink";

  return (
    <>
      <Intro>
        <div className="flex flex-col items-center gap-6">
          <Medallion id="intro-med" size={240} color="#DDAE52" />
          <span className="display text-[28px] tracking-[0.2em] text-cream">Конок</span>
        </div>
      </Intro>

      {/* ---------------------------------------------------------- Шапка */}
      <section className="relative overflow-hidden">
        <Medallion
          id="hero-watermark"
          size={760}
          color="#8E2420"
          className="spin-slow pointer-events-none absolute -left-[300px] top-[40px] opacity-[0.05]"
        />

        <div className="relative mx-auto grid max-w-[1280px] items-center gap-10 px-5 pb-12 pt-10 sm:px-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:pb-16 lg:pt-16">
          <div>
            <span className="eyebrow flex items-center gap-2.5">
              <DrawIn duration={1200}><Motif name="kochkor" size={34} className="text-accent" /></DrawIn>
              {t.home.eyebrow}
            </span>
            <h1 className="display m-0 mt-5 max-w-[13ch] text-[clamp(38px,8vw,92px)]">{t.home.heroTitle}</h1>
            <p className="m-0 mt-6 max-w-[46ch] text-[17px] leading-relaxed text-fg-muted">{t.home.heroSub}</p>

            <form
              onSubmit={(e) => { e.preventDefault(); document.getElementById("stays")?.scrollIntoView({ behavior: "smooth" }); }}
              className="mt-10 border-t border-rule pt-7"
            >
              <div className="grid gap-6 sm:grid-cols-3">
                <div className="flex flex-col gap-2">
                  <label htmlFor="f-region" className="eyebrow">{t.home.where}</label>
                  <select id="f-region" value={region} onChange={(e) => setRegion(e.target.value as Region | "all")} className={`${field} cursor-pointer`}>
                    {REGIONS.map((r) => <option key={r.key} value={r.key}>{pick(r.label, lang)}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="f-date" className="eyebrow">{t.home.when}</label>
                  <input id="f-date" type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} className={field} />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="f-guests" className="eyebrow">{t.home.guests}</label>
                  <input
                    id="f-guests" type="number" min={1} max={12} value={guests}
                    onChange={(e) => setGuests(Math.min(12, Math.max(1, Number(e.target.value) || 1)))}
                    className={field}
                  />
                </div>
              </div>
              <button type="submit" className="pill pill-solid mt-8 w-full sm:w-auto">
                <Icon name="search" size={15} strokeWidth={1.8} />
                {t.home.find}
              </button>
            </form>
          </div>

          <div className="relative flex">
            <Shyrdak id="hero-shyrdak" rows={4} className="hidden w-[92px] flex-none sm:block" />
            <div className="relative flex-1 overflow-hidden">
              <Parallax strength={0.06}>
                <HeroArt className="block aspect-[4/5] w-full scale-110 object-cover" />
              </Parallax>
              <div className="absolute bottom-0 left-0 flex items-center gap-3 bg-cream px-5 py-4">
                <Tunduk size={22} strokeWidth={1.2} className="text-accent" />
                <span className="text-[12px] uppercase tracking-[0.18em] text-fg-muted">Кош келиңиз!</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-accent">
        <ZigzagBand id="zig-hero-top" height={16} />
        <div className="overflow-hidden"><div className="band-drift"><OrnamentBand id="band-hero" height={42} color="#EDE2C8" /></div></div>
        <ZigzagBand id="zig-hero-bot" height={16} flip />
      </div>

      {/* ------------------------------------------------- Как это работает */}
      <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-10">
        <div className="max-w-[30rem]">
          <span className="eyebrow">01 — 02 — 03</span>
          <h2 className="display m-0 mt-4 text-[clamp(28px,4.4vw,44px)]">{t.home.howTitle}</h2>
          <p className="m-0 mt-4 text-[16px] leading-relaxed text-fg-muted">{t.home.howSub}</p>
        </div>

        <ol className="m-0 mt-10 grid list-none grid-cols-1 gap-x-10 gap-y-8 p-0 md:grid-cols-3">
          {t.home.how.map((s, i) => (
            <RevealItem key={s.t} delay={i * 110} className="border-t border-rule pt-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-[15px] font-semibold text-cream">{i + 1}</span>
                <Icon name={HOW_ICONS[i]} size={20} strokeWidth={1.4} className="text-fg-subtle" />
              </div>
              <h3 className="serif m-0 mt-4 text-[21px]">{s.t}</h3>
              <p className="m-0 mt-2 text-[15px] leading-relaxed text-fg-muted">{s.d}</p>
            </RevealItem>
          ))}
        </ol>
      </section>

      {/* -------------------------------------------------------- Обещания */}
      <section className="border-y border-rule bg-cream-2">
        <div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-10">
          <span className="eyebrow">{t.home.promisesTitle}</span>
          <ul className="m-0 mt-8 grid list-none grid-cols-1 gap-x-10 gap-y-10 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {t.home.promises.map((p, i) => (
              <RevealItem key={p.t} delay={i * 90} className="border-t border-rule-strong pt-5">
                <DrawIn><Motif name={PROMISE_MOTIFS[i]} size={44} className="text-ochre" /></DrawIn>
                <h3 className="serif m-0 mt-4 text-[20px]">{p.t}</h3>
                <p className="m-0 mt-2.5 text-[14px] leading-relaxed text-fg-muted">{p.d}</p>
              </RevealItem>
            ))}
          </ul>
        </div>
      </section>

      {/* --------------------------------------------------------- Жильё */}
      <section id="stays" className="mx-auto max-w-[1280px] scroll-mt-24 px-5 pt-16 pb-10 sm:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[30rem]">
            <span className="eyebrow">{t.nav.stays}</span>
            <h2 className="display m-0 mt-4 text-[clamp(30px,5vw,56px)]">{t.home.staysTitle}</h2>
          </div>
          <p className="m-0 max-w-[44ch] text-[15px] leading-relaxed text-fg-muted">
            {t.home.staysSub}
            <span className="mt-2 block text-[13px] text-fg-subtle" aria-live="polite">{t.common.found}: {stays.length}</span>
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <div role="group" aria-label={t.home.where} className="flex flex-wrap gap-2">
            {REGIONS.map((r) => (
              <button key={r.key} type="button" aria-pressed={region === r.key} onClick={() => setRegion(r.key)} className={chip(region === r.key)}>
                {pick(r.label, lang)}
              </button>
            ))}
          </div>
          <div role="group" aria-label={t.home.importantForMe} className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-[13px] text-fg-subtle">{t.home.importantForMe}:</span>
            {FEATURES.map((f) => (
              <button key={f.key} type="button" aria-pressed={feats.includes(f.key)} onClick={() => toggle(f.key)} className={chip(feats.includes(f.key))}>
                <Icon name={f.icon} size={15} strokeWidth={1.5} />
                {pick(f.label, lang)}
              </button>
            ))}
            <button type="button" aria-pressed={onlyFav} onClick={() => setOnlyFav((v) => !v)} className={chip(onlyFav)}>
              <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true" fill={onlyFav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
                <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
              </svg>
              {t.common.onlyFavourites}{fav.list.length > 0 ? ` · ${fav.list.length}` : ""}
            </button>
            {(feats.length > 0 || region !== "all" || onlyFav) && (
              <button type="button" onClick={() => { setFeats([]); setRegion("all"); setOnlyFav(false); }} className="h-11 cursor-pointer px-2 text-[13px] text-fg-subtle underline underline-offset-4 hover:text-fg">
                {t.common.reset}
              </button>
            )}
          </div>
        </div>

        {stays.length === 0 ? (
          <div className="mt-12 border border-dashed border-rule-strong px-8 py-20 text-center">
            <Motif name="kyial" size={64} className="mx-auto text-rule-strong" />
            <p className="serif m-0 mt-5 text-[24px]">{onlyFav && fav.list.length === 0 ? t.common.favourites : t.home.emptyTitle}</p>
            <p className="m-0 mt-3 text-[15px] text-fg-muted">{onlyFav && fav.list.length === 0 ? t.common.noFavourites : t.home.emptySub}</p>
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

      {/* ---------------------------------------------------------- Карта */}
      <section className="mx-auto max-w-[1280px] px-5 pb-6 pt-12 sm:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-rule pt-10">
          <div className="max-w-[30rem]">
            <span className="eyebrow">Кыргызстан</span>
            <h2 className="display m-0 mt-4 text-[clamp(26px,4vw,42px)]">{t.common.mapTitle}</h2>
          </div>
          <p className="m-0 max-w-[42ch] text-[15px] leading-relaxed text-fg-muted">{t.common.mapSub}</p>
        </div>
        <div className="mt-8 border border-rule bg-paper p-4 sm:p-6">
          <KyrgyzMap places={places} query={query} />
        </div>
      </section>

      {/* --------------------------------------------------- Путеводитель */}
      <section className="mt-16 bg-cream-2">
        <TermeBand id="terme-guide" height={26} />
        <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-[30rem]">
              <span className="eyebrow">{t.nav.guide}</span>
              <h2 className="display m-0 mt-4 text-[clamp(28px,4.4vw,48px)]">{t.home.guideTitle}</h2>
            </div>
            <p className="m-0 max-w-[42ch] text-[15px] leading-relaxed text-fg-muted">{t.home.guideSub}</p>
          </div>

          <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-px bg-rule p-0 sm:grid-cols-2 lg:grid-cols-4">
            {t.home.guideLinks.map((g, i) => (
              <li key={g.t} className="bg-cream-2">
                <Link href={GUIDE_HREFS[i]} className="flex h-full flex-col gap-3 p-6 text-fg no-underline transition-colors hover:bg-paper">
                  <Art name={GUIDE_ART[i]} label={g.t} width={420} className="-mx-6 -mt-6 mb-1 block h-auto w-[calc(100%+3rem)]" />
                  <h3 className="serif m-0 text-[20px]">{g.t}</h3>
                  <p className="m-0 text-[14px] leading-relaxed text-fg-muted">{g.d}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-accent">
                    {t.common.open} <Icon name="arrow" size={14} strokeWidth={1.8} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <TermeBand id="terme-guide-b" height={26} />
      </section>

      {/* --------------------------------------------------------- Рассказы */}
      <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-rule pt-10">
          <div className="max-w-[30rem]">
            <span className="eyebrow">{t.common.stories}</span>
            <h2 className="display m-0 mt-4 text-[clamp(26px,4vw,42px)]">{t.common.storiesTitle}</h2>
          </div>
          <p className="m-0 max-w-[42ch] text-[15px] leading-relaxed text-fg-muted">{t.common.storiesSub}</p>
        </div>

        <ul className="m-0 mt-8 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {STORIES.slice(0, 4).map((st, i) => (
            <RevealItem key={st.slug} delay={i * 80} className="overflow-hidden border border-rule bg-paper">
              <Link href={`/stories/${st.slug}/`} className="block text-fg no-underline">
                <Art name={st.art} label={pick(st.title, lang)} width={520} className="block h-auto w-full" />
                <div className="p-5">
                  <h3 className="serif m-0 text-[20px]">{pick(st.title, lang)}</h3>
                  <p className="m-0 mt-2 line-clamp-3 text-[14px] leading-relaxed text-fg-muted">{pick(st.lead, lang)}</p>
                  <span className="mt-3 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-accent">
                    {t.common.readMore} →
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </ul>

        <Link href="/stories/" className="pill pill-ghost mt-8">{t.common.allStories}</Link>
      </section>

      {/* ----------------------------------------------------- Орнаменты */}
      <section className="relative mx-auto max-w-[1280px] overflow-hidden px-5 py-20 sm:px-10">
        <Medallion id="motif-watermark" size={520} color="#8E2420" className="spin-slow pointer-events-none absolute -right-[160px] top-[60px] opacity-[0.06]" />
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[32rem]">
            <span className="eyebrow">{t.home.motifsEyebrow}</span>
            <h2 className="display m-0 mt-4 text-[clamp(28px,4.4vw,48px)]">{t.home.motifsTitle}</h2>
          </div>
          <p className="m-0 max-w-[44ch] text-[15px] leading-relaxed text-fg-muted">{t.home.motifsSub}</p>
        </div>

        <ul className="relative m-0 mt-12 grid list-none grid-cols-2 gap-5 p-0 sm:grid-cols-3 lg:grid-cols-6">
          {MOTIF_ORDER.map((name, i) => (
            <RevealItem key={name} delay={i * 80} className="felt border border-rule-strong bg-paper p-5 text-center">
              <DrawIn duration={1600}><Motif name={name} size={132} className="mx-auto text-accent" /></DrawIn>
              <h3 className="serif m-0 mt-4 text-[17px]">{MOTIFS[name].label}</h3>
              <p className="m-0 mt-2 text-[13px] leading-relaxed text-fg-muted">{pick(MOTIFS[name].meaning, lang)}</p>
            </RevealItem>
          ))}
        </ul>
      </section>

      {/* -------------------------------------------------- Пословица */}
      <section className="felt relative overflow-hidden bg-ink text-cream">
        <ZigzagBand id="zig-saying-top" height={18} color="#8E2420" bg="#16130F" />
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-14 px-5 py-20 sm:px-10">
          <DrawIn duration={2000}>
            <Medallion id="saying-med" size={280} color="#DDAE52" className="flex-none" />
          </DrawIn>
          <Reveal className="max-w-[34rem]">
            <span className="eyebrow text-gold">{t.home.sayingEyebrow}</span>
            <p className="display m-0 mt-5 text-[clamp(28px,4.4vw,52px)] leading-[1.05] text-cream">{t.home.saying}</p>
            <p className="m-0 mt-6 text-[17px] leading-relaxed text-on-dark-muted">{t.home.sayingText}</p>
          </Reveal>
        </div>
        <ZigzagBand id="zig-saying-bot" height={18} color="#8E2420" bg="#16130F" flip />
      </section>

      {/* --------------------------------------------------- Впечатления */}
      <section id="exp" className="scroll-mt-24">
        <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-[26rem]">
              <span className="eyebrow">{t.nav.experiences}</span>
              <h2 className="display m-0 mt-4 text-[clamp(28px,4.4vw,48px)]">{t.home.expTitle}</h2>
            </div>
            <p className="m-0 max-w-[40ch] text-[15px] leading-relaxed text-fg-muted">{t.home.expSub}</p>
          </div>

          <ul className="m-0 mt-12 flex list-none flex-col p-0">
            {t.home.experiences.map((e, i) => (
              <RevealItem key={e.t} delay={i * 70} className="flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-rule py-7 last:border-b">
                <span className="serif w-10 text-[15px] text-accent">{String(i + 1).padStart(2, "0")}</span>
                <div className="flex flex-1 basis-[260px] items-start gap-5">
                  <Art name={EXP_ART[i]} label={e.t} width={200} className="h-auto w-[140px] flex-none sm:w-[200px]" />
                  <div>
                    <h3 className="serif m-0 text-[22px]">{e.t}</h3>
                    <p className="m-0 mt-2 max-w-[60ch] text-[15px] leading-relaxed text-fg-muted">{e.d}</p>
                  </div>
                </div>
                <span className="serif text-[18px]">{e.p}</span>
              </RevealItem>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------------- Вопросы */}
      <section className="border-y border-rule bg-cream-2">
        <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-10">
          <div className="max-w-[30rem]">
            <span className="eyebrow">FAQ</span>
            <h2 className="display m-0 mt-4 text-[clamp(28px,4.4vw,44px)]">{t.home.faqTitle}</h2>
          </div>
          <div className="mt-8">
            {t.home.faq.map((f) => (
              <details key={f.q} className="group border-t border-rule last:border-b">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[17px] font-medium">
                  {f.q}
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-rule-strong text-[18px] leading-none transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="m-0 max-w-[70ch] pb-6 text-[15px] leading-relaxed text-fg-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- Хозяева */}
      <section id="hosts" className="felt scroll-mt-24 bg-ink text-on-dark">
        <div className="overflow-hidden"><div className="band-drift"><OrnamentBand id="band-hosts" height={36} color="#6b5a3a" /></div></div>
        <div className="mx-auto flex max-w-[1280px] flex-wrap gap-14 px-5 py-20 sm:px-10">
          <div className="flex-1 basis-[380px]">
            <span className="eyebrow text-gold">{t.home.hostsEyebrow}</span>
            <h2 className="display m-0 mt-4 max-w-[14ch] text-[clamp(28px,4.4vw,52px)] text-cream">{t.home.hostsTitle}</h2>
            <p className="m-0 mt-6 max-w-[50ch] text-[16px] leading-relaxed text-on-dark-muted">{t.home.hostsText}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/hosts/" className="pill pill-light">{t.home.hostsBtn1}</Link>
              <Link href="/hosts/#join" className="pill pill-ghost border-rule-dark text-on-dark hover:border-cream">{t.home.hostsBtn2}</Link>
            </div>
          </div>

          <ul className="m-0 grid flex-1 basis-[420px] list-none grid-cols-1 gap-x-10 gap-y-8 p-0 sm:grid-cols-2">
            {t.home.hostPerks.map((h, i) => (
              <li key={h.t} className="border-t border-rule-dark pt-5">
                <Icon name={PERK_ICONS[i]} size={22} strokeWidth={1.3} className="text-gold" />
                <h3 className="serif m-0 mt-4 text-[19px] text-cream">{h.t}</h3>
                <p className="m-0 mt-2 text-[14px] leading-relaxed text-on-dark-muted">{h.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
