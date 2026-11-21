"use client";

import Link from "next/link";
import { STORIES } from "@/data/stories";
import { pick, useLang } from "@/lib/i18n";
import { Art } from "@/components/art";
import { Motif, TermeBand } from "@/components/ethno";
import { DrawIn } from "@/components/motion";

export function StoriesIndex() {
  const { lang, t } = useLang();
  const dishes = STORIES.filter((s) => s.kind === "dish");
  const places = STORIES.filter((s) => s.kind === "place");

  const card = (slug: string, art: Parameters<typeof Art>[0]["name"], title: string, lead: string) => (
    <li key={slug} className="overflow-hidden border border-rule bg-paper">
      <Link href={`/stories/${slug}/`} className="block text-fg no-underline">
        <Art name={art} label={title} width={600} className="block h-auto w-full" />
        <div className="p-5">
          <h3 className="serif m-0 text-[22px]">{title}</h3>
          <p className="m-0 mt-2.5 text-[15px] leading-relaxed text-fg-muted">{lead}</p>
          <span className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-accent">
            {t.common.readMore} →
          </span>
        </div>
      </Link>
    </li>
  );

  return (
    <>
      <section className="border-b border-rule">
        <div className="mx-auto max-w-[1280px] px-5 py-12 sm:px-10">
          <span className="eyebrow flex items-center gap-2.5">
            <DrawIn duration={1200}><Motif name="kyial" size={34} className="text-accent" /></DrawIn>
            {t.common.stories}
          </span>
          <h1 className="display m-0 mt-5 max-w-[16ch] text-[clamp(32px,6vw,72px)]">{t.common.storiesTitle}</h1>
          <p className="m-0 mt-6 max-w-[58ch] text-[17px] leading-relaxed text-fg-muted">{t.common.storiesSub}</p>
        </div>
      </section>

      <TermeBand id="terme-stories" height={26} />

      <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-10">
        <span className="eyebrow">{t.guide.sections.food}</span>
        <h2 className="display m-0 mt-4 text-[clamp(26px,4vw,42px)]">{t.guide.foodTitle}</h2>
        <ul className="m-0 mt-8 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {dishes.map((s) => card(s.slug, s.art, pick(s.title, lang), pick(s.lead, lang)))}
        </ul>
      </section>

      <section className="border-t border-rule bg-cream-2">
        <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-10">
          <span className="eyebrow">{t.common.aboutPlace}</span>
          <h2 className="display m-0 mt-4 text-[clamp(26px,4vw,42px)]">{t.common.mapTitle}</h2>
          <ul className="m-0 mt-8 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {places.map((s) => card(s.slug, s.art, pick(s.title, lang), pick(s.lead, lang)))}
          </ul>
        </div>
      </section>
    </>
  );
}
