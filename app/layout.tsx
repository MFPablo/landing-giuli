import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "./components/SmoothScrollProvider";

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

export const metadata: Metadata = {
  title: "Lic. Giuliana Covello — Psicóloga Especialista en Neurodesarrollo",
  description:
    "Diagnóstico de precisión en neurodesarrollo. Evaluaciones especializadas ADOS-2 y ADI-R. Directora de Fundación Psico_LSA. Experta en autismo y lengua de señas argentina.",
  keywords: [
    "psicóloga",
    "neurodesarrollo",
    "ADOS-2",
    "ADI-R",
    "autismo",
    "lengua de señas",
    "LSA",
    "diagnóstico",
    "Giuliana Covello",
  ],
  openGraph: {
    title: "Lic. Giuliana Covello — Psicóloga Especialista en Neurodesarrollo",
    description:
      "Diagnóstico de precisión en neurodesarrollo. Evaluaciones especializadas ADOS-2 y ADI-R.",
    type: "website",
    locale: "es_AR",
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
