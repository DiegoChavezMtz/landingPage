import type { PilarId } from "@/domain/entities/Pilar";

export type RespuestaPilar = {
  pilarId: PilarId;
  texto: string;
};

export type RespuestasPilares = Record<PilarId, string>;
