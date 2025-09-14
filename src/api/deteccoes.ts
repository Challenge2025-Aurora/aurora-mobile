import { Deteccao } from "../types/domain";
import { stub } from "./client";

export async function detectarPorImagem(_uri: string): Promise<Deteccao[]> {
  const fake: Deteccao[] = [{
    id: String(Date.now()),
    placa: "ABC1D23",
    modeloProb: "Mottu Sport 110i",
    bbox: { x: 120, y: 200, w: 320, h: 180 },
    confianca: 0.86,
    timestamp: new Date().toISOString(),
    setorEstimado: "A",
    slotEstimado: "A-13",
  }];
  return stub(fake);
}
