import Image from "next/image"
import { Discord } from "./icons/Discord"

export const Navbar = () => {
  return (
    <nav className="flex justify-between items-center max-w-6xl mx-auto mt-3">
      <div className="flex items-center gap-10">
        <Image
          src="/logo_transparent.png"
          width={80}
          height={80}
          alt="Phoenix Network Logo"
          className="h-20 w-20"
        />

        <ul className="flex items-center gap-4 font-semibold text-xl">
          <li className="text-foreground/80 hover:text-foreground transition-all duration-300 cursor-pointer">
            <a>
              Inicio
            </a>
          </li>
          <li className="text-foreground/80 hover:text-foreground transition-all duration-300 cursor-pointer">
            <a>
              Tienda
            </a>
          </li>
          <li className="text-foreground/80 hover:text-foreground transition-all duration-300 cursor-pointer">
            <a>
              Kits y Rangos
            </a>
          </li>
        </ul>
      </div>

      <div className="hidden md:block">
        <a
          href="https://discord.phoenixnetwork.us"
          className="rounded-full bg-[#5865F2] hover:bg-[#5865f2ce] px-4 py-1 flex items-center gap-2 font-bold cursor-pointer text-lg"
        >
          <Discord className="w-6 h-6" />
          Discord
        </a>
      </div>
    </nav>
  )
}
