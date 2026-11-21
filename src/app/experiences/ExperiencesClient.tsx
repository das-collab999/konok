"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { PhotoSlot } from "@/components/PhotoSlot";
import { EXPERIENCE_PHOTO } from "@/data/photos";
import { Motif, TermeBand } from "@/components/ethno";
import { RevealItem } from "@/components/motion";

export function ExperiencesClient() {
  const { t } = useLang();

  return (
    <>
      <section className="border-b border-rule">
        <div className="mx-auto max-w-[1280px] px-5 py-10 sm:px-10">
          <span className="eyebrow flex items-center gap-2.5">
            <Motif name="gul" size={30} className="text-accent" />
            {t.nav.experiences}
          </span>
          <h1 className="display m-0 mt-4 max-w-[16ch] text-[clamp(28px,4.4vw,46px)]">{t.home.expTitle}</h1>
          <p className="m-0 mt-5 max-w-[56ch] text-[16px] leading-relaxed text-fg-muted">{t.home.expSub}</p>
        </div>
      </section>

      <TermeBand id="terme-exp" height={24} />

      <section className="mx-auto max-w-[1280px] px-5 py-8 sm:py-12 sm:px-10">
        <ul className="m-0 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2">
          {t.home.experiences.map((e, i) => (
            <RevealItem key={e.t} delay={i * 80} className="overflow-hidden border border-rule bg-paper">
              <PhotoSlot name={EXPERIENCE_PHOTO[i]} alt={e.t} sizes="(max-width: 640px) 92vw, 560px" className="aspect-[3/2]" />
              <div className="p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h2 className="serif m-0 text-[24px]">{e.t}</h2>
                  <span className="serif text-[19px]">{e.p}</span>
                </div>
                <p className="m-0 mt-3 text-[15px] leading-relaxed text-fg-muted">{e.d}</p>
              </div>
            </RevealItem>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/stays/" className="pill pill-solid">{t.common.allStays}</Link>
          <Link href="/history/" className="pill pill-ghost">{t.common.culture}</Link>
        </div>
      </section>
    </>
  );
}
