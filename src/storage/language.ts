import AsyncStorage from "@react-native-async-storage/async-storage";

export type Lang = "pt" | "en" | "es" | "it" | "fr";

const KEY = "@lang";

export async function getLanguage(): Promise<Lang> {
  const v = await AsyncStorage.getItem(KEY);
  if (v === "pt" || v === "en" || v === "es" || v === "it" || v === "fr") return v as Lang;
  return "pt";
}

export async function setLanguage(lang: Lang) {
  await AsyncStorage.setItem(KEY, lang);
}
