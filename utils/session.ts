

export const getLocalUser = () => {
  if (typeof window === 'undefined') return null
  const user = localStorage.getItem('user')
  if (user) {
    return JSON.parse(user)
  }
  return null
}

