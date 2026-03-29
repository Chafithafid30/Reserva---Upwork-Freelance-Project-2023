import { useEffect, useState } from 'react'
import RestaurantCard from '../components/common/RestaurantCard'
import { getRestaurants } from '../services/restaurantService'
import type { Restaurant } from '../types'

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const data = await getRestaurants()
        setRestaurants(data)
      } catch (error) {
        console.error('Failed to fetch restaurants:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRestaurants()
  }, [])

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8">
        <h1 className="text-4xl font-semibold">Restaurants</h1>
        <p className="mt-2 text-gray-600">
          Discover premium restaurants curated for elegant dining experiences.
        </p>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading restaurants...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant._id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </main>
  )
}