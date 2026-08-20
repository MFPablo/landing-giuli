"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { eventos, formatFecha, type Evento } from "../../lib/eventos";
import EventoLightbox from "./EventoLightbox";
import { IconCalendar, IconClock } from "./Icons";

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
  return (
    <motion.div
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
        {evento.estado === "activo" && (
          <span className="absolute top-3 left-3 text-xs font-medium px-2.5 py-0.5 rounded-full bg-[var(--surface-light)] text-[var(--primary-dark)] border border-[var(--surface-border)] backdrop-blur-sm">
            En curso
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-6 flex flex-col gap-3 flex-1">
        <Link href={`/eventos/${evento.slug}`}>
          <h3 className="text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors leading-snug line-clamp-2">
            {evento.titulo}
          </h3>
        </Link>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--primary-dark)] bg-[var(--surface-light)] border border-[var(--surface-border)] px-2.5 py-0.5 rounded-full">
            <IconCalendar className="w-3.5 h-3.5" />
            {formatFecha(evento.fecha)}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-[var(--muted)]">
            <IconClock className="w-4 h-4" />
            {evento.hora} hs
          </span>
        </div>
      </div>
    </motion.div>
  );
}
