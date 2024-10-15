import NextAuth from "next-auth/next"
import Credentials from "next-auth/providers/credentials"

export const authOptions: any = {
  // Configure one or more authentication providers

  providers: [
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any, req: any) {
        try {
          const res = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials)
          })
          const jsonRes = await res.json()
          console.log('user', jsonRes)
          if (jsonRes.status === 400) {
            console.log('error')
            throw Error(JSON.stringify({ message: jsonRes.message, ok: false, status: 400, url: null }))
          }
          if (jsonRes.status === 200) {
            console.log('success')
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
    })
  ],
  callbacks: {
    async session({ session, user }: { session: any, user: any }) {
      console.log('session u', user)
      console.log('session s', session)
      if (user && user.accessToken) {
        session.user.accessToken = user.accessToken
      }
      return session;
    },
  },
}

export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }