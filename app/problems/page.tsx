"use client"

import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/lib/firebase/crud"
import { useRouter } from "next/navigation"
import LCForm from "@/components/custom/lc-form"

const ProblemsPage = () => {
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

  return (
    <div className="relative min-h-screen flex items-center justify-center py-6 sm:py-12">
      <div className="bg-opacity-90 border rounded-lg relative px-10 pt-10 pb-8 shadow-2xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-2xl sm:rounded-lg sm:px-10">
        <h1 className="text-center text-3xl mb-5 font-bold">
          Enter Problem ID
        </h1>
        <div className="border p-5 mb-96 rounded-lg">
          <LCForm />
        </div>
      </div>
    </div>
  )
}

export default ProblemsPage
