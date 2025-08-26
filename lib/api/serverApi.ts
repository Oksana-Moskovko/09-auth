// для функцій, які викликаються у серверних компонентах (до params потрібно додавати cookeis у headers.)
import { cookies } from 'next/headers'
import { api } from './api'
import { CheckSessionRequest } from './clientApi'
import { User } from '@/types/user'

export const checkServerSession = async () => {
  const cookieStore = await cookies()
  const res = await api.get<CheckSessionRequest>(`/auth/session`, {
    headers: { Cookie: cookieStore.toString() },
  })
  return res
}

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await api.get(`/users/me`, {
    headers: {
      Cookie: cookieStore.toString()
    },
  });
  return data;
}