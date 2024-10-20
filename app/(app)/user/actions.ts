import { getLocalUser } from "@/utils/session";

export const getUserDetails = async (id: string) => {
  const user = getLocalUser()
  const res = await fetch(`http://localhost:5000/api/users/${id}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${user.accessToken}`
    }
  })
  if (!res || res.status !== 200) {
    throw new Error('User not found')
  }
  if (res.status === 200) {
    return res.json()
  }
}