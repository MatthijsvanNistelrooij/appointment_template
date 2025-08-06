/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react"

export function useFetchBlockedTimes(date: string, service: string) {
  const [blockedTimes, setBlockedTimes] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)

  useEffect(() => {
    if (!date || !service) return

    setLoading(true)
    setError(null)

    async function fetchBlockedTimes() {
      try {
        const res = await fetch("/api/appointments/blockedTimes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ date, service }),
        })
        if (!res.ok) throw new Error("Failed to fetch blocked times")
        const data = await res.json()

        setBlockedTimes(data.blockedTimes.map((appt: any) => appt.time))
      } catch (err) {
        console.log(err)
        setError("Failed to fetch blocked times")
      } finally {
        setLoading(false)
      }
    }

    fetchBlockedTimes()
  }, [date, service])

  return { blockedTimes, loading, error }
}
