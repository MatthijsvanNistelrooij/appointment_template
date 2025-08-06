// app/api/appointments/blockedTimes/route.ts
import { NextResponse } from "next/server"
import { getAllAppointments } from "@/appwrite"
import { parseISO, isSameDay } from "date-fns"

const isKnipService = (service: string) =>
  service === "Heren knippen" || service === "Dames kort haar knippen"

export async function POST(request: Request) {
  try {
    const { date, service } = await request.json()
    const allAppointments = await getAllAppointments()

    const blockedTimes = allAppointments
      .filter((appt) => isSameDay(parseISO(appt.date), new Date(date)))
      .filter((appt) => {
        const existingIsKnip = isKnipService(appt.service)
        const newIsKnip = isKnipService(service)
        return existingIsKnip === newIsKnip
      })
      .map((appt) => ({
        date: appt.date,
        time: appt.time,
        service: appt.service,
      }))

    return NextResponse.json({ blockedTimes })
  } catch (err) {
    console.error("Failed to fetch blocked times:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
