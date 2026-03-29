import api from './api'

export async function registerUser(payload: {
  name: string
  email: string
  phone: string
  password: string
}) {
  const response = await api.post('/auth/register', payload)
  return response.data
}

export async function loginUser(payload: {
  email: string
  password: string
}) {
  const response = await api.post('/auth/login', payload)
  return response.data
}