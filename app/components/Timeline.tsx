"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { IconCap, IconBrain, IconBadge, IconHospital, IconHands } from "./Icons";

const milestones = [
  {
    year: "2021",
    title: "Universidad de Buenos Aires (UBA)",
    subtitle: "Licenciatura en Psicología",
    description: "Formación de grado en la Facultad de Psicología de la UBA con orientación clínica.",
    Icon: IconCap,
  },
  {
    year: "2023",
    title: "Fundación Aigle",
    subtitle: "Especialización en Psicoterapia Cognitiva",
    description: "Carrera de Especialización en Psicoterapia Cognitiva Integrativa.",
    Icon: IconBrain,
  },
  {
    year: "2024",
    title: "Universidad Abierta Interamericana (UAI)",
    subtitle: "Diplomatura en Análisis Conductual Aplicado",
    description: "Diplomatura universitaria enfocada en los principios y técnicas del Análisis Conductual Aplicado.",
    Icon: IconCap,
  },
  {
    year: "2024",
    title: "Certificaciones Clínicas Internacionales",
    subtitle: "ADOS-2 y ADI-R",
    description: "Certificación clínica en ADOS-2 por el Lincoln Institute y certificación en ADI-R por el Weill Cornell Medical College.",
    Icon: IconBadge,
  },
  {
    year: "2025",
    title: "Universidad Abierta Interamericana (UAI)",
    subtitle: "Evaluación y Diagnóstico Neuropsicológico",
    description: "Diplomatura Universitaria enfocada en Evaluación y Diagnóstico Neuropsicológico en Niños y Adolescentes.",
    Icon: IconHospital,
  },
  {
    year: "2025",
    title: "Lincoln Institute",
    subtitle: "Certificación Oficial Avanzada en ADOS-2",
    description: "Certificación oficial avanzada en la administración e interpretación del ADOS-2 (Autism Diagnostic Observation Schedule).",
    Icon: IconBadge,
  },
  {
    year: "2025",
    title: "Instituto Villasoles",
    subtitle: "Certificación en Interpretación de Lengua de Señas Argentina (LSA)",
    description: "Certificación como intérprete de Lengua de Señas Argentina, habilitando la atención y acompañamiento de personas sordas y con hipoacusia.",
    Icon: IconHands,
  },
];

function TimelineItem({
  milestone,
  index,
}: {
  milestone: (typeof milestones)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isLeft = index % 2 === 0;
  const { Icon } = milestone;

  return (
    <div
      ref={ref}
      className={`relative flex items-center mb-16 md:mb-24 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      } flex-row`}
    >
      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={`glass-card glass-card-hover p-6 md:p-8 w-full md:w-[calc(50%-3rem)] ml-12 md:ml-0`}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-[var(--surface-light)] text-[var(--primary-dark)] flex items-center justify-center flex-shrink-0">
            <Icon className="w-6 h-6" />
          </div>
        </div>
        <h3 className="text-xl md:text-2xl text-[var(--foreground)] mb-1">
          {milestone.title}
        </h3>
        <p className="text-[var(--primary-light)] font-medium text-sm mb-3">
          {milestone.subtitle}
        </p>
        <p className="text-[var(--muted)] text-sm leading-relaxed">
          {milestone.description}
        </p>
      </motion.div>

      {/* Center dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="absolute left-3 md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full border-[3px] border-[var(--primary)] bg-[var(--surface)] z-10 shadow-[0_0_16px_rgba(94,123,153,0.35)]"
      />
    </div>
  );
}

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="trayectoria"
      ref={sectionRef}
      className="section-padding relative overflow-x-clip"
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto mb-16 md:mb-24 text-center">
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
          Formación de{" "}
          <span className="gradient-text">excelencia</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-[var(--muted)] mt-4 max-w-2xl mx-auto text-lg"
        >
          Una trayectoria construida en las instituciones más prestigiosas de
          Argentina en salud mental y neurodesarrollo.
        </motion.p>
      </div>

      {/* Timeline */}
      <div className="max-w-5xl mx-auto relative">
        {/* Vertical line */}
        <div className="timeline-line" />

        {milestones.map((milestone, i) => (
          <TimelineItem key={`${milestone.year}-${i}`} milestone={milestone} index={i} />
        ))}
      </div>
    </section>
  );
}
