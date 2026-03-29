import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMyReservations, cancelReservation } from '../services/reservationService'
import type { Reservation, Restaurant } from '../types'

export default function MyReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [cancellingId, setCancellingId] = useState<string | null>(null)

  useEffect(() => {
    fetchReservations()
  }, [])

  async function fetchReservations() {
    try {
      const data = await getMyReservations()
      setReservations(data)
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to load reservations')
    } finally {
      setLoading(false)
    }
  }

  async function handleCancel(reservationId: string) {
    const confirmCancel = window.confirm('Are you sure you want to cancel this reservation?')
    if (!confirmCancel) return

    setCancellingId(reservationId)

    try {
      await cancelReservation(reservationId)
      await fetchReservations()
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Failed to cancel reservation')
    } finally {
      setCancellingId(null)
    }
  }

  if (loading) {
    return <main className="mx-auto max-w-6xl px-6 py-12">Loading reservations...</main>
  }

  if (error) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-[28px] border border-[var(--border)] bg-white p-6">
          <p className="text-red-600">{error}</p>
          <Link to="/login" className="mt-4 inline-block rounded-2xl bg-black px-5 py-2 text-white">
            Sign In
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-semibold">My Reservations</h1>

      {reservations.length === 0 ? (
        <div className="rounded-[28px] border border-[var(--border)] bg-white p-6">
          <p className="text-gray-600">No reservations yet.</p>
        </div>
      ) : (
        <div className="grid gap-5">
          {reservations.map((item) => {
            const restaurant =
              typeof item.restaurantId === 'object'
                ? (item.restaurantId as Restaurant)
                : null

            return (
              <div
                key={item._id}
                className="rounded-[28px] border border-[var(--border)] bg-white p-6"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{item.reservationCode}</p>
                    <h2 className="text-2xl font-semibold">
                      {restaurant?.name || 'Restaurant'}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      {restaurant?.address || 'Address unavailable'}
                    </p>
                    <p className="mt-3 text-gray-600">
                      {item.date} · {item.time} · {item.guestCount} guests
                    </p>
                    <p className="mt-1 text-sm text-gray-500">{item.contactEmail}</p>
                  </div>

                  <div className="flex flex-col items-start gap-3 md:items-end">
                    <span className="rounded-full bg-stone-100 px-4 py-2 text-sm capitalize">
                      {item.status}
                    </span>

                    {item.status !== 'cancelled' && (
                      <button
                        onClick={() => handleCancel(item._id)}
                        disabled={cancellingId === item._id}
                        className="rounded-2xl bg-red-600 px-4 py-2 text-sm text-white disabled:opacity-60"
                      >
                        {cancellingId === item._id ? 'Cancelling...' : 'Cancel Reservation'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}
