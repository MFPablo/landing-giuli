import type { Metadata } from "next";
import { Inter, Outfit, Fraunces } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "./components/SmoothScrollProvider";
import A11yProvider from "./components/A11yProvider";
import AccessibilityWidget from "./components/AccessibilityWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

// Display serif for headings (Puerto sereno). Soft optical sizing for a warm,
// editorial voice. Italic axis is used for emphasis words.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT"],
});

export const metadata: Metadata = {
  title: "Lic. Giuliana Covello — Evaluación Neuropsicológica Infantil en CABA",
  description:
    "Evaluación Neuropsicológica Infantil en CABA y Buenos Aires. Diagnóstico ADOS-2 y ADI-R, neurodesarrollo y autismo (TEA). Directora de Fundación Psico_LSA. M.N. 76827.",
  keywords: [
    "psicóloga",
    "neurodesarrollo",
    "Evaluación Neuropsicológica Infantil CABA",
    "Diagnóstico ADOS-2 ADI-R Buenos Aires",
    "evaluación neuropsicológica infantil",
    "diagnóstico autismo CABA",
    "ADOS-2",
    "ADI-R",
    "autismo",
    "TEA",
    "lengua de señas argentina",
    "LSA",
    "psicóloga infantil Buenos Aires",
    "Giuliana Covello",
  ],
  openGraph: {
    title:
      "Lic. Giuliana Covello — Evaluación Neuropsicológica Infantil en CABA",
    description:
      "Diagnóstico de precisión en neurodesarrollo. Evaluaciones ADOS-2 y ADI-R en CABA y Buenos Aires. Directora de Fundación Psico_LSA.",
    type: "website",
    locale: "es_AR",
    siteName: "Lic. Giuliana Covello",
  },
  icons: {
    icon: "/favicon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Psychologist", "MedicalBusiness"],
  name: "Lic. Giuliana Covello",
  description:
    "Psicóloga clínica especialista en neurodesarrollo. Evaluación Neuropsicológica Infantil y diagnóstico ADOS-2 / ADI-R en CABA y Buenos Aires.",
  identifier: "M.N. 76827",
  medicalSpecialty: [
    "Psicología Clínica",
    "Neurodesarrollo",
    "Evaluación Neuropsicológica Infantil",
  ],
  knowsAbout: [
    "Psicología Clínica",
    "Neurodesarrollo",
    "Evaluación Neuropsicológica Infantil",
    "Trastorno del Espectro Autista",
    "ADOS-2",
    "ADI-R",
    "Lengua de Señas Argentina",
  ],
  areaServed: [
    { "@type": "City", name: "Ciudad Autónoma de Buenos Aires" },
    { "@type": "AdministrativeArea", name: "Buenos Aires" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ciudad Autónoma de Buenos Aires",
    addressRegion: "CABA",
    addressCountry: "AR",
  },
  sameAs: [
    "https://www.instagram.com/lic.giulianacovello/",
    "https://www.linkedin.com/in/giuliana-covello/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${outfit.variable} ${fraunces.variable}`}>
      <body>
        <A11yProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
          <AccessibilityWidget />
        </A11yProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
