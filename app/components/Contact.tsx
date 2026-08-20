"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { IconInstagram, IconMail, IconWhatsapp } from "./Icons";

const contactLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/lic.giulianacovello/",
    icon: <IconInstagram className="w-5 h-5" />,
  },
  {
    label: "Email",
    href: "mailto:lic.giulianacovello@gmail.com",
    icon: <IconMail className="w-5 h-5" />,
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[var(--primary)] opacity-[0.04] blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-6 h-[2px] w-11 rounded-full bg-[var(--primary)] origin-center"
        />

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl mb-6"
        >
          Comenzá tu proceso de{" "}
          <span className="gradient-text">evaluación</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-[var(--muted)] text-lg max-w-2xl mx-auto mb-10"
        >
          Si buscás un diagnóstico especializado en neurodesarrollo o querés
          más información sobre las evaluaciones ADOS-2 y ADI-R, no dudes en
          comunicarte.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <a
            href="https://wa.me/5491164369172?text=Hola%20Giuliana,%20me%20gustaría%20consultar%20por%20una%20evaluación%20diagnóstica."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow text-lg"
          >
            <IconWhatsapp className="w-5 h-5" />
            Solicitar Turno por WhatsApp
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-4"
        >
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="w-12 h-12 rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--primary-dark)] hover:border-[var(--primary)] hover:bg-[var(--surface-light)] transition-all duration-300"
            >
              {link.icon}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
