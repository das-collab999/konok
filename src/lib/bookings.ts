"use client";

import { supabase } from "./supabase";

export type SavedBooking = {
  code: string;
  slug: string;
  title: string;
  place?: string;
  host: string;
  nights: number;
  guests: number;
  date?: string;
  total: number;
  name?: string;
  phone?: string;
  status?: string;
};

const KEY = "konok-bookings";
const COMMISSION = 0.12;

export function readBookings(): SavedBooking[] {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

export function writeBookings(list: SavedBooking[]) {
  try { localStorage.setItem(KEY, JSON.stringify(list)); } catch {}
}

/**
 * Сохраняет бронь.
 * Всегда кладёт её в память телефона, чтобы она открывалась без интернета,
 * и дополнительно отправляет в базу, если та подключена.
 */
export async function saveBooking(b: SavedBooking): Promise<{ inDatabase: boolean }> {
  const list = readBookings();
  if (!list.some((x) => x.code === b.code)) {
    list.push(b);
    writeBookings(list);
  }

  const db = supabase();
  if (!db) return { inDatabase: false };

  try {
    const { data: place } = await db.from("places").select("id").eq("slug", b.slug).single();
    if (!place) return { inDatabase: false };

    const { error } = await db.from("bookings").insert({
      code: b.code,
      place_id: place.id,
      guest_name: b.name ?? "",
      guest_phone: b.phone ?? "",
      check_in: b.date ?? null,
      nights: b.nights,
      guests: b.guests,
      total_usd: b.total,
      commission_usd: Math.round(b.total * COMMISSION * 100) / 100,
    });
    return { inDatabase: !error };
  } catch {
    return { inDatabase: false };
  }
}

/** Поиск брони по номеру и телефону — работает с любого устройства, если база подключена. */
export async function findBooking(code: string, phone: string) {
  const db = supabase();
  if (!db) return null;
  try {
    const { data, error } = await db.rpc("find_booking", { p_code: code, p_phone: phone });
    if (error || !data?.length) return null;
    return data[0] as {
      code: string; title: string; place_name: string; host_family: string;
      check_in: string; nights: number; guests: number; total_usd: number; status: string;
    };
  } catch {
    return null;
  }
}
