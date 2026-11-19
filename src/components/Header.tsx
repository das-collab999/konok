"use client";

import Link from "next/link";
import { useLang, type Lang } from "@/lib/i18n";
import { Tunduk } from "./ui";

const LANGS: [Lang, string][] = [["ru", "RU"], ["en", "EN"], ["zh", "中文"]];

export function Header() {
  const { lang, setLang, t } = useLang();

  const link = "text-[15px] text-fg-muted no-underline transition-colors hover:text-fg";

  return (
    <header className="sticky top-0 z-50 border-b border-border-muted bg-canvas/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1120px] items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-fg no-underline">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white">
            <Tunduk size={18} strokeWidth={1.8} />
          </span>
          <span className="text-[17px] font-semibold tracking-tight">Конок</span>
        </Link>

        <nav aria-label="Главное меню" className="hidden items-center gap-6 md:flex">
          <Link href="/#stays" className={link}>{t.nav1}</Link>
          <Link href="/#exp" className={link}>{t.nav2}</Link>
          <Link href="/bookings/" className={link}>Мои брони</Link>
          <Link href="/hosts/" className={link}>{t.nav3}</Link>
        </nav>

        <div role="group" aria-label="Язык" className="flex items-center gap-0.5 rounded-full border border-border-muted bg-subtle p-0.5">
          {LANGS.map(([code, label]) => (
            <button
              key={code}
              type="button"
              onClick={() => setLang(code)}
              aria-pressed={lang === code}
              className={`h-8 cursor-pointer rounded-full px-3 text-[13px] font-medium transition-colors ${
                lang === code ? "bg-canvas text-fg shadow-sm" : "text-fg-subtle hover:text-fg"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <nav aria-label="Разделы" className="flex items-center gap-5 overflow-x-auto border-t border-border-muted px-4 py-2 text-[14px] md:hidden">
        <Link href="/#stays" className="whitespace-nowrap text-fg-muted no-underline">{t.nav1}</Link>
        <Link href="/#exp" className="whitespace-nowrap text-fg-muted no-underline">{t.nav2}</Link>
        <Link href="/bookings/" className="whitespace-nowrap text-fg-muted no-underline">Мои брони</Link>
        <Link href="/hosts/" className="whitespace-nowrap text-fg-muted no-underline">{t.nav3}</Link>
      </nav>
    </header>
  );
}

export function Footer() {
  const col = "flex flex-col gap-2 text-[14px]";
  const link = "text-on-dark-muted no-underline hover:text-white";

  return (
    <footer className="mt-24 bg-dark text-on-dark-muted">
      <div className="mx-auto max-w-[1120px] px-4 py-12 sm:px-6">
        <div className="flex flex-wrap justify-between gap-10">
          <div className="max-w-[300px]">
            <div className="flex items-center gap-2 text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white">
                <Tunduk size={18} strokeWidth={1.8} />
              </span>
              <span className="text-[17px] font-semibold tracking-tight">Конок</span>
            </div>
            <p className="mt-3 text-[14px] leading-relaxed">
              Юрты на жайлоо и гостевые дома в сёлах Кыргызстана. Каждое место проверено лично.
            </p>
          </div>

          <div className="flex gap-12">
            <div className={col}>
              <span className="mb-1 text-[13px] font-semibold text-white">Гостям</span>
              <Link href="/#stays" className={link}>Где остановиться</Link>
              <Link href="/#exp" className={link}>Впечатления</Link>
              <Link href="/bookings/" className={link}>Мои брони</Link>
            </div>
            <div className={col}>
              <span className="mb-1 text-[13px] font-semibold text-white">Хозяевам</span>
              <Link href="/hosts/" className={link}>Как это работает</Link>
              <Link href="/hosts/#join" className={link}>Подключить лагерь</Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-between gap-3 border-t border-border-dark pt-6 text-[13px] text-on-dark-muted">
          <span>© 2027 Конок · Бишкек, Кыргызстан</span>
          <span>Демо-версия: места, семьи и цены — примеры</span>
        </div>
      </div>
    </footer>
  );
}
