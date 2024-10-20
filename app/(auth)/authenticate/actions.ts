'use server'
import { cookies } from 'next/headers'

export const signUp = async ({ email, password, name }: { email: string, password: string, name: string }) => {
  try {
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name })
    })
    const jsonRes = await res.json()
    if (jsonRes.status === 400) {
      throw Error(JSON.stringify({ message: jsonRes.message, ok: false, status: 400, url: null }))
    }
    if (jsonRes.status === 200) {
      const _session = JSON.stringify(jsonRes)
      cookies().set('session', _session, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24 * 1, // One day
        path: '/',
      })
      return jsonRes
    }
    return null
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw new Error('An unknown error occurred')
    }
  }
}
export const logIn = async ({ email, password }: { email: string, password: string }) => {
  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
    const jsonRes = await res.json()
    if (jsonRes.status === 400) {
      return ({ message: jsonRes.message, ok: false, status: 400, url: null })
    }
    if (jsonRes.status === 200) {
      const _session = JSON.stringify(jsonRes)
      cookies().set('session', _session, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24 * 1, // One day
        path: '/',
      })
      return jsonRes
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw new Error('An unknown error occurred')
    }
  }
}

export const logOut = () => {
  try {
    const cookie = cookies()
    cookie.delete('session')

  } catch (error) {
    console.log('error', error)
  }
}