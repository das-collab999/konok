"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LANGS, useLang } from "@/lib/i18n";
import { Icon, Tunduk, type IconName } from "./ui";

export function Header() {
  const { lang, setLang, t } = useLang();
  const path = usePathname() ?? "/";
  const nav = "inline-flex h-11 items-center text-[13px] font-medium tracking-[0.04em] text-fg-muted no-underline transition-colors hover:text-fg";

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-cream/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-5 px-5 sm:h-20 sm:px-10">
        <Link href="/" className="flex h-11 items-center gap-2.5 text-fg no-underline">
          <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-accent text-cream sm:h-9 sm:w-9">
            <Tunduk size={20} strokeWidth={1.6} />
          </span>
          <span className="display text-[20px] leading-none sm:text-[26px]">Конок</span>
        </Link>

        <nav aria-label={t.common.sections} className="hidden items-center gap-5 lg:flex xl:gap-6">
          {[
            { href: "/stays/", label: t.nav.stays },
            { href: "/map/", label: t.common.mapPage },
            { href: "/guide/", label: t.nav.guide },
            { href: "/history/", label: t.common.history },
            { href: "/stories/", label: t.common.stories },
            { href: "/experiences/", label: t.nav.experiences },
            { href: "/bookings/", label: t.nav.bookings },
            { href: "/hosts/", label: t.nav.hosts },
          ].map((i) => {
            const on = path === i.href || (i.href !== "/" && path.startsWith(i.href));
            return (
              <Link key={i.href} href={i.href} className={`${nav} ${on ? "text-accent" : ""}`} aria-current={on ? "page" : undefined}>
                {i.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div role="group" aria-label={t.common.language} className="flex items-center rounded-full border border-rule-strong">
            {LANGS.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => setLang(l.code)}
                aria-pressed={lang === l.code}
                title={l.name}
                className={`h-10 cursor-pointer whitespace-nowrap rounded-full px-2.5 text-[13px] font-medium transition-colors sm:px-3 ${
                  lang === l.code ? "bg-ink text-cream" : "text-fg-muted hover:text-fg"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
          <span className="hidden sm:block lg:hidden xl:block">
            <Link href="/stays/" className="pill pill-solid h-11 px-6">{t.nav.search}</Link>
          </span>
        </div>
      </div>
    </header>
  );
}

/** Нижняя панель на телефоне: пять понятных вкладок, всегда под рукой. */
export function TabBar() {
  const { t } = useLang();
  const path = usePathname() ?? "/";

  const items: { href: string; label: string; icon: IconName; active: boolean }[] = [
    { href: "/stays/", label: t.nav.stays, icon: "bed", active: path.startsWith("/stays") || path.startsWith("/place") },
    { href: "/map/", label: t.common.mapPage, icon: "pin", active: path.startsWith("/map") },
    { href: "/guide/", label: t.nav.guide, icon: "book", active: path.startsWith("/guide") },
    { href: "/stories/", label: t.common.stories, icon: "chat", active: path.startsWith("/stories") || path.startsWith("/history") },
    { href: "/bookings/", label: t.nav.bookings, icon: "check", active: path.startsWith("/bookings") },
  ];

  return (
    <nav
      aria-label={t.common.sections}
      className="sticky bottom-0 z-50 grid grid-cols-5 border-t border-rule bg-cream/97 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
    >
      {items.map((i) => (
        <Link
          key={i.href}
          href={i.href}
          className={`flex h-16 flex-col items-center justify-center gap-1 px-1 text-center text-[11px] no-underline transition-colors sm:text-[12px] ${
            i.active ? "text-accent" : "text-fg-muted"
          }`}
        >
          <Icon name={i.icon} size={20} strokeWidth={1.5} />
          <span className="leading-none">{i.label}</span>
        </Link>
      ))}
    </nav>
  );
}

export function Footer() {
  const { t } = useLang();
  const link = "inline-flex h-10 items-center text-[14px] text-on-dark-muted no-underline transition-colors hover:text-on-dark";

  return (
    <footer className="mt-24 bg-ink text-on-dark-muted">
      <div className="mx-auto max-w-[1280px] px-5 py-9 sm:py-14 sm:px-10">
        <div className="flex flex-wrap items-start justify-between gap-12">
          <div className="max-w-[340px]">
            <div className="flex items-center gap-3 text-on-dark">
              <Tunduk size={26} strokeWidth={1.2} />
              <span className="display text-[24px] leading-none">Конок</span>
            </div>
            <p className="mt-4 text-[14px] leading-relaxed">{t.common.footerNote}</p>
          </div>

          <div className="flex flex-wrap gap-x-14 gap-y-10">
            <div className="flex flex-col gap-2">
              <span className="eyebrow text-on-dark-muted">{t.common.sections}</span>
              <Link href="/stays/" className={link}>{t.nav.stays}</Link>
              <Link href="/map/" className={link}>{t.common.mapPage}</Link>
              <Link href="/guide/" className={link}>{t.nav.guide}</Link>
              <Link href="/history/" className={link}>{t.common.history}</Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="eyebrow text-on-dark-muted">{t.common.forGuests}</span>
              <Link href="/stories/" className={link}>{t.common.stories}</Link>
              <Link href="/experiences/" className={link}>{t.common.experiencesPage}</Link>
              <Link href="/bookings/" className={link}>{t.nav.bookings}</Link>
              <Link href="/guide/#help" className={link}>{t.guide.sections.help}</Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="eyebrow text-on-dark-muted">{t.common.forHosts}</span>
              <Link href="/hosts/" className={link}>{t.hosts.title}</Link>
              <Link href="/hosts/#join" className={link}>{t.hosts.joinTitle}</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-between gap-3 border-t border-rule-dark pt-7 text-[12px] uppercase tracking-[0.14em]">
          <span>© 2027 Конок · Бишкек</span>
          <span>{t.common.demo}</span>
        </div>
      </div>
    </footer>
  );
}
