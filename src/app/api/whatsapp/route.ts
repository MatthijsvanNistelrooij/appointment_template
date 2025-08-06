import { NextRequest, NextResponse } from "next/server"
// import twilio from "twilio"
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
  // const accountSid = process.env.TWILIO_SID!
  // const authToken = process.env.TWILIO_TOKEN!
  // const client = twilio(accountSid, authToken)

  const { name, time, service, date, phone } = await req.json()

  try {
    const isKnippen = service.toLowerCase().includes("knippen")

    const to = isKnippen
      ? process.env.BOTROS_WHATSAPP!
      : process.env.OLGA_WHATSAPP!

    const justDate = date.split("T")[0]

    const [year, month, day] = justDate.split("-").map(Number)
    const [hours, minutes] = time.split(":").map(Number)

    const start = new Date(year, month - 1, day, hours, minutes)

    if (isNaN(start.getTime())) {
      throw new Error(`Ongeldige startdatum: ${justDate}T${time}`)
    }

    const end = new Date(start.getTime() + 30 * 60 * 1000)

    const dag = dagen[start.getDay()]
    const dagNummer = start.getDate()
    const maand = maanden[start.getMonth()]

    const calendarLink = generateGoogleCalendarLink({
      title: `${service} met ${name}`,
      startDateTime: start,
      endDateTime: end,
      description: `Afspraak met ${name} (${phone}) - ${service}`,
    })

    const shortLink = await shortenUrl(calendarLink)

    const formattedDate = `${dag} ${dagNummer} ${maand} ${shortLink}`

    // MOCK
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
      start: start.toISOString(),
      end: end.toISOString(),
    })

    // await client.messages.create({
    //   from: process.env.TWILIO_WHATSAPP!,
    //   to,
    //   contentSid: process.env.TWILIO_TEMPLATE_SID!,
    //   contentVariables: JSON.stringify({
    //     1: name,
    //     2: phone,
    //     3: formattedDate,
    //     4: time,
    //     5: service,
    //   }),
    // })

    return NextResponse.json({ success: true })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
