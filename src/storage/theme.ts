import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Mode } from '../theme/types';

const KEY = '@theme';

export async function getThemeMode(): Promise<Mode> {
  const v = await AsyncStorage.getItem(KEY);
  return v === 'dark' || v === 'light' ? (v as Mode) : 'dark';
}

export async function setThemeMode(mode: Mode) {
  await AsyncStorage.setItem(KEY, mode);
}
