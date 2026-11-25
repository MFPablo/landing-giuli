"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { IconInstagram, IconMail } from "./Icons";

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
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Ajusta la altura del iframe de Mindora según el mensaje que envía
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      const f = iframeRef.current;
      if (
        f &&
        e.origin === "https://mindora.com.ar" &&
        e.source === f.contentWindow &&
        e.data?.type === "mindora-contacto-height"
      ) {
        f.style.height = `${e.data.height}px`;
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

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
          más información sobre las evaluaciones, no dudes en comunicarte.
        </motion.p>

        {/* Formulario de contacto (Mindora) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mb-10"
        >
          <iframe
            id="mindora-contacto"
            ref={iframeRef}
            src="https://mindora.com.ar/contacto/Ex8VXtlWyQ7EDsB1lCRZEtE8QXU6xV4U"
            title="Pedir contacto"
            loading="lazy"
            style={{ width: "100%", height: 720, border: 0 }}
          />
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
