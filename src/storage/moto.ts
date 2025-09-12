import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Moto } from "../types/moto";

const KEY = "motos";

export async function getMotos(): Promise<Moto[]> {
  const data = await AsyncStorage.getItem(KEY);
  return data ? (JSON.parse(data) as Moto[]) : [];
}

export async function setMotos(motos: Moto[]) {
  await AsyncStorage.setItem(KEY, JSON.stringify(motos));
}
