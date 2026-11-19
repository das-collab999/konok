"use client";

import { useSearchParams } from "next/navigation";
import { EXTRAS, calcTotal, type Place } from "@/data/places";

/** Reads nights / guests / extras from the URL (?n=2&g=2&x=transfer,horse). */
export function useBooking(place: Place) {
  const sp = useSearchParams();
  const clamp = (v: number, lo: number, hi: number, d: number) => (Number.isFinite(v) ? Math.min(hi, Math.max(lo, v)) : d);
  const nights = clamp(parseInt(sp.get("n") ?? "", 10), 1, 14, 2);
  const guests = clamp(parseInt(sp.get("g") ?? "", 10), 1, 12, 2);
  const extras = (sp.get("x") ?? "").split(",").filter((id) => EXTRAS.some((e) => e.id === id));
  const { lines, total } = calcTotal(place, nights, guests, extras);
  const query = new URLSearchParams({ n: String(nights), g: String(guests), x: extras.join(",") }).toString();
  return { nights, guests, extras, lines, total, query };
}
