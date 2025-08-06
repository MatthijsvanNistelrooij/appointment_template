"use client"
import { account } from "@/appwrite" // your initialized appwrite client
import { useAuth } from "@/context/AuthContext"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { LogOutIcon } from "lucide-react"

export default function SignOutButton() {
  const { setUser } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await account.deleteSession("current")
      setUser(null)
      router.push("/sign-in")
    } catch (error) {
      console.error("Sign out failed:", error)
    }
  }

  return (
    <>
      <Button
        onClick={handleSignOut}
        className="px-4 py-2 bg-gray-800 text-white cursor-pointer rounded hover:bg-gray-700 w-32"
      >
        Sign Out
        <LogOutIcon className="rotate-180" />
      </Button>
    </>
  )
}
