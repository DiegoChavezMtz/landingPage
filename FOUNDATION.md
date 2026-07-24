# FOUNDATION.md — "How to Make Powerful Landing Pages"

Este documento es la fuente de verdad del proyecto: producto, branding, arquitectura y especificación funcional. Cualquier decisión de diseño o alcance que se tome durante el desarrollo y que no esté reflejada aquí debe agregarse a este documento antes de continuar. No se toma como una instrucción de una sola vez — es la referencia que se consulta en cada sesión de trabajo.

---

## 1. Qué es este proyecto

Una app de apoyo para una sesión presencial de 2 horas sobre cómo crear landing pages poderosas, dirigida a jóvenes con nivel técnico básico. La app **no es una landing page en sí misma** — es una herramienta de facilitación que el instructor proyecta y controla en vivo, y que después los equipos usan de forma libre en la fase de competencia.

**Tesis central de la sesión:** una landing poderosa no depende de acumular elementos, sino de comunicar con claridad qué se ofrece, para quién y por qué debería importarle. La app refuerza esta idea en cada interacción — nunca premia "meter más cosas"; siempre premia claridad y decisiones intencionales.

## 2. Rol de quien desarrolla

Ingeniero de interfaces senior, experto en Next.js, TypeScript, Clean Architecture y Atomic Design, con un ojo de diseño excepcional (nivel producto, no proyecto escolar). El resultado visual debe sentirse premium, editorial y con movimiento. Esta app se usa en vivo, proyectada frente a un salón — la primera impresión visual es crítica.

## 3. Stack técnico

- **Next.js** (App Router), **TypeScript** estricto
- **styled-components** para estilos (CSS-in-JS, theming centralizado)
- **Clean Architecture**: `domain` (entidades: Pilar, Seccion, LandingLayout, RespuestaPilar), `application` (casos de uso / hooks de orquestación), `infrastructure` (adaptadores: export a imagen, storage local), `presentation` (componentes UI)
- **Atomic Design** dentro de `presentation`: `atoms/`, `molecules/`, `organisms/`, `templates/`, `pages/`
- Librerías (mínimo esperado, criterio experto para lo demás):
  - **framer-motion** — todas las transiciones (pantalla en negro entre landings, cambios de paso, drag feedback)
  - **@dnd-kit/core** + **@dnd-kit/sortable** — drag and drop (biblioteca → canvas, reordenar dentro del canvas)
  - **zustand** — estado global (canvas, progreso del modo Aprender, respuestas de pilares), con persist a localStorage
  - **lucide-react** — iconografía
  - **html-to-image** (o `dom-to-image-more`) — exportar canvas como imagen PNG limpia
  - **react-hot-toast** o similar — feedback ligero puntual
- Nada de librerías de UI pesadas (Material UI, Ant Design) — todo a medida para consistencia de marca.

## 4. Branding

Extraído del logo RESTART by Dekids (`public/branding/`):
- Tipografía: geométrica, bold, condensada para headers (ej. "Archivo Black", "Space Grotesk" bold, o "Clash Display" vía @font-face); limpia y neutral (Inter, Manrope) para cuerpo.
- Paleta: negro no puro (~#0A0A0A) y blanco como base; rojo-coral **#FF1B44** (tono exacto extraído del logo) como color de acción/foco — moderado, nunca como fondo extenso.
- Motivo gráfico: el triángulo/flecha de la "A" del logo, reutilizable como indicador de progreso o marcador de estado activo — sutil, no repetitivo.
- Modo oscuro como base visual principal (alto contraste para proyección).
- Archivos de logo: `Restart_Logo_LetrasBlancas.png` (fondo oscuro), `Restart_Logo_LetrasNegras.png` (fondo claro).

## 5. Producto de ejemplo (hilo conductor del Modo Aprender)

**CALOPAW — botas con calefacción para perros.** Botas pequeñas con capa térmica recargable por USB que mantienen las patas del perro protegidas del frío o de superficies calientes. Se usa en los ejemplos y pre-rellenos de: necesidad ("patas frías/quemadas"), propuesta de valor, beneficios (autonomía de batería, antideslizante, fácil de poner), evidencia (testimonios, unidades vendidas) y CTA. Tono ligero y divertido.

## 6. Especificación funcional

### 6.1 Pantalla inicial
Fondo oscuro, logo RESTART. Título: **"How to Make Powerful Landing Pages"**. Dos botones: **Aprender** / **Modo Sandbox**.

### 6.2 MODO APRENDER (secuencial, un solo usuario — el instructor — controla el avance)

Navegación "siguiente/anterior", indicador de progreso.

**Paso 1 — Reto de los 5 segundos.** Muestra una landing (imagen) a pantalla completa 5 segundos con cronómetro visible. Al terminar, pantalla negra (transición suave) hasta que el instructor dé "Siguiente". 5 landings en total (placeholders reemplazables).

**Paso 2 — Pilares conceptuales (cards).** Los 5 pilares — Necesidad/Dolor, Propuesta de Valor, Beneficios, Evidencia, CTA — cada uno con pregunta guía y un campo editable donde el instructor escribe la respuesta del grupo en vivo. Se guarda en estado global + localStorage. Se reutiliza en el Paso 5.

**Paso 3 — Elementos ↔ pilares.** Se muestra una sección de la biblioteca (6.4) y el usuario arrastra/selecciona a qué pilar corresponde. Feedback inmediato con motion.

**Paso 4 — Disciplinas y carreras.** Grid informativo (no interactivo): Copywriting, Diseño UX/UI, Desarrollo Frontend, Growth/Marketing — ícono + nombre + 1-2 líneas de rol en el contexto de una landing.

**Paso 5 — Pseudo-sandbox guiado (depurar).** Mismo motor que el Modo Sandbox, pero:
- El canvas arranca **lleno** (todas las secciones núcleo + trampa colocadas).
- El texto de las secciones núcleo se precarga con las respuestas del Paso 2.
- El instructor **quita** secciones (no agrega) para depurar hasta lo esencial.
- Sin multiusuario — un solo canvas controlado por quien tiene la pantalla.

### 6.3 MODO SANDBOX (libre, para equipos)

- Biblioteca lateral de secciones arrastrables, estilo boceto/wireframe (bordes punteados o trazo mano alzada, texto placeholder gris), con etiqueta de pilar visible (o "sin pilar claro" para trampa).
- Canvas central: drag & drop, reordenar, edición inline de texto placeholder. Cada sección colocada en el canvas expone **un campo de texto editable único** (el mensaje principal de esa sección), independiente del mockup boceto/wireframe que la representa visualmente — no se edita cada línea del wireframe por separado.
- Botón **"Exportar layout como imagen"**: PNG limpio (html-to-image), sin ningún elemento de UI de la app. Descarga automática.
- Botón para limpiar el canvas.

### 6.4 Biblioteca de secciones (compartida entre Paso 3, Paso 5, Sandbox)

**Núcleo (con pilar):**
1. **Hero** (Propuesta de Valor) — dos columnas: headline + subtítulo + CTA pequeño / rectángulo de imagen
2. **Kicker de dolor** (Necesidad) — franja angosta, una línea corta
3. **Grid de beneficios** (Beneficios) — 3-4 columnas, ícono + título + texto corto
4. **Franja de confianza** (Evidencia corta) — barra angosta con logos o números
5. **Testimonio** (Evidencia larga) — tarjeta con foto circular + cita + nombre
6. **CTA final** (CTA) — franja ancho completo, headline + botón grande centrado

**Trampa (pilar débil/nulo):**
7. **Carrusel de imágenes** — rectángulo con flechas y paginación
8. **"Nuestra historia"** — bloque de texto denso, sin CTA
9. **Pop-up/newsletter** — recuadro flotante con botón de cerrar

## 7. Barra de calidad visual

- Transiciones con propósito (framer-motion), nunca abruptas.
- Jerarquía tipográfica clara, whitespace generoso.
- Micro-animaciones satisfactorias en cada interacción (scale, spring physics).
- Modo oscuro consistente, rojo-coral como único acento de color.
- Responsive no crítico (uso proyectado/laptop), pero Sandbox debe funcionar en laptops de equipos.

## 8. Estructura de carpetas

```
src/
  domain/
    entities/       (Pilar, Seccion, LandingLayout, RespuestaPilar)
    types/
  application/
    useCases/       (exportarLayout, depurarSeccion, guardarRespuestaPilar)
    hooks/
  infrastructure/
    export/         (adaptador html-to-image)
    storage/        (adaptador localStorage/zustand persist)
  presentation/
    atoms/
    molecules/
    organisms/
    templates/
    pages/
  theme/            (tokens de branding)
```
