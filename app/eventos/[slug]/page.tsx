import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  eventos,
  getEventoBySlug,
  formatFecha,
  type EstadoEvento,
} from "../../../lib/eventos";
import EventoLightbox from "../../components/EventoLightbox";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return eventos.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const evento = getEventoBySlug(slug);
  if (!evento) return {};

  return {
    title: `${evento.titulo} — Lic. Giuliana Covello`,
    description: evento.descripcion,
    openGraph: {
      title: evento.titulo,
      description: evento.descripcion,
      type: "website",
      locale: "es_AR",
      images: [
        {
          url: evento.imagen,
          width: 800,
          height: 1000,
          alt: evento.titulo,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: evento.titulo,
      description: evento.descripcion,
      images: [evento.imagen],
    },
  };
}

const estadoBadge: Record<EstadoEvento, { label: string; className: string }> =
  {
    proximo: {
      label: "Próximo evento",
      className:
        "bg-[rgba(14,165,233,0.12)] text-[var(--primary-light)] border border-[var(--surface-border)]",
    },
    activo: {
      label: "En curso",
      className:
        "bg-[rgba(6,182,212,0.12)] text-[var(--accent-light)] border border-[var(--surface-border)]",
    },
    pasado: {
      label: "Evento pasado",
      className:
        "bg-[var(--surface-light)] text-[var(--muted)] border border-[var(--surface-border)]",
    },
  };

export default async function EventoPage({ params }: Props) {
  const { slug } = await params;
  const evento = getEventoBySlug(slug);
  if (!evento) notFound();

  const badge = estadoBadge[evento.estado];

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="dot-pattern" />

      <div className="max-w-2xl mx-auto px-6 py-16 relative z-10">
        {/* Back links */}
        <div className="flex items-center gap-4 mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors duration-300"
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
          <span className="text-[var(--surface-border)]">/</span>
          <Link
            href="/eventos"
            className="text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors duration-300"
          >
            Eventos
          </Link>
        </div>

        {/* Badge + title */}
        <div className="mb-8">
          <span
            className={`inline-block text-xs font-mono px-2.5 py-0.5 rounded-full mb-4 ${badge.className}`}
          >
            {badge.label}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-4">
            {evento.titulo}
          </h1>
          <p className="text-[var(--muted)] leading-relaxed">
            {evento.descripcion}
          </p>
        </div>

        {/* Date/time */}
        <div className="flex items-center gap-3 flex-wrap mb-10">
          <span className="inline-flex items-center gap-1.5 text-sm font-mono text-[var(--primary-light)] bg-[rgba(14,165,233,0.1)] border border-[var(--surface-border)] px-3 py-1 rounded-full">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {formatFecha(evento.fecha)}
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm font-mono text-[var(--accent-light)] bg-[rgba(6,182,212,0.08)] border border-[var(--surface-border)] px-3 py-1 rounded-full">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {evento.hora} hs
          </span>
        </div>

        {/* Flyer */}
        <div className="flex justify-center mb-10">
          <EventoLightbox
            src={evento.imagen}
            alt={`Flyer: ${evento.titulo} — ${formatFecha(evento.fecha)}`}
          />
        </div>

        {/* CTA */}
        {evento.estado !== "pasado" && (
          <div className="flex justify-center">
            <a href="/#contacto" className="btn-glow">
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
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Consultá tu lugar
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
