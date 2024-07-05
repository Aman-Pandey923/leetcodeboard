"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/lib/firebase/crud"
import { useRouter } from "next/navigation"
import Notification from "@/components/custom/Notification";
import { useNotification } from "@/context/NotificationContext";

export default function Home() {
  const [user] = useAuthState(auth)
  const router = useRouter()
  const { notification, setNotification } = useNotification();

  console.log({ user })

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification, setNotification]);

  return (
    <div>
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden py-6 sm:py-12">
    <div>
      {notification && <Notification message={notification} onClose={() => setNotification(null)} />}
    </div>
      <div className="border rounded-lg relative px-10 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-2xl sm:rounded-lg sm:px-10">
        <div className="mb-8">
          <h1 className="text-center text-3xl font-bold">
            Welcome to CodeBoard
          </h1>
          <p className="mt-4 text-justify leading-normal">
            CodeBoard is the ultimate tool for enhancing your LeetCode
            experience. Designed for whiteboard interviews, CodeBoard bridges
            the gap by offering a seamless whiteboard integration for each
            LeetCode problem. Brainstorm, visualize, and save your
            problem-solving ideas directly on an interactive whiteboard. Log in
            to save your notes and revisit them anytime.
          </p>
        </div>
        <div className="flex justify-center">
          <Button
            onClick={() => {
              router.push("/problems")
            }}
            className="px-6 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md transition duration-150 ease-in-out transform hover:scale-105 focus:outline-none"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
    </div>
  )
}
