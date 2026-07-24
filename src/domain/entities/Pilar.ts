export type PilarId =
  | "necesidad"
  | "propuesta-valor"
  | "beneficios"
  | "evidencia"
  | "objeciones"
  | "cta";

export type Pilar = {
  id: PilarId;
  nombre: string;
  pregunta: string;
  idea: string;
  funcion: string;
  senales: string[];
  ejemplo: string;
};

export const PILARES: Pilar[] = [
  {
    id: "necesidad",
    nombre: "Problema o necesidad",
    pregunta: "¿Qué situación concreta quiere resolver o mejorar tu usuario?",
    idea: "Antes de ofrecer una solución, demuestra que entiendes lo que la persona quiere cambiar.",
    funcion: "Genera relevancia inmediata: la persona reconoce su situación y siente que la página fue creada para ella.",
    senales: ["Una situación específica", "Lenguaje del usuario", "Una consecuencia o aspiración reconocible"],
    ejemplo: "Tu equipo pierde horas cada semana coordinando tareas en cinco herramientas distintas.",
  },
  {
    id: "propuesta-valor",
    nombre: "Propuesta de valor",
    pregunta: "¿Qué ofreces, para quién, qué resultado produce y qué lo hace diferente?",
    idea: "Una promesa poderosa dice qué ofreces, para quién y por qué vale la pena elegirte.",
    funcion: "Conecta el problema con una solución y convierte una oferta compleja en una idea clara, concreta y fácil de recordar.",
    senales: ["Oferta reconocible", "Audiencia clara", "Resultado principal", "Diferenciador creíble"],
    ejemplo: "Un espacio de trabajo para equipos remotos que reúne prioridades y conversaciones para decidir más rápido.",
  },
  {
    id: "beneficios",
    nombre: "Beneficios",
    pregunta: "¿Qué gana la persona al usar tu producto?",
    idea: "Las funciones describen el producto. Los beneficios hacen visible una vida mejor.",
    funcion: "Ayuda a imaginar el después: menos esfuerzo, más velocidad, más control o cualquier resultado que el producto haga posible.",
    senales: ["Resultados, no funciones", "Beneficios escaneables", "Prioridad sobre cantidad"],
    ejemplo: "Decide más rápido, reduce reuniones y mantén a todos alineados.",
  },
  {
    id: "evidencia",
    nombre: "Evidencia",
    pregunta: "¿Qué prueba que esto funciona de verdad?",
    idea: "Una promesa llama la atención. La evidencia hace que alguien se atreva a creerla.",
    funcion: "Reduce el riesgo percibido mediante voces, datos o señales externas que respaldan lo que afirma la landing.",
    senales: ["Testimonios concretos", "Métricas con contexto", "Clientes, sellos o casos"],
    ejemplo: "Más de 2,000 equipos redujeron 6 horas de coordinación por semana.",
  },
  {
    id: "objeciones",
    nombre: "Objeciones y fricción",
    pregunta: "¿Qué duda, riesgo o esfuerzo podría impedir que la persona avance?",
    idea: "Cada duda sin respuesta es una puerta de salida.",
    funcion: "Reduce incertidumbre sobre precio, tiempo, dificultad, riesgo o compromiso antes de pedir una acción.",
    senales: ["Dudas reales de la audiencia", "Respuesta concreta y verificable", "Menor riesgo percibido"],
    ejemplo: "Empieza gratis en menos de tres minutos. No necesitas tarjeta y puedes cancelar cuando quieras.",
  },
  {
    id: "cta",
    nombre: "CTA",
    pregunta: "¿Qué acción concreta quieres que tome ahora mismo?",
    idea: "El interés se pierde si el siguiente paso no es claro, valioso y fácil de tomar.",
    funcion: "La llamada a la acción recoge todo el argumento de la página y lo convierte en una decisión. Debe priorizar una acción principal y explicar qué ocurrirá después.",
    senales: ["Un verbo de acción", "Una acción principal evidente", "Expectativa clara", "Alternativa secundaria solo si aporta"],
    ejemplo: "Crea tu espacio gratis — no necesitas tarjeta.",
  },
];
