"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname()
  const [showHeaderFooter, setShowHeaderFooter] = useState(true)

  useEffect(() => {
    setShowHeaderFooter(pathname !== "/sign-in" && pathname !== "/sign-up")
  }, [pathname])

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {showHeaderFooter && <SiteHeader />}
      {children}
      {showHeaderFooter && <SiteFooter />}
    </ThemeProvider>
  )
}

export default ClientLayout
