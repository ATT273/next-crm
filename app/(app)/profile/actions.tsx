import { getLocalUser } from "@/utils/session";

export const updateInfo = async (email: string, name: string, dob: string, id: string) => {
  const user = getLocalUser()
  try {
    const res = await fetch(`http://localhost:5000/api/users/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.accessToken}`
      },
      body: JSON.stringify({ email, name, dob }),

    });
    const jsonRes = await res.json()
    if (jsonRes.status === 400) {
      throw Error(JSON.stringify({ message: jsonRes.message, ok: false, status: 400, url: null }))
    }
    if (jsonRes.status === 200) {
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
export const updatePassword = async (newPassword: string, id: string) => {
  const user = getLocalUser()
  try {
    const res = await fetch(`http://localhost:5000/api/users/password/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.accessToken}`
      },
      body: JSON.stringify({ newPassword })
    });
    const jsonRes = await res.json()
    if (jsonRes.status === 400) {
      throw Error(JSON.stringify({ message: jsonRes.message, ok: false, status: 400, url: null }))
    }
    if (jsonRes.status === 200) {
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