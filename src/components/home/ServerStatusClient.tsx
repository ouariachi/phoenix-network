"use client";

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
  const gapDegrees = 360 / totalSteps;
  const [stepCount, setStepCount] = useState(0);
  const [actualStep, setActualStep] = useState<typeof STEPS[number]>(STEPS[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepCount((prev) => prev + 1);
    }, 6000);

    console.log(status)

    return () => clearInterval(interval);
  }, [totalSteps]);

  useEffect(() => {
    const currentStepIndex = stepCount % totalSteps;
    setActualStep(STEPS[currentStepIndex]);
  }, [stepCount, totalSteps]);

  return (
    <section className="relative min-h-[100dvh] flex items-center">
      <div className="flex items-start justify-between gap-10 w-full px-20">
        <div
          className="
            relative w-[500px] aspect-square rounded-full border-4 border-white duration-800
            bg-gradient-to-br from-primary/20 to-secondary/20
          "
          style={{ transform: `rotate(${(stepCount * gapDegrees) % (360 * 100)}deg)` }} // Delays backward rotation by allowing 100 full rotations before resetting to 0
        >
          {STEPS.map((step, i) => {
            const angle = i * gapDegrees - 90;
            const distanceFromCenter = 240;
            const x = distanceFromCenter * Math.cos((angle * Math.PI) / 180);
            const y = distanceFromCenter * Math.sin((angle * Math.PI) / 180);

            return (
              <div
                key={step.key}
                className="absolute flex flex-col items-center"
                style={{
                  top: `calc(50% + ${y}px)`,
                  left: `calc(50% + ${x}px)`,
                  transform: "translate(-50%, -50%)",
                  width: "100px",
                }}
              >
                <Image
                  src={step.image}
                  alt={step.title}
                  width={100}
                  height={100}
                  className="w-20 h-20 rounded-full object-cover border-2 border-white pointer-events-none select-none transition-transform duration-800"
                  draggable={false}
                  style={{
                    transform: `rotate(-${(stepCount * gapDegrees) % (360 * 100)}deg)`,
                  }}
                />
              </div>
            );
          })}
        </div>

        <div className="flex-1">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-20">
            Prueba nuestras modalidades
          </h1>

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

          <p className="prose prose-invert text-2xl pl-1 mt-3 font-semibold italic">
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
        </div>
      </div>
    </section>
  )
}
