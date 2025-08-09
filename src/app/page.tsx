import { Hero } from "@/components/home/Hero";
import { ServerStatus } from "@/components/home/ServerStatus";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ServerStatus />
    </main>
  );
}
