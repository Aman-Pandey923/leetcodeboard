import { ModeToggle } from "@/components/mode-toggle"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { LogOutButton } from "@/components/custom/LogOutButton"
import SignInButton from "@/components/custom/SignInButton"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/lib/firebase/crud"

export function SiteHeader() {
  const [user] = useAuthState(auth)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <div className="pr-32">
          <MobileNav />
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            <div className="flex space-x-4">
              <ModeToggle />
              {user ? <LogOutButton /> : <SignInButton />}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
