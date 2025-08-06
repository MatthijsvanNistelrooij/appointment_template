"use client"

import { account } from "@/appwrite"
import { Models } from "node-appwrite"
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"

type ContextType = {
  user: Models.User<Models.Preferences> | null
  loading: boolean
  setUser: React.Dispatch<
    React.SetStateAction<Models.User<Models.Preferences> | null>
  >
}

const AuthContext = createContext<ContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const appwriteUser = await account.get()
        setUser(appwriteUser)
      } catch (err) {
        console.log("No logged in user:", err)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
