"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { eventos, formatFecha, fechaCorta, type Evento } from "../../lib/eventos";
import EventoLightbox from "./EventoLightbox";
import { IconClock, IconArrow, IconWhatsapp } from "./Icons";

export default function ProximoEvento() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const proximos = eventos
    .filter((e) => e.estado === "proximo" || e.estado === "activo")
    .slice(0, 3);

  return (
    <section
      id="agenda"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header — mismo patrón que el resto de secciones */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={headerInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-6 h-[2px] w-11 rounded-full bg-[var(--primary)] origin-center"
          />
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl"
          >
            Mi <span className="gradient-text">Agenda</span>
          </motion.h2>
        </div>

        {/* Cards */}
        {proximos.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center text-[var(--muted)] text-sm py-10"
          >
            No hay eventos próximos por el momento.
          </motion.p>
        ) : (
          <div className={`grid gap-6 ${
            proximos.length === 1
              ? "grid-cols-1 max-w-xs mx-auto"
              : proximos.length === 2
              ? "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto"
          }`}>
            {proximos.map((evento, i) => (
              <EventCard key={evento.slug} evento={evento} index={i} isInView={headerInView} />
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
        >
          <a href="#contacto" className="btn-glow">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Consultá tu lugar
          </a>
          <Link
            href="/eventos"
            className="text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors duration-300 flex items-center gap-1.5"
          >
            Ver todos los eventos
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}

function EventCard({
  evento,
  index,
  isInView,
}: {
  evento: Evento;
  index: number;
  isInView: boolean;
}) {
  const { dia, mes } = fechaCorta(evento.fecha);
  const tieneInscripcion = Boolean(evento.link);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.2 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card glass-card-hover overflow-hidden flex flex-col group"
    >
      {/* Flyer con lightbox */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/5" }}>
        <EventoLightbox
          src={evento.imagen}
          alt={`Flyer: ${evento.titulo}`}
          compact
        />

        {/* Scrim inferior — garantiza legibilidad del medallón */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />

        {/* Medallón de fecha — pieza editorial (día en Fraunces) */}
        <div className="pointer-events-none absolute bottom-3 left-3 flex flex-col items-center rounded-xl border border-[var(--surface-border)] bg-[var(--card-bg)] px-3 py-1.5 leading-none shadow-lg backdrop-blur-md">
          <span className="font-display text-[1.6rem] text-[var(--foreground)]">{dia}</span>
          <span className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[var(--primary-dark)]">
            {mes}
          </span>
          <span className="sr-only">{formatFecha(evento.fecha)}</span>
        </div>

        {/* Estado en curso — punto con pulso */}
        {evento.estado === "activo" && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-[var(--surface-border)] bg-[var(--card-bg)] px-2.5 py-1 text-[0.7rem] font-medium text-[var(--primary-dark)] backdrop-blur-md">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--primary)] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
            </span>
            En curso
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <Link href={`/eventos/${evento.slug}`} className="focus:outline-none">
          <h3 className="line-clamp-2 leading-snug text-[var(--foreground)] transition-colors group-hover:text-[var(--primary)]">
            {evento.titulo}
          </h3>
        </Link>

        <p className="line-clamp-2 text-sm text-[var(--muted)]">{evento.descripcion}</p>

        {evento.hora && (
          <span className="mt-0.5 inline-flex items-center gap-1.5 text-xs text-[var(--muted)]">
            <IconClock className="h-4 w-4" />
            {evento.hora} hs
          </span>
        )}

        {/* Acción — inscripción real o funnel a WhatsApp */}
        <div className="mt-auto pt-3">
          {tieneInscripcion ? (
            <a
              href={evento.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-event group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)]"
            >
              Inscribirme
              <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
            </a>
          ) : (
            <a
              href="#contacto"
              className="btn-event-ghost focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)]"
            >
              <IconWhatsapp className="h-4 w-4" />
              Consultá tu lugar
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
