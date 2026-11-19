"use client";

import { useState } from "react";
import { REGIONS } from "@/data/places";
import { Icon, Tunduk, type IconName } from "@/components/ui";

const input = "h-11 w-full rounded-lg border border-border bg-canvas px-3 text-[15px] outline-none focus:border-accent";

const STEPS: { title: string; text: string; icon: IconName }[] = [
  { title: "Заявка приходит в Telegram", text: "Бот пишет на кыргызском: кто едет, на сколько ночей, сколько человек и сколько получит семья.", icon: "chat" },
  { title: "Ответ одной кнопкой", text: "«Кабыл алам» или «Жок». Если не ответить за 2 часа, бронью займётся Конок.", icon: "check" },
  { title: "Деньги после заезда", text: "Выплата на Элсом, MBank или карту. Комиссия платформы — 12%.", icon: "coin" },
];

export default function HostsPage() {
  const [status, setStatus] = useState<"new" | "yes" | "no">("new");
  const [sent, setSent] = useState(false);

  return (
    <>
      {/* -------------------------------------------------------- Intro */}
      <section className="border-b border-border-muted bg-subtle">
        <div className="mx-auto grid max-w-[1120px] items-start gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_minmax(320px,390px)]">
          <div>
            <span className="eyebrow">Үй ээлерине — для хозяев</span>
            <h1 className="m-0 mt-3 max-w-[18ch] text-[clamp(26px,3.8vw,38px)] font-semibold leading-tight">
              Брони приходят прямо в Telegram
            </h1>
            <p className="m-0 mt-4 max-w-[54ch] text-[16px] leading-relaxed text-fg-muted">
              Не нужно учиться новой программе. Когда турист бронирует вашу юрту, бот пишет вам на кыргызском.
              Вы отвечаете одной кнопкой. Деньги приходят на Элсом, MBank или карту.
            </p>

            <ol className="m-0 mt-8 flex list-none flex-col gap-3 p-0">
              {STEPS.map((s, i) => (
                <li key={s.title} className="flex items-start gap-3.5 rounded-card border border-border-muted bg-canvas p-4">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-inset text-[14px] font-semibold text-fg-muted">{i + 1}</span>
                  <div>
                    <h2 className="m-0 flex items-center gap-2 text-[16px] font-semibold">
                      <Icon name={s.icon} size={17} className="text-accent" />
                      {s.title}
                    </h2>
                    <p className="m-0 mt-1.5 text-[14px] leading-relaxed text-fg-muted">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="m-0 mt-5 text-[14px] text-fg-subtle">
              Попробуйте справа: нажмите «Кабыл алам» в сообщении бота.
            </p>
          </div>

          {/* Bot preview (demo) */}
          <div className="mx-auto w-full max-w-[390px] overflow-hidden rounded-[22px] border border-border bg-canvas shadow-sm">
            <div className="flex items-center gap-3 border-b border-border-muted bg-subtle px-4 py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-white">
                <Tunduk size={19} strokeWidth={1.8} />
              </span>
              <div className="min-w-0">
                <p className="m-0 text-[15px] font-semibold">Конок бот</p>
                <p className="m-0 text-[12px] text-fg-subtle">Асеке-апанын юрталары · Соң-Көл</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 bg-subtle px-3 py-4">
              <span className="self-center rounded-full bg-inset px-2.5 py-0.5 text-[12px] text-fg-subtle">Бүгүн</span>

              <div className="max-w-[310px] self-start rounded-[4px_14px_14px_14px] border border-border-muted bg-canvas p-3.5">
                <p className="m-0 text-[14px] font-semibold text-accent">Жаңы брондоо</p>
                <dl className="m-0 mt-2 flex flex-col gap-1 text-[13px]">
                  {[["Конок", "Anna, Германия"], ["Күнү", "12–14-июль (2 түн)"], ["Адам саны", "2"], ["Кошумча", "ат сейили, трансфер"], ["Сизге түшөт", "8 900 сом"]].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-3">
                      <dt className="m-0 text-fg-subtle">{k}</dt>
                      <dd className="m-0 text-right font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="m-0 mt-2 text-[12px] leading-relaxed text-fg-subtle">
                  Конок картасы менен төлөдү. Акча келгенден кийин Элсомго түшөт.
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button" onClick={() => setStatus("yes")}
                    className={`h-10 flex-1 cursor-pointer rounded-lg text-[14px] font-medium text-white transition-colors ${status === "yes" ? "bg-success" : "bg-accent hover:bg-accent-hover"}`}
                  >
                    Кабыл алам
                  </button>
                  <button
                    type="button" onClick={() => setStatus("no")}
                    className="h-10 flex-1 cursor-pointer rounded-lg border border-border bg-canvas text-[14px] font-medium transition-colors hover:bg-subtle"
                  >
                    Жок
                  </button>
                </div>
              </div>

              {status === "yes" && (
                <>
                  <div className="max-w-[260px] self-end rounded-[14px_4px_14px_14px] bg-success px-3.5 py-2.5 text-[14px] text-white">Кабыл алдым</div>
                  <div className="max-w-[310px] self-start rounded-[4px_14px_14px_14px] border border-border-muted bg-canvas p-3.5 text-[13px] leading-relaxed">
                    <p className="m-0 font-semibold">Рахмат! Брондоо ырасталды.</p>
                    <p className="m-0 mt-1">Anna 12-июлда саат 15:00дө келет. Айдоочу Нурбек сиз менен байланышат.</p>
                    <p className="m-0 mt-1 text-fg-subtle">Англисче кеңеш: «Welcome! Dinner is at 7 pm.»</p>
                  </div>
                </>
              )}

              {status === "no" && (
                <div className="max-w-[310px] self-start rounded-[4px_14px_14px_14px] border border-border-muted bg-canvas p-3.5 text-[13px]">
                  Түшүнүктүү. Конокко башка юрта сунуштайбыз.
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 border-t border-border-muted px-3 py-3">
              {["Календарь", "Баалар", "Сүрөт кошуу", "Акчам"].map((b) => (
                <span key={b} className="rounded-full border border-border-muted px-3 py-1.5 text-[13px] text-fg-muted">{b}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- Join */}
      <section id="join" className="mx-auto max-w-[680px] scroll-mt-20 px-4 py-14 sm:px-6">
        <h2 className="m-0 text-[24px] font-semibold">Подключить свой лагерь или дом</h2>
        <p className="m-0 mt-2 text-[15px] leading-relaxed text-fg-muted">
          Оставьте номер — мы позвоним, приедем, бесплатно сделаем фотографии и поможем заполнить страницу.
        </p>

        {sent ? (
          <div role="status" className="mt-6 flex items-start gap-3 rounded-card border border-border-muted bg-success-soft p-4">
            <Icon name="check" size={20} strokeWidth={2.2} className="mt-0.5 flex-none text-success" />
            <p className="m-0 text-[15px] leading-relaxed">
              Рахмат! Мы позвоним вам в течение двух дней.
              <span className="block text-[13px] text-fg-muted">Демо: данные никуда не отправлены.</span>
            </p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mt-6 flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="h-name" className="text-[13px] font-medium text-fg-muted">Ваше имя</label>
                <input id="h-name" required className={input} autoComplete="name" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="h-phone" className="text-[13px] font-medium text-fg-muted">Телефон / WhatsApp</label>
                <input id="h-phone" type="tel" required className={input} placeholder="+996 …" autoComplete="tel" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="h-region" className="text-[13px] font-medium text-fg-muted">Регион</label>
                <select id="h-region" className={input}>
                  {REGIONS.filter((r) => r.key !== "all").map((r) => <option key={r.key}>{r.label}</option>)}
                  <option>Ош</option><option>Талас</option><option>Баткен</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="h-type" className="text-[13px] font-medium text-fg-muted">Что у вас</label>
                <select id="h-type" className={input}>
                  <option>Юрты на жайлоо</option>
                  <option>Гостевой дом</option>
                  <option>Мастер-класс / впечатление</option>
                </select>
              </div>
            </div>
            <button type="submit" className="flex h-12 cursor-pointer items-center justify-center rounded-lg bg-accent text-[16px] font-medium text-white transition-colors hover:bg-accent-hover sm:self-start sm:px-8">
              Отправить заявку
            </button>
          </form>
        )}
      </section>
    </>
  );
}
