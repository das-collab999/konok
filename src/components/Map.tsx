"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import type { Place } from "@/data/places";
import { POI, POI_KINDS, type Poi, type PoiKind } from "@/data/poi";
import { COUNTRY_PATH, LAKE_PATHS, MAP_VIEW, mapX, mapY } from "@/data/map-shapes";
import { pick, useLang } from "@/lib/i18n";

/**
 * Карта Кыргызстана.
 *
 * Контур страны и озёра настоящие (Natural Earth), точки стоят по
 * координатам. Рядом с картой — список всех точек: по нему понятно,
 * что где находится, а нажатие подводит карту к нужному месту.
 */

type Item =
  | { type: "place"; id: string; lat: number; lng: number; name: string; sub: string; color: string; place: Place }
  | { type: "poi"; id: string; lat: number; lng: number; name: string; sub: string; color: string; poi: Poi };

const STAY_COLOR = "#8E2420";
const MIN_Z = 1;
const MAX_Z = 8;

export function KyrgyzMap({
  places,
  query = "",
  height = "tall",
  showList = true,
}: { places: Place[]; query?: string; height?: "tall" | "short"; showList?: boolean }) {
  const { lang, t } = useLang();
  const [zoom, setZoom] = useState(1);
  const [off, setOff] = useState({ x: 0, y: 0 });
  const [selId, setSelId] = useState<string | null>(null);
  const [hidden, setHidden] = useState<PoiKind[]>([]);
  const [q, setQ] = useState("");
  const drag = useRef<{ x: number; y: number; ox: number; oy: number; moved: boolean } | null>(null);
  const box = useRef<SVGSVGElement | null>(null);

  const w = MAP_VIEW.w;
  const h = MAP_VIEW.h;
  const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

  const items: Item[] = useMemo(() => {
    const fromPlaces: Item[] = places.map((p) => ({
      type: "place", id: `place-${p.slug}`, lat: p.lat, lng: p.lng,
      name: pick(p.title, lang), sub: `${pick(p.place, lang)} · ${p.altitudeM} ${t.common.altitude}`,
      color: STAY_COLOR, place: p,
    }));
    const fromPoi: Item[] = POI.map((p) => ({
      type: "poi", id: `poi-${p.id}`, lat: p.lat, lng: p.lng,
      name: pick(p.name, lang), sub: p.note ? pick(p.note, lang) : "",
      color: POI_KINDS.find((k) => k.kind === p.kind)!.color, poi: p,
    }));
    return [...fromPlaces, ...fromPoi];
  }, [places, lang, t]);

  const visibleItems = items.filter((i) => (i.type === "place" ? true : !hidden.includes(i.poi.kind)));
  const listItems = visibleItems.filter((i) => !q || i.name.toLowerCase().includes(q.toLowerCase()));
  const sel = items.find((i) => i.id === selId) ?? null;

  // видимая часть
  const vw = w / zoom;
  const vh = h / zoom;
  const vx = (w - vw) / 2 + off.x * w;
  const vy = (h - vh) / 2 + off.y * h;

  const setZoomAt = (next: number) => {
    const z = clamp(next, MIN_Z, MAX_Z);
    setZoom(z);
    const lim = (1 - 1 / z) / 2;
    setOff((o) => ({ x: clamp(o.x, -lim, lim), y: clamp(o.y, -lim, lim) }));
  };

  /** Подвести карту к точке. */
  const focus = (it: Item, z = 3.4) => {
    setSelId(it.id);
    const zz = clamp(z, MIN_Z, MAX_Z);
    const lim = (1 - 1 / zz) / 2;
    setZoom(zz);
    setOff({
      x: clamp(mapX(it.lng) / w - 0.5, -lim, lim),
      y: clamp(mapY(it.lat) / h - 0.5, -lim, lim),
    });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, ox: off.x, oy: off.y, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current || !box.current) return;
    const rect = box.current.getBoundingClientRect();
    const dx = (e.clientX - drag.current.x) / rect.width / zoom;
    const dy = (e.clientY - drag.current.y) / rect.height / zoom;
    if (Math.abs(dx) + Math.abs(dy) > 0.002) drag.current.moved = true;
    const lim = (1 - 1 / zoom) / 2;
    setOff({ x: clamp(drag.current.ox - dx, -lim, lim), y: clamp(drag.current.oy - dy, -lim, lim) });
  };
  const onPointerUp = () => { drag.current = null; };

  const toggleKind = (k: PoiKind) => setHidden((cur) => (cur.includes(k) ? cur.filter((x) => x !== k) : [...cur, k]));

  const r = 7 / zoom;
  const fs = 14 / zoom;

  // Наши места пронумерованы: тот же номер стоит в списке справа,
  // поэтому понятно, какая булавка какому месту соответствует.
  const num = new Map<string, number>();
  items.filter((i) => i.type === "place").forEach((i, k) => num.set(i.id, k + 1));

  // Подписи: столица всегда, города — чуть ближе, остальное — при приближении.
  // Названия наших мест длинные и наезжают друг на друга, поэтому они
  // появляются только при увеличении или когда точка выбрана.
  const labelVisible = (i: Item) =>
    selId === i.id ||
    (i.type === "place" ? zoom >= 2.4 : i.poi.kind === "capital" || zoom >= (i.poi.kind === "city" ? 1.5 : 2.2));

  return (
    <div className={`grid gap-6 ${showList ? "lg:grid-cols-[1fr_320px]" : ""}`}>
      <div>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <ul className="m-0 flex list-none flex-wrap gap-x-4 gap-y-2 p-0">
            <li className="flex items-center gap-2 text-[13px] text-fg-muted">
              <span className="h-3 w-3 rounded-full" style={{ background: STAY_COLOR }} />
              {t.nav.stays}
            </li>
            {POI_KINDS.map((k) => (
              <li key={k.kind}>
                <button
                  type="button" onClick={() => toggleKind(k.kind)} aria-pressed={!hidden.includes(k.kind)}
                  className={`flex cursor-pointer items-center gap-2 text-[13px] transition-opacity ${hidden.includes(k.kind) ? "text-fg-subtle opacity-40" : "text-fg-muted"}`}
                >
                  <span className="h-3 w-3 rounded-full" style={{ background: k.color }} />
                  {pick(k.label, lang)}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setZoomAt(zoom / 1.6)} aria-label="−"
              className="h-11 w-11 cursor-pointer rounded-full border border-rule-strong text-[19px] leading-none transition-colors hover:border-ink">−</button>
            <button type="button" onClick={() => setZoomAt(zoom * 1.6)} aria-label="+"
              className="h-11 w-11 cursor-pointer rounded-full border border-rule-strong text-[19px] leading-none transition-colors hover:border-ink">+</button>
            <button type="button" onClick={() => { setZoom(1); setOff({ x: 0, y: 0 }); setSelId(null); }}
              className="h-11 cursor-pointer rounded-full border border-rule-strong px-4 text-[13px] transition-colors hover:border-ink">
              {t.common.reset}
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden bg-[#EFE8DA]">
          <svg
            ref={box}
            viewBox={`${vx} ${vy} ${vw} ${vh}`}
            className={`block w-full touch-none select-none ${height === "short" ? "max-h-[420px]" : ""}`}
            role="img" aria-label={t.common.mapTitle}
            onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}
            onWheel={(e) => setZoomAt(zoom * (e.deltaY < 0 ? 1.12 : 1 / 1.12))}
            onDoubleClick={() => setZoomAt(zoom * 1.6)}
            style={{ cursor: "grab" }}
          >
            <defs>
              <clipPath id="knk-country-clip"><path d={COUNTRY_PATH} fillRule="evenodd" /></clipPath>
            </defs>

            <path d={COUNTRY_PATH} fill="#E4DCCB" stroke="#C3B7A0" strokeWidth={1.6 / zoom} fillRule="evenodd" />
            <g fill="#5E8AAF" opacity="0.9" clipPath="url(#knk-country-clip)">
              {LAKE_PATHS.map((d, i) => <path key={i} d={d} />)}
            </g>

            {visibleItems.map((i) => {
              const x = mapX(i.lng);
              const y = mapY(i.lat);
              const on = selId === i.id;
              const isPlace = i.type === "place";
              const isCapital = i.type === "poi" && i.poi.kind === "capital";
              return (
                <g key={i.id} transform={`translate(${x} ${y})`} className="cursor-pointer"
                  onClick={(e) => { e.stopPropagation(); if (!drag.current?.moved) setSelId(i.id); }}>
                  {on && <circle r={r * 3} fill={i.color} opacity="0.16" />}
                  {isPlace ? (
                    <g transform={`scale(${(on ? 1.3 : 1) / zoom})`}>
                      <path d="M0 7 C-11 -7 -16 -14 -16 -20 A16 16 0 0 1 16 -20 C16 -14 11 -7 0 7 Z" fill={STAY_COLOR} />
                      <circle cx="0" cy="-20" r="9" fill="#F2EDE3" />
                      <text x="0" y="-16.4" textAnchor="middle" fontSize="12" fontWeight={700} fill={STAY_COLOR}>
                        {num.get(i.id)}
                      </text>
                    </g>
                  ) : isCapital ? (
                    <rect x={-r} y={-r} width={r * 2} height={r * 2} fill={i.color} transform="rotate(45)" />
                  ) : (
                    <circle r={on ? r * 1.35 : r} fill={i.color} stroke="#F2EDE3" strokeWidth={r * 0.35} />
                  )}
                  {labelVisible(i) && (
                    <text
                      x={isPlace ? r * 2.8 : r * 2}
                      y={fs * 0.36}
                      fontSize={fs}
                      fontWeight={isPlace || isCapital ? 600 : 400}
                      fill="#3F3930"
                      style={{ paintOrder: "stroke" }}
                      stroke="#EFE8DA"
                      strokeWidth={fs * 0.3}
                    >
                      {i.name}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          <p className="pointer-events-none absolute bottom-2 right-3 m-0 text-[11px] text-fg-subtle">
            Natural Earth · {Math.round(zoom * 10) / 10}×
          </p>
        </div>

        {/* выбранная точка */}
        <div className="mt-4 min-h-[86px] border-t border-rule pt-4">
          {sel?.type === "place" && (
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div className="min-w-0">
                <Link href={`/place/${sel.place.slug}/${query ? `?${query}` : ""}`} className="serif text-[21px] text-fg no-underline hover:underline">
                  {sel.name}
                </Link>
                <p className="m-0 mt-1 text-[14px] text-fg-muted">
                  {pick(sel.place.place, lang)} · {sel.place.altitudeM} {t.common.altitude} · {t.common.fromBishkek} {sel.place.hoursFromBishkek} {t.common.hours}
                </p>
              </div>
              <span className="serif text-[21px]">${sel.place.pricePerPersonUsd}</span>
            </div>
          )}
          {sel?.type === "poi" && (
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div className="min-w-0">
                <p className="serif m-0 text-[21px]">{sel.name}</p>
                {sel.sub && <p className="m-0 mt-1 max-w-[60ch] text-[14px] text-fg-muted">{sel.sub}</p>}
              </div>
              {sel.poi.story && (
                <Link href={`/stories/${sel.poi.story}/`} className="inline-flex h-11 items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-accent no-underline">
                  {t.common.readMore} →
                </Link>
              )}
            </div>
          )}
          {!sel && <p className="m-0 text-[14px] text-fg-subtle">{t.common.mapHint}</p>}
        </div>
      </div>

      {/* список точек */}
      {showList && (
      <aside className="min-w-0">
        <label htmlFor="map-q" className="eyebrow">{t.common.mapList}</label>
        <input
          id="map-q" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.common.mapSearch}
          className="mt-3 h-11 w-full border-0 border-b border-rule-strong bg-transparent px-0 text-[15px] outline-none focus:border-ink"
        />
        <ul className="m-0 mt-3 flex max-h-[520px] list-none flex-col overflow-y-auto p-0">
          {listItems.map((i) => (
            <li key={i.id}>
              <button
                type="button"
                onClick={() => focus(i)}
                className={`flex w-full cursor-pointer items-start gap-3 border-b border-rule py-3 text-left transition-colors hover:bg-cream-2 ${selId === i.id ? "bg-cream-2" : ""}`}
              >
                {i.type === "place" ? (
                  <span
                    className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full text-[11px] font-semibold text-cream"
                    style={{ background: i.color }}
                  >
                    {num.get(i.id)}
                  </span>
                ) : (
                  <span className="mt-1.5 h-3 w-3 flex-none rounded-full" style={{ background: i.color }} />
                )}
                <span className="min-w-0">
                  <span className="block text-[15px] text-fg">{i.name}</span>
                  {i.sub && <span className="mt-0.5 block truncate text-[13px] text-fg-subtle">{i.sub}</span>}
                </span>
              </button>
            </li>
          ))}
          {listItems.length === 0 && <li className="py-4 text-[14px] text-fg-subtle">{t.common.mapNothing}</li>}
        </ul>
      </aside>
      )}
    </div>
  );
}
