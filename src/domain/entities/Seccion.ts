import type { PilarId } from "@/domain/entities/Pilar";

export type SeccionTipo =
  | "hero"
  | "kicker-dolor"
  | "grid-beneficios"
  | "franja-confianza"
  | "testimonio"
  | "cta-final"
  | "carrusel"
  | "nuestra-historia"
  | "popup-newsletter"
  | "texto";

export type Seccion = {
  tipo: SeccionTipo;
  nombre: string;
  definicion?: string;
  componentes?: string[];
  pilarId: PilarId | null;
  pilaresSecundarios?: PilarId[];
  esTrampa: boolean;
};

export type PageWidget = Pick<Seccion, "tipo" | "nombre">;

export type SandboxWidget = PageWidget & {
  id: string;
  variante: number;
  descripcion: string;
  categoria: "Estructura y conversión" | "Confianza y narrativa" | "Media y captación" | "Contenido";
};

export const SECCIONES: Seccion[] = [
  {
    tipo: "hero",
    nombre: "Sección hero",
    definicion: "La apertura de la landing. En pocos segundos debe explicar qué ofreces, para quién y por qué vale la pena seguir leyendo.",
    componentes: ["Titular principal", "Copy de apoyo", "Botón principal (CTA)", "Imagen o visual de producto", "Señal de confianza opcional"],
    pilarId: "propuesta-valor",
    pilaresSecundarios: ["beneficios", "evidencia", "cta"],
    esTrampa: false,
  },
  {
    tipo: "kicker-dolor",
    nombre: "Bloque de problema",
    definicion: "Una sección breve que nombra la frustración, costo o contexto que vive la persona antes de presentar la solución.",
    componentes: ["Frase de tensión", "Contexto del problema", "Dato o situación reconocible", "Acento visual opcional"],
    pilarId: "necesidad",
    pilaresSecundarios: ["propuesta-valor"],
    esTrampa: false,
  },
  {
    tipo: "grid-beneficios",
    nombre: "Sección de beneficios",
    definicion: "Un grupo de tarjetas o bloques que traduce lo que hace el producto en resultados concretos para la persona.",
    componentes: ["Título de sección", "Tarjetas de beneficio", "Íconos o imágenes", "Título por beneficio", "Descripción breve"],
    pilarId: "beneficios",
    pilaresSecundarios: ["propuesta-valor"],
    esTrampa: false,
  },
  {
    tipo: "franja-confianza",
    nombre: "Franja de confianza",
    definicion: "Una banda compacta de señales que respalda la promesa antes de pedir una decisión.",
    componentes: ["Logos de clientes", "Métrica verificable", "Certificación o sello", "Microcopy de respaldo"],
    pilarId: "evidencia",
    pilaresSecundarios: ["objeciones"],
    esTrampa: false,
  },
  {
    tipo: "testimonio",
    nombre: "Testimonio de cliente",
    definicion: "Una prueba social en primera persona que demuestra el cambio que el producto hizo posible.",
    componentes: ["Cita concreta", "Nombre de la persona", "Cargo, empresa o contexto", "Foto o avatar opcional", "Resultado medible opcional"],
    pilarId: "evidencia",
    pilaresSecundarios: ["beneficios", "objeciones"],
    esTrampa: false,
  },
  {
    tipo: "cta-final",
    nombre: "Sección de cierre con CTA",
    definicion: "El último empujón del recorrido: reúne el valor y plantea una única acción clara para avanzar.",
    componentes: ["Titular de cierre", "Recordatorio de valor", "Botón principal", "Reductor de fricción", "Visual de apoyo opcional"],
    pilarId: "cta",
    pilaresSecundarios: ["propuesta-valor", "objeciones"],
    esTrampa: false,
  },
  {
    tipo: "carrusel",
    nombre: "Carrusel de imágenes",
    definicion: "Una secuencia visual que puede mostrar variedad, contexto o detalle. Solo aporta cuando cada imagen ayuda a comprender o creer algo relevante.",
    pilarId: null,
    esTrampa: true,
  },
  {
    tipo: "nuestra-historia",
    nombre: "Nuestra historia",
    definicion: "Una narrativa de marca que puede generar confianza o diferenciación cuando conecta directamente con la decisión del visitante.",
    pilarId: null,
    esTrampa: true,
  },
  {
    tipo: "popup-newsletter",
    nombre: "Pop-up / newsletter",
    definicion: "Un mecanismo de captación que interrumpe el recorrido. Es útil solo cuando ofrece valor pertinente y aparece en el momento adecuado.",
    pilarId: null,
    esTrampa: true,
  },
];

const PAGE_WIDGETS: Array<PageWidget & { categoria: SandboxWidget["categoria"]; proposito: string; incluye: string }> = [
  { tipo:"hero", nombre:"Hero", categoria:"Estructura y conversión", proposito:"Abre una landing y comunica la propuesta principal en los primeros segundos.", incluye:"titular, copy de apoyo, llamada a la acción y área visual" },
  { tipo:"kicker-dolor", nombre:"Problema", categoria:"Estructura y conversión", proposito:"Introduce una tensión, necesidad o contexto antes de presentar la solución.", incluye:"titular breve, texto de contexto y acento visual" },
  { tipo:"grid-beneficios", nombre:"Beneficios", categoria:"Estructura y conversión", proposito:"Explica rápidamente los beneficios o funcionalidades más relevantes.", incluye:"tarjetas, iconos, títulos y descripciones" },
  { tipo:"cta-final", nombre:"Llamada a la acción", categoria:"Estructura y conversión", proposito:"Cierra el recorrido con una decisión clara para la persona visitante.", incluye:"titular de cierre, mensaje de apoyo y botón" },
  { tipo:"franja-confianza", nombre:"Franja de confianza", categoria:"Confianza y narrativa", proposito:"Reduce fricción mostrando señales de credibilidad en un vistazo.", incluye:"logos, métricas, sellos o mensajes de validación" },
  { tipo:"testimonio", nombre:"Testimonio", categoria:"Confianza y narrativa", proposito:"Añade prueba social mediante una experiencia o cita de cliente.", incluye:"cita, nombre, cargo o avatar" },
  { tipo:"nuestra-historia", nombre:"Historia", categoria:"Confianza y narrativa", proposito:"Da contexto a la marca o explica un momento relevante de su historia.", incluye:"titular, narrativa, hitos y apoyo visual" },
  { tipo:"carrusel", nombre:"Galería", categoria:"Media y captación", proposito:"Agrupa contenido visual navegable sin abandonar la página.", incluye:"imágenes, controles, indicadores y opcionalmente una leyenda" },
  { tipo:"popup-newsletter", nombre:"Captación", categoria:"Media y captación", proposito:"Invita a registrarse, descargar un recurso o recibir novedades.", incluye:"titular, beneficio, campo de captura y botón" },
  { tipo:"texto", nombre:"Texto", categoria:"Contenido", proposito:"Inserta copy libre para introducir, explicar o conectar secciones.", incluye:"texto editable con jerarquía tipográfica" },
];

const VARIANT_NOTES = [
  "Distribución equilibrada para una lectura directa.",
  "Versión compacta para secciones con poco espacio vertical.",
  "Composición editorial con un foco visual más marcado.",
  "Alternativa de alto contraste orientada a la conversión.",
];

const BASE_SANDBOX_WIDGETS: SandboxWidget[] = PAGE_WIDGETS.flatMap((widget) =>
  VARIANT_NOTES.map((nota, variante) => ({
    tipo: widget.tipo,
    nombre: widget.nombre,
    categoria: widget.categoria,
    id: `${widget.tipo}-${variante}`,
    variante,
    descripcion: `${widget.proposito} Incluye: ${widget.incluye}. ${nota}`,
  }))
);

export const SANDBOX_WIDGETS: SandboxWidget[] = [
  ...BASE_SANDBOX_WIDGETS,
  {
    id: "hero-4",
    tipo: "hero",
    nombre: "Hero con imagen de fondo",
    categoria: "Estructura y conversión",
    variante: 4,
    descripcion: "Apertura de alto impacto con una imagen a pantalla completa. Reúne una imagen dominante, un titular superpuesto, un mensaje de apoyo y una llamada a la acción. Funciona cuando la narrativa visual es tan importante como la propuesta de valor.",
  },
];
