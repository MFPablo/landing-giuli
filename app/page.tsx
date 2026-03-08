import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Timeline from "./components/Timeline";
import Specialties from "./components/Specialties";
import Foundation from "./components/Foundation";
import Awards from "./components/Awards";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Timeline />
      <Specialties />
      <Foundation />
      <Awards />
      <Contact />
    </main>
  );
}
