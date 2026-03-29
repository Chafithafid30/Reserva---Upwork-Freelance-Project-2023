import api from './api'

export async function createReservation(payload: {
  restaurantId: string
  date: string
  time: string
  guestCount: number
  contactName: string
  contactEmail: string
  contactPhone: string
  specialRequest?: string
}) {
  const response = await api.post('/reservations', payload)
  return response.data
}

export async function getMyReservations() {
  const response = await api.get('/reservations/me')
  return response.data
}

export async function cancelReservation(reservationId: string) {
  const response = await api.patch(`/reservations/${reservationId}/cancel`)
  return response.data
}