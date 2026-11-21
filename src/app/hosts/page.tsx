"use client";

import { useState } from "react";
import { REGIONS } from "@/data/places";
import { pick, useLang } from "@/lib/i18n";
import { Icon, Tunduk, type IconName } from "@/components/ui";
import { Motif, TermeBand } from "@/components/ethno";
import { RevealItem } from "@/components/motion";

const field = "h-12 w-full border-0 border-b border-rule-strong bg-transparent px-0 text-[16px] text-fg outline-none focus:border-ink";
const STEP_ICONS: IconName[] = ["chat", "check", "coin"];

export default function HostsPage() {
  const { lang, t } = useLang();
  const [status, setStatus] = useState<"new" | "yes" | "no">("new");
  const [sent, setSent] = useState(false);

  return (
    <>
      <section className="border-b border-rule">
        <div className="mx-auto grid max-w-[1280px] items-start gap-14 px-5 py-8 sm:py-12 sm:px-10 lg:grid-cols-[1fr_minmax(320px,400px)]">
          <div>
            <div className="flex items-center gap-3">
              <Motif name="kochkor" size={34} className="text-accent" />
              <span className="eyebrow">{t.hosts.eyebrow}</span>
            </div>

            <h1 className="display m-0 mt-6 max-w-[14ch] text-[clamp(30px,5.6vw,64px)]">{t.hosts.title}</h1>
            <p className="m-0 mt-6 max-w-[52ch] text-[17px] leading-relaxed text-fg-muted">{t.hosts.text}</p>

            <ol className="m-0 mt-12 flex list-none flex-col p-0">
              {t.hosts.steps.map((s, i) => (
                <RevealItem key={s.t} delay={i * 90} className="flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-rule py-6 last:border-b">
                  <span className="serif w-10 text-[15px] text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <div className="flex flex-1 basis-[240px] items-start gap-4">
                    <Icon name={STEP_ICONS[i]} size={20} strokeWidth={1.3} className="mt-1 flex-none text-fg-subtle" />
                    <div>
                      <h2 className="serif m-0 text-[21px]">{s.t}</h2>
                      <p className="m-0 mt-2 max-w-[56ch] text-[15px] leading-relaxed text-fg-muted">{s.d}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </ol>

            <p className="m-0 mt-6 text-[13px] text-fg-subtle">{t.hosts.try}</p>
          </div>

          {/* Как это выглядит у хозяина */}
          <div className="mx-auto w-full max-w-[400px] overflow-hidden rounded-[26px] border border-rule-strong bg-paper">
            <div className="flex items-center gap-3 border-b border-rule px-5 py-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-cream">
                <Tunduk size={18} strokeWidth={1.4} />
              </span>
              <div className="min-w-0">
                <p className="m-0 text-[15px] font-medium">Конок бот</p>
                <p className="m-0 text-[12px] text-fg-subtle">Соң-Көл · Асеке-апа</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 bg-cream-2/60 px-4 py-5">
              <span className="eyebrow self-center">Бүгүн</span>

              <div className="max-w-[320px] self-start rounded-[4px_16px_16px_16px] bg-paper p-4">
                <p className="serif m-0 text-[17px]">Жаңы брондоо</p>
                <dl className="m-0 mt-3 flex flex-col">
                  {[["Конок", "Anna, Германия"], ["Күнү", "12–14-июль (2 түн)"], ["Адам саны", "2"], ["Кошумча", "ат сейили, трансфер"], ["Сизге түшөт", "8 900 сом"]].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-3 border-b border-rule py-1.5 text-[13px] last:border-b-0">
                      <dt className="m-0 text-fg-subtle">{k}</dt>
                      <dd className="m-0 text-right">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="m-0 mt-3 text-[12px] leading-relaxed text-fg-subtle">
                  Конок картасы менен төлөдү. Акча келгенден кийин Элсомго түшөт.
                </p>
                <div className="mt-4 flex gap-2">
                  <button
                    type="button" onClick={() => setStatus("yes")}
                    className={`h-11 flex-1 cursor-pointer rounded-full text-[12px] font-semibold uppercase tracking-[0.12em] text-cream transition-colors ${status === "yes" ? "bg-success" : "bg-ink hover:bg-accent"}`}
                  >
                    Кабыл алам
                  </button>
                  <button
                    type="button" onClick={() => setStatus("no")}
                    className="h-11 flex-1 cursor-pointer rounded-full border border-rule-strong text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors hover:border-ink"
                  >
                    Жок
                  </button>
                </div>
              </div>

              {status === "yes" && (
                <>
                  <div className="max-w-[260px] self-end rounded-[16px_4px_16px_16px] bg-ink px-4 py-2.5 text-[14px] text-cream">Кабыл алдым</div>
                  <div className="max-w-[320px] self-start rounded-[4px_16px_16px_16px] bg-paper p-4 text-[13px] leading-relaxed">
                    <p className="m-0 font-medium">Рахмат! Брондоо ырасталды.</p>
                    <p className="m-0 mt-1.5">Anna 12-июлда саат 15:00дө келет. Айдоочу Нурбек сиз менен байланышат.</p>
                  </div>
                </>
              )}

              {status === "no" && (
                <div className="max-w-[320px] self-start rounded-[4px_16px_16px_16px] bg-paper p-4 text-[13px]">
                  Түшүнүктүү. Конокко башка юрта сунуштайбыз.
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 border-t border-rule px-4 py-4">
              {["Календарь", "Баалар", "Сүрөт кошуу", "Акчам"].map((b) => (
                <span key={b} className="rounded-full border border-rule-strong px-3.5 py-1.5 text-[12px] text-fg-muted">{b}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TermeBand id="terme-hosts" height={26} />

      <section id="join" className="mx-auto max-w-[840px] scroll-mt-24 px-5 py-10 sm:py-16 sm:px-10">
        <span className="eyebrow">{t.hosts.joinEyebrow}</span>
        <h2 className="display m-0 mt-4 max-w-[16ch] text-[clamp(26px,4.6vw,48px)]">{t.hosts.joinTitle}</h2>
        <p className="m-0 mt-6 max-w-[54ch] text-[16px] leading-relaxed text-fg-muted">{t.hosts.joinText}</p>

        {sent ? (
          <div role="status" className="mt-10 flex items-start gap-4 border-l-2 border-success bg-paper px-6 py-6">
            <Icon name="check" size={20} strokeWidth={2} className="mt-0.5 flex-none text-success" />
            <p className="m-0 text-[16px] leading-relaxed">
              {t.hosts.sent}
              <span className="mt-1 block text-[13px] text-fg-subtle">{t.hosts.sentNote}</span>
            </p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mt-10 flex flex-col gap-10">
            <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="h-name" className="eyebrow">{t.hosts.yourName}</label>
                <input id="h-name" required className={field} autoComplete="name" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="h-phone" className="eyebrow">{t.hosts.yourPhone}</label>
                <input id="h-phone" type="tel" required className={field} placeholder="+996 …" autoComplete="tel" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="h-region" className="eyebrow">{t.hosts.region}</label>
                <select id="h-region" className={field}>
                  {REGIONS.filter((r) => r.key !== "all").map((r) => <option key={r.key}>{pick(r.label, lang)}</option>)}
                  <option>Ош</option><option>Талас</option><option>Баткен</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="h-type" className="eyebrow">{t.hosts.whatYouHave}</label>
                <select id="h-type" className={field}>
                  {t.hosts.options.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
            <button type="submit" className="pill pill-solid w-full sm:w-auto sm:self-start">{t.hosts.send}</button>
          </form>
        )}
      </section>
    </>
  );
}
