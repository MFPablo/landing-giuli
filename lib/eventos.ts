export type EstadoEvento = "proximo" | "activo" | "pasado";

export interface Evento {
  slug: string;
  titulo: string;
  descripcion: string;
  fecha: string; // ISO: "2026-05-16"
  hora?: string;  // "10:00" — opcional si aún no está definida
  imagen: string;
  estado: EstadoEvento;
  link?: string; // URL de inscripción
}

export const eventos: Evento[] = [
  {
    slug: "ateneo-clinico-salud-mental-lsa",
    titulo: "Ateneo Clínico 2026 — Salud Mental y LSA",
    descripcion:
      "Clínica de niños: ¿los mapadres entran a la sesión? Virtual. Actividad gratuita para miembros de la Fundación.",
    fecha: "2026-09-12",
    hora: "12:00",
    imagen:
      "https://res.cloudinary.com/djbd7h9mr/image/upload/v1787328789/nuevo_ateneo.jpg",
    estado: "proximo",
    link: "https://psicolsa.com.ar/formacion/ateneos-clinicos/",
  },
  {
    slug: "jornada-salud-mental-lsa",
    titulo: "2° Jornada de Salud Mental en LSA",
    descripcion:
      "Sordera e hipoacusia, desafíos de la práctica. Presencial: Casa Hogar, Gascón 1155, CABA.",
    fecha: "2026-10-24",
    imagen:
      "https://res.cloudinary.com/djbd7h9mr/image/upload/v1787328789/nueva_jornada.jpg",
    estado: "proximo",
  },
  {
    slug: "evaluacion-autismo-sordera",
    titulo: "Evaluación de Autismo en la Sordera",
    descripcion: "Jornada de capacitación.",
    fecha: "2026-05-16",
    hora: "10:00",
    imagen:
      "https://res.cloudinary.com/dzje6hbhy/image/upload/v1776701731/WhatsApp_Image_2026-04-20_at_12.34.43_z5gktx.jpg",
    estado: "pasado",
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

/** Día + mes abreviado para el medallón de fecha de las cards. */
export function fechaCorta(fechaISO: string): { dia: string; mes: string } {
  const [year, month, day] = fechaISO.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const mes = date
    .toLocaleDateString("es-AR", { month: "short" })
    .replace(".", "")
    .toUpperCase();
  return { dia: String(day), mes };
}
