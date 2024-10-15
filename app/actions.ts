'use server'
import { cookies } from 'next/headers'

export const getSession = () => {
  const cookie = cookies()
  if (cookie) {
    const session = cookie.get('session')
    if (session) {
      if (!session.value) return null
      return JSON.parse(session.value)
    }
    return null
  } else {
    return null
  }
}
