import { Patio } from "../types/domain";
import { stub } from "./client";

const MOCK: Patio = {
  id: "patio-1", nome: "Unidade Celso Daniel",
  mapa: { cols: 20, rows: 10 },
  setores: [{ id: "A", nome: "Setor A", slots: 40 }, { id: "B", nome: "Setor B", slots: 60 }],
};

export async function getPatioAtual() { return stub(MOCK); }
