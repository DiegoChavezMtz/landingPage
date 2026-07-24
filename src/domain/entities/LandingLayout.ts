import type { SeccionTipo } from "@/domain/entities/Seccion";

export type LandingLayoutItem = {
  id: string;
  seccionTipo: SeccionTipo;
  variante?: number;
  texto?: string;
  contenido?: Record<string, string>;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  zIndex?: number;
};

export type LandingLayout = {
  items: LandingLayoutItem[];
};
