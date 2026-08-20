"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { IconMic, IconStar, IconLandmark, IconScroll } from "./Icons";

const congresos = [
  {
    Icon: IconMic,
    title: "Congreso Internacional de Psicología — UBA",
    year: "2025",
    description:
      "Disertante en el XVII Congreso Internacional de Investigación y Práctica Profesional de Psicología.",
  },
  {
    Icon: IconStar,
    title: "I Jornada de Salud Mental y LSA",
    year: "2025",
    description:
      "Organizadora y disertante principal en la jornada impulsada por la Fundación Psico_LSA.",
  },
  {
    Icon: IconLandmark,
    title: "Congreso Argentino de Salud Mental",
    year: "2025",
    description:
      "Disertante en el XVIII Congreso organizado por la Asociación Argentina de Salud Mental (AASM).",
  },
  {
    Icon: IconScroll,
    title: "Congreso de Psicología — UNLP",
    year: "2023",
    description:
      "Expositora en el Congreso Internacional «A 40 años de la recuperación democrática en Argentina».",
  },
];

function CongresoCard({
  congreso,
  index,
}: {
  congreso: (typeof congresos)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const { Icon } = congreso;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card glass-card-hover p-6 md:p-8 flex gap-5"
    >
      <div className="w-12 h-12 rounded-xl bg-[var(--surface-light)] text-[var(--primary-dark)] flex items-center justify-center flex-shrink-0">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <h3 className="text-lg text-[var(--foreground)]">{congreso.title}</h3>
          <span className="text-xs font-medium text-[var(--primary-dark)] bg-[var(--surface-light)] border border-[var(--surface-border)] px-2.5 py-0.5 rounded-full">
            {congreso.year}
          </span>
        </div>
        <p className="text-[var(--muted)] text-sm leading-relaxed">
          {congreso.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Congresos() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="congresos"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
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
            Congresos y <span className="gradient-text">jornadas</span>
          </motion.h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {congresos.map((congreso, i) => (
            <CongresoCard key={`${congreso.title}-${congreso.year}`} congreso={congreso} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
