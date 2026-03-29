import { Link } from 'react-router-dom'
import type { Restaurant } from '../../types'

type Props = {
  restaurant: Restaurant
}

export default function RestaurantCard({ restaurant }: Props) {
  return (
    <div className="flex flex-col rounded-[28px] border border-[var(--border)] bg-white p-5 shadow-sm">
      <img
        src={restaurant.images[0]}
        alt={restaurant.name}
        className="h-64 w-full rounded-[24px] object-cover"
      />

      <div className="mt-4 flex flex-1 flex-col">
        <div>
          <h2 className="text-2xl font-semibold">{restaurant.name}</h2>
          <p className="mt-1 text-sm text-gray-500">
            {restaurant.cuisine.join(', ')} · {restaurant.city}
          </p>
          <p className="mt-3 text-sm text-gray-700">
            ⭐ {restaurant.rating} · {restaurant.priceRange}
          </p>
        </div>

        <Link
          to={`/restaurants/${restaurant.slug}`}
          className="mt-4 inline-block w-fit rounded-full bg-black px-4 py-2 text-sm text-white"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}