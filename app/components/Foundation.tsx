"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, target, {
        duration: 2,
        ease: "easeOut",
      });
      const unsubscribe = rounded.on("change", (v) => setDisplayValue(v));
      return () => {
        controls.stop();
        unsubscribe();
      };
    }
  }, [isInView, count, rounded, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 500, suffix: "+", label: "Evaluaciones realizadas" },
  { value: 8, suffix: "", label: "Años de experiencia" },
  { value: 50, suffix: "+", label: "Profesionales capacitados" },
];

const pillars = [
  {
    icon: "🤟",
    title: "Atención en LSA",
    text: "Primera fundación en Argentina que brinda atención psicológica en Lengua de Señas Argentina, eliminando barreras de comunicación.",
  },
  {
    icon: "📋",
    title: "Diagnóstico Accesible",
    text: "Adaptación de los instrumentos ADOS-2 y ADI-R para personas sordas e hipoacúsicas, un abordaje pionero en Latinoamérica.",
  },
  {
    icon: "🎓",
    title: "Formación de Profesionales",
    text: "Capacitación a equipos de salud en atención inclusiva y en la intersección entre discapacidad auditiva y neurodesarrollo.",
  },
];

export default function Foundation() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="fundacion"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{
            background:
              "radial-gradient(circle, var(--accent-light), transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-sm text-[var(--accent-light)] font-mono tracking-widest uppercase mb-4"
          >
            Impacto Social
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold"
          >
            Fundación{" "}
            <span className="gradient-text">Psico_LSA</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-[var(--muted)] mt-4 max-w-3xl mx-auto text-lg"
          >
            Co-fundadora desde 2022. La primera organización en
            Argentina dedicada a garantizar el acceso a la salud mental de la
            comunidad sorda a través de la lengua de señas.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-8"
          >
            <a
              href="https://www.psicolsa.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent)] text-white font-medium hover:bg-[var(--accent-hover)] transition-all group"
            >
              Visitar sitio oficial
              <svg 
                className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => {
            return (
              <PillarCard key={pillar.title} pillar={pillar} index={i} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PillarCard({
  pillar,
  index,
}: {
  pillar: (typeof pillars)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="glass-card glass-card-hover p-6 md:p-8"
    >
      <span className="text-4xl mb-4 block">{pillar.icon}</span>
      <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">{pillar.title}</h3>
      <p className="text-[var(--muted)] text-sm leading-relaxed">
        {pillar.text}
      </p>
    </motion.div>
  );
}
