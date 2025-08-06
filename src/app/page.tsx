"use client"

import { useEffect } from "react"
import Appointments from "@/components/Appointments"
import Navbar from "@/components/Navbar"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/sign-in")
      } else if (!user.emailVerification) {
        router.replace("/pending-approval")
      }
    }
  }, [user, loading, router])

  if (loading || !user) return null

  return <Appointments />
}
