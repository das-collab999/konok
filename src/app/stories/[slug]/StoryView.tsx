"use client";

import Link from "next/link";
import { STORIES, type Story } from "@/data/stories";
import { pick, useLang } from "@/lib/i18n";
import { Art } from "@/components/art";
import { Icon } from "@/components/ui";
import { Motif, OrnamentBand, ZigzagBand } from "@/components/ethno";
import { Reveal } from "@/components/motion";

export function StoryView({ story }: { story: Story }) {
  const { lang, t } = useLang();
  const others = STORIES.filter((s) => s.slug !== story.slug && s.kind === story.kind).slice(0, 3);

  return (
    <article className="mx-auto max-w-[1280px] px-5 pb-10 pt-6 sm:px-10">
      <nav aria-label="breadcrumbs" className="flex items-center gap-2 text-[13px] text-fg-subtle">
        <Link href="/" className="inline-flex h-11 items-center text-fg-muted no-underline hover:text-fg">{t.nav.home}</Link>
        <span>·</span>
        <Link href="/stories/" className="inline-flex h-11 items-center text-fg-muted no-underline hover:text-fg">{t.common.stories}</Link>
        <span>·</span>
        <span className="truncate">{pick(story.title, lang)}</span>
      </nav>

      <header className="mt-6 grid items-center gap-10 border-b border-rule pb-10 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <span className="eyebrow">{story.kind === "dish" ? t.common.aboutDish : t.common.aboutPlace}</span>
          <h1 className="display m-0 mt-4 max-w-[16ch] text-[clamp(32px,6vw,72px)]">{pick(story.title, lang)}</h1>
          <p className="m-0 mt-6 max-w-[54ch] text-[17px] leading-relaxed text-fg-muted">{pick(story.lead, lang)}</p>

          <ul className="m-0 mt-8 flex list-none flex-wrap gap-x-10 gap-y-4 p-0">
            {story.facts.map((f) => (
              <li key={f.k.ru}>
                <span className="block text-[12px] uppercase tracking-[0.14em] text-fg-subtle">{pick(f.k, lang)}</span>
                <span className="serif mt-1 block text-[20px]">{pick(f.v, lang)}</span>
              </li>
            ))}
          </ul>
        </div>

        <Art name={story.art} label={pick(story.title, lang)} width={760} className="block h-auto w-full border border-rule" />
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_300px]">
        <div className="max-w-[70ch]">
          {story.blocks.map((b, i) => (
            <Reveal key={b.h.ru} delay={i * 60}>
              <section className="border-t border-rule py-8 first:border-t-0 first:pt-0">
                <span className="eyebrow flex items-center gap-2.5">
                  <Motif name={i % 2 ? "bugu" : "kochkor"} size={26} className="text-ochre" />
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="serif m-0 mt-3 text-[26px]">{pick(b.h, lang)}</h2>
                <p className="m-0 mt-4 text-[17px] leading-relaxed text-fg-muted">{pick(b.p, lang)}</p>
              </section>
            </Reveal>
          ))}

          <div className="mt-6 flex flex-wrap gap-3 border-t border-rule pt-8">
            {story.kind === "dish" ? (
              <Link href="/guide/#food" className="pill pill-ghost">{t.guide.sections.food}</Link>
            ) : (
              <Link href="/stays/" className="pill pill-ghost">{t.nav.stays}</Link>
            )}
            <Link href="/stories/" className="pill pill-ghost">{t.common.allStories}</Link>
          </div>
        </div>

        {/* другие рассказы */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <span className="eyebrow">{t.common.stories}</span>
          <ul className="m-0 mt-4 flex list-none flex-col p-0">
            {others.map((s) => (
              <li key={s.slug} className="border-t border-rule last:border-b">
                <Link href={`/stories/${s.slug}/`} className="flex items-center gap-4 py-4 text-fg no-underline">
                  <Art name={s.art} label={pick(s.title, lang)} width={96} className="h-auto w-[84px] flex-none" />
                  <span className="min-w-0">
                    <span className="serif block text-[18px]">{pick(s.title, lang)}</span>
                    <span className="mt-1 flex items-center gap-1.5 text-[12px] uppercase tracking-[0.12em] text-accent">
                      {t.common.readMore} <Icon name="arrow" size={13} strokeWidth={1.8} />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <div className="mt-16 bg-accent">
        <ZigzagBand id={`zig-story-${story.slug}`} height={14} />
        <div className="overflow-hidden"><div className="band-drift"><OrnamentBand id={`band-story-${story.slug}`} height={36} color="#EDE2C8" /></div></div>
        <ZigzagBand id={`zig-story-b-${story.slug}`} height={14} flip />
      </div>
    </article>
  );
}
