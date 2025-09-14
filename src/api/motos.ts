import { Moto, StatusMoto, UUID } from "../types/domain";
import { stub } from "./client";

let MOCK: Moto[] = [
  { id: "1", placa: "ABC1D23", modelo: "Mottu Sport 110i", status: "DISPONIVEL", ultimoSetor: "A", ultimoSlot: "A-12", atualizadoEm: new Date().toISOString() },
  { id: "2", placa: "XYZ9K88", modelo: "Mottu Pop", status: "SUMIDA", atualizadoEm: new Date().toISOString() },
];

export async function listMotos(q?: { placa?: string; status?: StatusMoto }): Promise<Moto[]> {
  let out = [...MOCK];
  if (q?.placa) out = out.filter(m => m.placa.includes(q.placa!.toUpperCase()));
  if (q?.status) out = out.filter(m => m.status === q.status);
  return stub(out);
}

export async function getMoto(id: UUID) { return stub(MOCK.find(m => m.id === id) ?? null); }

export async function createMoto(input: Omit<Moto, "id"|"atualizadoEm">) {
  const novo: Moto = { ...input, id: String(Date.now()), atualizadoEm: new Date().toISOString() };
  MOCK.push(novo);
  return stub(novo);
}

export async function updateMoto(id: UUID, patch: Partial<Moto>) {
  const i = MOCK.findIndex(m => m.id === id);
  if (i < 0) return stub(null);
  MOCK[i] = { ...MOCK[i], ...patch, atualizadoEm: new Date().toISOString() };
  return stub(MOCK[i]);
}

export async function deleteMoto(id: UUID) {
  const i = MOCK.findIndex(m => m.id === id);
  if (i < 0) return stub(false);
  MOCK.splice(i, 1);
  return stub(true);
}
