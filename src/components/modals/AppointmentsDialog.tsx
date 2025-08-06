"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { toast } from "sonner"

import { createAppointment } from "@/appwrite"
import { Step1_Service } from "@/components/steps/Step1_Service"
import { Step2_Barber } from "@/components/steps/Step2_Barber"
import { Step3_Date } from "@/components/steps/Step3_Date"
import { Step4_Time } from "@/components/steps/Step4_Time"
import { Step5_Contact } from "@/components/steps/Step5_Contact"
import { Step6_Confirm } from "@/components/steps/Step6_Confirm"

type AppointmentDialogProps = {
  title: string
  hover: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AppointmentDialog({
  title,
  open,
  hover,
  onOpenChange,
}: AppointmentDialogProps) {
  const [step, setStep] = useState(1)

  const next = () => setStep((s) => Math.min(s + 1, 6))
  const back = () => setStep((s) => Math.max(s - 1, 1))

  const [formData, setFormData] = useState({
    service: "",
    barber: "",
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
  })

  const updateFormData = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  function combineDateAndTime(date: Date, timeString: string): Date {
    const [hours, minutes] = timeString.split(":").map(Number)
    const combined = new Date(date)

    combined.setHours(hours)
    combined.setMinutes(minutes)
    combined.setSeconds(0)
    combined.setMilliseconds(0)

    return combined
  }

  function formatDateDutch(date: Date): string {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    } as const
    return date.toLocaleDateString("nl-NL", options)
  }

  const handleSubmit = async () => {
    const fullDate = combineDateAndTime(new Date(formData.date), formData.time)
    const formattedDate = formatDateDutch(fullDate)

    try {
      const newAppointment = await createAppointment({
        name: formData.name,
        service: formData.service,
        email: formData.email,
        phone: formData.phone,
        time: formData.time,
        barber: formData.barber,
        date: formattedDate,
      })

      console.log("Afspraak bevestigd ✅", newAppointment)

      const response = await fetch("/api/whatsapp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          time: formData.time,
          date: formData.date,
          service: formData.service,
        }),
      })

      if (!response.ok) {
        const body = await response.json()
        throw new Error(body?.error || "WhatsApp API call failed")
      }

      toast.success("Afspraak succesvol aangemaakt!")

      setFormData({
        service: "",
        barber: "",
        date: "",
        time: "",
        name: "",
        email: "",
        phone: "",
      })
      onOpenChange(false)
      setStep(1)
    } catch (error) {
      console.error("Failed to submit appointment", error)
      toast.error("Er is iets misgegaan. Probeer het opnieuw.")
    }
  }

  const [rememberData, setRememberData] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("contact")
    if (saved) {
      const { name, email, phone } = JSON.parse(saved)
      setFormData((prev) => ({ ...prev, name, email, phone }))
      setRememberData(true)
    }
  }, [])

  useEffect(() => {
    if (rememberData) {
      const { name, email, phone } = formData
      localStorage.setItem("contact", JSON.stringify({ name, email, phone }))
    } else {
      localStorage.removeItem("contact")
    }
  }, [formData.name, formData.email, formData.phone, rememberData, formData])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          className={`bg-[#e9207e] ${hover} p-8 rounded-full text-white font-bold shadow-none text-md cursor-pointer`}
        >
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="!bg-gray-100 !rounded-xl border-none p-3 lg:p-6 min-h-[620px] select-none text-gray-800">
        <DialogHeader>
          <DialogTitle>Afspraak boeken</DialogTitle>
          <DialogDescription className="text-gray-700">
            Stap {step} van 6
          </DialogDescription>
        </DialogHeader>

        <div className="py-1">
          {step === 1 && (
            <Step1_Service
              value={formData.service}
              onNext={next}
              onChange={(v) => updateFormData("service", v)}
            />
          )}
          {step === 2 && (
            <Step2_Barber
              value={formData.barber}
              onNext={next}
              onBack={back}
              onChange={(v) => updateFormData("barber", v)}
              category={formData.service}
            />
          )}
          {step === 3 && (
            <Step3_Date
              date={formData.date ? new Date(formData.date) : null}
              onNext={next}
              onBack={back}
              onDateChange={(v) => updateFormData("date", v.toISOString())}
            />
          )}
          {step === 4 && (
            <Step4_Time
              selectedService={formData.service}
              selectedDate={new Date(formData.date)}
              time={formData.time}
              onNext={next}
              onBack={back}
              onTimeChange={(v) => updateFormData("time", v)}
            />
          )}
          {step === 5 && (
            <Step5_Contact
              name={formData.name}
              email={formData.email}
              phone={formData.phone}
              onNameChange={(v) => updateFormData("name", v)}
              onEmailChange={(v) => updateFormData("email", v)}
              onPhoneChange={(v) => updateFormData("phone", v)}
              rememberData={rememberData}
              setRememberData={setRememberData}
              onNext={next}
              onBack={back}
            />
          )}
          {step === 6 && (
            <Step6_Confirm
              data={{
                ...formData,
                date: new Date(formData.date),
              }}
              onBack={back}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
