/**
 * Собирает контуры для карты из настоящих географических данных.
 *
 *   node scripts/build-map.mjs
 *
 * Источники (ставятся временно, в зависимости проекта не попадают):
 *   world-atlas            — границы стран, Natural Earth 1:50m
 *   @geo-maps/earth-lakes-10m — озёра
 *
 * На выходе — src/data/map-shapes.ts: пути в координатах картинки и
 * функция проекции, чтобы точки мест ложились на тот же холст.
 */
import fs from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const topojson = require("topojson-client");

const BOX = { w: 1000, pad: 14 };

const topo = JSON.parse(fs.readFileSync("node_modules/world-atlas/countries-50m.json", "utf8"));
const world = topojson.feature(topo, topo.objects.countries);
const kg = world.features.find((f) => /kyrgyz/i.test(f.properties.name));
if (!kg) throw new Error("Кыргызстан не найден в наборе границ");

const rings = kg.geometry.type === "Polygon" ? kg.geometry.coordinates : kg.geometry.coordinates.flat();

// рамка страны
let minLng = 180, maxLng = -180, minLat = 90, maxLat = -90;
for (const ring of rings) for (const [lng, lat] of ring) {
  if (lng < minLng) minLng = lng;
  if (lng > maxLng) maxLng = lng;
  if (lat < minLat) minLat = lat;
  if (lat > maxLat) maxLat = lat;
}

// равнопромежуточная проекция с поправкой на широту
const lat0 = (minLat + maxLat) / 2;
const kx = Math.cos((lat0 * Math.PI) / 180);
const spanX = (maxLng - minLng) * kx;
const spanY = maxLat - minLat;
const scale = (BOX.w - BOX.pad * 2) / spanX;
const H = Math.round(spanY * scale + BOX.pad * 2);

const px = (lng) => BOX.pad + (lng - minLng) * kx * scale;
const py = (lat) => BOX.pad + (maxLat - lat) * scale;

const ringToPath = (ring, step = 1) => {
  const pts = [];
  for (let i = 0; i < ring.length; i += step) {
    const [lng, lat] = ring[i];
    pts.push(`${px(lng).toFixed(1)},${py(lat).toFixed(1)}`);
  }
  return `M${pts.join(" L")} Z`;
};

const country = rings.map((r) => ringToPath(r)).join(" ");

// озёра внутри рамки страны
let lakes = [];
try {
  const raw = JSON.parse(fs.readFileSync("node_modules/@geo-maps/earth-lakes-10m/map.geo.json", "utf8"));
  const feats = raw.features ?? raw.geometries?.map((g) => ({ geometry: g })) ?? [raw];
  for (const f of feats) {
    const polys = f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates;
    for (const poly of polys) {
      const ring = poly[0];
      let inside = true;
      let area = 0;
      let lo = 180, hi = -180, lo2 = 90, hi2 = -90;
      for (const [lng, lat] of ring) {
        if (lng < minLng - 0.2 || lng > maxLng + 0.2 || lat < minLat - 0.2 || lat > maxLat + 0.2) { inside = false; break; }
        if (lng < lo) lo = lng; if (lng > hi) hi = lng;
        if (lat < lo2) lo2 = lat; if (lat > hi2) hi2 = lat;
      }
      if (!inside) continue;
      area = (hi - lo) * (hi2 - lo2);
      if (area < 0.004) continue; // совсем мелкие не рисуем
      lakes.push({ area, d: ringToPath(ring) });
    }
  }
} catch (e) {
  console.warn("Озёра пропущены:", e.message);
}
lakes.sort((a, b) => b.area - a.area);
lakes = lakes.slice(0, 12);

const out = `// Этот файл создан скриптом scripts/build-map.mjs — править руками не нужно.
// Контур страны: Natural Earth 1:50m. Озёра: Natural Earth 1:10m.

export const MAP_VIEW = { w: ${BOX.w}, h: ${H} };

/** Границы в градусах и параметры проекции. */
export const MAP_BOUNDS = {
  minLng: ${minLng.toFixed(4)}, maxLng: ${maxLng.toFixed(4)},
  minLat: ${minLat.toFixed(4)}, maxLat: ${maxLat.toFixed(4)},
  kx: ${kx.toFixed(6)}, scale: ${scale.toFixed(4)}, pad: ${BOX.pad},
};

/** Долгота и широта → координаты на картинке. */
export const mapX = (lng: number) => MAP_BOUNDS.pad + (lng - MAP_BOUNDS.minLng) * MAP_BOUNDS.kx * MAP_BOUNDS.scale;
export const mapY = (lat: number) => MAP_BOUNDS.pad + (MAP_BOUNDS.maxLat - lat) * MAP_BOUNDS.scale;

export const COUNTRY_PATH = ${JSON.stringify(country)};

export const LAKE_PATHS: string[] = ${JSON.stringify(lakes.map((l) => l.d), null, 0)};
`;

fs.mkdirSync("src/data", { recursive: true });
fs.writeFileSync("src/data/map-shapes.ts", out);

console.log("готово:", `${BOX.w}×${H}`, "| озёр:", lakes.length, "| размер файла:", (out.length / 1024).toFixed(0), "КБ");
