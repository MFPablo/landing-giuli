import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Timeline from "./components/Timeline";
import Specialties from "./components/Specialties";
import Foundation from "./components/Foundation";
import Awards from "./components/Awards";
import Congresos from "./components/Congresos";
import ProximoEvento from "./components/ProximoEvento";
import ProcesoDiagnostico from "./components/ProcesoDiagnostico";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Specialties />
      <ProcesoDiagnostico />
      <ProximoEvento />
      <Timeline />
      <Awards />
      <Congresos />
      <Foundation />
      <FAQ />
      <Contact />
    </main>
  );
}
