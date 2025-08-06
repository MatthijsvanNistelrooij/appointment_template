"use client"
import {
  deleteAppointment,
  getAllAppointments,
  updateAppointment,
} from "@/appwrite"
import { Appointment } from "@/types"
import React, { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Edit, Trash } from "lucide-react"
import { EditAppointmentDialog } from "./modals/EditAppointmentDialog"
import { DeleteAppointmentDialog } from "./modals/DeleteAppointmentDialog"
import SignOutButton from "./SignOutButton"
import Pagination from "./Pagination"
import { AppointmentDialog } from "@/components/modals/AppointmentsDialog"

const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [filter, setFilter] = useState<string | null>(null)
  const [openDialog, setOpenDialog] = useState(false)

  const [editingAppointment, setEditingAppointment] =
    useState<Appointment | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [deletingAppointment, setDeletingAppointment] =
    useState<Appointment | null>(null)

  const [sortField, setSortField] = useState<"date" | "time" | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const handleSort = (field: "date" | "time") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const allAppointmentsRaw = await getAllAppointments()
        const allAppointments: Appointment[] = allAppointmentsRaw.map(
          (item) => ({
            $id: item.$id,
            $createdAt: item.$createdAt,
            $updatedAt: item.$updatedAt,
            name: item.name,
            service: item.service,
            date: item.date,
            email: item.email,
            phone: item.phone,
            time: item.time,
            barber: item.barber,
          })
        )
        setAppointments(allAppointments)
      } catch (err) {
        console.error(err)
      }
    }
    fetchAppointments()
  }, [])

  const filteredAppointments = filter
    ? appointments.filter((a) => a.barber === filter)
    : appointments

  const uniqueBarbers = Array.from(new Set(appointments.map((a) => a.barber)))

  const handleDelete = async () => {
    if (!deletingAppointment) return
    try {
      await deleteAppointment(deletingAppointment.$id)
      setAppointments((prev) =>
        prev.filter((a) => a.$id !== deletingAppointment.$id)
      )
      setDeletingAppointment(null)
      setIsDeleteDialogOpen(false)
    } catch (err) {
      console.error("Failed to delete", err)
    }
  }

  const itemsPerPage = 40
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage)

  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    if (!sortField) {
      return new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime()
    }

    const aValue = a[sortField]
    const bValue = b[sortField]

    if (sortField === "time") {
      const aTime = new Date(`1970-01-01T${aValue}`)
      const bTime = new Date(`1970-01-01T${bValue}`)
      return sortDirection === "asc"
        ? aTime.getTime() - bTime.getTime()
        : bTime.getTime() - aTime.getTime()
    }

    if (sortField === "date") {
      const aDate = new Date(aValue)
      const bDate = new Date(bValue)
      return sortDirection === "asc"
        ? aDate.getTime() - bDate.getTime()
        : bDate.getTime() - aDate.getTime()
    }

    return 0
  })

  const paginatedAppointments = sortedAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleEditAppointment = async (updatedAppointment: Appointment) => {
    try {
      await updateAppointment(updatedAppointment.$id, updatedAppointment)
      setAppointments((prev) =>
        prev.map((a) =>
          a.$id === updatedAppointment.$id ? updatedAppointment : a
        )
      )
      setIsDialogOpen(false)
    } catch (err) {
      console.error("Failed to update", err)
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <aside className="w-full lg:w-48 bg-gray-100 p-4 border-b lg:border-b-0 lg:border-r sticky top-0 z-10">
        <div className="flex items-center gap-4 ml-2 justify-end lg:justify-start">
          <SignOutButton />
        </div>
      </aside>

      <main className="flex-1 p-6 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Afsprakenoverzicht</h2>

        <div className="flex gap-2 mb-4 flex-wrap">
          <Button
            className={`border bg-white text-gray-400 hover:text-gray-800 cursor-pointer hover:bg-white ${
              filter === null ? "border border-gray-200 text-gray-800" : ""
            }`}
            size={"sm"}
            variant={filter === null ? "outline" : "default"}
            onClick={() => setFilter(null)}
          >
            Alle
          </Button>
          {uniqueBarbers
            .filter((barber) => barber?.trim() !== "")
            .map((barber) => (
              <Button
                className={`border bg-white text-gray-400 hover:text-gray-800 cursor-pointer hover:bg-white ${
                  filter === barber
                    ? "border border-gray-200 text-gray-800 "
                    : ""
                }`}
                key={barber}
                size={"sm"}
                variant={filter === barber ? "outline" : "default"}
                onClick={() => setFilter(barber)}
              >
                {barber}
              </Button>
            ))}
        </div>
        <div className="border rounded overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Naam</TableHead>
                <TableHead>Service</TableHead>
                <TableHead
                  onClick={() => handleSort("date")}
                  className="cursor-pointer"
                >
                  Datum{" "}
                  {sortField === "date"
                    ? sortDirection === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </TableHead>
                <TableHead
                  onClick={() => handleSort("time")}
                  className="cursor-pointer"
                >
                  Tijd{" "}
                  {sortField === "time"
                    ? sortDirection === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefoon</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedAppointments.map((appt) => (
                <TableRow key={appt.$id}>
                  <TableCell>{appt.name}</TableCell>
                  <TableCell>{appt.service}</TableCell>
                  <TableCell>
                    {new Date(appt.date).toLocaleDateString("nl-NL")}
                  </TableCell>
                  <TableCell>{appt.time ? appt.time : "-"}</TableCell>
                  <TableCell>{appt.email ? appt.email : "-"}</TableCell>
                  <TableCell>{appt.phone ? appt.phone : "-"}</TableCell>
                  <TableCell className="flex justify-end">
                    <Button
                      onClick={() => {
                        setEditingAppointment(appt)
                        setIsDialogOpen(true)
                      }}
                      size={"sm"}
                      className="p-0 bg-transparent text-gray-800 hover:bg-white cursor-pointer m-0"
                    >
                      <Edit size={12} />
                    </Button>
                    <Button
                      size={"sm"}
                      className="p-0 bg-transparent text-red-500 hover:bg-white cursor-pointer m-0"
                      onClick={() => {
                        setDeletingAppointment(appt)
                        setIsDeleteDialogOpen(true)
                      }}
                    >
                      <Trash size={12} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-20">
          <AppointmentDialog
            hover="hover:bg-pink-300"
            open={openDialog}
            onOpenChange={setOpenDialog}
            title="MAAK EEN AFSPRAAK"
          />
        </div>

        {filteredAppointments.length > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrev={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            onNext={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={filteredAppointments.length <= itemsPerPage}
          />
        )}
      </main>

      <EditAppointmentDialog
        appointment={editingAppointment}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleEditAppointment}
      />
      <DeleteAppointmentDialog
        appointment={deletingAppointment}
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default Appointments
