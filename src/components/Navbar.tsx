import Image from "next/image"
import { Discord } from "./icons/Discord"
import Link from "next/link"
import MainMenu from "./MainMenu"
import { SearchBar } from "./SearchBar"
import { cn } from "@/lib/utils"

interface NavbarProps {
  searchBar?: boolean
  onSearch?: (value: string) => void
}

export const Navbar = ({ searchBar, onSearch }: NavbarProps) => {
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
      name: "Foro",
      href: "/foro"
    }
  ];

  return (
    <nav>
      <div className="flex justify-between items-center mx-auto mt-3 px-10">
        <div className="flex items-center gap-10">
          <div className="hidden md:block">
            <Image
              src="/logo_transparent.png"
              width={60}
              height={60}
              alt="Phoenix Network Logo"
              className="h-15 w-15"
            />
          </div>

          <ul className="items-center gap-4 font-medium text-lg hidden md:flex">
            {NAV_ITEMS.map(({ name, href }) => (
              <li key={name} className="text-foreground/80 hover:text-foreground transition-all duration-300 cursor-pointer">
                <Link href={href}>{name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {searchBar && (
          <SearchBar className="grow max-w-[600px] mx-4 hidden xl:block" onSearch={onSearch} />
        )}

        <div className="hidden md:block">
          <a
            href="https://discord.phoenixnetwork.us"
            className="rounded-full bg-[#5865F2] hover:bg-[#5865f2ce] px-4 py-1 flex items-center gap-2 font-bold cursor-pointer text-lg transition-all duration-300"
          >
            <Discord className="w-6 h-6" />
            Discord
          </a>
        </div>

        <div className="md:hidden">
          <div className="fixed top-4 right-5 z-20 transition-all">
            <MainMenu links={NAV_ITEMS} />
          </div>
        </div>
      </div>

      <div
        className={cn(
          "h-0 overflow-hidden transition-all duration-300 ease-in-out pt-3 px-10",
          searchBar && "h-14 xl:h-0 xl:opacity-0"
        )}
      >
        <SearchBar className="" onSearch={onSearch} />
      </div>
    </nav>
  )
}
