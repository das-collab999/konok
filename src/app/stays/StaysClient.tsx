"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { REGIONS, type Place, type Region } from "@/data/places";
import { pick, useLang } from "@/lib/i18n";
import { PlaceCard } from "@/components/PlaceCard";
import { Icon, type IconName } from "@/components/ui";
import { Motif, TermeBand } from "@/components/ethno";
import { Reveal } from "@/components/motion";
import { useFavourites } from "@/lib/favourites";

type Feature = "stove" | "bath" | "signal" | "car";

const FEATURES: { key: Feature; icon: IconName; test: (p: Place) => boolean; label: { ru: string; en: string; zh: string } }[] = [
  { key: "stove", icon: "fire", test: (p) => p.hasStove, label: { ru: "Печка", en: "Stove", zh: "有炉子" } },
  { key: "bath", icon: "bath", test: (p) => p.hasBath, label: { ru: "Баня или душ", en: "Banya or shower", zh: "有浴" } },
  { key: "signal", icon: "signal", test: (p) => p.hasSignal, label: { ru: "Есть связь", en: "Mobile signal", zh: "有信号" } },
  { key: "car", icon: "car", test: (p) => p.carAccess === "car", label: { ru: "Обычная машина", en: "Ordinary car", zh: "轿车可达" } },
];

export function StaysClient({ places }: { places: Place[] }) {
  const { lang, t } = useLang();
  const [region, setRegion] = useState<Region | "all">("all");
  const [feats, setFeats] = useState<Feature[]>([]);
  const [onlyFav, setOnlyFav] = useState(false);
  const [date, setDate] = useState("");
  const [today, setToday] = useState("");
  const [guests, setGuests] = useState(2);
  const fav = useFavourites();

  useEffect(() => {
    const now = new Date();
    const iso = (d: Date) => d.toISOString().slice(0, 10);
    setToday(iso(now));
    const soon = new Date(now);
    soon.setMonth(soon.getMonth() + 1);

    // Параметры с главной: регион, дата заезда и число гостей.
    const q = new URLSearchParams(window.location.search);
    const r = q.get("r");
    if (r && (r === "all" || REGIONS.some((x) => x.key === r))) setRegion(r as Region | "all");
    const d = q.get("d");
    setDate(d && /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : iso(soon));
    const g = Number(q.get("g"));
    if (g >= 1 && g <= 12) setGuests(g);
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
    `inline-flex h-11 flex-none cursor-pointer items-center gap-2 whitespace-nowrap rounded-full border px-4 text-[13px] transition-colors ${
      on ? "border-ink bg-ink text-cream" : "border-rule-strong text-fg-muted hover:border-ink hover:text-fg"
    }`;
  const field = "h-11 w-full border-0 border-b border-rule-strong bg-transparent px-0 text-[16px] text-fg outline-none focus:border-ink";

  return (
    <>
      <section className="border-b border-rule">
        <div className="mx-auto max-w-[1280px] px-5 py-10 sm:px-10">
          <span className="eyebrow flex items-center gap-2.5">
            <Motif name="kochkor" size={30} className="text-accent" />
            {t.nav.stays}
          </span>
          <h1 className="display m-0 mt-4 max-w-[16ch] text-[clamp(28px,4.4vw,46px)]">{t.home.staysTitle}</h1>
          <p className="m-0 mt-5 max-w-[56ch] text-[16px] leading-relaxed text-fg-muted">{t.home.staysSub}</p>

          <div className="mt-8 grid gap-6 border-t border-rule pt-7 sm:grid-cols-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="s-region" className="eyebrow">{t.home.where}</label>
              <select id="s-region" value={region} onChange={(e) => setRegion(e.target.value as Region | "all")} className={`${field} cursor-pointer`}>
                {REGIONS.map((r) => <option key={r.key} value={r.key}>{pick(r.label, lang)}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="s-date" className="eyebrow">{t.home.when}</label>
              <input id="s-date" type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} className={field} />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="s-guests" className="eyebrow">{t.home.guests}</label>
              <input id="s-guests" type="number" min={1} max={12} value={guests}
                onChange={(e) => setGuests(Math.min(12, Math.max(1, Number(e.target.value) || 1)))} className={field} />
            </div>
          </div>
        </div>
      </section>

      <TermeBand id="terme-stays" height={24} />

      <section className="mx-auto max-w-[1280px] px-5 py-10 sm:px-10">
        <div className="flex flex-col gap-3">
          <div role="group" aria-label={t.home.where} className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
            {REGIONS.map((r) => (
              <button key={r.key} type="button" aria-pressed={region === r.key} onClick={() => setRegion(r.key)} className={chip(region === r.key)}>
                {pick(r.label, lang)}
              </button>
            ))}
          </div>
          <div role="group" aria-label={t.home.importantForMe} className="-mx-5 flex items-center gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
            <span className="mr-1 flex-none whitespace-nowrap text-[13px] text-fg-subtle">{t.home.importantForMe}:</span>
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
              <button type="button" onClick={() => { setFeats([]); setRegion("all"); setOnlyFav(false); }}
                className="h-11 cursor-pointer px-2 text-[13px] text-fg-subtle underline underline-offset-4 hover:text-fg">
                {t.common.reset}
              </button>
            )}
          </div>
          <p className="m-0 text-[13px] text-fg-subtle" aria-live="polite">{t.common.found}: {stays.length}</p>
        </div>

        {stays.length === 0 ? (
          <div className="mt-12 border border-dashed border-rule-strong px-8 py-8 sm:py-12 sm:py-20 text-center">
            <Motif name="kyial" size={64} className="mx-auto text-rule-strong" />
            <p className="serif m-0 mt-5 text-[24px]">{onlyFav && fav.list.length === 0 ? t.common.favourites : t.home.emptyTitle}</p>
            <p className="m-0 mt-3 text-[15px] text-fg-muted">{onlyFav && fav.list.length === 0 ? t.common.noFavourites : t.home.emptySub}</p>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 items-stretch gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {stays.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 100} className="h-full">
                <PlaceCard place={p} query={query} />
              </Reveal>
            ))}
          </div>
        )}

        <Link href="/map/" className="pill pill-ghost mt-12">{t.common.showOnMap}</Link>
      </section>
    </>
  );
}
