import Link from "next/link";
import { CONDITIONS, EMERGENCY, ETIQUETTE, MEALS, MEAL_KINDS, PACKING, PHRASES, TRANSPORT } from "@/data/guide";
import { Icon } from "@/components/ui";
import { Medallion, Motif, OrnamentBand, Shyrdak, ZigzagBand } from "@/components/ethno";
import { DrawIn, RevealItem } from "@/components/motion";

export const metadata = {
  title: "Путеводитель по Кыргызстану — Конок",
  description: "Что едят, как доехать, какие условия в юртах, что взять с собой, как вести себя в гостях и куда звонить в беде.",
};

const SECTIONS = [
  { id: "food", label: "Кухня" },
  { id: "road", label: "Дорога" },
  { id: "conditions", label: "Условия" },
  { id: "packing", label: "Что взять" },
  { id: "manners", label: "В гостях" },
  { id: "words", label: "Слова" },
  { id: "help", label: "Помощь" },
];

export default function GuidePage() {
  return (
    <>
      {/* ------------------------------------------------------- Шапка */}
      <section className="border-b border-rule">
        <div className="mx-auto flex max-w-[1280px] gap-10 px-5 py-14 sm:px-10">
          <Shyrdak id="guide-shyrdak" rows={5} className="hidden w-[92px] flex-none lg:block" />
          <div className="min-w-0">
            <span className="eyebrow flex items-center gap-2.5">
              <DrawIn duration={1200}><Motif name="bugu" size={34} className="text-accent" /></DrawIn>
              Путеводитель
            </span>
            <h1 className="display m-0 mt-5 max-w-[16ch] text-[clamp(34px,6vw,72px)]">Всё, что нужно знать до поездки</h1>
            <p className="m-0 mt-6 max-w-[58ch] text-[17px] leading-relaxed text-fg-muted">
              Мы собрали здесь то, что обычно ищут по десяти сайтам и форумам: что будет на столе, на чём доехать,
              как спят и моются в юрте, что положить в рюкзак, как вести себя в гостях и куда звонить, если что-то пошло не так.
            </p>

            <nav aria-label="Разделы путеводителя" className="mt-8 flex flex-wrap gap-2">
              {SECTIONS.map((s) => (
                <a key={s.id} href={`#${s.id}`} className="inline-flex h-11 items-center rounded-full border border-rule-strong px-4 text-[12px] font-medium uppercase tracking-[0.14em] text-fg-muted no-underline transition-colors hover:border-ink hover:text-fg">
                  {s.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      <div className="bg-accent">
        <ZigzagBand id="zig-guide-top" height={16} />
        <div className="overflow-hidden">
          <div className="band-drift">
            <OrnamentBand id="band-guide" height={40} color="#EDE2C8" opacity={0.95} />
          </div>
        </div>
        <ZigzagBand id="zig-guide-bot" height={16} flip />
      </div>

      {/* -------------------------------------------------------- Кухня */}
      <section id="food" className="mx-auto max-w-[1280px] scroll-mt-24 px-5 py-16 sm:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[30rem]">
            <span className="eyebrow">Кухня</span>
            <h2 className="display m-0 mt-4 text-[clamp(28px,4.4vw,48px)]">Что будет на столе</h2>
          </div>
          <p className="m-0 max-w-[44ch] text-[15px] leading-relaxed text-fg-muted">
            Ужин и завтрак уже входят в цену — отдельно платить не нужно. Если вы не едите мясо, скажите хозяйке
            при брони: лагман, манты с тыквой и молочный стол сделают без него.
          </p>
        </div>

        {MEAL_KINDS.map((kind) => {
          const items = MEALS.filter((m) => m.kind === kind.key);
          if (!items.length) return null;
          return (
            <div key={kind.key} className="mt-12">
              <h3 className="eyebrow">{kind.label}</h3>
              <ul className="m-0 mt-5 grid list-none grid-cols-1 gap-x-10 gap-y-0 p-0 sm:grid-cols-2">
                {items.map((m) => (
                  <li key={m.title} className="border-t border-rule py-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <h4 className="serif m-0 text-[21px]">{m.title}</h4>
                      {m.vegetarian && (
                        <span className="rounded-full border border-moss px-2.5 py-0.5 text-[12px] uppercase tracking-[0.12em] text-moss">
                          {m.note ?? "Без мяса"}
                        </span>
                      )}
                    </div>
                    <p className="m-0 mt-2 max-w-[56ch] text-[15px] leading-relaxed text-fg-muted">{m.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </section>

      {/* ------------------------------------------------------- Дорога */}
      <section id="road" className="scroll-mt-24 bg-cream-2">
        <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-[30rem]">
              <span className="eyebrow">Дорога</span>
              <h2 className="display m-0 mt-4 text-[clamp(28px,4.4vw,48px)]">На чём доехать</h2>
            </div>
            <p className="m-0 max-w-[44ch] text-[15px] leading-relaxed text-fg-muted">
              Цены ориентировочные, на лето 2027 года. Трансфер можно добавить прямо к брони — тогда
              встречать будет водитель, которого знает хозяин.
            </p>
          </div>

          <ul className="m-0 mt-12 flex list-none flex-col p-0">
            {TRANSPORT.map((tr, i) => (
              <li key={tr.title} className="grid grid-cols-1 gap-x-8 gap-y-3 border-t border-rule py-7 last:border-b sm:grid-cols-[3rem_1fr_auto]">
                <span className="serif text-[15px] text-accent">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="serif m-0 text-[22px]">{tr.title}</h3>
                  <p className="m-0 mt-2 max-w-[60ch] text-[15px] leading-relaxed text-fg-muted">{tr.text}</p>
                  <p className="m-0 mt-2 text-[12px] uppercase tracking-[0.12em] text-fg-subtle">Подходит: {tr.best}</p>
                </div>
                <div className="text-left sm:text-right">
                  <div className="serif text-[18px]">{tr.price}</div>
                  <div className="mt-1 text-[12px] uppercase tracking-[0.12em] text-fg-subtle">{tr.time}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ----------------------------------------------------- Условия */}
      <section id="conditions" className="mx-auto max-w-[1280px] scroll-mt-24 px-5 py-16 sm:px-10">
        <div className="max-w-[32rem]">
          <span className="eyebrow">Условия</span>
          <h2 className="display m-0 mt-4 text-[clamp(28px,4.4vw,48px)]">Как всё устроено в горах</h2>
        </div>

        <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-x-10 gap-y-0 p-0 sm:grid-cols-2">
          {CONDITIONS.map((c) => (
            <li key={c.title} className="border-t border-rule py-6">
              <h3 className="serif m-0 text-[20px]">{c.title}</h3>
              <p className="m-0 mt-2 max-w-[56ch] text-[15px] leading-relaxed text-fg-muted">{c.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* --------------------------------------------------- Что взять */}
      <section id="packing" className="scroll-mt-24 border-y border-rule bg-paper">
        <div className="mx-auto flex max-w-[1280px] flex-wrap gap-12 px-5 py-16 sm:px-10">
          <div className="flex-1 basis-[300px]">
            <span className="eyebrow">Рюкзак</span>
            <h2 className="display m-0 mt-4 max-w-[12ch] text-[clamp(26px,4vw,44px)]">Что взять с собой</h2>
            <p className="m-0 mt-5 max-w-[42ch] text-[15px] leading-relaxed text-fg-muted">
              Постель, одеяла и полотенца дают хозяева. Остальное лучше привезти — в горах магазинов нет.
            </p>
          </div>
          <ul className="m-0 flex flex-1 basis-[380px] list-none flex-col p-0">
            {PACKING.map((item) => (
              <li key={item} className="flex items-start gap-3 border-t border-rule py-3.5 text-[15px] last:border-b">
                <Icon name="check" size={16} strokeWidth={2} className="mt-1 flex-none text-moss" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------ В гостях */}
      <section id="manners" className="mx-auto max-w-[1280px] scroll-mt-24 px-5 py-16 sm:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[30rem]">
            <span className="eyebrow">В гостях</span>
            <h2 className="display m-0 mt-4 text-[clamp(28px,4.4vw,48px)]">Простые правила юрты</h2>
          </div>
          <p className="m-0 max-w-[42ch] text-[15px] leading-relaxed text-fg-muted">
            Никто не обидится на ошибку — вы гость. Но если сделать по-здешнему, хозяева это заметят и оценят.
          </p>
        </div>

        <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-x-10 gap-y-0 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {ETIQUETTE.map((e) => (
            <li key={e.title} className="border-t border-rule py-6">
              <h3 className="serif m-0 text-[20px]">{e.title}</h3>
              <p className="m-0 mt-2 text-[15px] leading-relaxed text-fg-muted">{e.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* -------------------------------------------------------- Слова */}
      <section id="words" className="scroll-mt-24 bg-cream-2">
        <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-[30rem]">
              <span className="eyebrow">Слова</span>
              <h2 className="display m-0 mt-4 text-[clamp(28px,4.4vw,48px)]">Девять слов по-кыргызски</h2>
            </div>
            <p className="m-0 max-w-[42ch] text-[15px] leading-relaxed text-fg-muted">
              Этого хватит, чтобы вас встретили как своего. «Рахмат» выручает в любой ситуации.
            </p>
          </div>

          <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-x-10 gap-y-0 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {PHRASES.map((p) => (
              <li key={p.ky} className="flex items-baseline justify-between gap-4 border-t border-rule py-4">
                <span className="serif text-[20px]">{p.ky}</span>
                <span className="text-right text-[14px] text-fg-muted">{p.ru}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------ Помощь */}
      <section id="help" className="felt scroll-mt-24 bg-ink text-on-dark">
        <OrnamentBand id="band-help" height={26} color="#6b5a3a" />
        <div className="mx-auto flex max-w-[1280px] flex-wrap gap-14 px-5 py-16 sm:px-10">
          <div className="flex-1 basis-[320px]">
            <span className="eyebrow text-gold">Помощь</span>
            <h2 className="display m-0 mt-4 max-w-[14ch] text-[clamp(26px,4vw,44px)] text-cream">Если что-то пошло не так</h2>
            <p className="m-0 mt-6 max-w-[48ch] text-[15px] leading-relaxed text-on-dark-muted">
              Единый номер 112 работает по всей стране с любого мобильного — даже без денег на счету и без SIM-карты.
              В горах связь бывает не везде: уточните у хозяина, где ближайшая точка, откуда ловит сеть.
            </p>
            <p className="m-0 mt-5 max-w-[48ch] text-[15px] leading-relaxed text-on-dark-muted">
              Телефон хозяина приходит вместе с подтверждением брони и сохраняется в разделе «Мои брони» —
              он открывается без интернета.
            </p>
            <Link href="/bookings/" className="pill pill-light mt-8">Мои брони</Link>
            <DrawIn duration={2000} className="mt-10 hidden sm:block">
              <Medallion id="help-med" size={180} color="#DDAE52" className="opacity-70" />
            </DrawIn>
          </div>

          <ul className="m-0 flex flex-1 basis-[380px] list-none flex-col p-0">
            {EMERGENCY.map((c, i) => (
              <RevealItem key={c.phone} delay={i * 90} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-rule-dark py-4 last:border-b">
                <div className="min-w-0">
                  <div className="text-[15px] text-cream">{c.title}</div>
                  {c.note && <div className="mt-1 text-[13px] text-on-dark-muted">{c.note}</div>}
                </div>
                <a href={`tel:${c.phone}`} className="serif text-[26px] text-gold no-underline">{c.phone}</a>
              </RevealItem>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
