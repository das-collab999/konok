"use client";

import Link from "next/link";
import { PHOTOS } from "@/data/photos";
import { useLang } from "@/lib/i18n";
import { Photo } from "@/components/Photo";
import { Motif, TermeBand } from "@/components/ethno";

export function PhotoCredits() {
  const { t } = useLang();
  const names = Object.keys(PHOTOS).sort();

  return (
    <>
      <section className="border-b border-rule">
        <div className="mx-auto max-w-[1280px] px-5 py-8 sm:py-12 sm:px-10">
          <span className="eyebrow flex items-center gap-2.5">
            <Motif name="gul" size={30} className="text-accent" />
            {t.common.photos}
          </span>
          <h1 className="display m-0 mt-4 max-w-[18ch] text-[clamp(27px,4.2vw,44px)]">{t.common.photosTitle}</h1>
          <p className="m-0 mt-5 max-w-[60ch] text-[16px] leading-relaxed text-fg-muted">{t.common.photosSub}</p>
        </div>
      </section>

      <TermeBand id="terme-photos" height={24} />

      <section className="mx-auto max-w-[1280px] px-5 py-8 sm:py-12 sm:px-10">
        {names.length === 0 ? (
          <p className="m-0 text-[15px] text-fg-muted">{t.common.mapNothing}</p>
        ) : (
          <ul className="m-0 grid list-none grid-cols-1 gap-x-8 gap-y-8 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {names.map((name) => {
              const p = PHOTOS[name];
              return (
                <li key={name} className="flex gap-4 border-t border-rule pt-4">
                  <Photo name={name} alt={name} sizes="96px" className="h-[64px] w-[96px] flex-none object-cover" />
                  <div className="min-w-0 text-[13px] leading-relaxed text-fg-muted">
                    <p className="m-0 text-fg">{p.author || "Wikimedia Commons"}</p>
                    <p className="m-0 mt-1">{p.license}</p>
                    <a href={p.page} target="_blank" rel="noreferrer noopener"
                      className="mt-1 inline-flex h-11 items-center text-accent no-underline hover:underline">
                      Wikimedia Commons →
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="pill pill-ghost">{t.nav.home}</Link>
          <Link href="/stays/" className="pill pill-ghost">{t.nav.stays}</Link>
        </div>
      </section>
    </>
  );
}
