import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Moto } from "../types/moto";

const KEY = "motos";

export async function getAll(): Promise<Moto[]> {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

export async function setAll(motos: Moto[]): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(motos));
}
