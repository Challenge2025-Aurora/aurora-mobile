import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import pt from "./locales/pt.json";
import en from "./locales/en.json";

export type Lang = "pt" | "en";

function resolveDeviceLang(): Lang {
  const tag =
    Localization.getLocales?.()[0]?.languageTag ??
    Localization.getLocales?.()[0]?.languageCode ??
    "pt";
  const lower = String(tag).toLowerCase();
  return lower.startsWith("pt") ? "pt" : "en";
}

const resources = {
  pt: { translation: pt },
  en: { translation: en },
} as const;

let _initialized = false;
export async function setupI18n(initial?: Lang) {
  if (_initialized) return i18n;

  const lng: Lang = initial ?? resolveDeviceLang();

  await i18n.use(initReactI18next).init({
    resources,
    lng,
    fallbackLng: "pt",
    interpolation: { escapeValue: false },
    returnNull: false,
  });

  _initialized = true;
  return i18n;
}

export { i18n };
export { useTranslation } from "react-i18next";