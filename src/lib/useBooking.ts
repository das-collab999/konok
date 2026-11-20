"use client";

import { useSearchParams } from "next/navigation";
import { EXTRAS, calcTotal, type Place } from "@/data/places";
import type { Lang } from "@/lib/i18n";

const clamp = (v: number, lo: number, hi: number, d: number) => (Number.isFinite(v) ? Math.min(hi, Math.max(lo, v)) : d);

/** Читает параметры брони из адреса страницы (?n=2&g=2&d=2027-07-12&x=transfer,horse). */
export function useBooking(place: Place) {
  const sp = useSearchParams();
  const nights = clamp(parseInt(sp.get("n") ?? "", 10), 1, 14, 2);
  const guests = clamp(parseInt(sp.get("g") ?? "", 10), 1, 12, 2);
  const date = /^\d{4}-\d{2}-\d{2}$/.test(sp.get("d") ?? "") ? (sp.get("d") as string) : "";
  const extras = (sp.get("x") ?? "").split(",").filter((id) => EXTRAS.some((e) => e.id === id));
  const { lines, total } = calcTotal(place, nights, guests, extras);
  const query = new URLSearchParams({ n: String(nights), g: String(guests), d: date, x: extras.join(",") }).toString();
  return { nights, guests, date, extras, lines, total, query };
}

const LOCALES: Record<Lang, string> = { ru: "ru-RU", en: "en-GB", zh: "zh-CN" };

/** Дата словами на языке гостя. */
export function formatDate(iso: string, lang: Lang = "ru") {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(LOCALES[lang], { day: "numeric", month: "long", year: "numeric" }).replace(/\s*г\.$/, "");
}
