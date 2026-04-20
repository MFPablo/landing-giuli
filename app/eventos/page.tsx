import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { eventos, formatFecha, type EstadoEvento } from "../../lib/eventos";

export const metadata: Metadata = {
  title: "Eventos — Lic. Giuliana Covello",
  description:
    "Eventos de Lic. Giuliana Covello. Especialista en neurodesarrollo y lengua de señas argentina.",
  openGraph: {
    title: "Eventos — Lic. Giuliana Covello",
    description: "Eventos de Lic. Giuliana Covello.",
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

export default function EventosPage() {
  const proximos = eventos.filter(
    (e) => e.estado === "proximo" || e.estado === "activo"
  );
  const pasados = eventos.filter((e) => e.estado === "pasado");

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="dot-pattern" />

      <div className="max-w-5xl mx-auto px-6 py-16 relative z-10">
        {/* Back link */}
        <Link
          href="/#agenda"
          className="inline-flex items-center gap-2 text-xs text-[var(--muted)] hover:text-[var(--primary)] transition-colors duration-300 mb-10 tracking-wide"
        >
          <svg
            className="w-3.5 h-3.5"
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

        {/* Header */}
        <div className="mb-14">
          <span className="block text-xs text-[var(--primary-light)] font-mono tracking-widest uppercase mb-3">
            Archivo
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--foreground)] font-[var(--font-display)]">
            Eventos
          </h1>
        </div>

        {/* Sección Próximos */}
        <Section
          titulo="Próximos"
          count={proximos.length}
          empty="No hay eventos próximos por el momento."
        >
          {proximos.map((evento) => (
            <EventCard key={evento.slug} evento={evento} dimmed={false} />
          ))}
        </Section>

        {/* Divider */}
        <div className="my-12 border-t border-[var(--surface-border)]" />

        {/* Sección Pasados */}
        <Section
          titulo="Pasados"
          count={pasados.length}
          empty="Aún no hay eventos pasados."
        >
          {pasados.map((evento) => (
            <EventCard key={evento.slug} evento={evento} dimmed />
          ))}
        </Section>
      </div>
    </div>
  );
}

function Section({
  titulo,
  count,
  empty,
  children,
}: {
  titulo: string;
  count: number;
  empty: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline gap-3 mb-6">
        <h2 className="text-xl font-semibold text-[var(--foreground)] font-[var(--font-display)]">
          {titulo}
        </h2>
        {count > 0 && (
          <span className="text-xs font-mono text-[var(--muted)] bg-[var(--surface-light)] border border-[var(--surface-border)] px-2 py-0.5 rounded-full">
            {count}
          </span>
        )}
      </div>

      {count === 0 ? (
        <p className="text-sm text-[var(--muted)] py-6 px-4 rounded-xl border border-dashed border-[var(--surface-border)] text-center">
          {empty}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {children}
        </div>
      )}
    </div>
  );
}

function EventCard({
  evento,
  dimmed,
}: {
  evento: { slug: string; titulo: string; descripcion: string; fecha: string; hora: string; imagen: string; estado: EstadoEvento };
  dimmed: boolean;
}) {
  const badge = estadoBadge[evento.estado];

  return (
    <Link
      href={`/eventos/${evento.slug}`}
      className={`glass-card glass-card-hover group flex flex-col overflow-hidden transition-opacity duration-300 ${
        dimmed ? "opacity-60 hover:opacity-85" : ""
      }`}
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src={evento.imagen}
          alt={`Flyer: ${evento.titulo}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Badge sobre imagen */}
        <span
          className={`absolute top-3 left-3 text-xs font-mono px-2.5 py-0.5 rounded-full backdrop-blur-sm ${badge.className}`}
        >
          {badge.label}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        <h3 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors line-clamp-2 leading-snug">
          {evento.titulo}
        </h3>
        <p className="text-sm text-[var(--muted)] line-clamp-2 leading-relaxed flex-1">
          {evento.descripcion}
        </p>
        <div className="flex items-center gap-3 pt-2 border-t border-[var(--surface-border)] mt-auto">
          <span className="text-xs font-mono text-[var(--muted)]">
            {formatFecha(evento.fecha)}
          </span>
          <span className="text-xs font-mono text-[var(--muted)]">
            {evento.hora} hs
          </span>
        </div>
      </div>
    </Link>
  );
}
