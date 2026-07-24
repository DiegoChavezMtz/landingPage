import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PILARES, type PilarId } from "@/domain/entities/Pilar";
import type { RespuestasPilares } from "@/domain/entities/RespuestaPilar";

type PilaresState = {
  respuestas: RespuestasPilares;
  setRespuesta: (pilarId: PilarId, texto: string) => void;
};

const respuestasIniciales: RespuestasPilares = PILARES.reduce(
  (acc, pilar) => ({ ...acc, [pilar.id]: "" }),
  {} as RespuestasPilares
);

export const usePilaresStore = create<PilaresState>()(
  persist(
    (set) => ({
      respuestas: respuestasIniciales,
      setRespuesta: (pilarId, texto) =>
        set((state) => ({
          respuestas: { ...state.respuestas, [pilarId]: texto },
        })),
    }),
    { name: "restart-pilares", skipHydration: true }
  )
);
