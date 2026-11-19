import { Suspense } from "react";
import { notFound } from "next/navigation";
import { loadPlace, loadPlaces } from "@/lib/source";
import { PayForm } from "./PayForm";

export async function generateStaticParams() {
  const places = await loadPlaces();
  return places.map((p) => ({ slug: p.slug }));
}

export const metadata = { title: "Оформление брони — Конок" };

export default async function PayPage({ params }: { params: Promise<{ slug: string }> }) {
  const place = await loadPlace((await params).slug);
  if (!place) notFound();
  return (
    <Suspense>
      <PayForm place={place} />
    </Suspense>
  );
}
