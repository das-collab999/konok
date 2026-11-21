import { loadPlaces } from "@/lib/source";
import { StaysClient } from "./StaysClient";

export const metadata = {
  title: "Где остановиться — Конок",
  description: "Юрты на жайлоо и гостевые дома Кыргызстана: фильтры по региону, печке, бане, связи и дороге.",
};

export default async function StaysPage() {
  const places = await loadPlaces();
  return <StaysClient places={places} />;
}
