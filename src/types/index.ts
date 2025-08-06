export interface Appointment {
  $id: string
  name: string
  service: string
  date: string
  email: string
  phone: string
  time: string
  barber: string
  $createdAt: string
  $updatedAt: string
}

export interface User {
  name: string
  email: string
}
