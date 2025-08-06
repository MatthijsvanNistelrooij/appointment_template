import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, ChevronLeft, Loader2 } from "lucide-react"

type FormDataType = {
  service: string
  barber: string
  date: Date
  time: string
  name: string
  email: string
  phone: string
}

interface Props {
  data: FormDataType
  onBack: () => void
  onSubmit: () => Promise<void>
}

export const Step6_Confirm = ({ data, onBack, onSubmit }: Props) => {
  const { service, barber, date, time, email, phone } = data
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await onSubmit()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <div className="max-w-3xl mx-auto">
        <h3 className="m-2 text-sm font-light">Bevestig uw afspraak</h3>

        <div className="rounded-xl bg-white p-4 space-y-6 border border-gray-200">
          <dl className="gap-x-10 gap-y-6 text-base text-neutral-800">
            <div className="space-y-5 pb-12">
              <label className="font-bold text-sm ml-1">Type afspraak</label>
              <div className="ml-1 text-sm">{service || "-"}</div>
              <label className="font-bold text-sm ml-1 mt-2">Medewerker</label>
              <div className="ml-1 text-sm">{barber || "-"}</div>
              <label className="font-bold text-sm ml-1">Datum & tijd</label>
              <div className="ml-1 text-sm">
                {date ? date.toLocaleDateString("nl-NL") : "-"} {time || "-"}
              </div>
              <label className="font-bold text-sm ml-1 mt-2">E-mail</label>
              <div className="ml-1 text-sm">{email || "-"}</div>
              <label className="font-bold text-sm ml-1 mt-2">
                Telefoonnummer
              </label>
              <div className="ml-1 text-sm">{phone || "-"}</div>
            </div>
          </dl>
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <Button
          variant="secondary"
          onClick={onBack}
          className="bg-white border hover:bg-gray-200 hover:border-gray-300 rounded cursor-pointer"
        >
          <ChevronLeft className="mr-1" />
          Wijzigen
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="hover:bg-pink-600 bg-[#e9207e] text-white rounded cursor-pointer"
        >
          Verzenden
          {isSubmitting ? (
            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
          ) : (
            <Check className="ml-2 h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  )
}
