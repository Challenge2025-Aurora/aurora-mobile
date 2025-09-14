import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import pt from "./locales/pt.json";
import en from "./locales/en.json";

import { getLanguageMode, setLanguageMode } from "../storage/language";

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
  if (mode === "system") return resolveDeviceLang();
  return mode;
}

const resources = {
  pt: { translation: pt },
  en: { translation: en },
} as const;

let _initialized = false;

export async function setupI18n() {
  if (_initialized) return i18n;

  const savedMode = await getLanguageMode();
  const effective = effectiveFromMode(savedMode);

  await i18n.use(initReactI18next).init({
    resources,
    lng: effective,
    fallbackLng: "pt",
    interpolation: { escapeValue: false },
    returnNull: false,
  });

  _initialized = true;
  return i18n;
}

export async function setI18nMode(mode: LangMode) {
  await setLanguageMode(mode);
  const effective = effectiveFromMode(mode);
  if (i18n.language !== effective) await i18n.changeLanguage(effective);
}

export async function toggleI18n() {
  const savedMode = await getLanguageMode();
  const base = effectiveFromMode(savedMode);
  const next: Lang = base === "pt" ? "en" : "pt";
  await setI18nMode(next);
}

export { i18n };
export { useTranslation } from "react-i18next";
