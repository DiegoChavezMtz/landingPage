import type { RespuestasPilares } from "@/domain/entities/RespuestaPilar";
import type { LandingLayoutItem } from "@/domain/entities/LandingLayout";
import type { SeccionTipo } from "@/domain/entities/Seccion";

function createId() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `item-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

type StarterWidget = {
  seccionTipo: SeccionTipo;
  variante: number;
  y: number;
  height: number;
  texto?: string;
};

// Intentionally overcrowded: this is the material the group will edit down live.
const SATURATED_STARTER: StarterWidget[] = [
  { seccionTipo: "hero", variante: 4, y: 24, height: 320 },
  { seccionTipo: "carrusel", variante: 2, y: 358, height: 190 },
  { seccionTipo: "popup-newsletter", variante: 3, y: 560, height: 180 },
  { seccionTipo: "nuestra-historia", variante: 1, y: 752, height: 210 },
  { seccionTipo: "kicker-dolor", variante: 2, y: 974, height: 150 },
  { seccionTipo: "grid-beneficios", variante: 3, y: 1136, height: 250 },
  { seccionTipo: "franja-confianza", variante: 1, y: 1398, height: 100 },
  { seccionTipo: "testimonio", variante: 2, y: 1510, height: 190 },
  { seccionTipo: "cta-final", variante: 3, y: 1712, height: 150 },
  { seccionTipo: "texto", variante: 0, y: 1874, height: 150, texto: "¿Qué bloque sobra? ¿Qué falta para que la decisión sea más fácil?" },
];

export function buildPaso5InitialLayout(
  respuestas: RespuestasPilares
): LandingLayoutItem[] {
  const heroCopy = respuestas["propuesta-valor"] || "Una promesa clara para quien necesita decidir.";
  const painCopy = respuestas.necesidad || "El problema todavía necesita ser visible.";

  return SATURATED_STARTER.map((widget, index) => ({
    id: createId(),
    seccionTipo: widget.seccionTipo,
    variante: widget.variante,
    texto: widget.seccionTipo === "hero" ? heroCopy : widget.seccionTipo === "kicker-dolor" ? painCopy : widget.texto ?? "",
    x: 28,
    y: widget.y,
    width: 1040,
    height: widget.height,
    zIndex: index + 1,
  }));
}
