import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PLACES, getPlace } from "@/data/places";
import { Done } from "./Done";

export function generateStaticParams() {
  return PLACES.map((p) => ({ slug: p.slug }));
}

export const metadata = { title: "Бронь отправлена — Конок" };

export default async function DonePage({ params }: { params: Promise<{ slug: string }> }) {
  const place = getPlace((await params).slug);
  if (!place) notFound();
  return (
    <Suspense>
      <Done place={place} />
    </Suspense>
  );
}
