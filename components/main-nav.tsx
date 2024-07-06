"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faListAlt } from "@fortawesome/free-solid-svg-icons"
import logo from "@/lib/logo/code.png"; // Ensure the path is correct
import Image from "next/image";
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex items-center space-x-8">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Image src={logo} alt="Site Logo" width={150} height={150} className="h-8 w-8 object-contain" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <Link
          href="/"
          className={cn(
            "transition-colors hover:text-foreground/80 flex items-center space-x-2",
            pathname === "/"
              ? "text-foreground"
              : "text-foreground/60"
          )}
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
        >
          <FontAwesomeIcon icon={faListAlt} />
          <span>Problems</span>
        </Link>
      </nav>
    </div>
  )
}
