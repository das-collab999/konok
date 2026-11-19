"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ru" | "en" | "zh";

// Interface strings. Place descriptions are Russian for now;
// translations go to the `place_translations` table later.
const DICT = {
  ru: { nav1: "Жильё", nav2: "Впечатления", nav3: "Для хозяев", heroTitle: "Ночь в юрте под звёздами Тянь-Шаня", heroSub: "Юрты на жайлоо и гостевые дома в сёлах Кыргызстана. Честные фото, живые хозяева, оплата картой.", where: "Куда", when: "Заезд", guests: "Гости", find: "Найти", staysTitle: "Где остановиться", expTitle: "Впечатления от местных семей", hostsTitle: "Покажите свой дом всему миру" },
  en: { nav1: "Stays", nav2: "Experiences", nav3: "For hosts", heroTitle: "A night in a yurt under the Tian Shan stars", heroSub: "Yurt camps on summer pastures and village guesthouses across Kyrgyzstan. Honest photos, real hosts, card payment.", where: "Where", when: "Check-in", guests: "Guests", find: "Search", staysTitle: "Where to stay", expTitle: "Experiences with local families", hostsTitle: "Show your home to the world" },
  zh: { nav1: "住宿", nav2: "体验", nav3: "房东入驻", heroTitle: "在天山星空下的毡房里过夜", heroSub: "吉尔吉斯斯坦高山牧场毡房营地与乡村民宿。真实照片，真实房东，支持刷卡支付。", where: "目的地", when: "入住", guests: "人数", find: "搜索", staysTitle: "住在哪里", expTitle: "与当地家庭一起体验", hostsTitle: "向世界展示您的家" },
} as const;

type Dict = { [K in keyof (typeof DICT)["ru"]]: string };

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Dict }>({
  lang: "ru",
  setLang: () => {},
  t: DICT.ru,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ru");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("konok-lang") as Lang | null;
      if (saved && saved in DICT) setLangState(saved);
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("konok-lang", l); } catch {}
    document.documentElement.lang = l;
  };

  return <LangContext.Provider value={{ lang, setLang, t: DICT[lang] }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
