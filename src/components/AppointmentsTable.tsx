import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Appointment } from "@/types"
import { Edit, Trash } from "lucide-react"

type AppointmentsTableProps = {
  appointments: Appointment[]
  onEdit: (appointment: Appointment) => void
  onDelete: (appointment: Appointment) => void
}

const AppointmentsTable = ({
  appointments,
  onEdit,
  onDelete,
}: AppointmentsTableProps) => {
  if (appointments.length === 0) {
    return <div>No Appointments yet</div>
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Naam</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Datum</TableHead>
            <TableHead>Tijd</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefoon</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.$id}>
              <TableCell>{appointment.name}</TableCell>
              <TableCell>{appointment.service}</TableCell>
              <TableCell>{appointment.date}</TableCell>
              <TableCell>{appointment.time}</TableCell>
              <TableCell>{appointment.email}</TableCell>
              <TableCell>{appointment.phone}</TableCell>
              <TableCell className="flex justify-end gap-2">
                <Button
                  className="cursor-pointer"
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(appointment)}
                >
                  <Edit />
                </Button>
                <Button
                  className="cursor-pointer"
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(appointment)}
                >
                  <Trash />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default AppointmentsTable
