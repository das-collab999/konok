import { Suspense } from "react";
import { notFound } from "next/navigation";
import { loadPlace, loadPlaces } from "@/lib/source";
import { Done } from "./Done";

export async function generateStaticParams() {
  const places = await loadPlaces();
  return places.map((p) => ({ slug: p.slug }));
}

export const metadata = { title: "Бронь отправлена — Конок" };

export default async function DonePage({ params }: { params: Promise<{ slug: string }> }) {
  const place = await loadPlace((await params).slug);
  if (!place) notFound();
  return (
    <Suspense>
      <Done place={place} />
    </Suspense>
  );
}
