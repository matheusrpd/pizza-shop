import { api } from '@/lib/axios'

export type SignInParams = {
  email: string
}

export async function signIn({ email }: SignInParams) {
  await api.post('/authenticate', { email })
}
