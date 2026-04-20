import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { eventos, formatFecha, type EstadoEvento } from "../../lib/eventos";

export const metadata: Metadata = {
  title: "Eventos — Lic. Giuliana Covello",
  description:
    "Archivo de eventos, jornadas y capacitaciones de Lic. Giuliana Covello. Especialista en neurodesarrollo y lengua de señas argentina.",
  openGraph: {
    title: "Eventos — Lic. Giuliana Covello",
    description:
      "Archivo de eventos, jornadas y capacitaciones de Lic. Giuliana Covello.",
    type: "website",
    locale: "es_AR",
  },
};

const estadoBadge: Record<EstadoEvento, { label: string; className: string }> =
  {
    proximo: {
      label: "Próximo",
      className:
        "bg-[rgba(14,165,233,0.12)] text-[var(--primary-light)] border border-[var(--surface-border)]",
    },
    activo: {
      label: "En curso",
      className:
        "bg-[rgba(6,182,212,0.12)] text-[var(--accent-light)] border border-[var(--surface-border)]",
    },
    pasado: {
      label: "Pasado",
      className:
        "bg-[var(--surface-light)] text-[var(--muted)] border border-[var(--surface-border)]",
    },
  };

const ordenEstado: Record<EstadoEvento, number> = {
  activo: 0,
  proximo: 1,
  pasado: 2,
};

export default function EventosPage() {
  const sorted = [...eventos].sort(
    (a, b) => ordenEstado[a.estado] - ordenEstado[b.estado]
  );

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Dot pattern */}
      <div className="dot-pattern" />

      <div className="max-w-4xl mx-auto px-6 py-16 relative z-10">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors duration-300 mb-8"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            Giuliana Covello
          </Link>

          <span className="block text-sm text-[var(--primary-light)] font-mono tracking-widest uppercase mb-3">
            Archivo
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--foreground)]">
            Eventos
          </h1>
          <p className="mt-4 text-[var(--muted)] max-w-lg">
            Jornadas, capacitaciones y presentaciones sobre neurodesarrollo y
            lengua de señas argentina.
          </p>
        </div>

        {/* Event list */}
        <div className="flex flex-col gap-6">
          {sorted.length === 0 && (
            <p className="text-[var(--muted)] text-sm py-8 text-center">
              No hay eventos disponibles por el momento.
            </p>
          )}
          {sorted.map((evento) => {
            const badge = estadoBadge[evento.estado];
            const isPasado = evento.estado === "pasado";

            return (
              <Link
                key={evento.slug}
                href={`/eventos/${evento.slug}`}
                className={`glass-card glass-card-hover group flex gap-5 p-4 sm:p-5 transition-opacity duration-300 ${
                  isPasado ? "opacity-60 hover:opacity-80" : ""
                }`}
              >
                {/* Thumbnail */}
                <div
                  className="relative flex-shrink-0 rounded-xl overflow-hidden w-20 h-[100px]"
                >
                  <Image
                    src={evento.imagen}
                    alt={`Flyer: ${evento.titulo}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col justify-center gap-2 min-w-0">
                  <span
                    className={`self-start text-xs font-mono px-2.5 py-0.5 rounded-full ${badge.className}`}
                  >
                    {badge.label}
                  </span>
                  <h2 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                    {evento.titulo}
                  </h2>
                  <p className="text-sm text-[var(--muted)] line-clamp-2">
                    {evento.descripcion}
                  </p>
                  <div className="flex items-center gap-3 flex-wrap mt-1">
                    <span className="text-xs font-mono text-[var(--muted)]">
                      {formatFecha(evento.fecha)}
                    </span>
                    <span className="text-xs font-mono text-[var(--muted)]">
                      {evento.hora} hs
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="self-center ml-auto pl-2 flex-shrink-0 text-[var(--muted)] group-hover:text-[var(--primary)] transition-colors">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
