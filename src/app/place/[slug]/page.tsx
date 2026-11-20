import { notFound } from "next/navigation";
import { loadPlace, loadPlaces } from "@/lib/source";
import { PlaceView } from "./PlaceView";

export async function generateStaticParams() {
  const places = await loadPlaces();
  return places.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = await loadPlace((await params).slug);
  return p ? { title: `${p.title.ru} — Конок`, description: p.short.ru } : { title: "Конок" };
}

export default async function PlacePage({ params }: { params: Promise<{ slug: string }> }) {
  const place = await loadPlace((await params).slug);
  if (!place) notFound();
  return <PlaceView place={place} />;
}
