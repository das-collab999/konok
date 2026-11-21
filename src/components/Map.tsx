"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { Place } from "@/data/places";
import { POI, POI_KINDS, type Poi, type PoiKind } from "@/data/poi";
import { COUNTRY_PATH, LAKE_PATHS, MAP_VIEW, mapX, mapY } from "@/data/map-shapes";
import { pick, useLang } from "@/lib/i18n";

/**
 * Карта Кыргызстана.
 *
 * Контур страны и озёра — настоящие (Natural Earth), точки стоят по
 * координатам. Карту можно приближать и тянуть, а цвет точки говорит,
 * что это: город, достопримечательность, музей, природа или наше место.
 */

type Selected = { kind: "poi"; poi: Poi } | { kind: "place"; place: Place } | null;

const STAY_COLOR = "#8E2420";
const MIN_Z = 1;
const MAX_Z = 7;

export function KyrgyzMap({ places, query = "" }: { places: Place[]; query?: string }) {
  const { lang, t } = useLang();
  const [zoom, setZoom] = useState(1);
  const [off, setOff] = useState({ x: 0, y: 0 });
  const [sel, setSel] = useState<Selected>(null);
  const [hidden, setHidden] = useState<PoiKind[]>([]);
  const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const box = useRef<SVGSVGElement | null>(null);

  const w = MAP_VIEW.w;
  const h = MAP_VIEW.h;

  const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

  const setZoomAt = (next: number) => {
    const z = clamp(next, MIN_Z, MAX_Z);
    setZoom(z);
    const lim = (1 - 1 / z) / 2;
    setOff((o) => ({ x: clamp(o.x, -lim, lim), y: clamp(o.y, -lim, lim) }));
  };

  // видимая часть в координатах картинки
  const vw = w / zoom;
  const vh = h / zoom;
  const vx = (w - vw) / 2 + off.x * w;
  const vy = (h - vh) / 2 + off.y * h;

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, ox: off.x, oy: off.y };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current || !box.current) return;
    const rect = box.current.getBoundingClientRect();
    const dx = (e.clientX - drag.current.x) / rect.width / zoom;
    const dy = (e.clientY - drag.current.y) / rect.height / zoom;
    const lim = (1 - 1 / zoom) / 2;
    setOff({
      x: clamp(drag.current.ox - dx, -lim, lim),
      y: clamp(drag.current.oy - dy, -lim, lim),
    });
  };
  const onPointerUp = () => { drag.current = null; };

  const visible = (k: PoiKind) => !hidden.includes(k);
  const toggleKind = (k: PoiKind) => setHidden((cur) => (cur.includes(k) ? cur.filter((x) => x !== k) : [...cur, k]));

  // чем ближе, тем больше подписей
  const labelFor = (k: PoiKind) => (k === "capital" ? 1 : k === "city" ? 1.6 : 2.2);
  // значки и подписи держат один размер на экране при любом приближении
  const r = 7 / zoom;
  const fs = 15 / zoom;

  return (
    <div>
      {/* легенда и кнопки */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <ul className="m-0 flex list-none flex-wrap gap-x-4 gap-y-2 p-0">
          <li>
            <button type="button" className="flex cursor-default items-center gap-2 text-[13px] text-fg-muted">
              <span className="h-3 w-3 rounded-full" style={{ background: STAY_COLOR }} />
              {t.nav.stays}
            </button>
          </li>
          {POI_KINDS.map((k) => (
            <li key={k.kind}>
              <button
                type="button"
                onClick={() => toggleKind(k.kind)}
                aria-pressed={visible(k.kind)}
                className={`flex cursor-pointer items-center gap-2 text-[13px] transition-opacity ${visible(k.kind) ? "text-fg-muted" : "text-fg-subtle opacity-45"}`}
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
          <button type="button" onClick={() => { setZoom(1); setOff({ x: 0, y: 0 }); }}
            className="h-11 cursor-pointer rounded-full border border-rule-strong px-4 text-[13px] transition-colors hover:border-ink">
            {t.common.reset}
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden bg-[#EFE8DA]">
        <svg
          ref={box}
          viewBox={`${vx} ${vy} ${vw} ${vh}`}
          className="block w-full touch-none select-none"
          style={{ cursor: drag.current ? "grabbing" : "grab" }}
          role="img"
          aria-label={t.common.mapTitle}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onWheel={(e) => setZoomAt(zoom * (e.deltaY < 0 ? 1.12 : 1 / 1.12))}
          onDoubleClick={() => setZoomAt(zoom * 1.6)}
        >
          <defs>
            <clipPath id="knk-country-clip">
              <path d={COUNTRY_PATH} fillRule="evenodd" />
            </clipPath>
          </defs>

          {/* страна */}
          <path d={COUNTRY_PATH} fill="#E4DCCB" stroke="#C3B7A0" strokeWidth={1.6 / zoom} fillRule="evenodd" />

          {/* озёра */}
          <g fill="#5E8AAF" opacity="0.9" clipPath="url(#knk-country-clip)">
            {LAKE_PATHS.map((d, i) => <path key={i} d={d} />)}
          </g>

          {/* точки интереса */}
          {POI.filter((p) => visible(p.kind)).map((p) => {
            const color = POI_KINDS.find((k) => k.kind === p.kind)!.color;
            const x = mapX(p.lng);
            const y = mapY(p.lat);
            const showLabel = zoom >= labelFor(p.kind);
            const on = sel?.kind === "poi" && sel.poi.id === p.id;
            return (
              <g key={p.id} transform={`translate(${x} ${y})`} className="cursor-pointer"
                onClick={(e) => { e.stopPropagation(); setSel({ kind: "poi", poi: p }); }}>
                {p.kind === "capital" ? (
                  <rect x={-r} y={-r} width={r * 2} height={r * 2} fill={color} transform="rotate(45)" />
                ) : (
                  <circle r={on ? r * 1.4 : r} fill={color} stroke="#F2EDE3" strokeWidth={r * 0.35} />
                )}
                {(showLabel || on) && (
                  <text x={r * 2.1} y={fs * 0.36} fontSize={fs} fill="#4A4338" style={{ paintOrder: "stroke" }} stroke="#EFE8DA" strokeWidth={fs * 0.28}>
                    {pick(p.name, lang)}
                  </text>
                )}
              </g>
            );
          })}

          {/* наши места */}
          {places.map((p) => {
            const x = mapX(p.lng);
            const y = mapY(p.lat);
            const on = sel?.kind === "place" && sel.place.slug === p.slug;
            const s = (on ? 1.25 : 1) / zoom;
            return (
              <g key={p.slug} transform={`translate(${x} ${y}) scale(${s})`} className="cursor-pointer"
                onClick={(e) => { e.stopPropagation(); setSel({ kind: "place", place: p }); }}>
                <circle r="20" fill={STAY_COLOR} opacity="0.12" />
                <path d="M0 7 C-11 -7 -16 -14 -16 -20 A16 16 0 0 1 16 -20 C16 -14 11 -7 0 7 Z" fill={STAY_COLOR} />
                <circle cx="0" cy="-20" r="5.5" fill="#F2EDE3" />
              </g>
            );
          })}
        </svg>

        <p className="pointer-events-none absolute bottom-2 right-3 m-0 text-[11px] text-fg-subtle">
          Natural Earth · {Math.round(zoom * 10) / 10}×
        </p>
      </div>

      {/* карточка выбранной точки */}
      <div className="mt-4 min-h-[92px] border-t border-rule pt-4">
        {sel?.kind === "place" && (
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div className="min-w-0">
              <Link href={`/place/${sel.place.slug}/${query ? `?${query}` : ""}`} className="serif text-[21px] text-fg no-underline hover:underline">
                {pick(sel.place.title, lang)}
              </Link>
              <p className="m-0 mt-1 text-[14px] text-fg-muted">
                {pick(sel.place.place, lang)} · {sel.place.altitudeM} м · {t.common.fromBishkek} {sel.place.hoursFromBishkek} {t.common.hours}
              </p>
            </div>
            <span className="serif text-[21px]">${sel.place.pricePerPersonUsd}</span>
          </div>
        )}

        {sel?.kind === "poi" && (
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div className="min-w-0">
              <p className="serif m-0 text-[21px]">{pick(sel.poi.name, lang)}</p>
              {sel.poi.note && <p className="m-0 mt-1 max-w-[60ch] text-[14px] text-fg-muted">{pick(sel.poi.note, lang)}</p>}
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
  );
}
