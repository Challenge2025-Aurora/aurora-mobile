import * as React from "react";
import type { Moto, StatusMoto } from "../types/domain";
import * as api from "../api/motos";

export default function useMotos(filters?: { placa?: string; status?: StatusMoto }) {
  const [motos, setMotos] = React.useState<Moto[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.listMotos(filters);
      setMotos(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [filters?.placa, filters?.status]);

  React.useEffect(() => { load(); }, [load]);

  const add = async (m: Omit<Moto, "id"|"atualizadoEm">) => {
    const novo = await api.createMoto(m as any);
    setMotos(prev => [novo, ...prev]);
    return novo;
  };

  const update = async (id: string, patch: Partial<Moto>) => {
    const before = motos;
    setMotos(prev => prev.map(x => x.id === id ? { ...x, ...patch } : x));
    const saved = await api.updateMoto(id, patch);
    if (!saved) setMotos(before);
    return saved;
  };

  const remove = async (id: string) => {
    const before = motos;
    setMotos(prev => prev.filter(x => x.id !== id));
    const ok = await api.deleteMoto(id);
    if (!ok) setMotos(before);
    return ok;
  };

  return { motos, loading, error, reload: load, add, update, remove };
}
