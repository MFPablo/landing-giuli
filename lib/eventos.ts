export type EstadoEvento = "proximo" | "activo" | "pasado";

export interface Evento {
  slug: string;
  titulo: string;
  descripcion: string;
  fecha: string; // ISO: "2026-05-16"
  hora: string;  // "10:00"
  imagen: string;
  estado: EstadoEvento;
}

export const eventos: Evento[] = [
  {
    slug: "evaluacion-autismo-sordera",
    titulo: "Evaluación de Autismo en la Sordera",
    descripcion: "Jornada de capacitación.",
    fecha: "2026-05-16",
    hora: "10:00",
    imagen:
      "https://res.cloudinary.com/dzje6hbhy/image/upload/v1776701731/WhatsApp_Image_2026-04-20_at_12.34.43_z5gktx.jpg",
    estado: "proximo",
  },
];

export function getProximoEvento(): Evento | undefined {
  return eventos.find((e) => e.estado === "proximo" || e.estado === "activo");
}

export function getEventoBySlug(slug: string): Evento | undefined {
  return eventos.find((e) => e.slug === slug);
}

export function formatFecha(fechaISO: string): string {
  const [year, month, day] = fechaISO.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
