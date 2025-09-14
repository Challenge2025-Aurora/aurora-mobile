import AsyncStorage from "@react-native-async-storage/async-storage";

export type Lang = "pt" | "en";
export type LangMode = Lang | "system";

const KEY = "@lang_mode";

export async function getLanguageMode(): Promise<LangMode> {
  const v = await AsyncStorage.getItem(KEY);
  if (v === "pt" || v === "en" || v === "system") return v;
  return "system";
}

export async function setLanguageMode(mode: LangMode) {
  await AsyncStorage.setItem(KEY, mode);
}
