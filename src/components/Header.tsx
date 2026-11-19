"use client";

import Link from "next/link";
import { useLang, type Lang } from "@/lib/i18n";
import { Tunduk } from "./ui";

const LANGS: [Lang, string][] = [["ru", "RU"], ["en", "EN"], ["zh", "中文"]];

export function Header() {
  const { lang, setLang, t } = useLang();
  return (
    <header className="bg-ink text-felt">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-4 px-6 py-3.5">
        <Link href="/" className="flex items-center gap-3 text-felt no-underline">
          <Tunduk size={44} />
          <span className="font-serif text-[28px] font-bold tracking-wide">Конок</span>
        </Link>
        <nav aria-label="Главное меню" className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px]">
          <Link href="/#stays" className="text-felt hover:text-gold">{t.nav1}</Link>
          <Link href="/#exp" className="text-felt hover:text-gold">{t.nav2}</Link>
          <Link href="/#hosts" className="text-felt hover:text-gold">{t.nav3}</Link>
          <div role="group" aria-label="Язык" className="flex gap-1 rounded-full bg-felt/10 p-1">
            {LANGS.map(([code, label]) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                className={`h-9 min-w-11 cursor-pointer rounded-full px-2.5 text-sm font-bold ${lang === code ? "bg-gold text-ink" : "text-felt"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-night text-[#CDBA9C]">
      <div className="mx-auto flex max-w-[1240px] flex-wrap justify-between gap-3 px-6 py-7 text-sm">
        <span>© 2027 Конок · Бишкек, Кыргызстан</span>
        <span>Демо-версия: места, семьи и цены — примеры</span>
      </div>
    </footer>
  );
}
