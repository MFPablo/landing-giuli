import { IconInstagram, IconMail, IconWhatsapp } from "./Icons";

const links = [
  {
    label: "WhatsApp",
    href: "https://wa.me/5491164369172?text=Hola%20Giuliana,%20me%20gustaría%20consultar%20por%20una%20evaluación%20diagnóstica.",
    icon: <IconWhatsapp className="w-5 h-5" />,
  },
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

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative"
      style={{
        background: "linear-gradient(160deg, #6e88a6 0%, #4c6580 85%)",
        color: "#eef1f5",
      }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-md">
            <p
              className="font-[family-name:var(--font-display)] text-2xl sm:text-[1.7rem]"
              style={{ color: "#ffffff" }}
            >
              Lic. Giuliana Covello
            </p>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "#dbe6f2" }}>
              Psicóloga Clínica · Especialista en Neurodesarrollo · Directora de
              Fundación Psico_LSA
            </p>
            <p className="mt-1 text-sm tracking-wide" style={{ color: "#c3d0dd" }}>
              M.N. 76827
            </p>
          </div>

          {/* Contact links */}
          <div className="flex items-center gap-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-200 hover:-translate-y-0.5"
                style={{
                  border: "1px solid rgba(255,255,255,0.32)",
                  color: "#eaf0f6",
                }}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
          style={{ borderTop: "1px solid rgba(255,255,255,0.16)" }}
        >
          <p className="text-xs" style={{ color: "#c3d0dd" }}>
            © {year} Lic. Giuliana Covello. Todos los derechos reservados.
          </p>
          <p className="text-xs" style={{ color: "#aebfce" }}>
            Buenos Aires, Argentina
          </p>
        </div>
      </div>
    </footer>
  );
}
