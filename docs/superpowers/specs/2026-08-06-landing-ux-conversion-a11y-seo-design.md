# Mejoras UX / Conversión / Accesibilidad / SEO — Landing Giuliana Covello

Fecha: 2026-08-06
Estado: Aprobado (diseño) → Implementación

## Objetivo

Agregar 5 bloques de mejora a la landing sin alterar dependencias, maquetación
existente, tipografías ni paleta. Todo mobile-first y coherente con las
convenciones actuales (secciones `section-padding`, `glass-card`, variables CSS,
Framer `useInView`, sin variante `dark:`).

## Decisiones (aprobadas)

- **Envío del formulario:** WhatsApp prefill (`window.open(wa.me/…?text=…)`). Sin backend.
- **Orden en la página:** `… Agenda → Proceso → FAQ → Pre-Consulta → Contact`.
- **Widget de accesibilidad:** botón flotante fijo (abajo-izquierda) + panel.
- **Video LSA:** contenedor maquetado dentro de `Foundation`.

## Componentes nuevos (`app/components/`)

### 1. ProcesoDiagnostico.tsx — `id="proceso"`
- Shell de sección estándar (eyebrow + `<h2>` con `gradient-text` + `<p>` muted).
- Flujo vertical numerado 01–04 con línea conectora (estética timeline).
  Mobile-first: cards apiladas con badge numérico, revelado escalonado.
  1. **Anamnesis e Historia del Desarrollo** — entrevista inicial con la familia (ADI-R).
  2. **Sesiones de Evaluación Presencial** — pruebas estandarizadas (ADOS-2 + batería neuropsicológica).
  3. **Análisis e Informe Técnico** — procesamiento cualitativo y cuantitativo.
  4. **Devolución e Informe** — sesión final, informe escrito y pautas (familia, escuela, equipo interdisciplinario).
- **Card destacada** "Evaluación Neuropsicológica Integral" (borde/anillo accent,
  distinta del foco TEA): atención, funciones ejecutivas, perfil cognitivo.

### 2. PreConsulta.tsx — `id="pre-consulta"` (client, inputs controlados)
- Campos:
  - `tutorNombre` (text, requerido)
  - `ninoNombre` (text, requerido)
  - `ninoEdad` (number, requerido)
  - `motivo` (`<select>`: Evaluación ADOS-2 / ADI-R · Evaluación Neuropsicológica Integral · Orientación Familiar · Otro)
  - `coberturaInforme` (checkbox: "Requiere informe para colegio o prepaga")
  - `telefono` (tel, requerido)
- Labels asociados (`htmlFor`/`id`, `aria-required`). Foco con anillo `--primary`.
- Submit → construir texto codificado → `window.open('https://wa.me/5491164369172?text=…')`.
  `preventDefault`, validación básica de requeridos.
- Micro-texto de contención cerca del CTA:
  > "Sabemos lo importante que es este paso para tu familia. Te acompañamos en
  > todo el proceso con un marco de escucha, contención y respeto."
- Contenedor `glass-card`, inputs con variables CSS (`bg-[var(--surface)]`, borde, foco).

### 3. FAQ.tsx — `id="faq"` (client)
- Acordeón accesible, 5 preguntas. Botón con `aria-expanded` + `aria-controls`;
  panel `role="region"` + `id` + `aria-labelledby`. Teclado nativo (Enter/Espacio).
  Un ítem abierto a la vez. Animación de altura Framer, respeta reduce-motion.
- Preguntas:
  1. ¿A partir de qué edad se pueden realizar las evaluaciones?
  2. ¿Cuántas sesiones requiere el proceso completo?
  3. ¿El informe emitido es válido para la escuela, médicos u obra social/prepaga?
  4. ¿Cómo funciona la modalidad de reintegro en prepagas u obras sociales?
  5. ¿Cómo es el abordaje y evaluación en Lengua de Señas Argentina (LSA)?

### 4a. AccessibilityWidget.tsx + A11yProvider.tsx — global
- Botón flotante fijo abajo-izquierda (♿). Panel con:
  - **Tamaño de texto:** A− / A / A+ → setea `--a11y-font-scale` en `<html>`
    (html font-size en %; Tailwind rem escala todo el sitio).
  - **Alto contraste:** `data-contrast="high"` en `<html>`.
  - **Reducir movimiento:** estado en `A11yProvider`.
- Persistencia en `localStorage`. `aria-expanded`, `aria-controls`, cierre con Esc.
- **Reduce-motion:** `A11yProvider` (client) en `layout` provee contexto y envuelve
  children en Framer `<MotionConfig reducedMotion={reduce ? "always" : "user"}>`.
  Desactiva todas las animaciones existentes sin editar componentes.
  Además CSS kill-switch para keyframes decorativos (mesh/particle/marquee).

### 4b. Video LSA — dentro de Foundation.tsx
- Contenedor responsive 16:9 (`aspect-video`, `glass-card`), ícono play, texto
  "Video explicativo en LSA con subtítulos". Slot comentado para
  `<video><track kind="captions">`. No se elimina contenido existente.

## Cambios en archivos existentes

### layout.tsx (SEO + JSON-LD)
- Enriquecer `metadata`: keywords geo ("Evaluación Neuropsicológica Infantil CABA",
  "Diagnóstico ADOS-2 ADI-R Buenos Aires"), `metadataBase`, OG ampliado.
- `<script type="application/ld+json">` inline: schema `Psychologist` /
  `MedicalBusiness`:
  - `name`: Lic. Giuliana Covello
  - `identifier`: M.N. 76827
  - `medicalSpecialty` / `knowsAbout`: Psicología Clínica, Neurodesarrollo,
    Evaluación Neuropsicológica Infantil, ADOS-2, ADI-R, LSA
  - `areaServed` / `address`: CABA / Buenos Aires, AR
  - `sameAs`: Instagram, LinkedIn
- Envolver en `A11yProvider`, montar `<AccessibilityWidget/>`.

### globals.css (append)
- `html { font-size: calc(100% * var(--a11y-font-scale, 1)); }`
- `[data-contrast="high"]` overrides de paleta (light + dark): foreground/muted/border más fuertes.
- Reduce-motion: `@media (prefers-reduced-motion: reduce)` y `[data-reduce-motion="true"]`
  desactivan keyframes decorativos.

### page.tsx
- Insertar `<ProcesoDiagnostico/>`, `<FAQ/>`, `<PreConsulta/>` antes de `<Contact/>`.

### Navbar.tsx
- Agregar links: `Proceso` (#proceso), `FAQ` (#faq), `Pre-consulta` (#pre-consulta).

## No-objetivos / Garantías
- Sin nuevas dependencias (todo con Next 16 + Framer + Tailwind v4 ya presentes).
- No se elimina ni reordena markup existente (solo se agrega).
- 100% responsive mobile-first. Paleta y tipografías intactas.

## Plan de verificación
- `bun run build` y `bun run lint` sin errores nuevos.
- Revisión visual: mobile (<768px) y desktop de cada sección nueva.
- A11y: teclado en FAQ + widget, toggles persisten tras reload.
- WhatsApp: submit abre wa.me con texto correcto.
