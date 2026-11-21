import { loadPlaces } from "@/lib/source";
import { MapClient } from "./MapClient";

export const metadata = {
  title: "Карта Кыргызстана — Конок",
  description: "Города, достопримечательности, музеи, природа и места для ночёвки на одной карте.",
};

export default async function MapPage() {
  const places = await loadPlaces();
  return <MapClient places={places} />;
}
