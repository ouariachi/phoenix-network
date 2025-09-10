"use client";

import { cn } from "@/lib/utils";
import { Users } from "lucide-react";
import Image from "next/image";
import type { JavaStatusResponse } from "node-mcstatus";
import { useEffect, useState } from "react";

interface Props {
  status: {
    proxy: JavaStatusResponse,
    lobby: JavaStatusResponse,
    survival: JavaStatusResponse,
    boxPvp: JavaStatusResponse,
    skyBlock: JavaStatusResponse,
  }
}

const STEPS = [
  {
    title: "Phoenix Network",
    description: "Entra en el reino del fénix, donde cada partida es una nueva oportunidad de renacer y demostrar tu poder. ¿Listo para dejar tu huella en la historia?",
    image: "/logo.jpeg",
    key: "proxy",
  },
  {
    title: "Survival",
    description: "Forja tu leyenda en un mundo salvaje sin límites. Construye, explora y sobrevive mientras el peligro acecha en cada esquina… solo los más fuertes prosperarán.",
    image: "/logo.jpeg",
    key: "survival",
  },
  {
    title: "BoxPVP",
    description: "Entra en la arena del Fénix y demuestra quién manda. Combates intensos, reflejos al límite y solo un ganador… ¿serás tú el próximo campeón?",
    image: "/logo.jpeg",
    key: "boxPvp",
  },
  {
    title: "SkyBlock",
    description: "Desde una pequeña isla suspendida en el cielo, construye tu imperio. Conquista los cielos, desafía la gravedad y demuestra que no hay límites para un verdadero Phoenix.",
    image: "/logo.jpeg",
    key: "skyBlock",
  },
  {
    title: "Gens",
    description: "Conviértete en un magnate del cielo. Crea generadores, acumula riquezas y domina el mercado… el imperio más poderoso será digno del Fénix.",
    image: "/logo.jpeg",
    key: "lobby",
  }
]

export const ServerStatusClient = ({ status }: Props) => {
  const totalSteps = STEPS.length;
  const [stepCount, setStepCount] = useState(0);
  const [actualStep, setActualStep] = useState<typeof STEPS[number]>(STEPS[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepCount((prev) => prev + 1);
    }, 6000);

    return () => clearInterval(interval);
  }, [totalSteps, status]);

  useEffect(() => {
    const currentStepIndex = stepCount % totalSteps;
    setActualStep(STEPS[currentStepIndex]);
  }, [stepCount, totalSteps]);

  return (
    <section className="relative flex flex-col items-center py-30">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5">
        Prueba nuestras modalidades
      </h1>

      <div className="flex items-center justify-center gap-5 mb-5">
        {STEPS.map(({ title, image, key }) => (
          <Image
            key={key}
            src={image}
            width={100}
            height={100}
            alt={title}
            className={cn(
              "w-16 aspect-square rounded-full border-2 border-foreground object-cover transition-all duration-300 scale-100",
              actualStep.key === key && "scale-120",
            )}
          />
        ))}
      </div>

      <div className="flex items-center gap-2">
        <h2
          className="
            text-lg sm:text-xl md:text-3xl font-bold italic text-pretty
            bg-gradient-to-r from-primary to-secondary w-fit px-3 py-1 rounded-full
            text-background
          "
        >
          {actualStep.title}
        </h2>

        <span
          className="text-lg sm:text-xl md:text-3xl font-bold italic text-pretty"
          style={{ color: status[actualStep.key as keyof typeof status].online ? "green" : "red" }}
        >
          · {status[actualStep.key as keyof typeof status].online ? " Abierto" : " Cerrado"}
        </span>
      </div>

      <p className="prose prose-invert text-xl xl:text-2xl pl-1 mt-3 font-semibold italic text-center">
        {actualStep.description}
      </p>

      <div className="flex items-center gap-2 mt-10">
        <div className="flex items-center gap-4 text-lg sm:text-xl md:text-2xl font-semibold">
          <div className="bg-gradient-to-br from-primary/60 to-secondary/60 rounded-full p-2">
            <Users className="w-8 h-8" />
          </div>
          {status[actualStep.key as keyof typeof status].players?.online ?? 0} / {status[actualStep.key as keyof typeof status].players?.max ?? 0}
        </div>
      </div>
    </section >
  )
}
