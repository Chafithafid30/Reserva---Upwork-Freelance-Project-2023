import api from './api'

export async function getRestaurants() {
  const response = await api.get('/restaurants')
  return response.data
}

export async function getRestaurantBySlug(slug: string) {
  const response = await api.get(`/restaurants/${slug}`)
  return response.data
}