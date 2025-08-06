"use client"

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Appointment } from "@/types"

type Props = {
  appointment: Appointment | null
  isOpen: boolean
  onClose: () => void
  onDelete: () => Promise<void>
}

export const DeleteAppointmentDialog = ({
  appointment,
  isOpen,
  onClose,
  onDelete,
}: Props) => {
  if (!appointment) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 text-gray-400 border-none space">
        <DialogHeader>
          <DialogTitle className="text-white">Weet je het zeker?</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-gray-400 mt-5 mb-4">
          Wil je deze afspraak van{" "}
          <strong className="text-white">{appointment.name}</strong> op{" "}
          <strong className="text-white">{" "}
            {new Date(appointment.date).toLocaleDateString("nl-NL")}
          </strong>{" "}
          om <strong className="text-white">{appointment.time}</strong>{" "}
          verwijderen?
        </p>
        <DialogFooter>
          <Button
            variant="ghost"
            onClick={onClose}
            className="bg-gray-800 text-white hover:bg-gray-700 hover:text-gray-100 transition cursor-pointer"
          >
            Annuleren
          </Button>
          <Button
            variant="destructive"
            onClick={onDelete}
            className="bg-red-600 text-gray-200 hover:bg-red-700 transition cursor-pointer"
          >
            Verwijderen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
