export type Restaurant = {
  _id: string
  name: string
  slug: string
  description: string
  city: string
  address: string
  cuisine: string[]
  priceRange: string
  rating: number
  images: string[]
  facilities: string[]
  featured: boolean
  capacity: number
}

export type Reservation = {
  _id: string
  reservationCode: string
  restaurantId: string | Restaurant
  date: string
  time: string
  guestCount: number
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  contactName: string
  contactEmail: string
  contactPhone: string
  specialRequest?: string
}

export type User = {
  _id: string
  name: string
  email: string
  phone?: string
}
