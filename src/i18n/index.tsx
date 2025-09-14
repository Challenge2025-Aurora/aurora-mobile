import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import * as Localization from "expo-localization";

import pt from "./locales/pt.json";
import en from "./locales/en.json";
import es from "./locales/es.json";
import it from "./locales/it.json";
import fr from "./locales/fr.json";

import { getLanguage as getStoredLanguage, setLanguage as setStoredLanguage, Lang as StoredLang } from "../storage/language";

export type Lang = "pt" | "en" | "es" | "it" | "fr";

const resources = {
  pt: { translation: pt },
  en: { translation: en },
  es: { translation: es },
  it: { translation: it },
  fr: { translation: fr }
} as const;

let _initialized = false;
function ensureInit(defaultLng: Lang = "pt") {
  if (_initialized) return;
  i18n.use(initReactI18next).init({
    resources,
    lng: defaultLng,
    fallbackLng: "pt",
    interpolation: { escapeValue: false },
    returnNull: false
  });
  _initialized = true;
}

ensureInit("pt");

type LanguageCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  i18n: typeof i18n;
};

const LanguageContext = createContext<LanguageCtx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("pt");

  useEffect(() => {
    (async () => {
      try {
        const saved = (await getStoredLanguage()) as Lang | null;
        const device = Localization.getLocales?.()[0]?.languageCode ?? "pt";
        const initial: Lang =
          saved ?? (["en", "es", "it", "fr"].includes(device) ? (device as Lang) : "pt");

        if (i18n.language !== initial) await i18n.changeLanguage(initial);
        setLang(initial);
      } catch {
        if (i18n.language !== "pt") await i18n.changeLanguage("pt");
        setLang("pt");
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await setStoredLanguage(lang as any);
      } catch {}
      if (i18n.language !== lang) await i18n.changeLanguage(lang);
    })();
  }, [lang]);

  const toggle = () => {
    const order: Lang[] = ["pt", "en", "es", "it", "fr"];
    const idx = order.indexOf(lang);
    setLang(order[(idx + 1) % order.length]);
  };

  const value = useMemo(() => ({ lang, setLang, toggle, i18n }), [lang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("LanguageProvider ausente");
  return ctx;
}

export { i18n };
export { useTranslation } from "react-i18next";
