import { Client, Account, Databases, ID } from "appwrite"
import { appwriteConfig } from "../appwrite/config"
import { Appointment } from "@/types"
import emailjs from "@emailjs/browser"

const client = new Client()
  .setEndpoint(appwriteConfig.endpointUrl)
  .setProject(appwriteConfig.projectId)

const account = new Account(client)
const databases = new Databases(client)

export { client, databases, account }

export const getAllAppointments = async () => {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.appointmentsCollectionId
    )
    return response.documents
  } catch (error) {
    console.error("Failed to fetch appointments:", error)
    return []
  }
}

export const createAppointment = async (appointmentData: {
  name: string
  service: string
  date: string
  email: string
  phone: string
  time: string
  barber: string
}) => {
  try {
    const appointment = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.appointmentsCollectionId,
      ID.unique(),
      {
        name: appointmentData.name,
        service: appointmentData.service,
        date: appointmentData.date,
        email: appointmentData.email,
        phone: appointmentData.phone,
        time: appointmentData.time,
        barber: appointmentData.barber,
      }
    )

    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE!,
      process.env.NEXT_PUBLIC_EMAIL_JS_APPOINTMENT_TEMPLATE!,
      {
        to_email: appointmentData.email,
        name: appointmentData.name,
        service: appointmentData.service,
        date: appointmentData.date,
        time: appointmentData.time,
        email: appointmentData.email,
        phone: appointmentData.phone,
        barber: appointmentData.barber,
      },

      process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY
    )

    const isKnippen = appointmentData.service.toLowerCase().includes("knippen")

    if (isKnippen) {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE!,
        process.env.NEXT_PUBLIC_EMAIL_JS_CONFIRM_APPOINTMENT_TEMPLATE!,
        {
          to_email: process.env.NEXT_PUBLIC_EMAIL_ADDRESS_BOTROS!,
          name: appointmentData.name,
          service: appointmentData.service,
          date: appointmentData.date,
          time: appointmentData.time,
          email: appointmentData.email,
          phone: appointmentData.phone,
          barber: appointmentData.barber,
        },
        process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY
      )
    } else {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE!,
        process.env.NEXT_PUBLIC_EMAIL_JS_CONFIRM_APPOINTMENT_TEMPLATE!,
        {
          to_email: process.env.NEXT_PUBLIC_EMAIL_ADDRESS_OLGA!,
          name: appointmentData.name,
          service: appointmentData.service,
          date: appointmentData.date,
          time: appointmentData.time,
          email: appointmentData.email,
          phone: appointmentData.phone,
          barber: appointmentData.barber,
        },
        process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY
      )
    }

    return appointment
  } catch (error) {
    console.error("Failed to create appointment:", error)
    throw error
  }
}

export const updateAppointment = async (id: string, data: Appointment) => {
  const res = await fetch(`/api/appointments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error("Failed to update appointment")
  }

  return res.json()
}

export const deleteAppointment = async (id: string) => {
  const res = await fetch(`/api/appointments/${id}`, {
    method: "DELETE",
  })

  if (!res.ok) {
    throw new Error("Failed to delete appointment")
  }
}
