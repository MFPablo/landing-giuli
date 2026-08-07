"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Specialty = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgGlow: string;
};

const specialties: Specialty[] = [
  {
    id: "ados2",
    title: "ADOS-2",
    subtitle: "Autism Diagnostic Observation Schedule",
    description:
      "Evaluación estandarizada de referencia internacional para el diagnóstico del Trastorno del Espectro Autista. Observación directa y estructurada del comportamiento social, la comunicación y el juego.",
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
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    color: "from-purple-500 to-pink-400",
    bgGlow: "rgba(168, 85, 247, 0.1)",
  },
  {
    id: "wppsi",
    title: "WPPSI-IV",
    subtitle: "Escala Wechsler de Inteligencia para Preescolar",
    description:
      "Evaluación del funcionamiento intelectual en la primera infancia (2 años y 6 meses a 7 años y 7 meses), aportando un perfil cognitivo temprano.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.007-1.875 2.25-1.875s2.25.84 2.25 1.875c0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
      </svg>
    ),
    color: "from-emerald-500 to-teal-400",
    bgGlow: "rgba(16, 185, 129, 0.1)",
  },
  {
    id: "wisc",
    title: "WISC-V",
    subtitle: "Escala Wechsler de Inteligencia para Niños",
    description:
      "Referencia internacional para medir el CI y el perfil de aptitudes cognitivas en niños y adolescentes de 6 a 16 años.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    color: "from-amber-500 to-orange-400",
    bgGlow: "rgba(245, 158, 11, 0.1)",
  },
  {
    id: "wais",
    title: "WAIS-IV",
    subtitle: "Escala Wechsler de Inteligencia para Adultos",
    description:
      "Evaluación del funcionamiento intelectual en adolescentes y adultos, con un perfil detallado de comprensión, razonamiento, memoria y velocidad de procesamiento.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    color: "from-sky-500 to-blue-400",
    bgGlow: "rgba(14, 165, 233, 0.1)",
  },
  {
    id: "mmpi",
    title: "MMPI",
    subtitle: "Inventario Multifásico de Personalidad de Minnesota",
    description:
      "Instrumento de referencia para la evaluación de la estructura de personalidad y de indicadores psicopatológicos en adolescentes y adultos.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
      </svg>
    ),
    color: "from-rose-500 to-pink-400",
    bgGlow: "rgba(244, 63, 94, 0.1)",
  },
  {
    id: "vineland",
    title: "Vineland",
    subtitle: "Escala de Conducta Adaptativa de Vineland",
    description:
      "Mide la conducta adaptativa —comunicación, habilidades de la vida diaria, socialización y motricidad— clave para el diagnóstico y la planificación de apoyos.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    color: "from-fuchsia-500 to-purple-400",
    bgGlow: "rgba(217, 70, 239, 0.1)",
  },
  {
    id: "leiter",
    title: "Leiter-3",
    subtitle: "Leiter International Performance Scale",
    description:
      "Evaluación cognitiva completamente no verbal, ideal para personas con dificultades de lenguaje, comunicación o audición.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
      </svg>
    ),
    color: "from-cyan-500 to-emerald-400",
    bgGlow: "rgba(6, 182, 212, 0.1)",
  },
];

function SpecialtyCard({ specialty }: { specialty: Specialty }) {
  return (
    <div className="glass-card glass-card-hover p-6 md:p-8 relative overflow-hidden group h-full flex flex-col">
      {/* Glow background */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at 50% 0%, ${specialty.bgGlow}, transparent 70%)` }}
      />

      <div className="relative z-10 flex flex-col h-full">
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
        <p className="text-[var(--muted)] text-sm leading-relaxed">
          {specialty.description}
        </p>
      </div>
    </div>
  );
}

const AUTOPLAY_MS = 4000;

export default function Specialties() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [perView, setPerView] = useState(1);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Responsive cards-per-view
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      setPerView(w >= 1024 ? 3 : w >= 768 ? 2 : 1);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const maxIndex = Math.max(0, specialties.length - perView);

  // Keep index in range when perView changes
  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  // Autoplay
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, maxIndex]);

  const prev = () => setIndex((i) => (i <= 0 ? maxIndex : i - 1));
  const next = () => setIndex((i) => (i >= maxIndex ? 0 : i + 1));

  const offset = -(index * (100 / perView));

  return (
    <section id="especialidades" ref={sectionRef} className="section-padding relative">
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
        </div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
          role="region"
          aria-roledescription="carrusel"
          aria-label="Evaluaciones de precisión"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {/* Track viewport */}
          <div className="overflow-hidden">
            <motion.div
              className="flex flex-nowrap"
              animate={{ x: `${offset}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {specialties.map((s) => (
                <div
                  key={s.id}
                  className="flex-shrink-0 px-2 sm:px-3"
                  style={{ width: `${100 / perView}%` }}
                  aria-hidden={false}
                >
                  <SpecialtyCard specialty={s} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Arrows */}
          <button
            type="button"
            onClick={prev}
            aria-label="Evaluación anterior"
            className="absolute top-1/2 -translate-y-1/2 -left-2 sm:-left-4 lg:-left-6 w-11 h-11 rounded-full glass-card flex items-center justify-center text-[var(--foreground)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] z-20"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Evaluación siguiente"
            className="absolute top-1/2 -translate-y-1/2 -right-2 sm:-right-4 lg:-right-6 w-11 h-11 rounded-full glass-card flex items-center justify-center text-[var(--foreground)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] z-20"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ir al grupo ${i + 1}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all ${
                  i === index
                    ? "w-6 bg-[var(--primary)]"
                    : "w-2 bg-[var(--surface-border)] hover:bg-[var(--primary-light)]"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
