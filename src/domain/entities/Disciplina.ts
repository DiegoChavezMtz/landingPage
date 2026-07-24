export type DisciplinaId = "copywriting" | "ux-ui" | "frontend" | "growth";

export type Disciplina = {
  id: DisciplinaId;
  nombre: string;
  descripcion: string;
  objetivo: string;
  responsabilidades: string[];
  entregables: string[];
  preguntaClave: string;
};

export const DISCIPLINAS: Disciplina[] = [
  {
    id: "copywriting",
    nombre: "Copywriting",
    descripcion:
      "Encuentra las palabras que convierten una necesidad real en una promesa clara y una razón para actuar.",
    objetivo: "Lograr que la persona se reconozca, entienda el valor y quiera avanzar.",
    responsabilidades: ["Investigar la voz del usuario", "Definir la promesa y jerarquía del mensaje", "Escribir titulares, argumentos y CTAs"],
    entregables: ["Arquitectura de mensajes", "Copy de la landing", "Variantes para pruebas"],
    preguntaClave: "¿Qué necesita leer esta persona para dar el siguiente paso?",
  },
  {
    id: "ux-ui",
    nombre: "Diseño UX/UI",
    descripcion:
      "Convierte el argumento en un recorrido visual que dirige la atención sin hacer ruido.",
    objetivo: "Hacer que comprender y avanzar se sientan naturales.",
    responsabilidades: ["Estructurar la experiencia", "Diseñar jerarquía, componentes y estados", "Validar comprensión y accesibilidad"],
    entregables: ["Wireframes", "Prototipo", "Interfaz y sistema visual"],
    preguntaClave: "¿La persona sabe dónde está, qué significa y qué puede hacer?",
  },
  {
    id: "frontend",
    nombre: "Desarrollo Frontend",
    descripcion:
      "Convierte el diseño en una experiencia real: rápida, accesible y sólida en cualquier pantalla.",
    objetivo: "Hacer que la promesa funcione también en el mundo real.",
    responsabilidades: ["Implementar componentes y comportamiento", "Cuidar rendimiento y accesibilidad", "Integrar analítica y formularios"],
    entregables: ["Landing funcional", "Componentes reutilizables", "Eventos de medición"],
    preguntaClave: "¿Funciona bien para todas las personas, pantallas y contextos?",
  },
  {
    id: "growth",
    nombre: "Growth / Marketing",
    descripcion:
      "Conecta la landing con la audiencia correcta y transforma cada resultado en un aprendizaje.",
    objetivo: "Descubrir qué impulsa la conversión y mejorarlo con evidencia.",
    responsabilidades: ["Definir audiencia y canales", "Diseñar experimentos", "Interpretar métricas y optimizar"],
    entregables: ["Hipótesis de crecimiento", "Plan de medición", "Experimentos y aprendizajes"],
    preguntaClave: "¿Qué cambio medible nos acercará al resultado de negocio?",
  },
];
