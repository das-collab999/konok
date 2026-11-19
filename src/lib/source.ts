import { PLACES, EXTRAS, type Extra, type Place, type Region } from "@/data/places";
import { isSupabaseConfigured, supabase } from "./supabase";

/**
 * Откуда берутся места и услуги.
 *
 * Сайт собирается в статические страницы, поэтому данные читаются один раз
 * во время сборки. Если база ещё не подключена — берём тестовые данные из
 * `src/data/places.ts`, и сайт работает ровно так же.
 */

type PlaceRow = {
  slug: string;
  type: "yurt" | "house";
  region: Region;
  place_name: string;
  title: string;
  short: string;
  host_story: string | null;
  road_description: string | null;
  altitude_m: number | null;
  price_per_person_usd: number | string;
  has_stove: boolean;
  has_bath: boolean;
  has_signal: boolean;
  car_access: "car" | "4x4";
  toilet: string | null;
  wash: string | null;
  net: string | null;
  road_type: string | null;
  hosts: { family_name: string } | { family_name: string }[] | null;
  place_photos: { url: string; sort: number }[] | null;
};

function toPlace(row: PlaceRow): Place {
  const host = Array.isArray(row.hosts) ? row.hosts[0] : row.hosts;
  const photo = (row.place_photos ?? []).sort((a, b) => a.sort - b.sort)[0]?.url;
  return {
    slug: row.slug,
    type: row.type,
    region: row.region,
    place: row.place_name,
    title: row.title,
    short: row.short,
    pricePerPersonUsd: Number(row.price_per_person_usd),
    altitudeM: row.altitude_m ?? 0,
    hasStove: row.has_stove,
    hasBath: row.has_bath,
    hasSignal: row.has_signal,
    carAccess: row.car_access,
    toilet: row.toilet ?? "—",
    wash: row.wash ?? "—",
    net: row.net ?? "—",
    roadType: row.road_type ?? "—",
    road: row.road_description ?? "",
    host: host?.family_name ?? "Хозяева",
    story: row.host_story ?? "",
    photo,
    palette: { sky: "#b9ae9c", mountains: "#bdb3a1", hills: "#938a79" },
  };
}

export async function loadPlaces(): Promise<Place[]> {
  const db = supabase();
  if (!db) return PLACES;
  try {
    const { data, error } = await db
      .from("places")
      .select("*, hosts(family_name), place_photos(url, sort)")
      .eq("published", true)
      .order("price_per_person_usd", { ascending: true });
    if (error || !data?.length) return PLACES;
    return (data as PlaceRow[]).map(toPlace);
  } catch {
    return PLACES;
  }
}

export async function loadPlace(slug: string): Promise<Place | undefined> {
  const all = await loadPlaces();
  return all.find((p) => p.slug === slug);
}

export async function loadExtras(): Promise<Extra[]> {
  const db = supabase();
  if (!db) return EXTRAS;
  try {
    const { data, error } = await db.from("extras").select("slug, title, price_usd, per, sort").is("place_id", null).order("sort");
    if (error || !data?.length) return EXTRAS;
    return data.map((e) => ({ id: e.slug, label: e.title, priceUsd: Number(e.price_usd), per: e.per as "trip" | "guest" }));
  } catch {
    return EXTRAS;
  }
}

export const usingDatabase = isSupabaseConfigured;
