import { Evento } from "../types/domain";
import { stub } from "./client";
let EVT: Evento[] = [];

export async function registrarEvento(e: Omit<Evento, "id"|"criadoEm">): Promise<Evento> {
  const novo: Evento = { ...e, id: String(Date.now()), criadoEm: new Date().toISOString() };
  EVT.unshift(novo);
  return stub(novo);
}

export async function listarEventos(motoId?: string): Promise<Evento[]> {
  return stub(motoId ? EVT.filter(x => x.motoId === motoId) : EVT);
}
