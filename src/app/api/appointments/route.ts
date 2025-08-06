import { NextRequest, NextResponse } from "next/server"
import { Client } from "appwrite"
import { appwriteConfig } from "@/appwrite/config"
import { parseISO, isSameDay } from "date-fns"
import { getAllAppointments } from "@/appwrite"

const client = new Client()
  .setEndpoint(appwriteConfig.endpointUrl)
  .setProject(appwriteConfig.projectId)
client.headers = {
  "X-Appwrite-Key": appwriteConfig.apiKey,
  "X-Appwrite-Project": appwriteConfig.projectId,
}

const isKnipService = (service: string) =>
  service === "Heren knippen" || service === "Dames kort haar knippen"

export async function POST(request: NextRequest) {
  try {
    const { date, service } = await request.json()

    // Haal alle afspraken direct op via je helper, niet via fetch!
    const allAppointmentsRaw = await getAllAppointments()

    const blockedTimes = allAppointmentsRaw
      .filter((appt) => isSameDay(parseISO(appt.date), new Date(date)))
      .filter((appt) => {
        const existingIsKnip = isKnipService(appt.service)
        const newIsKnip = isKnipService(service)
        return existingIsKnip === newIsKnip
      })
      .map((appt) => appt.time)

    return NextResponse.json({ blockedTimes })
  } catch (err) {
    console.error("Failed to fetch blocked times:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const appointments = await getAllAppointments()
    return NextResponse.json(appointments, { status: 200 })
  } catch (err) {
    console.error("Failed to fetch appointments:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
