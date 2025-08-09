"use client";

import Image from "next/image"
import { Copy } from "lucide-react"
import { toast } from "sonner"
import { Discord } from "../icons/Discord";
import { Youtube } from "../icons/Youtube";
import { Tiktok } from "../icons/Tiktok";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from '@gsap/react';
import { useEffect } from "react";

gsap.registerPlugin(SplitText)

const SOCIAL_BUTTONS = [
  {
    name: "Discord",
    href: "https://discord.phoenixnetwork.us",
    Icon: Discord
  },
  {
    name: "Tiktok",
    href: "https://www.tiktok.com/@phoenix._network",
    Icon: Tiktok
  },
  {
    name: "Youtube",
    href: "https://www.youtube.com/@PhoenixNetwork-j5d",
    Icon: Youtube
  },
]

export const Hero = () => {
  function ipCopy() {
    navigator.clipboard.writeText("play.phoenixnetwork.us");
    toast.success("IP copiada!", {
      className: "!text-lg"
    });
  }

  useGSAP(() => {
    const splitText = SplitText.create(".split-text", {
      type: "chars",
      splitAt: 0.5,
      onSplit: (splited) => {
        splited.chars.forEach((char, i) => {
          gsap.from(char, {
            duration: 0.5,
            opacity: 0,
            y: 30,
            ease: "power3.out",
            delay: i * 0.05,
            stagger: {
              amount: 0.2,
              from: "start"
            },
          });
        })
      }
    });

    return splitText
  }, {});


  useEffect(() => {
    const timeout = setTimeout(() => {
      document.body.classList.remove("overflow-y-hidden");
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section id="hero" className="select-none min-h-[100dvh]">
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-20 blur-xs grayscale-25">
        <Image
          src="/hero.jpeg"
          width={735}
          height={412}
          alt="Phoenix Network hero"
          className="h-full w-full object-cover z-0"
        />
      </div>

      <div className="flex flex-col-reverse lg:flex-row items-center justify-between w-7xl max-w-[99dvw] mx-auto z-10">
        <div className="flex flex-col items-center lg:items-start lg:mt-15">
          <h1 className="split-text text-3xl sm:text-5xl md:text-7xl font-bold italic">
            Phoenix Network - —
          </h1>
          <p className="split-text text-lg sm:text-xl md:text-3xl font-bold italic text-pretty">
            ¿Tienes lo que se necesita para sobrevivir?
          </p>

          <div
            onClick={ipCopy}
            className="
              mt-5 px-5 py-2 rounded-full bg-gradient-to-br from-primary/60 to-secondary/60 
              text-xl md:text-2xl font-semibold w-fit
              flex items-center gap-4 cursor-pointer hover:scale-105 transition-all duration-300
            "
          >
            play.phoenixnetwork.us

            <span className="bg-white text-primary rounded-full px-2 py-1 text-sm">
              <Copy className="w-4 h-4 stroke-3" />
            </span>
          </div>

          <div className="flex gap-3 text-lg mt-5">
            {SOCIAL_BUTTONS.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                title={`Ir a ${name}`}
              >
                <div
                  className="
                    rounded-full p-2 cursor-pointer transition-all duration-300 hover:bg-foreground/20
                    hover:scale-105
                  "
                >
                  <Icon height={24} width={24} />
                </div>
              </a>
            ))}
          </div>
        </div>

        <div>
          <Image
            src="/logo_transparent.png"
            width={500}
            height={500}
            alt="Phoenix Network"
            className="w-auto lg:w-[500px] max-w-[95dvw] max-h-[250px] lg:max-h-none lg:h-auto"
          />
        </div>
      </div>
    </section>
  )
}

