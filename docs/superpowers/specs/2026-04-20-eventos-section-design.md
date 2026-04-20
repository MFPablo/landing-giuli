# Sección de Eventos con URLs Compartibles

**Fecha:** 2026-04-20
**Estado:** Aprobado

## Objetivo

Convertir el componente `ProximoEvento` en una feature permanente de archivo de eventos, con páginas individuales por evento que generan OG tags server-side (og:title, og:description, og:image) para compartir correctamente por WhatsApp y LinkedIn.

## Arquitectura

```
lib/eventos.ts              ← fuente de verdad (array de eventos tipados)
app/eventos/
  page.tsx                  ← archivo completo, lista todos los eventos
  [slug]/
    page.tsx                ← página individual con OG tags dinámicos
app/components/
  ProximoEvento.tsx         ← actualizado: lee desde lib/eventos.ts, agrega botón "Ver todos"
  Navbar.tsx                ← añade "Eventos" → /eventos
```

El sitio principal (`/`) sigue siendo single-page. `/eventos` y `/eventos/[slug]` son rutas nuevas dentro del mismo proyecto Next.js con App Router.

## Capa de datos (`lib/eventos.ts`)

Cada evento es un objeto tipado con la siguiente forma:

```ts
interface Evento {
  slug: string          // "evaluacion-autismo-sordera"
  titulo: string        // "Evaluación de Autismo en la Sordera"
  descripcion: string   // descripción corta para OG tags y cards (~150 chars)
  fecha: string         // "2026-05-16" (ISO date)
  hora: string          // "10:00"
  imagen: string        // URL Cloudinary del flyer
  estado: "proximo" | "activo" | "pasado"
}

export const eventos: Evento[] = [ ... ]

// Helper: devuelve el primer evento proximo/activo
export function getProximoEvento(): Evento | undefined
```

El evento actual (Evaluación de Autismo en la Sordera, 16 de mayo de 2026) se migra como primera entrada.

## Página `/eventos`

- Server component con metadata estática: `title: "Eventos — Lic. Giuliana Covello"`
- Layout: header con título "Eventos" + botón "← Volver al inicio" (link a `/`)
- Lista eventos: próximos/activos primero con badge de color, pasados debajo con opacidad reducida
- Cada card usa `glass-card` con imagen, título, fecha, estado badge, y link a `/eventos/[slug]`
- Sin paginación (volumen bajo esperado)

## Página `/eventos/[slug]`

- Server component con `generateStaticParams()` (una entrada por slug en `lib/eventos.ts`)
- `generateMetadata()` genera:
  - `title`: título del evento
  - `description`: descripción del evento
  - `openGraph.images`: imagen del flyer (URL Cloudinary)
  - `openGraph.title`, `openGraph.description`
  - `twitter.card: "summary_large_image"`
- Contenido: flyer con lightbox (lógica extraída a `EventoLightbox` client component), fecha, hora, botón "Consultá tu lugar" → `https://giulianacovello.com/#contacto`, botón "← Volver a Giuliana Covello" → `/`
- El lightbox se extrae a un client component separado para mantener la page como server component

## Navbar

- Se agrega `{ label: "Eventos", href: "/eventos" }` entre "Congresos" y "Contacto"
- Como es una ruta real (no anchor), el click usa `router.push("/eventos")` o un `<Link>` de Next.js en lugar del smooth scroll actual
- El Navbar detecta si el link es externo (`/`) vs anchor (`#`) y elige el comportamiento correcto

## `ProximoEvento` (sección del sitio principal)

- Lee el evento mediante `getProximoEvento()` desde `lib/eventos.ts`
- Si no hay evento próximo/activo, la sección no renderiza (o muestra un estado vacío discreto)
- Se agrega botón secundario "Ver todos los eventos →" que navega a `/eventos`
- Los datos hardcodeados actuales se eliminan

## Consideraciones de routing en Navbar

El Navbar actual usa `handleNavClick` con `scrollIntoView` para todos los links. Con la nueva entrada "Eventos" que apunta a `/eventos` (ruta real), se necesita diferenciar:
- Links `#anchor` → comportamiento actual (scroll suave)
- Links `/ruta` → `window.location.href` o `<Link>` de Next.js

La solución más simple: si `href` empieza con `/`, usar `window.location.href = href` en lugar de `scrollIntoView`.

## Fuera de scope

- CMS o panel de administración
- Formulario de inscripción a eventos
- Notificaciones o recordatorios
- Paginación de eventos
