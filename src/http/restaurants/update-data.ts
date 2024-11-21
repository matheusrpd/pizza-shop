import { api } from '@/lib/axios'

type UpdateDataParams = {
  name: string
  description: string | null
}

export async function updateData({ name, description }: UpdateDataParams) {
  await api.put('/profile', { name, description })
}
