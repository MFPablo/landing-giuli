"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { IconTrophy } from "./Icons";

const awards = [
  {
    title: "Premio Facultad de Psicología — UBA",
    year: "2023",
    description:
      "Distinción otorgada por la Facultad de Psicología de la Universidad de Buenos Aires.",
  },
  {
    title: "Premio Facultad de Psicología — UBA",
    year: "2025",
    description:
      "Distinción otorgada por la Facultad de Psicología de la Universidad de Buenos Aires.",
  },
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
            Premios y <span className="gradient-text-gold">distinciones</span>
          </motion.h2>
        </div>

        {/* Awards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {awards.map((award, i) => (
            <AwardCard key={`${award.title}-${award.year}`} award={award} index={i} />
          ))}
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
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card glass-card-hover p-6 md:p-8 flex gap-5"
    >
      <div className="w-12 h-12 rounded-xl bg-[var(--surface-light)] text-[var(--gold)] flex items-center justify-center flex-shrink-0">
        <IconTrophy className="w-6 h-6" />
      </div>
      <div>
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <h3 className="text-lg text-[var(--foreground)]">{award.title}</h3>
          <span className="text-xs font-medium text-[var(--primary-dark)] bg-[var(--surface-light)] border border-[var(--surface-border)] px-2.5 py-0.5 rounded-full">
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
