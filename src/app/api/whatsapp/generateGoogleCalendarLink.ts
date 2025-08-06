export function generateGoogleCalendarLink({
  title,
  startDateTime,
  endDateTime,
  description,
  location,
}: {
  title: string
  startDateTime: Date
  endDateTime: Date
  description: string
  location?: string
}) {
  const format = (date: Date) =>
    `${date.getUTCFullYear()}${String(date.getUTCMonth() + 1).padStart(
      2,
      "0"
    )}${String(date.getUTCDate()).padStart(2, "0")}T${String(
      date.getUTCHours()
    ).padStart(2, "0")}${String(date.getUTCMinutes()).padStart(2, "0")}00Z`

  const link = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}&dates=${format(startDateTime)}/${format(
    endDateTime
  )}&details=${encodeURIComponent(description)}${
    location ? `&location=${encodeURIComponent(location)}` : ""
  }`

  return link
}

export async function shortenUrl(longUrl: string): Promise<string> {
  const response = await fetch(
    `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`
  )
  return await response.text()
}
