export type UUID = string;
export type StatusMoto = "DISPONIVEL" | "MANUTENCAO" | "SUMIDA" | "EM_USO";

export type Moto = {
  id: UUID;
  placa: string;
  modelo: string;
  status: StatusMoto;
  fotoUrl?: string;
  ultimoSetor?: string;
  ultimoSlot?: string;
  atualizadoEm: string;
};

export type EventoTipo = "CHECKIN" | "CHECKOUT" | "MOVE" | "STATUS" | "DETECCAO";
export type Evento = {
  id: UUID;
  motoId: UUID;
  tipo: EventoTipo;
  payload: Record<string, unknown>;
  criadoEm: string;
};

export type Deteccao = {
  id: UUID;
  placa?: string;
  modeloProb?: string;
  bbox?: { x: number; y: number; w: number; h: number };
  confianca?: number;
  timestamp: string;
  setorEstimado?: string;
  slotEstimado?: string;
};

export type Patio = {
  id: UUID;
  nome: string;
  mapa?: { cols: number; rows: number };
  setores: Array<{ id: string; nome: string; slots: number }>;
};
