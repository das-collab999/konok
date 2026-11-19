"use client";

import { useState } from "react";
import { REGIONS } from "@/data/places";
import { Icon, Tunduk, type IconName } from "@/components/ui";

const field = "h-12 w-full border-0 border-b border-rule-strong bg-transparent px-0 text-[16px] text-fg outline-none focus:border-ink";

const STEPS: { title: string; text: string; icon: IconName }[] = [
  { title: "Заявка приходит в Telegram", text: "Бот пишет на кыргызском: кто едет, на сколько ночей, сколько человек и сколько получит семья.", icon: "chat" },
  { title: "Ответ одной кнопкой", text: "«Кабыл алам» или «Жок». Если не ответить за два часа, бронью займётся Конок.", icon: "check" },
  { title: "Деньги после заезда", text: "Выплата на Элсом, MBank или карту. Комиссия платформы — 12%.", icon: "coin" },
];

export default function HostsPage() {
  const [status, setStatus] = useState<"new" | "yes" | "no">("new");
  const [sent, setSent] = useState(false);

  return (
    <>
      {/* -------------------------------------------------------- Intro */}
      <section className="border-b border-rule">
        <div className="mx-auto grid max-w-[1280px] items-start gap-14 px-5 py-14 sm:px-10 lg:grid-cols-[1fr_minmax(320px,400px)]">
          <div>
            <div className="flex items-center gap-3">
              <Tunduk size={24} strokeWidth={1.2} className="text-accent" />
              <span className="eyebrow">Үй ээлерине — для хозяев</span>
            </div>

            <h1 className="display m-0 mt-6 max-w-[14ch] text-[clamp(32px,5.6vw,64px)]">
              Брони приходят прямо в Telegram
            </h1>

            <p className="m-0 mt-6 max-w-[52ch] text-[17px] leading-relaxed text-fg-muted">
              Не нужно учиться новой программе. Когда турист бронирует вашу юрту, бот пишет вам на кыргызском.
              Вы отвечаете одной кнопкой. Деньги приходят на Элсом, MBank или карту.
            </p>

            <ol className="m-0 mt-12 flex list-none flex-col p-0">
              {STEPS.map((s, i) => (
                <li key={s.title} className="flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-rule py-6 last:border-b">
                  <span className="serif w-10 text-[15px] text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <div className="flex flex-1 basis-[240px] items-start gap-4">
                    <Icon name={s.icon} size={20} strokeWidth={1.3} className="mt-1 flex-none text-fg-subtle" />
                    <div>
                      <h2 className="serif m-0 text-[21px]">{s.title}</h2>
                      <p className="m-0 mt-2 max-w-[56ch] text-[15px] leading-relaxed text-fg-muted">{s.text}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            <p className="m-0 mt-6 text-[12px] uppercase tracking-[0.14em] text-fg-subtle">
              Попробуйте: нажмите «Кабыл алам» в сообщении бота
            </p>
          </div>

          {/* Bot preview (demo) */}
          <div className="mx-auto w-full max-w-[400px] overflow-hidden rounded-[26px] border border-rule-strong bg-paper">
            <div className="flex items-center gap-3 border-b border-rule px-5 py-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-cream">
                <Tunduk size={18} strokeWidth={1.4} />
              </span>
              <div className="min-w-0">
                <p className="m-0 text-[15px] font-medium">Конок бот</p>
                <p className="m-0 text-[11px] uppercase tracking-[0.12em] text-fg-subtle">Соң-Көл · Асеке-апа</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 bg-cream-2/60 px-4 py-5">
              <span className="eyebrow self-center">Бүгүн</span>

              <div className="max-w-[320px] self-start rounded-[4px_16px_16px_16px] bg-paper p-4">
                <p className="serif m-0 text-[17px]">Жаңы брондоо</p>
                <dl className="m-0 mt-3 flex flex-col">
                  {[["Конок", "Anna, Германия"], ["Күнү", "12–14-июль (2 түн)"], ["Адам саны", "2"], ["Кошумча", "ат сейили, трансфер"], ["Сизге түшөт", "8 900 сом"]].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-3 border-b border-rule py-1.5 last:border-b-0 text-[13px]">
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
                    className={`h-11 flex-1 cursor-pointer rounded-full text-[10px] font-semibold uppercase tracking-[0.14em] text-cream transition-colors ${status === "yes" ? "bg-success" : "bg-ink hover:bg-accent"}`}
                  >
                    Кабыл алам
                  </button>
                  <button
                    type="button" onClick={() => setStatus("no")}
                    className="h-11 flex-1 cursor-pointer rounded-full border border-rule-strong text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors hover:border-ink"
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
                    <p className="m-0 mt-1.5 text-fg-subtle">Англисче кеңеш: «Welcome! Dinner is at 7 pm.»</p>
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
                <span key={b} className="rounded-full border border-rule-strong px-3.5 py-1.5 text-[10px] uppercase tracking-[0.12em] text-fg-muted">{b}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- Join */}
      <section id="join" className="mx-auto max-w-[840px] scroll-mt-24 px-5 py-20 sm:px-10">
        <span className="eyebrow">Заявка</span>
        <h2 className="display m-0 mt-4 max-w-[16ch] text-[clamp(28px,4.6vw,48px)]">Подключить свой лагерь или дом</h2>
        <p className="m-0 mt-6 max-w-[54ch] text-[16px] leading-relaxed text-fg-muted">
          Оставьте номер — мы позвоним, приедем, бесплатно сделаем фотографии и поможем заполнить страницу.
        </p>

        {sent ? (
          <div role="status" className="mt-10 flex items-start gap-4 border-l-2 border-success bg-paper px-6 py-6">
            <Icon name="check" size={20} strokeWidth={2} className="mt-0.5 flex-none text-success" />
            <p className="m-0 text-[16px] leading-relaxed">
              Рахмат! Мы позвоним вам в течение двух дней.
              <span className="mt-1 block text-[12px] uppercase tracking-[0.12em] text-fg-subtle">Демо: данные никуда не отправлены</span>
            </p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mt-10 flex flex-col gap-10">
            <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="h-name" className="eyebrow">Ваше имя</label>
                <input id="h-name" required className={field} autoComplete="name" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="h-phone" className="eyebrow">Телефон / WhatsApp</label>
                <input id="h-phone" type="tel" required className={field} placeholder="+996 …" autoComplete="tel" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="h-region" className="eyebrow">Регион</label>
                <select id="h-region" className={field}>
                  {REGIONS.filter((r) => r.key !== "all").map((r) => <option key={r.key}>{r.label}</option>)}
                  <option>Ош</option><option>Талас</option><option>Баткен</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="h-type" className="eyebrow">Что у вас</label>
                <select id="h-type" className={field}>
                  <option>Юрты на жайлоо</option>
                  <option>Гостевой дом</option>
                  <option>Мастер-класс / впечатление</option>
                </select>
              </div>
            </div>
            <button type="submit" className="pill pill-solid w-full sm:w-auto sm:self-start">Отправить заявку</button>
          </form>
        )}
      </section>
    </>
  );
}
