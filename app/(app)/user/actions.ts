'use server'

import { getSession } from "@/app/actions"

export const getUserDetails = async () => {
  const session = await getSession()
  console.log('session', session)
  return session?.user
}