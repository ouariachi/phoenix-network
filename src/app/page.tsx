import { Hero } from "@/components/home/Hero";
import { ServerStatus } from "@/components/home/ServerStatus";
import { TheTeam } from "@/components/home/TheTeam";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <main className="select-none">
      <Navbar />
      <Hero />
      <ServerStatus />
      <TheTeam />
    </main>
  );
}

/**
 * Staff
 * Colaboraciones
 * Sobre el servidor
 * FAQ
 * Contacto
 */