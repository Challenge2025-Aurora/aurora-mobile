import AsyncStorage from "@react-native-async-storage/async-storage";

export type Lang = "pt" | "en";

const KEY = "@lang";

export async function getLanguage(): Promise<Lang> {
  const v = await AsyncStorage.getItem(KEY);
  return v === "en" || v === "pt" ? (v as Lang) : "pt";
}

/** Persiste o idioma atual. */
export async function setLanguage(lang: Lang) {
  await AsyncStorage.setItem(KEY, lang);
}
