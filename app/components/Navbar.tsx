"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "Especialidades", href: "#especialidades" },
  { label: "Proceso", href: "#proceso" },
  { label: "Agenda", href: "#agenda" },
  { label: "Trayectoria", href: "#trayectoria" },
  { label: "Premios", href: "#premios" },
  { label: "Congresos", href: "#congresos" },
  { label: "Fundación", href: "#fundacion" },
  { label: "FAQ", href: "#faq" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/")) {
      router.push(href);
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const atTop = !scrolled;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[var(--nav-bg)] backdrop-blur-xl border-b border-[var(--surface-border)] shadow-lg shadow-black/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#hero");
            }}
            className="text-xl tracking-tight font-[family-name:var(--font-fraunces)] shrink-0"
          >
            <span className={atTop ? "text-[#1f2934]" : "logo-name"}>Giuliana</span>{" "}
            <span className={atTop ? "text-[#1f2934]" : "text-[var(--foreground)]"}>Covello</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-4 lg:gap-5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`text-[13px] transition-colors duration-300 relative group whitespace-nowrap ${
                    atTop
                      ? "text-[#1f2934]/85 hover:text-[#1f2934]"
                      : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-300 ${
                      atTop ? "bg-[#1f2934]" : "bg-[var(--primary)]"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* Right side: split pill — CTA (3/4) + theme toggle (1/4) */}
          <div
            className="hidden md:flex items-stretch rounded-full overflow-hidden shrink-0"
            style={{
              background: "var(--cta-bg)",
              boxShadow: "0 14px 26px -14px rgba(71,97,124,0.8)",
            }}
          >
            <a
              href="#contacto"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#contacto");
              }}
              className="flex items-center pl-5 pr-4 py-2.5 text-[13px] font-semibold text-[#f6f2ea] transition-colors duration-200 hover:bg-[var(--cta-hover)]"
            >
              Solicitar Turno
            </a>
            <span className="w-px my-2 self-stretch" style={{ background: "rgba(255,255,255,0.3)" }} />
            <ThemeToggle className="relative flex items-center justify-center w-11 text-[var(--toggle-icon)] bg-[var(--toggle-seg)] transition-colors duration-200 hover:bg-[var(--toggle-seg-hover)] cursor-pointer" />
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className={`block w-6 h-[2px] origin-center ${
                  atTop && !mobileOpen ? "bg-[#1f2934]" : "bg-[var(--hamburger-color)]"
                }`}
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className={`block w-6 h-[2px] ${
                  atTop && !mobileOpen ? "bg-[#1f2934]" : "bg-[var(--hamburger-color)]"
                }`}
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className={`block w-6 h-[2px] origin-center ${
                  atTop && !mobileOpen ? "bg-[#1f2934]" : "bg-[var(--hamburger-color)]"
                }`}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[var(--mobile-bg)] backdrop-blur-2xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-2xl font-semibold text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <a
              href="#contacto"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#contacto");
              }}
              className="btn-glow mt-4"
            >
              Solicitar Turno
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
