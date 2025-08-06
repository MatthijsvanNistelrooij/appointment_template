"use client"

import { useEffect, useState } from "react"
import { account } from "@/appwrite"
import { useRouter } from "next/navigation"
import SignOutButton from "@/components/SignOutButton"

export default function PendingApproval() {
  const [checking, setChecking] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkVerification = async () => {
      try {
        const user = await account.get()
        if (user.emailVerification) {
          router.push("/") // or wherever the approved page is
        }
      } catch (err) {
        console.error("Failed to get user:", err)
      } finally {
        setChecking(false)
      }
    }

    checkVerification()
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-yellow-50">
      <h1 className="text-3xl font-bold mb-4 text-yellow-800">
        Awaiting Admin Approval
      </h1>
      <p className="mb-5">
        Your email is not yet verified. An administrator will approve your
        request shortly.
      </p>

      {checking ? (
        <p className="mb-4 text-sm text-yellow-700">Checking status...</p>
      ) : (
        <SignOutButton />
      )}
    </div>
  )
}
