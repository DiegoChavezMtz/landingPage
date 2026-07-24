import type { LandingLayoutItem } from "@/domain/entities/LandingLayout";
import type { SeccionTipo } from "@/domain/entities/Seccion";

export const LEGACY_WIDGET_HEIGHT = 260;

export function getWidgetHeight(tipo: SeccionTipo, variante = 0) {
  const heights: Record<SeccionTipo, number> = {
    hero: 280, "kicker-dolor": 150, "grid-beneficios": 220, "franja-confianza": 100,
    testimonio: 190, "cta-final": 150, carrusel: 190, "nuestra-historia": 210,
    "popup-newsletter": 180, texto: 160,
  };
  if (tipo === "hero" && variante === 4) return 320;
  if (tipo === "grid-beneficios" && variante === 3) return 250;
  return heights[tipo];
}

// Widgets created before per-type sizing used 260px for every type. Render them
// with their natural wireframe size without mutating the user's saved layout.
export function getRenderedWidgetHeight(item: LandingLayoutItem) {
  return !item.height || item.height === LEGACY_WIDGET_HEIGHT
    ? getWidgetHeight(item.seccionTipo, item.variante ?? 0)
    : item.height;
}
