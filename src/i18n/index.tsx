import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

import pt from "./locales/pt.json";
import en from "./locales/en.json";

import { getLanguageMode, setLanguageMode, LangMode as StoredLangMode } from "../storage/language";

export type Lang = "pt" | "en";
export type LangMode = Lang | "system";

function resolveDeviceLang(): Lang {
  const tag =
    Localization.getLocales?.()[0]?.languageTag ??
    Localization.getLocales?.()[0]?.languageCode ??
    "pt";
  const lower = String(tag).toLowerCase();
  return lower.startsWith("pt") ? "pt" : "en";
}

function effectiveFromMode(mode: LangMode): Lang {
  return mode === "system" ? resolveDeviceLang() : mode;
}

const resources = {
  pt: { translation: pt },
  en: { translation: en },
} as const;

let _initialized = false;
async function ensureInit(lang: Lang) {
  if (_initialized) return;
  await i18n.use(initReactI18next).init({
    resources,
    lng: lang,
    fallbackLng: "pt",
    interpolation: { escapeValue: false },
    returnNull: false,
  });
  _initialized = true;
}

type LanguageCtx = {
  mode: LangMode;
  lang: Lang;
  setMode: (m: LangMode) => void;
  setLang: (l: Lang) => void;
  toggle: () => void;
  i18n: typeof i18n;
};

const LanguageContext = createContext<LanguageCtx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<LangMode>("system");

  useEffect(() => {
    (async () => {
      const saved: StoredLangMode = await getLanguageMode();
      const effective = effectiveFromMode(saved);
      await ensureInit(effective);
      if (i18n.language !== effective) await i18n.changeLanguage(effective);
      setModeState(saved);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const effective = effectiveFromMode(mode);
      try {
        await setLanguageMode(mode);
      } catch {}
      if (_initialized && i18n.language !== effective) {
        await i18n.changeLanguage(effective);
      }
    })();
  }, [mode]);

  const lang = effectiveFromMode(mode);

  const setMode = (m: LangMode) => setModeState(m);
  const setLang = (l: Lang) => setModeState(l);
  const toggle = () => setModeState((m) => (effectiveFromMode(m) === "pt" ? "en" : "pt"));

  const value = useMemo<LanguageCtx>(
    () => ({ mode, lang, setMode, setLang, toggle, i18n }),
    [mode, lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("LanguageProvider ausente");
  return ctx;
}

export { i18n };
export { useTranslation } from "react-i18next";
