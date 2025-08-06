import { NextRequest, NextResponse } from "next/server"
import {
  generateGoogleCalendarLink,
  shortenUrl,
} from "./generateGoogleCalendarLink"

const dagen = [
  "zondag",
  "maandag",
  "dinsdag",
  "woensdag",
  "donderdag",
  "vrijdag",
  "zaterdag",
]
const maanden = [
  "januari",
  "februari",
  "maart",
  "april",
  "mei",
  "juni",
  "juli",
  "augustus",
  "september",
  "oktober",
  "november",
  "december",
]

export async function POST(req: NextRequest) {
  const { name, time, service, date, phone } = await req.json()

  try {
    const isKnippen = service.toLowerCase().includes("knippen")

    const to = isKnippen
      ? process.env.BOTROS_WHATSAPP!
      : process.env.OLGA_WHATSAPP!

    // date is een ISO string, bv '2025-08-15T00:00:00.000Z' of '2025-08-15'
    // time is bv '12:00'

    // Maak van date + time één ISO string zonder tijdzone:
    // bv '2025-08-15T12:00' (lokale tijd in Europe/Amsterdam)
    const startLocalISO = `${date.split("T")[0]}T${time}`

    // Eindtijd is 30 minuten later, bouw die ook als ISO string
    // Luxon kan dit doen in generateGoogleCalendarLink, maar je kunt het ook hier doen:
    // Simpel: pak uren en minuten en bereken eindtijd met Date:
    const [year, month, day] = date.split("T")[0].split("-").map(Number)
    const [hours, minutes] = time.split(":").map(Number)
    const startDate = new Date(year, month - 1, day, hours, minutes)
    const endDate = new Date(startDate.getTime() + 30 * 60 * 1000)
    // Maak hier ook een ISO string zonder tijdzone (let op, toISOString() is UTC)
    // Dus bouw zelf:
    const endLocalISO = `${String(endDate.getFullYear())}-${String(
      endDate.getMonth() + 1
    ).padStart(2, "0")}-${String(endDate.getDate()).padStart(2, "0")}T${String(
      endDate.getHours()
    ).padStart(2, "0")}:${String(endDate.getMinutes()).padStart(2, "0")}`

    // Optioneel voor de datumweergave in NL
    const dag = dagen[startDate.getDay()]
    const dagNummer = startDate.getDate()
    const maand = maanden[startDate.getMonth()]

    const calendarLink = generateGoogleCalendarLink({
      title: `${service} met ${name}`,
      startDateTime: startLocalISO,
      endDateTime: endLocalISO,
      description: `Afspraak met ${name} (${phone}) - ${service}`,
    })

    const shortLink = await shortenUrl(calendarLink)

    const formattedDate = `${dag} ${dagNummer} ${maand} ${shortLink}`

    console.log("📦 WhatsApp message payload:")
    console.log({
      to,
      contentVariables: {
        1: name,
        2: phone,
        3: formattedDate,
        4: time,
        5: service,
      },
      calendarLink,
      shortLink,
      start: startDate.toISOString(),
      end: endDate.toISOString(),
    })

    // Je Twilio bericht hier (uitgecomment)

    return NextResponse.json({ success: true })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
