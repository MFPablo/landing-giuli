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
