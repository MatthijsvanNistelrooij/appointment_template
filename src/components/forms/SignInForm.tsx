"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { account } from "@/appwrite"
import { useAuth } from "@/context/AuthContext"
import Image from "next/image"
import logo from "/public/logo.png"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Models } from "node-appwrite"

export default function SignInForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const { user, setUser } = useAuth()

  useEffect(() => {
    if (user) router.push("/")
  }, [user, router])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await account.createEmailPasswordSession(email, password)

      const sessionUser: Models.User<Models.Preferences> = await account.get()
      setUser(sessionUser)

      router.push("/")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert("Sign-in failed: " + err.message)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:flex-1 bg-gray-800 flex items-center justify-center p-12">
        <div className="max-w-xs text-center text-white">
          <div className="mb-8">
            <Image
              width={800}
              height={800}
              src={logo}
              alt="Logo"
              className="mx-auto w-full h-full object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold">Welcome Back</h1>
          <p className="mt-4 text-blue-200">
            Sign in to manage appointments and more.
          </p>
        </div>
      </div>

      <div className="md:flex-1 flex items-center justify-center p-8">
        <form
          onSubmit={handleSignIn}
          className="w-full max-w-md space-y-6 bg-white p-8 rounded-lg shadow-md"
        >
          <h2 className="text-2xl text-center font-semibold text-gray-900">
            Sign In
          </h2>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gray-800 text-white hover:bg-gray-700 transition-colors cursor-pointer"
          >
            Sign In
          </Button>

          <p className="text-center text-sm text-gray-600">
            Dont have an account?{" "}
            <Link
              href="/sign-up"
              className="text-blue-500 hover:underline font-medium"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
