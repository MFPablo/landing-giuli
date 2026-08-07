"use client";

import { MotionConfig } from "framer-motion";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export const FONT_MIN = 0.85;
export const FONT_MAX = 1.4;

type A11yContextValue = {
  fontScale: number;
  setFontScale: (v: number) => void;
  highContrast: boolean;
  setHighContrast: (v: boolean) => void;
  reduceMotion: boolean;
  setReduceMotion: (v: boolean) => void;
};

const A11yContext = createContext<A11yContextValue | null>(null);

export function useA11y() {
  const ctx = useContext(A11yContext);
  if (!ctx) throw new Error("useA11y must be used within A11yProvider");
  return ctx;
}

const clamp = (v: number) => Math.min(FONT_MAX, Math.max(FONT_MIN, v));

/**
 * Provides accessibility preferences (text size, high contrast, reduced motion)
 * and wraps the app in Framer's MotionConfig so the reduce-motion toggle
 * neutralizes existing animations globally without editing each component.
 * Preferences persist in localStorage; attributes/vars are applied to <html>.
 */
export default function A11yProvider({ children }: { children: ReactNode }) {
  const [fontScale, setFontScaleState] = useState(1);
  const [highContrast, setHighContrastState] = useState(false);
  const [reduceMotion, setReduceMotionState] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load persisted prefs after mount (avoids hydration mismatch).
  useEffect(() => {
    try {
      const fs = parseFloat(localStorage.getItem("a11y-font-scale") ?? "1");
      if (!Number.isNaN(fs)) setFontScaleState(clamp(fs));
      setHighContrastState(localStorage.getItem("a11y-contrast") === "high");
      setReduceMotionState(localStorage.getItem("a11y-reduce-motion") === "true");
    } catch {
      /* localStorage unavailable — keep defaults */
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.style.setProperty("--a11y-font-scale", String(fontScale));
    try {
      localStorage.setItem("a11y-font-scale", String(fontScale));
    } catch {}
  }, [fontScale, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (highContrast) root.setAttribute("data-contrast", "high");
    else root.removeAttribute("data-contrast");
    try {
      localStorage.setItem("a11y-contrast", highContrast ? "high" : "normal");
    } catch {}
  }, [highContrast, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (reduceMotion) root.setAttribute("data-reduce-motion", "true");
    else root.removeAttribute("data-reduce-motion");
    try {
      localStorage.setItem("a11y-reduce-motion", String(reduceMotion));
    } catch {}
  }, [reduceMotion, mounted]);

  const value: A11yContextValue = {
    fontScale,
    setFontScale: (v) => setFontScaleState(clamp(v)),
    highContrast,
    setHighContrast: setHighContrastState,
    reduceMotion,
    setReduceMotion: setReduceMotionState,
  };

  return (
    <A11yContext.Provider value={value}>
      <MotionConfig reducedMotion={reduceMotion ? "always" : "user"}>
        {children}
      </MotionConfig>
    </A11yContext.Provider>
  );
}
