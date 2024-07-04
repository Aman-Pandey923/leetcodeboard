"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/lib/firebase/crud"
import { useRouter } from "next/navigation"
import { signOut } from "firebase/auth"

export default function Home() {
  const [user] = useAuthState(auth)
  const router = useRouter()
  const [userSession, setUserSession] = useState<string | null>(null)

  useEffect(() => {
    const session = sessionStorage.getItem("user")
    setUserSession(session)

    if (!user && !session) {
      router.push("/sign-in")
    }
  }, [user, router])

  useEffect(() => {
    if (!user && userSession === null) {
      router.push("/sign-in")
    }
  }, [user, userSession, router])

  console.log({ user })

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden py-6 sm:py-12">
      <div className="relative px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
        <div className="flex space-x-4">
          <Button> Hello </Button>
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}

export function LogOutButton() {
  return (
    <Button className="px-6 py-2 bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 rounded-lg shadow-md transition duration-150 ease-in-out transform hover:scale-105"
      onClick={() => {
        signOut(auth)
        sessionStorage.removeItem("user")
      }}
    >
      Log Out
    </Button>
  )
}