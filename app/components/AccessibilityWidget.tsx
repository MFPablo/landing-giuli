"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useA11y } from "./A11yProvider";

function ToggleSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--surface)] ${
        checked
          ? "bg-[var(--primary)]"
          : "bg-[var(--surface-light)] border border-[var(--surface-border)]"
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const {
    fontScale,
    setFontScale,
    highContrast,
    setHighContrast,
    reduceMotion,
    setReduceMotion,
  } = useA11y();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointer = (e: MouseEvent) => {
      const t = e.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(t) &&
        buttonRef.current &&
        !buttonRef.current.contains(t)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [open]);

  const sizeBtn =
    "flex-1 py-1.5 rounded-lg border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground)] font-semibold hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)]";
  const pct = Math.round(fontScale * 100);

  return (
    <div className="fixed bottom-5 left-5 z-[60] print:hidden">
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="a11y-panel"
            role="dialog"
            aria-label="Opciones de accesibilidad"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card absolute bottom-16 left-0 w-72 max-w-[calc(100vw-2.5rem)] p-5 shadow-2xl"
          >
            <h2 className="text-base font-bold text-[var(--foreground)] mb-4 flex items-center gap-2">
              <span aria-hidden="true">♿</span> Accesibilidad
            </h2>

            {/* Text size */}
            <div className="mb-5">
              <p className="text-xs font-mono uppercase tracking-widest text-[var(--muted)] mb-2">
                Tamaño de texto
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFontScale(fontScale - 0.1)}
                  aria-label="Reducir tamaño de texto"
                  className={`${sizeBtn} text-xs`}
                >
                  A−
                </button>
                <button
                  type="button"
                  onClick={() => setFontScale(1)}
                  aria-label="Restablecer tamaño de texto"
                  className={`${sizeBtn} text-sm`}
                >
                  A
                </button>
                <button
                  type="button"
                  onClick={() => setFontScale(fontScale + 0.1)}
                  aria-label="Aumentar tamaño de texto"
                  className={`${sizeBtn} text-base`}
                >
                  A+
                </button>
                <span className="ml-1 text-xs text-[var(--muted)] tabular-nums w-10 text-right">
                  {pct}%
                </span>
              </div>
            </div>

            {/* High contrast */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="text-sm text-[var(--foreground)]">Alto contraste</span>
              <ToggleSwitch
                checked={highContrast}
                onChange={setHighContrast}
                label="Activar alto contraste"
              />
            </div>

            {/* Reduce motion */}
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-[var(--foreground)]">Reducir movimiento</span>
              <ToggleSwitch
                checked={reduceMotion}
                onChange={setReduceMotion}
                label="Reducir movimiento"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="a11y-panel"
        aria-label="Abrir opciones de accesibilidad"
        className="w-12 h-12 rounded-full bg-[var(--primary)] text-white shadow-lg flex items-center justify-center text-2xl hover:bg-[var(--primary-light)] transition-colors focus:outline-none focus:ring-4 focus:ring-[var(--primary)]/40"
      >
        <span aria-hidden="true">♿</span>
      </button>
    </div>
  );
}
