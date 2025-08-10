"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Link {
  name: string;
  href: string;
}

const MainMenu = ({ links }: { links: Link[] }) => {
  const [open, setOpen] = useState(false);
  const topBarRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (force?: boolean) => {
    setOpen((prev) => (typeof force === "boolean" ? force : !prev));
  };

  useEffect(() => {
    const topBar = topBarRef.current;
    const bottomBar = bottomBarRef.current;

    if (!topBar || !bottomBar) return;

    topBar.classList.toggle("rotate-45", open);
    topBar.classList.toggle("translate-x-[7px]", open);
    topBar.classList.toggle("translate-y-[7.3px]", open);

    bottomBar.classList.toggle("-rotate-45", open);
    bottomBar.classList.toggle("translate-x-[7px]", open);
    bottomBar.classList.toggle("translate-y-[-7.3px]", open);
  }, [open]);

  return (
    <div>
      {/* Botón hamburguesa */}
      <div
        id="hamburger-button"
        role="button"
        aria-pressed={open}
        onClick={() => toggleMenu()}
        className={`
          relative flex flex-col justify-center items-center gap-2 z-60 w-[30px] aspect-[1.3] cursor-pointer 
          transition-all duration-200 ease-in-out
          ${open ? "translate-x-[-7px]" : ""}
        `}
      >
        <div
          ref={topBarRef}
          className="bar-top absolute w-full h-[8px] bg-white top-0 left-0 origin-center transition-all duration-200 ease-in-out"
        ></div>
        <div
          ref={bottomBarRef}
          className="bar-bottom absolute w-full h-[8px] bg-white bottom-0 left-0 origin-center transition-all duration-200 ease-in-out"
        ></div>
      </div>

      <aside
        id="main-menu"
        className={`fixed top-0 left-0 z-50 w-full h-full ${open ? "" : "pointer-events-none"}`}
      >

        <div
          id="menu-panel"
          className={`absolute top-0 right-0 z-60 w-full h-full bg-gradient-to-tr from-background to-zinc-900 
            transition-all duration-300 ease-in-out md:w-1/2
            ${open ? "translate-x-0" : "translate-x-full"}
            `}
        >
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <Image
              src="/logo_transparent.png"
              width={500}
              height={500}
              alt="Phoenix Network Logo"
              className="w-[95dvw] opacity-10"
            />
          </div>

          <div className="flex flex-col gap-8 items-center justify-center h-full p-12 text-center">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => toggleMenu(false)}
                className="
                  relative text-4xl md:text-5xl font-bold transition-all duration-300 ease-in-out 
                  after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:h-1.5 after:bg-foreground after:rounded-2xl after:w-0 
                  after:transition-all after:duration-300 hover:after:w-full
                "
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default MainMenu;
