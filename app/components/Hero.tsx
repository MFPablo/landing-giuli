"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden px-5 sm:px-8 py-24 md:py-28"
    >
      {/* Photographic sea/sky backdrop — muted, melts into the page palette */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/photos/hero-sky.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_22%]"
          style={{ filter: "saturate(0.92) brightness(1.03)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in srgb, var(--background) 10%, transparent) 0%, transparent 26%, transparent 64%, color-mix(in srgb, var(--background) 52%, transparent) 88%, var(--background) 100%)",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease }}
        className="relative z-10 w-full max-w-6xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] rounded-[26px] overflow-hidden shadow-[0_40px_90px_-45px_rgba(44,55,66,0.5)]">
          {/* ── Left: brand panel (fixed deep-blue so cream text holds in both themes) ── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="relative flex flex-col justify-center px-8 sm:px-12 py-14 sm:py-16"
            style={{
              background: "linear-gradient(160deg, #6e88a6 0%, #4c6580 85%)",
              color: "#eef1f5",
            }}
          >
            <motion.span
              variants={rise}
              className="self-start inline-flex items-center gap-2 mb-7 rounded-full px-4 py-2 text-xs sm:text-[13px] tracking-[0.14em] uppercase"
              style={{
                border: "1px solid rgba(255,255,255,0.38)",
                color: "#eaf0f6",
              }}
            >
              <span
                className="w-[7px] h-[7px] rounded-full"
                style={{ background: "#cfe0f0" }}
              />
              M.N. 76827 · Psicóloga Clínica
            </motion.span>

            <motion.h1
              variants={rise}
              className="text-[2.35rem] leading-[1.02] sm:text-5xl lg:text-[3.6rem]"
              style={{ color: "#ffffff" }}
            >
              Diagnóstico de{" "}
              <em className="italic font-normal" style={{ color: "#dbe6f2" }}>
                precisión
              </em>{" "}
              en neurodesarrollo
            </motion.h1>

            <motion.p
              variants={rise}
              className="mt-5 text-base sm:text-lg max-w-[34ch]"
              style={{ color: "#eaf0f6" }}
            >
              Evaluaciones ADOS-2 y ADI-R, con la calma y el cuidado que cada
              familia necesita.
            </motion.p>

            <motion.p
              variants={rise}
              className="mt-4 text-sm tracking-wide"
              style={{ color: "#d0dbe6" }}
            >
              Especialista en Neurodesarrollo · Directora de Fundación Psico_LSA
            </motion.p>

            <motion.div variants={rise} className="mt-9 flex flex-wrap gap-3.5">
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold text-[15px] transition-transform duration-200 hover:-translate-y-0.5"
                style={{
                  background: "#f5f1e8",
                  color: "#47617c",
                  boxShadow: "0 14px 26px -12px rgba(0,0,0,0.4)",
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Solicitar evaluación
              </a>
              <a
                href="#trayectoria"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] transition-colors duration-200"
                style={{
                  border: "1px solid rgba(255,255,255,0.5)",
                  color: "#eaf0f6",
                }}
              >
                Conocer más
              </a>
            </motion.div>
          </motion.div>

          {/* ── Right: portrait over the real sea backdrop ── */}
          <div className="relative min-h-[300px] md:min-h-full">
            {/* subtle deepen so the panel reads as its own stretch of sea */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(70,97,124,0.10) 0%, rgba(47,71,96,0.32) 100%)",
              }}
            />
            {/* portrait frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.35, ease }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[210px] h-[264px] rounded-2xl overflow-hidden"
              style={{
                border: "5px solid #f5f1e8",
                boxShadow: "0 24px 48px -20px rgba(30,45,60,0.6)",
              }}
            >
              <Image
                src="/photos/profile.jpeg"
                alt="Retrato de la Lic. Giuliana Covello"
                fill
                priority
                sizes="210px"
                className="object-cover object-[50%_22%]"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
