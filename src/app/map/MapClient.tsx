"use client";

import Link from "next/link";
import type { Place } from "@/data/places";
import { useLang } from "@/lib/i18n";
import { KyrgyzMap } from "@/components/Map";
import { Motif, TermeBand } from "@/components/ethno";

export function MapClient({ places }: { places: Place[] }) {
  const { t } = useLang();
  return (
    <>
      <section className="border-b border-rule">
        <div className="mx-auto max-w-[1280px] px-5 py-10 sm:px-10">
          <span className="eyebrow flex items-center gap-2.5">
            <Motif name="bugu" size={30} className="text-accent" />
            {t.common.mapPage}
          </span>
          <h1 className="display m-0 mt-4 max-w-[16ch] text-[clamp(28px,4.4vw,46px)]">{t.common.mapTitle}</h1>
          <p className="m-0 mt-5 max-w-[58ch] text-[16px] leading-relaxed text-fg-muted">{t.common.mapSub}</p>
        </div>
      </section>

      <TermeBand id="terme-map" height={24} />

      <section className="mx-auto max-w-[1280px] px-5 py-10 sm:px-10">
        <div className="-mx-5 sm:mx-0"><KyrgyzMap places={places} /></div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/stays/" className="pill pill-solid">{t.common.allStays}</Link>
          <Link href="/stories/" className="pill pill-ghost">{t.common.allStories}</Link>
          <Link href="/guide/" className="pill pill-ghost">{t.nav.guide}</Link>
        </div>
      </section>
    </>
  );
}
