import { useEffect, useState } from "react";
import type { Moto } from "../types/moto";
import * as motosStorage from "../storage/moto";

export default function useMotos() {
  const [motos, setMotos] = useState<Moto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    const data = await motosStorage.getAll();
    setMotos(data);
    setLoading(false);
  };

  const add = async (moto: Moto) => {
    const updated = [...motos, moto];
    await motosStorage.setAll(updated);
    setMotos(updated);
  };

  const update = async (index: number, moto: Moto) => {
    const updated = motos.map((m, i) => (i === index ? moto : m));
    await motosStorage.setAll(updated);
    setMotos(updated);
  };

  const remove = async (index: number) => {
    const updated = motos.filter((_, i) => i !== index);
    await motosStorage.setAll(updated);
    setMotos(updated);
  };

  return { motos, loading, load, add, update, remove };
}
