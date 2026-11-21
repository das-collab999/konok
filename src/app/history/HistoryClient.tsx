"use client";

import Link from "next/link";
import { CUSTOMS, ERAS } from "@/data/history";
import { pick, useLang } from "@/lib/i18n";
import { Art } from "@/components/art";
import { Photo, hasPhoto } from "@/components/Photo";
import { CUSTOM_PHOTO, ERA_PHOTO } from "@/data/photos";
import { Medallion, Motif, OrnamentBand, TermeBand, ZigzagBand } from "@/components/ethno";
import { DrawIn, Reveal, RevealItem } from "@/components/motion";

export function HistoryClient() {
  const { lang, t } = useLang();

  return (
    <>
      {/* ───────────────────────────── шапка */}
      <section className="border-b border-rule">
        <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 py-8 sm:py-12 sm:px-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="eyebrow flex items-center gap-2.5">
              <DrawIn duration={1200}><Motif name="tumar" size={30} className="text-accent" /></DrawIn>
              {t.common.history}
            </span>
            <h1 className="display m-0 mt-5 max-w-[15ch] text-[clamp(32px,6vw,72px)]">{t.common.historyTitle}</h1>
            <p className="m-0 mt-6 max-w-[56ch] text-[17px] leading-relaxed text-fg-muted">{t.common.historySub}</p>
          </div>
          <DrawIn duration={2000} className="hidden justify-self-center lg:block">
            <Medallion id="history-med" size={300} color="#8E2420" className="opacity-80" />
          </DrawIn>
        </div>
      </section>

      <div className="bg-accent">
        <ZigzagBand id="zig-history" height={16} />
        <div className="overflow-hidden"><div className="band-drift"><OrnamentBand id="band-history" height={38} color="#EDE2C8" /></div></div>
        <ZigzagBand id="zig-history-b" height={16} flip />
      </div>

      {/* ───────────────────────────── лента времени */}
      <section className="mx-auto max-w-[1280px] px-5 py-9 sm:py-14 sm:px-10">
        <ol className="m-0 flex list-none flex-col p-0">
          {ERAS.map((e, i) => (
            <RevealItem key={e.id} delay={i * 60} className="grid grid-cols-1 gap-x-10 gap-y-3 border-t border-rule py-8 last:border-b sm:grid-cols-[180px_1fr]">
              <div>
                <span className="serif block text-[17px] text-accent">{pick(e.when, lang)}</span>
                <span className="mt-1 block text-[12px] uppercase tracking-[0.14em] text-fg-subtle">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="min-w-0">
                {hasPhoto(ERA_PHOTO[e.id]) && (
                  <Photo
                    name={ERA_PHOTO[e.id]} alt={pick(e.title, lang)}
                    sizes="(max-width: 640px) 90vw, 560px"
                    className="mb-5 block aspect-[3/2] w-full max-w-[560px] object-cover"
                  />
                )}
                <h2 className="serif m-0 text-[26px]">{pick(e.title, lang)}</h2>
                <p className="m-0 mt-3 max-w-[70ch] text-[16px] leading-relaxed text-fg-muted">{pick(e.text, lang)}</p>
                {e.see && (
                  <p className="m-0 mt-3 text-[14px] text-fg-subtle">
                    {t.common.whatToSee}: <span className="text-fg">{pick(e.see, lang)}</span>
                    {e.story && (
                      <>
                        {" · "}
                        <Link href={`/stories/${e.story}/`} className="inline-flex h-11 items-center text-accent no-underline hover:underline">{t.common.readMore} →</Link>
                      </>
                    )}
                  </p>
                )}
              </div>
            </RevealItem>
          ))}
        </ol>
      </section>

      {/* ───────────────────────────── живая культура */}
      <section id="culture" className="scroll-mt-24 border-y border-rule bg-cream-2">
        <TermeBand id="terme-culture" height={24} />
        <div className="mx-auto max-w-[1280px] px-5 py-9 sm:py-14 sm:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-[30rem]">
              <span className="eyebrow">{t.common.culture}</span>
              <h2 className="display m-0 mt-4 text-[clamp(26px,4vw,44px)]">{t.common.culture}</h2>
            </div>
            <p className="m-0 max-w-[42ch] text-[15px] leading-relaxed text-fg-muted">{t.common.cultureSub}</p>
          </div>

          <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {CUSTOMS.map((c, i) => (
              <RevealItem key={c.id} delay={i * 70} className="overflow-hidden border border-rule bg-paper">
                {hasPhoto(CUSTOM_PHOTO[c.id]) ? (
                  <Photo name={CUSTOM_PHOTO[c.id]} alt={pick(c.title, lang)} sizes="(max-width: 640px) 90vw, 380px" className="block aspect-[3/2] w-full object-cover" />
                ) : (
                  <Art name={c.art} label={pick(c.title, lang)} width={560} className="block h-auto w-full" />
                )}
                <div className="p-5">
                  <h3 className="serif m-0 text-[21px]">{pick(c.title, lang)}</h3>
                  <p className="m-0 mt-2.5 text-[15px] leading-relaxed text-fg-muted">{pick(c.text, lang)}</p>
                  {c.story && (
                    <Link href={`/stories/${c.story}/`} className="mt-4 inline-flex h-11 items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-accent no-underline">
                      {t.common.readMore} →
                    </Link>
                  )}
                </div>
              </RevealItem>
            ))}
          </ul>
        </div>
      </section>

      <Reveal>
        <section className="mx-auto max-w-[1280px] px-5 py-9 sm:py-14 sm:px-10">
          <div className="flex flex-wrap gap-3">
            <Link href="/stories/" className="pill pill-solid">{t.common.allStories}</Link>
            <Link href="/map/" className="pill pill-ghost">{t.common.mapPage}</Link>
            <Link href="/guide/" className="pill pill-ghost">{t.nav.guide}</Link>
          </div>
        </section>
      </Reveal>
    </>
  );
}
