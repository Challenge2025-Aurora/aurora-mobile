import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

import pt from "./locales/pt.json";
import en from "./locales/en.json";

const STORAGE_KEY = "@lang";

i18n.use(initReactI18next).init({
  lng: "pt",
  fallbackLng: "en",
  resources: {
    pt: { translation: pt },
    en: { translation: en },
  },
  interpolation: { escapeValue: false },
});

const _change = i18n.changeLanguage.bind(i18n);
i18n.changeLanguage = async (lng: string) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, lng);
  } catch {}
  return _change(lng);
};

export default i18n;