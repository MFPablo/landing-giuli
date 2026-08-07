"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    num: "01",
    title: "Anamnesis e Historia del Desarrollo",
    text: "Entrevista inicial con la familia para reconstruir la historia del desarrollo.",
  },
  {
    num: "02",
    title: "Sesiones de Evaluación Presencial",
    text: "Administración de pruebas estandarizadas en un entorno cuidado y adaptado a cada niño/a.",
  },
  {
    num: "03",
    title: "Análisis e Informe Técnico",
    text: "Procesamiento cualitativo y cuantitativo de los resultados, integrando la observación clínica con los datos obtenidos.",
  },
  {
    num: "04",
    title: "Devolución e Informe",
    text: "Sesión final con entrega del informe escrito detallado y pautas concretas para la familia, la escuela y el equipo interdisciplinario.",
  },
];

function StepItem({
  step,
  index,
  isLast,
}: {
  step: (typeof steps)[0];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex gap-4 sm:gap-6 pb-8 last:pb-0"
    >
      {/* Connector line */}
      {!isLast && (
        <span
          aria-hidden="true"
          className="absolute left-6 top-14 -bottom-0 w-px bg-gradient-to-b from-[var(--primary)] via-[var(--accent)] to-transparent"
        />
      )}

      {/* Number badge */}
      <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-white flex items-center justify-center font-bold text-lg font-[family-name:var(--font-outfit)] shadow-lg">
        {step.num}
      </div>

      {/* Content card */}
      <div className="glass-card glass-card-hover p-5 md:p-6 flex-1">
        <h3 className="text-lg md:text-xl font-bold text-[var(--foreground)] mb-2">
          {step.title}
        </h3>
        <p className="text-[var(--muted)] text-sm md:text-base leading-relaxed">
          {step.text}
        </p>
      </div>
    </motion.div>
  );
}

export default function ProcesoDiagnostico() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="proceso"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{
            background: "radial-gradient(circle, var(--primary), transparent 70%)",
            filter: "blur(90px)",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-sm text-[var(--primary-light)] font-mono tracking-widest uppercase mb-4"
          >
            Proceso
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold"
          >
            Proceso diagnóstico{" "}
            <span className="gradient-text">paso a paso</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-[var(--muted)] mt-4 max-w-2xl mx-auto text-lg"
          >
            Un recorrido claro y acompañado, desde la primera entrevista hasta la
            entrega del informe final.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative">
          {steps.map((step, i) => (
            <StepItem
              key={step.num}
              step={step}
              index={i}
              isLast={i === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
