"use client";

import { useEffect, useState } from "react";
import { CONDITIONS, EMERGENCY, ETIQUETTE, MEALS, PACKING, PHRASES, TRANSPORT, type MealKind } from "@/data/guide";
import { pick, useLang } from "@/lib/i18n";
import { Icon } from "@/components/ui";
import Link from "next/link";
import { Art } from "@/components/art";
import { storyForMeal } from "@/data/stories";
import { Medallion, Motif, OrnamentBand, Shyrdak, TermeBand, ZigzagBand } from "@/components/ethno";
import { DrawIn, RevealItem } from "@/components/motion";

const KINDS: MealKind[] = ["dinner", "breakfast", "snack", "drink"];
const IDS = ["food", "road", "conditions", "packing", "manners", "words", "help"] as const;
type Section = (typeof IDS)[number];

export function GuideClient() {
  const { lang, t } = useLang();
  const [tab, setTab] = useState<Section>("food");
  // Вкладки включаются только когда работает JavaScript: без него
  // страница остаётся одной длинной — весь текст всё равно доступен.
  const [tabs, setTabs] = useState(false);
  useEffect(() => setTabs(true), []);
  const show = (id: Section) => !tabs || tab === id;

  return (
    <>
      {/* ------------------------------------------------------- Шапка */}
      <section className="border-b border-rule">
        <div className="mx-auto flex max-w-[1280px] gap-10 px-5 py-8 sm:py-12 sm:px-10">
          <Shyrdak id="guide-shyrdak" rows={5} className="hidden w-[92px] flex-none lg:block" />
          <div className="min-w-0">
            <span className="eyebrow flex items-center gap-2.5">
              <DrawIn duration={1200}><Motif name="bugu" size={34} className="text-accent" /></DrawIn>
              {t.guide.eyebrow}
            </span>
            <h1 className="display m-0 mt-5 max-w-[16ch] text-[clamp(32px,6vw,72px)]">{t.guide.title}</h1>
            <p className="m-0 mt-6 max-w-[58ch] text-[17px] leading-relaxed text-fg-muted">{t.guide.sub}</p>

          </div>
        </div>
      </section>

      {/* вкладки путеводителя: липнут под шапкой, листаются пальцем */}
      <nav aria-label={t.guide.eyebrow} className="sticky top-16 z-40 border-b border-rule bg-cream/95 backdrop-blur sm:top-20">
        <ul className="m-0 flex list-none gap-2 overflow-x-auto px-5 py-3 [scrollbar-width:none] sm:mx-auto sm:max-w-[1280px] sm:px-10">
          {IDS.map((id) => (
            <li key={id} className="flex-none">
              <a
                href={`#${id}`}
                onClick={(e) => { if (tabs) { e.preventDefault(); setTab(id); window.scrollTo({ top: 0, behavior: "smooth" }); } }}
                aria-current={tabs && tab === id ? "page" : undefined}
                className={`inline-flex h-11 items-center whitespace-nowrap rounded-full border px-4 text-[13px] no-underline transition-colors ${
                  tabs && tab === id ? "border-ink bg-ink text-cream" : "border-rule-strong text-fg-muted hover:border-ink hover:text-fg"
                }`}
              >
                {t.guide.sections[id]}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="bg-accent">
        <ZigzagBand id="zig-guide-top" height={16} />
        <div className="overflow-hidden"><div className="band-drift"><OrnamentBand id="band-guide" height={40} color="#EDE2C8" /></div></div>
        <ZigzagBand id="zig-guide-bot" height={16} flip />
      </div>

      {/* -------------------------------------------------------- Кухня */}
      {show("food") && (
        <section id="food" className="mx-auto max-w-[1280px] scroll-mt-24 px-5 py-10 sm:py-16 sm:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-[30rem]">
              <span className="eyebrow">{t.guide.sections.food}</span>
              <h2 className="display m-0 mt-4 text-[clamp(28px,4.4vw,48px)]">{t.guide.foodTitle}</h2>
            </div>
            <p className="m-0 max-w-[44ch] text-[15px] leading-relaxed text-fg-muted">{t.guide.foodSub}</p>
          </div>

          {KINDS.map((kind) => {
            const items = MEALS.filter((m) => m.kind === kind);
            if (!items.length) return null;
            return (
              <div key={kind} className="mt-12">
                <h3 className="eyebrow">{t.guide.kinds[kind]}</h3>
                <ul className="m-0 mt-5 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((m) => (
                    <li key={m.title.ru} className="overflow-hidden border border-rule bg-paper">
                      <Art name={m.art} label={pick(m.title, lang)} width={600} className="block h-auto w-full" />
                      <div className="p-5">
                        <div className="flex flex-wrap items-baseline justify-between gap-3">
                          <h4 className="serif m-0 text-[22px]">{pick(m.title, lang)}</h4>
                          {m.vegetarian && (
                            <span className="rounded-full border border-moss px-2.5 py-0.5 text-[12px] text-moss">
                              {m.note ? pick(m.note, lang) : t.guide.noMeat}
                            </span>
                          )}
                        </div>
                        <p className="m-0 mt-2.5 text-[15px] leading-relaxed text-fg-muted">{pick(m.text, lang)}</p>
                        {storyForMeal(m.title.ru) && (
                          <Link
                            href={`/stories/${storyForMeal(m.title.ru)!.slug}/`}
                            className="mt-4 inline-flex h-11 items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-accent no-underline"
                          >
                            {t.common.readMore} →
                          </Link>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </section>
      )}

      {/* ------------------------------------------------------- Дорога */}
      {show("road") && (
        <section id="road" className="scroll-mt-24 bg-cream-2">
          <TermeBand id="terme-road" height={24} />
          <div className="mx-auto max-w-[1280px] px-5 py-10 sm:py-16 sm:px-10">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-[30rem]">
                <span className="eyebrow">{t.guide.sections.road}</span>
                <h2 className="display m-0 mt-4 text-[clamp(28px,4.4vw,48px)]">{t.guide.roadTitle}</h2>
              </div>
              <p className="m-0 max-w-[44ch] text-[15px] leading-relaxed text-fg-muted">{t.guide.roadSub}</p>
            </div>

            <ul className="m-0 mt-12 flex list-none flex-col p-0">
              {TRANSPORT.map((tr, i) => (
                <RevealItem key={tr.title.ru} delay={i * 70} className="grid grid-cols-1 gap-x-8 gap-y-3 border-t border-rule py-7 last:border-b sm:grid-cols-[168px_1fr_auto]">
                  <Art name={tr.art} label={pick(tr.title, lang)} width={168} className="h-auto w-[132px] flex-none sm:w-[168px]" />
                  <div>
                    <h3 className="serif m-0 text-[22px]">{pick(tr.title, lang)}</h3>
                    <p className="m-0 mt-2 max-w-[60ch] text-[15px] leading-relaxed text-fg-muted">{pick(tr.text, lang)}</p>
                    <p className="m-0 mt-2 text-[13px] text-fg-subtle">{t.guide.suits}: {pick(tr.best, lang)}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="serif text-[18px]">{pick(tr.price, lang)}</div>
                    <div className="mt-1 text-[13px] text-fg-subtle">{pick(tr.time, lang)}</div>
                  </div>
                </RevealItem>
              ))}
            </ul>
          </div>
          <TermeBand id="terme-road-b" height={24} />
        </section>
      )}

      {/* ----------------------------------------------------- Условия */}
      {show("conditions") && (
        <section id="conditions" className="mx-auto max-w-[1280px] scroll-mt-24 px-5 py-10 sm:py-16 sm:px-10">
          <div className="max-w-[32rem]">
            <span className="eyebrow">{t.guide.sections.conditions}</span>
            <h2 className="display m-0 mt-4 text-[clamp(28px,4.4vw,48px)]">{t.guide.conditionsTitle}</h2>
          </div>
          <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-x-10 gap-y-0 p-0 sm:grid-cols-2">
            {CONDITIONS.map((c) => (
              <li key={c.title.ru} className="flex flex-col gap-3 border-t border-rule py-6 min-[420px]:flex-row min-[420px]:gap-4">
                {c.art && <Art name={c.art} label={pick(c.title, lang)} width={160} className="h-auto w-[160px] max-w-full flex-none min-[420px]:w-[124px] sm:w-[160px]" />}
                <div className="min-w-0">
                  <h3 className="serif m-0 text-[20px]">{pick(c.title, lang)}</h3>
                  <p className="m-0 mt-2 max-w-[56ch] text-[15px] leading-relaxed text-fg-muted">{pick(c.text, lang)}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* --------------------------------------------------- Что взять */}
      {show("packing") && (
        <section id="packing" className="scroll-mt-24 border-y border-rule bg-paper">
          <div className="mx-auto flex max-w-[1280px] flex-wrap gap-12 px-5 py-10 sm:py-16 sm:px-10">
            <div className="flex-1 basis-[300px]">
              <span className="eyebrow">{t.guide.sections.packing}</span>
              <h2 className="display m-0 mt-4 max-w-[12ch] text-[clamp(26px,4vw,44px)]">{t.guide.packingTitle}</h2>
              <p className="m-0 mt-5 max-w-[42ch] text-[15px] leading-relaxed text-fg-muted">{t.guide.packingSub}</p>
            </div>
            <ul className="m-0 flex flex-1 basis-[380px] list-none flex-col p-0">
              {PACKING.map((item) => (
                <li key={item.ru} className="flex items-start gap-3 border-t border-rule py-3.5 text-[15px] last:border-b">
                  <Icon name="check" size={16} strokeWidth={2} className="mt-1 flex-none text-moss" />
                  {pick(item, lang)}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------ В гостях */}
      {show("manners") && (
        <section id="manners" className="mx-auto max-w-[1280px] scroll-mt-24 px-5 py-10 sm:py-16 sm:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-[30rem]">
              <span className="eyebrow">{t.guide.sections.manners}</span>
              <h2 className="display m-0 mt-4 text-[clamp(28px,4.4vw,48px)]">{t.guide.mannersTitle}</h2>
            </div>
            <p className="m-0 max-w-[42ch] text-[15px] leading-relaxed text-fg-muted">{t.guide.mannersSub}</p>
          </div>
          <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-x-10 gap-y-0 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {ETIQUETTE.map((e) => (
              <li key={e.title.ru} className="border-t border-rule py-6">
                <h3 className="serif m-0 text-[20px]">{pick(e.title, lang)}</h3>
                <p className="m-0 mt-2 text-[15px] leading-relaxed text-fg-muted">{pick(e.text, lang)}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* -------------------------------------------------------- Слова */}
      {show("words") && (
        <section id="words" className="scroll-mt-24 bg-cream-2">
          <div className="mx-auto max-w-[1280px] px-5 py-10 sm:py-16 sm:px-10">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-[30rem]">
                <span className="eyebrow">{t.guide.sections.words}</span>
                <h2 className="display m-0 mt-4 text-[clamp(28px,4.4vw,48px)]">{t.guide.wordsTitle}</h2>
              </div>
              <p className="m-0 max-w-[42ch] text-[15px] leading-relaxed text-fg-muted">{t.guide.wordsSub}</p>
            </div>
            <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-x-10 gap-y-0 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {PHRASES.map((p) => (
                <li key={p.ky} className="flex items-baseline justify-between gap-4 border-t border-rule py-4">
                  <span className="serif text-[20px]">{p.ky}</span>
                  <span className="text-right text-[14px] text-fg-muted">{pick(p.ru, lang)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------ Помощь */}
      {show("help") && (
        <section id="help" className="felt scroll-mt-24 bg-ink text-on-dark">
          <div className="overflow-hidden"><div className="band-drift"><OrnamentBand id="band-help" height={32} color="#6b5a3a" /></div></div>
          <div className="mx-auto flex max-w-[1280px] flex-wrap gap-14 px-5 py-10 sm:py-16 sm:px-10">
            <div className="flex-1 basis-[320px]">
              <span className="eyebrow text-gold">{t.guide.sections.help}</span>
              <h2 className="display m-0 mt-4 max-w-[14ch] text-[clamp(26px,4vw,44px)] text-cream">{t.guide.helpTitle}</h2>
              <p className="m-0 mt-6 max-w-[48ch] text-[15px] leading-relaxed text-on-dark-muted">{t.guide.helpText}</p>
              <p className="m-0 mt-5 max-w-[48ch] text-[15px] leading-relaxed text-on-dark-muted">{t.guide.helpText2}</p>
              <Link href="/bookings/" className="pill pill-light mt-8">{t.nav.bookings}</Link>
              <DrawIn duration={2000} className="mt-10 hidden sm:block">
                <Medallion id="help-med" size={180} color="#DDAE52" className="opacity-70" />
              </DrawIn>
            </div>

            <ul className="m-0 flex flex-1 basis-[380px] list-none flex-col p-0">
              {EMERGENCY.map((c, i) => (
                <RevealItem key={c.phone} delay={i * 80} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-rule-dark py-4 last:border-b">
                  <div className="min-w-0">
                    <div className="text-[15px] text-cream">{pick(c.title, lang)}</div>
                    {c.note && <div className="mt-1 text-[13px] text-on-dark-muted">{pick(c.note, lang)}</div>}
                  </div>
                  <a href={`tel:${c.phone}`} className="serif inline-flex h-11 items-center text-[26px] text-gold no-underline">{c.phone}</a>
                </RevealItem>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
