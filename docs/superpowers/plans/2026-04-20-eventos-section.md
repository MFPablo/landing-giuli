# Eventos Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convertir ProximoEvento en una sección permanente de archivo de eventos con páginas individuales compartibles vía URL y OG tags para WhatsApp/LinkedIn.

**Architecture:** Fuente de verdad en `lib/eventos.ts` (array tipado). Rutas nuevas `/eventos` y `/eventos/[slug]` con App Router server components para generar OG metadata server-side. El sitio principal sigue siendo single-page y lee el próximo evento desde la misma fuente.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS v4, Framer Motion, Bun

---

## File Map

| Archivo | Acción | Responsabilidad |
|---|---|---|
| `lib/eventos.ts` | Crear | Tipo `Evento`, array de datos, helper `getProximoEvento()` |
| `app/components/EventoLightbox.tsx` | Crear | Client component reutilizable para lightbox de flyer |
| `app/components/ProximoEvento.tsx` | Modificar | Leer desde `lib/eventos.ts`, añadir botón "Ver todos" |
| `app/components/Navbar.tsx` | Modificar | Añadir "Eventos", distinguir `/ruta` vs `#anchor` |
| `app/eventos/page.tsx` | Crear | Archivo completo de eventos con metadata |
| `app/eventos/[slug]/page.tsx` | Crear | Página individual con OG tags dinámicos |

---

## Task 1: Capa de datos (`lib/eventos.ts`)

**Files:**
- Create: `lib/eventos.ts`

- [ ] **Step 1: Crear el archivo de datos**

```ts
// lib/eventos.ts

export type EstadoEvento = "proximo" | "activo" | "pasado";

export interface Evento {
  slug: string;
  titulo: string;
  descripcion: string;
  fecha: string; // ISO: "2026-05-16"
  hora: string;  // "10:00"
  imagen: string;
  estado: EstadoEvento;
}

export const eventos: Evento[] = [
  {
    slug: "evaluacion-autismo-sordera",
    titulo: "Evaluación de Autismo en la Sordera",
    descripcion:
      "Jornada de capacitación sobre la evaluación diagnóstica de TEA en personas sordas y con hipoacusia. Abordaje interdisciplinario con herramientas ADOS-2 y ADI-R adaptadas.",
    fecha: "2026-05-16",
    hora: "10:00",
    imagen:
      "https://res.cloudinary.com/dzje6hbhy/image/upload/v1776701731/WhatsApp_Image_2026-04-20_at_12.34.43_z5gktx.jpg",
    estado: "proximo",
  },
];

export function getProximoEvento(): Evento | undefined {
  return eventos.find((e) => e.estado === "proximo" || e.estado === "activo");
}

export function getEventoBySlug(slug: string): Evento | undefined {
  return eventos.find((e) => e.slug === slug);
}

export function formatFecha(fechaISO: string): string {
  const [year, month, day] = fechaISO.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
```

- [ ] **Step 2: Verificar que compila**

```bash
bun run build 2>&1 | head -20
```

Esperado: sin errores de TypeScript en `lib/eventos.ts`.

- [ ] **Step 3: Commit**

```bash
git add lib/eventos.ts
git commit -m "feat: add eventos data layer"
```

---

## Task 2: Extraer lightbox a client component (`EventoLightbox`)

**Files:**
- Create: `app/components/EventoLightbox.tsx`

- [ ] **Step 1: Crear el client component**

```tsx
// app/components/EventoLightbox.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface EventoLightboxProps {
  src: string;
  alt: string;
}

export default function EventoLightbox({ src, alt }: EventoLightboxProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="glass-card p-3 sm:p-4 max-w-sm w-full cursor-zoom-in group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded-[1.25rem]"
        style={{
          boxShadow:
            "0 8px 40px rgba(2,132,199,0.12), 0 0 0 1px var(--surface-border)",
        }}
        aria-label="Ampliar flyer del evento"
      >
        <div
          className="relative w-full rounded-xl overflow-hidden"
          style={{ aspectRatio: "4/5" }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 90vw, 384px"
          />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            style={{
              backgroundColor: "rgba(0,0,0,0.85)",
              backdropFilter: "blur(8px)",
            }}
            onClick={() => setOpen(false)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2, delay: 0.15 }}
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Cerrar"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>

            <motion.div
              key="lightbox-image"
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative h-[90vh] rounded-2xl overflow-hidden shadow-2xl"
              style={{ aspectRatio: "4/5" }}
            >
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 90vw, 56rem"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/EventoLightbox.tsx
git commit -m "feat: extract EventoLightbox as reusable client component"
```

---

## Task 3: Actualizar `ProximoEvento`

**Files:**
- Modify: `app/components/ProximoEvento.tsx`

- [ ] **Step 1: Reemplazar el contenido completo**

```tsx
// app/components/ProximoEvento.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { getProximoEvento, formatFecha } from "../../lib/eventos";
import EventoLightbox from "./EventoLightbox";

export default function ProximoEvento() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const evento = getProximoEvento();
  if (!evento) return null;

  return (
    <section
      id="proximo-evento"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div
          style={{
            width: 520,
            height: 520,
            background:
              "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
            filter: "blur(120px)",
            opacity: 0.08,
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-sm text-[var(--primary-light)] font-mono tracking-widest uppercase mb-4"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--primary)]" />
            </span>
            Próximo Evento
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold"
          >
            {evento.titulo.split(" ").slice(0, -2).join(" ")}{" "}
            <span className="gradient-text">
              {evento.titulo.split(" ").slice(-2).join(" ")}
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-3 mt-5 flex-wrap"
          >
            <span className="inline-flex items-center gap-1.5 text-sm font-mono text-[var(--primary-light)] bg-[rgba(14,165,233,0.1)] border border-[var(--surface-border)] px-3 py-1 rounded-full">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {formatFecha(evento.fecha)}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm font-mono text-[var(--accent-light)] bg-[rgba(6,182,212,0.08)] border border-[var(--surface-border)] px-3 py-1 rounded-full">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {evento.hora} hs
            </span>
          </motion.div>
        </div>

        {/* Flyer */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center"
        >
          <EventoLightbox
            src={evento.imagen}
            alt={`Flyer: ${evento.titulo} — ${formatFecha(evento.fecha)}`}
          />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <a href="#contacto" className="btn-glow">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            Consultá tu lugar
          </a>
          <Link
            href="/eventos"
            className="text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors duration-300 flex items-center gap-1.5"
          >
            Ver todos los eventos
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar en dev que la sección del sitio principal sigue funcionando**

```bash
bun dev
```

Abrir `http://localhost:3000` y verificar que la sección "Próximo Evento" renderiza correctamente con el flyer y el lightbox.

- [ ] **Step 3: Commit**

```bash
git add app/components/ProximoEvento.tsx
git commit -m "feat: refactor ProximoEvento to read from eventos data layer"
```

---

## Task 4: Actualizar Navbar

**Files:**
- Modify: `app/components/Navbar.tsx`

- [ ] **Step 1: Agregar "Eventos" y manejar rutas vs anchors**

Reemplazar la declaración de `navLinks` y la función `handleNavClick`:

```tsx
// Reemplazar el array navLinks:
const navLinks = [
  { label: "Inicio", href: "#hero" },
  { label: "Trayectoria", href: "#trayectoria" },
  { label: "Especialidades", href: "#especialidades" },
  { label: "Fundación", href: "#fundacion" },
  { label: "Premios", href: "#premios" },
  { label: "Congresos", href: "#congresos" },
  { label: "Eventos", href: "/eventos" },
  { label: "Contacto", href: "#contacto" },
];
```

```tsx
// Reemplazar handleNavClick:
const handleNavClick = (href: string) => {
  setMobileOpen(false);
  if (href.startsWith("/")) {
    window.location.href = href;
    return;
  }
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};
```

- [ ] **Step 2: Verificar que el link "Eventos" navega a `/eventos` (aunque la página aún no exista — 404 esperado)**

```bash
bun dev
```

Abrir `http://localhost:3000`, hacer click en "Eventos" en la navbar y verificar que navega a `/eventos`.

- [ ] **Step 3: Commit**

```bash
git add app/components/Navbar.tsx
git commit -m "feat: add Eventos link to navbar"
```

---

## Task 5: Página de archivo `/eventos`

**Files:**
- Create: `app/eventos/page.tsx`

- [ ] **Step 1: Crear la página**

```tsx
// app/eventos/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { eventos, formatFecha, type EstadoEvento } from "../../lib/eventos";

export const metadata: Metadata = {
  title: "Eventos — Lic. Giuliana Covello",
  description:
    "Archivo de eventos, jornadas y capacitaciones de Lic. Giuliana Covello. Especialista en neurodesarrollo y lengua de señas argentina.",
  openGraph: {
    title: "Eventos — Lic. Giuliana Covello",
    description:
      "Archivo de eventos, jornadas y capacitaciones de Lic. Giuliana Covello.",
    type: "website",
    locale: "es_AR",
  },
};

const estadoBadge: Record<EstadoEvento, { label: string; className: string }> =
  {
    proximo: {
      label: "Próximo",
      className:
        "bg-[rgba(14,165,233,0.12)] text-[var(--primary-light)] border border-[var(--surface-border)]",
    },
    activo: {
      label: "En curso",
      className:
        "bg-[rgba(6,182,212,0.12)] text-[var(--accent-light)] border border-[var(--surface-border)]",
    },
    pasado: {
      label: "Pasado",
      className:
        "bg-[var(--surface-light)] text-[var(--muted)] border border-[var(--surface-border)]",
    },
  };

const ordenEstado: Record<EstadoEvento, number> = {
  activo: 0,
  proximo: 1,
  pasado: 2,
};

export default function EventosPage() {
  const sorted = [...eventos].sort(
    (a, b) => ordenEstado[a.estado] - ordenEstado[b.estado]
  );

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Dot pattern */}
      <div className="dot-pattern" />

      <div className="max-w-4xl mx-auto px-6 py-16 relative z-10">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors duration-300 mb-8"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            Giuliana Covello
          </Link>

          <span className="block text-sm text-[var(--primary-light)] font-mono tracking-widest uppercase mb-3">
            Archivo
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--foreground)]">
            Eventos
          </h1>
          <p className="mt-4 text-[var(--muted)] max-w-lg">
            Jornadas, capacitaciones y presentaciones sobre neurodesarrollo y
            lengua de señas argentina.
          </p>
        </div>

        {/* Event list */}
        <div className="flex flex-col gap-6">
          {sorted.map((evento) => {
            const badge = estadoBadge[evento.estado];
            const isPasado = evento.estado === "pasado";

            return (
              <Link
                key={evento.slug}
                href={`/eventos/${evento.slug}`}
                className={`glass-card glass-card-hover group flex gap-5 p-4 sm:p-5 transition-opacity ${
                  isPasado ? "opacity-60 hover:opacity-80" : ""
                }`}
              >
                {/* Thumbnail */}
                <div
                  className="relative flex-shrink-0 rounded-xl overflow-hidden"
                  style={{ width: 80, height: 100 }}
                >
                  <Image
                    src={evento.imagen}
                    alt={`Flyer: ${evento.titulo}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col justify-center gap-2 min-w-0">
                  <span
                    className={`self-start text-xs font-mono px-2.5 py-0.5 rounded-full ${badge.className}`}
                  >
                    {badge.label}
                  </span>
                  <h2 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                    {evento.titulo}
                  </h2>
                  <p className="text-sm text-[var(--muted)] line-clamp-2">
                    {evento.descripcion}
                  </p>
                  <div className="flex items-center gap-3 flex-wrap mt-1">
                    <span className="text-xs font-mono text-[var(--muted)]">
                      {formatFecha(evento.fecha)}
                    </span>
                    <span className="text-xs font-mono text-[var(--muted)]">
                      {evento.hora} hs
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="self-center ml-auto pl-2 flex-shrink-0 text-[var(--muted)] group-hover:text-[var(--primary)] transition-colors">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verificar que la página renderiza**

```bash
bun dev
```

Abrir `http://localhost:3000/eventos` y verificar que se muestra la lista con la card del evento actual.

- [ ] **Step 3: Commit**

```bash
git add app/eventos/page.tsx
git commit -m "feat: add /eventos archive page"
```

---

## Task 6: Página individual `/eventos/[slug]` con OG tags

**Files:**
- Create: `app/eventos/[slug]/page.tsx`

- [ ] **Step 1: Crear la página individual**

```tsx
// app/eventos/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  eventos,
  getEventoBySlug,
  formatFecha,
  type EstadoEvento,
} from "../../../lib/eventos";
import EventoLightbox from "../../components/EventoLightbox";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return eventos.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const evento = getEventoBySlug(slug);
  if (!evento) return {};

  return {
    title: `${evento.titulo} — Lic. Giuliana Covello`,
    description: evento.descripcion,
    openGraph: {
      title: evento.titulo,
      description: evento.descripcion,
      type: "website",
      locale: "es_AR",
      images: [
        {
          url: evento.imagen,
          width: 800,
          height: 1000,
          alt: evento.titulo,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: evento.titulo,
      description: evento.descripcion,
      images: [evento.imagen],
    },
  };
}

const estadoBadge: Record<EstadoEvento, { label: string; className: string }> =
  {
    proximo: {
      label: "Próximo evento",
      className:
        "bg-[rgba(14,165,233,0.12)] text-[var(--primary-light)] border border-[var(--surface-border)]",
    },
    activo: {
      label: "En curso",
      className:
        "bg-[rgba(6,182,212,0.12)] text-[var(--accent-light)] border border-[var(--surface-border)]",
    },
    pasado: {
      label: "Evento pasado",
      className:
        "bg-[var(--surface-light)] text-[var(--muted)] border border-[var(--surface-border)]",
    },
  };

export default async function EventoPage({ params }: Props) {
  const { slug } = await params;
  const evento = getEventoBySlug(slug);
  if (!evento) notFound();

  const badge = estadoBadge[evento.estado];

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="dot-pattern" />

      <div className="max-w-2xl mx-auto px-6 py-16 relative z-10">
        {/* Back links */}
        <div className="flex items-center gap-4 mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors duration-300"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            Giuliana Covello
          </Link>
          <span className="text-[var(--surface-border)]">/</span>
          <Link
            href="/eventos"
            className="text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors duration-300"
          >
            Eventos
          </Link>
        </div>

        {/* Badge + title */}
        <div className="mb-8">
          <span
            className={`inline-block text-xs font-mono px-2.5 py-0.5 rounded-full mb-4 ${badge.className}`}
          >
            {badge.label}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-4">
            {evento.titulo}
          </h1>
          <p className="text-[var(--muted)] leading-relaxed">
            {evento.descripcion}
          </p>
        </div>

        {/* Date/time */}
        <div className="flex items-center gap-3 flex-wrap mb-10">
          <span className="inline-flex items-center gap-1.5 text-sm font-mono text-[var(--primary-light)] bg-[rgba(14,165,233,0.1)] border border-[var(--surface-border)] px-3 py-1 rounded-full">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {formatFecha(evento.fecha)}
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm font-mono text-[var(--accent-light)] bg-[rgba(6,182,212,0.08)] border border-[var(--surface-border)] px-3 py-1 rounded-full">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {evento.hora} hs
          </span>
        </div>

        {/* Flyer */}
        <div className="flex justify-center mb-10">
          <EventoLightbox
            src={evento.imagen}
            alt={`Flyer: ${evento.titulo} — ${formatFecha(evento.fecha)}`}
          />
        </div>

        {/* CTA */}
        {evento.estado !== "pasado" && (
          <div className="flex justify-center">
            <a href="/#contacto" className="btn-glow">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Consultá tu lugar
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verificar que la página individual renderiza**

```bash
bun dev
```

Abrir `http://localhost:3000/eventos/evaluacion-autismo-sordera` y verificar que muestra el evento con el lightbox y los botones de navegación.

- [ ] **Step 3: Verificar OG tags con build de producción**

```bash
bun run build && bun start
```

Abrir `http://localhost:3000/eventos/evaluacion-autismo-sordera` y verificar con "View Source" que el `<head>` contiene:
- `<meta property="og:title" content="Evaluación de Autismo en la Sordera" />`
- `<meta property="og:image" content="https://res.cloudinary.com/..." />`
- `<meta property="twitter:card" content="summary_large_image" />`

- [ ] **Step 4: Commit final**

```bash
git add app/eventos/
git commit -m "feat: add individual event pages with OG tags for social sharing"
```
