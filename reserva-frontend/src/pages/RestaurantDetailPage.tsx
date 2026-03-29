import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getRestaurantBySlug } from '../services/restaurantService'
import type { Restaurant } from '../types'

export default function RestaurantDetailPage() {
  const { slug } = useParams()
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchRestaurantDetail() {
      try {
        setLoading(true)
        setError('')

        if (!slug) {
          setError('Restaurant slug not found')
          return
        }

        const data = await getRestaurantBySlug(slug)
        setRestaurant(data)
      } catch (err: any) {
        setError(err?.response?.data?.message || 'Failed to load restaurant detail')
      } finally {
        setLoading(false)
      }
    }

    fetchRestaurantDetail()
  }, [slug])

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-12">
        <p className="text-gray-500">Loading restaurant detail...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="rounded-[32px] border border-[var(--border)] bg-white p-8">
          <p className="text-red-600">{error}</p>
        </div>
      </main>
    )
  }

  if (!restaurant) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="rounded-[32px] border border-[var(--border)] bg-white p-8">
          <p className="text-gray-600">Restaurant not found.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-6">
          <img
            src={
              restaurant.images?.[0] ||
              'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop'
            }
            alt={restaurant.name}
            className="h-[520px] w-full rounded-[32px] object-cover"
          />

          <div className="rounded-[32px] border border-[var(--border)] bg-white p-8">
            <h1 className="text-5xl font-semibold">{restaurant.name}</h1>
            <p className="mt-3 text-gray-600">{restaurant.city}</p>
            <p className="mt-4 text-gray-700">{restaurant.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {restaurant.facilities?.length ? (
                restaurant.facilities.map((facility) => (
                  <span
                    key={facility}
                    className="rounded-full bg-stone-100 px-4 py-2 text-sm"
                  >
                    {facility}
                  </span>
                ))
              ) : (
                <span className="rounded-full bg-stone-100 px-4 py-2 text-sm">
                  Premium Dining
                </span>
              )}
            </div>
          </div>
        </div>

        <aside className="h-fit rounded-[32px] border border-[var(--border)] bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-semibold">Reserve Table</h2>
          <p className="mt-2 text-gray-600">
            Choose your preferred date and time.
          </p>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-[var(--border)] p-4">
              City: {restaurant.city}
            </div>
            <div className="rounded-2xl border border-[var(--border)] p-4">
              Price Range: {restaurant.priceRange}
            </div>
            <div className="rounded-2xl border border-[var(--border)] p-4">
              Rating: {restaurant.rating}
            </div>
          </div>

          <Link
            to={`/reservation/${restaurant._id}`}
            className="mt-6 inline-block w-full rounded-2xl bg-[var(--gold)] px-6 py-3 text-center text-white"
          >
            Continue Reservation
          </Link>
        </aside>
      </div>
    </main>
  )
}