"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";

const titleLetters = "Giuliana Covello".split("");

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 80, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.5 + i * 0.04,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const subtitleVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 1.4, duration: 0.8, ease: "easeOut" as const },
  },
};

const ctaVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { delay: 1.8, duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background mesh */}
      <div className="mesh-gradient" />

      {/* Floating particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[var(--primary-light)]"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.2 + 0.05,
              animation: `particle-float ${Math.random() * 10 + 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        {/* Credential badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--surface-border)] bg-[var(--nav-bg)] backdrop-blur-sm mb-8 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
          <span className="text-sm text-[var(--foreground)] font-medium opacity-80">
            M.N. 76827 · Psicóloga Clínica
          </span>
        </motion.div>

        {/* Kinetic title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[0.95] flex flex-wrap justify-center gap-x-[0.3em] gap-y-2">
          {["Giuliana", "Covello"].map((word, wordIndex) => (
            <span key={wordIndex} className="whitespace-nowrap flex">
              {word.split("").map((letter, i) => {
                const totalIndex = wordIndex === 0 ? i : "Giuliana ".length + i;
                return (
                  <motion.span
                    key={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    custom={totalIndex}
                    className={`inline-block ${
                      totalIndex < 8 ? "gradient-text" : "text-[var(--foreground)]"
                    }`}
                    style={{ perspective: "600px" }}
                  >
                    {letter}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
          className="text-lg sm:text-xl md:text-2xl text-[var(--muted)] max-w-3xl mx-auto mb-4 leading-relaxed"
        >
          Diagnóstico de precisión en{" "}
          <span className="text-[var(--foreground)] font-semibold">neurodesarrollo</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="text-base sm:text-lg text-[var(--muted)] max-w-2xl mx-auto mb-10"
        >
          Especialista en evaluaciones{" "}
          <span className="text-[var(--primary-light)] font-medium whitespace-nowrap">ADOS-2</span> y{" "}
          <span className="text-[var(--primary-light)] font-medium whitespace-nowrap">ADI-R</span>
        </motion.p>

        <motion.div
          variants={ctaVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#contacto" className="btn-glow text-lg">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Solicitar Evaluación Diagnóstica
          </a>
          <a
            href="#trayectoria"
            className="group inline-flex items-center gap-2 px-6 py-3 text-[var(--muted)] hover:text-white transition-colors duration-300 text-base"
          >
            Conocer más
            <svg
              className="w-4 h-4 group-hover:translate-y-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
      >
        <div className="w-6 h-10 rounded-full border-2 border-[var(--surface-border)] flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 rounded-full bg-[var(--primary)]"
          />
        </div>
      </motion.div>
    </section>
  );
}
