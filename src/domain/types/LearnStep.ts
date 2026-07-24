export const LEARN_STEPS = [
  "5 segundos",
  "Argumento",
  "Secciones",
  "Decisiones",
  "Equipo",
  "Wireframe",
  "Referentes",
  "IA y publicación",
  "Construcción",
] as const;

export const TOTAL_LEARN_STEPS = LEARN_STEPS.length;

export type LearnStepIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
