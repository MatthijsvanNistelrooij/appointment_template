import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Appointment } from "@/types"
import { useEffect, useState } from "react"

export const EditAppointmentDialog = ({
  appointment,
  isOpen,
  onClose,
  onSave,
}: {
  appointment: Appointment | null
  isOpen: boolean
  onClose: () => void
  onSave: (updated: Appointment) => void
}) => {
  const [formData, setFormData] = useState<Appointment | null>(appointment)

  useEffect(() => {
    setFormData(appointment)
  }, [appointment])

  useEffect(() => {
    if (appointment) {
      const formattedDate = appointment.date.split("T")[0]
      setFormData({ ...appointment, date: formattedDate })
    }
  }, [appointment])

  if (!formData) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Afspraak bewerken</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSave(formData)
            onClose()
          }}
          className="flex flex-col gap-4 mt-2"
        >
          <Input
            className="border p-2 rounded"
            value={formData.name}
            placeholder="Naam"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            className="border p-2 rounded"
            value={formData.service}
            placeholder="Dienst (bijv. knippen, kleuren)"
            onChange={(e) =>
              setFormData({ ...formData, service: e.target.value })
            }
          />
          <Input
            className="border p-2 rounded"
            value={formData.phone}
            placeholder="Telefoonnummer"
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
          <Input
            className="border p-2 rounded"
            type="date"
            value={formData.date}
            placeholder="Datum"
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
          <Input
            className="border p-2 rounded"
            value={formData.time}
            placeholder="Tijd (bijv. 14:00)"
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          />
          <Button
            type="submit"
            className="cursor-pointer bg-gray-700 hover:bg-gray-800"
          >
            Opslaan
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
