"use client";

import { useState } from "react";
import { REGIONS } from "@/data/places";
import { Icon, Ornament, Tunduk } from "@/components/ui";

const input = "h-12 w-full rounded-[10px] border border-line-strong bg-white px-3.5 text-base text-ink";

export default function HostsPage() {
  const [status, setStatus] = useState<"new" | "yes" | "no">("new");
  const [sent, setSent] = useState(false);

  return (
    <>
      <section className="bg-ink text-felt">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-10 px-6 py-12">
          <div className="flex flex-[1_1_360px] flex-col gap-4">
            <span className="font-serif text-lg italic text-gold">Үй ээлерине — для хозяев</span>
            <h1 className="m-0 font-serif text-[clamp(32px,4vw,44px)] leading-tight text-white">Брони приходят прямо в Telegram</h1>
            <p className="m-0 text-[17px] leading-relaxed text-line">
              Не нужно учиться новой программе. Когда турист бронирует вашу юрту, бот пишет вам на кыргызском. Вы отвечаете одной кнопкой. Деньги приходят на Элсом, MBank или карту.
            </p>
            <p className="m-0 text-sm text-gold">Попробуйте: нажмите кнопку «Кабыл алам» в сообщении бота.</p>
          </div>

          {/* Telegram-style bot preview (demo) */}
          <div className="flex min-h-[620px] w-full max-w-[390px] flex-col overflow-hidden rounded-[28px] border-4 border-night bg-[#E8DCC6] text-ink shadow-2xl">
            <div className="flex items-center gap-3 bg-ink px-4 py-3.5 text-felt">
              <Tunduk size={40} />
              <div className="flex flex-col">
                <strong className="text-[17px]">Конок бот</strong>
                <span className="text-[13px] text-[#CDBA9C]">Асеке-апанын юрталары · Соң-Көл</span>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-3 px-3.5 py-4">
              <span className="self-center rounded-full bg-ink/15 px-2.5 py-1 text-xs">Бүгүн</span>
              <div className="flex max-w-[300px] flex-col gap-2 self-start rounded-[4px_16px_16px_16px] bg-card p-3.5 shadow-sm">
                <strong className="text-base text-red">Жаңы брондоо!</strong>
                <div className="text-sm leading-relaxed">
                  <div><strong>Конок:</strong> Anna, Германия</div>
                  <div><strong>Күнү:</strong> 12–14-июль (2 түн)</div>
                  <div><strong>Адам саны:</strong> 2</div>
                  <div><strong>Кошумча:</strong> ат сейили, трансфер</div>
                  <div><strong>Сизге түшөт:</strong> 8 900 сом</div>
                </div>
                <span className="text-xs text-muted">Конок картасы менен төлөдү. Акча келгенден кийин Элсомго түшөт.</span>
                <div className="mt-1 flex gap-2">
                  <button type="button" onClick={() => setStatus("yes")} className={`h-11 flex-1 cursor-pointer rounded-[10px] text-[15px] font-bold text-white ${status === "yes" ? "bg-green" : "bg-red"}`}>Кабыл алам</button>
                  <button type="button" onClick={() => setStatus("no")} className="h-11 flex-1 cursor-pointer rounded-[10px] border border-line-strong bg-white text-[15px] font-semibold">Жок</button>
                </div>
              </div>
              {status === "yes" && (
                <>
                  <div className="max-w-[260px] self-end rounded-[16px_4px_16px_16px] bg-green px-3.5 py-3 text-sm text-white">Кабыл алдым</div>
                  <div className="flex max-w-[300px] flex-col gap-1.5 self-start rounded-[4px_16px_16px_16px] bg-card p-3.5 text-sm leading-relaxed">
                    <strong>Рахмат! Брондоо ырасталды.</strong>
                    <span>Anna 12-июлда саат 15:00дө келет. Айдоочу Нурбек сиз менен байланышат.</span>
                    <span className="text-muted">Англисче кеңеш: «Welcome! Dinner is at 7 pm.»</span>
                  </div>
                </>
              )}
              {status === "no" && (
                <div className="max-w-[300px] self-start rounded-[4px_16px_16px_16px] bg-card p-3.5 text-sm">Түшүнүктүү. Конокко башка юрта сунуштайбыз.</div>
              )}
            </div>
            <div className="flex flex-wrap gap-2 bg-card px-3.5 pb-4 pt-2.5">
              {["Календарь", "Баалар", "Сүрөт кошуу", "Акчам"].map((b) => (
                <span key={b} className="rounded-full bg-felt px-3 py-2 text-[13px]">{b}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Ornament id="orn-join" />

      <section id="join" className="mx-auto flex max-w-[760px] scroll-mt-4 flex-col gap-5 px-6 py-14">
        <h2 className="m-0 font-serif text-[34px]">Подключить свой лагерь или дом</h2>
        <p className="m-0 text-base leading-relaxed text-muted">Оставьте номер — мы позвоним, приедем, сделаем фото бесплатно и поможем заполнить страницу.</p>
        {sent ? (
          <div role="status" className="flex items-center gap-3 rounded-2xl border border-green bg-card p-5 text-[17px]">
            <Icon name="check" size={26} strokeWidth={2} className="text-green" />
            Рахмат! Мы позвоним вам в течение 2 дней. (Демо: данные никуда не отправлены.)
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="h-name" className="font-semibold">Ваше имя</label>
              <input id="h-name" required className={input} autoComplete="name" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="h-phone" className="font-semibold">Телефон / WhatsApp</label>
              <input id="h-phone" type="tel" required className={input} placeholder="+996 …" autoComplete="tel" />
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-[1_1_200px] flex-col gap-1.5">
                <label htmlFor="h-region" className="font-semibold">Регион</label>
                <select id="h-region" className={input}>
                  {REGIONS.filter((r) => r.key !== "all").map((r) => <option key={r.key}>{r.label}</option>)}
                  <option>Ош</option><option>Талас</option><option>Баткен</option>
                </select>
              </div>
              <div className="flex flex-[1_1_200px] flex-col gap-1.5">
                <label htmlFor="h-type" className="font-semibold">Что у вас</label>
                <select id="h-type" className={input}>
                  <option>Юрты на жайлоо</option>
                  <option>Гостевой дом</option>
                  <option>Мастер-класс / впечатление</option>
                </select>
              </div>
            </div>
            <button type="submit" className="h-14 cursor-pointer rounded-xl bg-red text-lg font-bold text-white hover:brightness-110">Отправить заявку</button>
          </form>
        )}
      </section>
    </>
  );
}
