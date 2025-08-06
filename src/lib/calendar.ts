// lib/calendar.ts
import { createEvent, EventAttributes } from "ics"
import { writeFileSync } from "fs"
import path from "path"

export function generateICS({
  title,
  description,
  location,
  startDate,
  endDate,
}: {
  title: string
  description: string
  location: string
  startDate: Date
  endDate: Date
}) {
  return new Promise<string>((resolve, reject) => {
    const event: EventAttributes = {
      title,
      description,
      location,
      start: [
        startDate.getFullYear(),
        startDate.getMonth() + 1,
        startDate.getDate(),
        startDate.getHours(),
        startDate.getMinutes(),
      ],
      end: [
        endDate.getFullYear(),
        endDate.getMonth() + 1,
        endDate.getDate(),
        endDate.getHours(),
        endDate.getMinutes(),
      ],
    }

    createEvent(event, (error, value) => {
      if (error) return reject(error)

      const filename = `appointment-${Date.now()}.ics`
      const filePath = path.join(process.cwd(), "public", "ics", filename)

      writeFileSync(filePath, value)

      resolve(`/ics/${filename}`) // Public path to be used in email
    })
  })
}
