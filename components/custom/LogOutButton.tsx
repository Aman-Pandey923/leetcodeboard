import { Button } from "@/components/ui/button"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase/crud"
import { useRouter } from "next/navigation"

export function LogOutButton() {
  const router = useRouter()

  const handleSignOut = () => {
    signOut(auth)
    sessionStorage.removeItem("user")
    router.push("/sign-in")
  }

  return (
    <Button
      className="px-6 py-2 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 rounded-lg shadow-md transition duration-150 ease-in-out transform hover:scale-105"
      onClick={handleSignOut}
    >
      Log Out
    </Button>
  )
}
