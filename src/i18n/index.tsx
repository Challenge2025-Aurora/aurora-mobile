import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

import pt from "./locales/pt.json";
import en from "./locales/en.json";

import { getLanguage as getStoredLanguage, setLanguage as setStoredLanguage, Lang as StoredLang } from "../storage/language";

export type Lang = "pt" | "en";

const resources = {
  pt: { translation: pt },
  en: { translation: en },
} as const;

let _initialized = false;
function ensureInit(defaultLng: Lang = "pt") {
  if (_initialized) return;
  i18n.use(initReactI18next).init({
    resources,
    lng: defaultLng,
    fallbackLng: "pt",
    interpolation: { escapeValue: false },
    returnNull: false,
  });
  _initialized = true;
}

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
        const saved: StoredLang = await getStoredLanguage();
        ensureInit(saved);
        if (i18n.language !== saved) await i18n.changeLanguage(saved);
        setLang(saved);
      } catch {
        ensureInit("pt");
        if (i18n.language !== "pt") await i18n.changeLanguage("pt");
        setLang("pt");
      }
    })();
  }, []);

  useEffect(() => {
    if (!_initialized) return;
    (async () => {
      try {
        await setStoredLanguage(lang);
      } catch {}
      if (i18n.language !== lang) {
        await i18n.changeLanguage(lang);
      }
    })();
  }, [lang]);

  const toggle = () => setLang((prev) => (prev === "pt" ? "en" : "pt"));

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
