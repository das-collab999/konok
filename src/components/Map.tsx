"use client";

import Link from "next/link";
import { useState } from "react";
import type { Place } from "@/data/places";
import { pick, useLang } from "@/lib/i18n";

/**
 * Карта Кыргызстана с местами.
 *
 * Очертания страны и озёра нарисованы упрощённо — это схема, чтобы
 * турист понял, куда ехать и что рядом, а не навигатор. Точки стоят
 * по настоящим координатам.
 */

// Рамка карты в градусах
const W = { lngMin: 69.2, lngMax: 80.4, latMin: 39.1, latMax: 43.4 };
const BOX = { w: 1000, h: 470, pad: 20 };

const px = (lng: number) => BOX.pad + ((lng - W.lngMin) / (W.lngMax - W.lngMin)) * (BOX.w - BOX.pad * 2);
const py = (lat: number) => BOX.pad + ((W.latMax - lat) / (W.latMax - W.latMin)) * (BOX.h - BOX.pad * 2);

// Упрощённый контур страны
const OUTLINE =
  "M60 214 L96 170 L150 150 L196 164 L232 142 L286 150 L330 120 L392 104 L436 118 L492 96 L548 86 L604 96 L660 78 L716 86 L772 70 L838 86 L896 76 L944 104 L962 150 L930 186 L946 232 L908 268 L930 310 L882 340 L824 330 L770 352 L704 338 L648 360 L590 348 L536 372 L476 360 L420 384 L360 370 L300 392 L242 374 L196 392 L146 368 L104 330 L82 286 Z";

const CITIES: { name: string; lat: number; lng: number }[] = [
  { name: "Бишкек", lat: 42.87, lng: 74.59 },
  { name: "Каракол", lat: 42.49, lng: 78.39 },
  { name: "Нарын", lat: 41.43, lng: 75.99 },
  { name: "Ош", lat: 40.53, lng: 72.79 },
];

export function KyrgyzMap({ places, query = "" }: { places: Place[]; query?: string }) {
  const { lang } = useLang();
  const [active, setActive] = useState<string | null>(null);
  const current = places.find((p) => p.slug === active) ?? null;

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${BOX.w} ${BOX.h}`} className="block w-full" role="img" aria-label="Карта Кыргызстана с местами">
        <rect width={BOX.w} height={BOX.h} fill="#EFE8DA" />
        <path d={OUTLINE} fill="#E2DAC8" stroke="#C6BAA5" strokeWidth="3" />

        {/* хребты */}
        <g stroke="#CFC3AC" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.9">
          <path d="M150 250 q70 -34 140 -4 q70 30 140 -10 q70 -40 140 0" />
          <path d="M260 320 q70 -30 140 -2 q70 28 140 -12" />
          <path d="M520 200 q80 -34 150 -6 q70 28 140 -8" />
        </g>

        {/* Иссык-Куль */}
        <ellipse cx={px(77.3)} cy={py(42.42)} rx="86" ry="30" fill="#4D7BA3" opacity="0.85" />
        <ellipse cx={px(77.3)} cy={py(42.44)} rx="74" ry="23" fill="#6A94BA" opacity="0.55" />

        {/* города */}
        {CITIES.map((c) => (
          <g key={c.name}>
            <circle cx={px(c.lng)} cy={py(c.lat)} r="5" fill="#8F8878" />
            <text x={px(c.lng) + 10} y={py(c.lat) + 5} fontSize="18" fill="#6B6253">{c.name}</text>
          </g>
        ))}

        {/* места */}
        {places.map((p) => {
          const x = px(p.lng);
          const y = py(p.lat);
          const on = active === p.slug;
          return (
            <g
              key={p.slug}
              transform={`translate(${x} ${y})`}
              onMouseEnter={() => setActive(p.slug)}
              onFocus={() => setActive(p.slug)}
              onMouseLeave={() => setActive(null)}
              tabIndex={0}
              role="button"
              aria-label={pick(p.title, lang)}
              className="cursor-pointer outline-none"
            >
              <circle r={on ? 26 : 18} fill="#8E2420" opacity={on ? 0.18 : 0.1} />
              <path d="M0 6 C-10 -6 -14 -12 -14 -18 A14 14 0 0 1 14 -18 C14 -12 10 -6 0 6 Z" fill={on ? "#8E2420" : "#A93029"} />
              <circle cx="0" cy="-18" r="5" fill="#F2EDE3" />
            </g>
          );
        })}
      </svg>

      {/* подпись выбранной точки */}
      <div className="mt-4 min-h-[76px] border-t border-rule pt-4">
        {current ? (
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div className="min-w-0">
              <Link href={`/place/${current.slug}/${query ? `?${query}` : ""}`} className="serif text-[20px] text-fg no-underline hover:underline">
                {pick(current.title, lang)}
              </Link>
              <p className="m-0 mt-1 text-[14px] text-fg-muted">
                {pick(current.place, lang)} · {current.altitudeM} м · {current.hoursFromBishkek} ч
              </p>
            </div>
            <span className="serif text-[20px]">${current.pricePerPersonUsd}</span>
          </div>
        ) : (
          <p className="m-0 text-[14px] text-fg-subtle">Наведите на точку, чтобы увидеть место</p>
        )}
      </div>
    </div>
  );
}
