import Link from "next/link";
import { notFound } from "next/navigation";
import { PLACES, getPlace } from "@/data/places";
import { Icon, PlaceArt, type IconName } from "@/components/ui";
import { BookingCard } from "./BookingCard";

export function generateStaticParams() {
  return PLACES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPlace((await params).slug);
  return { title: p ? `${p.title} — Конок` : "Конок" };
}

export default async function PlacePage({ params }: { params: Promise<{ slug: string }> }) {
  const place = getPlace((await params).slug);
  if (!place) notFound();

  const facts: { k: string; v: string; icon: IconName }[] = [
    { k: "Высота", v: `${place.altitudeM} м`, icon: "mount" },
    { k: "Туалет", v: place.toilet, icon: "toilet" },
    { k: "Помыться", v: place.wash, icon: "shower" },
    { k: "Связь", v: place.net, icon: place.hasSignal ? "signal" : "nosignal" },
    { k: "Дорога", v: place.roadType, icon: place.carAccess === "car" ? "car" : "jeep" },
    { k: "Отопление", v: place.hasStove ? "Печка-буржуйка" : "Не нужно летом", icon: "fire" },
    { k: "Питание", v: "Ужин и завтрак", icon: "food" },
    { k: "Спальные места", v: place.type === "yurt" ? "Кошмы и тёплые одеяла" : "Кровати", icon: "bed" },
  ];

  return (
    <div className="mx-auto flex max-w-[1240px] flex-col gap-5 px-6 pb-16 pt-6">
      <Link href="/#stays" className="inline-flex h-11 items-center gap-1 self-start rounded-[10px] border border-line-strong bg-card px-4 font-semibold">
        <Icon name="back" size={18} /> Все места
      </Link>

      <div className="relative h-[240px] overflow-hidden rounded-[22px] sm:h-[340px]">
        <PlaceArt place={place} wide className="block h-full w-full" />
        <span className="absolute left-3 top-3 right-3 w-fit rounded-[10px] bg-ink/85 px-3 py-2 text-[13px] text-felt">
          В реальном сайте здесь будут 10–15 честных фото и видео
        </span>
      </div>

      <div className="flex flex-wrap items-start gap-8">
        <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="text-sm font-bold uppercase tracking-wide text-red">{place.place} · {place.altitudeM} м</div>
            <h1 className="m-0 font-serif text-[clamp(30px,4vw,40px)] leading-tight">{place.title}</h1>
          </div>

          <div className="flex items-start gap-4 rounded-[18px] border border-line bg-card p-5">
            <div className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-red font-serif text-[26px] font-bold text-gold">
              {place.host.replace("Семья ", "").charAt(0)}
            </div>
            <div className="flex min-w-0 flex-col gap-1.5">
              <span className="text-[13px] font-bold uppercase tracking-wide text-green">История семьи</span>
              <h2 className="m-0 text-xl">{place.host}</h2>
              <p className="m-0 text-base leading-relaxed text-ink-soft">{place.story}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="m-0 font-serif text-[26px]">Честно о быте</h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3">
              {facts.map((f) => (
                <div key={f.k} className="flex items-center gap-3 rounded-xl border border-line bg-card p-3.5">
                  <Icon name={f.icon} size={24} className="flex-none text-red" />
                  <div className="flex flex-col">
                    <span className="text-xs text-muted">{f.k}</span>
                    <span className="text-[15px] font-bold">{f.v}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <h2 className="m-0 font-serif text-[26px]">Как добраться</h2>
            <p className="m-0 text-base leading-relaxed text-ink-soft">{place.road}</p>
          </div>
        </div>

        <BookingCard place={place} />
      </div>
    </div>
  );
}
