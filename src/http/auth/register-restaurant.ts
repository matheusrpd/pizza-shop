import { api } from '@/lib/axios'

export type RegisterRestaurantParams = {
  email: string
  restaurantName: string
  managerName: string
  phone: string
}

export async function registerRestaurant({
  restaurantName,
  managerName,
  email,
  phone,
}: RegisterRestaurantParams) {
  await api.post('/restaurants', { restaurantName, managerName, email, phone })
}
