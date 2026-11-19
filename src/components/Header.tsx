"use client";

import Link from "next/link";
import { useLang, type Lang } from "@/lib/i18n";
import { Tunduk } from "./ui";

const LANGS: [Lang, string][] = [["ru", "RU"], ["en", "EN"], ["zh", "中文"]];

export function Header() {
  const { lang, setLang, t } = useLang();
  const nav = "text-[11px] font-medium uppercase tracking-[0.18em] text-fg-muted no-underline transition-colors hover:text-fg";

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-cream/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-6 px-5 sm:h-20 sm:px-10">
        <Link href="/" className="flex items-baseline gap-2 text-fg no-underline">
          <span className="display text-[22px] leading-none sm:text-[26px]">Конок</span>
          <span className="hidden text-[11px] uppercase tracking-[0.22em] text-fg-subtle sm:inline">/ Kyrgyzstan</span>
        </Link>

        <nav aria-label="Главное меню" className="hidden items-center gap-8 lg:flex">
          <Link href="/#stays" className={nav}>{t.nav1}</Link>
          <Link href="/#exp" className={nav}>{t.nav2}</Link>
          <Link href="/guide/" className={nav}>Путеводитель</Link>
          <Link href="/bookings/" className={nav}>Мои брони</Link>
          <Link href="/hosts/" className={nav}>{t.nav3}</Link>
        </nav>

        <div className="flex items-center gap-4">
          <div role="group" aria-label="Язык" className="flex items-center gap-1">
            {LANGS.map(([code, label]) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                className={`h-10 cursor-pointer px-1.5 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors ${
                  lang === code ? "text-fg underline decoration-accent decoration-1 underline-offset-[7px]" : "text-fg-subtle hover:text-fg"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <Link href="/#stays" className="pill pill-solid hidden h-11 px-6 sm:inline-flex">{t.find}</Link>
        </div>
      </div>

      <nav aria-label="Разделы" className="flex items-center gap-6 overflow-x-auto border-t border-rule px-5 py-2.5 lg:hidden">
        <Link href="/#stays" className={`${nav} whitespace-nowrap`}>{t.nav1}</Link>
        <Link href="/#exp" className={`${nav} whitespace-nowrap`}>{t.nav2}</Link>
        <Link href="/guide/" className={`${nav} whitespace-nowrap`}>Путеводитель</Link>
        <Link href="/bookings/" className={`${nav} whitespace-nowrap`}>Мои брони</Link>
        <Link href="/hosts/" className={`${nav} whitespace-nowrap`}>{t.nav3}</Link>
      </nav>
    </header>
  );
}

export function Footer() {
  const link = "text-[13px] text-on-dark-muted no-underline transition-colors hover:text-on-dark";

  return (
    <footer className="mt-28 bg-ink text-on-dark-muted">
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-10">
        <div className="flex flex-wrap items-start justify-between gap-12">
          <div className="max-w-[340px]">
            <div className="flex items-center gap-3 text-on-dark">
              <Tunduk size={26} strokeWidth={1.2} />
              <span className="display text-[24px] leading-none">Конок</span>
            </div>
            <p className="mt-4 text-[14px] leading-relaxed">
              Юрты на жайлоо и гостевые дома в сёлах Кыргызстана. Каждое место проверено лично.
            </p>
          </div>

          <div className="flex gap-14">
            <div className="flex flex-col gap-3">
              <span className="eyebrow text-on-dark-muted">Гостям</span>
              <Link href="/#stays" className={link}>Где остановиться</Link>
              <Link href="/#exp" className={link}>Впечатления</Link>
              <Link href="/guide/" className={link}>Путеводитель</Link>
              <Link href="/bookings/" className={link}>Мои брони</Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="eyebrow text-on-dark-muted">Хозяевам</span>
              <Link href="/hosts/" className={link}>Как это работает</Link>
              <Link href="/hosts/#join" className={link}>Подключить лагерь</Link>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap justify-between gap-3 border-t border-rule-dark pt-7 text-[12px] uppercase tracking-[0.14em] text-on-dark-muted">
          <span>© 2027 Конок · Бишкек</span>
          <span>Демо-версия · места и цены — примеры</span>
        </div>
      </div>
    </footer>
  );
}
