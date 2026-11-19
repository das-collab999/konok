import { loadPlaces } from "@/lib/source";
import { HomeClient } from "./HomeClient";

// Данные читаются один раз при сборке: из базы, если она подключена,
// иначе из тестового файла src/data/places.ts.
export default async function Home() {
  const places = await loadPlaces();
  return <HomeClient places={places} />;
}
