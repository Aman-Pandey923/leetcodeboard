"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/lib/firebase/crud"
import { useRouter } from "next/navigation"
import Notification from "@/components/custom/Notification"
import { useNotification } from "@/context/NotificationContext"
import Image from "next/image";
import logo from "@/lib/logo/code.png";

export default function Home() {
  const [user] = useAuthState(auth)
  const router = useRouter()
  const { notification, setNotification } = useNotification()

  console.log({ user })

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [notification, setNotification])

  return (
    <div className="relative min-h-screen flex items-center justify-center py-6 sm:py-12">
      {notification && (
        <div className="absolute top-0 w-full">
          <Notification message={notification} onClose={() => setNotification(null)} />
        </div>
      )}
      <div className="bg-opacity-90 border rounded-lg relative px-10 pt-10 pb-8 shadow-2xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-2xl sm:rounded-lg sm:px-10">
        <div className="flex justify-center mb-8">
          <Image src={logo} alt="CodeBoard Logo" width={150} height={150} className="object-contain" />
        </div>
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold">Welcome to CodeBoard</h1>
          <p className="mt-4 text-lg leading-relaxed">
            CodeBoard is the ultimate tool for enhancing your LeetCode experience. Designed for whiteboard interviews, CodeBoard bridges the gap by offering a seamless whiteboard integration for each LeetCode problem. Brainstorm, visualize, and save your problem-solving ideas directly on an interactive whiteboard. Log in to save your notes and revisit them anytime.
          </p>
        </div>
        <div className="flex justify-center items-center space-x-5 mb-6">
          <p className="text-lg">Visit the problems page:</p>
          <Button
            onClick={() => router.push("/problems")}
            className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition duration-150 ease-in-out transform hover:scale-105 focus:outline-none"
          >
            Get Started
          </Button>
        </div>
        <div className="flex justify-center items-center space-x-5">
          <p className="text-lg">Want to try a demo before getting started?</p>
          <Button
            onClick={() => router.push("/demo")}
            className="px-6 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-md transition duration-150 ease-in-out transform hover:scale-105 focus:outline-none"
          >
            Try a demo
          </Button>
        </div>
      </div>
    </div>
  );
}
