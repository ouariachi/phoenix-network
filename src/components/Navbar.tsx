import Image from "next/image"
import { Discord } from "./icons/Discord"
import Link from "next/link"

export const Navbar = () => {
  const NAV_ITEMS = [
    {
      name: "Inicio",
      href: "/"
    },
    {
      name: "Tienda",
      href: "https://shop.phoenixnetwork.us"
    },
    {
      name: "Kits y Rangos",
      href: "/kits"
    }
  ]

  return (
    <nav className="flex justify-between items-center mx-auto mt-3 px-10">
      <div className="flex items-center gap-10">
        <Image
          src="/logo_transparent.png"
          width={60}
          height={60}
          alt="Phoenix Network Logo"
          className="h-15 w-15"
        />

        <ul className="flex items-center gap-4 font-medium text-lg">
          {NAV_ITEMS.map(({ name, href }) => (
            <li key={name} className="text-foreground/80 hover:text-foreground transition-all duration-300 cursor-pointer">
              <Link href={href}>{name}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="hidden md:block">
        <a
          href="https://discord.phoenixnetwork.us"
          className="rounded-full bg-[#5865F2] hover:bg-[#5865f2ce] px-4 py-1 flex items-center gap-2 font-bold cursor-pointer text-lg transition-all duration-300"
        >
          <Discord className="w-6 h-6" />
          Discord
        </a>
      </div>
    </nav>
  )
}
