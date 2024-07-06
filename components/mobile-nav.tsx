"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBars,
  faTimes,
  faHome,
  faListAlt,
} from "@fortawesome/free-solid-svg-icons"
import { cn } from "@/lib/utils"

export function MobileNav() {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <div className="md:hidden flex items-center space-x-2 relative">
      <button
        className="text-foreground"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="lg" />
      </button>
      <div className="bg-background">
        {menuOpen && (
          <div className="absolute -top-5 w-full p-4 flex flex-col space-y-4 z-50">
            <Link
              href="/"
              className={cn(
                "transition-colors hover:text-foreground/80 flex items-center space-x-2",
                pathname === "/" ? "text-foreground" : "text-foreground/60"
              )}
              onClick={toggleMenu}
            >
              <FontAwesomeIcon icon={faHome} />
              <span>Home</span>
            </Link>
            <Link
              href="/problems"
              className={cn(
                "transition-colors hover:text-foreground/80 flex items-center space-x-2",
                pathname?.startsWith("/problems")
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
              onClick={toggleMenu}
            >
              <FontAwesomeIcon icon={faListAlt} />
              <span>Problems</span>
            </Link>          
          </div>
        )}
      </div>
    </div>
  )
}
