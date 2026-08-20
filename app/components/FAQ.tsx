"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const faqs = [
  {
    q: "¿Cuántas sesiones requiere el proceso completo?",
    a: "En general el proceso abarca entre 3 y 5 encuentros: la anamnesis con la familia, una o dos sesiones de evaluación presencial con el niño/a, y la sesión de devolución con entrega del informe. El número exacto se ajusta a cada caso.",
  },
  {
    q: "¿El informe emitido es válido para la escuela, médicos u obra social/prepaga?",
    a: "Sí. Se entrega un informe escrito detallado, firmado y con matrícula profesional (M.N. 76827), válido para presentar en instituciones educativas, profesionales de la salud y obras sociales o prepagas.",
  },
  {
    q: "¿Cómo funciona la modalidad de reintegro en prepagas u obras sociales?",
    a: "La atención es de modalidad particular. Se entrega factura y la documentación necesaria para gestionar el reintegro que corresponda según tu cobertura. Te orientamos en el proceso, si bien el porcentaje de reintegro depende de cada obra social o prepaga.",
  },
];

function FaqItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const btnId = `faq-btn-${index}`;
  const panelId = `faq-panel-${index}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="glass-card overflow-hidden"
    >
      <h3 className="m-0">
        <button
          id={btnId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-inset rounded-[1.25rem]"
        >
          <span className="text-base md:text-lg font-semibold text-[var(--foreground)]">
            {faq.q}
          </span>
          <motion.svg
            aria-hidden="true"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-5 h-5 flex-shrink-0 text-[var(--primary)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="panel"
            id={panelId}
            role="region"
            aria-labelledby={btnId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-5 md:px-6 pb-5 md:pb-6 text-[var(--muted)] text-sm md:text-base leading-relaxed">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" ref={sectionRef} className="section-padding relative">
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-14 md:mb-16">
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
            Resolvemos tus{" "}
            <span className="gradient-text">dudas</span>
          </motion.h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FaqItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
