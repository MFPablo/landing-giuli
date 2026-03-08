"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const specialties = [
  {
    id: "ados2",
    title: "ADOS-2",
    subtitle: "Autism Diagnostic Observation Schedule",
    description:
      "Evaluación estandarizada de referencia internacional para el diagnóstico del Trastorno del Espectro Autista. Observación directa y estructurada del comportamiento social, comunicación y juego.",
    details: [
      "Evaluación semi-estructurada de 40-60 minutos",
      "Aplicable desde los 12 meses de edad",
      "Gold standard internacional en diagnóstico TEA",
      "Certificación clínica por el Lincoln Institute",
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611l-.573.096a9.065 9.065 0 01-2.562 0l-.573-.096c-1.717-.293-2.299-2.379-1.067-3.611L16.8 15.3M5 14.5l-1.402 1.402c-1.232 1.232-.65 3.318 1.067 3.611l.573.096a9.065 9.065 0 002.562 0l.573-.096c1.717-.293 2.299-2.379 1.067-3.611L8.2 15.3" />
      </svg>
    ),
    color: "from-blue-500 to-cyan-400",
    bgGlow: "rgba(59, 130, 246, 0.1)",
  },
  {
    id: "adir",
    title: "ADI-R",
    subtitle: "Autism Diagnostic Interview – Revised",
    description:
      "Entrevista clínica exhaustiva con la familia, diseñada para obtener un historial detallado del desarrollo. Complemento esencial del ADOS-2 para un diagnóstico integral.",
    details: [
      "Entrevista clínica de 90-150 minutos",
      "Evaluación del desarrollo temprano",
      "Análisis de interacción social recíproca",
      "Certificación por Weill Cornell Medical College",
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    color: "from-purple-500 to-pink-400",
    bgGlow: "rgba(168, 85, 247, 0.1)",
  },
  {
    id: "pci",
    title: "Psicoterapia Cognitiva Integrativa",
    subtitle: "Abordaje terapéutico basado en evidencia",
    description:
      "Modelo terapéutico que integra técnicas cognitivo-conductuales con perspectiva del neurodesarrollo. Intervenciones personalizadas para cada paciente y su familia.",
    details: [
      "Abordaje personalizado e integral",
      "Técnicas basadas en evidencia científica",
      "Intervención con la familia como eje",
      "Especialización por la Fundación Aigle",
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    color: "from-emerald-500 to-teal-400",
    bgGlow: "rgba(16, 185, 129, 0.1)",
  },
];

function SpecialtyCard({
  specialty,
  index,
}: {
  specialty: (typeof specialties)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={() => setExpanded(!expanded)}
      className="glass-card glass-card-hover p-6 md:p-8 cursor-pointer relative overflow-hidden group"
    >
      {/* Glow background */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at 50% 0%, ${specialty.bgGlow}, transparent 70%)` }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <div
          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${specialty.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
        >
          {specialty.icon}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-[var(--foreground)] mb-1">{specialty.title}</h3>
        <p className={`text-sm font-medium bg-gradient-to-r ${specialty.color} bg-clip-text text-transparent mb-4`}>
          {specialty.subtitle}
        </p>

        {/* Description */}
        <p className="text-[var(--muted)] text-sm leading-relaxed mb-4">
          {specialty.description}
        </p>

        {/* Expandable details */}
        <motion.div
          initial={false}
          animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <ul className="space-y-2 pt-4 border-t border-[var(--surface-border)]">
            {specialty.details.map((detail, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-[var(--muted)]"
              >
                <svg
                  className={`w-4 h-4 mt-0.5 flex-shrink-0 bg-gradient-to-r ${specialty.color} rounded-full p-0.5 text-white`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {detail}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Toggle indicator */}
        <div className="flex items-center gap-2 mt-4 text-xs text-[var(--primary-light)]">
          <motion.svg
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </motion.svg>
          {expanded ? "Ver menos" : "Ver más detalles"}
        </div>
      </div>
    </motion.div>
  );
}

export default function Specialties() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="especialidades"
      ref={sectionRef}
      className="section-padding relative"
    >
      {/* Subtle background break */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(14,165,233,0.02)] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-sm text-[var(--primary-light)] font-mono tracking-widest uppercase mb-4"
          >
            Especialidades
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold"
          >
            Evaluaciones de{" "}
            <span className="gradient-text">precisión</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-[var(--muted)] mt-4 max-w-2xl mx-auto text-lg"
          >
            Herramientas gold standard internacionales para el diagnóstico del
            Trastorno del Espectro Autista, combinadas con un abordaje
            terapéutico integral.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {specialties.map((specialty, i) => (
            <SpecialtyCard key={specialty.id} specialty={specialty} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
