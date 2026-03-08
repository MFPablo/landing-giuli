"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const awards = [
  {
    icon: "🎤",
    title: "Congreso Internacional de Psicología — UBA",
    year: "2025",
    description: "Disertante en el XVII Congreso Internacional de Investigación y Práctica Profesional de Psicología.",
  },
  {
    icon: "🌟",
    title: "I Jornada de Salud Mental y LSA",
    year: "2025",
    description: "Organizadora y disertante principal en la jornada impulsada por la Fundación Psico_LSA.",
  },
  {
    icon: "🏛️",
    title: "Congreso Argentino de Salud Mental",
    year: "2025",
    description: "Disertante en el XVIII Congreso organizado por la Asociación Argentina de Salud Mental (AASM).",
  },
  {
    icon: "📜",
    title: "Congreso de Psicología — UNLP",
    year: "2023",
    description: "Expositora en el Congreso Internacional «A 40 años de la recuperación democrática en Argentina».",
  },
];

const marqueeItems = [
  "ADOS-2 y ADI-R",
  "Lengua de Señas Argentina (LSA)",
  "Psicoterapia Cognitiva Integrativa",
  "Evaluación Neuropsicológica",
  "Análisis Conductual Aplicado",
  "Neurodesarrollo",
  "Fundación Psico_LSA",
  "Salud Mental Inclusiva",
];

export default function Awards() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="premios"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-sm text-[var(--primary-light)] font-mono tracking-widest uppercase mb-4"
          >
            Reconocimientos
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold"
          >
            Premios y{" "}
            <span className="gradient-text-gold">distinciones</span>
          </motion.h2>
        </div>

        {/* Awards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-20">
          {awards.map((award, i) => (
            <AwardCard key={`${award.title}-${award.year}`} award={award} index={i} />
          ))}
        </div>
      </div>

      {/* Marquee banner */}
      <div className="relative py-8 bg-gradient-to-r from-[var(--surface)] via-[var(--surface-light)] to-[var(--surface)] border-y border-[var(--surface-border)]">
        <div className="overflow-hidden">
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-4 px-8 text-sm font-medium text-[var(--muted)] whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] opacity-50" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AwardCard({
  award,
  index,
}: {
  award: (typeof awards)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="glass-card glass-card-hover p-8 flex gap-5"
    >
      <div className="text-3xl flex-shrink-0">{award.icon}</div>
      <div>
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <h3 className="text-lg font-bold text-[var(--foreground)]">{award.title}</h3>
          <span className="text-xs font-mono text-[var(--primary-light)] bg-[rgba(14,165,233,0.1)] px-2 py-0.5 rounded-full">
            {award.year}
          </span>
        </div>
        <p className="text-[var(--muted)] text-sm leading-relaxed">
          {award.description}
        </p>
      </div>
    </motion.div>
  );
}
