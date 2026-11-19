import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PLACES, getPlace } from "@/data/places";
import { PayForm } from "./PayForm";

export function generateStaticParams() {
  return PLACES.map((p) => ({ slug: p.slug }));
}

export const metadata = { title: "Оплата брони — Конок" };

export default async function PayPage({ params }: { params: Promise<{ slug: string }> }) {
  const place = getPlace((await params).slug);
  if (!place) notFound();
  return (
    <Suspense>
      <PayForm place={place} />
    </Suspense>
  );
}
